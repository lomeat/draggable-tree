import React, { useState } from "react";
import styled from "styled-components";

export const Sidebar = () => {
  const [tree, setTree] = useState([
    {
      id: 1,
      title: "Tatooine",
      children: [
        { id: 2, title: "Endor", children: [] },
        { id: 3, title: "Hoth", children: [] },
        { id: 4, title: "Dagobah", children: [] },
      ],
    },
    {
      id: 5,
      title: "Death Star",
      children: [],
    },
    {
      id: 6,
      title: "Alderaan",
      children: [
        {
          id: 7,
          title: "Bespin",
          children: [{ id: 8, title: "Jakku", children: [] }],
        },
      ],
    },
  ]);

  return (
    <Wrapper>
      <Item>Sidebar</Item>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border-right: 1px solid #ccc;
  min-width: 300px;
  box-sizing: border-box;
  padding: 20px;
`;

const Item = styled.div`
  padding-left: 10px;
`;
