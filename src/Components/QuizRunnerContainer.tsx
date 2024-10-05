import { FC } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../store/rootReducer";
import QuizRunner from "./QuizRunner";

const store = configureStore({
  reducer: rootReducer,
});
const QuizRunnerContainer: FC = () => {
  return (
    <Provider store={store}>
      <QuizRunner />
    </Provider>
  );
};

export default QuizRunnerContainer;
