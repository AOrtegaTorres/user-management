import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../types/user';

const initialState: UserState = {
  userList: []
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.userList = [...state.userList, action.payload];
    },
    deleteUser: (state, action: PayloadAction<User>) => {
      state.userList = state.userList.filter(({ emailId }) => emailId !== action.payload.emailId);
    }
  }
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
