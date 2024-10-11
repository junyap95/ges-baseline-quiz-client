import { useState } from "react";
import "../confidenceSliderStyles.css";
import { Header2 } from "../utils/styledComponents";

export default function ConfidenceSlider() {
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confidenceLevel = e.target.value;
    setConfidenceLevel(parseInt(confidenceLevel));
    sessionStorage.setItem("confidenceLevel", confidenceLevel);
  };
  return (
    <>
      <Header2>How are you feeling about this adventure?</Header2>
      <input
        type="range"
        min="0"
        max="100"
        step="20"
        id="capacity"
        value={confidenceLevel}
        onChange={handleSlider}
      />
      <ConfidenceMessage confidenceLevel={confidenceLevel} />
    </>
  );
}
const Message = ({ children }: { children: string }) => {
  return (
    <>
      <a
        href="/quiz-selection"
        className="btn-next visible"
        style={{ padding: "1em", maxWidth: "40vw", textDecoration: "none" }}
      >
        {children}
      </a>
    </>
  );
};
function ConfidenceMessage({ confidenceLevel }: { confidenceLevel: number }): JSX.Element {
  switch (confidenceLevel) {
    case 0:
      return <Message>Not sure yet!</Message>;
    case 20:
      return <Message>Feeling a little nervous!</Message>;
    case 40:
      return <Message>A little confident!</Message>;
    case 60:
      return <Message>Fairly confident!</Message>;
    case 80:
      return <Message>Quite confident!</Message>;
    case 100:
      return <Message>Fully confident!!</Message>;
    default:
      return <Message>Let's Go</Message>;
  }
}
