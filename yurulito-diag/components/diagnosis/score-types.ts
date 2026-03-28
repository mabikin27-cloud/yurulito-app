export const SCORES = [-1, 0, 1, 2, 3] as const;

export type ScoreValue = (typeof SCORES)[number];

export type ScoreOptionsByValue = Record<ScoreValue, string>;

export type ScoreQuestion = {
  id: string;
  title: string;
  options: ScoreOptionsByValue;
};

