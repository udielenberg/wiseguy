import React, { useEffect, useContext } from "react";
import "./App.css";
import { NotesContext } from "context/Notes/";
import { realDummyNotes } from "dummydata/notes";
import { Sidebar } from "components/Sidebar";
import { Breadcrumbs } from "components/Breadcrumbs";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { createBrowserHistory } from "history";
import { MainPage } from "pages/Main";
import { NotePage } from "pages/NotePage";

const history = createBrowserHistory();
function App() {
  const { actions } = useContext(NotesContext);

  useEffect(() => {
    actions.updateAll(realDummyNotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppMain>
      <BrowserRouter {...{ history }}>
        <Sidebar />
        <AppContent>
          <Breadcrumbs />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/note/:id" component={NotePage} />
          </Switch>
        </AppContent>
      </BrowserRouter>
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
  flex: 1 1 auto;
  position: relative;
`;
