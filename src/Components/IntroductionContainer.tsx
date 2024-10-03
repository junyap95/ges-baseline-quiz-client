import { FC } from "react";
import Introduction from "./Introduction";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../store/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});
const IntroductionContainer: FC = () => {
  return (
    <Provider store={store}>
      <Introduction />
    </Provider>
  );
};

export default IntroductionContainer;
