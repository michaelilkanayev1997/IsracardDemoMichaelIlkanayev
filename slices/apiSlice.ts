import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://potterapi-fedeperin.vercel.app";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (_builder) => ({}),
});
