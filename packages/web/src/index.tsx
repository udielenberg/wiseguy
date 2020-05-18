import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { NotesProvider } from "context/Notes/";
import Theme from "theme/theme";
import MuiThemeProvider from "theme/MuiTheme";

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider>
      <Theme>
        <NotesProvider>
          <App />
        </NotesProvider>
      </Theme>
    </MuiThemeProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
