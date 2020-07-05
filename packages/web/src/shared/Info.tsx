import React from "react";
import { TextMarginRight } from "./Styled";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import isString from "lodash/isString";
import isNumber from "lodash/isNumber";
interface InfoProps {
  title: string;
  content: string | React.ReactNode;
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
      <div>{contentToRender}</div>
    </Wrapper>
  );
};
export default Info;

const Wrapper = styled.div`
  padding: 5px;
`;
