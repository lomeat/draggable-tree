import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ItemType } from "./types";
import { Tree } from "./Tree";
import { removeNode, findItem, treeMock } from "./utils";

export const Sidebar = () => {
  const [tree, setTree] = useState(treeMock);

  const moveItem = useCallback(
    (id: number, afterId: number, nodeId: number) => {
      if (id === afterId) return;

      const newTree = [...tree];
      const item = { ...findItem(id, newTree) };

      if (isNaN(item.id)) return;

      const dest: any = nodeId ? findItem(nodeId, newTree).children : newTree;

      if (!afterId) {
        removeNode(id, newTree);
        dest.push(item);
      } else {
        const index: number = dest.indexOf(
          dest.filter((destItem: ItemType) => destItem.id === afterId).shift()
        );
        removeNode(id, newTree);
        dest.splice(index, 0, item);
      }

      setTree(newTree);
    },
    [tree]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <H1>Notes</H1>
        <div style={{ marginLeft: "-20px" }}>
          <Tree parent={null} items={tree} moveItem={moveItem} />
        </div>
      </Wrapper>
    </DndProvider>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border-right: 1px solid #ccc;
  min-width: 300px;
  box-sizing: border-box;
`;

const H1 = styled.h1`
  padding: 0 10px;
`;
