import Link from "next/link";
import { getPrefectureCounts } from "@/lib/subsidies";
import { PREFECTURES } from "@/lib/prefectures";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "都道府県別 補助金・助成金一覧 | 補助金検索ラボ",
  description: "全国47都道府県の補助金・助成金を一覧で検索。お住まいの地域で使える制度を探せます。",
};

export default function PrefecturesPage() {
  const counts = getPrefectureCounts();
  const regions = [...new Set(PREFECTURES.map((p) => p.region))];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">都道府県別 補助金・助成金一覧</h1>
      <p className="text-gray-600 mb-8">
        お住まいの地域や事業所の所在地から、利用できる補助金・助成金を探せます。
      </p>

      {regions.map((region) => {
        const prefs = PREFECTURES.filter((p) => p.region === region);
        return (
          <section key={region} className="mb-8">
            <h2 className="text-lg font-bold mb-3 text-gray-700">{region}</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {prefs.map((p) => {
                const count = counts.find((c) => c.slug === p.slug)?.count ?? 0;
                return (
                  <Link
                    key={p.slug}
                    href={`/prefectures/${p.slug}`}
                    className="bg-white rounded border px-3 py-3 text-sm text-center hover:border-blue-300 hover:bg-blue-50 transition"
                  >
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{count}件</div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
