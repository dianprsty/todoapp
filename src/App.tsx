import { RouterProvider } from "react-router-dom";
import { router } from "./router/route";
import { useAppSelector } from "./lib//hooks/hooks";
import { useEffect } from "react";

function App() {
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme.value);
  }, [theme]);

  return <RouterProvider router={router} />;
}

export default App;
