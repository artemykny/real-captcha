import { useId, useState } from "react";
import styled from "styled-components";
import type { CaptchaPopupProps, CaptchaResult } from "../types";
import { ChallengePanel } from "./ChallengePanel";

type ChoiceOption = {
  id: string;
  label: string;
};

export type SingleChoicePopupProps = CaptchaPopupProps & {
  prompt: string;
  options: ChoiceOption[];
  correctOptionId: string;
};

export function SingleChoicePopup({
  prompt,
  options,
  correctOptionId,
  onComplete,
  onRefresh,
}: SingleChoicePopupProps) {
  const legendId = useId();
  const [selectedOptionId, setSelectedOptionId] = useState("");

  function submitAnswer() {
    if (!selectedOptionId) {
      return;
    }

    onComplete(scoreResult(selectedOptionId === correctOptionId));
  }

  return (
    <ChallengePanel
      prompt={prompt}
      submitDisabled={!selectedOptionId}
      onSubmit={submitAnswer}
      onRefresh={onRefresh}
    >
      <AnswerGrid aria-labelledby={legendId}>
        <VisuallyHiddenLegend id={legendId}>{prompt}</VisuallyHiddenLegend>
        {options.map((option) => (
          <AnswerOption
            key={option.id}
            $checked={selectedOptionId === option.id}
          >
            <input
              type="radio"
              name="captcha-answer"
              value={option.id}
              checked={selectedOptionId === option.id}
              onChange={() => setSelectedOptionId(option.id)}
            />
            <span>{option.label}</span>
          </AnswerOption>
        ))}
      </AnswerGrid>
    </ChallengePanel>
  );
}

function scoreResult(isAccepted: boolean): CaptchaResult {
  return {
    status: isAccepted ? "accepted" : "rejected",
    humanPercentage: isAccepted ? 0.94 : 0.27,
  };
}

const AnswerGrid = styled.fieldset`
  display: grid;
  gap: 8px;
  border: 0;
  padding: 0;
  margin: 0;
  background: #ffffff;
`;

const VisuallyHiddenLegend = styled.legend`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
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
