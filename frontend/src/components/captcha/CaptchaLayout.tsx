import type { PropsWithChildren } from "react";
import styled from "styled-components";

export function CaptchaLayout({ children }: PropsWithChildren) {
  return (
    <Shell>
      <CaptchaFrame>{children}</CaptchaFrame>
    </Shell>
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
