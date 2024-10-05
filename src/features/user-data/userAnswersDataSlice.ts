import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserAnswersDataState = {
  correctCount: number;
};

const initialState: UserAnswersDataState = { correctCount: 0 };

const userAnswersDataSlice = createSlice({
  name: "userAnswersData",
  initialState,
  reducers: {
    incrementCorrectCount: (state: UserAnswersDataState, action: PayloadAction<void>) => {
      state.correctCount += 1;
    },
  },
});

export const { incrementCorrectCount } = userAnswersDataSlice.actions;
export default userAnswersDataSlice.reducer;
