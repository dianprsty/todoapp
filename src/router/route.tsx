import { createBrowserRouter } from "react-router-dom";

import TestPage from "../pages/TestPage";
import TodoPage from "../pages/TodoPage/TodoPage";
import TodoDetail from "../pages/TodoDetail/TodoDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TestPage />,
  },
  {
    path: "/todo",
    element: <TodoPage />,
  },
  {
    path: "/todo/:id",
    element: <TodoDetail />,
  },
]);
