import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ColorModeContext = React.createContext();

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
