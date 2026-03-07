import Link from "next/link";
import { getAllSubsidies } from "@/lib/subsidies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "締切間近の補助金・助成金 | 補助金検索ラボ",
  description: "もうすぐ締め切りの補助金・助成金を一覧表示。申請忘れを防ぎましょう。",
};

export default function ClosingSoonPage() {
  const all = getAllSubsidies();
  // summaryに「令和」「申請期限」「締切」を含むものを優先表示
  const withDeadline = all.filter(
    (s) => /期限|締切|締め切り|令和\d+年\d+月/.test(s.summary)
  );
  const display = withDeadline.length > 0 ? withDeadline : all.slice(0, 20);

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">ホーム</Link>
        {" > "}
        <span>締切間近</span>
      </nav>

      <h1 className="text-2xl font-bold mb-2">締切間近の補助金・助成金</h1>
      <p className="text-gray-600 mb-6">
        申請期限が近い補助金・助成金を一覧で表示しています。({display.length}件)
      </p>

      <div className="space-y-3">
        {display.map((s) => (
          <article key={s.id} className="bg-white rounded-lg p-4 border hover:border-blue-300 transition">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h2 className="font-medium text-sm leading-snug">
                  <Link
                    href={`/subsidies/${s.id}`}
                    className="hover:text-blue-600"
                  >
                    {s.title}
                  </Link>
                </h2>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.summary}</p>
              </div>
              {s.prefecture && (
                <Link
                  href={`/prefectures/${s.prefectureSlug}`}
                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded whitespace-nowrap"
                >
                  {s.prefecture}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
