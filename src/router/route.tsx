import { createBrowserRouter } from "react-router-dom";

import TodoPage from "../pages/TodoPage/TodoPage";
import TodoDetail from "../pages/TodoDetail/TodoDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />,
  },
  {
    path: "/:id",
    element: <TodoDetail />,
  },
]);
