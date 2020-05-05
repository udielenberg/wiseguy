import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";
import { Resource } from "models/Note";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
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
  const { resources } = props;
  const [current, setCurrent] = useState<number>(0);
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

  // TODO:move outside
  const style = { padding: 5 };
  const textStyle = { fontWeight: "bold" } as React.CSSProperties;
  const subjectStyle = { marginRight: 5 };

  if (isEmpty(resources)) {
    return (
      <Wrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h3>No resources.</h3>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div style={{ display: "flex", flex: 1 }}>
        <Button color="primary" variant="contained" onClick={handleBack}>
          <ArrowBackIosIcon />
        </Button>
        <div style={{ flex: 1, padding: 20 }}>
          <div>
            <span>
              {current + 1}/{resources.length}
            </span>
          </div>
          <div style={style}>
            <span style={subjectStyle}>description:</span>{" "}
            <span style={textStyle}>{resources[current].description}</span>
          </div>

          <div style={style}>
            <span style={subjectStyle}>created at: </span>
            <span style={textStyle}>
              {resources[current].createdAt.toDateString()}
            </span>
          </div>

          <div style={style}>
            <span style={subjectStyle}>rating:</span>{" "}
            <span style={textStyle}>{resources[current].rating}</span>
          </div>

          <div style={style}>
            <span style={subjectStyle}>include words: </span>
            {resources[current].includeWords?.map(
              (word: string, index: number) => (
                <span
                  style={{
                    backgroundColor: "lightgray",
                    borderRadius: 5,
                    padding: 2,
                    marginRight: 5,
                  }}
                  key={index}
                >
                  {word}
                </span>
              )
            )}
          </div>

          <div style={style}>
            <span style={subjectStyle}>article:</span>
            <a style={style} href={resources[current].link}>
              link
            </a>
          </div>

          <div
            style={{
              padding: 10,
              backgroundColor: "lightgray",
              borderRadius: 5,
            }}
          >
            {resources[current].images.map((img: string) => (
              <img
                style={{ marginRight: 10 }}
                width={100}
                height={100}
                key={img}
                src={img}
                alt="blabla"
              />
            ))}
          </div>

          <div style={style}>
            written by:{" "}
            <span style={textStyle}>{resources[current].writtenBy}</span>
          </div>
        </div>

        <Button color="primary" variant="contained" onClick={handleForward}>
          <ArrowForwardIosIcon />
        </Button>
      </div>
      <div
        style={{
          marginTop: 30,
          display: "flex",
          flexBasis: "50px",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" color="primary" startIcon={<CheckIcon />}>
          (Left arrow)
        </Button>
        <Button variant="contained" color="secondary" startIcon={<ClearIcon />}>
          (Right arrow)
        </Button>
      </div>
    </Wrapper>
  );
};

export const TabManager: React.FC<TabManagerProps> = (props) => {
  const { currentTab, resources } = props;
  const tabs = ["fresh", "approved", "rejected"];
  const sortedResources = resources?.reduce((all: any, resource: Resource) => {
    if (all[resource.state]) {
      all[resource.state].push(resource);
    } else {
      all[resource.state] = [];
      all[resource.state].push(resource);
    }
    return all;
  }, {});

  const relevantResource = sortedResources[tabs[currentTab]] || [];
  return <TabPanel resources={relevantResource} />;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  margin-top: 40px;
`;
