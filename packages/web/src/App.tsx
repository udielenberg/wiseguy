import React, { useCallback, useState, useEffect } from "react";
import "./App.css";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable/index";
import { dummyNotes } from "dummydata/notes";
import { Note, NoteSearchAndWords } from "models/Note";
import { NotePanelModal } from "components/NotePanelModal";
import { createNote } from "utils/noteUtils";
import { NotesProvider } from "context/Notes.context";

function App() {
  const [rawNotes, setRawNotes] = useState<Note[]>([]);
  const [isModalOpen, openModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();

  const addNote = useCallback((note: NoteSearchAndWords) => {
    if (note.search) {
      setRawNotes((prevNotes) => [createNote(note), ...prevNotes]);
    }
  }, []);

  const openNote = useCallback(
    (id: string) => {
      const clonedNotes = [...rawNotes];
      const noteIndex = clonedNotes.findIndex((note) => note.id === id);
      clonedNotes.splice(noteIndex, 1, {
        ...rawNotes[noteIndex],
        watched: true,
      });
      setSelectedNote(clonedNotes[noteIndex]);
      openModal(true);
      setRawNotes(clonedNotes);
    },
    [rawNotes]
  );

  const toggleNotePanel = useCallback((mode: boolean) => {
    openModal(mode);
  }, []);

  useEffect(() => {
    setRawNotes(dummyNotes);
  }, []);

  return (
    <NotesProvider>
      <NotePanelModal
        note={selectedNote}
        toggle={toggleNotePanel}
        isOpen={isModalOpen}
      />
      <AddNote add={addNote} />
      <NotesTable />
    </NotesProvider>
  );
}
export default App;
