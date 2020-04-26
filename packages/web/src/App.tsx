import React from "react";
import "./App.css";
import { AddNote } from "components/AddNote";
import { NotesTable } from "components/NotesTable/index";
import { CenteredLayout } from "layouts";
function App() {
  return (
    <div className="App">
      <AddNote />
      <CenteredLayout>
        <NotesTable />
      </CenteredLayout>
    </div>
  );
}
export default App;
