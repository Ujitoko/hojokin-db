import Link from "next/link";
import { getAllSubsidies, getSubsidyById } from "@/lib/subsidies";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return getAllSubsidies().map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const s = getSubsidyById(id);
  if (!s) return {};
  return {
    title: `${s.title} | 補助金検索ラボ`,
    description: s.summary.slice(0, 160),
  };
}

export default async function SubsidyDetailPage({ params }: Props) {
  const { id } = await params;
  const s = getSubsidyById(id);
  if (!s) notFound();

  return (
    <div className="max-w-2xl">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">ホーム</Link>
        {" > "}
        <span>制度詳細</span>
      </nav>

      <article className="bg-white rounded-lg p-6 border space-y-4">
        <h1 className="text-xl font-bold leading-snug">{s.title}</h1>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
            出典: {s.source}
          </span>
          {s.prefecture && (
            <Link
              href={`/prefectures/${s.prefectureSlug}`}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"
            >
              {s.prefecture}
            </Link>
          )}
          {s.municipality && (
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
              {s.municipality}
            </span>
          )}
        </div>

        {s.summary && (
          <div>
            <h2 className="font-bold text-sm mb-1">概要</h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {s.summary}
            </p>
          </div>
        )}

        <div className="pt-4 border-t">
          <a
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white text-sm px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            公式ページで詳細を確認 →
          </a>
        </div>

        <p className="text-xs text-gray-400">
          データ取得日: {s.fetched_at ? new Date(s.fetched_at).toLocaleDateString("ja-JP") : "不明"}
        </p>
      </article>
    </div>
  );
}
