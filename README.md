# 我的網頁作品集 ✨ Wen's Creative Web Portfolio

> 🎈 **手機優先（Mobile-First）✕ Whimsical 奇幻玩味風格的創意網頁專案展示門戶**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?style=for-the-badge&logo=github)](https://tw7410159.github.io/myworks/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](LICENSE)
[![Author](https://img.shields.io/badge/Author-Wen%20曾-orange?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/wenchin-tseng/)

---

## 📖 專案簡介 (Introduction)

本專案為 **Wen** 的個人網頁作品集與互動專案展示門戶。以 **手機優先 (Mobile-First)** 與 **Whimsical 玩味拼貼美學** 打造，集結了空間設計履歷、財務數據可視化、純前端物理益智遊戲、電商手搖飲點餐系統、本地資安隱私脫敏工具、台灣即時天氣觀測以及旅行生活提案。

每個專案均保持純前端獨立運作，無外部伺服器相依，點開即用！

---

## 🌟 專案目錄與作品清單 (Showcase Catalog)

### 📁 01-portfolio（個人作品集）
| 專案名稱 | 簡介 | 核心 API / 技術 | 應用場景 | 檔案路徑 |
| :--- | :--- | :--- | :--- | :--- |
| **Wen 建築與視覺設計作品集** | 呈現建築設計、室內裝修、視覺規劃與 3D 建模實力，彙整紐約專案、建築師事務所及工研院實績。 | `HTML5 Semantic`, `JSON-LD Schema`, `Tailwind CSS`, `Smooth Scroll` | 個人求職面試、空間規劃接案、跨領域實務工程展示 | [`01-portfolio/wen-design-portfolio.html`](01-portfolio/wen-design-portfolio.html) |

---

### 📁 02-apps（前端互動應用）
| 專案名稱 | 簡介 | 核心 API / 技術 | 應用場景 | 檔案路徑 |
| :--- | :--- | :--- | :--- | :--- |
| **合併現金流量表分析儀表板** | 專為投資分析打造的視覺化看板，清晰拆解營業、投資與籌資現金流動走向，直觀掌握自由現金流水位。 | `Chart.js`, `Canvas 2D API`, `Intl.NumberFormat` | 股市財報健康度評估、企業營運資金監控、商業財務分析 | [`02-apps/cash-flow-analysis-dashboard.html`](02-apps/cash-flow-analysis-dashboard.html) |
| **霓虹數字彈珠 (Neon 2048)** | 融合賽博龐克發光視覺與下落碰撞機制的物理彈珠遊戲，相同數值碰撞即可觸發連擊消除與合成 2048。 | `Canvas 2D API`, `RequestAnimationFrame`, `Web Audio API`, `Touch Events` | 行動手機端休閒娛樂、手眼協調鍛鍊、碎片時間放鬆 | [`02-apps/neon-2048-merge-game.html`](02-apps/neon-2048-merge-game.html) |
| **楊老大飲料店點餐系統** | 專為手搖茶飲設計的直覺式點餐介面，支援茶飲品項、甜度、冰塊、加料客製化及即時購物車明細計算。 | `LocalStorage API`, `DOM Events API`, `Intl Currency API` | 手搖茶飲實體門市自助點餐、外帶自取預訂、電商結帳原型驗證 | [`02-apps/drink-shop-ordering.html`](02-apps/drink-shop-ordering.html) |
| **台灣即時天氣觀測** | 整合台灣中央氣象署即時公開數據，即刻呈現各縣市氣溫、降雨機率、風向與體感指數。 | `Fetch API`, `CWA Open Weather API`, `Geolocation API` | 每日出門穿著攜傘決策、假日戶外露營健行、出差氣候查詢 | [`02-apps/taiwan-live-weather.html`](02-apps/taiwan-live-weather.html) |
| **歡樂幸運大抽獎** | 活動抽獎神器，支援自訂名單與獎項內容，具備炫麗旋轉光效、倒數音效與漫天彩帶慶祝特效。 | `Web Audio API`, `Canvas Confetti API`, `LocalStorage API` | 企業尾牙春酒、校園班級社團團康、線上直播抽獎現場 | [`02-apps/party-lucky-draw.html`](02-apps/party-lucky-draw.html) |

---

### 📁 03-tools（實用工具庫）
| 專案名稱 | 簡介 | 核心 API / 技術 | 應用場景 | 檔案路徑 |
| :--- | :--- | :--- | :--- | :--- |
| **企業級資料去識別化工具** | 純瀏覽器端本地離線運作，精準辨識並遮蔽身分證、電話、Email及帳號等多種個資，零資料外傳風險。 | `RegExp Engine`, `Clipboard API`, `FileReader API`, `Blob API` | 企業內部資安個資脫敏、交件前客戶隱私遮蔽、AI 提示詞脫敏 | [`03-tools/data-anonymizer-pro.html`](03-tools/data-anonymizer-pro.html) |
| **本地端個資假名化工具** | 透過自定義對照映射或雜湊代號，將真實姓名轉換為虛擬代稱並保留結構關聯性，兼顧隱私與可讀性。 | `Web Crypto API`, `Regex Replacer`, `LocalStorage API` | 法律案卷去名化、醫療學術統計去標識、向 AI 諮詢時代換專有名稱 | [`03-tools/data-pseudonymizer.html`](03-tools/data-pseudonymizer.html) |
| **專注倒數計時器** | 簡約醒目的番茄鐘計時輔助工具，支援快速設定倒數時間、自訂提醒音效與進度環圈動畫，隔絕雜訊。 | `Window.setInterval`, `Web Audio API`, `Page Visibility API` | 個人番茄工作法衝刺、考試限時測驗、會議簡報發言管理 | [`03-tools/focus-countdown-timer.html`](03-tools/focus-countdown-timer.html) |
| **明星桌布數字時鐘** | 融合視覺美學的高清桌布數位時鐘，支援全螢幕顯示、背景圖片切換與俐落的數位時間跳動。 | `Date API`, `Fullscreen API`, `Screen Wake Lock API` | 辦公桌立式平板時鐘、螢幕休眠氛圍時鐘、臥室數字鬧鐘 | [`03-tools/celebrity-wallpaper-clock.html`](03-tools/celebrity-wallpaper-clock.html) |

---

### 📁 04-travel（漫遊指南）
| 專案名稱 | 簡介 | 核心 API / 技術 | 應用場景 | 檔案路徑 |
| :--- | :--- | :--- | :--- | :--- |
| **台南兩天一夜慢活之旅** | 精選神農街老屋、國華街經典小吃、美術館藝文巡禮與特色咖啡館，提供具體交通與停留節奏建議。 | `IntersectionObserver`, `CSS Scroll Snap`, `Geo URI Map` | 週末情侶小旅行、文青獨旅散步、府城美食即時導覽 | [`04-travel/tainan-2day-slow-travel.html`](04-travel/tainan-2day-slow-travel.html) |
| **探索茨城・自然與文化指南** | 日本關東深度漫遊指南，深入介紹常陸海濱公園花海、偕樂園、大洗磯前神社鳥居與伴手禮交通指引。 | `Responsive Grid`, `Web Share API`, `Lazy Loading` | 東京近郊自由行規劃、季節花海攝影、日式庭園巡禮 | [`04-travel/ibaraki-travel-guide.html`](04-travel/ibaraki-travel-guide.html) |

---

### 📁 05-media（影音多媒體）
| 專案名稱 | 簡介 | 核心 API / 技術 | 應用場景 | 檔案路徑 |
| :--- | :--- | :--- | :--- | :--- |
| **Beneath The Current** | 沉浸式環境音效與視覺動態影片，以低頻合成器與深海流光意象營造寧靜心靈沉思空間。 | `HTML5 Video API`, `Media Session API`, `Fullscreen API` | 程式開發背景音樂、瑜珈冥想白噪音、放鬆減壓沉浸 | [`05-media/beneath-the-current-ambient-music.mp4`](05-media/beneath-the-current-ambient-music.mp4) |

---

## 🚀 快速開始 (Quick Start)

無需安裝複雜套件，直接透過任何瀏覽器即可開啟：

1. **複製專案到本機**：
   ```bash
   git clone https://github.com/TW7410159/myworks.git
   cd myworks
   ```

2. **本地啟動預覽（以 Python 為例）**：
   ```bash
   python3 -m http.server 8000
   ```
   瀏覽器開啟：`http://localhost:8000`

---

## 🎨 設計美學特點 (Design Highlights)

- **Mobile-First（手機優先）**：大拇指單手操作友善、手機底部懸浮捷徑列、橫向平滑滑動分類標籤。
- **Whimsical 拼貼手作風**：溫潤燕麥奶底色、可愛紙膠帶標籤、立體微浮雕邊框與糖果粉彩色調。
- **純靜態離線可用**：核心演算法與資安脫敏工具 100% 於瀏覽器本地執行，保障數據零外洩。

---

## 👤 關於作者 (Author)

- **作者**：Wen 曾
- **專業**：建築與室內空間設計・視覺美學・3D建模・AI前端實戰
- **LinkedIn**：[linkedin.com/in/wenchin-tseng](https://www.linkedin.com/in/wenchin-tseng/)

---

## 📄 授權條款 (License)

本專案採用 [MIT License](LICENSE) 授權。
