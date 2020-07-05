import React from "react";
import { TextMarginRight } from "./Styled";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import isString from "lodash/isString";
import isNumber from "lodash/isNumber";
interface InfoProps {
  title: string;
  content: string | React.ReactNode;
  oneLine?: boolean;
}

const Info = (props: InfoProps) => {
  const { title, content, oneLine = false } = props;
  const contentToRender =
    isString(content) || isNumber(content) ? (
      <Typography>{content}</Typography>
    ) : (
      content
    );
  return (
    <Wrapper>
      <div style={{ display: "inline-block" }}>
        <TextMarginRight>
          <Typography variant="overline">{title}:</Typography>
        </TextMarginRight>
      </div>
      <Content {...{ oneLine }}>{contentToRender}</Content>
    </Wrapper>
  );
};
export default Info;

const Wrapper = styled.div`
  padding: 5px;
`;

const Content = styled.div<{ oneLine: boolean }>`
  display: ${({ oneLine }) => (oneLine ? "inline-block" : "block")};
`;
