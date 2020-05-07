import React, { useContext } from "react";
import Modal from "shared/Modal";
import { NoteMetadata } from "components/NoteMetadata";
import styled from "styled-components";
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
