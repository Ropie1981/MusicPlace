import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import Annonces from "./pages/Annonces";
import DetailAnnonce from "./pages/DetailAnnonce";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [mode, setMode] = useState("dark");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#DACC3E",
      },
      secondary: {
        main: "#000000",
      },
    },
    spacing: 10,
    typography: {
      fontFamily: "Jost",
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar toggleColorMode={toggleColorMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/annonces/:id" element={<DetailAnnonce />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
