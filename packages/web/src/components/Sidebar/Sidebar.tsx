import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <Wrapper>
      <Link to="/">Wiseguy</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.m};
  width: 100px;
  background: ${({ theme }) => theme.colors.primary};
`;
