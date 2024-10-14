import { useState } from "react";
import "../confidenceSliderStyles.css";
import { Header2 } from "../utils/styledComponents";

export default function AnxietySlider() {
  const [anxietyLevel, setAnxietyLevel] = useState(0);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const anxietyLevel = e.target.value;
    setAnxietyLevel(parseInt(anxietyLevel));
    sessionStorage.setItem("anxietyLevel", anxietyLevel);
  };

  return (
    <>
      <Header2>How anxious are you feeling about this challenge?</Header2>
      <input
        type="range"
        min="0"
        max="100"
        step="10"
        id="anxiety-level"
        value={anxietyLevel}
        onChange={handleSlider}
      />

      <div
        style={{ maxWidth: "fit-content", padding: "0.5em", pointerEvents: "none" }}
        className="btn-next visible"
      >
        {anxietyMessage(anxietyLevel)}
      </div>
    </>
  );
}

function anxietyMessage(anxietyLevel: number) {
  switch (anxietyLevel) {
    case 0:
      return 0;
    case 10:
      return 10;
    case 20:
      return 20;
    case 30:
      return 30;
    case 40:
      return 40;
    case 50:
      return 50;
    case 60:
      return 60;
    case 70:
      return 70;
    case 80:
      return 80;
    case 90:
      return 90;
    case 100:
      return 100;
    default:
      return "Let's Go";
  }
}
