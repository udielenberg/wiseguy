import React, { useState } from "react";
import styled from "styled-components";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
    return (
      <>
        <CarouselWrapper>
          <Button color="primary" variant="contained" onClick={handleBack}>
            <ArrowBackIosIcon />
          </Button>
          <ContentWrapper>
            <StyledInfo>
              <MarginedText>
                ({current + 1}/{resources.length})
              </MarginedText>
            </StyledInfo>
            <StyledInfo>
              <MarginedText>description:</MarginedText>{" "}
              <BoldText>{resources[current]?.description}</BoldText>
            </StyledInfo>

            <StyledInfo>
              <MarginedText>created at: </MarginedText>
              <BoldText>
                {resources[current]?.createdAt.toDateString()}
              </BoldText>
            </StyledInfo>

            <StyledInfo>
              <MarginedText>rating:</MarginedText>{" "}
              <BoldText>{resources[current]?.rating}</BoldText>
            </StyledInfo>

            <StyledInfo>
              <MarginedText>article:</MarginedText>
              <a href={resources[current]?.link}>link</a>
            </StyledInfo>

            <ImageContainer>
              {resources[current]?.images.map((img: string) => (
                <img key={img} src={img} alt="blabla" />
              ))}
            </ImageContainer>

            <StyledInfo>
              written by: <BoldText>{resources[current]?.writtenBy}</BoldText>
            </StyledInfo>
          </ContentWrapper>

          <Button color="primary" variant="contained" onClick={handleForward}>
            <ArrowForwardIosIcon />
          </Button>
        </CarouselWrapper>
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

const StyledInfo = styled.div`
  padding: 5px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const MarginedText = styled.span`
  margin-right: 5px;
`;

const ImageContainer = styled.div`
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
`;
