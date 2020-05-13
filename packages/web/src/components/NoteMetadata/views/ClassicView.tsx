import React, { useState } from "react";
import styled from "styled-components";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ParagraphViewer } from "./ParagraphViewer";
import { ScrollableContainer } from "shared/Styled";
import Info from "shared/Info";

interface Props {
  approve(resource: any): void;
  reject(resource: any): void;
  resources: any[];
}

export const ClassicView = (props: Props) => {
  const { approve, reject, resources } = props;
  const [current, setCurrent] = useState<number>(0);

  const currentResource = {
    noteId: resources[current]?.noteId,
    resourceId: resources[current]?.id,
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent((prevState) => prevState - 1);
    }
  };
  const handleForward = () => {
    if (current < resources.length - 1) {
      setCurrent((prevState) => prevState + 1);
    }
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
    } = resources[current];
    console.log("rating:", rating);
    return (
      <>
        <MainWrapper>
          <Button color="primary" variant="contained" onClick={handleBack}>
            <ArrowBackIosIcon />
          </Button>
          <ScrollableContainer>
            <CarouselWrapper>
              <ContentWrapper>
                <ParagraphViewer
                  combinations={relevantParagraphs}
                  currentNote={current}
                />
                <Info title="description" content={description} />
                <Info title="created at" content={createdAt.toDateString()} />
                <Info title="rating" content={rating} />
                <Info title="article" content={<a href={link}>link</a>} />
                {images.length ? (
                  <Info
                    title="article"
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
          <Button color="primary" variant="contained" onClick={handleForward}>
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
