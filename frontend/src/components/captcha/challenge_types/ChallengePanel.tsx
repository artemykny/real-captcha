import { Info, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import styled from "styled-components";

type ChallengePanelProps = {
  prompt: string;
  submitDisabled: boolean;
  children: ReactNode;
  onSubmit: () => void;
  onRefresh: () => void;
};

export function ChallengePanel({
  prompt,
  submitDisabled,
  children,
  onSubmit,
  onRefresh,
}: ChallengePanelProps) {
  return (
    <>
      <ChallengePrompt>
        <PromptSmall>Select the correct answer</PromptSmall>
        <PromptMain>{prompt}</PromptMain>
      </ChallengePrompt>

      <ChallengeBody>{children}</ChallengeBody>

      <ChallengeFooter>
        <FooterIconButton
          type="button"
          aria-label="Get a new challenge"
          onClick={onRefresh}
        >
          <RefreshCw aria-hidden="true" />
        </FooterIconButton>
        <InfoTooltip
          role="img"
          tabIndex={0}
          aria-label="Challenge information"
          data-tooltip="Challenge information"
        >
          <Info aria-hidden="true" />
        </InfoTooltip>
        <VerifyButton
          type="button"
          disabled={submitDisabled}
          onClick={onSubmit}
        >
          VERIFY
        </VerifyButton>
      </ChallengeFooter>
    </>
  );
}

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
  margin: 4px 0 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.12;
`;

const ChallengeBody = styled.div`
  padding: 12px;
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

const InfoTooltip = styled.span`
  position: relative;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  color: #5f6368;

  svg {
    width: 27px;
    height: 27px;
    stroke-width: 2.5;
  }

  &::after {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    z-index: 1;
    width: max-content;
    max-width: 180px;
    border-radius: 3px;
    background: #202124;
    color: #ffffff;
    content: attr(data-tooltip);
    font-size: 12px;
    line-height: 1.2;
    opacity: 0;
    padding: 6px 8px;
    pointer-events: none;
    transform: translate(-50%, 4px);
    transition: opacity 120ms ease, transform 120ms ease;
    white-space: nowrap;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  &:focus-visible {
    outline: 2px solid #174ea6;
    outline-offset: 2px;
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

  &:disabled {
    background: #a8c7fa;
    cursor: not-allowed;
  }
`;
