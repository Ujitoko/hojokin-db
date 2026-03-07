import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営者情報 | 補助金検索ラボ",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">運営者情報</h1>
      <div className="bg-white rounded-lg p-6 border space-y-4 text-sm leading-relaxed">
        <div>
          <h2 className="font-bold text-base mb-2">サイト名</h2>
          <p>補助金検索ラボ</p>
        </div>
        <div>
          <h2 className="font-bold text-base mb-2">運営目的</h2>
          <p>
            全国の補助金・助成金情報は、各省庁や自治体のサイトに散在しており、
            中小企業や個人事業主の方が必要な情報にたどり着くのは容易ではありません。
            本サイトは、これらの情報を整理・一元化し、必要な制度を素早く見つけられるようにすることを目的としています。
          </p>
        </div>
        <div>
          <h2 className="font-bold text-base mb-2">情報源について</h2>
          <p>
            本サイトに掲載している情報は、以下の公開情報を基に作成しています。
          </p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>J-Net21（中小機構）の支援情報ヘッドライン</li>
            <li>jGrants（デジタル庁）の補助金情報</li>
            <li>各都道府県・市区町村の公式サイト</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-base mb-2">免責事項</h2>
          <p>
            本サイトは補助金・助成金に関する参考情報を提供するものであり、
            掲載情報の正確性・完全性・最新性を保証するものではありません。
            申請にあたっては、必ず各制度の公式サイトで最新情報をご確認ください。
          </p>
        </div>
        <div>
          <h2 className="font-bold text-base mb-2">お問い合わせ</h2>
          <p>ご意見・ご要望は下記までお願いいたします。</p>
          <p className="mt-1 text-gray-500">[メールアドレスを設定してください]</p>
        </div>
      </div>
    </div>
  );
}
