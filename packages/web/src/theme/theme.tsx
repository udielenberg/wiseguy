import React from "react";
import { ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    primary: "#006489",
    secondary: "#0A2239",
    complementary: "#01A0C1",
    complementaryYellow: "#FFA630",
    dark: "#30363A",
    light: "#B3D2EF",
    superLight: "#DFF6FC",
    error2: "#931621",
    error: "#DB2B39",
    success: "#06A77D",
    white: "white",
    black: "black",
    highlight: "#F1D302",
  },
  fontSize: {
    s: "1em",
    m: "2em",
    l: "3em",
  },
  spacing: {
    mini: "5px",
    s: "10px",
    m: "15px",
    l: "30px",
    xl: "45px",
    xxl: "50px",
  },
};

const Theme: React.FC = ({ children }) => (
  <ThemeProvider {...{ theme }}>{children}</ThemeProvider>
);

export default Theme;
