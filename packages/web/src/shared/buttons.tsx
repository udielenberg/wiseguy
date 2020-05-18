import styled from "styled-components";
import { Button } from "@material-ui/core";

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
