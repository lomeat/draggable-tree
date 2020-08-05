import React from "react";
import styled from "styled-components";

export const Content: React.FC = () => {
  return (
    <Wrapper>
      <p>Hello Content</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
