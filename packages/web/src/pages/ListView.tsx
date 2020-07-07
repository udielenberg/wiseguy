import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Resource, ResourceState } from "models/Note";
import { NotesContext } from "context/Notes/";
import { sortAllResourcesByState, SortedAllResources } from "utils/noteUtils";
import { Typography, List } from "@material-ui/core";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { formattedDate } from "utils/date";
import Box from "@material-ui/core/Box";

interface Props {
  data: Resource[];
  type: string;
}

export const ListView: React.FC<Props> = ({ data, type }) => {
  const { type: viewType } = useParams();
  const {
    state: { notes },
  } = useContext(NotesContext);

  const sortedResources: SortedAllResources = sortAllResourcesByState(notes);

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
              <ListItem className="resource-item">
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
`;
