import React, { useContext, useState } from "react";
import { Resource } from "models/Note";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { TabManager } from "./TabManager";
import styled from "styled-components";
import { NotesContext } from "context/Notes/";
import { Typography } from "@material-ui/core";
import { ResourceState } from "models/Note";

interface Tab {
  type: ResourceState;
  title: string;
}
export const tabs: Tab[] = [
  { type: "fresh", title: "Main" },
  { type: "approved", title: "Approved" },
  { type: "rejected", title: "Rejected" },
];

export const NoteMetadata = () => {
  const { state } = useContext(NotesContext);
  const { selectedNote } = state;
  const [currentTab, setTab] = useState(0);

  const handleChange = (_: any, newValue: number) => {
    setTab(newValue);
  };

  if (selectedNote) {
    const { resources } = selectedNote;
    return (
      <Wrapper>
        <SearchTitle>"{selectedNote.search}"</SearchTitle>
        <AppBar position="static" color="default">
          <Tabs
            value={currentTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
            variant="fullWidth"
          >
            {tabs.map(({ type, title }) => {
              const total = resources.filter(
                (resource: Resource) => resource.state === type
              ).length;

              return <Tab key={title} label={`${title} (${total})`} />;
            })}
          </Tabs>
        </AppBar>

        <TabManager {...{ currentTab, resources }} />
      </Wrapper>
    );
  } else return null;
};

const Wrapper = styled.div`
  background: white;
  height: 100%;
  padding: 15px;
  box-shadow: 10px 10px 19px -9px rgba(0, 0, 0, 0.75);
`;

const SearchTitle = styled(Typography).attrs({ variant: "h3" })`
  padding: 20px 0;
  text-align: center;
`;
