import { SetStateAction, useState } from "react";
import { FillBlankType } from "../utils/allQuizQuestions";
import { Header1 } from "../utils/styledComponents";
import styled from "styled-components";

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
  const length = question.num_of_text_box;
  const [inputValues, setInputValues] = useState<string[]>(Array(length).fill(""));

  //   const handleBlur = (e: React.FocusEvent<HTMLInputElement>, index: number) => {
  //     const capitalizedValue = e.target.value.toUpperCase();

  //     // Update the specific input field with the capitalized value
  //     const newValues = [...inputValues];
  //     newValues[index] = capitalizedValue;
  //     setInputValues(newValues);

  //     // // You can also update the answers in the parent state here if needed
  //     // setAnswers((prev) => ({
  //     //   ...prev,
  //     //   [question.question_number]: newValues,
  //     // }));
  //   };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const userInput = e.target.value.toUpperCase();
    const newValues = [...inputValues];
    newValues[index] = userInput;
    setInputValues(newValues);
  };
  return (
    <>
      <Header1>{question.question_text}</Header1>
      <Header1>{question.display_info}</Header1>
      <FillContainer>
        {Array.from({ length }).map((e, index) => (
          <FillInputs
            key={index}
            type="text"
            value={inputValues[index]}
            onChange={(e) => handleChange(e, index)}
          />
        ))}
      </FillContainer>
    </>
  );
}

const FillContainer = styled.div`
  display: flex;
  width: 50vw;
  gap: 1em;
`;

const FillInputs = styled.input`
  padding: 0;
  margin: 0;
  width: fit-content;
  height: 3em;
  font-size: 1.2em;
  text-align: center;
`;
