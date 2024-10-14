import { useState } from "react";
import "../confidenceSliderStyles.css";
import { Header2 } from "../utils/styledComponents";
import { QuizStages } from "../utils/constants";

export default function ConfidenceSlider({ stage }: { stage: QuizStages }) {
  const [confidenceLevel, setConfidenceLevel] = useState(0);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confidenceLevel = e.target.value;
    setConfidenceLevel(parseInt(confidenceLevel));
    sessionStorage.setItem(`confidence${stage}`, confidenceLevel);
  };

  const headerMessage =
    stage === QuizStages.INTRODUCTION
      ? "How confident are you feeling about this adventure?"
      : "Has your confidence changed after the test? Use the scale to show how confident you feel about completing the programme and earning your qualification.";

  return (
    <>
      <Header2 style={{ maxWidth: "70vw" }}>{headerMessage}</Header2>
      <input
        type="range"
        min="0"
        max="100"
        step="25"
        id="capacity"
        value={confidenceLevel}
        onChange={handleSlider}
      />
      <ConfidenceMessage confidenceLevel={confidenceLevel} stage={stage} />
    </>
  );
}

function ConfidenceMessage({
  confidenceLevel,
  stage,
}: {
  confidenceLevel: number;
  stage: QuizStages;
}): JSX.Element {
  let message: string;

  switch (confidenceLevel) {
    case 0:
      message = "I'm not confident at all!😕";
      break;
    case 25:
      message = "I feel quite nervous!😬";
      break;
    case 50:
      message = "50 : 50, I don't think it will be too bad!😁";
      break;
    case 75:
      message = "I feel quite confident!😉";
      break;
    case 100:
      message = "I'm certain I'll ace it!🤩";
      break;
    default:
      message = "Let's Go";
  }

  return stage === QuizStages.INTRODUCTION ? (
    <>
      <a
        href="/quiz-selection"
        className="btn-next visible"
        style={{ padding: "1em", maxWidth: "40vw", textDecoration: "none" }}
      >
        {message}
      </a>
    </>
  ) : (
    <Header2 style={{ color: "#3380fc" }}>{message}</Header2>
  );
}
