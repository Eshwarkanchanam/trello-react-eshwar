import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback";

const App = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <SnackbarProvider maxSnack={1}>
          <Navbar />
          <Outlet />
        </SnackbarProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
