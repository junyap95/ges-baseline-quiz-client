import "./App.css";
import { Route, Routes } from "react-router-dom";
import IntroductionContainer from "./Components/IntroductionContainer";
import QuizSelection from "./Components/QuizSelection";
import NumeracyQuizContainer from "./Components/NumeracyQuizContainer";
import LiteracyQuiz from "./Components/LiteracyQuiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroductionContainer />}></Route>
      <Route path="/quiz-selection" element={<QuizSelection />}></Route>
      <Route path="/quiz" element={<NumeracyQuizContainer />}></Route>
    </Routes>
  );
}

export default App;
