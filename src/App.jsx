import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <Navbar />
        <Outlet />
      </SnackbarProvider>
    </>
  );
};

export default App;
