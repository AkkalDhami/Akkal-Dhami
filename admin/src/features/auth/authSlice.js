import { createSlice } from '@reduxjs/toolkit';
import authApi from './authApi';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.accessToken;
            localStorage.setItem("accessToken", action.payload.accessToken)
        },
        logout: (state) => {
            state.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.verifyOtp.matchFulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken;
        });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
