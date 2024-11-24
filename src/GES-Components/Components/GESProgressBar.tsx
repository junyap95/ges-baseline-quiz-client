import styled from "styled-components";
import "../../confidenceSliderStyles.css";

interface ProgressBarProps {
  questionLen: number;
  questionNumber: number;
}
export default function GESProgressBar({ questionLen, questionNumber }: ProgressBarProps) {
  return (
    <ProgressBarWrapper>
      Progress
      <input
        type="range"
        min="0"
        max={questionLen}
        step="1"
        id="progress-bar"
        value={questionNumber}
        readOnly={true}
      />
      {`${((questionNumber / questionLen) * 100).toFixed(0)}%`}
    </ProgressBarWrapper>
  );
}

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
`;
