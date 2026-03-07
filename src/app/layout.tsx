import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "補助金検索ラボ | 目的別・都道府県別に探せる補助金・助成金検索サイト",
  description:
    "全国の補助金・助成金を目的別・都道府県別に検索。締切情報、対象者、補助額をわかりやすく整理。中小企業・個人事業主の方に。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} antialiased bg-gray-50 text-gray-900`}>
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-700">
              補助金検索ラボ
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/prefectures" className="hover:text-blue-600">
                都道府県別
              </Link>
              <Link href="/closing-soon" className="hover:text-blue-600">
                締切間近
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-gray-500">
            <p>
              補助金検索ラボは公開情報を整理した参考サイトです。申請の際は必ず公式情報をご確認ください。
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="/about" className="hover:underline">運営者情報</Link>
              <Link href="/privacy-policy" className="hover:underline">プライバシーポリシー</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
