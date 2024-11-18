export const PASSING_PERCENTAGE = 0.8;
export const HIGH_SCORE = 0.9;
export const FULL_MARKS = 1;

export enum QuizTopic {
  NUMERACY = "numeracy",
  LITERACY = "literacy",
}

export enum QuizStages {
  INTRODUCTION = "INTRODUCTION",
  TERMINATED = "TERMINATED",
  GES_START = "GES_START",
  GES_END = "GES_END",
}

// to add more
export const GOOGLE_SHEET =
  "https://script.google.com/macros/s/AKfycbyPSOlwJSyMWCcFs87y-FGAFt-6mA1VlfLsjElw1T7Su3m3eT8iUvJUZPEjwuEvcD7E/exec";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_RENDER_URL
    : "http://localhost:3001";

export const MAP_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_MAP_API_URL
    : "http://localhost:3000";

export const IMAGEKIT_PREFIX = "https://ik.imagekit.io/jbyap95/";
