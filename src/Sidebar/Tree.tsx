import React from "react";
import styled from "styled-components";
import { DropTarget } from "react-dnd";

import { Item } from "./Item";
import { ItemType } from "./types";

type Props = {
  id?: number;
  items: ItemType[] | undefined;
  parent?: any;
  moveItem: Function;
  findItem: Function;
  connectDropTarget: Function;
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

const TreeComponent = ({
  items,
  parent,
  moveItem,
  findItem,
  connectDropTarget,
}: Props) =>
  connectDropTarget(
    <div>
      <Wrapper>
        {items &&
          items.map((item: ItemType) => (
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
    </div>
  );

export const Tree = DropTarget("ITEM", target, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(TreeComponent);

const Wrapper = styled.div`
  position: relative;
  margin-left: 20px;
`;
