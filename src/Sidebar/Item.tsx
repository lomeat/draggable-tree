import React from "react";
import styled from "styled-components";
import { DropTarget, DragSource } from "react-dnd";
import flow from "lodash/flow";

import { Tree } from "./Tree";
import { ItemType } from "../types";

type Props = {
  id: any;
  parent: any;
  item: ItemType;
  moveItem: Function;
  findItem: Function;
  connectDropTarget: Function;
  connectDragSource: Function;
  connectDragPreview: Function;
};

const source = {
  beginDrag(props: Props) {
    return {
      id: props.id,
      parent: props.parent,
      items: props.item.children,
    };
  },

  isDragging(props: Props, monitor: any) {
    return props.id === monitor.getItem().id;
  },
};

const target = {
  canDrop() {
    return false;
  },

  hover(props: Props, monitor: any) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId === overId || draggedId === props.parent) return;
    if (!monitor.isOver({ shallow: true })) return;

    props.moveItem(draggedId, overId, props.parent);
  },
};

const ItemComponent = ({
  item,
  parent,
  moveItem,
  findItem,
  connectDropTarget,
  connectDragSource,
  connectDragPreview,
}: Props) =>
  connectDropTarget(
    connectDragPreview(
      <div>
        {connectDragSource(
          <div>
            <Title>{item.title}</Title>
          </div>
        )}
        <Tree
          parent={item.id}
          items={item.children}
          moveItem={moveItem}
          findItem={findItem}
        />
      </div>
    )
  );

export const Item = flow(
  DragSource("ITEM", source, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget("ITEM", target, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(ItemComponent);

const Title = styled.div`
  border: 1px solid transparent;
  padding: 6px;
  font-size: 20px;
  transition: 0.1s ease;
  :hover {
    border: 1px solid #555;
    cursor: pointer;
  }
`;
