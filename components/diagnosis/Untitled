import { ScoreValue } from "./score-types";

export type Question = {
  id: string;
  title: string;
  options: { label: string; value: ScoreValue }[];
};

/**
 * 腸もみサロン Yurulito の診断項目
 * 配点仕様：-1, 0, 1, 2, 3
 */

export const THERAPIST_QUESTIONS: Question[] = [
  {
    id: "therapist-hard-part",
    title: "硬い部分",
    options: [
      { label: "なし", value: -1 },
      { label: "大腸左のみ", value: 0 },
      { label: "大腸左右のみ", value: 1 },
      { label: "小腸", value: 2 },
      { label: "全体", value: 3 },
    ],
  },
  {
    id: "therapist-hardness-degree",
    title: "硬さの程度",
    options: [
      { label: "第2関節まで", value: -1 },
      { label: "第1関節で違和感なし", value: 0 },
      { label: "違和感あり/ 弾力あり", value: 1 },
      { label: "第1関節入らない", value: 2 },
      { label: "痛みあり", value: 3 },
    ],
  },
  {
    id: "therapist-coldness",
    title: "冷え",
    options: [
      { label: "なし", value: -1 },
      { label: "温かい/左右どちらか", value: 0 },
      { label: "胃", value: 1 },
      { label: "胃・おへそ・下腹部", value: 2 },
      { label: "全身", value: 3 },
    ],
  },
  {
    id: "therapist-intestinal-position",
    title: "腸の位置",
    options: [
      { label: "正しい位置", value: -1 },
      { label: "縦長のおへそ", value: 0 },
      { label: "1〜2本下垂", value: 1 },
      { label: "手のひら半分下垂", value: 2 },
      { label: "手のひら1つ分下垂", value: 3 },
    ],
  },
  {
    id: "therapist-swelling",
    title: "むくみ",
    options: [
      { label: "腹筋ラインあり", value: -1 },
      { label: "跡がつかない", value: 0 },
      { label: "跡がすぐ消える", value: 1 },
      { label: "跡が3秒残る", value: 2 },
      { label: "跡が5秒残る", value: 3 },
    ],
  },
  {
    id: "therapist-gas",
    title: "ガスの有無",
    options: [
      { label: "なし (-1)", value: -1 },
      { label: "なし (0)", value: 0 },
      { label: "部分的", value: 1 },
      { label: "半分以上", value: 2 },
      { label: "全体", value: 3 },
    ],
  },
  {
    id: "therapist-thickening",
    title: "つまり部分",
    options: [
      { label: "なし", value: -1 },
      { label: "大腸左のみ", value: 0 },
      { label: "大腸左右のみ", value: 1 },
      { label: "小腸", value: 2 },
      { label: "全体", value: 3 },
    ],
  },
  {
    id: "therapist-ribs-breath",
    title: "肋骨・呼吸",
    options: [
      { label: "深い/柔らかい", value: -1 },
      { label: "正常", value: 0 },
      { label: "しなる/腹式or胸式のみ", value: 1 },
      { label: "浅い/硬い", value: 2 },
      { label: "吸えない/動かない", value: 3 },
    ],
  },
];

export const LIFESTYLE_QUESTIONS: Question[] = [
  {
    id: "lifestyle-defecation-frequency",
    title: "お通じの頻度",
    options: [
      { label: "1日2-3回", value: -1 },
      { label: "1日1回", value: 0 },
      { label: "1-2日に1回", value: 1 },
      { label: "2-5日に1回", value: 2 },
      { label: "週1回", value: 3 },
    ],
  },
  {
    id: "lifestyle-stool-shape",
    title: "便の硬さ・形状",
    options: [
      { label: "水に浮くバナナ状", value: -1 },
      { label: "普通のバナナ状", value: 0 },
      { label: "柔らかめ/軟便", value: 1 },
      { label: "硬い/泥状", value: 2 },
      { label: "水状/コロコロ", value: 3 },
    ],
  },
  {
    id: "lifestyle-stool-amount",
    title: "1日の排泄量",
    options: [
      { label: "バナナ2-3本分", value: -1 },
      { label: "バナナ1本分", value: 0 },
      { label: "モンキーバナナ程度", value: 1 },
      { label: "親指サイズ", value: 2 },
      { label: "ほとんど出ない/極少量", value: 3 },
    ],
  },
  {
    id: "lifestyle-stool-color",
    title: "便の色",
    options: [
      { label: "黄土色", value: -1 },
      { label: "茶色", value: 0 },
      { label: "濃い茶色", value: 1 },
      { label: "黒", value: 2 },
      { label: "真っ黒・血便", value: 3 },
    ],
  },
  {
    id: "lifestyle-assist",
    title: "補助（薬等）の有無",
    options: [
      { label: "なし", value: -1 },
      { label: "補助食品", value: 0 },
      { label: "下剤", value: 1 },
      { label: "刺激性の茶/食品", value: 2 },
      { label: "強い下痢薬/浣腸", value: 3 },
    ],
  },
  {
    id: "lifestyle-meal-time",
    title: "食事の時間",
    options: [
      { label: "3食規則的", value: -1 },
      { label: "2食程度", value: 0 },
      { label: "不規則（22時以降なし）", value: 1 },
      { label: "不規則（22時以降なし/内容偏り）", value: 2 },
      { label: "22時以降に食事/不規則", value: 3 },
    ],
  },
  {
    id: "lifestyle-snacks",
    title: "間食の習慣",
    options: [
      { label: "なし", value: -1 },
      { label: "フルーツ/生もの", value: 0 },
      { label: "ナッツ/ドライフルーツ", value: 1 },
      { label: "スナック菓子/加工品", value: 2 },
      { label: "菓子パン/甘いもの毎日", value: 3 },
    ],
  },
  {
    id: "lifestyle-exercise",
    title: "運動習慣",
    options: [
      { label: "毎日30分以上/腸揉み", value: -1 },
      { label: "週3-4回", value: 0 },
      { label: "週1-2回", value: 1 },
      { label: "月1-2回", value: 2 },
      { label: "なし", value: 3 },
    ],
  },
  {
    id: "lifestyle-water",
    title: "水分摂取量",
    options: [
      { label: "2L常温", value: -1 },
      { label: "1.5L常温", value: 0 },
      { label: "1L常温", value: 1 },
      { label: "1L常温+冷", value: 2 },
      { label: "500ml程度", value: 3 },
    ],
  },
];