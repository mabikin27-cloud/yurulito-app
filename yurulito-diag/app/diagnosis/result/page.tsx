"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type StoredDiagnosisResult = {
  real_age: number;
  therapist_total: number;
  lifestyle_total: number;
  result: string;
};

const STORAGE_KEY = "yurulito:diagnosis-result";

export default function DiagnosisResultPage() {
  const router = useRouter();
  const [stored] = useState<StoredDiagnosisResult | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as StoredDiagnosisResult;
    } catch {
      return null;
    }
  });

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <p className="text-yurulito-accent mb-3 text-xs font-medium tracking-[0.35em]">
          YURULITO
        </p>
        <h1 className="text-yurulito-ink font-display text-2xl font-medium tracking-wide sm:text-3xl">
          診断結果
        </h1>
      </div>

      {stored ? (
        <div className="mt-8 rounded-3xl border-yurulito-line/80 border bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-2 text-yurulito-muted text-sm">
            <p>
              実年齢: <span className="text-yurulito-ink font-semibold">{stored.real_age}歳</span>
            </p>
            <p>
              therapist_total:{" "}
              <span className="text-yurulito-ink font-semibold">
                {stored.therapist_total}
              </span>
            </p>
            <p>
              lifestyle_total:{" "}
              <span className="text-yurulito-ink font-semibold">
                {stored.lifestyle_total}
              </span>
            </p>
          </div>

          <div className="mt-6 rounded-3xl border border-yurulito-line/70 bg-yurulito-surface/90 p-5">
            <p className="text-yurulito-accent text-xs font-semibold tracking-[0.25em] uppercase">
              Diagnosis
            </p>
            <div className="mt-2 whitespace-pre-wrap text-yurulito-ink/90 text-sm leading-relaxed">
              {stored.result}
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-6 w-full rounded-3xl bg-yurulito-blush/60 px-5 py-4 text-base font-semibold text-yurulito-ink hover:bg-yurulito-blush/80"
          >
            入力に戻る
          </button>
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border-yurulito-line/80 border bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <p className="text-yurulito-ink font-semibold">結果が見つかりませんでした。</p>
          <p className="mt-2 text-yurulito-muted text-sm leading-relaxed">
            先にトップページで診断を実行してください。
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-6 w-full rounded-3xl bg-yurulito-accent px-5 py-4 text-base font-semibold text-white hover:bg-yurulito-accent-soft"
          >
            トップへ戻る
          </button>
        </div>
      )}
    </div>
  );
}

