import React, { useContext } from "react";
import {
  RejectButton,
  ApproveButton,
  StyledFab,
  //   FabLeft,
  //   FabRight,
  //   FabUp,
  //   FabDown,
} from "shared/buttons";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { NotesContext } from "context/Notes";
import { useRightLeftKeys } from "hooks/keyboard";
import { MetadataViewer } from "components/NoteMetadata/views/MetadataViewer";
import { MediaViewer } from "components/NoteMetadata/views/MediaViewer";
import { sortResources } from "components/NoteMetadata/tabManagerUtil";
import { ParagraphViewer } from "components/NoteMetadata/views/ParagraphViewer";
export interface CurrentResourceRelevantIds {
  noteId: string;
  resourceId: string;
}

interface Props {}
export const NotePage: React.FC<Props> = (props) => {
  const { state, actions } = useContext(NotesContext);
  const { selectedNote } = state;
  const { left, right, current } = useRightLeftKeys(selectedNote.resources);

  const currentResourceRelevantIds: CurrentResourceRelevantIds = {
    noteId: selectedNote.resources[current]?.noteId,
    resourceId: selectedNote.resources[current]?.id,
  };
  const currentResource = selectedNote.resources[current];
  const resources = selectedNote.resources;
  const handleLeft = () => {
    console.log("left");
    left();
  };
  const handleRight = () => {
    console.log("right");
    right();
  };
  const handleUp = () => {
    console.log("up");
  };
  const handleDown = () => {
    console.log("down");
  };

  const handleApprove = () => {
    actions.moveResource({
      ...currentResourceRelevantIds,
      resourceState: "approved",
    });
  };
  const handleReject = () => {
    actions.moveResource({
      ...currentResourceRelevantIds,
      resourceState: "rejected",
    });
  };
  const sortedResources = sortResources(selectedNote.resources);
  const relevantParagraphs =
    sortedResources.fresh[current].relevantParagraphs || {};

  return (
    <Wrapper>
      <StyledFab onClick={handleLeft}>
        <LeftIcon />
      </StyledFab>

      <div className="resource-viewer-wrapper">
        <div className="views">
          <MetadataViewer
            resources={resources}
            current={current}
            search={selectedNote.search}
          />
          <ParagraphViewer
            combinations={relevantParagraphs}
            currentNote={current}
          />

          <MediaViewer images={currentResource.images} />
        </div>

        <div className="actions">
          <div className="action">
            <ApproveButton startIcon={<CheckIcon />} onClick={handleApprove}>
              Approve
            </ApproveButton>
            <a href="#">approve list</a>
          </div>
          <div className="action">
            <RejectButton startIcon={<ClearIcon />} onClick={handleReject}>
              Reject
            </RejectButton>
            <a href="#">reject list</a>
          </div>
        </div>
      </div>

      <StyledFab onClick={handleRight}>
        <RightIcon />
      </StyledFab>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  .red {
    background: red;
  }
  .blue {
    background: blue;
  }
  .green {
    background: green;
  }

  .resource-viewer-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0 20px;
    height: 100%;
  }
  .views {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;

    .box {
      flex: 1;
      width: 100%;
      height: 100px;
    }
  }
  .actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    .action {
      display: flex;
      flex-direction: column;
      align-items: center;

      a {
        margin-top: 5px;
      }
    }
  }
`;

// <wrapper>
//   <buttonLeft />
//   <resourceViewerWrapper>
//     <views>
//       <MetadataViewer />
//       <ParagraphViewer />
//       <MediaViewer />
//     </views>
//     <viewsActions>
//       <approveBtn />
//       <rejectBtn />
//     </viewsActions>
//   </resourceViewerWrapper>
//   <buttonRight />
// </wrapper>;
