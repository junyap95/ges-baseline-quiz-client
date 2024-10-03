import "./App.css";
import { Route, Routes } from "react-router-dom";
import IntroductionContainer from "./Components/IntroductionContainer";
import QuizSelection from "./Components/QuizSelection";
import NumeracyQuiz from "./Components/NumeracyQuiz";
import LiteracyQuiz from "./Components/LiteracyQuiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroductionContainer />}></Route>
      <Route path="/quiz-selection" element={<QuizSelection />}></Route>
      <Route path="/numeracy-quiz" element={<NumeracyQuiz />}></Route>
      <Route path="/literacy-quiz" element={<LiteracyQuiz />}></Route>
    </Routes>
  );
}

export default App;
