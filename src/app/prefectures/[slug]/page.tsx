import Link from "next/link";
import { getSubsidiesByPrefecture } from "@/lib/subsidies";
import { PREFECTURES } from "@/lib/prefectures";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PREFECTURES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pref = PREFECTURES.find((p) => p.slug === slug);
  if (!pref) return {};
  return {
    title: `${pref.name}の補助金・助成金一覧 | 補助金検索ラボ`,
    description: `${pref.name}で利用できる補助金・助成金を一覧で紹介。対象者、補助額、締切などをわかりやすく整理しています。`,
  };
}

export default async function PrefecturePage({ params }: Props) {
  const { slug } = await params;
  const pref = PREFECTURES.find((p) => p.slug === slug);
  if (!pref) notFound();

  const subsidies = getSubsidiesByPrefecture(slug);

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">ホーム</Link>
        {" > "}
        <Link href="/prefectures" className="hover:underline">都道府県別</Link>
        {" > "}
        <span>{pref.name}</span>
      </nav>

      <h1 className="text-2xl font-bold mb-2">{pref.name}の補助金・助成金一覧</h1>
      <p className="text-gray-600 mb-6">
        {pref.name}で利用できる補助金・助成金を{subsidies.length}件掲載しています。
      </p>

      {subsidies.length === 0 ? (
        <div className="bg-white rounded-lg p-8 border text-center text-gray-500">
          <p>現在、{pref.name}の補助金情報はまだ登録されていません。</p>
          <p className="text-sm mt-2">データは毎日自動更新されます。</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subsidies.map((s) => (
            <article key={s.id} className="bg-white rounded-lg p-4 border hover:border-blue-300 transition">
              <h2 className="font-medium text-sm leading-snug">
                <Link
                  href={`/subsidies/${s.id}`}
                  className="hover:text-blue-600"
                >
                  {s.title}
                </Link>
              </h2>
              {s.municipality && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded mt-1 inline-block">
                  {s.municipality}
                </span>
              )}
              <p className="text-xs text-gray-500 mt-2 line-clamp-3">{s.summary}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span>出典: {s.source}</span>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  公式ページ →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
