import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { Link } from "@material-ui/core";
import { Resource } from "models/Note";
import styled from "styled-components";
import { CurrentResource } from "../TabManager";
import Button from "@material-ui/core/Button";
import { securedNewWindow } from "utils/settings";
interface Props {
  resources: Resource[];
  setApprove(resource: any): void;
  setUnread(resource: any): void;
}

export const RejectedList = (props: Props) => {
  const { resources, setApprove, setUnread } = props;
  const handleClickApprove = (
    e: React.MouseEvent<HTMLElement>,
    resource: CurrentResource
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setApprove(resource);
  };

  const handleClickUnread = (
    e: React.MouseEvent<HTMLElement>,
    resource: CurrentResource
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setUnread(resource);
  };

  return (
    <List>
      {resources.map((resource) => {
        const ids = {
          noteId: resource.noteId,
          resourceId: resource.id,
        };

        return (
          // @ts-ignore
          <StyledListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <StyledLink href={resource.link} {...securedNewWindow}>
                <ListItemText
                  primary={resource.description}
                  secondary={resource.createdAt.toDateString()}
                />
              </StyledLink>

              <StyledActions>
                <StyledButton
                  variant="contained"
                  onClick={(e) => handleClickUnread(e, ids)}
                >
                  unread
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={(e) => handleClickApprove(e, ids)}
                >
                  approved
                </StyledButton>
              </StyledActions>
            </div>
          </StyledListItem>
        );
      })}
    </List>
  );
};

const StyledListItem = styled(ListItem)`
  &:nth-child(even) {
    background: rgba(0, 0, 0, 0.1);
  }
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledLink = styled(Link)`
  flex: 1;
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  &.MuiButton-root {
    margin: 0 10px;
  }
`;
