import React from "react";
import Modal from "shared/Modal";
import { Note } from "dummydata/notes";

interface Props {
  note: Note | undefined;
  isOpen: boolean;
  toggle(mode: boolean): void;
}

export const NotePanelModal = ({ isOpen, toggle, note }: Props) => {
  if (note) {
    return (
      <Modal open={isOpen} {...{ toggle, note }}>
        <div>Hey!</div>
      </Modal>
    );
  } else {
    return null;
  }
};
