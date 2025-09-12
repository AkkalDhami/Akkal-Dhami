import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/message` }),
    tagTypes: ['Message'],
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: ({ page = 1, limit = 20 }) => `?page=${page}&limit=${limit}`,
            providesTags: (result) =>
                result && Array.isArray(result)
                    ? [...result.map(({ id }) => ({ type: 'Message', id })), { type: 'Message', id: 'LIST' }]
                    : [{ type: 'Message', id: 'LIST' }],
        }),
        markMessageAsRead: builder.mutation({
            query: ({ id, read }) => ({
                url: `/${id}/read`,
                method: "PATCH",
                body: { read },
            }),
            invalidatesTags: ["Messages"],
        }),
        getMessage: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Message', id }],
        }),
        createMessage: builder.mutation({
            query: (data) => ({
                url: '/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Message', id: 'LIST' }],
        }),
        updateMessage: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Message', id },
                { type: 'Message', id: 'LIST' },
            ],
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Message', id },
                { type: 'Message', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useLazyGetMessageQuery,
    useCreateMessageMutation,
    useUpdateMessageMutation,
    useMarkMessageAsReadMutation ,
    useDeleteMessageMutation,
} = messageApi;

export default messageApi;