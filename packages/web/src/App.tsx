import React, { useCallback, useState, useEffect } from "react";
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
  created: new Date(),
  lastVisit: new Date(),
  watched: false,
});

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

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
    const clonedNotes = [...notes];

    const noteIndex = clonedNotes.findIndex((note) => note.id === id);
    clonedNotes.splice(noteIndex, 1, { ...notes[noteIndex], watched: true });
    setNotes(clonedNotes);
  };

  const toggleNotePanel = (mode: boolean) => {
    openModal(mode);
  };

  useEffect(() => {
    const updatedNotes = dummyNotes.map((note) => ({
      ...note,
      remove: () => removeNote(note.id),
      open: () => {
        console.log("note id:", note.id);
        // openNote(note.id)
      },
    }));
    setNotes(updatedNotes);
  }, []);

  return (
    <div className="App">
      <NotePanelModal toggle={toggleNotePanel} isOpen={isModalOpen} />

      <AddNote add={addNote} />
      <CenteredLayout>
        <NotesTable notes={notes} open={openNote} remove={removeNote} />
      </CenteredLayout>
    </div>
  );
}
export default App;
