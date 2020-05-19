import React from "react";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable";

interface Props {}

export const MainPage: React.FC<Props> = (props) => {
  return (
    <>
      <AddNote />
      <NotesTable />
    </>
  );
};
