import { createSlice } from '@reduxjs/toolkit';
import  authApi  from './authApi';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        isLoggedIn: false,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.accessToken = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.verifyOtp.matchFulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken;
            state.isLoggedIn = true;
        });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
