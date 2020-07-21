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
  if (!resources[current]) {
    return <EmptyContent>No metadata.</EmptyContent>;
  }
  const { description, createdAt, domain, link, rating, writtenBy } = resources[
    current
  ];
  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchTitle>Note: "{search}"</SearchTitle>
        <div
          style={{
            padding: "20px 0",
            flex: "3 1 200px",
            alignSelf: "flex-end",
          }}
        >
          <StyledTypography>
            resource {current + 1} / {resources.length}
          </StyledTypography>
        </div>
      </div>
      <Info
        title="description"
        content={<Typography variant="body2">{description}</Typography>}
      />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Info
          title="created at"
          content={
            <Typography variant="overline">
              {formattedDate(createdAt)}
            </Typography>
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
          title="written by"
          content={<Typography variant="subtitle1">{writtenBy}</Typography>}
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
      </div>
    </Wrapper>
  );
};

const SearchTitle = styled(Typography).attrs({ variant: "h5" })`
  padding: 20px 0;
`;

const Wrapper = styled.div`
  flex: 1 1 auto;
  position: relative;
`;

const EmptyContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  height: 100%;
`;

const StyledTypography = styled(Typography).attrs({
  variant: "overline",
  display: "block",
  "data-testid": "resource-counter",
})`
  && {
    text-align: right;
    font-style: italic;
  }
`;
