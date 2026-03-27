"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LIFESTYLE_QUESTIONS, THERAPIST_QUESTIONS } from "./questions";
import { ScoreSelector } from "./score-selector";
import { type ScoreValue } from "./score-types";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 text-center sm:mb-8">
      <p className="text-yurulito-accent mb-2 text-xs font-medium tracking-[0.2em] uppercase">
        {eyebrow}
      </p>
      <h2 className="text-yurulito-ink font-display text-xl font-medium tracking-wide sm:text-2xl">
        {title}
      </h2>
      <p className="text-yurulito-muted mx-auto mt-2 max-w-md text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function useScoreList(length: number) {
  const [scores, setScores] = useState<(ScoreValue | null)[]>(() =>
    Array.from({ length }, () => null),
  );

  const setAt = (i: number, v: ScoreValue) => {
    setScores((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };

  return { scores, setAt };
}

export function DiagnosisForm() {
  const router = useRouter();
  const [realAge, setRealAge] = useState<string>("");
  const therapist = useScoreList(THERAPIST_QUESTIONS.length);
  const lifestyle = useScoreList(LIFESTYLE_QUESTIONS.length);
  const [result, setResult] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const therapistTotal = useMemo(
    () =>
      therapist.scores.every((s) => s !== null)
        ? therapist.scores.reduce<number>(
            (sum, s) => sum + (s as ScoreValue),
            0,
          )
        : null,
    [therapist.scores],
  );

  const lifestyleTotal = useMemo(
    () =>
      lifestyle.scores.every((s) => s !== null)
        ? lifestyle.scores.reduce<number>(
            (sum, s) => sum + (s as ScoreValue),
            0,
          )
        : null,
    [lifestyle.scores],
  );

  const parsedRealAge = useMemo(() => {
    const n = Number(realAge);
    if (!realAge || !Number.isFinite(n)) return null;
    return n;
  }, [realAge]);

  const canSubmit =
    parsedRealAge !== null &&
    therapistTotal !== null &&
    lifestyleTotal !== null;

  const onSubmit = async () => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setResult(null);

    try {
      const res = await fetch("/api/diagnosis/dify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          real_age: parsedRealAge,
          therapist_total: therapistTotal,
          lifestyle_total: lifestyleTotal,
        }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.error ?? "診断の依頼に失敗しました。");
      }

      const nextResult = String(json?.result ?? "");
      setResult(nextResult);

      try {
        sessionStorage.setItem(
          "yurulito:diagnosis-result",
          JSON.stringify({
            real_age: parsedRealAge!,
            therapist_total: therapistTotal!,
            lifestyle_total: lifestyleTotal!,
            result: nextResult,
          }),
        );
      } catch {
        // ignore
      }
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "エラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="bg-yurulito-blush/35 absolute -top-24 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-full blur-3xl" />
      </div>

      <header className="mb-10 text-center sm:mb-12">
        <p className="text-yurulito-accent mb-3 text-xs font-medium tracking-[0.35em]">
          YURULITO
        </p>
        <h1 className="text-yurulito-ink font-display text-2xl font-medium tracking-wide sm:text-3xl">
          腸の状態チェック
        </h1>
        <p className="text-yurulito-muted mx-auto mt-3 max-w-md text-sm leading-relaxed">
          ゆったりとした時間の中で、いまのからだの声を聴いてみましょう。
          <br className="hidden sm:block" />
          各項目は −1 〜 3 のボタンからお選びください。
        </p>
      </header>

      <div className="border-yurulito-line/70 bg-yurulito-surface/90 rounded-3xl border p-6 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_18px_48px_-12px_rgba(92,78,68,0.12)] backdrop-blur-md sm:p-8">
        <section className="mb-12">
          <label
            htmlFor="real-age"
            className="text-yurulito-ink mb-2 block text-center text-sm font-medium tracking-wide"
          >
            実年齢
          </label>
          <div className="mx-auto flex max-w-xs flex-col items-center gap-2">
            <div className="border-yurulito-line focus-within:border-yurulito-accent/50 focus-within:ring-yurulito-accent/25 flex w-full items-center gap-2 rounded-2xl border bg-white/90 px-4 py-3 shadow-inner transition focus-within:ring-2">
              <input
                id="real-age"
                name="real_age"
                type="number"
                inputMode="numeric"
                min={0}
                max={120}
                placeholder="例：35"
                value={realAge}
                onChange={(e) => setRealAge(e.target.value)}
                className="text-yurulito-ink placeholder:text-yurulito-muted/60 min-w-0 flex-1 bg-transparent text-center text-lg font-medium outline-none"
              />
              <span className="text-yurulito-muted text-sm">歳</span>
            </div>
            <p className="text-yurulito-muted text-xs">
              半角数字でご入力ください
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Therapist check"
            title="セラピストチェック"
            description="施術やカウンセリングで感じた、いまの腸とからだのサインです。"
          />
          <div className="flex flex-col gap-3 sm:gap-4">
            {THERAPIST_QUESTIONS.map((q, i) => (
              <ScoreSelector
                key={q.id}
                index={i + 1}
                title={q.title}
                options={q.options}
                value={therapist.scores[i]}
                onChange={(v) => therapist.setAt(i, v)}
              />
            ))}
          </div>
          <p className="text-yurulito-muted mt-4 text-center text-xs">
            小計（参考）:{" "}
            <span className="text-yurulito-ink font-medium tabular-nums">
              {therapistTotal !== null ? therapistTotal : "—"}
            </span>
          </p>
        </section>

        <section>
          <SectionHeading
            eyebrow="Lifestyle check"
            title="生活チェック"
            description="日々のくらしの中で、腸を支える習慣のイメージです。"
          />
          <div className="flex flex-col gap-3 sm:gap-4">
            {LIFESTYLE_QUESTIONS.map((q, i) => (
              <ScoreSelector
                key={q.id}
                index={i + 1}
                title={q.title}
                options={q.options}
                value={lifestyle.scores[i]}
                onChange={(v) => lifestyle.setAt(i, v)}
              />
            ))}
          </div>
          <p className="text-yurulito-muted mt-4 text-center text-xs">
            小計（参考）:{" "}
            <span className="text-yurulito-ink font-medium tabular-nums">
              {lifestyleTotal !== null ? lifestyleTotal : "—"}
            </span>
          </p>
        </section>

        <div className="border-yurulito-line/60 mt-10 border-t pt-8">
          <p className="text-yurulito-muted text-center text-xs leading-relaxed">
            診断後、結果ページへ移動できます。
            <br />
            入力内容はこの画面内でのみ保持されます。
          </p>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit || isSubmitting}
            className={[
              "w-full rounded-3xl px-5 py-4 text-base font-semibold transition-colors",
              "focus-visible:ring-yurulito-accent/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
              canSubmit && !isSubmitting
                ? "bg-yurulito-accent text-white hover:bg-yurulito-accent-soft"
                : "bg-yurulito-blush/60 text-yurulito-ink/60 cursor-not-allowed",
            ].join(" ")}
          >
            {isSubmitting ? "診断中..." : "診断する"}
          </button>

          {submitError ? (
            <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          ) : null}

          {result ? (
            <div className="mt-5 rounded-3xl border border-yurulito-line/80 bg-white/70 px-5 py-5 shadow-sm backdrop-blur-sm">
              <p className="text-yurulito-accent text-xs font-semibold tracking-[0.25em] uppercase">
                Diagnosis
              </p>
              <h3 className="mt-2 text-yurulito-ink text-lg font-semibold">
                診断結果
              </h3>
              <div className="mt-3 whitespace-pre-wrap text-yurulito-ink/90 text-sm leading-relaxed">
                {result}
              </div>
            </div>
          ) : null}

          {result ? (
            <button
              type="button"
              onClick={() => router.push("/diagnosis/result")}
              className="mt-4 w-full rounded-3xl bg-yurulito-accent px-5 py-4 text-base font-semibold text-white hover:bg-yurulito-accent-soft"
            >
              診断結果ページへ
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
