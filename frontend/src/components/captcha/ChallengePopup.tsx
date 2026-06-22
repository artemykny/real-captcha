import { forwardRef, useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import styled from "styled-components";
import type { CaptchaChallenge, CaptchaResult } from "./types";

type ChallengePopupProps = {
  isClosing: boolean;
  challenge: CaptchaChallenge;
  challengeRevision: number;
  onCancel: () => void;
  onComplete: (result: CaptchaResult) => void;
  onRefresh: () => void;
};

export const ChallengePopup = forwardRef<HTMLElement, ChallengePopupProps>(
  function ChallengePopup(
    {
      isClosing,
      challenge,
      challengeRevision,
      onCancel,
      onComplete,
      onRefresh,
    },
    ref,
  ) {
    const popupRef = useRef<HTMLElement | null>(null);
    const ChallengePopupContent = challenge.popup;

    const setPopupRef = useCallback(
      (node: HTMLElement | null) => {
        popupRef.current = node;

        if (typeof ref === "function") {
          ref(node);
          return;
        }

        if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    useEffect(() => {
      popupRef.current?.focus();
    }, []);

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(popupRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        popupRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    return (
      <Popup
        $isClosing={isClosing}
        ref={setPopupRef}
        role="dialog"
        aria-modal="true"
        aria-label="Captcha security challenge"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <ChallengePopupContent
          key={challengeRevision}
          onCancel={onCancel}
          onComplete={onComplete}
          onRefresh={onRefresh}
        />
      </Popup>
    );
  },
);

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusableElements(root: HTMLElement | null) {
  if (!root) {
    return [];
  }

  return Array.from(root.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((element) => !element.hasAttribute("aria-hidden"));
}

const Popup = styled.section<{ $isClosing: boolean }>`
  position: absolute;
  top: 37px;
  left: 56px;
  transform: translateY(-50%);
  z-index: 10;
  width: min(340px, calc(100vw - 32px));
  border: 1px solid #c8c8c8;
  border-radius: 2px;
  background: #ffffff;
  box-shadow: 0 8px 26px rgba(60, 64, 67, 0.28);
  padding: 8px;
  transform-origin: left 58px;
  pointer-events: ${({ $isClosing }) => ($isClosing ? "none" : "auto")};
  animation: ${({ $isClosing }) => (
    $isClosing ? "popup-exit" : "popup-enter"
  )} ${({ $isClosing }) => ($isClosing ? "240ms" : "520ms")}
    cubic-bezier(0.16, 1, 0.3, 1) both;

  &:focus {
    outline: 0;
  }

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    right: 100%;
    width: 0;
    height: 0;
    content: "";
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    transform: translateY(-50%);
  }

  &::before {
    border-right: 10px solid #c8c8c8;
  }

  &::after {
    margin-right: -1px;
    border-right: 10px solid #ffffff;
  }

  @keyframes popup-enter {
    from {
      opacity: 0;
      transform: translateY(-50%);
    }

    to {
      opacity: 1;
      transform: translateY(-50%);
    }
  }

  @keyframes popup-exit {
    from {
      opacity: 1;
      transform: translateY(-50%);
    }

    to {
      opacity: 0;
      transform: translateY(-50%);
    }
  }

  @media (max-width: 700px) {
    top: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%);
    transform-origin: top center;

    &::before,
    &::after {
      top: auto;
      right: auto;
      bottom: 100%;
      left: 33px;
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-bottom: 10px solid #c8c8c8;
      transform: none;
    }

    &::after {
      margin-right: 0;
      margin-bottom: -1px;
      border-bottom-color: #ffffff;
    }

    @keyframes popup-enter {
      from {
        opacity: 0;
        transform: translateX(-50%);
      }

      to {
        opacity: 1;
        transform: translateX(-50%);
      }
    }

    @keyframes popup-exit {
      from {
        opacity: 1;
        transform: translateX(-50%);
      }

      to {
        opacity: 0;
        transform: translateX(-50%);
      }
    }
  }
`;
