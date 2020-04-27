import React from "react";
import { Note as TNote } from "dummydata/notes";
import { Table as SemanticUITable } from "semantic-ui-react";
import styled from "styled-components";
import { Label } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

interface Header {
  type: string;
  header: string;
}
interface Props {
  note: TNote;
  headers: Header[];
  remove(id: string): void;
  open(id: string): void;
}
const { Header, Cell, Row } = SemanticUITable;

export const Note = ({ note, remove, headers, open }: Props) => {
  return (
    <StyledRow watched={note.watched}>
      {headers.map(({ type }) => {
        if (type === "lastVisit" || type === "date") {
          return <DateCell>{note[type].toDateString()}</DateCell>;
        } else if (type === "search") {
          return <Cell>{note[type]}</Cell>;
        } else if (type === "tags") {
          return (
            <Cell>
              {note[type].map((tag) => (
                <Label key={tag}>{tag}</Label>
              ))}
            </Cell>
          );
        } else if (type === "open") {
          return (
            <Cell>
              <Button
                primary
                onClick={() => {
                  open(note.id);
                }}
              >
                Open
              </Button>
            </Cell>
          );
        } else {
          return (
            <Cell>
              <Button
                negative
                onClick={() => {
                  remove(note.id);
                }}
              >
                Remove
              </Button>
            </Cell>
          );
        }
      })}
    </StyledRow>
  );
};

export const unwatchedNoteStyle = `
    background: aquamarine;
    font-weight: bold;
`;

export const watchedNoteStyle = `
    background: initial;
    font-weight: initial;
`;

export const StyledRow = styled(Row)`
  ${({ watched }) => (watched ? watchedNoteStyle : unwatchedNoteStyle)}
`;
const DateCell = styled(Cell)`
  font-size: 14px;
  font-weight: 100;
`;
