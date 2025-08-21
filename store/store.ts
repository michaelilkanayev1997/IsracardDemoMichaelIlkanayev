import { apiSlice } from "@/slices/apiSlice";
import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "@/slices/favoritesSlice";

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
