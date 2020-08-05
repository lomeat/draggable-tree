import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";

const renderInnerList = (item, toggleListVisibility, addItem) =>
  item.list.length > 0 &&
  item.isListVisible && (
    <Droppable droppableId={item.id}>
      {(provided) => (
        <InnerList {...provided.droppableProps} ref={provided.innerRef}>
          {item.list.map((item, index) => (
            <Item
              item={item}
              index={index}
              toggleListVisibility={toggleListVisibility}
              addItem={addItem}
            />
          ))}
          {provided.placeholder}
        </InnerList>
      )}
    </Droppable>
  );

export const Item = ({ item, toggleListVisibility, addItem, index }) => (
  <Draggable key={item.id} draggableId={item.id} index={index}>
    {(provided, snapshot) => (
      <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
        <Title onClick={() => toggleListVisibility(item.id)}>
          <Name>{item.content}</Name>
          <WrapperButtons>
            <AddButton onClick={() => addItem(item.id)}>Add</AddButton>
            <DragButton {...provided.dragHandleProps}>Hold</DragButton>
          </WrapperButtons>
        </Title>
        {renderInnerList(item, toggleListVisibility, addItem)}
      </Wrapper>
    )}
  </Draggable>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  outline: none;
  border: 1px solid transparent;
  background: #eee;
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
