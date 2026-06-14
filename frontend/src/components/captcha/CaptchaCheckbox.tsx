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
    return (
      <CaptchaBox aria-label="Captcha verification">
        <CheckboxButton
          ref={ref}
          type="button"
          onClick={onOpen}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Open captcha challenge"
        >
          <StatusIndicator status={status} />
        </CheckboxButton>

        <CaptchaText>I'm not a robot</CaptchaText>

        <CaptchaBrand aria-label="RealCaptcha Privacy Terms">
          <BrandBox aria-hidden="true">RC</BrandBox>
          <BrandName>RealCaptcha</BrandName>
          <BrandLinks>
            <BrandLink href="#">Privacy</BrandLink>
            <span aria-hidden="true"> - </span>
            <BrandLink href="#">Terms</BrandLink>
          </BrandLinks>
        </CaptchaBrand>
      </CaptchaBox>
    );
  },
);

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

const BrandLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 1px solid #1a73e8;
    outline-offset: 1px;
  }
`;
