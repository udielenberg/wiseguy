import React from "react";
import Modal from "shared/Modal";
import { Note } from "models/Note";
import { NoteMetadata } from "components/NoteMetadata";
import styled from "styled-components";

interface Props {
  note: Note | undefined;
  isOpen: boolean;
  toggle(mode: boolean): void;
}

export const NotePanelModal = ({ isOpen, toggle, note }: Props) => {
  if (note) {
    return (
      <Modal open={isOpen} {...{ toggle, note }}>
        <Wrapper>
          <NoteMetadata note={note} />
        </Wrapper>
      </Modal>
    );
  } else {
    return null;
  }
};

const Wrapper = styled.div`
  height: 100%;
  padding: 15px;
  box-shadow: 10px 10px 19px -9px rgba(0, 0, 0, 0.75);
`;
