import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PASSING_PERCENTAGE } from "../utils/constants";

export type Level = "el1" | "el2" | "el3" | "l1" | "l2";

export type GesAnswersDataState = {
  allLevels: Level[];
  correctCount: number;
  currentLevel: Level;
  quesNum: number;
  isQuizTerminated: boolean;
  isCheckPoint: boolean;
  levelLength: number;
};

const initialState: GesAnswersDataState = {
  correctCount: 0,
  currentLevel: "el1",
  quesNum: 0,
  isQuizTerminated: false,
  isCheckPoint: false,
  allLevels: [],
  levelLength: 0,
};

interface GesAnswerPayload {
  userAnswer: string | string[] | { [key: string]: string };
  totalQuestions: number;
}

interface CheckPointPayload {
  isCheckPoint: boolean;
  isQuizTerminated: boolean;
}

const userAnswersDataSlice = createSlice({
  name: "GesAnswersData",
  initialState,
  reducers: {
    hydrateState: (state, action: PayloadAction<GesAnswersDataState>) => {
      return action.payload; // Replace the entire state with the new one
    },
    userSubmitAnswer: (state: GesAnswersDataState, action: PayloadAction<GesAnswerPayload>) => {
      const { userAnswer, totalQuestions } = action.payload;
      let updatedCorrectCount = state.correctCount;

      if (userAnswer === "RIGHT") {
        updatedCorrectCount++;
      }

      if (state.quesNum + 1 < totalQuestions) {
        state.quesNum++;
        state.correctCount = updatedCorrectCount;
      } else {
        const correctPercentage = updatedCorrectCount / totalQuestions;

        if (correctPercentage >= PASSING_PERCENTAGE) {
          const currentLevelIndex = state.allLevels.indexOf(state.currentLevel);
          // if there are still some levels left
          if (currentLevelIndex < state.levelLength - 1) {
            state.isCheckPoint = true;
            state.currentLevel = state.allLevels[currentLevelIndex + 1];
          } else {
            state.isQuizTerminated = true;
          }
        } else {
          // Terminate the quiz if the player did not pass
          state.isQuizTerminated = true;
        }
        // question number and correct count reset before a new level starts
        state.quesNum = 0;
        state.correctCount = 0;
      }
    },

    setIsCheckPoint: (state: GesAnswersDataState, action: PayloadAction<CheckPointPayload>) => {
      const { isCheckPoint, isQuizTerminated } = action.payload;
      state.isCheckPoint = isCheckPoint;
      state.isQuizTerminated = isQuizTerminated;
    },
  },
});

export const { userSubmitAnswer, setIsCheckPoint, hydrateState } = userAnswersDataSlice.actions;
export default userAnswersDataSlice.reducer;
