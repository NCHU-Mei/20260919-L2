# AIoT-DA 課程實作紀錄：Class 1 (DIC - 1)

- **課程名稱**：AIoT-DA (Artificial Intelligence of Things & Data Analytics)
- **實作單元**：Class 1 (DIC - 1)
- **學員 / 作者**：NCHU-Mei
- **線上展示 (Live Demo)**：[https://nchu-mei.github.io/20260919-L2/](https://nchu-mei.github.io/20260919-L2/)
- **GitHub 儲存庫**：[https://github.com/NCHU-Mei/20260919-L2.git](https://github.com/NCHU-Mei/20260919-L2.git)
- **實作日期**：2026-09-16

---

## 📖 專案簡介 (Project Overview)

本專案為 **AIoT-DA 課程 Class 1 (DIC - 1)** 實作成果。核心目標為建立一個專注於**個人資訊與時間感知**的高質感即時 Web 儀表板（Personal Horizon Dashboard），同時於工作區整合 AI Agent 工程化決策對齊技能（`grill-me`），並落實完整的 Git / GitHub 版本控制流程。

> [!NOTE]
> 本專案遵循純個人化資訊設計原則，專注於即時時間、個人身分識別與個人狀態，**完全不包含任何天氣或氣象相關元素**。

---

## ✨ 核心功能與特色 (Key Features)

### 1. 純粹個人化儀表板 (Personal Dashboard)
- **秒級精準時鐘**：
  - 採用高易讀科技字體 `JetBrains Mono`，時間即時精確跳動。
  - 動態分秒進度條，直觀顯示當前分鐘的推進進度。
  - 支援 **12H / 24H** 雙制式即時切換（快速鍵 <kbd>T</kbd>）。
- **個人身分與時段問候**：
  - 依據時間提供個人化問候（早安、午安、晚安），搭配友好打招呼圖示（👋）。
  - **個人名稱原地編輯**：點擊名稱即可直接修改，並透過瀏覽器 `localStorage` 進行跨工作階段永久保存。
  - **個人座右銘**：可自訂專屬座右銘或目標標語。
- **4 款高質感現代主題**：
  - 極致毛玻璃質感（`backdrop-filter: blur(28px)`）與動態環境光球（Ambient Glowing Orbs）。
  - 可於右上方調色盤選單切換：
    1. *Cosmic Aurora*（極光藍紫，預設）
    2. *Cyberpunk Neon*（賽博龐克粉青）
    3. *Amber Rose*（琥珀玫瑰）
    4. *Obsidian Silver*（黑曜極簡銀）
- **桌面禪意模式 (Zen Mode)**：
  - 快速鍵 <kbd>Z</kbd> 隱藏所有選單與次要資訊，以大字體聚焦呈現時鐘，適合放置於桌面作為即時時鐘螢幕。
- **時間分析數據指標**：
  - 動態計算並顯示當年度累積天數（如 `Day 259 of 365`）、ISO 週數（`Week 38`）及年度流逝進度百分比（`71.0%`）。

### 2. AI 代理決策對齊技能 (Agent Skill: grill-me)
- 於工作區導入 Matt Pocock 開源之工程面試技能：
  - [`.agents/skills/grill-me/SKILL.md`](./.agents/skills/grill-me/SKILL.md)
  - [`.agents/skills/grilling/SKILL.md`](./.agents/skills/grilling/SKILL.md)
- **設計理念**：在產出程式碼前，AI 先將模糊想法繪製為決策樹（Design Tree），依「邊界輪次（Frontier Rounds）」向開發者提問對齊方案，杜絕無結構的盲目產碼（Vibe Coding）。

---

## 📂 專案架構 (Project Structure)

```text
20260919-L2/
├── .agents/
│   └── skills/
│       ├── grill-me/            # 決策樹對齊訪談技能
│       │   ├── SKILL.md
│       │   └── references/guide.md
│       └── grilling/            # 提問推理核心引擎
│           └── SKILL.md
├── index.html                   # 儀表板 HTML5 結構與語意標籤
├── style.css                    # 毛玻璃效果、流光動畫與四款主題樣式
├── app.js                       # 精確時鐘、身分持久化、主題引擎與快捷鍵
├── CLASS_SUMMARY.md             # 課程實作歷程總結文件
├── README.md                    # 本專案完整說明與技術文檔
└── .gitignore                   # Git 版本控制過濾設定
```

---

## 🚀 快速開始與線上展示 (Getting Started & Live Demo)

### 🌐 線上直接體驗 (Live Demo Page)
可以直接存取 GitHub Pages 線上展示版本：  
👉 **[https://nchu-mei.github.io/20260919-L2/](https://nchu-mei.github.io/20260919-L2/)**

### 💻 本機啟動 (Local Setup)
本專案為純原生前端技術（Vanilla HTML/CSS/JS），無需繁瑣安裝：
- **直接開啟**：以任何現代瀏覽器直接點擊開啟 `index.html`。
- **本地伺服器**：
  ```bash
  # Python 啟動
  python -m http.server 5173
  
  # 或使用 Node.js
  npx serve .
  ```
  啟動後瀏覽 [http://localhost:5173](http://localhost:5173)。

### 2. 鍵盤快捷操作
| 按鍵 | 功能說明 |
| :---: | :--- |
| <kbd>T</kbd> | 切換 12 小時制 / 24 小時制 |
| <kbd>Z</kbd> | 進入 / 退出 桌面時鐘禪意模式 (Zen Mode) |
| <kbd>Esc</kbd> | 退出禪意模式 / 取消名稱編輯 |
| 點擊名稱 | 開啟原地輸入框自訂個人姓名 |

---

## 💻 技術棧總覽 (Technology Stack)

| 領域 | 使用技術 | 實作特點 |
| :--- | :--- | :--- |
| **前端結構** | HTML5 (Semantic Tags) | 無外部龐大框架依賴，極速輕量 |
| **視覺風格** | Vanilla CSS3, Glassmorphism | 毛玻璃半透明特效、Keyframe 流光動畫、CSS 變數主題切換 |
| **排版字體** | Google Fonts (`Outfit`, `JetBrains Mono`) | 現代介面幾何字體與等寬數字排版 |
| **核心邏輯** | ES6+ JavaScript | 本地時間校正運算、時區識別、快捷鍵監聽 |
| **資料儲存** | Browser `localStorage` API | 離線持久化儲存使用者名稱、座右銘與主題偏好 |
| **AI 擴充** | Antigravity Customization (`.agents/skills/`) | 導入標準規格化自訂 Agent 技能 |
| **版本管理** | Git, GitHub | 遵循標準版本控制規範與模組化 Commit |
