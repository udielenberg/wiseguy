import React from "react";
import styled from "styled-components";

export const CenteredLayout: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  text-align: center;
`;
