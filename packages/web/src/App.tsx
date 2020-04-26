import React from "react";
import "./App.css";
import { Search } from "./components/Search";
import { NotesTable } from "./components/NotesTable/index";
import { CenteredLayout } from "./layouts";
function App() {
  return (
    <div className="App">
      <Search />
      <CenteredLayout>
        <NotesTable />
      </CenteredLayout>
    </div>
  );
}
export default App;
