import React from "react";
import { Input } from "semantic-ui-react";
import styled from "styled-components";

export const AddNote = () => {
  return (
    <Wrapper>
      <Input size="huge" icon="add" placeholder="Add note..." />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding-top: 50px;
`;
