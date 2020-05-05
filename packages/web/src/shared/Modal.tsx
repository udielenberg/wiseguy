import React from "react";
import ModalUI from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styled from "styled-components";

interface Props {
  open: boolean;
  toggle(mode: boolean): void;
  children: any;
}

const Modal: React.FC<Props> = ({ open, toggle, children }) => {
  const handleCloseModal = () => {
    toggle(false);
  };
  return (
    // @ts-ignore
    <StyledModal
      open={open}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Content>{children}</Content>
      </Fade>
    </StyledModal>
  );
};

export default Modal;
const Content = styled.div`
  width: 80vw;
  background: white;
  outline: 0;
`;

const StyledModal = styled(ModalUI)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
