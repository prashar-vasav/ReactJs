import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: "prashar.vasav@tftus.com" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    newUser(state, action) {
      state.userId = action.payload;
    },
    logoutUser(state, action) {
      state.userId = "";
    },
  },
});

export default userSlice.reducer;
export const { newUser, logoutUser } = userSlice.actions;
