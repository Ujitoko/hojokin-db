"""J-Net21 RSS から補助金・助成金情報を収集し data/jnet21.json に保存する"""

import json
import hashlib
from datetime import datetime
from pathlib import Path

import feedparser

RSS_URL = "https://jnet21-snavi.smrj.go.jp/snavi/support/support.xml"
OUT_PATH = Path(__file__).resolve().parent.parent / "data" / "jnet21.json"


def fetch_rss() -> list[dict]:
    feed = feedparser.parse(RSS_URL)
    items = []
    for entry in feed.entries:
        guid = entry.get("id") or entry.get("guid") or entry.get("link", "")
        uid = hashlib.sha256(guid.encode()).hexdigest()[:16]
        items.append({
            "id": uid,
            "title": entry.get("title", "").strip(),
            "link": entry.get("link", "").strip(),
            "summary": entry.get("summary", "").strip(),
            "published": entry.get("published", ""),
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

    # 新しい順にソート
    existing.sort(key=lambda x: x.get("published", ""), reverse=True)

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(existing, ensure_ascii=False, indent=2), encoding="utf-8")
    return added


def main():
    print(f"[{datetime.now().isoformat()}] J-Net21 RSS 取得開始...")
    items = fetch_rss()
    print(f"  取得件数: {len(items)}")
    added = merge_and_save(items)
    print(f"  新規追加: {added} 件")
    print(f"  保存先: {OUT_PATH}")


if __name__ == "__main__":
    main()
