import { CheckCircle2, Headphones, Info, RefreshCw, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Challenge = {
  prompt: string;
  answers: string[];
  correctAnswer: string;
};

type Result = "success" | "fail" | null;
type VerificationState = "idle" | "loading";

const challenges: Challenge[] = [
  {
    prompt: "Select the number that comes after 7.",
    answers: ["6", "8", "10", "3"],
    correctAnswer: "8",
  },
  {
    prompt: "Choose the word that matches the image label: bus.",
    answers: ["Bus", "Tree", "Cup", "Chair"],
    correctAnswer: "Bus",
  },
  {
    prompt: "What color is the sky on a clear day?",
    answers: ["Blue", "Green", "Black", "Orange"],
    correctAnswer: "Blue",
  },
  {
    prompt: "Select the shape with three sides.",
    answers: ["Circle", "Square", "Triangle", "Rectangle"],
    correctAnswer: "Triangle",
  },
];

function getNextIndex(currentIndex: number) {
  return (currentIndex + 1) % challenges.length;
}

export function Captcha() {
  const popupRef = useRef<HTMLElement | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [verificationState, setVerificationState] =
    useState<VerificationState>("idle");
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);

  const challenge = challenges[challengeIndex];

  useEffect(() => {
    if (!isChallengeOpen) {
      return;
    }

    function handleOutsideClick(event: PointerEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsChallengeOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isChallengeOpen]);

  function openChallenge() {
    if (verificationState === "loading") {
      return;
    }

    setSelectedAnswer("");
    setResult(null);
    setIsChallengeOpen(true);
  }

  function refreshChallenge() {
    setChallengeIndex((currentIndex) => getNextIndex(currentIndex));
    setSelectedAnswer("");
    setResult(null);
  }

  function verifyAnswer() {
    setIsChallengeOpen(false);
    setVerificationState("loading");

    window.setTimeout(() => {
      setResult(
        selectedAnswer === challenge.correctAnswer ? "success" : "fail",
      );
      setVerificationState("idle");
    }, 800);
  }

  return (
    <Shell>
      <CaptchaFrame>
        <CaptchaBox aria-label="Captcha verification">
          <CheckboxButton
            type="button"
            onClick={openChallenge}
            aria-label="Open captcha challenge"
          >
            {verificationState === "loading" ? (
              <LoadingIcon aria-label="Verifying" role="img" />
            ) : result ? (
              <ResultIcon result={result} />
            ) : (
              <EmptyCheckbox aria-hidden="true" />
            )}
          </CheckboxButton>

          <CaptchaText>I'm not a robot</CaptchaText>

          <CaptchaBrand aria-label="RealCaptcha Privacy Terms">
            <BrandBox aria-hidden="true">RC</BrandBox>
            <BrandName>RealCaptcha</BrandName>
            <BrandLinks>Privacy - Terms</BrandLinks>
          </CaptchaBrand>
        </CaptchaBox>

        {isChallengeOpen && (
          <ChallengePopup
            ref={popupRef}
            role="dialog"
            aria-label="Captcha security question"
          >
            <ChallengePrompt>
              <PromptSmall>Select the correct answer</PromptSmall>
              <PromptMain>{challenge.prompt}</PromptMain>
              <PromptSmall>Choose one option below</PromptSmall>
            </ChallengePrompt>

            <AnswerGrid aria-label="Captcha answer choices">
              {challenge.answers.map((answer) => (
                <AnswerOption key={answer} $checked={selectedAnswer === answer}>
                  <input
                    type="radio"
                    name="captcha-answer"
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={() => {
                      setSelectedAnswer(answer);
                      setResult(null);
                    }}
                  />
                  <span>{answer}</span>
                </AnswerOption>
              ))}
            </AnswerGrid>

            <ChallengeFooter>
              <FooterIconButton
                type="button"
                onClick={refreshChallenge}
                aria-label="Get a new challenge"
              >
                <RefreshCw aria-hidden="true" />
              </FooterIconButton>
              <FooterIconButton type="button" tabIndex={-1} aria-hidden="true">
                <Headphones />
              </FooterIconButton>
              <FooterIconButton type="button" tabIndex={-1} aria-hidden="true">
                <Info />
              </FooterIconButton>
              <VerifyButton type="button" onClick={verifyAnswer}>
                VERIFY
              </VerifyButton>
            </ChallengeFooter>
          </ChallengePopup>
        )}
      </CaptchaFrame>
    </Shell>
  );
}

function ResultIcon({ result }: { result: Exclude<Result, null> }) {
  const Icon = result === "success" ? CheckCircle2 : XCircle;

  return (
    <ResultIconWrap
      $result={result}
      aria-label={result === "success" ? "Verification successful" : "Verification failed"}
      role="img"
    >
      <Icon aria-hidden="true" />
    </ResultIconWrap>
  );
}

const Shell = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #f5f6f7;
  color: #202124;
  font-family:
    Arial,
    Helvetica,
    sans-serif;
`;

const CaptchaFrame = styled.div`
  position: relative;
  width: min(100%, 304px);
`;

const CaptchaBox = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 78px;
  border: 2px solid #d3d3d3;
  border-radius: 4px;
  background: #fafafa;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  padding: 0 14px;
`;

const CheckboxButton = styled.button`
  appearance: none;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;

  &:focus-visible {
    outline: 2px solid #1a73e8;
    outline-offset: 2px;
  }
`;

const EmptyCheckbox = styled.span`
  width: 28px;
  height: 28px;
  border: 2px solid #b9b9b9;
  border-radius: 2px;
  background: #ffffff;

  ${CheckboxButton}:hover & {
    border-color: #3c4043;
  }
`;

const LoadingIcon = styled.span`
  width: 24px;
  height: 24px;
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

const CaptchaText = styled.div`
  min-width: 0;
  flex: 1;
  margin-left: 12px;
  color: #111111;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.1;
  white-space: nowrap;
`;

const CaptchaBrand = styled.div`
  display: grid;
  justify-items: center;
  width: 74px;
  flex: 0 0 74px;
  color: #555555;
  line-height: 1;
`;

const BrandBox = styled.div`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-bottom: 6px;
  border-radius: 3px;
  background: #4285f4;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0;
`;

const BrandName = styled.div`
  font-size: 10px;
  line-height: 1.15;
`;

const BrandLinks = styled.div`
  margin-top: 3px;
  font-size: 9px;
  line-height: 1;
`;

const ChallengePopup = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: min(320px, calc(100vw - 32px));
  border: 1px solid #c8c8c8;
  border-radius: 2px;
  background: #ffffff;
  box-shadow: 0 8px 26px rgba(60, 64, 67, 0.28);
  padding: 8px;
  transform-origin: center;
  animation: popup-enter 180ms cubic-bezier(0.2, 0, 0, 1);

  @keyframes popup-enter {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.96);
    }

    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const ChallengePrompt = styled.div`
  min-height: 104px;
  background: #4a90e2;
  color: #ffffff;
  padding: 18px 20px;
`;

const PromptSmall = styled.div`
  font-size: 15px;
  line-height: 1.25;
`;

const PromptMain = styled.div`
  margin: 4px 0;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.12;
`;

const AnswerGrid = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 8px;
  padding: 12px;
  background: #ffffff;
`;

const AnswerOption = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  border: 1px solid ${({ $checked }) => ($checked ? "#4a90e2" : "#dadce0")};
  border-radius: 2px;
  background: ${({ $checked }) => ($checked ? "#eef4fe" : "#ffffff")};
  cursor: pointer;
  font-size: 15px;
  padding: 8px 10px;

  input {
    accent-color: #4a90e2;
    margin: 0;
  }

  span {
    overflow-wrap: anywhere;
  }
`;

const ChallengeFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 64px;
  margin-top: 8px;
  border-top: 1px solid #dadce0;
  padding: 10px 4px 0;
`;

const FooterIconButton = styled.button`
  appearance: none;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 0;
  background: transparent;
  color: #5f6368;
  cursor: pointer;
  padding: 0;

  svg {
    width: 27px;
    height: 27px;
    stroke-width: 2.5;
  }
`;

const VerifyButton = styled.button`
  appearance: none;
  min-width: 94px;
  margin-left: auto;
  border: 0;
  border-radius: 2px;
  background: #4a90e2;
  color: #ffffff;
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 18px;

  &:focus-visible {
    outline: 2px solid #174ea6;
    outline-offset: 2px;
  }
`;

const ResultIconWrap = styled.span<{ $result: Exclude<Result, null> }>`
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
  color: ${({ $result }) => ($result === "success" ? "#188038" : "#d93025")};
  animation: status-pop 220ms cubic-bezier(0.2, 0, 0, 1);

  svg {
    display: block;
    width: 26px;
    height: 26px;
    stroke-width: 2.6;
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
