import React from "react";
import { Table } from "semantic-ui-react";
import { notes, Note } from "../../dummydata/notes";
import capitalize from "lodash/capitalize";
import { Label } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

const { Header, HeaderCell, Row, Cell, Body } = Table;

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
  { type: "date", header: "date" },
];

const createDate = (date: Date) => <Cell>{date.toDateString()}</Cell>;

const createSearch = (search: string) => <Cell>{search}</Cell>;

const createTags = (tags: string[]) => {
  return (
    <Cell>
      {tags.map((tag) => (
        <Label tag>{tag}</Label>
      ))}
    </Cell>
  );
};
const createLastVisit = (lastVisit: Date) => {
  return <Cell>{lastVisit.toDateString()}</Cell>;
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
    case "date":
      return createDate(note[headerType]);
    case "search":
      return createSearch(note[headerType]);
    case "tags":
      return createTags(note[headerType]);
    case "lastVisit":
      return createLastVisit(note[headerType]);
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
    <Table
      celled
      size="large"
      sortable={true}
      style={{ margin: "auto", maxWidth: "80%" }}
    >
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
