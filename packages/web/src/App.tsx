import React, { useCallback, useState, useEffect } from "react";
import "./App.css";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable/index";
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
  const [rawNotes, setRawNotes] = useState<Note[]>([]);

  const [isModalOpen, openModal] = useState(false);

  const addNote = useCallback((note: string) => {
    setRawNotes((prevNotes) => [createNote(note), ...prevNotes]);
  }, []);

  const removeNote = (id: string): void => {
    setRawNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  const openNote = (id: string) => {
    const clonedNotes = [...rawNotes];
    const noteIndex = clonedNotes.findIndex((note) => note.id === id);
    clonedNotes.splice(noteIndex, 1, { ...rawNotes[noteIndex], watched: true });

    openModal(true);
    setRawNotes(clonedNotes);
  };

  const toggleNotePanel = (mode: boolean) => {
    openModal(mode);
  };

  const updatedNotes = rawNotes.map((note) => ({
    ...note,
    remove: () => removeNote(note.id),
    open: () => openNote(note.id),
  }));

  useEffect(() => {
    setRawNotes(dummyNotes);
  }, []);

  return (
    <div className="App">
      <NotePanelModal toggle={toggleNotePanel} isOpen={isModalOpen} />
      <AddNote add={addNote} />
      <NotesTable notes={updatedNotes} />
    </div>
  );
}
export default App;
