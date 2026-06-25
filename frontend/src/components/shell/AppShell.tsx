import type { PropsWithChildren } from "react";
import { createGlobalStyle, styled } from "styled-components";

const footerGroups = [
  {
    title: "Compliance",
    links: [
      "Verification Policy",
      "Youth Signal Standards",
      "Aura Review Board",
      "Acceptable Rizz Use",
      "Ohio Risk Matrix",
      "Appeals",
    ],
  },
  {
    title: "Governance",
    links: [
      "Trust Center",
      "Data Handling",
      "Cookie Ledger",
      "Model Notices",
      "Accessibility",
      "Regional Terms",
    ],
  },
  {
    title: "Resources",
    links: [
      "Developer Console",
      "Status",
      "Procurement",
      "Partner Portal",
      "Brand Assets",
      "Release Notes",
    ],
  },
  {
    title: "Company",
    links: [
      "About OGCC",
      "Careers",
      "Press",
      "Investor Room",
      "Contact",
      "Security",
    ],
  },
];

export function AppShell({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalStyle />
      <Shell>
        <Header aria-label="Site header">
          <Brand href="/" aria-label="OGCC home">
            <BrandMark aria-hidden="true">OG</BrandMark>
            <span>
              <BrandName>OGCC</BrandName>
              <BrandSubtitle>Identity Assurance</BrandSubtitle>
            </span>
          </Brand>

          <HeaderNav aria-label="Primary navigation">
            <a href="/">Products</a>
            <a href="/">Standards</a>
            <a href="/">Resources</a>
            <a href="/">Support</a>
          </HeaderNav>

          <HeaderAction href="/">Console</HeaderAction>
        </Header>

        <Main>
          <VerificationPanel aria-labelledby="verification-title">
            <Eyebrow>Ohio Gyatt Compliance Check</Eyebrow>
            <Title id="verification-title">Prove you are Gen Alpha</Title>
            <VerificationCopy>
              Complete the behavioral verification sequence to confirm your
              generational signal profile.
            </VerificationCopy>
            <CaptchaRegion>{children}</CaptchaRegion>
          </VerificationPanel>
        </Main>

        <Footer>
          <FooterGrid>
            {footerGroups.map((group) => (
              <FooterGroup
                key={group.title}
                aria-labelledby={`footer-${group.title}`}
              >
                <FooterHeading id={`footer-${group.title}`}>
                  {group.title}
                </FooterHeading>
                <FooterLinks>
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="/">{link}</a>
                    </li>
                  ))}
                </FooterLinks>
              </FooterGroup>
            ))}
          </FooterGrid>
          <FooterBottom>
            <span>(C) 2026 Ohio Gyatt Compliance Check, Inc.</span>
            <span>Enterprise verification for uncertain timelines.</span>
          </FooterBottom>
        </Footer>
      </Shell>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    color: #1f2933;
    background: #f4f6f8;
    font-family:
      Inter,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  body {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Shell = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  background:
    linear-gradient(#ffffff 0, #ffffff 72px, transparent 72px),
    #f4f6f8;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(190px, 1fr) auto minmax(120px, 1fr);
  align-items: center;
  gap: 24px;
  min-height: 72px;
  border-bottom: 1px solid #d8dde3;
  background: #ffffff;
  padding: 0 40px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr auto;
    gap: 16px;
    min-height: 66px;
    padding: 0 18px;
  }

  @media (max-width: 430px) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
`;

const BrandMark = styled.span`
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid #aab4c0;
  border-radius: 4px;
  background: #243447;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
`;

const BrandName = styled.span`
  display: block;
  color: #17212f;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0;
`;

const BrandSubtitle = styled.span`
  display: block;
  margin-top: 3px;
  color: #66737f;
  font-size: 11px;
  line-height: 1.1;
  letter-spacing: 0;
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  color: #46525f;
  font-size: 13px;
  font-weight: 500;

  a {
    transition: color 160ms ease;
  }

  a:hover {
    color: #17212f;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const HeaderAction = styled.a`
  justify-self: end;
  border: 1px solid #b8c2cc;
  border-radius: 4px;
  background: #ffffff;
  color: #25313f;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  padding: 10px 14px;
  transition:
    border-color 160ms ease,
    background 160ms ease;

  &:hover {
    border-color: #7b8794;
    background: #f8fafc;
  }

  @media (max-width: 430px) {
    display: none;
  }
`;

const Main = styled.main`
  display: grid;
  align-items: center;
  justify-items: center;
  min-height: 0;
  padding: 72px 24px;

  @media (max-width: 760px) {
    padding: 54px 18px;
  }
`;

const VerificationPanel = styled.section`
  display: grid;
  justify-items: center;
  width: min(100%, 680px);
  text-align: center;
`;

const Eyebrow = styled.p`
  margin: 0 0 14px;
  color: #687380;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  color: #15202d;
  font-size: 64px;
  font-weight: 650;
  line-height: 0.98;
  letter-spacing: 0;

  @media (max-width: 760px) {
    font-size: 46px;
  }

  @media (max-width: 430px) {
    font-size: 40px;
  }
`;

const VerificationCopy = styled.p`
  max-width: 560px;
  margin: 22px 0 34px;
  color: #53606d;
  font-size: 16px;
  line-height: 1.55;

  @media (max-width: 760px) {
    margin-bottom: 28px;
    font-size: 15px;
  }
`;

const CaptchaRegion = styled.div`
  width: min(100%, 304px);
`;

const Footer = styled.footer`
  border-top: 1px solid #d8dde3;
  background: #ffffff;
  color: #53606d;
  padding: 30px 40px 24px;

  @media (max-width: 760px) {
    padding: 28px 18px 22px;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;
  max-width: 1120px;
  margin: 0 auto;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 430px) {
    grid-template-columns: 1fr;
  }
`;

const FooterGroup = styled.section``;

const FooterHeading = styled.h2`
  margin: 0 0 12px;
  color: #25313f;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
`;

const FooterLinks = styled.ul`
  display: grid;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    font-size: 12px;
    line-height: 1.25;
    transition: color 160ms ease;
  }

  a:hover {
    color: #17212f;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  max-width: 1120px;
  margin: 28px auto 0;
  border-top: 1px solid #e5e9ee;
  padding-top: 18px;
  color: #75808b;
  font-size: 11px;

  @media (max-width: 760px) {
    display: grid;
  }
`;
