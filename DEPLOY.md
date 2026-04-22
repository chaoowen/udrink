# 部署指南 — Udrink

本專案使用 **Nuxt + Cloudflare Pages + Cloudflare D1**。

---

## 環境需求

- Node.js 18+
- Wrangler CLI（已含於 devDependencies）
- Cloudflare 帳號

---

## 測試站 URL

| 環境 | URL |
|------|-----|
| Preview（develop branch） | https://develop.udrink.pages.dev |
| Production（main branch） | https://udrink.pages.dev |

> 從哪個 branch deploy，就會更新對應環境。目前測試站為 `develop` branch，請使用 preview URL。

---

## 首次部署流程

### 1. 登入 Cloudflare

```bash
npx wrangler login
```

### 2. 建立遠端 D1 資料庫

```bash
npx wrangler d1 create udrink-db
```

將輸出的 `database_id` 填入 `wrangler.toml`：

```toml
[[d1_databases]]
binding = "DB"
database_name = "udrink-db"
database_id = "<your-database-id>"
```

> 目前已建立，`database_id = "18e59fe7-12ea-4ffd-bf7f-c0093df37e3f"`

### 3. 初始化資料庫 Schema

```bash
npx wrangler d1 execute udrink-db --remote --file=./schema.sql
```

### 4. 匯入 Seed 資料（選用）

```bash
npx wrangler d1 execute udrink-db --remote --file=./seed.sql
```

### 5. Build 專案

```bash
npm run build
```

輸出目錄為 `dist/`。

### 6. 建立 Cloudflare Pages Project（首次才需要）

```bash
npx wrangler pages project create udrink --production-branch=main
```

### 7. 部署到 Cloudflare Pages

```bash
npx wrangler pages deploy dist --project-name=udrink --commit-dirty=true
```

- 從 `develop` branch 執行 → 更新 https://develop.udrink.pages.dev
- 從 `main` branch 執行 → 更新 https://udrink.pages.dev

### 8. 綁定 D1 到 Pages（首次才需要，需手動操作）

進入 Cloudflare Dashboard：

1. **Workers & Pages → udrink → Settings → Bindings**
2. 新增 D1 Database：
   - Variable name：`DB`
   - D1 database：`udrink-db`
3. 儲存後重新執行 deploy 讓設定生效

```bash
npx wrangler pages deploy dist --project-name=udrink --commit-dirty=true
```

---

## GitHub CI 自動部署

Push 到 `develop` 或 `main` 時自動觸發 build 與部署，設定檔位於 `.github/workflows/deploy.yml`。

### 首次設定

**Step 1 — 取得 Cloudflare API Token**

1. 開啟 https://dash.cloudflare.com/profile/api-tokens
2. **Create Token → 使用 "Edit Cloudflare Workers" 模板**
3. 確認權限包含 `Cloudflare Pages: Edit` 與 `D1: Edit`
4. 建立後複製 token

**Step 2 — 設定 GitHub Secrets**

至 https://github.com/chaoowen/udrink/settings/secrets/actions 新增：

| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | 上一步取得的 token |
| `CLOUDFLARE_ACCOUNT_ID` | `dd82afdb84a300eeb36f0eeac1ba0d4f` |

### 部署對應關係

| Branch | 自動部署目標 |
|--------|-------------|
| `develop` | https://develop.udrink.pages.dev |
| `main` | https://udrink.pages.dev |

---

## 後續手動部署流程

```bash
npm run build
npx wrangler pages deploy dist --project-name=udrink --commit-dirty=true
```

---

## 本機開發

```bash
npm run dev
```

使用本機 D1（wrangler local simulation），資料存在 `.wrangler/state/`。

---

## 資料庫操作

### 查詢本機 DB
```bash
npx wrangler d1 execute udrink-db --local --command="SELECT * FROM reviews"
```

### 查詢遠端 DB
```bash
npx wrangler d1 execute udrink-db --remote --command="SELECT * FROM reviews"
```
