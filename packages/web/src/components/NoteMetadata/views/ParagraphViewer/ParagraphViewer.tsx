import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { BoldText, TextMarginLeft, CenteredText } from "shared/Styled";
import Button from "@material-ui/core/Button";
import findLastIndex from "lodash/findLastIndex";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

interface Props {
  combinations: any[];
}

const combinations = [
  {
    "udi,guy": ["udi guy 0", "udi guy 1", "udi guy 2"],
  },
  {
    "rafi,oz": ["rafi oz 0", "rafi oz 1", "rafi oz 2", "rafi oz 3"],
  },
  {
    "bumpy,aba": ["bumpy aba 0", "bumpy aba 1"],
  },
];

export const ParagraphViewer = (props: Props) => {
  const { combinations } = props;
  const [combinationIndex, setCombinationIndex] = useState(0);
  const [paragraphIndex, setParagraphIndex] = useState(0);

  const arr = Object.entries(combinations[combinationIndex])[0];
  const [joinedWords, paragraphs = []] = arr;
  const words = joinedWords.split(",");
  const currentParagraph = paragraphs[paragraphIndex];

  const totalParagraphs = combinations.flatMap(
    (combination) => Object.values(combination)[0]
  ).length;

  const totals = combinations.reduce((total, combination) => {
    const totalCombination = Object.values(combination)[0];
    const t =
      totalCombination && totalCombination.length ? totalCombination.length : 0;
    total = [...total, t];
    return total;
  }, [] as number[]);

  const getN_Paragraph = (
    totals: number[],
    combinationIndex: number,
    paragraphIndex: number
  ): number => {
    const sum = totals.slice(0, combinationIndex).reduce((a, b) => a + b, 0);
    return sum + paragraphIndex + 1;
  };

  const nParagraphOutOfTotal = getN_Paragraph(
    totals,
    combinationIndex,
    paragraphIndex
  );

  // export to utils
  const highlightParagraph = (paragraph: string, wordsArray: string[]) => {
    try {
      const wordsRegEx = wordsArray.join("|");
      const regex = new RegExp(wordsRegEx, "gi");
      //@ts-ignore
      return paragraph.replace(
        regex,
        (str: string) => `<span class="highlight">${str}</span>`
      );
    } catch (err) {
      console.log(err);
      return "problematic string";
    }
  };

  const wordsToPresent = joinedWords.split(",");

  const nextParagraph = useCallback(() => {
    if (paragraphIndex === paragraphs.length - 1) {
      if (combinationIndex === combinations.length - 1) {
        setParagraphIndex(0);
        setCombinationIndex(0);
      } else {
        setParagraphIndex(0);
        setCombinationIndex(combinationIndex + 1);
      }
    } else {
      setParagraphIndex(paragraphIndex + 1);
    }
  }, [combinationIndex, paragraphIndex, paragraphs.length]);

  const prevParagraph = useCallback(() => {
    if (paragraphIndex === 0) {
      if (combinationIndex === 0) {
        const combinationLastIndex = findLastIndex(combinations);
        setCombinationIndex(combinationLastIndex);

        const lastCombination = combinations[combinationLastIndex];
        const lastCombinationParagraphs = Object.values(lastCombination)[0];
        const lastCombinationLastParagraphIndex = findLastIndex(
          lastCombinationParagraphs
        );

        setParagraphIndex(lastCombinationLastParagraphIndex);
      } else {
        const previousCombination = combinations[combinationIndex - 1];
        const previousParagraphs = Object.values(previousCombination)[0];
        const totalPreviousParagraphs = findLastIndex(previousParagraphs);

        setCombinationIndex(combinationIndex - 1);
        setParagraphIndex(totalPreviousParagraphs);
      }
    } else {
      setParagraphIndex(paragraphIndex - 1);
    }
  }, [combinationIndex, paragraphIndex]);

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
   * 3. add animations to the paragraph change
   * 4. export engine into a custom hook (optional)
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
          <CenteredText>
            <BoldText>
              {nParagraphOutOfTotal} / {totalParagraphs}
            </BoldText>
          </CenteredText>

          <div>
            <BoldText>Includes:</BoldText>
            <TextMarginLeft>{wordsToPresent.join(", ")}</TextMarginLeft>
          </div>
          <p
            className="paragraph"
            dangerouslySetInnerHTML={{
              __html: highlightParagraph(currentParagraph, words),
            }}
          />
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
