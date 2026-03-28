"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LIFESTYLE_QUESTIONS, THERAPIST_QUESTIONS } from "./questions";
import { ScoreSelector } from "./score-selector";
import { type ScoreValue } from "./score-types";

// セクション見出し用コンポーネント
function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-6 text-center sm:mb-8">
      <p className="text-yurulito-accent mb-2 text-xs font-medium tracking-[0.2em] uppercase">{eyebrow}</p>
      <h2 className="text-yurulito-ink font-display text-xl font-medium tracking-wide sm:text-2xl">{title}</h2>
      <p className="text-yurulito-muted mx-auto mt-2 max-w-md text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export function DiagnosisForm() {
  const router = useRouter();
  const [realAge, setRealAge] = useState<string>("");
  
  // スコア管理用の状態
  const [therapistScores, setTherapistScores] = useState<(ScoreValue | null)[]>(
    Array(THERAPIST_QUESTIONS.length).fill(null)
  );
  const [lifestyleScores, setLifestyleScores] = useState<(ScoreValue | null)[]>(
    Array(LIFESTYLE_QUESTIONS.length).fill(null)
  );
  
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // スコア更新処理
  const handleTherapistChange = (index: number, value: ScoreValue) => {
    const newScores = [...therapistScores];
    newScores[index] = value;
    setTherapistScores(newScores);
  };

  const handleLifestyleChange = (index: number, value: ScoreValue) => {
    const newScores = [...lifestyleScores];
    newScores[index] = value;
    setLifestyleScores(newScores);
  };

  // 合計点計算（TypeScriptのエラーを回避するため型を明示）
  const therapistTotal = useMemo(() => {
    if (therapistScores.some(s => s === null)) return null;
    return therapistScores.reduce((sum: number, s) => sum + (s as number), 0);
  }, [therapistScores]);

  const lifestyleTotal = useMemo(() => {
    if (lifestyleScores.some(s => s === null)) return null;
    return lifestyleScores.reduce((sum: number, s) => sum + (s as number), 0);
  }, [lifestyleScores]);

  const parsedRealAge = useMemo(() => {
    const n = Number(realAge);
    return (!realAge || isNaN(n)) ? null : n;
  }, [realAge]);

  const canSubmit = parsedRealAge !== null && therapistTotal !== null && lifestyleScores.every(s => s !== null);

  const onSubmit = async () => {
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);
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
      const json = await res.json();
      setResult(json.result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
      <div className="border-yurulito-line/70 bg-yurulito-surface/90 rounded-3xl border p-6 shadow-xl backdrop-blur-md sm:p-8">
        
        {/* STEP 0: 実年齢 & セラピストチェック（一括表示） */}
        {currentStep === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center">
              <label className="text-yurulito-ink mb-2 block text-sm font-medium">実年齢を入力してください</label>
              <div className="flex justify-center items-center gap-2">
                <input
                  type="number"
                  value={realAge}
                  onChange={(e) => setRealAge(e.target.value)}
                  className="w-24 rounded-xl border-2 border-yurulito-line/30 bg-white p-2 text-center text-lg font-bold outline-none focus:border-yurulito-accent"
                  placeholder="30"
                />
                <span className="text-yurulito-ink font-medium">歳</span>
              </div>
            </div>

            <SectionHeading 
              eyebrow="Therapist Check" 
              title="セラピスト診断" 
              description="お腹の触診結果をすべて入力してください" 
            />
            
            <div className="flex flex-col gap-4 mb-10">
              {THERAPIST_QUESTIONS.map((q, i) => (
                <ScoreSelector 
                  key={q.id} 
                  index={i + 1} 
                  title={q.title} 
                  options={q.options} 
                  value={therapistScores[i]} 
                  onChange={(v) => handleTherapistChange(i, v)} 
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentStep(1)}
              disabled={parsedRealAge === null || therapistTotal === null}
              className="w-full rounded-full bg-yurulito-accent py-4 text-white font-bold text-lg shadow-lg transition-all hover:bg-yurulito-accent/90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              生活習慣チェックへ進む
            </button>
          </div>
        )}

        {/* STEP 1〜: 生活習慣チェック（1問1答） */}
        {currentStep > 0 && currentStep <= LIFESTYLE_QUESTIONS.length && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <div className="mb-6 flex items-center justify-between text-xs text-yurulito-muted font-bold tracking-widest uppercase">
              <span>Lifestyle Check</span>
              <span>{currentStep} / {LIFESTYLE_QUESTIONS.length}</span>
            </div>
            
            <h3 className="text-yurulito-ink text-xl font-medium mb-10 min-h-[3rem] flex items-center justify-center">
              {LIFESTYLE_QUESTIONS[currentStep - 1].title}
            </h3>
            
            <div className="grid gap-3 sm:px-4">
              {LIFESTYLE_QUESTIONS[currentStep - 1].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    handleLifestyleChange(currentStep - 1, opt.value as ScoreValue);
                    // 少し遅延させて次の質問へ（UX向上）
                    setTimeout(() => setCurrentStep(prev => prev + 1), 250);
                  }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    lifestyleScores[currentStep - 1] === opt.value 
                      ? "bg-yurulito-accent text-white border-yurulito-accent shadow-md" 
                      : "bg-white border-yurulito-line/30 text-yurulito-ink hover:border-yurulito-accent/40"
                  }`}
                >
                  <span className="text-base font-medium">{opt.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="mt-10 text-yurulito-muted text-sm hover:underline"
            >
              ← 前の質問に戻る
            </button>
          </div>
        )}

        {/* 送信確認セクション */}
        {currentStep > LIFESTYLE_QUESTIONS.length && !result && (
          <div className="text-center py-12 animate-in zoom-in-95 duration-500">
            <div className="mb-8 flex justify-center text-yurulito-accent">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-yurulito-ink text-2xl font-medium mb-4">すべての回答が完了しました</h3>
            <p className="text-yurulito-muted text-sm mb-10">AIが今のあなたの腸の状態を詳しく解析します。</p>
            
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="w-full rounded-full bg-yurulito-accent py-5 text-xl text-white font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  解析中...
                </span>
              ) : "診断結果を表示する"}
            </button>
          </div>
        )}

        {/* 診断結果表示 */}
        {result && (
          <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="rounded-3xl bg-white/90 p-8 shadow-sm border-2 border-yurulito-accent/10">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-6 bg-yurulito-accent rounded-full" />
                <h3 className="text-yurulito-ink text-lg font-bold">診断レポート</h3>
              </div>
              <div className="whitespace-pre-wrap text-yurulito-ink leading-relaxed text-[15px]">
                {result}
              </div>
            </div>
            <button
               onClick={() => router.push("/")}
               className="mt-8 w-full rounded-full border-2 border-yurulito-accent/30 py-4 text-yurulito-accent font-bold hover:bg-yurulito-accent/5 transition-colors"
            >
              トップ画面へ戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}