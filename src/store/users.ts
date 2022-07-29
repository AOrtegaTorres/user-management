import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../types/user';
import { RootState } from '.';

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
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const newUser = state.userList.map((user) => {
        console.log(action.payload);
        if (user.emailId === action.payload.emailId) {
          return { ...user, ...action.payload };
        }
        return user;
      });
      state.userList = [...newUser];
    }
  }
});

export const selectUsers = (state: RootState) => state.users.userList;

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
