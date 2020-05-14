import React, { useState, useEffect, useCallback } from "react";
import {
  TextMarginLeft,
  StyledChip,
  HorizontalCenterContainer,
  FullCenterContainer,
} from "shared/Styled";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import findLastIndex from "lodash/findLastIndex";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {
  highlightParagraph,
  paragraphCurrrentAndTotal,
} from "./paragraphViewerUtils";
import { Typography } from "@material-ui/core";

interface Props {
  combinations: any[];
  currentNote: number;
}

export const ParagraphViewer = (props: Props) => {
  const { combinations } = props;
  const [combinationIndex, setCombinationIndex] = useState(0);
  const [paragraphIndex, setParagraphIndex] = useState(0);

  useEffect(() => {
    setCombinationIndex(0);
    setParagraphIndex(0);
  }, [props.currentNote]);

  const [joinedWords = "", paragraphs = [] as any] = combinations[
    combinationIndex
  ]
    ? Object.entries(combinations[combinationIndex])[0]
    : [];

  const words = joinedWords.split(",").filter(Boolean);
  const currentParagraph = paragraphs[paragraphIndex];

  const paragraphLocation = paragraphCurrrentAndTotal(
    combinations,
    combinationIndex,
    paragraphIndex
  );

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
  }, [
    combinationIndex,
    combinations.length,
    paragraphIndex,
    paragraphs.length,
  ]);

  const prevParagraph = useCallback(() => {
    if (paragraphIndex === 0) {
      if (combinationIndex === 0) {
        const combinationLastIndex = findLastIndex(combinations);
        setCombinationIndex(combinationLastIndex);

        const lastCombination = combinations[combinationLastIndex];
        const lastCombinationParagraphs = Object.values(
          lastCombination
        )[0] as any[];
        const lastCombinationLastParagraphIndex = findLastIndex(
          lastCombinationParagraphs
        );

        setParagraphIndex(lastCombinationLastParagraphIndex);
      } else {
        const previousCombination = combinations[combinationIndex - 1];
        const previousParagraphs = Object.values(
          previousCombination
        )[0] as any[];
        const totalPreviousParagraphs = findLastIndex(previousParagraphs);

        setCombinationIndex(combinationIndex - 1);
        setParagraphIndex(totalPreviousParagraphs);
      }
    } else {
      setParagraphIndex(paragraphIndex - 1);
    }
  }, [combinationIndex, combinations, paragraphIndex]);

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
  return (
    <div>
      <Typography variant="overline">Paragraphs:</Typography>
      <InnerWrapper>
        <HorizontalNavButton onClick={prevParagraph}>
          <KeyboardArrowUpIcon />
        </HorizontalNavButton>
        <ViewerWrapper>
          <div>
            <FullCenterContainer>
              <HorizontalCenterContainer>
                {words.length ? (
                  <>
                    <Typography variant="overline">Includes:</Typography>
                    <TextMarginLeft style={{ display: "flex" }}>
                      {words.map((word) => (
                        <StyledChip color="secondary" key={word} label={word} />
                      ))}
                    </TextMarginLeft>
                  </>
                ) : null}
              </HorizontalCenterContainer>
              {paragraphLocation.current} / {paragraphLocation.total}
            </FullCenterContainer>
          </div>
          <Typography variant="body1">
            <p
              className="paragraph"
              dangerouslySetInnerHTML={{
                __html: highlightParagraph(currentParagraph, words),
              }}
            />
          </Typography>
        </ViewerWrapper>
        <HorizontalNavButton onClick={nextParagraph}>
          <KeyboardArrowDownIcon />
        </HorizontalNavButton>
      </InnerWrapper>
    </div>
  );
};

const ViewerWrapper = styled.div`
  background: #ccc;
  padding: 20px;
  border-radius: 5px;
  height: 200px;
  overflow: scroll;

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

const InnerWrapper = styled.div`
  margin: 10px 0 20px;
`;
