import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ViewListIcon from "@material-ui/icons/ViewList";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

interface MenuLink {
  title: string;
  Icon: any;
  path?: string;
  subLinks?: MenuLink[];
}

const links: MenuLink[] = [
  { title: "Notes", path: "/", Icon: ViewListIcon },
  {
    title: "Views",
    Icon: InboxIcon,
    subLinks: [
      {
        title: "untouched",
        path: "/view/fresh",
        Icon: AccessibilityNewIcon,
      },
      { title: "approved", path: "/view/approved", Icon: ThumbUpIcon },
      { title: "rejected", path: "/view/rejected", Icon: ThumbDownIcon },
    ],
  },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Link to="/">Wiseguy</Link>
      </LogoWrapper>
      <ListWrapper>
        {links.map(({ title, path, Icon, subLinks }) => {
          return path ? (
            <MenuLink to={path} key={title}>
              <ListItem button>
                <ItemIcon>
                  <Icon className="icon" />
                </ItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </MenuLink>
          ) : (
            <div key={title}>
              <ListItem button onClick={handleClick}>
                <ItemIcon>
                  <Icon className="icon" />
                </ItemIcon>
                <ListItemText primary={title} />
                {open ? <ExpandMore /> : <ExpandLess />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding component="div">
                  {subLinks &&
                    subLinks.map((subLink) => {
                      return (
                        <MenuLink to={subLink.path || "/"} key={subLink.title}>
                          <NestedItem>
                            <ItemIcon>
                              <subLink.Icon className="icon" />
                            </ItemIcon>
                            <ListItemText primary={subLink.title} />
                          </NestedItem>
                        </MenuLink>
                      );
                    })}
                </List>
              </Collapse>
            </div>
          );
        })}
      </ListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex-basis: 250px;
  padding: ${({ theme }) => theme.spacing.m};
  background: ${({ theme }) => theme.colors.primary};
`;

const LogoWrapper = styled.div`
  border: 1px solid black;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListWrapper = styled(List).attrs({
  disablePadding: true,
  component: "nav",
  "aria-labelledby": "nested-list-subheader",
})`
  width: 100%;
  max-width: 360px;
  color: ${({ theme }) => theme.colors.white};
`;
const NestedItem = styled(ListItem).attrs({
  button: true,
})`
  && {
    padding-left: 30px;
  }
`;

const MenuLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  text-transform: capitalize;
`;

const ItemIcon = styled(ListItemIcon)`
  .icon {
    color: ${({ theme }) => theme.colors.white};
    font-size: 20px;
  }
`;
