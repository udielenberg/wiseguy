import React, { useEffect, useContext } from "react";
import "./App.css";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable/index";
import { NotePanelModal } from "components/NotePanelModal";
import { NotesContext } from "context/Notes.context";
import { dummyNotes } from "dummydata/notes";

function App() {
  const [, { updateAll }] = useContext(NotesContext);

  useEffect(() => {
    updateAll(dummyNotes);
  }, [updateAll]);

  return (
    <>
      <NotePanelModal />
      <AddNote />
      <NotesTable />
    </>
  );
}
export default App;
