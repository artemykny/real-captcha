# Real CAPTCHA Frontend

High-level frontend plan for the meme "captcha" project.

## Concept

Real CAPTCHA looks like a serious verification widget, but the challenges test tiny human experiences: social anxiety, broken productivity rituals, household mysteries, and emotionally suspicious UI patterns.

The app should feel official at first glance, then become increasingly unserious as the user reads the questions.

## Views

### 1. Verification View

The main screen and default landing state. This is the Challenge View.

This view shows one CAPTCHA-style challenge at a time:

- Product title: Real CAPTCHA
- Small system-style status text, such as "Human verification required"
- One question or micro-task prompt
- Challenge type, such as poll, multiple choice, slider, draggable microinteraction, or tiny button task
- Multiple answer options, draggable items, sliders, or tiny interaction controls, depending on the challenge
- Primary action: Verify
- Secondary action: New challenge

The experience should be compact, like an embedded verification card, not a full quiz page.

### 2. Challenge Result View

Shown after the user submits an answer.

This view gives an immediate fake-verification result:

- Human confidence percentage
- Short verdict, such as "Probably human, definitely tired"
- A small explanation of why the answer feels human
- Button to try another challenge

The result should be funny but not long. It should feel like a machine confidently misunderstanding humanity.

### 3. Challenge List View

A simple way to browse all available challenges.

This view helps the project feel like a collection of meme prompts:

- List of poll-style question challenges
- List of interactive micro-task challenges
- Challenge type labels
- Optional category labels, if the list grows
- Ability to start a challenge from a selected prompt

This can be a secondary view behind a small "All challenges" button, or a sidebar on wider screens.

## First Version Scope

The first useful version should include:

- Challenge View
- Challenge Result View
- Challenge List View
- A small built-in list of question prompts
- A small built-in list of interactive micro-tasks
- Fake success and distribution data for each challenge
- Random challenge button or "next challenge" action
- Responsive layout for desktop and mobile

There is no generator flow in the product. Challenges are curated.
