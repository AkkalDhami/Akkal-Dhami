import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const experienceApi = createApi({
  reducerPath: "experienceApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/experience` }),
  tagTypes: ["Experience"],
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: () => "/",
      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: "Experience", id })),
              { type: "Experience", id: "LIST" },
            ]
          : [{ type: "Experience", id: "LIST" }],
    }),

    addExperience: builder.mutation({
      query: (data) => ({
        url: "/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Experience", id: "LIST" }],
    }),

    updateExperience: builder.mutation({
      query: ({ _id, data }) => {
        return {
          url: `/update/${_id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Experience", id },
        { type: "Experience", id: "LIST" },
      ],
    }),

    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Experience", _id }],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;

export default experienceApi;
