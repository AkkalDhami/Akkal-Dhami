import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4000';

const aboutApi = createApi({
    reducerPath: 'AboutApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/about` }),
    tagTypes: ['About'],
    endpoints: (builder) => ({
        getMyContacts: builder.query({
            query: () => '/'
        })
    }),
});

export const {
    useGetMyContactsQuery
} = aboutApi;

export default aboutApi;