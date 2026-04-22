# Udrink 嗚！好喝 - 社群飲品評鑑平台 🥤

**Udrink** 是一個專為手搖飲與超商飲品設計的社群評分與收藏平台。解決使用者忘記飲品評價、新品資訊雜亂、查不到真實心得的問題。

## ✨ 特色亮點
- **極簡登入**: 免密碼識別，輸入用戶名即可開始紀錄飲品生活。
- **莫蘭迪美學**: 採用 Morandi Pastels 色調，營造棉花糖般的柔和視覺體驗。
- **動態互動**: 整合 GSAP 動畫，包含評論牆逐一浮現與彈窗順滑彈跳效果。
- **雲端整合**: 基於 Cloudflare D1 分散式資料庫，確保資料持久與快速存取。

## 🛠 技術棧
- **框架**: [Nuxt 4](https://nuxt.com/) (SSR 模式)
- **樣式**: [Tailwind CSS](https://tailwindcss.com/) (自定義莫蘭迪色系)
- **動畫**: [GSAP](https://gsap.com/) (ScrollTrigger & Back.out 效果)
- **後端**: [Nitro](https://nitro.unjs.io/) (Nuxt 內建，部署於 Cloudflare Workers)
- **資料庫**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite 基礎)
- **狀態管理**: [Pinia](https://pinia.vuejs.org/)

## 🎨 視覺規範 (Visual Specs)
- **配色表**:
  - `m-blue`: `#D6E4F0` (莫蘭迪淺藍)
  - `m-pink`: `#F9E1E0` (莫蘭迪粉)
  - `m-green`: `#D4E2D4` (莫蘭迪綠)
  - `m-cream`: `#F7F2E0` (莫蘭迪奶茶)
  - `m-gray`: `#9A9483` (文字用深灰)
- **形狀**: 全站按鈕與卡片統一使用 `40px` (rounded-bubble) 圓角。

## 🚀 快速開始

### 1. 安裝環境
確保你已安裝 [Node.js](https://nodejs.org/)。
```bash
cd udrink
npm install
```

### 2. 初始化資料庫 (僅第一次 / 新環境)
本專案已附帶 `schema.sql` 與 `seed.sql`。**首次開發**或在新環境 clone 後，執行以下指令一鍵初始化本地 D1 資料庫：
```bash
npm run db:init
```

> 資料會持久化於 `.wrangler/state/v3/d1/`，重啟 dev server 不需重新執行。
> 僅在刪除 `.wrangler/state/` 或修改 `schema.sql` 後才需再次執行。

### 3. 啟動開發伺服器
```bash
npm run dev
```
訪問開發連結：`http://localhost:3000`

## 📂 專案結構 (Nuxt 4 Directory Structure)
```
udrink/
├── app/                  # 前端核心
│   ├── assets/           # CSS 與靜態資源
│   ├── components/       # 可複用組件 (ReviewCard, CommonButton, etc.)
│   ├── middleware/       # 路由中間件 (Auth check)
│   ├── pages/            # 頁面路由 (index, login, profile)
│   └── stores/           # Pinia 狀態庫 (user, ui)
├── server/               # Nitro API 端點
│   └── api/              # API 路由 (auth, search, reviews)
├── public/               # 公開資源
├── wrangler.toml         # Cloudflare 配置文件
└── schema.sql            # 資料庫定義
```

## ⚠️ 隱私聲明
本專案採用「無密碼登入」設計，僅靠 User ID 識別使用者。建議使用者使用獨特的用戶名，且本站僅供個人飲品紀錄分享，不建議存放敏感性私密資訊。

## 📄 授權
MIT License
