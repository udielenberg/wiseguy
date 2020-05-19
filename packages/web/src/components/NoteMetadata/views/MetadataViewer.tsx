import React from "react";
import Info from "shared/Info";
import { Typography, Button } from "@material-ui/core";
import { StyledChip, Italic } from "shared/Styled";
import { securedNewWindow } from "utils/settings";
import star from "assets/star.svg";
import { formattedDate } from "utils/date";
import styled from "styled-components";
import { Resource } from "models/Note";

interface Props {
  resources: Resource[];
  search: string;
  current: number;
}

export const MetadataViewer: React.FC<Props> = ({
  resources,
  current,
  search,
}) => {
  const { description, createdAt, domain, link, rating, writtenBy } = resources[
    current
  ];
  return (
    <Wrapper>
      <Italic style={{ textAlign: "right", display: "block" }}>
        ({current + 1} / {resources.length})
      </Italic>
      <SearchTitle>"{search}"</SearchTitle>

      <Info
        title="description"
        content={<Typography variant="body2">{description}</Typography>}
      />
      <Info
        title="created at"
        content={
          <Typography variant="overline">{formattedDate(createdAt)}</Typography>
        }
      />
      <Info
        title="rating"
        content={
          <span>
            <img src={star} alt="star" />
            {rating}
            <img src={star} alt="star" />
          </span>
        }
      />
      <Info
        title="domain"
        content={<StyledChip color="primary" label={domain}></StyledChip>}
      />
      <Info
        title="article"
        content={
          <Button
            {...securedNewWindow}
            color="primary"
            size="small"
            href={link}
          >
            Open
          </Button>
        }
      />
      <Info
        title="written by"
        content={<Typography variant="subtitle1">{writtenBy}</Typography>}
      />
    </Wrapper>
  );
};

const SearchTitle = styled(Typography).attrs({ variant: "h5" })`
  padding: 20px 0;
`;

const Wrapper = styled.div`
  border: 3px solid blue;
  height: 100px;
  /* Fix this */
  position: relative;
  overflow: hidden;
`;
