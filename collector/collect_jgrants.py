"""jGrants API から補助金情報を収集し data/jgrants.json に保存する"""

import json
import time
from datetime import datetime
from pathlib import Path

import httpx

API_BASE = "https://api.jgrants-portal.go.jp/exp/v1/public/subsidies"
OUT_PATH = Path(__file__).resolve().parent.parent / "data" / "jgrants.json"
PAGE_SIZE = 100
MAX_PAGES = 20  # 最大2000件（初期取得用）
RATE_LIMIT_DELAY = 0.15  # 10req/sec 以下に抑える


def fetch_subsidies() -> list[dict]:
    all_items = []
    client = httpx.Client(timeout=30.0)

    for page in range(1, MAX_PAGES + 1):
        params = {
            "keyword": "",
            "sort": "created_date",
            "order": "DESC",
            "acceptance": "1",  # 募集中のみ
            "page": page,
            "limit": PAGE_SIZE,
        }
        try:
            resp = client.get(API_BASE, params=params)
            resp.raise_for_status()
            data = resp.json()
        except Exception as e:
            print(f"  [ERROR] page={page}: {e}")
            break

        result = data.get("result", [])
        if not result:
            break

        for item in result:
            all_items.append(normalize(item))

        print(f"  page {page}: {len(result)} 件取得")
        if len(result) < PAGE_SIZE:
            break
        time.sleep(RATE_LIMIT_DELAY)

    client.close()
    return all_items


def normalize(raw: dict) -> dict:
    """APIレスポンスを自サイト用のフォーマットに正規化"""
    subsidy_id = raw.get("id", "")
    title = raw.get("title", "").strip()
    subsidy_max = raw.get("subsidy_max_limit", None)
    subsidy_rate = raw.get("subsidy_rate", "")

    # 対象地域の抽出
    target_area = raw.get("target_area_search", "")

    # 受付期間
    acceptance_start = raw.get("acceptance_start_datetime", "")
    acceptance_end = raw.get("acceptance_close_datetime", "")

    # 実施主体
    org_name = raw.get("executing_organization_name", "") or raw.get("competent_authority", "")

    return {
        "id": str(subsidy_id),
        "title": title,
        "org_name": org_name,
        "subsidy_max_limit": subsidy_max,
        "subsidy_rate": subsidy_rate,
        "target_area": target_area,
        "acceptance_start": acceptance_start,
        "acceptance_end": acceptance_end,
        "detail_url": f"https://www.jgrants-portal.go.jp/subsidies/{subsidy_id}",
        "summary": raw.get("outline", "").strip()[:500],
        "target": raw.get("target", "").strip()[:500],
        "usage": raw.get("usage", "").strip()[:500],
        "source": "jgrants",
        "fetched_at": datetime.now().isoformat(),
    }


def save(items: list[dict]):
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")


def main():
    print(f"[{datetime.now().isoformat()}] jGrants API 取得開始...")
    items = fetch_subsidies()
    print(f"  合計取得: {len(items)} 件")
    save(items)
    print(f"  保存先: {OUT_PATH}")


if __name__ == "__main__":
    main()
