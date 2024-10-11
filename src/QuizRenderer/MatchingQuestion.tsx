import React, { SetStateAction, useEffect, useState } from "react";
import { MatchType } from "../utils/allQuizQuestions";
import { Header1 } from "../utils/styledComponents";
import MatchingQuesRunner from "./MatchingQuesRunner";
import { mapValues } from "lodash";
const lightTap = require("../assets/light-tap.mp3");
const tapAudio = new Audio(lightTap);

interface MatchingProps {
  question: MatchType;
  setAnswers: React.Dispatch<
    SetStateAction<{ [key: string]: string | string[] | { [key: string]: string } }>
  >;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MatchingQuestion({ question, setAnswers, setCanProceed }: MatchingProps) {
  const [connections, setConnections] = useState<{ [key: string]: string }>({});
  const connectionsLen = Object.keys(connections).length;
  const [option, setOption] = useState("");

  const handleSelectOpt = (e: any) => {
    tapAudio.play();
    const targetId = e.currentTarget.id;
    setOption(targetId);
  };

  const handleSelectAns = (e: any) => {
    const targetId: string = e.currentTarget.id;
    handleConnect(targetId);
  };

  const handleConnect = (targetId: string) => {
    const updatedConnections = { ...connections };
    // const updatedAnsConnections = { ...state.answerConnections };
    if (option) {
      // if targetted answer already matched by other option hence > -1
      if (Object.values(updatedConnections).indexOf(targetId) > -1) {
        // const previousOption = state.answerConnections[targetId];
        const optionToBeDeleted = Object.keys(updatedConnections).find(
          (key) => updatedConnections[key] === targetId
        );
        optionToBeDeleted && delete updatedConnections[optionToBeDeleted];
      }
      const newConnections = {
        ...updatedConnections,
        [option]: targetId,
      };
      setConnections(newConnections);
      setOption(""); // Reset the selected option after connection
    }
  };

  const handleRestart = () => {
    setConnections({});
    setOption("");
    setCanProceed(false);
  };

  useEffect(() => {
    if (connectionsLen === question.options.length) {
      const finalConnections = mapValues(connections, (answer) => answer.split("-")[0]);
      setAnswers((prev) => ({
        ...prev,
        [`${question.question_number}`]: finalConnections,
      }));
      setCanProceed(true);
    }
  }, [
    connections,
    connectionsLen,
    question.options.length,
    question.question_number,
    setAnswers,
    setCanProceed,
  ]);

  return (
    <>
      {question.image && <img src={`/images/${question.image}`} alt="quiz-image" />}
      <div>
        <Header1>{question.question_text}</Header1>
        <p>Click a left and a right box to match them!</p>
      </div>

      <div className="matching-question-container">
        <MatchingQuesRunner
          question={question}
          connections={connections}
          handleSelectOpt={handleSelectOpt}
          handleSelectAns={handleSelectAns}
        />
      </div>
      <button className="btn-next visible submit" onClick={handleRestart}>
        Restart
      </button>
    </>
  );
}

// export default function MatchingQuestion({ question, setAnswers, setCanProceed }: MatchingProps) {
//   const dispatch = useDispatch();
//   const connections = useAppSelector(selectConnections);
//   const connectionsLen = Object.keys(connections).length;

//   const playSound = () => {
//     const audio = new Audio(clickSound);
//     audio.play();
//   };

//   const handleSelectOpt = (e: any) => {
//     playSound();
//     const targetId = e.currentTarget.id;
//     dispatch(updateOption({ targetId }));
//   };

//   const handleSelectAns = (e: any) => {
//     const targetId: string = e.currentTarget.id;
//     dispatch(handleConnect({ targetId }));
//   };

//   const handleRestart = () => {
//     dispatch(clearConnections());
//     setCanProceed(false);
//   };

//   useEffect(() => {
//     dispatch(clearConnections());
//   }, [dispatch]);

//   useEffect(() => {
//     if (connectionsLen === question.options.length) {
//       setAnswers((prev) => ({
//         ...prev,
//         [`${question.question_number}`]: connections,
//       }));
//       setCanProceed(true);
//     }
//   }, [
//     connections,
//     connectionsLen,
//     dispatch,
//     question.options.length,
//     question.question_number,
//     setAnswers,
//     setCanProceed,
//   ]);

//   // if (Object.keys(connections).length === question.options.length) {
//   //   setAnswers((prev) => ({
//   //     ...prev,
//   //     [`${question.question_number}`]: connections,
//   //   }));
//   //   setCanProceed(true);
//   // }

//   return (
//     <>
//       {question.image && (
//         <QuizImage src={require(`../images/${question.image}`)} alt="quiz-image" />
//       )}
//       <Header1>{question.question_text}</Header1>
//       <p>Click a left and a right box to match them!</p>
//       <div className="matching-question-container">
//         <MatchingQuesRunner
//           question={question}
//           connections={connections}
//           handleSelectOpt={handleSelectOpt}
//           handleSelectAns={handleSelectAns}
//         />
//       </div>
//       <button className="btn-next visible submit" onClick={handleRestart}>
//         Restart
//       </button>
//     </>
//   );
// }
