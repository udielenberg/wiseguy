import React from "react";
import ModalUI from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface Props {
  open: boolean;
  toggle(mode: boolean): void;
  children: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const Modal: React.FC<Props> = ({ open, toggle, children }) => {
  const classes = useStyles();

  const handleCloseModal = () => {
    toggle(false);
  };
  return (
    <ModalUI
      open={open}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
    >
      <Fade in={open}>
        <div className={classes.paper}>{children}</div>
      </Fade>
    </ModalUI>
  );
};

export default Modal;
