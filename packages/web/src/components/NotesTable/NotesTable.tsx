import React from "react";
import { Table as SemanticUITable } from "semantic-ui-react";
import capitalize from "lodash/capitalize";
import styled from "styled-components";
import { Note as TNote } from "dummydata/notes";
import { Note } from "components/Note";

const { Header, HeaderCell, Row, Body } = SemanticUITable;

interface Header {
  type: string;
  header: string;
}
export const headers: Header[] = [
  { type: "search", header: "search" },
  { type: "tags", header: "tags" },
  { type: "lastVisit", header: "last time visited" },
  { type: "open", header: "fetch more" },
  { type: "remove", header: "remove" },
  { type: "date", header: "created  " },
];

interface Props {
  notes: TNote[];
  remove(id: string): void;
  open(id: string): void;
}

export const NotesTable = ({ notes, remove, open }: Props) => {
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

      <Body>
        {notes?.map((note) => (
          <Note key={note.id} {...{ note, remove, open, headers }} />
        ))}
      </Body>
    </Table>
  );
};

const Table = styled(SemanticUITable)`
  margin: auto !important;
  max-width: 70% !important;

  tbody {
    font-size: 14px;
  }
`;
