import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "@/types/Book";

type BooksState = {
  favorites: number[];
  cachedBooks: Book[];
  lastFetched: number | null;
};

const initialState: BooksState = {
  favorites: [],
  cachedBooks: [],
  lastFetched: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((x) => x !== id);
      } else {
        state.favorites.push(id);
      }
    },
    setCachedBooks(state, action: PayloadAction<Book[]>) {
      state.cachedBooks = action.payload;
      state.lastFetched = Date.now();
    },
  },
});

export const { toggleFavorite, setCachedBooks } = booksSlice.actions;
export default booksSlice.reducer;
