import React, { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Note } from "models/Note";
import { CenteredLayout } from "layouts";
import { CellType } from "./cells";
import styled from "styled-components";
import { NotesContext } from "context/Notes/";

interface BaseHeaders {
  field: string;
  title: string;
}
export const baseHeaders: BaseHeaders[] = [
  { field: "search", title: "search" },
  { field: "includeWords", title: "Include words" },
  { field: "created", title: "created" },
  { field: "remove", title: "" },
];

export const NotesTable = () => {
  const { state } = useContext(NotesContext);
  const { notes } = state;

  return (
    <CenteredLayout>
      <TableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <StyledTableHeader>
            <TableRow>
              {baseHeaders.map(({ field, title }) => (
                <TableCell key={field}>{title}</TableCell>
              ))}
            </TableRow>
          </StyledTableHeader>
          <TableBody>
            {notes.length &&
              notes.map((note: Note) => (
                <StyledRow
                  // @ts-ignore
                  onClick={note.open}
                  key={note.id}
                  watched={note.watched}
                >
                  {baseHeaders.map(({ field }) => (
                    <TableCell key={field}>
                      <CellType field={field} data={note} />
                    </TableCell>
                  ))}
                </StyledRow>
              ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </CenteredLayout>
  );
};

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledRow = styled(TableRow)<{ watched: boolean }>`
  cursor: pointer;
  transition: all 200ms ease;
  background: ${({ watched }) =>
    watched ? "transparent" : "rgba(177,255,212,0.4)"};

  &:hover {
    background: rgba(211, 211, 211, 0.5);
  }
`;

const StyledTableHeader = styled(TableHead)`
  background: rgba(0, 0, 0, 0.1);
`;
