import { Note } from "models/Note";

import { createNote } from "utils/noteUtils";
import { setDummyResources } from "dummydata/_notes";

interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
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
};

export const notesInitialState: NotesState = {
  notes: [],
  selectedNote: null,
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
      const { noteId, resourceId, resourceState } = payload;

      const noteIndex = state.notes.findIndex((note) => note.id === noteId);
      const resourceIndex = state.notes[noteIndex].resources.findIndex(
        (resource) => resource.id === resourceId
      );

      const newResourceState = { state: resourceState };

      const currentResource = {
        ...state.notes[noteIndex].resources[resourceIndex],
      };

      const updateResources = [...state.notes[noteIndex].resources];
      updateResources.splice(resourceIndex, 1, {
        ...currentResource,
        ...newResourceState,
      });
      const currentNote = { ...state.notes[noteIndex] };
      const updateNotes = [...state.notes];
      const updatedSelectedNote = {
        ...currentNote,
        resources: updateResources,
      };
      updateNotes.splice(noteIndex, 1, updatedSelectedNote);

      return {
        ...state,
        notes: updateNotes,
        selectedNote: updatedSelectedNote,
      };
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
      const nextState = {
        ...state,
        notes: clonedNotes,
        selectedNote: clonedNotes[noteIndex],
      };
      return nextState;
    }
    case C.UPDATE_ALL: {
      return { ...state, notes: payload };
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
    dispatch({
      type: C.ADD,
      payload: {
        ...newNote,
        resources: setDummyResources(newNote.id, newNote.includeWords),
      },
    });
  };
  const updateAll = (notes: Note[]) => {
    const updatedNotes = notes.map((note) => enhanceNote(note));
    dispatch({ type: C.UPDATE_ALL, payload: updatedNotes });
  };

  const moveResource = (payload: any) => {
    dispatch({ type: C.MOVE_RESOURCE, payload });
  };

  function enhanceNote(note: Note) {
    return {
      ...note,
      remove: () => removeNote(note.id),
      open: () => openNote(note.id),
    };
  }
  return {
    removeNote,
    openNote,
    addNote,
    updateAll,
    moveResource,
  };
};
