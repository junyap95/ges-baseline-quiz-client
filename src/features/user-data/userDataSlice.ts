import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserDataState = {
  name?: string;
};

const initialState: UserDataState = {};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserName: (state: UserDataState, action: PayloadAction<string>) => {
      const { payload } = action;
      state.name = payload;
    },
  },
});

export const { updateUserName } = userDataSlice.actions;
export default userDataSlice.reducer;
