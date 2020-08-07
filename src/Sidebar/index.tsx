import React, { useState } from "react";
import styled from "styled-components";

import { ItemType } from "../types";
import { Tree } from "./Tree";

export const Sidebar = () => {
  const [tree, setTree] = useState([
    {
      id: 1,
      title: "Tatooine",
      children: [
        { id: 2, title: "Endor", children: [] },
        { id: 3, title: "Hoth", children: [] },
        { id: 4, title: "Dagobah", children: [] },
      ],
    },
    {
      id: 5,
      title: "Death Star",
      children: [],
    },
    {
      id: 6,
      title: "Alderaan",
      children: [
        {
          id: 7,
          title: "Bespin",
          children: [{ id: 8, title: "Jakku", children: [] }],
        },
      ],
    },
  ]);

  const moveItem = (id: number, afterId: number, nodeId: number) => {
    if (id === afterId) return;

    const removeNode = (id: number, items: ItemType[]) => {
      for (const node of items) {
        if (node.id === id) {
          items.splice(items.indexOf(node), 1);
          return;
        }

        if (node.children && node.children.length) {
          removeNode(id, node.children);
        }
      }
    };

    const item: ItemType = { ...findItem(id, tree) };
    if (isNaN(item.id)) {
      return;
    }

    const dest: any = nodeId ? findItem(nodeId, tree).children : tree;

    if (!afterId) {
      removeNode(id, tree);
      dest.push(item);
    } else {
      const index = dest.indexOf(
        dest.filter((a: ItemType) => a.id === afterId).shift()
      );
      removeNode(id, tree);
      dest.splice(index, 0, item);
    }
  };

  const findItem = (id: number, items: ItemType[]): ItemType => {
    for (const node of items) {
      if (node.id === id) return node;
      if (node.children && node.children.length) {
        const result: ItemType = findItem(id, node.children);
        if (result) {
          return result;
        }
      }
    }
    return { id: NaN, title: "Undefined" };
  };

  return (
    <Wrapper>
      <Tree
        parent={null}
        items={tree}
        moveItem={moveItem}
        findItem={findItem}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border-right: 1px solid #ccc;
  min-width: 300px;
  box-sizing: border-box;
  padding-top: 20px;
`;
