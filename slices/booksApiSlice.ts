import { Book } from "@/types/Book";
import { apiSlice } from "./apiSlice";

export const cleanersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "/en/books",
    }),
  }),
});

export const { useGetBooksQuery } = cleanersApiSlice;
