import { useEffect } from "react";
import { useSelector } from "react-redux";

import i18n from "@/i18n";
import { RootState } from "@/store/store";

const useLanguageSync = () => {
  const current = useSelector((state: RootState) => state.language.current);

  useEffect(() => {
    i18n.changeLanguage(current);
  }, [current]);
};

export default useLanguageSync;
