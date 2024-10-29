import styled from "styled-components";
import { Header2 } from "../../utils/styledComponents";
import { CircleX, Check } from "lucide-react";

type AnswerPopupProps = {
  correct: boolean;
  correctAnswer: string;
  hint: string;
  onClickHandler?: any;
  questionStyle: string;
};

// function processAnswer(answer: string, questionStyle: string) {
//   const answerObj = JSON.parse(answer);

//   switch (questionStyle) {
//     case "fill_in_the_blank":
//       return answerObj;
//     case "multiple_choice_question":
//       return <Header2>{answerObj}</Header2>;
//     case "drag_and_drop":
//       try {
//         return (
//           <ol>
//             {Object.entries(answerObj).map(([key, value], index) => {
//               return (
//                 <li key={index} style={{ textAlign: "left" }}>
//                   {value as string}
//                 </li>
//               );
//             })}
//           </ol>
//         );
//       } catch (error) {
//         return "Error parsing [matching] answer";
//       }

//     case "matching":
//       try {
//         return Object.entries(answerObj).map(([key, value], index) => {
//           return (
//             <span
//               key={index}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {key as string}
//               <MoveHorizontal />
//               {value as string}
//               <br />
//             </span>
//           );
//         });
//       } catch (error) {
//         return "Error parsing [matching] answer";
//       }
//     default:
//       return answerObj;
//   }
// }

export default function AnswerPopup({
  correct,
  correctAnswer,
  hint,
  onClickHandler,
  questionStyle,
}: AnswerPopupProps) {
  return (
    <Container>
      <BackgroundBlur />
      {correct ? (
        <Message>
          <Header2>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check color="green" size={"2em"} />
              Correct! Keep it up!
            </span>
          </Header2>
        </Message>
      ) : (
        <Message>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1em", alignItems: "center" }}
          >
            <Header2>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircleX color="#f58439" />
                Wrong
              </span>
            </Header2>
            {/* <MiniAnswerBox>{processAnswer(correctAnswer, questionStyle)}</MiniAnswerBox> */}
            <HintBox>Hint: {hint}</HintBox>
            <button
              style={{ backgroundColor: "#3380fc" }}
              className="btn-next visible submit"
              onClick={onClickHandler}
            >
              Next
            </button>
          </div>
        </Message>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 6;
`;

const BackgroundBlur = styled.div`
  backdrop-filter: blur(0.5rem);
  background: rgba(255, 255, 255, 0.4);
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 3px #333333;
  border-radius: 1.5em;
  box-shadow: 0px 8px 0px 0px #333333;
  max-width: 40rem;
  height: fit-content;
  padding: 2rem 1rem;
  position: absolute;
  backdrop-filter: blur(0.5rem);
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  inset: 0;
  margin: auto;
  z-index: 1;
`;

// const MiniAnswerBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5em;
//   backdrop-filter: blur(0.5rem);
//   background: rgba(255, 255, 255, 0.8);
//   width: 90%;
//   padding: 0.5em 1em;
//   border: solid 1px #333333;
//   border-radius: 1.5em;
// `;

const HintBox = styled.div`
  width: 90%;
  padding: 0.5em 1em;

  border-radius: 1.5em;
`;
