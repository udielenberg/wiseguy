import React, { useEffect, useContext } from "react";
import "./App.css";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable/index";
import { NotePanelModal } from "components/NotePanelModal";
import { NotesContext } from "context/Notes/";
import { realDummyNotes } from "dummydata/notes";
import { Sidebar } from "components/Sidebar";
import { Breadcrumbs } from "components/Breadcrumbs";
import styled from "styled-components";

function App() {
  const { actions } = useContext(NotesContext);

  useEffect(() => {
    actions.updateAll(realDummyNotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppMain>
      <Sidebar />
      <AppContent>
        <Breadcrumbs />
        <NotePanelModal />
        <AddNote />
        <NotesTable />
      </AppContent>
    </AppMain>
  );
}
export default App;

const AppMain = styled.div`
  display: flex;
  height: 100vh;
`;

const AppContent = styled.div`
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
  position: relative;
`;
