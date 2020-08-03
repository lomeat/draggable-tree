import React, { useState } from "react";
import styled from "styled-components";

import { listModel } from "./models";

export const App: React.FunctionComponent = () => {
  const [list, setList] = useState(listModel.state.lists);

  console.log(list);

  return (
    <Wrapper>
      <h1>Hello there</h1>
      {/* <div>{list}</div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
