import React, { useEffect, useContext } from "react";
import "./App.css";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable/index";
import { NotePanelModal } from "components/NotePanelModal";
import { NotesContext } from "context/Notes/";
import { dummyNotes } from "dummydata/notes";

function App() {
  const { actions } = useContext(NotesContext);

  useEffect(() => {
    actions.updateAll(dummyNotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NotePanelModal />
      <AddNote />
      <NotesTable />
    </>
  );
}
export default App;
