export type Challenge = {
  prompt: string;
  answers: string[];
  correctAnswer: string;
};

export type CaptchaStatus = "idle" | "loading" | "success" | "fail";
