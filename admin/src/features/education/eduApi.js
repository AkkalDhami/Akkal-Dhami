import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const eduApi = createApi({
    reducerPath: 'eduApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/education` }),
    tagTypes: ['Education'],
    endpoints: (builder) => ({
        getEducations: builder.query({
            query: () => '/',
            providesTags: (result) =>
                result && Array.isArray(result)
                    ? [...result.map(({ id }) => (
                        { type: 'Education', id })
                    ),
                    { type: 'Education', id: 'LIST' }]
                    : [{ type: 'Education', id: 'LIST' }],
        }),

        addEducation: builder.mutation({
            query: (data) => ({
                url: '/add',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Education', id: 'LIST' }],
        }),

        updateEducation: builder.mutation({
            query: ({ id, data }) => {
                console.log(id, data);
                return ({
                    url: `/update/${id}`,
                    method: 'PUT',
                    body: data,
                })
            },
            invalidatesTags: (result, error, { id }) => [
                { type: 'Education', id },
                { type: 'Education', id: 'LIST' },
            ],
        }),

        deleteEducation: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, _id) => [{ type: 'Education', _id }],
        }),
    }),
});

export const {
    useGetEducationsQuery,
    useAddEducationMutation,
    useUpdateEducationMutation,
    useDeleteEducationMutation,
} = eduApi;

export default eduApi;