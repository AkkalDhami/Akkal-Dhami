import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/message` }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Contact", id: "LIST" }],
    }),
  }),
});

export const { useSendMessageMutation } = contactApi;

export default contactApi;
