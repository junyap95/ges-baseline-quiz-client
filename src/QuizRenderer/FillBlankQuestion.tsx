import { SetStateAction, useEffect, useState } from "react";
import { FillBlankType } from "../utils/allQuizQuestions";
import { Header1 } from "../utils/styledComponents";
import styled from "styled-components";
import { userSetAnswer } from "../redux-data-slice/gesAnswersDataSlice";
import { useDispatch } from "react-redux";
import { resultTextDisplayer } from "../utils/correctAnswerChecker";
import useDebounce from "../GES-Components/Hooks/useDebounce";

interface FillBlankProps {
  question: FillBlankType;
  setAnswers: React.Dispatch<
    SetStateAction<{ [key: string]: string | string[] | { [key: string]: string } }>
  >;
  canProceed: boolean;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FillBlankQuestion({
  question,
  setAnswers,
  canProceed,
  setCanProceed,
}: FillBlankProps) {
  const dispatch = useDispatch();
  const length = question.num_of_text_box;
  const [inputValues, setInputValues] = useState<string[]>(Array(length).fill(""));
  const debouncedInputValues = useDebounce(inputValues, 500);
  useEffect(() => {
    setCanProceed(false);
    if (!debouncedInputValues.some((ans) => ans === "")) {
      setCanProceed(true);
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [`${question.question_number}`]: resultTextDisplayer(question, debouncedInputValues),
      }));
      if (debouncedInputValues) {
        dispatch(
          userSetAnswer({ answer: debouncedInputValues, questionNum: question.question_number })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValues, dispatch, inputValues, question, setCanProceed]);

  const renderDisplayInfo = (info: string) => {
    return info.includes("\n") ? (
      info.split("\n").map((text, index) => <DisplayMessage key={index}>{text}</DisplayMessage>)
    ) : (
      <DisplayShortMsg>{info}</DisplayShortMsg>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const userInput = e.target.value;
    const newValues = [...inputValues];
    newValues[index] = question.capitalisation ? userInput : userInput.trim();
    setInputValues(newValues);
  };

  const handleClear = () => {
    setInputValues(Array(question.num_of_text_box).fill(""));
  };

  return (
    <>
      <DisplayMessageContainer>{renderDisplayInfo(question.display_info)}</DisplayMessageContainer>
      <Header1>{question.question_text}</Header1>
      <FillContainer>
        {Array.from({ length }).map((e, index) => (
          <InputContainer key={index}>
            <FillInputs
              key={index}
              type="text"
              value={inputValues[index]}
              onChange={(e) => handleChange(e, index)}
            />
          </InputContainer>
        ))}
      </FillContainer>
      <button className="btn-next visible submit" onClick={handleClear}>
        Clear
      </button>
    </>
  );
}

const FillContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  gap: 1em;
`;

const DisplayMessageContainer = styled.div`
  width: fit-content;
  max-width: 50vw;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5em 1em;
`;

const DisplayMessage = styled.p`
  margin: 0;
  font-size: 1em;
  line-height: 1.8em;
  text-align: center;
`;

const DisplayShortMsg = styled.p`
  margin: 0;
  font-size: 2em;
  text-align: center;
`;

const InputContainer = styled.div`
  min-width: 7em;
`;

const FillInputs = styled.input`
  width: 100%;
  height: 3em;
  font-size: 1.2em;
  text-align: center;
  caret-color: #3380fc;
  color: #3380fc;
  border-radius: 1em;
  border: 1px solid #3380fc;

  &:focus {
    outline: none;
    border: 2px solid #3380fc;
  }
`;
