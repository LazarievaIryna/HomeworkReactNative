import { createSlice } from '@reduxjs/toolkit';

import { signUp, logIn, logOut, isUserLogin } from './authOperations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userID: null,
    login: null,
    email: null,
    userAuthorized: false,
    loading: false,
  },
  extraReducers: builder => {
    builder
      // SIGNUP
      .addCase(signUp.fulfilled, (state, { payload }) => {
        const { user, login } = payload;
        state.userID = user.uid;
        state.login = login;
        state.email = payload.email;
        state.userAuthorized = true;
      })

      //LOGIN
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.userID = payload.uid;
        state.login = payload.displayName;
        state.email = payload.email;
        state.userAuthorized = true;
      })

      //LOGOUT
      .addCase(logOut.fulfilled, state => {
        state.userID = null;
        state.login = null;
        state.email = null;
        state.userAuthorized = false;
      })

      //is user authorized
      .addCase(isUserLogin.pending, state => {
        state.loading = true;
      })
      .addCase(isUserLogin.fulfilled, (state, { payload }) => {
        state.userAuthorized = true;
        state.userID = payload.uid;
        state.login = payload.displayName;
        state.email = payload.email;
        state.loading = false;
      })
      .addCase(isUserLogin.rejected, state => {
        state.userAuthorized = false;
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;