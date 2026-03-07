import fs from "fs";
import path from "path";
import { PREFECTURES, findPrefecture } from "./prefectures";

export interface Subsidy {
  id: string;
  title: string;
  link: string;
  summary: string;
  source: string;
  fetched_at: string;
  prefecture?: string;
  prefectureSlug?: string;
  municipality?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");

function loadJson(filename: string): Subsidy[] {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

/** タイトルから市区町村名を抽出（【○○市】パターン） */
function extractMunicipality(title: string): string | undefined {
  const match = title.match(/【(.+?)】/);
  return match ? match[1] : undefined;
}

/** 全データを読み込み、都道府県タグを付与 */
export function getAllSubsidies(): Subsidy[] {
  const jnet21 = loadJson("jnet21.json");
  const jgrants = loadJson("jgrants.json");

  const all = [...jnet21, ...jgrants];

  return all.map((item) => {
    const municipality = extractMunicipality(item.title);
    const textToSearch = `${item.title} ${item.summary}`;
    const pref = findPrefecture(textToSearch);

    return {
      ...item,
      prefecture: pref?.name,
      prefectureSlug: pref?.slug,
      municipality,
    };
  });
}

/** 都道府県別に補助金を取得 */
export function getSubsidiesByPrefecture(slug: string): Subsidy[] {
  return getAllSubsidies().filter((s) => s.prefectureSlug === slug);
}

/** IDで補助金を1件取得 */
export function getSubsidyById(id: string): Subsidy | undefined {
  return getAllSubsidies().find((s) => s.id === id);
}

/** 全都道府県ごとの件数を取得 */
export function getPrefectureCounts(): { slug: string; name: string; count: number }[] {
  const all = getAllSubsidies();
  return PREFECTURES.map((p) => ({
    slug: p.slug,
    name: p.name,
    count: all.filter((s) => s.prefectureSlug === p.slug).length,
  }));
}
