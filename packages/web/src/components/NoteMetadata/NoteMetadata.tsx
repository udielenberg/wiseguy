import React from "react";
import { Note } from "models/Note";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

interface Props {
  note: Note;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface TabManagerProps {
  value: number;
  index: number;
  data: any;
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
  const style = { padding: 5 };
  const textStyle = { fontWeight: "bold" } as React.CSSProperties;
  const subjectStyle = { marginRight: 5 };
  const { value, index, data, children } = props;
  return (
    <TabPanel value={value} index={index}>
      <div style={style}>
        <span style={subjectStyle}>description:</span>{" "}
        <span style={textStyle}>{data.description}</span>
      </div>
      <div style={style}>
        <span style={subjectStyle}>created at: </span>
        <span style={textStyle}>{data.createdAt.toDateString()}</span>
      </div>
      <div style={style}>
        <span style={subjectStyle}>rating:</span>{" "}
        <span style={textStyle}>{data.rating}</span>
      </div>
      <div style={style}>
        <span style={subjectStyle}>tags: </span>
        {data.includeWords.map(
          (word: { label: string; value: string }, index: number) => (
            <span
              style={{
                backgroundColor: "lightgray",
                borderRadius: 5,
                padding: 2,
                marginRight: 5,
              }}
              key={index}
            >
              {word.label}
            </span>
          )
        )}
      </div>
      <div style={style}>
        <span style={subjectStyle}>article:</span>
        <a style={style} href={data.link}>
          link
        </a>
      </div>
      <div
        style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 5 }}
      >
        {data.images.map((img: string) => (
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
        written by: <span style={textStyle}>{data.writtenBy}</span>
      </div>
      <div
        style={{
          marginTop: 30,
          display: "flex",
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
    </TabPanel>
  );
};

const tabs = [
  { type: "fresh", title: "Main" },
  { type: "approved", title: "Approved" },
  { type: "rejected", title: "Rejected" },
];

export const NoteMetadata: React.FC<Props> = ({ note }) => {
  const [tabIndex, setTab] = React.useState(0);
  const { resources } = note;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  return (
    <Paper square>
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
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
      {resources.map((data, index) => {
        return <TabManager key={index} {...{ data, index, value: tabIndex }} />;
      })}
    </Paper>
  );
};
