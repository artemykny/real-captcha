import { forwardRef } from "react";
import styled from "styled-components";
import { StatusIndicator } from "./StatusIndicator";
import type { CaptchaStatus } from "./types";

type CaptchaCheckboxProps = {
  isOpen: boolean;
  status: CaptchaStatus;
  onOpen: () => void;
};

export const CaptchaCheckbox = forwardRef<HTMLButtonElement, CaptchaCheckboxProps>(
  function CaptchaCheckbox({ isOpen, status, onOpen }, ref) {
    const statusLabel = getCaptchaStatusLabel(status);

    return (
      <CaptchaBox aria-label="OGCC verification">
        <CheckboxButton
          ref={ref}
          type="button"
          onClick={onOpen}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={statusLabel}
          aria-busy={status === "loading"}
        >
          <StatusIndicator status={status} />
        </CheckboxButton>
        <LiveStatus aria-live="polite">{statusLabel}</LiveStatus>

        <CaptchaText>I am not Ohio</CaptchaText>

        <CaptchaBrand aria-label="OGCC Privacy Terms">
          <BrandBox aria-hidden="true">OG</BrandBox>
          <BrandName>Ohio Gyatt CC</BrandName>
        </CaptchaBrand>
      </CaptchaBox>
    );
  },
);

function getCaptchaStatusLabel(status: CaptchaStatus) {
  if (status === "loading") {
    return "Scanning gyatt signature";
  }

  if (status === "passed") {
    return "Rizz certified";
  }

  if (status === "retry") {
    return "Aura inconclusive";
  }

  if (status === "failed") {
    return "Ohio detected";
  }

  return "Open OGCC challenge";
}

const CaptchaBox = styled.section`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 74px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  background: #fafafa;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.18);
  padding: 0 12px;
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
    outline: 0;
  }
`;

const LiveStatus = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

const CaptchaText = styled.div`
  min-width: 0;
  flex: 1;
  margin-left: 11px;
  color: #111111;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.1;
  white-space: nowrap;
`;

const CaptchaBrand = styled.div`
  display: grid;
  justify-items: center;
  width: 70px;
  flex: 0 0 70px;
  color: #555555;
  line-height: 1;
`;

const BrandBox = styled.div`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
  border-radius: 3px;
  background: #4285f4;
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0;
`;

const BrandName = styled.div`
  font-size: 10px;
  line-height: 1.15;
`;
