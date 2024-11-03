import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PASSING_PERCENTAGE } from "../utils/constants";
import { Question } from "../utils/allQuizQuestions";
import { correctAnswerChecker } from "../utils/correctAnswerChecker";

export type Level = "el1" | "el2" | "el3" | "l1" | "l2" | "init";
export type Answer = string | string[] | { [key: string]: string | string[] };

export type GesAnswersDataState = {
  allLevels: Level[];
  correctCount: number;
  currentLevel: Level;
  quesNum: number;
  isQuizTerminated: boolean;
  isCheckPoint: boolean;
  levelLength: number;
  allUserAnswers: { [key: string]: Answer };
  currentQuestion: Question;
  allQuestions: { [key: string]: Question[] };
  scores: number[];
  timeSpent: { [key: string]: number };
};

const initialState: GesAnswersDataState = {
  allLevels: [],
  correctCount: 0,
  currentLevel: "init",
  quesNum: 0,
  isQuizTerminated: false,
  isCheckPoint: false,
  levelLength: 0,
  scores: [],
  timeSpent: {},
  allUserAnswers: {},
  currentQuestion: {
    question_style: "dummy",
    question_text: "dummy",
    correct_answer: "dummy",
    question_number: "dummy",
    hint: "dummy",
  },
  allQuestions: {},
};

interface UserAnswerPayload {
  answer: string | string[] | { [key: string]: string };
  questionNum: string;
}

interface CheckPointPayload {
  isCheckPoint: boolean;
  isQuizTerminated: boolean;
}

const userAnswersDataSlice = createSlice({
  name: "GesAnswersData",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<Partial<GesAnswersDataState>>) => {
      return { ...state, ...action.payload }; // Merge the existing state with the new properties
    },
    updateTimer: (state: GesAnswersDataState, action: PayloadAction<number>) => {
      const currIndex = state.allLevels.indexOf(state.currentLevel); // at checkpt
      const isEndOfLevels = state.isQuizTerminated;
      const currLvl = isEndOfLevels ? state.allLevels[currIndex] : state.allLevels[currIndex - 1];
      if (state.timeSpent[currLvl] <= 0) state.timeSpent[currLvl] = action.payload;
    },
    userSubmitAnswer: (state: GesAnswersDataState) => {
      let updatedCorrectCount = state.correctCount;

      const currentAnswer = state.allUserAnswers[state.currentQuestion.question_number];
      const isAnswerCorrect = correctAnswerChecker(state.currentQuestion, currentAnswer);

      if (isAnswerCorrect) {
        updatedCorrectCount++;
        state.allUserAnswers[state.currentQuestion.question_number] = "RIGHT";
      } else {
        state.allUserAnswers[state.currentQuestion.question_number] = "WRONG - " + currentAnswer;
      }

      // if there are still questions left in the level
      if (state.quesNum + 1 < state.levelLength) {
        state.quesNum++;
        state.correctCount = updatedCorrectCount;
      } else {
        // if all questions in the level are answered, calculate score
        const correctPercentage = updatedCorrectCount / state.levelLength;
        const currentLevelIndex = state.allLevels.indexOf(state.currentLevel);
        state.scores[currentLevelIndex] = Number(correctPercentage.toFixed(2));
        if (correctPercentage >= PASSING_PERCENTAGE) {
          // if there are still some levels left
          if (currentLevelIndex < state.allLevels.length - 1) {
            state.isCheckPoint = true;
            state.currentLevel = state.allLevels[currentLevelIndex + 1];
            state.levelLength = state.allQuestions[state.currentLevel].length;
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
      const currentQuestion = state.allQuestions[state.currentLevel][state.quesNum];
      state.currentQuestion = currentQuestion;
    },

    setIsCheckPoint: (state: GesAnswersDataState, action: PayloadAction<CheckPointPayload>) => {
      const { isCheckPoint, isQuizTerminated } = action.payload;
      state.isCheckPoint = isCheckPoint;
      state.isQuizTerminated = isQuizTerminated;
    },

    userSetAnswer: (state: GesAnswersDataState, action: PayloadAction<UserAnswerPayload>) => {
      const { answer, questionNum } = action.payload;
      const updatedAnswers = { ...state.allUserAnswers, [questionNum]: answer };
      state.allUserAnswers = updatedAnswers;
    },
  },
});

export const { userSubmitAnswer, setIsCheckPoint, updateState, userSetAnswer, updateTimer } =
  userAnswersDataSlice.actions;
export default userAnswersDataSlice.reducer;
