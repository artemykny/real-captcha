import { useMemo, useState } from "react";
import styled from "styled-components";
import type { CaptchaPopupProps, CaptchaResult } from "../types";
import { ChallengePanel } from "./ChallengePanel";

export type ImagePartsSelectionPopupProps = CaptchaPopupProps & {
  promptLabel: string;
  prompt: string;
  promptHint: string;
  imageSrc: string;
  columns?: number;
  rows?: number;
  correctPartIds: string[];
};

export function ImagePartsSelectionPopup({
  promptLabel,
  prompt,
  promptHint,
  imageSrc,
  columns = 3,
  rows = 3,
  correctPartIds,
  onComplete,
  onRefresh,
}: ImagePartsSelectionPopupProps) {
  const [selectedPartIds, setSelectedPartIds] = useState<Set<string>>(
    () => new Set(),
  );

  const parts = useMemo(
    () =>
      Array.from({ length: rows * columns }, (_, index) => {
        const row = Math.floor(index / columns) + 1;
        const column = (index % columns) + 1;

        return {
          id: `r${row}-c${column}`,
          row,
          column,
        };
      }),
    [columns, rows],
  );

  function togglePart(partId: string) {
    setSelectedPartIds((currentPartIds) => {
      const nextPartIds = new Set(currentPartIds);

      if (nextPartIds.has(partId)) {
        nextPartIds.delete(partId);
      } else {
        nextPartIds.add(partId);
      }

      return nextPartIds;
    });
  }

  function submitAnswer() {
    onComplete(scoreResult(hasExactSelection(selectedPartIds, correctPartIds)));
  }

  return (
    <ChallengePanel
      promptLabel={promptLabel}
      prompt={prompt}
      promptHint={promptHint}
      submitDisabled={selectedPartIds.size === 0}
      onSubmit={submitAnswer}
      onRefresh={onRefresh}
    >
      <PartsCanvas $columns={columns} $rows={rows}>
        <img src={imageSrc} alt="" draggable={false} />
        <PartsGrid aria-label={prompt} $columns={columns} $rows={rows}>
          {parts.map((part) => {
            const isSelected = selectedPartIds.has(part.id);

            return (
              <PartButton
                key={part.id}
                type="button"
                aria-label={`Toggle image part row ${part.row}, column ${part.column}`}
                aria-pressed={isSelected}
                $selected={isSelected}
                onClick={() => togglePart(part.id)}
              />
            );
          })}
        </PartsGrid>
      </PartsCanvas>
    </ChallengePanel>
  );
}

function hasExactSelection(
  selectedPartIds: Set<string>,
  correctPartIds: string[],
) {
  if (selectedPartIds.size !== correctPartIds.length) {
    return false;
  }

  return correctPartIds.every((partId) => selectedPartIds.has(partId));
}

function scoreResult(isAccepted: boolean): CaptchaResult {
  return {
    status: isAccepted ? "accepted" : "rejected",
    humanPercentage: isAccepted ? 0.96 : 0.21,
  };
}

const PartsCanvas = styled.div<{ $columns: number; $rows: number }>`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: ${({ $columns, $rows }) => `${$columns} / ${$rows}`};
  overflow: hidden;
  border: 1px solid #dadce0;
  background: #f4f6f8;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
  }
`;

const PartsGrid = styled.div<{ $columns: number; $rows: number }>`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  grid-template-rows: repeat(${({ $rows }) => $rows}, 1fr);
`;

const PartButton = styled.button<{ $selected: boolean }>`
  appearance: none;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.84);
  background: ${({ $selected }) =>
    $selected ? "rgba(74, 144, 226, 0.36)" : "rgba(255, 255, 255, 0)"};
  box-shadow: ${({ $selected }) =>
    $selected ? "inset 0 0 0 3px #4a90e2" : "none"};
  cursor: pointer;
  padding: 0;
  transition: background 120ms ease, box-shadow 120ms ease;

  &::after {
    position: absolute;
    top: 8px;
    right: 8px;
    display: ${({ $selected }) => ($selected ? "grid" : "none")};
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #4a90e2;
    color: #ffffff;
    content: "✓";
    font-size: 15px;
    font-weight: 700;
    line-height: 1;
  }

  &:hover {
    background: ${({ $selected }) =>
      $selected ? "rgba(74, 144, 226, 0.42)" : "rgba(255, 255, 255, 0.14)"};
  }

  &:focus-visible {
    z-index: 1;
    outline: 2px solid #174ea6;
    outline-offset: -2px;
  }
`;
