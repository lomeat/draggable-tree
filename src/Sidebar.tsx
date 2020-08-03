import React from "react";
import styled from "styled-components";

export const Sidebar = () => {
  return (
    <Wrapper>
      <p>Hello sidebar</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex-grow: 1;
  border-right: 1px solid #ccc;
`;
