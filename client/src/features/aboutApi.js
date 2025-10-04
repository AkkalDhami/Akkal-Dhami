import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const aboutApi = createApi({
  reducerPath: "AboutApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/about` }),
  tagTypes: ["About"],
  endpoints: (builder) => ({
    getMyContacts: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetMyContactsQuery } = aboutApi;

export default aboutApi;
