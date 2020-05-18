import styled from "styled-components";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

export const ApproveButton = styled(Button).attrs({
  variant: "contained",
  color: "primary",
})`
  &&& {
    background: ${({ theme }) => theme.colors.success};
  }
`;

export const RejectButton = styled(Button).attrs({
  variant: "contained",
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
