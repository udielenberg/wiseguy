import React from "react";
import Modal from "shared/Modal";
import { Note } from "models/Note";
import { NoteMetadata } from "components/NoteMetadata";

interface Props {
  note: Note | undefined;
  isOpen: boolean;
  toggle(mode: boolean): void;
}

export const NotePanelModal = ({ isOpen, toggle, note }: Props) => {
  if (note) {
    return (
      <Modal open={isOpen} {...{ toggle, note }}>
        <NoteMetadata note={note} />
      </Modal>
    );
  } else {
    return null;
  }
};
