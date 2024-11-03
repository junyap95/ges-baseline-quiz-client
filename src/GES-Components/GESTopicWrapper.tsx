import { Provider, useDispatch } from "react-redux";
import GESQuizRunner from "./GESQuizRunner";
import { gesRootReducer } from "../store/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { API_URL, QuizTopic } from "../utils/constants";
import { update } from "lodash";
import { Level, updateState } from "../redux-data-slice/gesAnswersDataSlice";
import { shuffleQuestionsByLevel } from "../utils/helperFunctions";
import { selectLevelLength } from "../selectors/ges-data-selector";
import { useGesSelector } from "../store/state";

const store = configureStore({
  reducer: gesRootReducer,
});

const fetchGesQuestions = async (week: string) => {
  try {
    const response = await fetch(`${API_URL}/get/game-data?week=${week}`);
    if (response.ok) {
      const quesToStore = { num: {}, lit: {} };
      const data = await response.json();
      return data;
      // quesToStore["num"] = data.num[week].allQuestions;
      // quesToStore["lit"] = data.lit[week]?.allQuestions || {};
      // localStorage.setItem("ges-questions", JSON.stringify(quesToStore));
    }
  } catch (error) {
    console.error("Error fetching GES questions: ", error);
  }
};

const GESTopicContainer = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const { topic, week } = queryString.parse(location.search) as { topic: string; week: string };
  sessionStorage.setItem("topic", topic);
  const currentLevelLength = useGesSelector(selectLevelLength);
  useEffect(() => {
    fetchGesQuestions(week).then((data) => {
      const ques =
        topic === QuizTopic.NUMERACY ? data.num[week].allQuestions : data.lit[week].allQuestions;
      const allLevels = Object.keys(ques) as Level[];
      const initialLevel = allLevels[0];
      let timeInitialised: { [key: string]: number } = {};
      for (const level of allLevels) timeInitialised[level] = 0;
      const shuffledQuestions = shuffleQuestionsByLevel(ques);
      dispatch(
        updateState({
          allQuestions: shuffledQuestions,
          allLevels: allLevels,
          currentLevel: initialLevel,
          levelLength: ques[initialLevel].length,
          currentQuestion: shuffledQuestions[initialLevel][0],
          timeSpent: timeInitialised,
          scores: Array.from(allLevels, () => 0),
        })
      );
    });
  }, [dispatch, topic, week]);

  if (currentLevelLength === undefined) return <div>Loading</div>;

  return <GESQuizRunner />;
};
export default function GESTopicWrapper() {
  return (
    <Provider store={store}>
      <GESTopicContainer />
    </Provider>
  );
}
