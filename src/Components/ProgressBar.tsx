import "../confidenceSliderStyles.css";

interface ProgressBarProps {
  questionLen: number;
  questionNumber: number;
}
export default function ProgressBar({ questionLen, questionNumber }: ProgressBarProps) {
  return (
    <div>
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
    </div>
  );
}
