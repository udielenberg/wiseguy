import React, { useState, useContext } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";
import { Resource } from "models/Note";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { StyledChip } from "shared/Styled";
import { sortResources } from "./tabManagerUtil";
import { NotesContext } from "context/Notes";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface TabManagerProps {
  resources?: Resource[];
  children?: React.ReactNode;
  currentTab: number;
}

const TabPanel: React.FC<{
  resources: any[];
}> = (props) => {
  const { actions } = useContext(NotesContext);
  const { resources } = props;
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

  const handleApprove = () => {
    actions.moveResource({
      ...currentResource,
      resourceState: "approved",
    });
  };
  const handleReject = () => {
    actions.moveResource({
      ...currentResource,
      resourceState: "rejected",
    });
  };

  if (isEmpty(resources)) {
    return (
      <CenteredMessageWrapper>
        <h3>No resources.</h3>
      </CenteredMessageWrapper>
    );
  }
  return (
    <Wrapper>
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
            <BoldText>{resources[current].description}</BoldText>
          </StyledInfo>

          <StyledInfo>
            <MarginedText>created at: </MarginedText>
            <BoldText>{resources[current].createdAt.toDateString()}</BoldText>
          </StyledInfo>

          <StyledInfo>
            <MarginedText>rating:</MarginedText>{" "}
            <BoldText>{resources[current].rating}</BoldText>
          </StyledInfo>

          <StyledInfo>
            <MarginedText>include words: </MarginedText>
            {resources[current].includeWords?.map(
              (word: string, index: number) => (
                <StyledChip
                  variant="outlined"
                  key={index}
                  size="small"
                  label={word}
                />
              )
            )}
          </StyledInfo>

          <StyledInfo>
            <MarginedText>article:</MarginedText>
            <a href={resources[current].link}>link</a>
          </StyledInfo>

          <ImageContainer>
            {resources[current].images.map((img: string) => (
              <img key={img} src={img} alt="blabla" />
            ))}
          </ImageContainer>

          <StyledInfo>
            written by: <BoldText>{resources[current].writtenBy}</BoldText>
          </StyledInfo>
        </ContentWrapper>

        <Button color="primary" variant="contained" onClick={handleForward}>
          <ArrowForwardIosIcon />
        </Button>
      </CarouselWrapper>
      <ActionWrapper>
        <Button
          onClick={handleApprove}
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
        >
          Approve
        </Button>
        <Button
          onClick={handleReject}
          variant="contained"
          color="secondary"
          startIcon={<ClearIcon />}
        >
          Reject
        </Button>
      </ActionWrapper>
    </Wrapper>
  );
};

export const TabManager: React.FC<TabManagerProps> = (props) => {
  const { currentTab, resources } = props;
  const tabs = ["fresh", "approved", "rejected"];
  const sortedResources = sortResources(resources);
  const relevantResource = sortedResources[tabs[currentTab]] || [];
  return <TabPanel resources={relevantResource} />;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  margin-top: 40px;
`;

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

const CenteredMessageWrapper = styled(Wrapper)`
  justify-content: center;
  align-items: center;
  height: 80vh;
  color: lightgray;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
`;

const CarouselWrapper = styled.div`
  display: flex;
  flex: 1;
`;
