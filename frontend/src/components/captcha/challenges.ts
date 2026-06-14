import type { Challenge } from "./types";

export const challenges: Challenge[] = [
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

export function getNextChallengeIndex(currentIndex: number) {
  return (currentIndex + 1) % challenges.length;
}
