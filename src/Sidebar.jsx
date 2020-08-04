import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { getList, reorderList } from "./utils";

export const Sidebar = (props) => {
  const [items, setItems] = useState(getList(10));

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorderList(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  return (
    <Wrapper>
      <H1>Notes</H1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </Item>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
`;

const H1 = styled.h1`
  padding: 0 10px;
`;

const List = styled.div`
  width: 300px;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
`;

const Item = styled.div`
  user-select: none;
  outline: none;
  padding: 10px;
  transition: background 0.2s ease;
  border: 1px solid transparent;
  :hover {
    border: 1px solid black;
  }
  :active {
    background: #ccc;
  }
`;
