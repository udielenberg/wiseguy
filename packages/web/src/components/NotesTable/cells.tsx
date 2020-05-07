import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { StyledChip } from "shared/Styled";

const IncludeWords: React.FC<any> = ({ data }) => {
  return (
    <>
      {data.map((word: string, index: number) => {
        return (
          <StyledChip
            variant="outlined"
            key={index}
            size="small"
            label={word}
          />
        );
      })}
    </>
  );
};

const Created: React.FC<any> = ({ data }) => {
  return <Typography variant="overline">{data.toDateString()}</Typography>;
};
const Search: React.FC<any> = ({ data }) => {
  return <span>{data}</span>;
};

interface Props {
  field: string;
  data: any;
}

export const CellType: React.FC<Props> = (props) => {
  const { field, data } = props;

  if (field === "search") {
    return <Search data={data.search} />;
  }
  if (field === "includeWords") {
    return <IncludeWords data={data.includeWords} />;
  }
  if (field === "remove") {
    return (
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          data.remove();
        }}
        color="secondary"
        aria-label="add an alarm"
      >
        <DeleteIcon />
      </IconButton>
    );
  }
  if (field === "created") {
    return <Created data={data.created} />;
  } else {
    throw Error(`invalid field: ${field}`);
  }
};
