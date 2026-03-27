import type { ScoreQuestion } from "./score-types";

/**
 * 腸もみサロン Yurulito の診断項目（配点仕様：-1, 0, 1, 2, 3）。
 * 表示は各スコアの説明文、合計は選択した数値の合算です。
 */

export const THERAPIST_QUESTIONS: ScoreQuestion[] = [
  {
    id: "therapist-hard-part",
    title: "硬い部分",
    options: {
      [-1]: "なし",
      0: "大腸左のみ",
      1: "大腸左右のみ",
      2: "小腸",
      3: "全体",
    },
  },
  {
    id: "therapist-hardness-degree",
    title: "硬さの程度",
    options: {
      [-1]: "第2関節まで",
      0: "第1関節で違和感なし",
      1: "違和感あり/ 弾力あり",
      2: "第1関節入らない",
      3: "痛みあり",
    },
  },
  {
    id: "therapist-coldness",
    title: "冷え",
    options: {
      [-1]: "なし",
      0: "温かい/左右どちらか",
      1: "胃",
      2: "胃・おへそ・下腹部",
      3: "全身",
    },
  },
  {
    id: "therapist-intestinal-position",
    title: "腸の位置",
    options: {
      [-1]: "正しい位置",
      0: "縦長のおへそ",
      1: "1〜2本下垂",
      2: "手のひら半分下垂",
      3: "手のひら1つ分下垂",
    },
  },
  {
    id: "therapist-swelling",
    title: "むくみ",
    options: {
      [-1]: "腹筋ラインあり",
      0: "跡がつかない",
      1: "跡がすぐ消える",
      2: "跡が3秒残る",
      3: "跡が5秒残る",
    },
  },
  {
    id: "therapist-gas",
    title: "ガスの有無",
    options: {
      [-1]: "なし",
      0: "なし",
      1: "部分的",
      2: "半分以上",
      3: "全体",
    },
  },
  {
    id: "therapist-thickening",
    title: "つまり部分",
    options: {
      [-1]: "なし",
      0: "大腸左のみ",
      1: "大腸左右のみ",
      2: "小腸",
      3: "全体",
    },
  },
  {
    id: "therapist-ribs-breath",
    title: "肋骨・呼吸",
    options: {
      [-1]: "深い/柔らかい",
      0: "正常",
      1: "しなる/腹式or胸式のみ",
      2: "浅い/硬い",
      3: "吸えない/動かない",
    },
  },
];

export const LIFESTYLE_QUESTIONS: ScoreQuestion[] = [
  {
    id: "lifestyle-defecation-frequency",
    title: "お通じの頻度",
    options: {
      [-1]: "1日2-3回",
      0: "1日1回",
      1: "1-2日に1回",
      2: "2-5日に1回",
      3: "週1回",
    },
  },
  {
    id: "lifestyle-stool-shape",
    title: "便の硬さ・形状",
    options: {
      [-1]: "水に浮くバナナ状",
      0: "普通のバナナ状",
      1: "柔らかめ/軟便",
      2: "硬い/泥状",
      3: "水状/コロコロ",
    },
  },
  {
    id: "lifestyle-stool-amount",
    title: "1日の排泄量",
    options: {
      [-1]: "バナナ2-3本分",
      0: "バナナ1本分",
      1: "モンキーバナナ程度",
      2: "親指サイズ",
      3: "ほとんど出ない/極少量",
    },
  },
  {
    id: "lifestyle-stool-color",
    title: "便の色",
    options: {
      [-1]: "黄土色",
      0: "茶色",
      1: "濃い茶色",
      2: "黒",
      3: "真っ黒・血便",
    },
  },
  {
    id: "lifestyle-assist",
    title: "補助（薬等）の有無",
    options: {
      [-1]: "なし",
      0: "補助食品",
      1: "下剤",
      2: "刺激性の茶/食品",
      3: "強い下痢薬/浣腸",
    },
  },
  {
    id: "lifestyle-meal-time",
    title: "食事の時間",
    options: {
      [-1]: "3食規則的",
      0: "2食程度",
      1: "不規則（22時以降なし）",
      2: "不規則（22時以降なし/内容偏り）",
      3: "22時以降に食事/不規則",
    },
  },
  {
    id: "lifestyle-snacks",
    title: "間食の習慣",
    options: {
      [-1]: "なし",
      0: "フルーツ/生もの",
      1: "ナッツ/ドライフルーツ",
      2: "スナック菓子/加工品",
      3: "菓子パン/甘いもの毎日",
    },
  },
  {
    id: "lifestyle-exercise",
    title: "運動習慣",
    options: {
      [-1]: "毎日30分以上/腸揉み",
      0: "週3-4回",
      1: "週1-2回",
      2: "月1-2回",
      3: "なし",
    },
  },
  {
    id: "lifestyle-water",
    title: "水分摂取量",
    options: {
      [-1]: "2L常温",
      0: "1.5L常温",
      1: "1L常温",
      2: "1L常温+冷",
      3: "500ml程度",
    },
  },
];
