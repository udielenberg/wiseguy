import React from "react";
import { Note } from "models/Note";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

interface Props {
  note: Note;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface TabManagerProps {
  tabIndex: number;
  data: any;
  title: number;
  children?: React.ReactNode;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TabManager: React.FC<TabManagerProps> = (props) => {
  const { tabIndex, data, title, children } = props;
  return (
    <TabPanel value={title} index={tabIndex}>
      {data.map((d: any) => (
        <div>
          <div>{d}</div>
          <div>{children}</div>
        </div>
      ))}
    </TabPanel>
  );
};

const tabs = ["Main", "Approved", "Rejected"];

export const NoteMetadata: React.FC<Props> = ({ note }) => {
  const [tab, setTab] = React.useState(2);
  const { resources, approved, rejected } = note;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  console.log("note metadata:", note);
  return (
    <Paper square>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          variant="fullWidth"
        >
          {tabs.map((tab) => (
            <Tab key={tab} label={`${tab} (${note.resources.length})`} />
          ))}
        </Tabs>
      </AppBar>
      {[resources, approved, rejected].map((data, tabIndex) => (
        <TabManager key={tabIndex} {...{ data, tabIndex, title: tab }} />
      ))}
    </Paper>
  );
};
