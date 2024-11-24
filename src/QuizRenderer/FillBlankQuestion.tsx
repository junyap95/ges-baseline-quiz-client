import { SetStateAction, useEffect, useState } from "react";
import { FillBlankType } from "../utils/allQuizQuestions";
import { Header1 } from "../utils/styledComponents";
import styled from "styled-components";
import { userSetAnswer } from "../redux-data-slice/gesAnswersDataSlice";
import { useDispatch } from "react-redux";
import { resultTextDisplayer } from "../utils/correctAnswerChecker";
import useDebounce from "../GES-Components/Hooks/useDebounce";
import { FillBlankWrapper } from "./question-stylesheets/FillBlankStyles";

interface FillBlankProps {
  question: FillBlankType;
  setAnswers: React.Dispatch<
    SetStateAction<{ [key: string]: string | string[] | { [key: string]: string } }>
  >;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FillBlankQuestion({ question, setAnswers, setCanProceed }: FillBlankProps) {
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

  // const handleClear = () => {
  //   setInputValues(Array(question.num_of_text_box).fill(""));
  // };

  return (
    <FillBlankWrapper>
      <DisplayMessageContainer>{renderDisplayInfo(question.display_info)}</DisplayMessageContainer>
      <Header1>{question.question_text}</Header1>
      <FillContainer $answerLen={question.correct_answer.length}>
        {Array.from({ length }).map((e, index) => (
          <FillInputs
            $answerLen={question.correct_answer.length}
            placeholder="Type here"
            key={index}
            type="search"
            value={inputValues[index]}
            onChange={(e) => handleChange(e, index)}
          />
        ))}
      </FillContainer>
    </FillBlankWrapper>
  );
}

const FillContainer = styled.div<{ $answerLen?: number }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: ${(props) => ((props.$answerLen as number) > 1 ? "100%" : "30rem")};
  max-width: 70vw;
  gap: 0.5em;
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
  font-size: clamp(1em, 2vw, 1.5em);
  text-align: center;
`;

const FillInputs = styled.input<{ $answerLen?: number }>`
  width: 2rem;
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0.3);
  height: clamp(3em, 1vw, 3.5em);
  font-size: clamp(0.8em, 1.5vw, 1.5em);
  text-align: center;
  caret-color: #3380fc;
  color: #3380fc;
  border-radius: 1em;
  border: 2px solid #3380fc;

  &:focus {
    outline: none;
    border: 3px solid #3380fc;
  }

  &::placeholder {
    color: ${(props) => ((props.$answerLen as number) > 1 ? "transparent" : "none")};
  }

  &:focus::placeholder {
    color: transparent;
  }
`;
