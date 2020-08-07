import React, { useState } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ItemType } from "./types";
import { Tree } from "./Tree";
import { removeNode, findItem, treeMock } from "./utils";

export const Sidebar = () => {
  const [tree, setTree] = useState(treeMock);

  const moveItem = (id: number, afterId: number, nodeId: number) => {
    if (id === afterId) return;

    let newTree = tree;

    const item: ItemType = { ...findItem(id, newTree) };
    if (isNaN(item.id)) {
      return;
    }

    const dest: any = nodeId ? findItem(nodeId, newTree).children : tree;

    if (!afterId) {
      removeNode(id, newTree);
      dest.push(item);
    } else {
      const index = dest.indexOf(
        dest.filter((a: ItemType) => a.id === afterId).shift()
      );
      removeNode(id, newTree);
      dest.splice(index, 0, item);
    }

    setTree(newTree);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <H1>Notes</H1>
        <div style={{ marginLeft: "-20px" }}>
          <Tree
            parent={null}
            items={tree}
            moveItem={moveItem}
            findItem={findItem}
          />
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
