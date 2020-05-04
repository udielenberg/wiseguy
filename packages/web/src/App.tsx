import React, { useCallback, useState, useEffect } from "react";
import "./App.css";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable/index";
import { dummyNotes } from "dummydata/notes";
import { Note, NoteSearchAndWords } from "models/Note";
import { NotePanelModal } from "components/NotePanelModal";
import { createNote } from "utils/noteUtils";

function App() {
  const [rawNotes, setRawNotes] = useState<Note[]>([]);
  const [isModalOpen, openModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();

  const addNote = useCallback((note: NoteSearchAndWords) => {
    if (note.search) {
      setRawNotes((prevNotes) => [createNote(note), ...prevNotes]);
    }
  }, []);

  const removeNote = useCallback((id: string): void => {
    setRawNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
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
      <NotePanelModal
        note={selectedNote}
        toggle={toggleNotePanel}
        isOpen={isModalOpen}
      />
      <AddNote add={addNote} />
      <NotesTable notes={updatedNotes} />
    </div>
  );
}
export default App;
