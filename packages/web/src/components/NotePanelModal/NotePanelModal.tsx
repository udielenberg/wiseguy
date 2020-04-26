import React from "react";
import { Transition, Modal } from "semantic-ui-react";

interface Props {
  isOpen: boolean;
  closeModal(): void;
}
export const NotePanelModal = ({ isOpen, closeModal }: Props) => {
  return (
    <>
      <Transition
        animation="scale"
        duration={400}
        unmountOnHide={true}
        visible={isOpen}
      >
        <Modal
          size="mini"
          closeOnDimmerClick={false}
          closeOnEscape={false}
          open={isOpen}
          closeIcon
          onClose={() => {
            closeModal();
          }}
        >
          <div style={{ width: "90%", height: 600 }}>
            Modal Modal Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Provident voluptate illo repellendus laboriosam sapiente. Quam
            numquam vero beatae nulla commodi tempore eligendi obcaecati? Ea,
            est quasi ut dolor dolorem eum.
          </div>
        </Modal>
      </Transition>
    </>
  );
};
