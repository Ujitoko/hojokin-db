import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 補助金検索ラボ",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>
      <div className="bg-white rounded-lg p-6 border space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="font-bold text-base mb-2">個人情報の取り扱いについて</h2>
          <p>
            補助金検索ラボ（以下「当サイト」）は、ユーザーの個人情報の重要性を認識し、
            適切に保護・管理することをお約束いたします。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2">収集する情報</h2>
          <p>当サイトでは、以下の情報を収集する場合があります。</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>アクセスログ（IPアドレス、ブラウザ情報、閲覧ページ等）</li>
            <li>Cookie情報</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2">広告について</h2>
          <p>
            当サイトでは、第三者配信の広告サービス（Google AdSense）を利用する場合があります。
            広告配信事業者は、ユーザーの興味に応じた広告を表示するために、
            Cookie を使用することがあります。
          </p>
          <p className="mt-2">
            Google AdSense に関する詳細は、
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google の広告に関するポリシー
            </a>
            をご確認ください。
          </p>
          <p className="mt-2">
            ユーザーは、Google の広告設定ページで、パーソナライズ広告を無効にすることができます。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2">アクセス解析ツールについて</h2>
          <p>
            当サイトでは、Google アナリティクスを利用してアクセス情報を収集する場合があります。
            このデータは匿名で収集されており、個人を特定するものではありません。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2">ポリシーの変更</h2>
          <p>
            当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
            変更後のポリシーは、当ページに掲載した時点で効力を生じます。
          </p>
        </section>

        <p className="text-gray-400 text-xs">制定日: 2026年3月7日</p>
      </div>
    </div>
  );
}
