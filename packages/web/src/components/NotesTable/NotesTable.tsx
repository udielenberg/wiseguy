import React from "react";
import { Table as SemanticUITable } from "semantic-ui-react";
import { notes, Note } from "dummydata/notes";
import capitalize from "lodash/capitalize";
import { Label } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

const { Header, HeaderCell, Row, Cell, Body } = SemanticUITable;

interface Header {
  type: string;
  header: string;
}
const headers: Header[] = [
  { type: "search", header: "search" },
  { type: "tags", header: "tags" },
  { type: "lastVisit", header: "last time visited" },
  { type: "fetchMore", header: "fetch more" },
  { type: "remove", header: "remove" },
  { type: "date", header: "created  " },
];

const createDate = (date: Date) => <DateCell>{date.toDateString()}</DateCell>;

const createSearch = (search: string) => <Cell>{search}</Cell>;

const createTags = (tags: string[]) => {
  return (
    <Cell>
      {tags.map((tag) => (
        <Label key={tag} tag>
          {tag}
        </Label>
      ))}
    </Cell>
  );
};

const fetchMore = () => {
  return (
    <Cell>
      <Button primary>Fetch more</Button>
    </Cell>
  );
};
const remove = () => {
  return (
    <Cell>
      <Button negative>Remove</Button>
    </Cell>
  );
};

const createCell = (headerType: string, note: Note) => {
  switch (headerType) {
    case "lastVisit":
    case "date":
      return createDate(note[headerType]);
    case "search":
      return createSearch(note[headerType]);
    case "tags":
      return createTags(note[headerType]);
    case "fetchMore":
      return fetchMore();
    case "remove":
      return remove();
    default:
      throw Error("something when wrong");
  }
};

const createNote = (note: any, headers: Header[]) => {
  const { id, ...noteRest } = note;
  return (
    <Row key={id}>
      {headers.map(({ type }) => {
        return createCell(type, noteRest);
      })}
    </Row>
  );
};

export const NotesTable = () => {
  return (
    <Table celled size="large" sortable={true}>
      <Header>
        <Row>
          {headers.map(({ header }) => (
            <HeaderCell style={{ textAlign: "center" }} key={header}>
              {capitalize(header)}
            </HeaderCell>
          ))}
        </Row>
      </Header>

      <Body>{notes.map((note) => createNote(note, headers))}</Body>
    </Table>
  );
};

const DateCell = styled(Cell)`
  font-size: 14px;
  font-weight: 100;
`;

const Table = styled(SemanticUITable)`
  margin: auto !important;
  max-width: 70% !important;

  tbody {
    font-size: 14px;
  }
`;
