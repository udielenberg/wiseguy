import React from "react";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  word: {
    margin: "0 5px",
  },
});
const Tags: React.FC<any> = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      {data.includeWords.map((word: any) => (
        <Chip className={classes.word} key={word} size="small" label={word} />
      ))}
    </>
  );
};

const LastVisit: React.FC<any> = ({ data }) => {
  return (
    <Typography variant="overline">{data.lastVisit?.toDateString()}</Typography>
  );
};
const Created: React.FC<any> = ({ data }) => {
  return (
    <Typography variant="overline">{data.created?.toDateString()}</Typography>
  );
};
const Search: React.FC<any> = ({ data }) => {
  return <span>{data.search}</span>;
};

const Open: React.FC<any> = ({ data }) => {
  return <button onClick={data.open}>Open</button>;
};
const Remove: React.FC<any> = ({ data }) => {
  return <button onClick={data.remove}>Remove</button>;
};

interface Props {
  field: string;
  data: any;
}

export const Cell: React.FC<Props> = (props) => {
  const { field, data } = props;

  if (field === "search") {
    return <Search data={data} />;
  }
  if (field === "includeWords") {
    return <Tags data={data} />;
  }
  if (field === "lastVisit") {
    return <LastVisit data={data} />;
  }
  if (field === "open") {
    return <Open data={data} />;
  }
  if (field === "remove") {
    return <Remove data={data} />;
  }
  if (field === "created") {
    return <Created data={data} />;
  } else {
    throw Error("Invalid field");
  }
};

const Wrapper = styled.div``;
