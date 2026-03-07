import Link from "next/link";
import { getAllSubsidies, getPrefectureCounts } from "@/lib/subsidies";

export default function Home() {
  const subsidies = getAllSubsidies();
  const prefCounts = getPrefectureCounts().filter((p) => p.count > 0);
  const recent = subsidies.slice(0, 10);

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-700 text-white rounded-lg p-8 mb-8">
        <h1 className="text-2xl font-bold mb-2">
          補助金・助成金を、かんたんに探す
        </h1>
        <p className="text-blue-100 mb-4">
          全国の補助金・助成金を都道府県別・目的別に検索できます
        </p>
        <div className="flex gap-3">
          <Link
            href="/prefectures"
            className="bg-white text-blue-700 px-4 py-2 rounded font-medium text-sm hover:bg-blue-50"
          >
            都道府県から探す
          </Link>
          <Link
            href="/closing-soon"
            className="bg-blue-600 text-white px-4 py-2 rounded font-medium text-sm hover:bg-blue-500 border border-blue-400"
          >
            締切間近を見る
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-blue-700">{subsidies.length}</div>
          <div className="text-sm text-gray-500">掲載制度数</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-blue-700">{prefCounts.length}</div>
          <div className="text-sm text-gray-500">対象都道府県</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-blue-700">毎日</div>
          <div className="text-sm text-gray-500">自動更新</div>
        </div>
      </section>

      {/* Recent */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4">新着の補助金・助成金</h2>
        <div className="space-y-3">
          {recent.map((s) => (
            <article key={s.id} className="bg-white rounded-lg p-4 border hover:border-blue-300 transition">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-medium text-sm leading-snug">
                    <Link
                      href={`/subsidies/${s.id}`}
                      className="hover:text-blue-600"
                    >
                      {s.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {s.summary}
                  </p>
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
      </section>

      {/* Prefecture links */}
      <section>
        <h2 className="text-lg font-bold mb-4">都道府県別で探す</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {prefCounts.map((p) => (
            <Link
              key={p.slug}
              href={`/prefectures/${p.slug}`}
              className="bg-white rounded border px-3 py-2 text-sm text-center hover:border-blue-300 hover:bg-blue-50 transition"
            >
              {p.name}
              <span className="text-xs text-gray-400 ml-1">({p.count})</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
