import React, { useContext } from "react";
import Modal from "shared/Modal";
import { NoteMetadata } from "components/NoteMetadata";
import styled from "styled-components";
import { NotesContext } from "context/Notes.context";

export const NotePanelModal = () => {
  const [{ showNoteModal, selectedNote }, { toggleModal }] = useContext(
    NotesContext
  );

  if (selectedNote) {
    return (
      <Modal
        open={showNoteModal}
        {...{ toggle: toggleModal, note: selectedNote }}
      >
        <Wrapper>
          <NoteMetadata />
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
