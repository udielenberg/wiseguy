import React from "react";
import styled from "styled-components";

export const Sidebar = () => {
  return <Wrapper>Wiseguy</Wrapper>;
};

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.m};
  width: 100px;
  background: ${({ theme }) => theme.colors.primary};
`;
