import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "en" | "he" | "ru";

type LanguageState = {
  current: Language;
};

const initialState: LanguageState = {
  current: "en", // default language
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.current = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
