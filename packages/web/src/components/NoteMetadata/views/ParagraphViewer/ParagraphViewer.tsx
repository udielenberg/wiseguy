import React, { useState } from "react";
import styled from "styled-components";
import { BoldText, TextMarginLeft } from "shared/Styled";

interface Props {
  paragraphs: string[];
}

export const ParagraphViewer = (props: Props) => {
  const [currentCombination, setCurrentCombination] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const { paragraphs } = props;
  const raw = Object.entries(paragraphs);
  const words = raw[currentCombination][0].split(",");
  const rawParagraph = raw[currentCombination][1][currentParagraph];
  const shouldHeightlight = words.join("|");
  const regex = new RegExp(shouldHeightlight, "gi");
  const paragraph = rawParagraph.replace(regex, (s) => {
    return `<span class="highlight">${s}</span>`;
  });

  return (
    <div>
      Paragraphs:
      <Wrapper>
        <div>
          <BoldText>Includes:</BoldText>{" "}
          <TextMarginLeft>{words.join(", ")}</TextMarginLeft>
        </div>
        <p
          className="paragraph"
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  background: #ccc;
  padding: 20px;
  border-radius: 5px;
  margin-top: 10px;

  .paragraph {
    line-height: 200%;
    letter-spacing: 2;
  }

  span.highlight {
    background: yellow;
    padding: 0 2px;
  }
`;
