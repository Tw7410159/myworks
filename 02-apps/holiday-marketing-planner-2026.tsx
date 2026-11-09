import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Search, 
  Filter, 
  Sparkles, 
  Clock, 
  ShoppingBag, 
  Tag, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Bookmark,
  Share2,
  BarChart3,
  Lightbulb,
  AlertTriangle,
  Sliders,
  DollarSign,
  Send,
  Copy,
  Check,
  Zap,
  Mail,
  Instagram,
  MessageSquare,
  Globe,
  X,
  FileText,
  Flame,
  Heart,
  Tag as TagIcon,
  PlusCircle,
  ClipboardList,
  CheckSquare,
  TrendingDown,
  Briefcase,
  Palette,
  PieChart,
  Calculator,
  Target
} from 'lucide-react';

// 2026 年美國電商重點節慶 JSON 資料結構
const FESTIVALS_DATA = [
  {
    id: "thanksgiving-2026",
    name: "Thanksgiving (感恩節)",
    date: "2026-11-26",
    quarter: "Q4",
    month: 11,
    category: "超級旺季 (Cyber Week)",
    impact: "Mega",
    leadTimeWeeks: 6,
    theme: "感恩團聚、溫馨送禮、早鳥黑五熱身與家庭享樂",
    targetCategories: ["廚房家電", "家居飾品", "食品禮盒", "家庭服飾"],
    actionPoints: [
      "發送感恩節 VIP 專屬感謝信與早鳥折扣券",
      "推廣家庭聚會與派對必備用品套組"
    ]
  },
  {
    id: "black-friday-2026",
    name: "Black Friday (黑色星期五)",
    date: "2026-11-27",
    quarter: "Q4",
    month: 11,
    category: "超級旺季 (Cyber Week)",
    impact: "Mega",
    leadTimeWeeks: 8,
    theme: "全年最低價、買一送一、爆品限時搶購與清空購物車",
    targetCategories: ["全品類", "高單價家電", "時尚奢侈品", "玩具禮品"],
    actionPoints: [
      "10 月初完成備貨與海外倉補貨計劃",
      "11 月初開始早鳥黑五 VIP 專屬預售"
    ]
  },
  {
    id: "cyber-monday-2026",
    name: "Cyber Monday (網路星期一)",
    date: "2026-11-30",
    quarter: "Q4",
    month: 11,
    category: "超級旺季 (Cyber Week)",
    impact: "Mega",
    leadTimeWeeks: 8,
    theme: "線上獨家優惠、科技數碼加碼、Cyber Week 續推優惠",
    targetCategories: ["數碼 3C", "SaaS/軟體訂閱", "網購獨家款", "快消品"],
    actionPoints: [
      "延續黑五熱度，推出線上獨家特惠與結帳立減",
      "強化 Email / SMS 再行銷挽回棄單"
    ]
  },
  {
    id: "valentines-day-2026",
    name: "Valentine's Day (情人節)",
    date: "2026-02-14",
    quarter: "Q1",
    month: 2,
    category: "傳統節慶",
    impact: "High",
    leadTimeWeeks: 4,
    theme: "浪漫送禮、自我寵愛與客製化禮品",
    targetCategories: ["珠寶首飾", "美妝香氛", "巧克力/甜點", "客製禮品"],
    actionPoints: [
      "推出「Gift Finder」導購問答頁面",
      "設計雙人套組與專屬包裝加購服務"
    ]
  },
  {
    id: "mothers-day-2026",
    name: "Mother's Day (母親節)",
    date: "2026-05-10",
    quarter: "Q2",
    month: 5,
    category: "重點送禮檔期",
    impact: "Very High",
    leadTimeWeeks: 5,
    theme: "感謝母愛、尊榮寵愛、健康保健與居家舒適",
    targetCategories: ["按摩護理", "高級美妝", "時尚包款", "廚房家電"],
    actionPoints: [
      "4 月中旬全面上架母親節禮盒頁面與限時免運",
      "提供快速到貨保障"
    ]
  },
  {
    id: "prime-day-2026",
    name: "Amazon Prime Day / Mid-Year Sale",
    date: "2026-07-14",
    quarter: "Q3",
    month: 7,
    category: "電商狂歡節",
    impact: "Very High",
    leadTimeWeeks: 6,
    theme: "年度底價、閃購爆款與全網抗衡促銷",
    targetCategories: ["全品類", "智能家居", "消費電子"],
    actionPoints: [
      "同步推出「Black Friday in July」吸引流量",
      "主打限時閃購與滿額贈"
    ]
  },
  {
    id: "christmas-2026",
    name: "Christmas & Holiday Season",
    date: "2026-12-25",
    quarter: "Q4",
    month: 12,
    category: "傳統節慶",
    impact: "Mega",
    leadTimeWeeks: 6,
    theme: "交換禮物、節慶佈置與新年展望",
    targetCategories: ["禮品套組", "玩具裝飾", "冬季服飾"],
    actionPoints: [
      "12/15 後全面轉向推廣電子禮品卡",
      "佈局 12/26 後的 Post-Holiday 清倉大促"
    ]
  }
];

export default function App() {
  const [activeView, setActiveView] = useState('radar'); // 'radar' | 'calendar'

  // Vibe 氛圍切換 ('saas' | 'warroom' | 'paper')
  const [vibeTheme, setVibeTheme] = useState('saas');

  // 底欄「檔期成效試算器」狀態
  const [calcAov, setCalcAov] = useState(2500);
  const [calcCvr, setCalcCvr] = useState(2.5);
  const [calcBudget, setCalcBudget] = useState(50000);
  const [calcCpc, setCalcCpc] = useState(15);

  // 試算器動態計算邏輯
  const calcMetrics = useMemo(() => {
    const budget = Number(calcBudget) || 0;
    const cpc = Number(calcCpc) || 1;
    const cvr = Number(calcCvr) || 0;
    const aov = Number(calcAov) || 0;

    const estimatedClicks = Math.floor(budget / cpc);
    const estimatedOrders = Math.floor(estimatedClicks * (cvr / 100));
    const estimatedRevenue = estimatedOrders * aov;
    const roas = budget > 0 ? (estimatedRevenue / budget).toFixed(2) : '0.00';
    const profit = estimatedRevenue - budget;

    return {
      clicks: estimatedClicks,
      orders: estimatedOrders,
      revenue: estimatedRevenue,
      roas: parseFloat(roas),
      profit: profit
    };
  }, [calcAov, calcCvr, calcBudget, calcCpc]);

  // 主題樣式映射字典（升級 UI/UX 質感與過渡效果）
  const themeStyles = useMemo(() => {
    switch (vibeTheme) {
      case 'warroom':
        return {
          bg: 'bg-black text-cyan-100 font-mono selection:bg-cyan-500 selection:text-black',
          header: 'bg-slate-950/90 border-cyan-500/30 backdrop-blur-md shadow-[0_4px_20px_rgba(6,182,212,0.15)]',
          accent: 'from-cyan-500 via-fuchsia-500 to-fuchsia-600',
          cardBg: 'bg-slate-950/90 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all duration-300',
          innerBg: 'bg-black/90 border-cyan-500/20',
          textMuted: 'text-cyan-400/70',
          textTitle: 'text-cyan-300 font-bold tracking-wide',
          buttonPrimary: 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white hover:brightness-125 shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 transition-transform',
          badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.3)]',
          sliderAccent: 'accent-cyan-400'
        };
      case 'paper':
        return {
          bg: 'bg-[#F9F6F0] text-[#2C2A29] font-serif selection:bg-[#8C6D53] selection:text-white',
          header: 'bg-[#EFEAE1]/90 border-[#D8D0C5] backdrop-blur-md shadow-sm',
          accent: 'from-[#8C6D53] to-[#B34A39]',
          cardBg: 'bg-[#FFFDF9] border-[#E3DAC9] shadow-md hover:shadow-lg transition-all duration-300',
          innerBg: 'bg-[#F4EFE6] border-[#E0D7C6]',
          textMuted: 'text-[#7A736B]',
          textTitle: 'text-[#2C2A29] font-bold font-serif tracking-tight',
          buttonPrimary: 'bg-[#8C6D53] hover:bg-[#735842] text-white shadow active:scale-95 transition-all',
          badge: 'bg-[#EAE0D0] text-[#5C4533] border-[#C8BBA8]',
          sliderAccent: 'accent-[#8C6D53]'
        };
      case 'saas':
      default:
        return {
          bg: 'bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white',
          header: 'bg-slate-800/80 border-slate-700/80 backdrop-blur-md shadow-lg',
          accent: 'from-indigo-500 via-purple-500 to-pink-500',
          cardBg: 'bg-slate-800/60 border-slate-700/80 shadow-xl backdrop-blur-sm hover:border-slate-600 transition-all duration-300',
          innerBg: 'bg-slate-900/90 border-slate-700/80',
          textMuted: 'text-slate-400',
          textTitle: 'text-slate-100 font-bold tracking-tight',
          buttonPrimary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 active:scale-95 transition-all',
          badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
          sliderAccent: 'accent-indigo-500'
        };
    }
  }, [vibeTheme]);

  const [festivalStatuses, setFestivalStatuses] = useState({
    'thanksgiving-2026': 'planning',
    'black-friday-2026': 'active',
    'cyber-monday-2026': 'planning'
  });

  // 動態行銷暖身天數
  const [warmupDays, setWarmupDays] = useState(30);

  // 卡片彈窗與風格文案生成狀態
  const [modalFestival, setModalFestival] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('emotional');
  const [isGeneratingModalCopy, setIsGeneratingModalCopy] = useState(false);
  const [modalCopied, setModalCopied] = useState(false);
  const [modalCopyResult, setModalCopyResult] = useState('');

  // 模擬依風格與節慶生成 FB 貼文文案
  const generateStyleCopy = (festival, style) => {
    setIsGeneratingModalCopy(true);
    setModalCopied(false);

    setTimeout(() => {
      let copyText = '';
      const festName = festival.name.split(' ')[0];

      if (style === 'emotional') {
        copyText = `❤️【${festName}特別企劃】每一份心意，都值得被溫柔以待 🎁\n\n在這個特別的節日裡，我們想對你說一聲感謝。生活或許忙碌，但總有些溫暖時刻值得駐足慶祝。${festival.theme}✨\n\n我們為你與摯愛精心準備了嚴選好物，讓陪伴更有溫度。\n👉 點擊發掘專屬節慶禮物箱：https://example.com/${festival.id}\n\n#${festName} #心意送禮 #節慶溫馨推薦 #限定優惠 #溫暖陪伴`;
      } else if (style === 'urgent') {
        copyText = `⏳【最後倒數！】${festName} 限時狂歡即將結束 ⚡️\n\n⚠️ 警告：熱銷庫存剩餘不到 15%！錯過這次要再等一年！\n全館限定爆品 5 折起，結帳輸入【${festName.toUpperCase()}2026】立減 $300！\n\n⏰ 優惠倒數計時中，購物車別再猶豫了，手慢就搶不到了！\n🔥 立即秒殺搶購：https://example.com/${festival.id}\n\n#${festName}最後倒數 #限時搶購 #即刻入手 #庫存告急 #爆款秒殺`;
      } else {
        copyText = `🏷️【${festName}超值大促】直降底價！買到就是賺到 💰\n\n年末最強優惠檔期正式開跑！${festival.theme}\n\n🔥 狂歡促銷 3 重奏：\n1️⃣ 全館滿 $2,000 折 $300\n2️⃣ 熱銷品類免運送到家\n3️⃣ 下單再送限定禮包\n\n別再比價了！全網最低價就在這裡，立即清空購物車 🛍️\n👉 搶先領取折抵券：https://example.com/${festival.id}\n\n#${festName}特惠 #買一送一 #滿額現折 #全網最低價 #電商狂歡`;
      }

      setModalCopyResult(copyText);
      setIsGeneratingModalCopy(false);
    }, 600);
  };

  // 打開 Modal
  const openCopyModal = (festival) => {
    setModalFestival(festival);
    setSelectedStyle('emotional');
    generateStyleCopy(festival, 'emotional');
  };

  // 左欄：輸入端狀態
  const [festivalTheme, setFestivalTheme] = useState('感恩節');
  const [cpa, setCpa] = useState(180);
  const [aov, setAov] = useState(2500);
  const [conversionRate, setConversionRate] = useState(2.5);

  // 右欄新增：複製狀態與今日決策排程紀錄
  const [copiedSection, setCopiedSection] = useState(null);
  const [decisionLogs, setDecisionLogs] = useState([
    {
      id: 1,
      theme: "黑色星期五",
      cpa: 220,
      aov: 3200,
      cvr: 3.2,
      roi: "1 : 13.55",
      riskLevel: "GREEN",
      time: "10:30 AM"
    }
  ]);

  // 中欄診斷計算 logic（確保安全數值轉型，徹底修復數據連動問題）
  const numCpa = useMemo(() => (cpa === '' || isNaN(Number(cpa)) ? 0 : Number(cpa)), [cpa]);
  const numAov = useMemo(() => (aov === '' || isNaN(Number(aov)) ? 0 : Number(aov)), [aov]);

  const cpaToAovRatio = useMemo(() => {
    if (numAov <= 0) return 0;
    return (numCpa / numAov) * 100;
  }, [numCpa, numAov]);

  const estimatedROI = useMemo(() => {
    if (numCpa <= 0) return numAov > 0 ? (numAov).toFixed(2) : '0.00';
    return ((numAov - numCpa) / numCpa).toFixed(2);
  }, [numCpa, numAov]);

  // 風險紅綠燈狀態評估（依據即時 numCpa, numAov, cpaToAovRatio 動態渲染）
  const riskStatus = useMemo(() => {
    if (numAov <= 0) {
      return {
        level: 'GREY',
        title: '請輸入有效的 AOV 數值',
        color: 'bg-slate-500',
        borderColor: 'border-slate-500/50',
        bgColor: 'bg-slate-900/40',
        textColor: 'text-slate-300',
        message: '平均客單價 (AOV) 需大於 0 方能進行財務健康診斷。',
        suggestions: ['請在左欄輸入正確的平均客單價 (AOV)']
      };
    }

    if (numCpa >= numAov || cpaToAovRatio > 30) {
      return {
        level: 'RED',
        title: '高風險警戒 (High Risk)',
        color: 'bg-rose-500',
        borderColor: 'border-rose-500/50',
        bgColor: 'bg-rose-950/40',
        textColor: 'text-rose-300',
        message: `獲客成本 (CPA: $${numCpa}) 佔比高達 ${cpaToAovRatio.toFixed(1)}% (${numCpa >= numAov ? '已虧損/侵蝕全部毛利' : '>30%'}), 利潤空間嚴重受壓。`,
        suggestions: [
          '調高客單價 (AOV)，例如設計「滿額贈」或「超值組合包」',
          '優化 Landing Page 與結帳流程以提升轉化率',
          '針對舊客重新進行 Email / SMS 精準再行銷以降低 CPA'
        ]
      };
    } else if (cpaToAovRatio >= 15 && cpaToAovRatio <= 30) {
      return {
        level: 'YELLOW',
        title: '健康觀察中 (Moderate Risk)',
        color: 'bg-amber-500',
        borderColor: 'border-amber-500/50',
        bgColor: 'bg-amber-950/40',
        textColor: 'text-amber-300',
        message: `CPA 佔 AOV 比例為 ${cpaToAovRatio.toFixed(1)}%（處於 15%-30% 觀察區間），尚有利潤但可再優化。`,
        suggestions: [
          '嘗試在購物車頁面加入 Cross-selling (加購價商品)',
          '利用限時倒數計時增強購買緊迫感'
        ]
      };
    } else {
      return {
        level: 'GREEN',
        title: '極佳健康度 (Healthy & Highly Profitable)',
        color: 'bg-emerald-500',
        borderColor: 'border-emerald-500/50',
        bgColor: 'bg-emerald-950/40',
        textColor: 'text-emerald-300',
        message: `獲客成本控管極佳！CPA 佔比僅 ${cpaToAovRatio.toFixed(1)}% (<15%)，具備放大廣告預算的健康條件。`,
        suggestions: [
          '可大膽加大高轉化受眾的廣告投放預算 (Scale up)',
          '測試延伸受眾與新媒體管道'
        ]
      };
    }
  }, [cpaToAovRatio, numCpa, numAov]);

  // 即時計算預估文案內容
  const socialTemplate = useMemo(() => {
    return `🎉【${festivalTheme || '節慶'}限時特惠】年度大促正式開跑！\n全館消費滿 NT$ ${numAov.toLocaleString()} 即享超值贈禮與限定折扣！\n\n✨ 嚴選熱銷商品限時直降，即刻搶購：\n👉 官方商城傳送門：https://example.com/promo\n\n#${festivalTheme || '節慶'} #電商優惠 #限時特惠 #滿額現折 #AOV升級`;
  }, [festivalTheme, numAov]);

  const financeReportTemplate = useMemo(() => {
    return `【${festivalTheme || '節慶'} - 財務獲利預估報告】
----------------------------------------
- 活動預期 AOV: NT$ ${numAov.toLocaleString()}
- 目標 CPA: NT$ ${numCpa.toLocaleString()}
- CPA / AOV 佔比: ${cpaToAovRatio.toFixed(1)}% (${cpaToAovRatio > 30 ? '警示：過高' : '健康'})
- 預估基本 ROI: 1 : ${estimatedROI}
- 預期轉化率 (CVR): ${conversionRate}%
- 模擬 1 萬訪客營收: NT$ ${(Math.round(10000 * (conversionRate / 100)) * numAov).toLocaleString()}
----------------------------------------
診斷結果：${riskStatus.title} (${riskStatus.message})`;
  }, [festivalTheme, numAov, numCpa, cpaToAovRatio, estimatedROI, conversionRate, riskStatus]);

  const executiveActionTemplate = useMemo(() => {
    return `【${festivalTheme || '節慶'} - 主管回報與行動清單】
----------------------------------------
📌 關鍵指標：AOV $${numAov} | CPA $${numCpa} | CVR ${conversionRate}% | 評級: ${riskStatus.level}
----------------------------------------
1. [預算分配] 依 CVR ${conversionRate}% 基準進行多管道測試投放
2. [獲利防線] 控制 CPA 低於 $${numCpa}，維持利潤空間
3. [策略優化] ${riskStatus.suggestions[0]}
4. [備貨確認] 追蹤倉庫前置期，確保流量高峰到貨順暢`;
  }, [festivalTheme, numAov, numCpa, conversionRate, riskStatus]);

  // 單獨複製處理
  const handleCopySection = (key, content) => {
    navigator.clipboard.writeText(content);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // 加入今日決策排程紀錄
  const addDecisionLog = () => {
    const newLog = {
      id: Date.now(),
      theme: festivalTheme || '未命名節慶',
      cpa: numCpa,
      aov: numAov,
      cvr: conversionRate,
      roi: `1 : ${estimatedROI}`,
      riskLevel: riskStatus.level,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setDecisionLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className={`min-h-screen ${themeStyles.bg} flex flex-col transition-colors duration-300 pb-12`}>
      {/* 頂部導航 */}
      <header className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 ${themeStyles.header}`}>
        <div className="flex items-center space-x-3">
          <div className={`bg-gradient-to-tr ${themeStyles.accent} p-2 rounded-xl text-white shadow-lg`}>
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className={`text-base flex items-center gap-2 ${themeStyles.textTitle}`}>
              節慶行銷智慧雷達與文案生成工作台
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${themeStyles.badge}`}>v3.2 UX Enhanced</span>
            </h1>
            <p className={`text-xs ${themeStyles.textMuted}`}>E-Commerce Campaign Radar & Multi-Channel Copy Generator</p>
          </div>
        </div>

        {/* 右上角控制區：氛圍切換與檢視切換 */}
        <div className="flex items-center gap-3">
          {/* ✨ Vibe 氛圍換膚器 */}
          <div className={`flex items-center p-1 rounded-xl border ${themeStyles.innerBg}`}>
            <span className={`text-[10px] font-bold px-2 flex items-center gap-1 ${themeStyles.textMuted}`}>
              <Palette className="w-3.5 h-3.5" />
              Vibe:
            </span>
            <button
              onClick={() => setVibeTheme('saas')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${vibeTheme === 'saas' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              title="現代極簡 SaaS 模式"
            >
              ✨ 現代 SaaS
            </button>
            <button
              onClick={() => setVibeTheme('warroom')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${vibeTheme === 'warroom' ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(6,182,212,0.6)]' : 'text-slate-400 hover:text-slate-200'}`}
              title="科技戰情暗黑模式"
            >
              ⚡ 戰情暗黑
            </button>
            <button
              onClick={() => setVibeTheme('paper')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${vibeTheme === 'paper' ? 'bg-[#8C6D53] text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
              title="溫暖人文紙感模式"
            >
              ☕ 人文紙感
            </button>
          </div>

          <div className={`flex items-center p-1 rounded-xl border ${themeStyles.innerBg}`}>
            <button
              onClick={() => setActiveView('radar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeView === 'radar' ? themeStyles.buttonPrimary : 'text-slate-400 hover:text-slate-200'}`}
            >
              智慧雷達工作台
            </button>
            <button
              onClick={() => setActiveView('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeView === 'calendar' ? themeStyles.buttonPrimary : 'text-slate-400 hover:text-slate-200'}`}
            >
              2026 美國節慶日曆
            </button>
          </div>
        </div>
      </header>

      {/* 主要內容 */}
      {activeView === 'radar' ? (
        <main className="flex-1 p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full">
          
          {/* ================= 1. 左欄（🔵 資料輸入端） ================= */}
          <section className={`lg:col-span-4 rounded-2xl border p-5 flex flex-col justify-between shadow-xl ${themeStyles.cardBg}`}>
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <h2 className={`text-sm flex items-center gap-2 ${themeStyles.textTitle}`}>
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  🔵 資料與指標輸入端
                </h2>
                <span className={`text-[11px] px-2 py-0.5 rounded ${themeStyles.badge}`}>PM Input</span>
              </div>

              {/* 1. 節慶活動主題 */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  節慶活動主題 (預設: 感恩節)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={festivalTheme}
                    onChange={(e) => setFestivalTheme(e.target.value)}
                    placeholder="輸入活動名稱"
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-inner"
                  />
                </div>
              </div>

              {/* 2. 單次獲客成本 (CPA) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>單次獲客成本 (CPA)</span>
                  <span className="text-slate-400 text-[11px]">NTD</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm">$</div>
                  <input
                    type="number"
                    value={cpa}
                    onChange={(e) => setCpa(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-inner"
                  />
                </div>
              </div>

              {/* 3. 平均客單價 (AOV) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>平均客單價 (AOV)</span>
                  <span className="text-slate-400 text-[11px]">NTD</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm">$</div>
                  <input
                    type="number"
                    value={aov}
                    onChange={(e) => setAov(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-inner"
                  />
                </div>
              </div>

              {/* 3. 平均客單價 (AOV) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>平均客單價 (AOV)</span>
                  <span className="text-slate-400 text-[11px]">NTD</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm">$</div>
                  <input
                    type="number"
                    value={aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-inner"
                  />
                </div>
              </div>

              {/* 4. 動態控制桿：預期轉化率 (Conversion Rate) */}
              <div className="pt-2 border-t border-slate-700/60">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300">
                    預期轉化率 (Conversion Rate)
                  </label>
                  <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/30 shadow-sm">
                    {conversionRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-mono">
                  <span>0.5% (保守)</span>
                  <span>2.5% (產業均值)</span>
                  <span>8.0% (爆款)</span>
                </div>
              </div>
            </div>

            {/* 一鍵加入決策排程按鈕 */}
            <div className="pt-5 border-t border-slate-700/80 mt-6">
              <button
                onClick={addDecisionLog}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-98 flex items-center justify-center gap-2 transition text-xs"
              >
                <PlusCircle className="w-4 h-4" />
                ＋加入今日決策排程紀錄
              </button>
            </div>
          </section>

          {/* ================= 2. 中欄（🚦 風險紅綠燈與財務診斷） ================= */}
          <section className={`lg:col-span-4 rounded-2xl border p-5 flex flex-col justify-between shadow-xl ${themeStyles.cardBg}`}>
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-5">
                <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  🚦 風險紅綠燈與財務診斷
                </h2>
                <span className="text-[11px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">Real-time Health</span>
              </div>

              {/* 紅綠燈警示卡片 */}
              <div className={`rounded-xl border p-4.5 mb-5 transition-all duration-300 ${riskStatus.bgColor} ${riskStatus.borderColor}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3.5 h-3.5 rounded-full ${riskStatus.color} animate-ping`} />
                  <h3 className={`text-sm font-bold ${riskStatus.textColor}`}>
                    {riskStatus.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {riskStatus.message}
                </p>
              </div>

              {/* 關鍵數據矩陣 */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-900/80 border border-slate-700/60 p-3.5 rounded-xl shadow-sm">
                  <span className="text-[11px] text-slate-400 block mb-1">CPA / AOV 佔比</span>
                  <div className="text-xl font-bold font-mono text-slate-100">
                    {cpaToAovRatio.toFixed(1)}%
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">建議維持在 20% 以下</span>
                </div>

                <div className="bg-slate-900/80 border border-slate-700/60 p-3.5 rounded-xl shadow-sm">
                  <span className="text-[11px] text-slate-400 block mb-1">預估基本 ROI</span>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    1 : {estimatedROI}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">毛利評估基礎</span>
                </div>
              </div>

              {/* PM 診斷建議清單 */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> PM 策略優化指引
                </h4>
                <ul className="space-y-2">
                  {riskStatus.suggestions.map((sug, idx) => (
                    <li key={idx} className="text-xs text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-700/40 flex items-start gap-2 shadow-xs">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 流量模擬小試算 */}
            <div className="mt-5 pt-3 border-t border-slate-700/60 text-xs text-slate-400 flex justify-between items-center">
              <span>假設 10,000 訪客時：</span>
              <span className="font-mono text-slate-200 font-semibold">
                約成單 {Math.round(10000 * (conversionRate / 100))} 筆 | 預估營收 NT$ {(Math.round(10000 * (conversionRate / 100)) * aov).toLocaleString()}
              </span>
            </div>
          </section>

          {/* ================= 3. 右欄（🟢 成果交付端） ================= */}
          <section className={`lg:col-span-4 rounded-2xl border p-5 flex flex-col justify-between shadow-xl space-y-4 ${themeStyles.cardBg}`}>
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-4">
                <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  🟢 成果交付端 (3 種溝通範本)
                </h2>
                <span className="text-[11px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">Deliverables</span>
              </div>

              {/* 3 種動態範本卡片 */}
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">

                {/* 範本 1：社群文案預覽 */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3.5 relative shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-purple-400" />
                      1. 【社群文案預覽】
                    </span>
                    <button
                      onClick={() => handleCopySection('social', socialTemplate)}
                      className="text-[11px] bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 px-2 py-1 rounded border border-slate-700 flex items-center gap-1 transition"
                    >
                      {copiedSection === 'social' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">已複製！</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          複製
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40 whitespace-pre-line">
                    {socialTemplate}
                  </p>
                </div>

                {/* 範本 2：財務獲利預估報告 */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3.5 relative shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                      2. 【財務獲利預估報告】
                    </span>
                    <button
                      onClick={() => handleCopySection('finance', financeReportTemplate)}
                      className="text-[11px] bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 px-2 py-1 rounded border border-slate-700 flex items-center gap-1 transition"
                    >
                      {copiedSection === 'finance' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">已複製！</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          複製
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[11px] text-slate-300 font-mono leading-relaxed bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40 whitespace-pre-wrap overflow-x-auto">
                    {financeReportTemplate}
                  </pre>
                </div>

                {/* 範本 3：主管回報行動清單 */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3.5 relative shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                      3. 【主管回報行動清單】
                    </span>
                    <button
                      onClick={() => handleCopySection('executive', executiveActionTemplate)}
                      className="text-[11px] bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 px-2 py-1 rounded border border-slate-700 flex items-center gap-1 transition"
                    >
                      {copiedSection === 'executive' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">已複製！</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          複製
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[11px] text-slate-300 font-mono leading-relaxed bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40 whitespace-pre-wrap overflow-x-auto">
                    {executiveActionTemplate}
                  </pre>
                </div>

              </div>
            </div>

            {/* 下方：今日決策排程紀錄匯總清單 */}
            <div className="pt-3 border-t border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <ClipboardList className="w-3.5 h-3.5 text-indigo-400" />
                  今日決策排程紀錄 ({decisionLogs.length})
                </h3>
                <button 
                  onClick={addDecisionLog}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium active:scale-95 transition"
                >
                  ＋紀錄當前設定
                </button>
              </div>

              <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                {decisionLogs.map((log) => (
                  <div key={log.id} className="text-[11px] bg-slate-900/60 border border-slate-700/50 p-2 rounded-lg flex items-center justify-between font-mono text-slate-300 hover:bg-slate-900/90 transition">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${log.riskLevel === 'GREEN' ? 'bg-emerald-400' : log.riskLevel === 'YELLOW' ? 'bg-amber-400' : 'bg-rose-400'}`} />
                      <span className="font-bold text-slate-100">{log.theme}</span>
                      <span className="text-slate-500 text-[10px]">{log.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px]">
                      <span>AOV:${log.aov}</span>
                      <span>CPA:${log.cpa}</span>
                      <span>CVR:{log.cvr}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>
      ) : (
        /* 日曆與節慶庫視圖 */
        <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 space-y-6">
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400 border border-indigo-500/30">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">全域行銷暖身天數設定 (Marketing Warm-up Period)</h3>
                <p className="text-xs text-slate-400">拖曳控制桿調整檔期前的預熱與名單收集區間</p>
              </div>
            </div>

            <div className="flex items-center gap-4 min-w-[280px]">
              <input
                type="range"
                min="14"
                max="60"
                step="1"
                value={warmupDays}
                onChange={(e) => setWarmupDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition"
              />
              <span className="text-sm font-bold font-mono text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-lg border border-indigo-500/30 whitespace-nowrap shadow-sm">
                {warmupDays} 天暖身
              </span>
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-2xl border border-slate-700/80 p-6 shadow-xl">
            <h2 className="text-base font-bold text-slate-100 mb-5 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              2026 美國重要電商節慶庫 (可動態調控時間軸與專案狀態)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FESTIVALS_DATA.map((item) => {
                const currentStatus = festivalStatuses[item.id] || 'planning';

                return (
                  <div key={item.id} className="bg-slate-900/90 border border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between shadow-lg hover:border-slate-600 transition-all duration-300 group">
                    <div>
                      {/* 卡片標頭與狀態選擇 */}
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono mr-2">
                            {item.quarter}
                          </span>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                            {item.category}
                          </span>
                        </div>

                        {/* 狀態切換按鈕群 */}
                        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-lg border border-slate-700">
                          <button
                            onClick={() => setFestivalStatuses(prev => ({ ...prev, [item.id]: 'planning' }))}
                            className={`text-[10px] px-2 py-0.5 rounded transition ${currentStatus === 'planning' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'}`}
                          >
                            籌備中
                          </button>
                          <button
                            onClick={() => setFestivalStatuses(prev => ({ ...prev, [item.id]: 'active' }))}
                            className={`text-[10px] px-2 py-0.5 rounded transition ${currentStatus === 'active' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'}`}
                          >
                            進行中
                          </button>
                          <button
                            onClick={() => setFestivalStatuses(prev => ({ ...prev, [item.id]: 'completed' }))}
                            className={`text-[10px] px-2 py-0.5 rounded transition ${currentStatus === 'completed' ? 'bg-slate-700 text-slate-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                          >
                            已結案
                          </button>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-slate-100 mb-1 group-hover:text-indigo-300 transition-colors">{item.name}</h3>
                      <p className="text-xs text-slate-400 mb-3 flex items-center gap-1.5 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        大促日: {item.date}
                      </p>

                      {/* 核心主題 */}
                      <p className="text-xs text-slate-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 mb-4 leading-relaxed">
                        {item.theme}
                      </p>

                      {/* 動態時間軸與進度條 */}
                      <div className="space-y-2 mb-4 bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-400 font-medium">備貨期: {item.leadTimeWeeks * 7} 天</span>
                          <span className="text-indigo-400 font-bold">暖身期: {warmupDays} 天</span>
                          <span className="text-rose-400 font-bold">大促爆發</span>
                        </div>

                        {/* 三分段視覺進度條 */}
                        <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden flex gap-0.5">
                          <div 
                            style={{ width: `${Math.max(15, 100 - warmupDays - 20)}%` }} 
                            className="bg-slate-500 h-full"
                            title="備貨與供應鏈準備"
                          />
                          <div 
                            style={{ width: `${Math.min(60, warmupDays)}%` }} 
                            className="bg-indigo-500 h-full animate-pulse"
                            title="VIP 預熱與廣告預告"
                          />
                          <div className="w-[15%] bg-rose-500 h-full" title="大促爆發日" />
                        </div>
                      </div>
                    </div>

                    {/* 底部雙按鈕區：生成文案與帶入工作台 */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => openCopyModal(item)}
                        className="py-2 px-3 bg-purple-600/30 hover:bg-purple-600/50 active:scale-95 border border-purple-500/40 text-purple-200 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1 shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                        生成文案
                      </button>

                      <button
                        onClick={() => {
                          setFestivalTheme(item.name.split(' ')[0]);
                          setActiveView('radar');
                        }}
                        className="py-2 px-3 bg-indigo-600/30 hover:bg-indigo-600/50 active:scale-95 border border-indigo-500/40 text-indigo-200 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1 shadow-sm"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-indigo-300" />
                        帶入工作台
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* ================= 4. 底欄：檔期成效試算器 (Estimator) ================= */}
      <footer className="max-w-[1600px] mx-auto w-full px-4 lg:px-6 mt-6">
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100">檔期成效試算器 (Campaign ROAS & Revenue Simulator)</h3>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-2 py-0.5 rounded font-mono">
              Live Forecast
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 左側試算參數 */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">預估客單價 (AOV)</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-slate-500 text-xs">$</span>
                  <input
                    type="number"
                    value={calcAov}
                    onChange={(e) => setCalcAov(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-6 pr-2 py-1.5 text-xs text-slate-100 font-mono focus:ring-1 focus:ring-cyan-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">轉化率 (CVR %)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={calcCvr}
                    onChange={(e) => setCalcCvr(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-mono focus:ring-1 focus:ring-cyan-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">平均 CPC (點擊成本)</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-slate-500 text-xs">$</span>
                  <input
                    type="number"
                    value={calcCpc}
                    onChange={(e) => setCalcCpc(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-6 pr-2 py-1.5 text-xs text-slate-100 font-mono focus:ring-1 focus:ring-cyan-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">總行銷預算 (Budget)</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-slate-500 text-xs">$</span>
                  <input
                    type="number"
                    value={calcBudget}
                    onChange={(e) => setCalcBudget(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-6 pr-2 py-1.5 text-xs text-slate-100 font-mono focus:ring-1 focus:ring-cyan-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* 右側深色高質感圖表/輸出卡片 */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 shadow-inner">
              <div className="text-center border-r border-slate-800 pr-2">
                <span className="text-[10px] text-slate-400 block mb-0.5">預估流量/成單</span>
                <span className="text-sm font-bold font-mono text-slate-200">
                  {calcMetrics.clicks.toLocaleString()} <span className="text-[10px] text-slate-500">點擊</span>
                </span>
                <div className="text-[11px] font-mono text-cyan-400 font-semibold mt-0.5">
                  {calcMetrics.orders.toLocaleString()} 筆訂單
                </div>
              </div>

              <div className="text-center border-r border-slate-800 pr-2">
                <span className="text-[10px] text-slate-400 block mb-0.5">預估總營收 (GMV)</span>
                <span className="text-sm font-bold font-mono text-emerald-400">
                  ${calcMetrics.revenue.toLocaleString()}
                </span>
                <div className={`text-[10px] font-mono mt-0.5 ${calcMetrics.profit >= 0 ? 'text-emerald-500' : 'text-rose-400'}`}>
                  淨利: ${calcMetrics.profit.toLocaleString()}
                </div>
              </div>

              <div className="text-center pl-1">
                <span className="text-[10px] text-slate-400 block mb-0.5">預估 ROAS</span>
                <span className={`text-base font-extrabold font-mono ${calcMetrics.roas >= 3 ? 'text-emerald-400' : calcMetrics.roas >= 1.5 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {calcMetrics.roas} x
                </span>
                <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                  {calcMetrics.roas >= 2.5 ? '🔥 高獲利檔期' : '⚠️ 需關注廣告費'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= 5. ✨ 節慶風格文案生成彈窗 (Modal) ================= */}
      {modalFestival && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* 關閉按鈕 */}
            <button
              onClick={() => setModalFestival(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/50 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] px-2 py-0.5 rounded-full font-mono">
                  GPT-4o FB Copy Assistant
                </span>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Instagram className="w-5 h-5 text-purple-400" />
                {modalFestival.name} — FB/IG 貼文 AI 生成器
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                選擇行銷切角風格，即時生成帶有 Emoji 與標籤的社群發文範本
              </p>
            </div>

            {/* 風格選項卡 */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                選擇文案風格與訴求角度 (Style Option)：
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setSelectedStyle('emotional');
                    generateStyleCopy(modalFestival, 'emotional');
                  }}
                  className={`p-3 rounded-xl border text-left transition flex flex-col gap-1 active:scale-95 ${selectedStyle === 'emotional' ? 'bg-pink-500/20 border-pink-500 text-pink-200 shadow-sm' : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Heart className="w-3.5 h-3.5 text-pink-400" />
                    情緒共鳴
                  </div>
                  <span className="text-[10px] text-slate-400 leading-tight">感性故事、溫馨感謝、節慶氣氛</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedStyle('urgent');
                    generateStyleCopy(modalFestival, 'urgent');
                  }}
                  className={`p-3 rounded-xl border text-left transition flex flex-col gap-1 active:scale-95 ${selectedStyle === 'urgent' ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm' : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    限時急迫
                  </div>
                  <span className="text-[10px] text-slate-400 leading-tight">倒數計時、庫存緊張、錯過不再</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedStyle('direct');
                    generateStyleCopy(modalFestival, 'direct');
                  }}
                  className={`p-3 rounded-xl border text-left transition flex flex-col gap-1 active:scale-95 ${selectedStyle === 'direct' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-sm' : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <TagIcon className="w-3.5 h-3.5 text-emerald-400" />
                    優惠直覺
                  </div>
                  <span className="text-[10px] text-slate-400 leading-tight">直降折抵、買一送一、全網最低</span>
                </button>
              </div>
            </div>

            {/* 生成結果內文區 */}
            <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-4 relative min-h-[200px]">
              {isGeneratingModalCopy ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900/90 rounded-xl">
                  <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                  <span className="text-xs text-slate-400">正在調用 GPT API 生成文案...</span>
                </div>
              ) : (
                <textarea
                  readOnly
                  value={modalCopyResult}
                  className="w-full h-48 bg-transparent text-xs text-slate-200 leading-relaxed font-sans focus:outline-none resize-none"
                />
              )}
            </div>

            {/* 一鍵複製 Modal 文案 */}
            <div className="pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(modalCopyResult);
                  setModalCopied(true);
                  setTimeout(() => setModalCopied(false), 2000);
                }}
                className="w-full py-2.5 rounded-xl font-semibold bg-purple-600 hover:bg-purple-500 active:scale-98 text-white flex items-center justify-center gap-2 transition text-xs shadow-lg shadow-purple-500/20"
              >
                {modalCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-emerald-300">已複製 FB 貼文文案！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    複製 FB 貼文文案
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}