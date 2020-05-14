import React from "react";
import styled from "styled-components";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ParagraphViewer } from "./ParagraphViewer";
import {
  ScrollableContainer,
  CenteredText,
  Italic,
  StyledChip,
} from "shared/Styled";
import Info from "shared/Info";
import { securedNewWindow } from "utils/settings";
import { useRightLeftKeys } from "hooks/keyboard";
import star from "assets/star.svg";
import { Typography } from "@material-ui/core";
import { formattedDate } from "utils/date";
interface Props {
  approve(resource: any): void;
  reject(resource: any): void;
  resources: any[];
}

export const ClassicView = (props: Props) => {
  const { approve, reject, resources } = props;
  const { left, right, current } = useRightLeftKeys(resources);

  const currentResource = {
    noteId: resources[current]?.noteId,
    resourceId: resources[current]?.id,
  };
  if (resources.length) {
    const {
      description,
      createdAt,
      rating,
      link,
      images,
      relevantParagraphs,
      writtenBy,
      domain,
    } = resources[current];
    return (
      <>
        <MainWrapper>
          <Button color="primary" variant="contained" onClick={left}>
            <ArrowBackIosIcon />
          </Button>
          <ScrollableContainer>
            <CenteredText>
              <Italic>
                ({current + 1} / {resources.length})
              </Italic>
            </CenteredText>
            <CarouselWrapper>
              <ContentWrapper>
                <ParagraphViewer
                  combinations={relevantParagraphs}
                  currentNote={current}
                />
                <Info title="description" content={description} />
                <Info
                  title="created at"
                  content={
                    <Typography variant="overline">
                      {formattedDate(createdAt)}
                    </Typography>
                  }
                />
                <Info
                  title="rating"
                  content={
                    <span>
                      <img src={star} alt="star" />
                      {rating}
                      <img src={star} alt="star" />
                    </span>
                  }
                />
                <Info
                  title="domain"
                  content={
                    <StyledChip color="primary" label={domain}></StyledChip>
                  }
                />
                <Info
                  title="article"
                  content={
                    <a {...securedNewWindow} href={link}>
                      link
                    </a>
                  }
                />
                {images.length ? (
                  <Info
                    title="images"
                    content={
                      <ImageContainer>
                        {images.map((img: string) => (
                          <img key={img} src={img} alt="blabla" />
                        ))}
                      </ImageContainer>
                    }
                  />
                ) : null}
                <Info title="written by" content={writtenBy} />
              </ContentWrapper>
            </CarouselWrapper>
          </ScrollableContainer>
          <Button color="primary" variant="contained" onClick={right}>
            <ArrowForwardIosIcon />
          </Button>
        </MainWrapper>
        <ActionWrapper>
          <Button
            onClick={() => approve(currentResource)}
            variant="contained"
            color="primary"
            startIcon={<CheckIcon />}
          >
            Approve
          </Button>
          <Button
            onClick={() => reject(currentResource)}
            variant="contained"
            color="secondary"
            startIcon={<ClearIcon />}
          >
            Reject
          </Button>
        </ActionWrapper>
      </>
    );
  }
  return <div>empty</div>;
};

const MainWrapper = styled.div`
  display: flex;
  height: 60vh;
`;

const ImageContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: lightgray;
  border-radius: 5px;

  img {
    margin-right: 10px;
    width: 100px;
    height: 100px;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 50px;
  margin-top: 30px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
`;

const CarouselWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-basis: 100%;
`;
