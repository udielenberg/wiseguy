import React, { useState, useContext } from "react";
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
import { NotesContext } from "context/Notes/";
import { sortAllResourcesByState } from "utils/noteUtils";
import wiseguyLogo from "assets/wiseguy-01.png";
interface MenuLink {
  id: string;
  title: string | React.ReactNode;
  Icon: any;
  path?: string;
  subLinks?: MenuLink[];
}

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const {
    state: { notes },
  } = useContext(NotesContext);

  const { approved, rejected } = sortAllResourcesByState(notes);

  const links: MenuLink[] = [
    { id: "notes", title: "Notes", path: "/", Icon: ViewListIcon },
    {
      id: "resources",
      title: "Resources",
      Icon: InboxIcon,
      subLinks: [
        {
          id: "approved",
          title: (
            <div className="title">
              approved <span className="counter">({approved.length})</span>
            </div>
          ),
          path: "/resources/approved",
          Icon: ThumbUpIcon,
        },
        {
          id: "rejected",
          title: (
            <div className="title">
              rejected <span className="counter">({rejected.length})</span>
            </div>
          ),
          path: "/resources/rejected",
          Icon: ThumbDownIcon,
        },
      ],
    },
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Link to="/">
          <img src={wiseguyLogo} alt="logo" width="220" />
        </Link>
      </LogoWrapper>
      <ListWrapper>
        {links.map(({ title, path, Icon, subLinks, id }) => {
          return path ? (
            <MenuLink to={path} key={id}>
              <ListItem button>
                <ItemIcon>
                  <Icon className="icon" />
                </ItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </MenuLink>
          ) : (
            <div key={id}>
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
                        <MenuLink to={subLink.path || "/"} key={subLink.id}>
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

  .title {
    display: flex;
    align-items: center;
    line-height: 15px;

    .counter {
      line-height: 15px;
      font-weight: 100;
      font-size: 0.8rem;
      padding-left: 4px;
    }
  }

  /* overrides */
  && {
    .MuiListItemIcon-root {
      min-width: 30px !important;
    }
  }
`;

const LogoWrapper = styled.div`
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
    font-size: 18px;
  }
`;
