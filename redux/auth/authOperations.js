import { createAsyncThunk } from '@reduxjs/toolkit';

import { db } from '../../firebase/config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';

export const auth = getAuth(db);

export const signUp = createAsyncThunk(
  'auth/signup',
  async (profileData, { rejectWithValue }) => {
    try {
      const { password, email, login } = profileData;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      return { user, email, login };
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (profileData, { rejectWithValue }) => {
    try {
      const { password, email } = profileData;
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      return user;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut();
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const isUserLogin = createAsyncThunk(
  'auth/isUserLogin',
  (_, { rejectWithValue }) => {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, user => {
          if (user) {
            const { uid, displayName, email } = user;

            resolve({ uid, displayName, email });
          } else {
            reject(null);
          }
        });
      });
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);