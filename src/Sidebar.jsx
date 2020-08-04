import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import faker from "faker";

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

  const addItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.list.push({
          id: `Item ${Math.floor(Math.random() * Date.now())}`,
          content: faker.random.word(),
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
        console.log(item);
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
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Item ref={provided.innerRef} {...provided.draggableProps}>
                      <Title onClick={() => toggleListVisibility(item.id)}>
                        <Name>{item.content}</Name>
                        <WrapperButtons>
                          <AddButton onClick={() => addItem(item.id)}>
                            Add
                          </AddButton>
                          <DragButton {...provided.dragHandleProps}>
                            Hold
                          </DragButton>
                        </WrapperButtons>
                      </Title>
                      {item.list.length > 0 && item.isListVisible && (
                        <Droppable droppableId="droppable-2">
                          {(provided) => (
                            <InnerList
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {item.list.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  index={index}
                                  draggableId={item.id}
                                >
                                  {(provided) => (
                                    <Item
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Title>{item.content}</Title>
                                    </Item>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </InnerList>
                          )}
                        </Droppable>
                      )}
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
  border-right: 1px solid #ccc;
`;

const H1 = styled.h1`
  padding: 0 10px;
`;

const List = styled.div`
  width: 300px;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  outline: none;
  transition: background 0.2s ease;
  border: 1px solid transparent;
  :hover {
    border: 1px solid black;
  }
`;

const Title = styled.div`
  box-sizing: border-box;
  justify-content: space-between;
  padding: 10px;
  display: flex;
  width: 100%;
  :active {
    background: #ccc;
  }
  :hover {
    cursor: pointer;
  }
`;

const WrapperButtons = styled.div`
  display: flex;
`;

const DragButton = styled.div`
  border: 1px solid black;
  margin-left: 10px;
`;

const AddButton = styled.button`
  margin-left: 10px;
  border: 1px solid black;
  outline: none;
  :hover {
    cursor: pointer;
  }
`;

const Name = styled.span`
  max-width: 200px;
  text-overflow: ellipsis;
`;

const InnerList = styled.div`
  padding: 10px 0 0 10px;
`;
