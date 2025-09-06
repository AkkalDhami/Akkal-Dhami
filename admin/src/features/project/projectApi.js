import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/project` }),
    tagTypes: ['Project'],
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => '/',
            providesTags: (result) =>
                result && Array.isArray(result)
                    ? [
                        ...result.map(({ id }) => ({ type: 'Project', id })),
                        { type: 'Project', id: 'LIST' },
                    ]
                    : [{ type: 'Project', id: 'LIST' }],
        }),
        getProject: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Project', id }],
        }),
        createProject: builder.mutation({
            query: (data) => ({
                url: '/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Project', id: 'LIST' }],
        }),
        updateProject: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Project', id },
                { type: 'Project', id: 'LIST' },
            ],
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Project', id },
                { type: 'Project', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi;

export default projectApi;
