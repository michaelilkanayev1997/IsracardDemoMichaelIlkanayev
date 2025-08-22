import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { lightTheme, darkTheme } from "@/constants/theme";

const useTheme = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === "light" ? lightTheme : darkTheme;
  return { theme, isDark: mode === "dark" };
};

export default useTheme;
