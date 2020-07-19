import React, { useContext, useState } from "react";
import { RejectButton, ApproveButton, StyledFab } from "shared/buttons";
import styled from "styled-components";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { NotesContext } from "context/Notes";
import { useRightLeftKeys } from "hooks/keyboard";
import { MetadataViewer } from "components/NoteMetadata/views/MetadataViewer";
import { MediaViewer } from "components/NoteMetadata/views/MediaViewer";
import { sortNoteResources } from "utils/noteUtils";
import { ParagraphViewer } from "components/NoteMetadata/views/ParagraphViewer";
import isEmpty from "lodash/isEmpty";
export interface CurrentResourceRelevantIds {
  noteId: string;
  resourceId: string;
}

type ViewTypes = "fresh" | "rejected" | "approved";

interface Props {}

export const NotePage: React.FC<Props> = (props) => {
  const [viewType, setViewType] = useState<ViewTypes>("fresh");
  const { state, actions } = useContext(NotesContext);
  const { selectedNote } = state;
  const resourcesByType = sortNoteResources(selectedNote)[viewType] || [];

  const { left, right, current } = useRightLeftKeys(resourcesByType);
  const currentResourceRelevantIds: CurrentResourceRelevantIds | null = resourcesByType
    ? {
        noteId: resourcesByType[current]?.noteId,
        resourceId: resourcesByType[current]?.id,
      }
    : null;

  const currentResource = resourcesByType.length
    ? resourcesByType[current]
    : {};
  const handleLeft = () => {
    left();
  };
  const handleRight = () => {
    right();
  };

  const handleApprove = () => {
    if (currentResourceRelevantIds) {
      actions.moveResource({
        ...currentResourceRelevantIds,
        resourceState: "approved",
      });
    }
  };
  const handleReject = () => {
    if (currentResourceRelevantIds) {
      actions.moveResource({
        ...currentResourceRelevantIds,
        resourceState: "rejected",
      });
    }
  };
  const relevantParagraphs = resourcesByType[current]?.relevantParagraphs || [];
  return (
    <Wrapper>
      <StyledFab
        disabled={!resourcesByType.length}
        onClick={handleLeft}
        aria-label="previous resource"
      >
        <LeftIcon />
      </StyledFab>

      <div className="resource-viewer-wrapper">
        <div className="views">
          <MetadataViewer
            {...{ resources: resourcesByType || [], current }}
            search={selectedNote?.search}
          />
          <ParagraphViewer
            combinations={relevantParagraphs}
            currentNote={current}
          />
          <MediaViewer images={currentResource.images || []} />
        </div>

        <div className="actions">
          <div className="action">
            <ApproveButton
              disabled={isEmpty(currentResource)}
              startIcon={<CheckIcon />}
              onClick={handleApprove}
            >
              Approve
            </ApproveButton>
          </div>
          <div className="action">
            <RejectButton
              disabled={isEmpty(currentResource)}
              startIcon={<ClearIcon />}
              onClick={handleReject}
            >
              Reject
            </RejectButton>
          </div>
        </div>
      </div>

      <StyledFab
        disabled={!resourcesByType.length}
        onClick={handleRight}
        aria-label="next resource"
      >
        <RightIcon />
      </StyledFab>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  .resource-viewer-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0 20px;
    height: 100%;
  }
  .views {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-basis: 90%;
  }
  .actions {
    flex-basis: 50px;

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
