import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { BoldText, TextMarginLeft } from "shared/Styled";
import Button from "@material-ui/core/Button";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
interface Props {
  paragraphs: string[];
}

export const ParagraphViewer = (props: Props) => {
  const [currentCombination, setCurrentCombination] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(1);

  const { paragraphs } = props;

  // export to utils
  const raw = Object.entries(paragraphs);
  const combinations = raw.map((r) => r[0]);
  const combinationsArray = combinations.map((comb) => comb.split(","));
  const rawParagraph = raw[currentCombination][1];
  const regexHeighlight = combinationsArray.map((arr) => arr.join("|"));
  const shouldHighlight = regexHeighlight[currentCombination];
  const regex = new RegExp(shouldHighlight, "gi");
  const totalParagraphs = rawParagraph.length - 1;
  debugger;
  const totalCombinations = combinationsArray.length - 1;
  console.log("failing one:", rawParagraph[currentParagraph]);
  console.log("currentParagraph:", currentParagraph);
  console.log("rawParagraph:", rawParagraph);
  const paragraph = rawParagraph[currentParagraph].replace(regex, (s) => {
    return `<span class="highlight">${s}</span>`;
  });

  const prevParagraph = useCallback(() => {
    if (currentParagraph > 0) {
      setCurrentParagraph(currentParagraph - 1);
    } else {
      const x =
        (raw[currentCombination - 1] &&
          raw[currentCombination - 1][1].length - 1) ||
        0;
      setCurrentParagraph(x);
      if (currentCombination > 0) {
        setCurrentCombination(currentCombination - 1);
      } else {
        const i = raw.length - 1;
        setCurrentCombination(i);
      }
    }
  }, [currentCombination, currentParagraph, raw]);

  const nextParagraph = useCallback(() => {
    if (currentParagraph < totalParagraphs) {
      setCurrentParagraph((prevState) => prevState + 1);
    } else {
      if (currentCombination < totalCombinations) {
        setCurrentParagraph(0);
        setCurrentCombination((prevState) => prevState + 1);
      } else {
        setCurrentCombination(0);
      }
    }
  }, [
    currentCombination,
    currentParagraph,
    totalCombinations,
    totalParagraphs,
  ]);

  useEffect(() => {
    const handleKeypressDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        nextParagraph();
      }
    };

    const handleKeypressUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        prevParagraph();
      }
    };

    window.addEventListener("keydown", handleKeypressUp);
    window.addEventListener("keydown", handleKeypressDown);

    return () => {
      window.removeEventListener("keydown", handleKeypressUp);
      window.removeEventListener("keydown", handleKeypressDown);
    };
  }, [nextParagraph, prevParagraph]);

  /**
   * 1. add up and down button to move between paragraphs
   * 2. add indicator on the side
   * 3. add animations to the paragraph change
   * 4. add up|down arrow shortcuts to navigate between paragraphs
   */

  // ADD THE WRAPPING CAROUSEL

  return (
    <div>
      Paragraphs:
      <div style={{ marginTop: "10px" }}>
        <HorizontalNavButton onClick={prevParagraph}>
          <KeyboardArrowUpIcon />
        </HorizontalNavButton>
        <Wrapper>
          combination<TempStyle>[{currentCombination}]</TempStyle>
          <TempStyle>[paragraph {currentParagraph}]</TempStyle>
          {/* <div>
            <BoldText>Includes:</BoldText>{" "}
            <TextMarginLeft>{combinationsArray.join(", ")}</TextMarginLeft>
          </div>
          <p
            className="paragraph"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          /> */}
        </Wrapper>
        <HorizontalNavButton onClick={nextParagraph}>
          <KeyboardArrowDownIcon />
        </HorizontalNavButton>
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  background: #ccc;
  padding: 20px;
  border-radius: 5px;

  .paragraph {
    line-height: 200%;
    letter-spacing: 2;
  }

  span.highlight {
    background: yellow;
    padding: 0 2px;
  }
`;

const HorizontalNavButton = styled(Button).attrs({
  fullWidth: true,
  color: "primary",
  variant: "contained",
})`
  text-align: center;
`;

const TempStyle = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;
