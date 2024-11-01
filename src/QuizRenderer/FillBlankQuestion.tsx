import { SetStateAction, useEffect, useState } from "react";
import { FillBlankType } from "../utils/allQuizQuestions";
import { Header1 } from "../utils/styledComponents";
import styled from "styled-components";
import { userSetAnswer } from "../redux-data-slice/gesAnswersDataSlice";
import { useDispatch } from "react-redux";
import { resultTextDisplayer } from "../utils/correctAnswerChecker";

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

  useEffect(() => {
    setCanProceed(false);
    if (!inputValues.some((ans) => ans === "")) {
      setCanProceed(true);
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [`${question.question_number}`]: resultTextDisplayer(question, inputValues),
      }));
      dispatch(userSetAnswer({ answer: inputValues, questionNum: question.question_number }));
    }
  }, [
    dispatch,
    inputValues,
    question,
    question.correct_answer.length,
    question.question_number,
    setAnswers,
    setCanProceed,
  ]);

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
    newValues[index] = question.capitalisation ? userInput : userInput.toUpperCase();
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
  box-sizing: border-box;
  width: 100%;
  height: 3em;
  font-size: 1em;
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
