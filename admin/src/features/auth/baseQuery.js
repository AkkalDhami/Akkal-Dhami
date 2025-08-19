// redux/baseQuery.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from './authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/auth',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
});

export const baseQueryWithRefresh = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Try refresh token
        const refreshResult = await baseQuery('/refresh', api, extraOptions);

        if (refreshResult.data) {
            api.dispatch(setCredentials({ accessToken: refreshResult.data.accessToken }));
            // Retry original query with new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Logout if refresh fails
            api.dispatch(logout());
        }
    }

    return result;
};
