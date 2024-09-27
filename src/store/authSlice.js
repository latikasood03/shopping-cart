import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuth: false,
    authLoading: false,
    error: null,
    token: null,
    userId: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        signup(state) {
            state.authLoading = true;
            state.error = null;
        },
        signupSuccess(state) {
            state.authLoading = false;
            state.isAuth = true;
            state.error = null;
        },
        signupFail(state, action) {
            state.authLoading = false;
            state.isAuth = false;
            state.error = action.payload;
        },
        login(state) {
            state.authLoading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.authLoading = false;
            state.error = null;
            state.isAuth = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        loginFail(state, action) {
            state.authLoading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isAuth = false;
            state.token = null;
            state.userId = null;
        }
    }

})

export const authActions = authSlice.actions;

export default authSlice.reducer;
