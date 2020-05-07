import React, { useReducer } from "react";
import { createContext } from "react";
import { notesInitialState, notesReducer, notesActions } from "./Notes.reducer";

export const NotesContext = createContext<any>(notesInitialState);

export const NotesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, notesInitialState);
  const actions = notesActions(dispatch);

  return (
    <NotesContext.Provider value={{ state, actions }}>
      {children}
    </NotesContext.Provider>
  );
};
