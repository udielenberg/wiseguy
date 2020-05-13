import styled from "styled-components";
import Chip from "@material-ui/core/Chip";

export const StyledChip = styled(Chip)`
  margin: 0 5px;
`;

export const BoldText = styled.span`
  font-weight: bold;
`;
export const TextMarginRight = styled.span`
  margin-right: 5px;
`;
export const TextMarginLeft = styled.span`
  margin-left: 5px;
`;

export const CenteredText = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const ScrollableContainer = styled.div`
  position: relative;
  overflow: scroll;
  flex: 1;
`;

export const HorizontalCenterContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const FullCenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
