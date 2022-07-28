import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User, UserList } from '../types/user';

const initialState: UserList = {
  userList: []
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.userList = [...state.userList, action.payload];
    }
  }
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
