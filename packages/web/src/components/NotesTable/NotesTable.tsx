import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Note } from "models/Note";
import { CenteredLayout } from "layouts";
import { Cell } from "./cells";
import styled from "styled-components";

interface BaseHeaders {
  field: string;
  title: string;
}
export const baseHeaders: BaseHeaders[] = [
  { field: "search", title: "search" },
  { field: "includeWords", title: "Include words" },
  { field: "lastVisit", title: "last time visited" },
  { field: "xxx", title: "xxx" },
  { field: "created", title: "created" },
  { field: "remove", title: "" },
];

interface NoteWithFn extends Note {
  open(id: string): void;
  remove(id: string): void;
}
interface Props {
  notes: NoteWithFn[];
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  selectedRow: {
    background: "aquamarine",
  },
  rowrow: {
    "&:hover": {
      backgroundColor: "red",
    },
  },
});

export const NotesTable = ({ notes }: Props) => {
  const classes = useStyles();
  return (
    <CenteredLayout>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {baseHeaders.map(({ field, title }) => (
                <TableCell key={field}>{title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note: Note) => (
              <StyledRow
                // @ts-ignore
                onClick={note.open}
                key={note.id}
                className={!note.watched ? classes.selectedRow : ""}
              >
                {baseHeaders.map(({ field }) => (
                  <TableCell key={field}>
                    <Cell field={field} data={note} />
                  </TableCell>
                ))}
              </StyledRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CenteredLayout>
  );
};

const StyledRow = styled(TableRow)`
  cursor: pointer;
  transition: all 200ms ease;
  background: transparent;
  &:hover {
    background: lightgray;
  }
`;
