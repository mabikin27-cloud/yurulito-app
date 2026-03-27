import { NextResponse } from "next/server";

type DiagnoseRequestBody = {
  real_age: number;
  therapist_total: number;
  lifestyle_total: number;
};

function pickDifyResult(data: unknown): string {
  const dify = data as {
    data?: {
      outputs?: {
        result?: unknown;
        text?: unknown;
        answer?: unknown;
      };
    };
    output?: unknown;
    result?: unknown;
  };

  const candidate =
    dify?.data?.outputs?.result ??
    dify?.data?.outputs?.text ??
    dify?.data?.outputs?.answer ??
    dify?.output ??
    dify?.result;

  if (typeof candidate === "string") return candidate;
  if (candidate === undefined || candidate === null) return "";
  return JSON.stringify(candidate);
}

export async function POST(req: Request) {
  const raw = await req.json().catch(() => null);
  if (!raw) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const body = raw as Partial<DiagnoseRequestBody>;
  const realAge = body.real_age;
  const therapistTotal = body.therapist_total;
  const lifestyleTotal = body.lifestyle_total;

  if (
    typeof realAge !== "number" ||
    typeof therapistTotal !== "number" ||
    typeof lifestyleTotal !== "number" ||
    !Number.isFinite(realAge) ||
    !Number.isFinite(therapistTotal) ||
    !Number.isFinite(lifestyleTotal)
  ) {
    return NextResponse.json(
      {
        error:
          "`real_age`, `therapist_total`, `lifestyle_total` must be numbers.",
      },
      { status: 400 },
    );
  }

  const difyApiKey = process.env.DIFY_API_KEY;
  const difyWorkflowId = process.env.DIFY_WORKFLOW_ID;
  const difyRunUrl =
    process.env.DIFY_WORKFLOW_RUN_URL?.trim() ||
    "https://api.dify.ai/v1/workflows/run";

  if (!difyApiKey) {
    return NextResponse.json(
      {
        error: "DIFY_API_KEY is required in environment variables.",
      },
      { status: 500 },
    );
  }

  const payload: Record<string, unknown> = {
    // Dify Workflows 実行時に必須のため、最低限のユーザー識別子を送る
    // （実ユーザーIDを使うなら DIFY_USER を設定してください）
    user: process.env.DIFY_USER?.trim() || "guest",
    inputs: {
      real_age: realAge,
      therapist_total: therapistTotal,
      lifestyle_total: lifestyleTotal,
    },
    response_mode: "blocking",
  };

  // Dify Workflows の実行は、通常 `workflow_id` が必要です。
  // ただし、利用環境によってはエンドポイント側で workflow が決まる場合もあるため、
  // `DIFY_WORKFLOW_ID` が設定されている時だけ送信します。
  if (difyWorkflowId) {
    payload.workflow_id = difyWorkflowId;
  }

  const difyRes = await fetch(difyRunUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${difyApiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const difyJson = await difyRes.json().catch(() => null);
  if (!difyRes.ok) {
    return NextResponse.json(
      {
        error:
          difyJson?.message ??
          difyJson?.error ??
          `Dify request failed with status ${difyRes.status}.`,
      },
      { status: difyRes.status },
    );
  }

  const result = pickDifyResult(difyJson) || "診断結果を取得できませんでした。";
  return NextResponse.json({ result });
}

