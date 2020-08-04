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
    setItems((state) =>
      state.map((item) => {
        if (item.id === id) {
          item.list.push({
            id: `Item ${Math.floor(Math.random() * Date.now())}`,
            content: faker.random.word(),
          });
        }
        return item;
      })
    );

    console.log(items);
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
                      <Title>
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
                      {item.list.length > 0 && (
                        <InnerList>
                          {item.list.map((value) => (
                            <div key={value.content}>{value.content}</div>
                          ))}
                        </InnerList>
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

const Title = styled.div`
  justify-content: space-between;
  display: flex;
  width: 100%;
`;

const WrapperButtons = styled.div`
  display: flex;
`;

const DragButton = styled.div`
  border: 1px solid black;
  margin-left: 10px;
`;

const AddButton = styled.button`
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
