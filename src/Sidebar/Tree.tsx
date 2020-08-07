import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";

import { Item } from "./Item";
import { ItemType } from "./types";
import { findItem } from "./utils";

type Props = {
  id?: number;
  items: ItemType[] | undefined;
  parent?: any;
  moveItem: Function;
};

export const Tree = ({ items, parent, moveItem }: Props) => {
  const [{}, dropRef] = useDrop({
    accept: "item",
    hover(draggedItem: any, monitor: any) {
      if (!monitor.isOver({ shallow: true })) return;

      const descendantNode: any = findItem(parent, draggedItem.items);
      if (descendantNode) return;
      if (draggedItem.parent === parent || draggedItem.id === parent) return;

      moveItem(draggedItem.id, undefined, parent);
    },
  });

  if (!items) return null;

  return (
    <Wrapper ref={dropRef}>
      {items.map((item) => (
        <Item
          id={item.id}
          item={item}
          key={item.id}
          moveItem={moveItem}
          parent={parent}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-left: 20px;
`;
