import { useState } from "react";
import { Header2 } from "../../utils/styledComponents";
import "../../confidenceSliderStyles.css";
import { QuizStages } from "../../utils/constants";

export default function GESSlider({ stage }: { stage: QuizStages }) {
  const [level, setLevel] = useState(1);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const level = e.target.value;
    setLevel(parseInt(level));
    sessionStorage.setItem(`howFarLevel${stage}`, level);
  };

  const headerMessage = (() => {
    switch (stage) {
      case QuizStages.GES_START:
        return "What level do you think you will get to?";
      case QuizStages.GES_END:
        return "How do you feel about the progress you've made so far in this town?";
      default:
        return "";
    }
  })();

  return (
    <>
      <Header2 style={{ fontSize: "1.25em" }}>{headerMessage}</Header2>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        id="how-far-level"
        value={level}
        onChange={handleSlider}
      />

      <Header2 style={{ fontSize: "1.25em", color: "#3380fc" }}>
        {levelMessage(level, stage)}
      </Header2>
    </>
  );
}

function levelMessage(level: number, stage: string) {
  const levelMessages: { [key: string]: { [key: number]: string } } = {
    GES_START: {
      1: "Entry Level 1",
      2: "Entry Level 2",
      3: "Entry Level 3",
      4: "Level 1",
      5: "Level 2",
    },
    GES_END: {
      1: "Im dissapointed in myself",
      2: "I think I could do better",
      3: "50:50 I think it's okay",
      4: "Im quite surprised how well I've done!",
      5: "Im absolutely delighted! ",
    },
  };

  return stage === "GES_START" ? levelMessages.GES_START[level] : levelMessages.GES_END[level];
}
