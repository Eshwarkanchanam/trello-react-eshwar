import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback";
import { Provider } from "react-redux";
import { store } from "./app/store";

const App = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <SnackbarProvider maxSnack={1}>
          <Provider store={store}>
            <Navbar />
            <Outlet />
          </Provider>
        </SnackbarProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
