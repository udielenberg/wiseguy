import React, { useCallback, useState } from "react";
import "./App.css";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable/index";
import { CenteredLayout } from "layouts";
import { notes as dummyNotes, Note } from "dummydata/notes";
import faker from "faker";
import { NotePanelModal } from "components/NotePanelModal";

const createNote = (note: string) => ({
  search: note,
  id: faker.random.uuid(),
  tags: [],
  date: new Date(),
  lastVisit: new Date(),
});

function App() {
  const [notes, setNotes] = useState<Note[]>(dummyNotes);
  const [isModalOpen, openModal] = useState(false);

  const addNote = useCallback((note: string) => {
    setNotes((prevNotes) => [createNote(note), ...prevNotes]);
  }, []);

  const removeNote = (id: string): void => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  const openNote = (id: string) => {
    openModal(true);
    console.log("note id:", id);
  };

  const toggleNotePanel = (mode: boolean) => {
    openModal(mode);
  };

  return (
    <div className="App">
      <NotePanelModal toggleModal={toggleNotePanel} isOpen={isModalOpen} />

      <AddNote add={addNote} />
      <CenteredLayout>
        <NotesTable notes={notes} open={openNote} remove={removeNote} />
      </CenteredLayout>
    </div>
  );
}
export default App;
