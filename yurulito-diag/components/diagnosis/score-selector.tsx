"use client";

import { type ScoreValue } from "./score-types";

// 受け取るデータの形（Props）の定義を、新しい配列形式に合わせて修正
type ScoreSelectorProps = {
  index: number;
  title: string;
  options: { label: string; value: ScoreValue }[]; // ここを配列形式に変更
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
        {/* options という配列をそのまま map で回すように変更 */}
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={[
                "min-h-12 min-w-[7.1rem] rounded-xl px-3 py-2 text-sm font-medium transition-all",
                "focus-visible:ring-yurulito-accent/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                selected
                  ? "bg-yurulito-accent text-white shadow-md"
                  : "bg-yurulito-cream text-yurulito-ink/85 border-yurulito-line/90 hover:bg-yurulito-blush/80 border",
              ].join(" ")}
            >
              <div className="flex flex-col items-center justify-center leading-tight">
                {/* option.label を表示 */}
                <span className="text-[11px] font-semibold text-center">
                  {option.label}
                </span>
                <span
                  className={[
                    "mt-1 text-[10px] font-medium",
                    selected ? "text-white/90" : "text-yurulito-muted",
                  ].join(" ")}
                >
                  ({option.value})
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}