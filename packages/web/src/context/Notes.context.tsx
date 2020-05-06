import React, { useReducer, useState, useEffect } from "react";
import { createContext } from "react";
import { Note } from "models/Note";
import { dummyNotes } from "dummydata/notes";

interface NotesState {
  notes: Note[];
}

interface NotesPayload {
  type: string;
  payload: any;
}

export const C = {
  ADD: "add note",
  REMOVE: "remove note",
  UPDATE: "update note",
  MOVE_RESOURCE: "move resource",
  OPEN: "open note",
  UPDATE_ALL: "update all",
};

const notesInitialState: NotesState = {
  notes: [],
};

export const NotesContext = createContext<any>(notesInitialState);

const notesReducer = (state: NotesState, { type, payload }: NotesPayload) => {
  switch (type) {
    case C.ADD: {
      return { ...state };
    }
    case C.REMOVE: {
      const updatedNotes = state.notes.filter((note) => note.id !== payload);
      return { ...state, notes: updatedNotes };
    }
    case C.UPDATE: {
      return { ...state };
    }
    case C.MOVE_RESOURCE: {
      return { ...state };
    }
    case C.OPEN: {
      return { ...state };
    }
    case C.UPDATE_ALL: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
};

function useProviderSomething() {
  const [state, dispatch] = useReducer(notesReducer, notesInitialState);

  const addNote = (payload: any) => dispatch({ type: C.ADD, payload });
  const removeNote = (payload: any) => dispatch({ type: C.REMOVE, payload });
  const openNote = (payload: any) => dispatch;
  const updateAll = (payload: any) => {
    dispatch({ type: C.UPDATE_ALL, payload });
  };
  useEffect(() => {
    const updatedNotes = dummyNotes.map((note) => ({
      ...note,
      remove: () => removeNote(note.id),
      open: () => openNote(note.id),
    }));
    updateAll(updatedNotes);
  }, []);

  return [state, { addNote, removeNote, openNote }];
}

export const NotesProvider: React.FC = ({ children }) => {
  const noteStore = useProviderSomething();
  return (
    <NotesContext.Provider value={noteStore}>{children}</NotesContext.Provider>
  );
};
