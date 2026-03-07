"""J-Net21 検索ページから補助金・助成金情報を大量収集する"""

import json
import hashlib
import time
from datetime import datetime
from pathlib import Path

import httpx
from bs4 import BeautifulSoup

BASE_URL = "https://jnet21-snavi.smrj.go.jp/snavi2/results.php"
ARTICLE_BASE = "https://jnet21-snavi.smrj.go.jp/snavi2/"
OUT_PATH = Path(__file__).resolve().parent.parent / "data" / "jnet21.json"
MAX_PAGES = 30  # 最大30ページ取得


def fetch_page(page_no: int) -> list[dict]:
    """検索結果1ページ分を取得"""
    params = {
        "support_category[]": "1",  # 1=補助金・助成金
        "pageNo": str(page_no),
    }
    r = httpx.get(BASE_URL, params=params, timeout=20, follow_redirects=True)
    r.raise_for_status()

    soup = BeautifulSoup(r.text, "html.parser")
    items = []

    for a_tag in soup.find_all("a", href=True):
        href = a_tag["href"]
        if not href.startswith("articles/"):
            continue

        title = a_tag.get_text(strip=True)
        if not title or len(title) < 5:
            continue

        link = ARTICLE_BASE + href
        uid = hashlib.sha256(link.encode()).hexdigest()[:16]

        # 親要素からsummaryを探す
        parent = a_tag.find_parent("div") or a_tag.find_parent("li")
        summary = ""
        if parent:
            p_tags = parent.find_all("p")
            for p in p_tags:
                text = p.get_text(strip=True)
                if text and text != title and len(text) > 10:
                    summary = text[:500]
                    break

        items.append({
            "id": uid,
            "title": title,
            "link": link,
            "summary": summary,
            "published": "",
            "source": "jnet21",
            "fetched_at": datetime.now().isoformat(),
        })

    return items


def merge_and_save(new_items: list[dict]):
    existing: list[dict] = []
    if OUT_PATH.exists():
        existing = json.loads(OUT_PATH.read_text(encoding="utf-8"))

    existing_ids = {item["id"] for item in existing}
    added = 0
    for item in new_items:
        if item["id"] not in existing_ids:
            existing.append(item)
            existing_ids.add(item["id"])
            added += 1

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(existing, ensure_ascii=False, indent=2), encoding="utf-8")
    return added, len(existing)


def main():
    print(f"[{datetime.now().isoformat()}] J-Net21 検索ページ 大量取得開始...")
    all_items = []

    for page in range(1, MAX_PAGES + 1):
        try:
            items = fetch_page(page)
            if not items:
                print(f"  page {page}: 0件 → 終了")
                break
            all_items.extend(items)
            print(f"  page {page}: {len(items)}件")
            time.sleep(1)  # サーバー負荷軽減
        except Exception as e:
            print(f"  page {page}: エラー {e}")
            break

    print(f"  合計取得: {len(all_items)}件")
    added, total = merge_and_save(all_items)
    print(f"  新規追加: {added}件")
    print(f"  合計データ: {total}件")
    print(f"  保存先: {OUT_PATH}")


if __name__ == "__main__":
    main()
