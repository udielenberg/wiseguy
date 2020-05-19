import styled from "styled-components";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";

const BaseContainedButton = styled(Button).attrs({
  variant: "contained",
})`
  display: flex;
  justify-content: space-between;
  flex-basis: 50px;
  margin-top: 30px;
`;

export const ApproveButton = styled(BaseContainedButton).attrs({
  color: "primary",
})`
  &&& {
    background: ${({ theme }) => theme.colors.success};
  }
`;

export const RejectButton = styled(BaseContainedButton).attrs({
  color: "secondary",
})`
  &&& {
    background: ${({ theme }) => theme.colors.error};
    color: white;
  }
`;

export const DeleteIconButton = styled(IconButton).attrs({
  color: "secondary",
})`
  && {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const StyledFab = styled(Fab)``;
