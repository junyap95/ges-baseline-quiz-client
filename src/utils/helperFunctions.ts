import { cloneDeep, shuffle } from "lodash";
import { FULL_MARKS, HIGH_SCORE, PASSING_PERCENTAGE, QuizTopic, API_URL } from "./constants";

export const getQuestions = (topic: string) => {
  return topic === QuizTopic.NUMERACY
    ? JSON.parse(localStorage.getItem("ges-questions") || "{}").num
    : JSON.parse(localStorage.getItem("ges-questions") || "{}").lit;
};

export const timeConverter = (millis: number): string => {
  if (!millis) return "N/A";
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
};

export const checkIfUserPass = (scoresArr: number[]): boolean => {
  let isPass = true;
  for (const score of scoresArr) {
    /** as long as there is one fail, or unfinished level, this user has not passed */
    if (score < PASSING_PERCENTAGE || !score) {
      isPass = false;
      break;
    }
  }
  return isPass;
};

/** fetch functions below */

export const shuffleQuestionsByLevel = (questions: { [key: string]: any[] }) => {
  // Create a deep copy of the questions to avoid modifying the original object
  const shuffledData = cloneDeep(questions);

  // Iterate through each level and shuffle the questions array
  Object.keys(shuffledData).forEach((level) => {
    shuffledData[level] = shuffle(shuffledData[level]);
  });

  return shuffledData;
};

export const updateProgressAndScoresTable = async (
  userid: string,
  week: string,
  date: string,
  scores: string,
  course: string
) => {
  try {
    const response = await fetch(`${API_URL}/update/weekly-progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid, week, date, scores, course }),
    });

    if (response.ok) return await response.json();
  } catch (error) {
    console.error("Error logging weekly check-in in progress table:", error);
  }
};

export const incrementUserStars = async (userid: string, amount: number, course: string) => {
  try {
    const response = await fetch(`${API_URL}/update/user-stars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid, amount, course }),
    });

    if (response.ok) return await response.json();
  } catch (error) {
    console.error("Error incrementing user stars:", error);
  }
};

export const logProgressIfPass = (
  userid: string,
  week: string,
  scoresArr: number[],
  currentAttempt: number,
  course: string
) => {
  try {
    let starsToIncrement = 0;
    if (checkIfUserPass(scoresArr)) {
      /** if passed all levels, and only used 1 attempt, +5 stars and so on */
      switch (currentAttempt) {
        case 1:
          starsToIncrement += 5;
          break;
        case 2:
          starsToIncrement += 3;
          break;
        default:
          starsToIncrement += 1;
          break;
      }

      const finalScore = scoresArr.reduce((acc, score) => acc + score) / scoresArr.length;
      if (finalScore >= HIGH_SCORE) starsToIncrement += 1;
      if (finalScore === FULL_MARKS) starsToIncrement += 1;

      /** increment user stars */
      incrementUserStars(userid, starsToIncrement, course);

      /** if passed, update the score table(stringified scores array) and progress table(date) */
      updateProgressAndScoresTable(
        userid,
        week,
        new Date().toISOString(),
        JSON.stringify(scoresArr),
        course
      );
    }
  } catch (error) {
    console.error("Error logging progress:", error);
  }
};

export const incrementAttemptCount = async (userid: string, week: string, course: string) => {
  try {
    const response = await fetch(`${API_URL}/update/attempt-count`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid, week, course }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error incrementing attempt count:", error);
  }
};
