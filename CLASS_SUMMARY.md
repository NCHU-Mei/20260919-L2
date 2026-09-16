# AIoT-DA 課程實作紀錄：Class 1 (DIC - 1)

- **課程名稱**：AIoT-DA (Artificial Intelligence of Things & Data Analytics)
- **實作單元**：Class 1 (DIC - 1)
- **學生/作者**：NCHU-Mei
- **GitHub 儲存庫**：[https://github.com/NCHU-Mei/20260919-L2.git](https://github.com/NCHU-Mei/20260919-L2.git)
- **實作日期**：2026-09-16

---

## 一、 專案核心目標 (Project Objectives)

1. **個人化即時資訊儀表板開發**：打造一個具備高質感現代介面（Glassmorphism）、秒級精確時鐘、時段智慧問候與可編輯姓名儲存的個人 Web 前端專案。
2. **AI Agent 客製化技能擴充**：在工作區導入並配置規格化的 `grill-me` / `grilling` 決策樹對齊技能，強化 AI 輔助開發的工程嚴謹度。
3. **版本控制與遠端代碼託管**：透過 Git 進行版本控制，並建立與 GitHub 遠端儲存庫的自動化連結與同步推送。

---

## 二、 核心成果與實作架構 (Deliverables & Architecture)

### 1. 個人 Web 儀表板 (Personal Web Dashboard)
- **結構層 ([`index.html`](./index.html))**：
  - 語意化 HTML5 標籤結構。
  - 即時系統狀態列（System Status Bar）、時區自動偵測標籤（UTC+08:00）。
  - 中央毛玻璃主卡片：包含問候區塊、個人名稱即時編輯器、大字體時鐘、微秒進度條、日曆數據指標。
  - 快捷操作引導：支援鍵盤熱鍵（<kbd>T</kbd>、<kbd>Z</kbd>、<kbd>Esc</kbd>）。
- **樣式與主題系統 ([`style.css`](./style.css))**：
  - 引入 Google Fonts 高質感字體：`Outfit`（介面與內文）與 `JetBrains Mono`（時鐘數值與等寬資訊）。
  - 毛玻璃效果（`backdrop-filter: blur(28px) saturate(180%)`）搭配動態環境背景光球動畫（Floating Ambient Orbs）。
  - **4 款可即時切換主題色彩引擎**：
    1. *Cosmic Aurora*（極光藍綠，預設）
    2. *Cyberpunk Neon*（賽博龐克粉紫）
    3. *Amber Rose*（琥珀玫瑰）
    4. *Obsidian Silver*（黑曜極簡銀）
  - **Zen Mode（禪意/桌面時鐘模式）**：自動弱化次要控制項，放大時鐘數字，作為桌面即時時鐘使用。
- **動態邏輯層 ([`app.js`](./app.js))**：
  - **精確時間同步**：每秒校準時間，動態計算分秒進度百分比。
  - **時段智慧感知問候**：依據時段自動切換問候語句（早安、午安、晚安），搭配友善問候手勢（👋）。
  - **時間數據分析指標**：動態計算當年度累積天數（如 `Day 259 of 365`）、ISO 週數（`Week 38`）及年度流逝百分比（`71.0%`）。
  - **個人身分資料持久化**：點擊名稱即可直接原地編輯，並透過瀏覽器 `localStorage` 進行跨工作階段儲存。
  - **12H / 24H 雙模式切換**：支援即時格式轉換與 AM/PM 標籤連動。

### 2. AI 代理能力擴充 (Agent Skill Integration)
- 導入知名工程師 Matt Pocock 的開源決策對齊技能：
  - [`.agents/skills/grill-me/SKILL.md`](./.agents/skills/grill-me/SKILL.md)
  - [`.agents/skills/grill-me/references/guide.md`](./.agents/skills/grill-me/references/guide.md)
  - [`.agents/skills/grilling/SKILL.md`](./.agents/skills/grilling/SKILL.md)
- **技能機制**：在實作程式碼前透過「邊界輪次（Frontier Rounds）」與「決策樹（Design Tree）」對使用者進行嚴格提問與方案確認，避免 AI 陷入無結構猜測的「Vibe Coding」。

### 3. 工程化與版本控制 (Git & GitHub Integration)
- 初始化 Git 儲存庫並建立預設 `main` 分支。
- 撰寫標準規範之 [`.gitignore`](./.gitignore) 與專案說明 [`README.md`](./README.md)。
- 排除終端無介面憑證阻擋問題，順利關聯並推送代碼至 GitHub 遠端儲存庫：
  - **Commit 1**: `feat: personal web dashboard with live clock, theme engine, and grill-me skill`
  - **Commit 2**: `chore: ignore local push helper`

---

## 三、 技術棧總覽 (Technology Stack)

| 領域 | 技術 / 工具 | 應用說明 |
| :--- | :--- | :--- |
| **前端基礎** | HTML5, Vanilla CSS3, JavaScript (ES6+) | 無多餘外部依賴框架，原生高效渲染 |
| **視覺美學** | CSS Custom Properties, Keyframe Animation, Glassmorphism | 現代毛玻璃設計、動態環境流光、多主題切換 |
| **字體系統** | Google Fonts (`Outfit`, `JetBrains Mono`) | 兼具科技感與易讀性的現代字體組合 |
| **數據持久化** | Browser `localStorage` API | 儲存使用者自訂名稱、座右銘、主題設定與時間制式 |
| **Agent 架構** | Antigravity Customization System (`.agents/skills/`) | 導入客製化工作流規格技能檔案 |
| **版本管理** | Git, GitHub, PowerShell | 模組化提交與遠端程式碼同步管理 |
