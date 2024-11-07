import { useAppDispatch, useAppSelector } from "../lib/hooks/hooks";
import { toogleTheme } from "../store/slices/themeSlice";

const TestPage = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  return (
    <div>
      <p>Theme: {theme.value}</p>
      <input
        type="checkbox"
        value={"light" == theme.value ? "checked" : ""}
        onChange={() => dispatch(toogleTheme())}
      />
    </div>
  );
};

export default TestPage;
