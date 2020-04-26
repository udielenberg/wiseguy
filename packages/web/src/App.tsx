import React, { useCallback, useState } from "react";
import "./App.css";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable/index";
import { CenteredLayout } from "layouts";
import { notes as dummyNotes, Note } from "dummydata/notes";
import faker from "faker";

const createNote = (note: string) => ({
  search: note,
  id: faker.random.uuid(),
  tags: [],
  date: new Date(),
  lastVisit: new Date(),
});

function App() {
  const [notes, setNotes] = useState<Note[]>(dummyNotes);
  const addNote = useCallback((note: string) => {
    setNotes((prevNotes) => [createNote(note), ...prevNotes]);
  }, []);
  const removeNote = (id: string): void => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };
  const openNoteResult = (id: string) => {
    console.log("note id:", id);
  };
  return (
    <div className="App">
      <AddNote add={addNote} />
      <CenteredLayout>
        <NotesTable notes={notes} open={openNoteResult} remove={removeNote} />
      </CenteredLayout>
    </div>
  );
}
export default App;
