import React from "react";
import styled from "styled-components";

import { Item } from "./Item";
import { ItemType } from "../types";

type Props = {
  id?: any;
  items: any;
  parent: any;
  moveItem: Function;
  findItem: Function;
};

const target = {
  drop() {},

  hover(props: Props, monitor: any) {
    const { id: draggedId, parent, items } = monitor.getItem();

    if (!monitor.isOver({ shallow: true })) return;

    const descendantNode = props.findItem(props.parent, items);
    if (descendantNode) return;
    if (parent === props.parent || draggedId === props.parent) return;

    props.moveItem(draggedId, props.id, props.parent);
  },
};

export const Tree = ({ items, parent, moveItem, findItem }: Props) => {
  return (
    <Wrapper>
      {items.map((item: ItemType) => (
        <Item
          key={item.id}
          id={item.id}
          parent={parent}
          item={item}
          moveItem={moveItem}
          findItem={findItem}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding-left: 20px;
`;
