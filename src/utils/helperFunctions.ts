import { QuizTopic } from "./constants";

export const getQuestions = (topic: string) => {
  return topic === QuizTopic.NUMERACY
    ? JSON.parse(localStorage.getItem("ges-questions") || "{}").num
    : JSON.parse(localStorage.getItem("ges-questions") || "{}").lit;
};
