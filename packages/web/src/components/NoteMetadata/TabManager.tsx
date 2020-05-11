import React, { useContext } from "react";
import { Resource } from "models/Note";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { sortResources } from "./tabManagerUtil";
import { NotesContext } from "context/Notes";
import { ResourceState } from "models/Note";
import { ClassicView, RejectedList } from "./views";
import { tabs } from "./NoteMetadata";
interface TabManagerProps {
  resources?: Resource[];
  children?: React.ReactNode;
  currentTab: number;
}

export interface CurrentResource {
  noteId: string;
  resourceId: string;
}

const TabPanel: React.FC<{
  resources: any[];
  type: ResourceState;
}> = (props) => {
  const { actions } = useContext(NotesContext);
  const { resources, type } = props;

  const handleApprove = (currentResource: CurrentResource) => {
    console.log("handle approve:", currentResource);
    actions.moveResource({
      ...currentResource,
      resourceState: "approved",
    });
  };
  const handleReject = (currentResource: CurrentResource) => {
    actions.moveResource({
      ...currentResource,
      resourceState: "rejected",
    });
  };

  const handleUnread = (currentResource: CurrentResource) => {
    actions.moveResource({
      ...currentResource,
      resourceState: "fresh",
    });
  };

  if (isEmpty(resources)) {
    return (
      <CenteredMessageWrapper>
        <h3>No resources.</h3>
      </CenteredMessageWrapper>
    );
  }

  const setView = () => {
    if (type === "fresh" || type === "approved") {
      return (
        <ClassicView
          resources={resources}
          approve={handleApprove}
          reject={handleReject}
        />
      );
    }
    if (type === "rejected") {
      return (
        <RejectedList
          resources={resources}
          setApprove={handleApprove}
          setUnread={handleUnread}
        />
      );
    } else {
      return (
        <div>
          Due to CORONA TIMES we are obliged to give a f*ck about this tab,
          <br />
          Sincerly yours,
          <br />
          the admin.
        </div>
      );
    }
  };
  return <Wrapper>{setView()}</Wrapper>;
};

export const TabManager: React.FC<TabManagerProps> = (props) => {
  const { currentTab, resources } = props;
  const sortedResources = sortResources(resources);
  const currentTabType = tabs[currentTab].type;
  const relevantResource = sortedResources[currentTabType] || [];

  return <TabPanel type={currentTabType} resources={relevantResource} />;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  margin-top: 40px;
`;

const CenteredMessageWrapper = styled(Wrapper)`
  justify-content: center;
  align-items: center;
  height: 80vh;
  color: lightgray;
`;
