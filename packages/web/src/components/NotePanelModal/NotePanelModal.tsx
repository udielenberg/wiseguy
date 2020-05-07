import React, { useContext } from "react";
import Modal from "shared/Modal";
import { NoteMetadata } from "components/NoteMetadata";
import { NotesContext } from "context/Notes/";

export const NotePanelModal = () => {
  const { state, actions } = useContext(NotesContext);
  const { showNoteModal, selectedNote } = state;
  const { toggleModal } = actions;

  if (selectedNote) {
    return (
      <Modal
        open={showNoteModal}
        {...{ toggle: toggleModal, note: selectedNote }}
      >
        <NoteMetadata />
      </Modal>
    );
  } else {
    return null;
  }
};
