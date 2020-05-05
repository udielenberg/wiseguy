import React from "react";
import { Note } from "models/Note";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";

import { TabManager } from "./TabManager";
interface Props {
  note: Note;
}

export const tabs = [
  { type: "fresh", title: "Main" },
  { type: "approved", title: "Approved" },
  { type: "rejected", title: "Rejected" },
];

export const NoteMetadata: React.FC<Props> = ({ note }) => {
  const [currentTab, setTab] = React.useState(0);
  const { resources } = note;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div style={{ background: "white" }}>
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
              (resource) => resource.state === type
            ).length;
            return <Tab key={title} label={`${title} (${total})`} />;
          })}
        </Tabs>
      </AppBar>

      <TabManager {...{ currentTab, resources }} />
    </div>
  );
};
