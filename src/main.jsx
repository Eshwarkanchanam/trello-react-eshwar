import {  StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Boards from "./components/Boards.jsx";
import DetailBoardPage from "./components/DetailBoardPage.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/boards" />,
  },
  {
    path: "/boards",
    element: <App />,
    children: [
      {
        index: true,
        element: <Boards />,
      },
      {
        path: "/boards/:boardId",
        element: <DetailBoardPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
