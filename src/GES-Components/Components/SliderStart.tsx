import ConfidenceSlider from "../../Components/ConfidenceSlider";
import { QuizStages } from "../../utils/constants";
import { Header1 } from "../../utils/styledComponents";
import GESSlider from "./GESSlider";
import styled from "styled-components";

export default function SliderStart({
  username,
  handleNext,
}: {
  username: string;
  handleNext: () => void;
}) {
  return (
    <SliderWrapper>
      <HeaderSlider>Welcome Back, {username}</HeaderSlider>

      <ConfidenceSlider stage={QuizStages.GES_START} />
      <GESSlider stage={QuizStages.GES_START} />

      <button className="btn-next visible" onClick={handleNext}>
        Next
      </button>
    </SliderWrapper>
  );
}

const HeaderSlider = styled(Header1)`
  margin: 0 0 0 0;
`;

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2em, 8vh, 3em);
`;
