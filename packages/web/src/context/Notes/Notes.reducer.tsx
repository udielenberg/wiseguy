import { Note } from "models/Note";

import { createNote } from "utils/noteUtils";

interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  showNoteModal: boolean;
}

interface NotesPayload {
  type: string;
  payload: any;
}

export const C = {
  ADD: "note/add",
  REMOVE: "note/remove",
  UPDATE: "note/update",
  SELECT_NOTE: "note/select",
  MOVE_RESOURCE: "note/move resource",
  OPEN: "note/open",
  UPDATE_ALL: "notes/update all",
  TOGGLE_MODAL: "note/toggle modal",
};

export const notesInitialState: NotesState = {
  notes: [],
  selectedNote: null,
  showNoteModal: false,
};

export const notesReducer = (
  state: NotesState,
  { type, payload }: NotesPayload
) => {
  switch (type) {
    case C.ADD: {
      const notes = [payload, ...state.notes];
      return { ...state, notes };
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
    case C.SELECT_NOTE: {
      return { ...state, selectedNote: payload };
    }
    case C.OPEN: {
      const clonedNotes = [...state.notes];
      const noteIndex = clonedNotes.findIndex((note) => note.id === payload);
      clonedNotes.splice(noteIndex, 1, {
        ...state.notes[noteIndex],
        watched: true,
      });

      return {
        ...state,
        notes: clonedNotes,
        selectedNote: clonedNotes[noteIndex],
        showNoteModal: true,
      };
    }
    case C.UPDATE_ALL: {
      return { ...state, notes: payload };
    }
    case C.TOGGLE_MODAL: {
      return { ...state, showNoteModal: payload };
    }

    default:
      return state;
  }
};

export const notesActions = (dispatch: any) => {
  const removeNote = (id: string) => dispatch({ type: C.REMOVE, payload: id });
  const openNote = (id: string) => dispatch({ type: C.OPEN, payload: id });
  const addNote = (note: Note) => {
    const newNote = enhanceNote(createNote(note));
    dispatch({ type: C.ADD, payload: newNote });
  };
  const updateAll = (notes: Note[]) => {
    const updatedNotes = notes.map((note) => enhanceNote(note));
    dispatch({ type: C.UPDATE_ALL, payload: updatedNotes });
  };
  const toggleModal = (payload: boolean) =>
    dispatch({ type: C.TOGGLE_MODAL, payload });

  function enhanceNote(note: Note) {
    return {
      ...note,
      remove: () => removeNote(note.id),
      open: () => openNote(note.id),
    };
  }
  return { removeNote, openNote, addNote, updateAll, toggleModal };
};