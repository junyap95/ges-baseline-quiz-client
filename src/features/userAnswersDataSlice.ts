import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserAnswersDataState = {
  correctCount: number;
};

const initialState: UserAnswersDataState = { correctCount: 0 };

const userAnswersDataSlice = createSlice({
  name: "userAnswersData",
  initialState,
  reducers: {
    incrementCorrectCount: (state: UserAnswersDataState) => {
      state.correctCount += 1;
    },
    clearCorrectCount: (state: UserAnswersDataState) => {
      state.correctCount = 0;
    },
  },
});

export const { incrementCorrectCount, clearCorrectCount } = userAnswersDataSlice.actions;
export default userAnswersDataSlice.reducer;
