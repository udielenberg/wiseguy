import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Resource, ResourceState } from "models/Note";
import { NotesContext } from "context/Notes/";
import { sortAllResourcesByState, SortedAllResources } from "utils/noteUtils";
import { Typography, List, Button } from "@material-ui/core";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { formattedDate } from "utils/date";
import Box from "@material-ui/core/Box";

interface Props {
  data: Resource[];
  type: string;
}

interface RelevantIds {
  noteId: string;
  resourceId: string;
}

interface ButtonProps {
  onClick?: any;
  text: string;
  relevantIds: RelevantIds;
}

const MyButton: React.FC<ButtonProps> = ({ onClick, text, relevantIds }) => {
  const moveResource = () => {
    onClick(relevantIds);
  };
  return (
    <Button
      onClick={moveResource}
      className="button"
      variant="contained"
      color="primary"
    >
      {text}
    </Button>
  );
};

export const ListView: React.FC<Props> = ({ data, type }) => {
  const { type: viewType } = useParams();
  const {
    state: { notes },
    actions: { moveResource },
  } = useContext(NotesContext);

  const sortedResources: SortedAllResources = sortAllResourcesByState(notes);
  const reject = ({ noteId, resourceId }: RelevantIds) => {
    moveResource({
      resourceState: "rejected",
      ...{ noteId, resourceId },
    });
  };
  const approve = ({ noteId, resourceId }: RelevantIds) => {
    moveResource({
      resourceState: "approved",
      ...{ noteId, resourceId },
    });
  };
  const untouch = ({ noteId, resourceId }: RelevantIds) => {
    moveResource({
      resourceState: "fresh",
      ...{ noteId, resourceId },
    });
  };

  let buttons: { text: string; onClick: (ids: RelevantIds) => void }[];
  const approveBtn = { text: "approve", onClick: approve };
  const rejectBtn = { text: "reject", onClick: reject };
  const untouchBtn = { text: "untouch", onClick: untouch };

  if (viewType === "approved") {
    buttons = [rejectBtn, untouchBtn];
  } else if (viewType === "rejected") {
    buttons = [approveBtn, untouchBtn];
  } else {
    buttons = [approveBtn, rejectBtn];
  }

  const resources = sortedResources[viewType as ResourceState];
  return (
    <Wrapper>
      <h1>ListView</h1>
      <Typography className="title" variant="h5">
        {viewType} Resources
      </Typography>

      {resources.length ? (
        <List dense>
          {resources.map((resource: Resource) => {
            return (
              <ListItem className="resource-item" key={resource.id}>
                <ListItemText primary={formattedDate(resource.createdAt)} />
                <ListItemText
                  primary={
                    <div
                      style={{
                        width: 400,
                        maxHeight: 100,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Box
                        component="div"
                        my={4}
                        textOverflow="ellipsis"
                        overflow="hidden"
                      >
                        {resource.description}
                      </Box>
                    </div>
                  }
                />
                <ListItemText primary={<a href={resource.link}>link</a>} />
                {buttons.map(({ text, onClick }) => (
                  <MyButton
                    key={text}
                    {...{
                      text,
                      onClick,
                      relevantIds: {
                        resourceId: resource.id,
                        noteId: resource.noteId,
                      },
                    }}
                  />
                ))}
              </ListItem>
            );
          })}
        </List>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  && {
    .MuiList-root {
      padding: 0;
      margin: 20px 0;
      border: 1px solid gray;
    }
  }
  .title {
    text-transform: capitalize;
  }

  .resource-item {
    &:nth-child(odd) {
      background: lightgray;
    }
  }

  .button {
    margin: 0 10px;
  }
`;
