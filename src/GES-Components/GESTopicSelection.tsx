import { useLocation, useNavigate } from "react-router-dom";
import { Header1 } from "../utils/styledComponents";
import queryString from "query-string";
import { useCallback, useEffect, useState } from "react";
import { QuizStages } from "../utils/constants";
import { fetchGesQuestions, incrementAttemptCount } from "../utils/helperFunctions";
import SliderStart from "./Components/SliderStart";
import { AvailableLevel } from "./Components/LevelSelectButton";
import { useDispatch } from "react-redux";
import { Level, updateState } from "../redux-data-slice/gesAnswersDataSlice";

export default function GESTopicSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { week, data } = queryString.parse(location.search) as {
    course: string;
    week: string;
    data: string;
  };
  sessionStorage.setItem("userProfile", data); /** already stringified */
  sessionStorage.setItem("week", week);
  const userData = JSON.parse(data);
  const [quizSelection, setQuizSelection] = useState(false);
  const [allLevels, setAllLevels] = useState<string[]>([]);

  useEffect(() => {
    // setTopic(userData.currTopic as string);
    const fetchData = async () => await fetchGesQuestions(week, userData.currTopic);
    fetchData().then((data) => {
      const allLevels = Object.keys(data) as string[];
      setAllLevels(allLevels);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useBeforeUnload(true);

  const handleNext = () => {
    const confidenceString = `confidence${QuizStages.GES_START}`;
    const howFarString = `howFarLevel${QuizStages.GES_START}`;
    sessionStorage.setItem(confidenceString, sessionStorage.getItem(confidenceString) || "0");
    sessionStorage.setItem(howFarString, sessionStorage.getItem(howFarString) || "0");
    setQuizSelection(true);
  };

  const handleQuizStart = useCallback(
    (id: string) => async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      await incrementAttemptCount(userData.userid, week, userData.currTopic as string);
      const { userProfile } = sessionStorage;
      const { currentAttempt } = JSON.parse(userProfile);
      const data = JSON.stringify({ ...userData, currentAttempt: currentAttempt + 1 });
      sessionStorage.setItem("userProfile", data);
      dispatch(
        updateState({
          currentLevel: id as Level,
        })
      );
      navigate(`../ges-quiz?init-level=${id}`);
    },
    [dispatch, navigate, userData, week]
  );

  const renderLevels = () => {
    return userData.progress[userData.currTopic as string][week].map(
      (prog: string, index: number) => {
        const doable = index === 0 || (!!userData.progress[index - 1] && !prog);
        return (
          <>
            <AvailableLevel
              key={index}
              available={doable}
              level={index}
              handleQuizStart={handleQuizStart(allLevels[index])}
              completion={prog}
            />
          </>
        );
      }
    );
  };

  const progression = userData.progress[userData.currTopic as string][week];
  const newGame = !progression.some((prog: string) => prog !== null);

  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          {quizSelection ? (
            <>
              <Header1>Ready?</Header1>
              {!newGame ? (
                renderLevels()
              ) : (
                <AvailableLevel
                  available={true}
                  level={0}
                  handleQuizStart={handleQuizStart(allLevels[0])}
                />
              )}
            </>
          ) : (
            <SliderStart username={userData.username.split(" ")[0]} handleNext={handleNext} />
          )}
        </div>
      </div>
    </>
  );
}
