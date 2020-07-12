import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Resource, ResourceState } from "models/Note";
import { NotesContext } from "context/Notes/";
import { sortAllResourcesByState, SortedAllResources } from "utils/noteUtils";
import { Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import { formattedDate } from "utils/date";
import { Card } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
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

interface ResourceAction {
  text: string;
  onClick: (ids: RelevantIds) => void;
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

  let buttons: ResourceAction[];
  const approveBtn = { text: "approve", onClick: approve };
  const rejectBtn = { text: "reject", onClick: reject };
  const unreadBtn = { text: "mark as unread", onClick: untouch };

  if (viewType === "approved") {
    buttons = [rejectBtn, unreadBtn];
  } else if (viewType === "rejected") {
    buttons = [approveBtn, unreadBtn];
  } else {
    throw new Error(`unknown viewType: ${viewType}`);
  }

  const resources = sortedResources[viewType as ResourceState];
  return (
    <Wrapper>
      <h1>ListView</h1>
      <Typography className="title" variant="h5">
        {viewType} Resources
      </Typography>

      {resources.length ? (
        resources.map((resource) => {
          return (
            <ResourceItem
              key={resource.id}
              {...{ resource }}
              actions={buttons}
            />
          );
        })
      ) : (
        <EmptyList>List is empty.</EmptyList>
      )}
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

interface ResourceItemProps {
  // resource: Resource & Pick<Note, "search" | "includeWords">;
  resource: any; //TODO: type Resource + note.search + note.includeWords
  actions: ResourceAction[];
}

const ResourceItem: React.FC<ResourceItemProps> = ({ resource, actions }) => {
  // add StyledCard
  const {
    search = "note search value",
    link = "http://www.walla.co.il",
    description = "lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum",
    createdAt = new Date().toTimeString(),
  } = resource;
  const includeWords = ["one", "two", "three"]; // TODO: bring it from Note somehow

  return (
    <StyledCard>
      <CardHeader title={search} subheader={formattedDate(createdAt)} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {actions.map(({ text, onClick }) => {
          return (
            <MyButton
              {...{
                text,
                onClick,
                relevantIds: {
                  resourceId: resource.id,
                  noteId: resource.noteId,
                },
              }}
              key={text}
            />
          );
        })}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="open in new window">
            <OpenInNewIcon />
          </IconButton>
        </a>
      </CardActions>
    </StyledCard>
  );
};

const StyledCard = styled(Card).attrs({ elevation: 4 })`
  margin: 10px 0;
`;

const EmptyList = styled.div`
  margin-top: 50px;
  padding: 20px;
  color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
`;
