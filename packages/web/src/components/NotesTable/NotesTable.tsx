import React, { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Note } from "models/Note";
import { CellType } from "./cells";
import styled from "styled-components";
import { NotesContext } from "context/Notes/";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <StyledTableHeader>
            <TableRow>
              {baseHeaders.map(({ field, title }) => (
                <StyledHeaderCell key={field}>{title}</StyledHeaderCell>
              ))}
            </TableRow>
          </StyledTableHeader>
          <TableBody>
            {notes.length &&
              notes.map((note: Note) => (
                <StyledRow
                  onClick={() => {
                    // @ts-ignore
                    note.open();
                    history.push(`/note/${note.id}`);
                  }}
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
    </Wrapper>
  );
};

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledRow = styled(TableRow)<{ watched: boolean }>`
  cursor: pointer;
  transition: all 200ms ease;
  background: ${({ theme, watched }) =>
    watched ? "transparent" : theme.colors.superLight};

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }
`;

const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const StyledTableHeader = styled(TableHead)`
  background: ${({ theme }) => theme.colors.complementary};
`;

const StyledHeaderCell = styled(TableCell)`
  && {
    color: white;
  }
`;
