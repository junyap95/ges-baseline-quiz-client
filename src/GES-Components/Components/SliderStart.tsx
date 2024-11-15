import ConfidenceSlider from "../../Components/ConfidenceSlider";
import { QuizStages } from "../../utils/constants";
import { Header1 } from "../../utils/styledComponents";
import GESSlider from "./GESSlider";

export default function SliderStart({
  username,
  handleNext,
}: {
  username: string;
  handleNext: () => void;
}) {
  return (
    <>
      <Header1>Welcome Back, {username}</Header1>
      <hr />
      <ConfidenceSlider stage={QuizStages.GES_START} />
      <GESSlider stage={QuizStages.GES_START} />
      <hr />
      <button className="btn-next visible" onClick={handleNext}>
        Next
      </button>
    </>
  );
}
