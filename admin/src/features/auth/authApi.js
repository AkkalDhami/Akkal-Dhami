
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefresh } from './baseQuery';

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        requestOtp: builder.mutation({
            query: () => ({ url: '/otp', method: 'POST' }),
        }),
        verifyOtp: builder.mutation({
            query: (code) => ({ url: '/otp/verify', method: 'POST', body: { code } }),
        }),
        logout: builder.mutation({
            query: () => ({ url: '/logout', method: 'POST' }),
        }),
    }),
});

export const { useRequestOtpMutation, useVerifyOtpMutation, useLogoutMutation } = authApi;

export default authApi