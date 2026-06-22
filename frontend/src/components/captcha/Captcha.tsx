import { useCallback, useEffect, useRef, useState } from "react";
import { CaptchaCheckbox } from "./CaptchaCheckbox";
import { CaptchaLayout } from "./CaptchaLayout";
import { ChallengePopup } from "./ChallengePopup";
import { getNextChallengeIndex, challenges } from "./challenges";
import type { CaptchaChallenge, CaptchaResult, CaptchaStatus } from "./types";

const challengeCloseAnimationDuration = 240;

type CaptchaProps = {
  challenge?: CaptchaChallenge;
  onComplete?: (result: CaptchaResult) => void;
};

export function Captcha({ challenge, onComplete }: CaptchaProps) {
  const popupRef = useRef<HTMLElement | null>(null);
  const checkboxButtonRef = useRef<HTMLButtonElement | null>(null);
  const verificationTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeRevision, setChallengeRevision] = useState(0);
  const [status, setStatus] = useState<CaptchaStatus>("idle");
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isChallengeClosing, setIsChallengeClosing] = useState(false);

  const activeChallenge = challenge ?? challenges[challengeIndex];

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

    setStatus("idle");
    setIsChallengeClosing(false);
    setIsChallengeOpen(true);
  }

  function completeChallenge(result: CaptchaResult) {
    closeChallenge();
    setStatus("loading");
    onComplete?.(result);

    if (verificationTimerRef.current !== null) {
      window.clearTimeout(verificationTimerRef.current);
    }

    verificationTimerRef.current = window.setTimeout(() => {
      setStatus(result.status === "accepted" ? "success" : "fail");

      if (!challenge) {
        setChallengeIndex((currentIndex) => getNextChallengeIndex(currentIndex));
      }

      verificationTimerRef.current = null;
    }, 400);
  }

  function refreshChallenge() {
    setStatus("idle");
    setChallengeRevision((currentRevision) => currentRevision + 1);

    if (!challenge) {
      setChallengeIndex((currentIndex) => getNextChallengeIndex(currentIndex));
    }
  }

  return (
    <CaptchaLayout>
      <CaptchaCheckbox
        ref={checkboxButtonRef}
        isOpen={isChallengeOpen && !isChallengeClosing}
        status={status}
        onOpen={openChallenge}
      />

      {isChallengeOpen && (
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
    </CaptchaLayout>
  );
}
