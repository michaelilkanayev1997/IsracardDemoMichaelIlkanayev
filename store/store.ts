import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { apiSlice } from "@/slices/apiSlice";
import booksReducer from "@/slices/booksSlice";
import themeReducer from "@/slices/themeSlice";
import languageReducer from "@/slices/languageSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query
  books: booksReducer,
  theme: themeReducer,
  language: languageReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["books", "theme", "language"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // only ignore redux-persist’s non-serializable actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
