import React from "react";
import { Bold, TextMarginRight } from "./Styled";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
interface InfoProps {
  title: string;
  content: string | React.ReactNode;
}

const Info = (props: InfoProps) => {
  const { title, content } = props;
  const contentToRender =
    typeof content === "string" || typeof content === "number" ? (
      <Bold>{content}</Bold>
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
      <div style={{ display: "inline-block" }}>{contentToRender}</div>
    </Wrapper>
  );
};
export default Info;

const Wrapper = styled.div`
  padding: 5px;
`;
