import { Route, Routes } from "react-router-dom";
import { gesRootReducer } from "../store/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import GESQuizRunner from "./GESQuizRunner";
import GESTopicSelection from "./GESTopicSelection";

const store = configureStore({
  reducer: gesRootReducer,
});

export default function GESWrapper() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/topic-selection" element={<GESTopicSelection />}></Route>
        <Route path="/ges-quiz" element={<GESQuizRunner />}></Route>
      </Routes>
    </Provider>
  );
}
