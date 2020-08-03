import React from "react";
import styled from "styled-components";

export const Content = () => {
  return (
    <Wrapper>
      <p>Hello Content</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex-grow: 3;
`;
