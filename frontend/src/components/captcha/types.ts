import type { ComponentType } from "react";

export type CaptchaResult = {
  status: "accepted" | "rejected";
  humanPercentage: number;
};

export type CaptchaPopupProps = {
  onComplete: (result: CaptchaResult) => void;
  onCancel?: () => void;
  onRefresh: () => void;
};

export type CaptchaChallenge = {
  id: string;
  popup: ComponentType<CaptchaPopupProps>;
};

export type CaptchaStatus = "idle" | "loading" | "success" | "fail";
