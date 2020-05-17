import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { theme as colorPalette } from "./theme";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: colorPalette.colors.primary,
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const MuiThemeProvider: React.FC = ({ children }) => {
  return <ThemeProvider {...{ theme }}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
