import { useEffect, useRef, useState } from "react";
import { CaptchaCheckbox } from "./CaptchaCheckbox";
import { CaptchaLayout } from "./CaptchaLayout";
import { ChallengePopup } from "./ChallengePopup";
import { challenges, getNextChallengeIndex } from "./challenges";
import type { CaptchaStatus } from "./types";

export function Captcha() {
  const popupRef = useRef<HTMLElement | null>(null);
  const checkboxButtonRef = useRef<HTMLButtonElement | null>(null);
  const verificationTimerRef = useRef<number | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [status, setStatus] = useState<CaptchaStatus>("idle");
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);

  const challenge = challenges[challengeIndex];

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
  }, [isChallengeOpen]);

  useEffect(() => {
    return () => {
      if (verificationTimerRef.current !== null) {
        window.clearTimeout(verificationTimerRef.current);
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

    setSelectedAnswer("");
    setStatus("idle");
    setIsChallengeOpen(true);
  }

  function closeChallenge() {
    setIsChallengeOpen(false);
    checkboxButtonRef.current?.focus();
  }

  function refreshChallenge() {
    setChallengeIndex((currentIndex) => getNextChallengeIndex(currentIndex));
    setSelectedAnswer("");
    setStatus("idle");
  }

  function selectAnswer(answer: string) {
    setSelectedAnswer(answer);
    setStatus("idle");
  }

  function verifyAnswer() {
    closeChallenge();
    setStatus("loading");

    if (verificationTimerRef.current !== null) {
      window.clearTimeout(verificationTimerRef.current);
    }

    verificationTimerRef.current = window.setTimeout(() => {
      setStatus(
        selectedAnswer === challenge.correctAnswer ? "success" : "fail",
      );
      verificationTimerRef.current = null;
    }, 400);
  }

  return (
    <CaptchaLayout>
      <CaptchaCheckbox
        ref={checkboxButtonRef}
        isOpen={isChallengeOpen}
        status={status}
        onOpen={openChallenge}
      />

      {isChallengeOpen && (
        <ChallengePopup
          ref={popupRef}
          challenge={challenge}
          selectedAnswer={selectedAnswer}
          onAnswerChange={selectAnswer}
          onClose={closeChallenge}
          onRefresh={refreshChallenge}
          onVerify={verifyAnswer}
        />
      )}
    </CaptchaLayout>
  );
}
