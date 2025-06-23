import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  userInfo: {
    userId: string | null;
    department?: string | null;
    subsidiary?: string | null;
  } | null;
  userId: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  userInfo: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userInfo = {
        userId: action.payload.userId,
        department: action.payload.department || null,
        subsidiary: action.payload.subsidiary || null,
      };
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
