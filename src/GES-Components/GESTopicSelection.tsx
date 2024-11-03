import { Link, useLocation } from "react-router-dom";
import { Header1 } from "../utils/styledComponents";
import queryString from "query-string";
import { useCallback, useEffect, useState } from "react";
import ConfidenceSlider from "../Components/ConfidenceSlider";
import { API_URL, QuizStages, QuizTopic } from "../utils/constants";
import GESSlider from "./Components/GESSlider";
import { incrementAttemptCount } from "../utils/helperFunctions";
import { useBeforeUnload } from "../utils/customHooks";

const fetchGesQuestions = async (week: string) => {
  try {
    const response = await fetch(`${API_URL}/get/game-data?week=${week}`);
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
  sessionStorage.setItem("week", week);
  const userData = JSON.parse(data);

  const [quizSelection, setQuizSelection] = useState(false);

  // useEffect(() => {
  //   // getItem from LocalStorage, if not present, then only call fetch
  //   if (course && week) fetchGesQuestions(week);
  // }, [course, week]);

  useBeforeUnload(true);

  const handleNext = () => {
    setQuizSelection(true);
    const confidenceString = `confidence${QuizStages.GES_START}`;
    const howFarString = `howFarLevel${QuizStages.GES_START}`;
    sessionStorage.setItem(confidenceString, sessionStorage.getItem(confidenceString) || "0");
    sessionStorage.setItem(howFarString, sessionStorage.getItem(howFarString) || "0");
  };

  const handleQuizStart = useCallback(async () => {
    await incrementAttemptCount(userData.userid, week);
    const { userProfile } = sessionStorage;
    const { currentAttempt } = JSON.parse(userProfile);
    const data = JSON.stringify({ ...userData, currentAttempt: currentAttempt + 1 });
    sessionStorage.setItem("userProfile", data);
  }, [userData, week]);

  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          {quizSelection ? (
            <>
              {/* button with a handler to dispatch initial level, allLevels */}
              <Header1>Select one Topic</Header1>

              <Link
                id="numeracy"
                to={`${query_string}${QuizTopic.NUMERACY}`}
                className="topicBox btn-next visible"
                onClick={handleQuizStart}
              >
                <img src="./images/sam_colon.png" alt="Studyseed Sam" className="sam-topic" />
                <span>Numeracy</span>
              </Link>

              <Link
                id="literacy"
                to={`${query_string}${QuizTopic.LITERACY}`}
                className="topicBox btn-next visible"
                onClick={handleQuizStart}
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
