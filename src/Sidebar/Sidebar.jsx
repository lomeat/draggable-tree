import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import faker from "faker";

import { getList, reorderList } from "../utils";
import { Item } from "./Item.jsx";

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

  const addItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.list.push({
          id: `Item ${Math.floor(Math.random() * Date.now())}`,
          content: faker.random.word(),
          list: [],
        });
        item.isListVisible = false;
      }
      return item;
    });

    setItems(newItems);
  };

  const toggleListVisibility = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.isListVisible = !item.isListVisible;
      }
      return item;
    });

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
                <Item
                  item={item}
                  index={index}
                  toggleListVisibility={toggleListVisibility}
                  addItem={addItem}
                />
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
  border-right: 1px solid #ccc;
`;

const H1 = styled.h1`
  padding: 0 10px;
`;

const List = styled.div`
  min-width: 300px;
  box-sizing: border-box;
`;
