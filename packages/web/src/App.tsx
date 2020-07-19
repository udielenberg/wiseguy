import React, { useEffect, useContext } from "react";
import { createBrowserHistory } from "history";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotesContext } from "context/Notes/";
import { realDummyNotes } from "dummydata/notes";
import { Sidebar } from "components/Sidebar";
import { Breadcrumbs } from "components/Breadcrumbs";
import { MainPage } from "pages/Main";
import { NotePage } from "pages/NotePage";
import ErrorBoundary from "./ErrorBoundary";
import { ListView } from "pages/ListView";

import "./App.css";

const history = createBrowserHistory();
function App() {
  const { actions } = useContext(NotesContext);

  useEffect(() => {
    actions.updateAll(realDummyNotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter {...{ history }}>
      <ErrorBoundary>
        <AppMain>
          <Sidebar />
          <AppContent>
            <Breadcrumbs />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/note/:id" component={NotePage} />
              <Route exact path="/resources/:type" component={ListView} />
              <Route render={() => <div>Wrong Page!</div>} />
            </Switch>
          </AppContent>
        </AppMain>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
export default App;

const AppMain = styled.div`
  display: flex;
  height: 100vh;
`;

const AppContent = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1 1 70%;
  position: relative;
`;
