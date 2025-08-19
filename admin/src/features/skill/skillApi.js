import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4000';

const skillApi = createApi({
    reducerPath: 'skillApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/skill` }),
    tagTypes: ['Skill'],
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => '/',
            providesTags: (result) =>
                result && Array.isArray(result)
                    ? [...result.map(({ id }) => ({ type: 'Skill', id })), { type: 'Skill', id: 'LIST' }]
                    : [{ type: 'Skill', id: 'LIST' }],
        }),
        getSkill: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Skill', id }],
        }),
        createSkill: builder.mutation({
            query: (data) => ({
                url: '/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Skill', id: 'LIST' }],
        }),
        updateSkill: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Skill', id },
                { type: 'Skill', id: 'LIST' },
            ],
        }),
        deleteSkill: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, _id) => [{ type: 'Skill', _id }],
        }),
    }),
});

export const {
    useGetSkillsQuery,
    useGetSkillQuery,
    useCreateSkillMutation,
    useUpdateSkillMutation,
    useDeleteSkillMutation,
} = skillApi;

export default skillApi;