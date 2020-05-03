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

export const NoteMetadata: React.FC<Props> = ({ note }) => {
  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  console.log("note metadata:", note);
  return (
    <Paper square>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          variant="fullWidth"
        >
          <Tab label="Main" />
          <Tab label="Approved" />
          <Tab label="Rejected" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {note.resources.map((r) => (
          <div>{r}</div>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {note.approved.map((r) => (
          <div>{r}</div>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {note.rejected.map((r) => (
          <div>{r}</div>
        ))}
      </TabPanel>
    </Paper>
  );
};
