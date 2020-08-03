import React, { useState } from "react";
import styled from "styled-components";

import { Sidebar } from "./Sidebar";
import { Content } from "./Content";

export const App: React.FunctionComponent = () => {
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
