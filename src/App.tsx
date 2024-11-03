import "./App.css";
import { Route, Routes } from "react-router-dom";
// import IntroductionContainer from "./Components/IntroductionContainer";
import QuizSelection from "./Components/QuizSelection";
import QuizRunnerContainer from "./Components/QuizRunnerContainer";
import GESTopicSelection from "./GES-Components/GESTopicSelection";
import GESTopicWrapper from "./GES-Components/GESTopicWrapper";
import { lazy } from "react";

const IntroductionContainer = lazy(() => import("./Components/IntroductionContainer"));
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroductionContainer />}></Route>
      <Route path="/quiz-selection" element={<QuizSelection />}></Route>
      <Route path="/quiz" element={<QuizRunnerContainer />}></Route>

      <Route path="/ges-topic-selection" element={<GESTopicSelection />}></Route>
      <Route path="/ges-quiz" element={<GESTopicWrapper />}></Route>
    </Routes>
  );
}
