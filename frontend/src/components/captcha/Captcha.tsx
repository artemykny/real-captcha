import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CaptchaCheckbox } from "./CaptchaCheckbox";
import { ChallengePopup } from "./ChallengePopup";
import { challenges as defaultChallenges } from "../challenges";
import type {
  CaptchaChallenge,
  CaptchaResult,
  CaptchaStatus,
  ChallengeResult,
} from "./types";

const challengeCloseAnimationDuration = 240;
const nextChallengeDelay = 300;
const terminalResultDelay = 400;
const defaultPassThreshold = 2;
const defaultFailMinimum = -2;

type CaptchaProps = {
  challenges?: CaptchaChallenge[];
  passThreshold?: number;
  failMinimum?: number;
  onComplete?: (result: CaptchaResult) => void;
};

export function Captcha({
  challenges = defaultChallenges,
  passThreshold = defaultPassThreshold,
  failMinimum = defaultFailMinimum,
  onComplete,
}: CaptchaProps) {
  const popupRef = useRef<HTMLElement | null>(null);
  const checkboxButtonRef = useRef<HTMLButtonElement | null>(null);
  const verificationTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeRevision, setChallengeRevision] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<CaptchaStatus>("idle");
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isChallengeClosing, setIsChallengeClosing] = useState(false);

  const activeChallenge = challenges[challengeIndex];

  const closeChallenge = useCallback(() => {
    if (!isChallengeOpen || isChallengeClosing) {
      return;
    }

    setIsChallengeClosing(true);
    checkboxButtonRef.current?.focus();

    closeTimerRef.current = window.setTimeout(() => {
      setIsChallengeOpen(false);
      setIsChallengeClosing(false);
      closeTimerRef.current = null;
    }, challengeCloseAnimationDuration);
  }, [isChallengeClosing, isChallengeOpen]);

  useEffect(() => {
    if (!isChallengeOpen) {
      return;
    }

    function handleOutsideClick(event: PointerEvent) {
      const target = event.target as Node;

      if (popupRef.current?.contains(target)) {
        return;
      }

      if (checkboxButtonRef.current?.contains(target)) {
        return;
      }

      if (popupRef.current) {
        closeChallenge();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [closeChallenge, isChallengeOpen]);

  useEffect(() => {
    return () => {
      if (verificationTimerRef.current !== null) {
        window.clearTimeout(verificationTimerRef.current);
      }

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function openChallenge() {
    if (status === "loading") {
      return;
    }

    if (isChallengeOpen) {
      closeChallenge();
      return;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (challenges.length === 0) {
      finishSession({ status: "retry", score: 0 });
      return;
    }

    setStatus("idle");
    setScore(0);
    setChallengeIndex(0);
    setChallengeRevision((currentRevision) => currentRevision + 1);
    setIsChallengeClosing(false);
    setIsChallengeOpen(true);
  }

  function completeChallenge(result: ChallengeResult) {
    setStatus("loading");

    if (verificationTimerRef.current !== null) {
      window.clearTimeout(verificationTimerRef.current);
    }

    const nextScore = score + clampScore(result.score);
    const nextChallengeIndex = challengeIndex + 1;
    const hasNextChallenge = nextChallengeIndex < challenges.length;

    setScore(nextScore);

    const sessionResult = getSessionResult(nextScore, hasNextChallenge);
    const delay = sessionResult ? terminalResultDelay : nextChallengeDelay;

    verificationTimerRef.current = window.setTimeout(() => {
      if (sessionResult) {
        finishSession(sessionResult);
        return;
      }

      setChallengeIndex(nextChallengeIndex);
      setChallengeRevision((currentRevision) => currentRevision + 1);
      setStatus("idle");
      verificationTimerRef.current = null;
    }, delay);
  }

  function finishSession(result: CaptchaResult) {
    setStatus(getStatusFromResult(result));
    closeChallenge();
    onComplete?.(result);
    verificationTimerRef.current = null;
  }

  function refreshChallenge() {
    setStatus("idle");
    setChallengeRevision((currentRevision) => currentRevision + 1);

    const nextChallengeIndex = challengeIndex + 1;

    if (nextChallengeIndex < challenges.length) {
      setChallengeIndex(nextChallengeIndex);
      return;
    }

    finishSession({ status: "retry", score });
  }

  function getSessionResult(
    nextScore: number,
    hasNextChallenge: boolean,
  ): CaptchaResult | null {
    if (nextScore >= passThreshold) {
      return { status: "accepted", score: nextScore };
    }

    if (nextScore <= failMinimum) {
      return { status: "rejected", score: nextScore };
    }

    if (!hasNextChallenge) {
      return { status: "retry", score: nextScore };
    }

    return null;
  }

  function getStatusFromResult(result: CaptchaResult): CaptchaStatus {
    if (result.status === "accepted") {
      return "passed";
    }

    if (result.status === "retry") {
      return "retry";
    }

    return "failed";
  }

  return (
    <CaptchaFrame>
      <CaptchaCheckbox
        ref={checkboxButtonRef}
        isOpen={isChallengeOpen && !isChallengeClosing}
        status={status}
        onOpen={openChallenge}
      />

      {isChallengeOpen && activeChallenge && (
        <ChallengePopup
          ref={popupRef}
          isClosing={isChallengeClosing}
          challenge={activeChallenge}
          challengeRevision={challengeRevision}
          onCancel={closeChallenge}
          onComplete={completeChallenge}
          onRefresh={refreshChallenge}
        />
      )}
    </CaptchaFrame>
  );
}

function clampScore(score: number) {
  return Math.max(-1, Math.min(1, score));
}

const CaptchaFrame = styled.div`
  position: relative;
  width: min(100%, 304px);
  color: #202124;
  font-family:
    Arial,
    Helvetica,
    sans-serif;
`;
