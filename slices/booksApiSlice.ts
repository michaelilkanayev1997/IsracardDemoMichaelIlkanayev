import { Book } from "@/types/Book";
import { apiSlice } from "./apiSlice";

export const cleanersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "/en/books",
      keepUnusedDataFor: 86400, // 24 hours in seconds
    }),
  }),
});

export const { useGetBooksQuery } = cleanersApiSlice;
