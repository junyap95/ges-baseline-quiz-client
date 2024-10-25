import { Provider } from "react-redux";
import GESQuizRunner from "./GESQuizRunner";
import { gesRootReducer } from "../store/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: gesRootReducer,
});

export default function GESTopicWrapper() {
  return (
    <Provider store={store}>
      <GESQuizRunner />
    </Provider>
  );
}
