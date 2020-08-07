import React from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";

import { Tree } from "./Tree";
import { ItemType } from "./types";

type Props = {
  id: number;
  parent: any;
  item: ItemType;
  moveItem: Function;
};

export const Item = ({ item, parent, moveItem }: Props) => {
  const [, dropRef] = useDrop({
    accept: "item",
    canDrop: () => false,
    hover: (draggedItem: any, monitor: any) => {
      if (draggedItem.id === item.id || draggedItem.id === parent) return;
      if (!monitor.isOver({ shallow: true })) return;

      moveItem(draggedItem.id, item.id, parent);
    },
  });

  const [, dragRef, previewRef] = useDrag({
    item: {
      id: item.id,
      parent,
      items: item.items,
      type: "item",
    },
    isDragging: (monitor) => item.id === monitor.getItem().id,
  });

  return (
    <div ref={dropRef}>
      <div ref={previewRef}>
        <Title ref={dragRef}>{item.title}</Title>
        <Tree parent={item.id} items={item.items} moveItem={moveItem} />
      </div>
    </div>
  );
};

const Title = styled.div`
  border: 1px solid #ccc;
  padding: 4px 10px;
  margin-bottom: 10px;
  font-size: 20px;
  transition: 0.1s ease;
  :hover {
    border: 1px solid #555;
    cursor: pointer;
  }
`;
