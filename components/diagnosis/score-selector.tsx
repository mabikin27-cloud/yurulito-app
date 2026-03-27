"use client";

import { SCORES, type ScoreOptionsByValue, type ScoreValue } from "./score-types";

type ScoreSelectorProps = {
  index: number;
  title: string;
  options: ScoreOptionsByValue;
  value: ScoreValue | null;
  onChange: (value: ScoreValue) => void;
};

export function ScoreSelector({
  index,
  title,
  options,
  value,
  onChange,
}: ScoreSelectorProps) {
  return (
    <div className="rounded-2xl border border-yurulito-line/80 bg-white/70 px-4 py-4 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md sm:px-5 sm:py-5">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <p className="text-yurulito-muted text-xs font-medium tracking-wide">
          Q{index}
        </p>
        <p className="text-yurulito-ink text-sm leading-relaxed font-medium tracking-wide">
          {title}
        </p>
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label={`${title}のスコア`}
      >
        {SCORES.map((score) => {
          const selected = value === score;
          return (
            <button
              key={score}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(score)}
              className={[
                "min-h-12 min-w-[7.1rem] rounded-full px-3 py-2 text-sm font-medium transition-all",
                "focus-visible:ring-yurulito-accent/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                selected
                  ? "bg-yurulito-accent text-white shadow-md"
                  : "bg-yurulito-cream text-yurulito-ink/85 border-yurulito-line/90 hover:bg-yurulito-blush/80 border",
              ].join(" ")}
            >
              <div className="flex flex-col items-center justify-center leading-tight">
                <span className="text-[11px] font-semibold text-center">
                  {options[score]}
                </span>
                <span
                  className={[
                    "mt-1 text-[10px] font-medium",
                    selected ? "text-white/90" : "text-yurulito-muted",
                  ].join(" ")}
                >
                  ({score})
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
