import React from "react";
import { TransitionablePortal, Modal } from "semantic-ui-react";

interface Props {
  isOpen: boolean;
  toggleModal(mode: boolean): void;
}
export const NotePanelModal = ({ isOpen, toggleModal }: Props) => {
  const handleCloseModal = () => {
    toggleModal(false);
  };

  return (
    <div>
      <TransitionablePortal
        open={isOpen}
        transition={{ animation: "scale", duration: 300 }}
      >
        <Modal open={true} closeIcon onClose={handleCloseModal}>
          <Modal.Header>Resize test</Modal.Header>
          <Modal.Content>
            <img src="https://semantic-ui.com/images/wireframe/paragraph.png" />
          </Modal.Content>
        </Modal>
      </TransitionablePortal>
    </div>
  );
};
