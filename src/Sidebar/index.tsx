import React, { useState } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import faker from "faker";

import { getList, reorderList } from "../utils";
import { List } from "./List";
import { ItemType } from "./Item";

export const Sidebar = () => {
  const [items, setItems] = useState(getList(10));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newItems: any = reorderList(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  const addItem = (id: string) => {
    const newItems: any = items.map((item: ItemType) => {
      if (item.id === id) {
        item.list.push({
          id: `Item ${Math.floor(Math.random() * Date.now())}`,
          content: faker.random.word(),
          list: [],
          isListVisible: false,
        });
      }
      return item;
    });

    setItems(newItems);
  };

  const toggleListVisibility = (id: string) => {
    const newItems: any = items.map((item: ItemType) => {
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
          {(provided: DroppableProvided) => (
            <ListWrapper {...provided.droppableProps} ref={provided.innerRef}>
              <List
                items={items}
                toggleListVisibility={toggleListVisibility}
                addItem={addItem}
              />
              {provided.placeholder}
            </ListWrapper>
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

const ListWrapper = styled.div`
  min-width: 300px;
  box-sizing: border-box;
`;
