import React from "react";
import styled from "styled-components";

import { Sidebar } from "./Sidebar";
import { Content } from "./Content";

export const App: React.FC = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Content />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
