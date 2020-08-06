import React from "react";
import styled from "styled-components";

export const Content: React.FC = () => {
  return (
    <Wrapper>
      <Heading>Drag & drop nested list</Heading>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  color: #666;
`;

const Heading = styled.h1`
  font-family: "Fira Code", sans-serif;
  font-size: 24px;
`;
