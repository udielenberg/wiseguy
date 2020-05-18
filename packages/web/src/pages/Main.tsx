import React from "react";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable";

interface Props {}

export const MainPage = (props: Props) => {
  return (
    <>
      <AddNote />
      <NotesTable />
    </>
  );
};
