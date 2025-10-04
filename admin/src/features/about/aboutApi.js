import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/about`,
  }),
  tagTypes: ["about"],
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => "/",
      providesTags: ["about"],
    }),
    addBasicInfo: builder.mutation({
      query: (data) => ({
        url: "/my-contact/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),
  }),
});

export const { useGetAboutQuery, useAddBasicInfoMutation } = aboutApi;

export default aboutApi;
