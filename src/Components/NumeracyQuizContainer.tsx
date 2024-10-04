import { FC } from "react";
import NumeracyQuiz from "./NumeracyQuiz";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../store/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});
const NumeracyQuizContainer: FC = () => {
  return (
    <Provider store={store}>
      <NumeracyQuiz />
    </Provider>
  );
};

export default NumeracyQuizContainer;
