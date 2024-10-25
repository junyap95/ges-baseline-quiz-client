import { Link, useLocation } from "react-router-dom";
import { Header1 } from "../utils/styledComponents";
import queryString from "query-string";
import { useEffect, useState } from "react";
import ConfidenceSlider from "../Components/ConfidenceSlider";
import { QuizStages, QuizTopic } from "../utils/constants";
import GESSlider from "./Components/GESSlider";

const fetchGesQuestions = async (week: string) => {
  try {
    const response = await fetch(`http://localhost:3001/get/game-data?week=${week}`);
    if (response.ok) {
      const quesToStore = { num: {}, lit: {} };
      const data = await response.json();
      quesToStore["num"] = data.num[week].allQuestions;
      quesToStore["lit"] = data.lit[week]?.allQuestions || {};
      localStorage.setItem("ges-questions", JSON.stringify(quesToStore));
    }
  } catch (error) {
    console.error("Error fetching GES questions: ", error);
  }
};

export default function GESTopicSelection() {
  const location = useLocation();
  const { course, week, data } = queryString.parse(location.search) as {
    course: string;
    week: string;
    data: string;
  };
  const query_string = `/ges-quiz?week=${week}&topic=`;
  sessionStorage.setItem("userProfile", data);
  const userData = JSON.parse(data);

  const [quizSelection, setQuizSelection] = useState(false);

  useEffect(() => {
    if (course && week) {
      fetchGesQuestions(week);
    }
  }, [course, week]);

  const handleNext = () => {
    setQuizSelection(true);
    const confidenceString = `confidence${QuizStages.GES_START}`;
    const howFarString = `howFarLevel${QuizStages.GES_START}`;
    sessionStorage.setItem(confidenceString, sessionStorage.getItem(confidenceString) || "0");
    sessionStorage.setItem(howFarString, sessionStorage.getItem(howFarString) || "0");
  };

  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          {quizSelection ? (
            <>
              <Header1>Select one Topic</Header1>

              <Link
                to={`${query_string}${QuizTopic.NUMERACY}`}
                className="topicBox btn-next visible"
              >
                <img src="./images/sam_colon.png" alt="Studyseed Sam" className="sam-topic" />
                <span>Numeracy</span>
              </Link>

              <Link
                to={`${query_string}${QuizTopic.LITERACY}`}
                className="topicBox btn-next visible "
              >
                <img src="./images/sam_period.png" alt="Studyseed Sam" className="sam-topic" />
                <span>Literacy</span>
              </Link>
            </>
          ) : (
            <>
              <Header1>Welcome Back, {userData.username.split(" ")[0]}</Header1>
              <hr />
              <ConfidenceSlider stage={QuizStages.GES_START} />
              <GESSlider stage={QuizStages.GES_START} />
              <hr />
              <button className="btn-next visible" onClick={handleNext}>
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
