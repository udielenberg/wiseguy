import React from "react";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  word: {
    margin: "0 5px",
  },
});

const IncludeWords: React.FC<any> = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      {data.map((word: string, index: number) => {
        return (
          <Chip
            className={classes.word}
            key={index}
            size="small"
            label={word}
          />
        );
      })}
    </>
  );
};

const LastVisit: React.FC<any> = ({ data }) => {
  return <Typography variant="overline">{data.toDateString()}</Typography>;
};
const Created: React.FC<any> = ({ data }) => {
  return <Typography variant="overline">{data.toDateString()}</Typography>;
};
const Search: React.FC<any> = ({ data }) => {
  return <span>{data}</span>;
};

const Open: React.FC<any> = ({ open }) => {
  return <button onClick={open}>Open</button>;
};
const Remove: React.FC<any> = ({ remove }) => {
  return <button onClick={remove}>Remove</button>;
};

interface Props {
  field: string;
  data: any;
}

export const Cell: React.FC<Props> = (props) => {
  const { field, data } = props;

  if (field === "search") {
    return <Search data={data.search} />;
  }
  if (field === "includeWords") {
    return <IncludeWords data={data.includeWords} />;
  }
  if (field === "lastVisit") {
    return <LastVisit data={data.lastVisit} />;
  }
  if (field === "open") {
    return <Open open={data.open} />;
  }
  if (field === "remove") {
    return <Remove remove={data.remove} />;
  }
  if (field === "created") {
    return <Created data={data.created} />;
  } else {
    throw Error(`invalid field: ${field}`);
  }
};
