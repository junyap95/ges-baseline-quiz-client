import "./App.css";
import { Route, Routes } from "react-router-dom";
import IntroductionContainer from "./Components/IntroductionContainer";
import QuizSelection from "./Components/QuizSelection";
import QuizRunnerContainer from "./Components/QuizRunnerContainer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroductionContainer />}></Route>
      <Route path="/quiz-selection" element={<QuizSelection />}></Route>
      <Route path="/quiz" element={<QuizRunnerContainer />}></Route>
    </Routes>
  );
}
