import { Check, X } from "lucide-react";
import styled from "styled-components";
import type { CaptchaStatus } from "./types";

type StatusIndicatorProps = {
  status: CaptchaStatus;
};

export function StatusIndicator({ status }: StatusIndicatorProps) {
  if (status === "idle") {
    return <EmptyCheckbox aria-hidden="true" />;
  }

  if (status === "loading") {
    return <Spinner aria-label="Verifying" role="img" />;
  }

  const Icon = status === "success" ? Check : X;

  return (
    <IconWrap
      $status={status}
      aria-label={status === "success" ? "Verification successful" : "Verification failed"}
      role="img"
    >
      <Icon aria-hidden="true" />
    </IconWrap>
  );
}

const EmptyCheckbox = styled.span`
  width: 28px;
  height: 28px;
  box-sizing: border-box;
  border: 2px solid #b2b2b2;
  border-radius: 2px;
  background: #ffffff;

  button:focus-visible & {
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.32);
  }

  button:hover & {
    border-color: #3c4043;
  }
`;

const Spinner = styled.span`
  width: 28px;
  height: 28px;
  box-sizing: border-box;
  border: 3px solid #d7d7d7;
  border-top-color: #4285f4;
  border-radius: 50%;
  animation: checkbox-loading 700ms linear infinite;

  @keyframes checkbox-loading {
    to {
      transform: rotate(360deg);
    }
  }
`;

const IconWrap = styled.span<{ $status: Extract<CaptchaStatus, "success" | "fail"> }>`
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
  color: ${({ $status }) => ($status === "success" ? "#188038" : "#d93025")};
  animation: status-pop 220ms cubic-bezier(0.2, 0, 0, 1);

  svg {
    display: block;
    width: 28px;
    height: 28px;
    stroke-width: 2.4;
  }

  @keyframes status-pop {
    0% {
      opacity: 0;
      transform: scale(0.72);
    }

    65% {
      opacity: 1;
      transform: scale(1.12);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
