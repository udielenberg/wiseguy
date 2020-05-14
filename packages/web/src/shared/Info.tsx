import React from "react";
import { Bold, TextMarginRight } from "./Styled";
import styled from "styled-components";
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
      <TextMarginRight>{title}:</TextMarginRight>
      {contentToRender}
    </Wrapper>
  );
};
export default Info;

const Wrapper = styled.div`
  padding: 5px;
`;
