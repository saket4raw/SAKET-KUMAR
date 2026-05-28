const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ─── Icons ────────────────────────────────────────────────────────────────────
const {
  FaChartLine, FaChartPie, FaCoins, FaBuilding, FaShieldAlt,
  FaUniversity, FaMailBulk, FaChartBar, FaStar, FaRocket,
  FaLightbulb, FaCheckCircle, FaArrowUp, FaBalanceScale,
  FaClock, FaGlobeAsia, FaBriefcase, FaTrophy, FaHome, FaLeaf,
  FaUsers, FaLock
} = require("react-icons/fa");
const { MdTrendingUp, MdAccountBalance, MdSecurity, MdShowChart } = require("react-icons/md");

function renderSvg(IconComponent, color = "#FFFFFF", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}
async function iconPng(IconComponent, color = "#FFFFFF", size = 256) {
  const svg = renderSvg(IconComponent, color, size);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  navy:    "0A1628",
  navy2:   "0F2044",
  navyMid: "1A3460",
  blue:    "1565C0",
  blueL:   "1E88E5",
  cyan:    "00B8D9",
  gold:    "D4A017",
  goldL:   "F0C040",
  white:   "FFFFFF",
  offW:    "F4F6FA",
  gray:    "8898AA",
  grayL:   "E8EDF5",
  black:   "0A0E1A",
  green:   "00C896",
  red:     "E53935",
  purple:  "7C3AED",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.18 });

function addDarkBg(slide, topAccentColor = null) {
  // Full navy background
  slide.background = { color: C.navy };
  // Subtle gradient overlay via shapes
  slide.addShape("rect", { x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.navy2, transparency: 40 }, line: { color: C.navy2, width: 0 } });
  // Top accent line
  if (topAccentColor) {
    slide.addShape("rect", { x: 0, y: 0, w: 10, h: 0.05, fill: { color: topAccentColor }, line: { color: topAccentColor, width: 0 } });
  }
}

function addLightBg(slide) {
  slide.background = { color: C.offW };
  // Left navy sidebar accent
  slide.addShape("rect", { x: 0, y: 0, w: 0.08, h: 5.625, fill: { color: C.navy }, line: { color: C.navy, width: 0 } });
}

function slideTitle(slide, text, y = 0.25, color = C.white, size = 32) {
  slide.addText(text, {
    x: 0.45, y, w: 9.1, h: 0.65,
    fontSize: size, fontFace: "Calibri", bold: true,
    color, align: "left", valign: "middle", margin: 0
  });
}

function lightTitle(slide, text, y = 0.2) {
  slide.addText(text, {
    x: 0.45, y, w: 9.1, h: 0.6,
    fontSize: 28, fontFace: "Calibri", bold: true,
    color: C.navy, align: "left", valign: "middle", margin: 0
  });
  // Gold underline accent - short
  slide.addShape("rect", { x: 0.45, y: y + 0.62, w: 0.6, h: 0.045, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
}

function addCard(slide, x, y, w, h, fillColor, radius = false) {
  const shape = radius ? "roundRect" : "rect";
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: fillColor },
    line: { color: fillColor, width: 0 },
    shadow: makeShadow(),
    rectRadius: radius ? 0.12 : undefined
  });
}

function statBox(slide, x, y, w, value, label, valColor = C.gold, bgColor = C.navyMid) {
  addCard(slide, x, y, w, 1.1, bgColor, true);
  slide.addText(value, { x, y: y + 0.05, w, h: 0.6, fontSize: 34, fontFace: "Calibri", bold: true, color: valColor, align: "center", valign: "middle", margin: 0 });
  slide.addText(label, { x, y: y + 0.62, w, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.grayL, align: "center", valign: "top", margin: 0 });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  BUILD PRESENTATION
// ═══════════════════════════════════════════════════════════════════════════════
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Financial Sectors – Smart Investing in India";
  pres.author = "Premium Finance Deck";

  // Preload icons
  const icons = {
    chart:   await iconPng(FaChartLine,    "#D4A017"),
    pie:     await iconPng(FaChartPie,     "#00B8D9"),
    coin:    await iconPng(FaCoins,        "#D4A017"),
    build:   await iconPng(FaBuilding,     "#00B8D9"),
    shield:  await iconPng(FaShieldAlt,    "#00C896"),
    bank:    await iconPng(FaUniversity,   "#1E88E5"),
    mail:    await iconPng(FaMailBulk,     "#7C3AED"),
    star:    await iconPng(FaStar,         "#D4A017"),
    rocket:  await iconPng(FaRocket,       "#00B8D9"),
    bulb:    await iconPng(FaLightbulb,    "#D4A017"),
    check:   await iconPng(FaCheckCircle,  "#00C896"),
    arrow:   await iconPng(FaArrowUp,      "#00C896"),
    globe:   await iconPng(FaGlobeAsia,    "#00B8D9"),
    brief:   await iconPng(FaBriefcase,    "#1E88E5"),
    trophy:  await iconPng(FaTrophy,       "#D4A017"),
    home:    await iconPng(FaHome,         "#1E88E5"),
    leaf:    await iconPng(FaLeaf,         "#00C896"),
    users:   await iconPng(FaUsers,        "#7C3AED"),
    lock:    await iconPng(FaLock,         "#E53935"),
    balance: await iconPng(FaBalanceScale, "#1E88E5"),
    trend:   await iconPng(MdTrendingUp,   "#00C896"),
    bar:     await iconPng(FaChartBar,     "#1E88E5"),
    clock:   await iconPng(FaClock,        "#D4A017"),
  };

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 1 – COVER
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    // Decorative circles (glassmorphism-style)
    s.addShape("ellipse", { x: 6.8, y: -0.8, w: 4.5, h: 4.5, fill: { color: C.blue, transparency: 82 }, line: { color: C.blue, width: 0 } });
    s.addShape("ellipse", { x: 7.5, y: 2.8,  w: 3,   h: 3,   fill: { color: C.cyan, transparency: 88 }, line: { color: C.cyan, width: 0 } });
    s.addShape("ellipse", { x: -0.5, y: 3.2, w: 2.5, h: 2.5, fill: { color: C.gold, transparency: 90 }, line: { color: C.gold, width: 0 } });

    // Gold top accent bar
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.07, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });

    // Tagline above title
    s.addText("INDIA'S INVESTMENT LANDSCAPE  |  2024 – 2025", {
      x: 0.6, y: 1.0, w: 7, h: 0.4,
      fontSize: 11, fontFace: "Calibri", bold: false, color: C.cyan,
      align: "left", charSpacing: 4, margin: 0
    });

    // Main title
    s.addText("Smart Investing", {
      x: 0.6, y: 1.45, w: 8.5, h: 0.9,
      fontSize: 52, fontFace: "Calibri", bold: true, color: C.white,
      align: "left", margin: 0
    });
    s.addText("in India", {
      x: 0.6, y: 2.3, w: 8.5, h: 0.9,
      fontSize: 52, fontFace: "Calibri", bold: true, color: C.gold,
      align: "left", margin: 0
    });

    // Subtitle
    s.addText("A comprehensive guide to financial sectors, wealth creation\nstrategies, and smart portfolio diversification.", {
      x: 0.6, y: 3.28, w: 6.8, h: 0.8,
      fontSize: 14, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0
    });

    // Bottom divider
    s.addShape("rect", { x: 0.6, y: 4.3, w: 3.5, h: 0.04, fill: { color: C.cyan, transparency: 30 }, line: { color: C.cyan, width: 0 } });

    // Bottom bar
    s.addShape("rect", { x: 0, y: 5.25, w: 10, h: 0.375, fill: { color: C.navyMid }, line: { color: C.navyMid, width: 0 } });
    s.addText("CONFIDENTIAL  |  FOR PROFESSIONAL USE", {
      x: 0.6, y: 5.27, w: 5, h: 0.3,
      fontSize: 9, fontFace: "Calibri", color: C.gray, align: "left", charSpacing: 2, margin: 0
    });
    s.addText("Financial Sectors Series", {
      x: 5.5, y: 5.27, w: 4, h: 0.3,
      fontSize: 9, fontFace: "Calibri", color: C.gray, align: "right", margin: 0
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 2 – AGENDA
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addDarkBg(s, C.cyan);

    slideTitle(s, "Agenda", 0.3, C.white, 30);
    s.addShape("rect", { x: 0.45, y: 0.98, w: 0.5, h: 0.045, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });

    const items = [
      ["01", "Why Investing Matters",        C.gold],
      ["02", "Financial Sectors Overview",    C.cyan],
      ["03", "Asset-by-Asset Deep Dive",      C.gold],
      ["04", "Risk vs Return Analysis",       C.cyan],
      ["05", "Smart Diversification Strategy",C.gold],
      ["06", "Modern Investing Trends",       C.cyan],
      ["07", "Key Takeaways & Conclusions",   C.gold],
    ];

    const col1 = items.slice(0, 4), col2 = items.slice(4);
    const xs = [0.45, 5.3];
    [col1, col2].forEach((col, ci) => {
      col.forEach((item, i) => {
        const x = xs[ci], y = 1.15 + i * 0.98;
        // Card bg
        s.addShape("rect", { x, y, w: 4.55, h: 0.82, fill: { color: C.navyMid }, line: { color: C.navyMid, width: 0 }, shadow: makeShadow() });
        // Number badge
        s.addShape("rect", { x, y, w: 0.55, h: 0.82, fill: { color: item[2] === C.gold ? C.gold : C.cyan, transparency: 0 }, line: { width: 0, color: "000000" } });
        s.addText(item[0], { x, y, w: 0.55, h: 0.82, fontSize: 16, fontFace: "Calibri", bold: true, color: C.navy, align: "center", valign: "middle", margin: 0 });
        s.addText(item[1], { x: x + 0.62, y: y + 0.05, w: 3.85, h: 0.72, fontSize: 13, fontFace: "Calibri", color: C.white, align: "left", valign: "middle", margin: 0 });
      });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 3 – WHY INVESTING MATTERS
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addLightBg(s);
    lightTitle(s, "Why Investing Matters");

    // 4 stat boxes
    const stats = [
      ["6–7%", "India's Avg. Inflation", C.red],
      ["12–15%", "Nifty 50 Avg. Annual Return", C.green],
      ["₹100 → ₹1,600+", "PPF in 30 Years (Compounding)", C.gold],
      ["70%", "Indians Still Rely on FDs Only", C.blue],
    ];
    stats.forEach(([val, lbl, col], i) => {
      const x = 0.35 + i * 2.35;
      addCard(s, x, 1.1, 2.15, 1.2, C.navy, true);
      s.addText(val, { x, y: 1.12, w: 2.15, h: 0.65, fontSize: 20, fontFace: "Calibri", bold: true, color: col, align: "center", valign: "middle", margin: 0 });
      s.addText(lbl, { x, y: 1.74, w: 2.15, h: 0.5, fontSize: 10, fontFace: "Calibri", color: C.grayL, align: "center", valign: "top", margin: 0 });
    });

    // Key points
    const bullets = [
      ["💡", "Inflation silently erodes purchasing power — savings alone are NOT enough."],
      ["📈", "Compounding turns modest investments into life-changing wealth over time."],
      ["🌐", "Diversified investing is the single most powerful wealth-building strategy."],
      ["🎯", "India's growing economy offers exceptional opportunities across every asset class."],
    ];
    bullets.forEach(([icon, text], i) => {
      const y = 2.6 + i * 0.68;
      s.addShape("rect", { x: 0.3, y, w: 9.4, h: 0.58, fill: { color: i % 2 === 0 ? C.grayL : C.white }, line: { color: C.grayL, width: 0 } });
      s.addText(icon + "  " + text, { x: 0.45, y: y + 0.04, w: 9.1, h: 0.5, fontSize: 13, fontFace: "Calibri", color: C.navy, align: "left", valign: "middle", margin: 0 });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 4 – FINANCIAL SECTORS OVERVIEW
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addDarkBg(s, C.gold);
    slideTitle(s, "India's Financial Sectors at a Glance", 0.25, C.white, 26);

    const sectors = [
      ["Share Market",     C.gold,   icons.chart],
      ["Mutual Funds",     C.cyan,   icons.pie],
      ["Gold",             C.goldL,  icons.coin],
      ["Fixed Deposits",   C.blueL,  icons.bank],
      ["PPF",              C.green,  icons.leaf],
      ["Real Estate",      C.blue,   icons.home],
      ["Post Office",      C.purple, icons.mail],
      ["Insurance",        C.grayL,  icons.shield],
    ];

    sectors.forEach(([name, color, icon], i) => {
      const col = i % 4, row = Math.floor(i / 4);
      const x = 0.3 + col * 2.38, y = 1.05 + row * 2.18;
      addCard(s, x, y, 2.1, 2.0, C.navyMid, true);
      // Color top accent
      s.addShape("rect", { x, y, w: 2.1, h: 0.09, fill: { color }, line: { color, width: 0 } });
      // Icon
      s.addImage({ data: icon, x: x + 0.75, y: y + 0.22, w: 0.55, h: 0.55 });
      // Name
      s.addText(name, { x, y: y + 0.88, w: 2.1, h: 0.5, fontSize: 13, fontFace: "Calibri", bold: true, color: C.white, align: "center", margin: 0 });
      // Color dot
      s.addShape("ellipse", { x: x + 0.88, y: y + 1.45, w: 0.35, h: 0.18, fill: { color }, line: { color, width: 0 } });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 5 – SHARE MARKET OVERVIEW
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addLightBg(s);
    lightTitle(s, "Share Market — Nifty 50 Historical Performance");

    // Chart: Nifty returns by year
    s.addChart(pres.ChartType.bar, [{
      name: "Nifty 50 Annual Return (%)",
      labels: ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"],
      values: [-4.1, 3.0, 28.6, 3.2, 12.0, 14.9, 24.1, 4.3, 20.0, 23.8]
    }], {
      x: 0.3, y: 1.0, w: 5.8, h: 3.9,
      barDir: "col",
      chartColors: ["1565C0","1565C0","00C896","E53935","00C896","00C896","00C896","1565C0","00C896","00C896"],
      chartArea: { fill: { color: C.offW }, roundedCorners: false },
      catAxisLabelColor: C.navy, valAxisLabelColor: C.navy,
      valGridLine: { color: "D0D8E8", size: 0.5 },
      catGridLine: { style: "none" },
      showValue: true, dataLabelColor: C.navy, dataLabelFontSize: 9,
      showLegend: false,
      valAxisMinVal: -10, valAxisMaxVal: 35,
      showTitle: false,
    });

    // Right stats
    const rs = [
      ["BSE / NSE",    "India's Premier Exchanges"],
      ["5,000+",       "Listed Companies"],
      ["~12-15%",      "Long-Term CAGR (Nifty 50)"],
      ["$4.3 Tn",      "Market Capitalization (2024)"],
      ["T+1",          "Settlement Cycle (Global Leader)"],
    ];
    rs.forEach(([val, lbl], i) => {
      const y = 1.05 + i * 0.77;
      addCard(s, 6.45, y, 3.2, 0.65, C.navy, true);
      s.addText(val, { x: 6.55, y: y + 0.02, w: 1.2, h: 0.6, fontSize: 15, fontFace: "Calibri", bold: true, color: C.gold, align: "left", valign: "middle", margin: 0 });
      s.addText(lbl, { x: 7.75, y: y + 0.02, w: 1.8, h: 0.6, fontSize: 11, fontFace: "Calibri", color: C.grayL, align: "left", valign: "middle", margin: 0 });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 6 – SHARE MARKET PROS & RISKS
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addDarkBg(s, C.blue);
    slideTitle(s, "Share Market — Opportunity & Risk Framework", 0.25, C.white, 26);

    // Pros column
    addCard(s, 0.3, 0.9, 4.55, 4.4, C.navyMid);
    s.addShape("rect", { x: 0.3, y: 0.9, w: 4.55, h: 0.5, fill: { color: C.green }, line: { color: C.green, width: 0 } });
    s.addText("✓  OPPORTUNITIES", { x: 0.4, y: 0.9, w: 4.35, h: 0.5, fontSize: 14, fontFace: "Calibri", bold: true, color: C.navy, align: "left", valign: "middle", margin: 0 });

    const pros = ["Highest long-term wealth creation potential", "Liquidity — buy & sell instantly", "Dividend income + capital appreciation", "Fractional ownership of top companies", "Inflation-beating returns consistently"];
    pros.forEach((p, i) => {
      s.addShape("ellipse", { x: 0.5, y: 1.58 + i * 0.66, w: 0.22, h: 0.22, fill: { color: C.green }, line: { color: C.green, width: 0 } });
      s.addText(p, { x: 0.85, y: 1.53 + i * 0.66, w: 3.85, h: 0.4, fontSize: 12, fontFace: "Calibri", color: C.white, align: "left", valign: "middle", margin: 0 });
    });

    // Risks column
    addCard(s, 5.15, 0.9, 4.55, 4.4, C.navyMid);
    s.addShape("rect", { x: 5.15, y: 0.9, w: 4.55, h: 0.5, fill: { color: C.red }, line: { color: C.red, width: 0 } });
    s.addText("⚠  RISKS TO MANAGE", { x: 5.25, y: 0.9, w: 4.35, h: 0.5, fontSize: 14, fontFace: "Calibri", bold: true, color: C.white, align: "left", valign: "middle", margin: 0 });

    const risks = ["Market volatility can be severe short-term", "Requires research & continuous monitoring", "Emotional decision-making destroys returns", "Sector/concentration risk if undiversified", "Regulatory and macro-economic uncertainty"];
    risks.forEach((r, i) => {
      s.addShape("ellipse", { x: 5.35, y: 1.58 + i * 0.66, w: 0.22, h: 0.22, fill: { color: C.red }, line: { color: C.red, width: 0 } });
      s.addText(r, { x: 5.7, y: 1.53 + i * 0.66, w: 3.85, h: 0.4, fontSize: 12, fontFace: "Calibri", color: C.white, align: "left", valign: "middle", margin: 0 });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 7 – MUTUAL FUNDS OVERVIEW
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addLightBg(s);
    lightTitle(s, "Mutual Funds — India's Fastest Growing Asset Class");

    // Pie chart AUM distribution
    s.addChart(pres.ChartType.pie, [{
      name: "Mutual Fund AUM Breakdown",
      labels: ["Equity", "Debt", "Hybrid", "ETF/Index", "Others"],
      values: [55, 18, 13, 10, 4]
    }], {
      x: 0.3, y: 0.95, w: 4.6, h: 3.9,
      chartColors: ["1565C0", "00B8D9", "D4A017", "00C896", "8898AA"],
      chartArea: { fill: { color: C.offW } },
      showPercent: true, showLegend: true, legendPos: "b",
      legendFontSize: 10, legendColor: C.navy,
      dataLabelFontSize: 10, dataLabelColor: C.white,
      showTitle: false,
    });

    // Key metrics right
    const kpis = [
      ["₹61 Lakh Cr", "Industry AUM (2024)", C.blue],
      ["10 Crore+",   "SIP Accounts Active",  C.cyan],
      ["₹23,000 Cr",  "Monthly SIP Inflows",   C.gold],
      ["1,500+",      "Schemes Available",      C.green],
    ];
    kpis.forEach(([val, lbl, col], i) => {
      const y = 1.05 + i * 0.88;
      addCard(s, 5.35, y, 4.3, 0.72, C.navy, true);
      s.addShape("rect", { x: 5.35, y, w: 0.08, h: 0.72, fill: { color: col }, line: { color: col, width: 0 } });
      s.addText(val, { x: 5.55, y: y + 0.03, w: 2.2, h: 0.35, fontSize: 16, fontFace: "Calibri", bold: true, color: col, align: "left", margin: 0 });
      s.addText(lbl, { x: 5.55, y: y + 0.38, w: 3.9, h: 0.28, fontSize: 11, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
    });

    // SIP insight banner
    addCard(s, 0.3, 5.05, 9.4, 0.42, C.blue);
    s.addText("💡  SIP: Invest as little as ₹500/month — leverage rupee-cost averaging and the power of compounding.", {
      x: 0.4, y: 5.07, w: 9.2, h: 0.36, fontSize: 12, fontFace: "Calibri", bold: false, color: C.white, align: "center", valign: "middle", margin: 0
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 8 – MUTUAL FUNDS BENEFITS & RISKS
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addDarkBg(s, C.cyan);
    slideTitle(s, "Mutual Funds — Benefits & Risk Considerations", 0.25, C.white, 26);

    const benefits = [
      ["Professional Management", "Expert fund managers optimize portfolios daily."],
      ["Diversification Built-In", "One fund = exposure to 50-100+ securities."],
      ["SIP Discipline",           "Automated investing removes emotional bias."],
      ["Tax Efficiency (ELSS)",    "80C deductions up to ₹1.5 Lakh per year."],
    ];
    const risks = [
      ["Market Risk",         "Equity funds fluctuate with market sentiment."],
      ["Fund Manager Risk",   "Performance tied to manager's decisions."],
      ["Exit Load & Expense", "Charges can erode returns if held short-term."],
      ["No Capital Guarantee","Unlike FDs, returns are not guaranteed."],
    ];

    [[benefits, "BENEFITS", C.cyan, 0.3], [risks, "RISKS", C.gold, 5.15]].forEach(([items, label, accentColor, x]) => {
      addCard(s, x, 0.88, 4.55, 4.45, C.navyMid);
      s.addShape("rect", { x, y: 0.88, w: 4.55, h: 0.48, fill: { color: accentColor }, line: { color: accentColor, width: 0 } });
      s.addText(label, { x: x + 0.12, y: 0.88, w: 4.3, h: 0.48, fontSize: 14, fontFace: "Calibri", bold: true, color: C.navy, align: "left", valign: "middle", margin: 0 });
      items.forEach(([title, desc], i) => {
        const y = 1.48 + i * 0.95;
        s.addText(title, { x: x + 0.2, y, w: 4.1, h: 0.34, fontSize: 13, fontFace: "Calibri", bold: true, color: accentColor, align: "left", margin: 0 });
        s.addText(desc,  { x: x + 0.2, y: y + 0.33, w: 4.1, h: 0.48, fontSize: 11, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
      });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 9 – GOLD INVESTMENT
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addLightBg(s);
    lightTitle(s, "Gold — The Timeless Safe-Haven Asset");

    // Gold CAGR line chart
    s.addChart(pres.ChartType.line, [{
      name: "Gold Price (₹/10g, approx.)",
      labels: ["2000","2005","2010","2015","2017","2019","2021","2023","2024"],
      values: [4400, 7000, 18500, 26000, 29000, 35000, 49000, 60000, 72000]
    }], {
      x: 0.3, y: 0.95, w: 5.5, h: 3.8,
      chartColors: ["D4A017"],
      chartArea: { fill: { color: C.offW }, roundedCorners: false },
      catAxisLabelColor: C.navy, valAxisLabelColor: C.navy,
      valGridLine: { color: "D0D8E8", size: 0.5 }, catGridLine: { style: "none" },
      lineSize: 3, lineSmooth: true,
      showLegend: false, showTitle: false,
    });

    // Right cards
    const items = [
      ["~11% CAGR",    "Last 20 Years (INR terms)", C.gold],
      ["Sovereign BG", "No TDS, 2.5% Interest + Capital Gain", C.cyan],
      ["Digital Gold", "Buy from ₹1 on apps — zero storage cost", C.green],
      ["Hedge Asset",  "Negative correlation to equity markets", C.blue],
    ];
    items.forEach(([val, desc, col], i) => {
      const y = 1.0 + i * 0.92;
      addCard(s, 6.15, y, 3.5, 0.78, C.navy, true);
      s.addShape("rect", { x: 6.15, y, w: 0.08, h: 0.78, fill: { color: col }, line: { color: col, width: 0 } });
      s.addText(val, { x: 6.35, y: y + 0.05, w: 3.1, h: 0.3, fontSize: 14, fontFace: "Calibri", bold: true, color: col, align: "left", margin: 0 });
      s.addText(desc, { x: 6.35, y: y + 0.38, w: 3.1, h: 0.32, fontSize: 11, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
    });

    // Bottom note
    s.addText("Gold allocation of 10–15% in a portfolio significantly reduces overall volatility.", {
      x: 0.3, y: 5.08, w: 9.4, h: 0.38, fontSize: 12, fontFace: "Calibri", italic: true, color: C.gray, align: "center", margin: 0
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 10 – FIXED DEPOSITS
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addDarkBg(s, C.blueL);
    slideTitle(s, "Fixed Deposits — India's Most Trusted Instrument", 0.25, C.white, 26);

    // Bar chart: FD interest rates
    s.addChart(pres.ChartType.bar, [{
      name: "Interest Rate (%)",
      labels: ["SBI", "HDFC", "ICICI", "Axis", "PNB", "Kotak", "Small Finance"],
      values: [6.8, 7.1, 7.0, 7.2, 6.9, 7.25, 9.0]
    }], {
      x: 0.3, y: 0.88, w: 5.6, h: 3.8,
      barDir: "bar",
      chartColors: ["1565C0"],
      chartArea: { fill: { color: C.navyMid }, roundedCorners: false },
      catAxisLabelColor: C.grayL, valAxisLabelColor: C.grayL,
      valGridLine: { color: "2A4880", size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelColor: C.white, dataLabelFontSize: 10,
      showLegend: false, showTitle: false,
    });

    // Right stats
    const items = [
      ["Capital Safety",    "DICGC insures up to ₹5 Lakh per bank", C.green],
      ["Guaranteed Return", "Fixed rate for entire tenure — zero risk", C.cyan],
      ["Tenure Flex",       "7 days to 10 years — your choice", C.gold],
      ["Senior Citizen",    "Extra 0.25–0.5% above standard rates", C.blueL],
      ["Tax Note",          "Interest taxable as per income slab (TDS 10%)", C.red],
    ];
    items.forEach(([title, desc, col], i) => {
      const y = 0.9 + i * 0.76;
      addCard(s, 6.2, y, 3.45, 0.63, C.navyMid);
      s.addShape("ellipse", { x: 6.3, y: y + 0.22, w: 0.18, h: 0.18, fill: { color: col }, line: { color: col, width: 0 } });
      s.addText(title, { x: 6.6, y: y + 0.03, w: 2.9, h: 0.28, fontSize: 12, fontFace: "Calibri", bold: true, color: col, align: "left", margin: 0 });
      s.addText(desc, { x: 6.6, y: y + 0.3, w: 2.9, h: 0.28, fontSize: 10, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 11 – PPF
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addLightBg(s);
    lightTitle(s, "PPF — The Crown Jewel of Tax-Free Investing");

    // Compounding growth chart
    const ppfValues = [];
    let corpus = 0;
    for (let y = 1; y <= 30; y++) { corpus = (corpus + 150000) * 1.071; ppfValues.push(Math.round(corpus / 100000) / 10); }
    const labels = Array.from({length: 30}, (_, i) => `Yr ${i + 1}`);

    s.addChart(pres.ChartType.area, [{
      name: "PPF Corpus (₹ Lakh)",
      labels, values: ppfValues
    }], {
      x: 0.3, y: 0.98, w: 5.6, h: 3.7,
      chartColors: ["00C896"],
      chartArea: { fill: { color: C.offW } },
      catAxisLabelColor: C.navy, valAxisLabelColor: C.navy,
      valGridLine: { color: "D0D8E8", size: 0.5 }, catGridLine: { style: "none" },
      lineSize: 2, lineSmooth: true,
      showLegend: false, showTitle: false,
    });

    // Right features
    const feats = [
      ["7.1% p.a.",    "Government-Guaranteed Interest", C.green],
      ["EEE Status",   "Exempt at Invest, Grow & Withdraw", C.gold],
      ["₹500 – 1.5L",  "Annual Contribution Range", C.blue],
      ["15-Year Lock",  "Extendable in 5-year blocks", C.cyan],
      ["₹1.55 Crore",  "Projected corpus at 30 years*", C.gold],
    ];
    feats.forEach(([val, desc, col], i) => {
      const y = 1.0 + i * 0.83;
      addCard(s, 6.2, y, 3.45, 0.7, C.navy, true);
      s.addText(val, { x: 6.32, y: y + 0.04, w: 3.2, h: 0.3, fontSize: 14, fontFace: "Calibri", bold: true, color: col, align: "left", margin: 0 });
      s.addText(desc, { x: 6.32, y: y + 0.36, w: 3.2, h: 0.28, fontSize: 11, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
    });
    s.addText("*Max ₹1.5L/year at 7.1% over 30 years", { x: 0.3, y: 5.1, w: 5, h: 0.35, fontSize: 9, fontFace: "Calibri", italic: true, color: C.gray, margin: 0 });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 12 – REAL ESTATE
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addDarkBg(s, C.blue);
    slideTitle(s, "Real Estate — Tangible Wealth, Long-Term Returns", 0.25, C.white, 26);

    // City CAGR bar chart
    s.addChart(pres.ChartType.bar, [{
      name: "Price CAGR % (10-Yr)",
      labels: ["Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai"],
      values: [7.2, 6.8, 9.5, 11.2, 8.4, 7.0]
    }], {
      x: 0.3, y: 0.88, w: 5.5, h: 3.9,
      barDir: "col",
      chartColors: ["1565C0","1565C0","00B8D9","D4A017","00B8D9","1565C0"],
      chartArea: { fill: { color: C.navyMid } },
      catAxisLabelColor: C.grayL, valAxisLabelColor: C.grayL,
      valGridLine: { color: "2A4880", size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelColor: C.white, dataLabelFontSize: 10,
      showLegend: false, showTitle: false,
    });

    // Right points
    const pts = [
      ["Rental Income", "Steady 2–4% yield + capital appreciation", C.cyan],
      ["REITs", "Real estate investing from ₹300 — no property needed", C.gold],
      ["Leverage",  "Home loan multiplies buying power (tax benefit too)", C.green],
      ["Illiquidity Risk", "Cannot be sold quickly — plan for long term", C.red],
      ["High Entry",  "Capital-intensive; requires significant down payment", C.gold],
    ];
    pts.forEach(([title, desc, col], i) => {
      const y = 0.92 + i * 0.78;
      addCard(s, 6.1, y, 3.55, 0.64, C.navyMid);
      s.addShape("rect", { x: 6.1, y, w: 0.07, h: 0.64, fill: { color: col }, line: { color: col, width: 0 } });
      s.addText(title, { x: 6.28, y: y + 0.04, w: 3.25, h: 0.27, fontSize: 12, fontFace: "Calibri", bold: true, color: col, align: "left", margin: 0 });
      s.addText(desc,  { x: 6.28, y: y + 0.32, w: 3.25, h: 0.27, fontSize: 10, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 13 – POST OFFICE SCHEMES
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addLightBg(s);
    lightTitle(s, "Post Office Schemes — Government-Backed Security");

    const schemes = [
      { name: "NSC", rate: "7.7%", tenure: "5 Yrs", highlight: "80C Eligible", col: C.blue },
      { name: "KVP", rate: "7.5%", tenure: "~115 Mo", highlight: "Doubles Capital", col: C.gold },
      { name: "MIS", rate: "7.4%", tenure: "5 Yrs", highlight: "Monthly Income", col: C.green },
      { name: "SCSS", rate: "8.2%", tenure: "5 Yrs", highlight: "Senior Citizens", col: C.cyan },
      { name: "SSY", rate: "8.2%", tenure: "21 Yrs", highlight: "Girl Child / EEE", col: C.purple },
    ];

    schemes.forEach((sc, i) => {
      const x = 0.28 + i * 1.9;
      addCard(s, x, 1.0, 1.72, 3.8, C.navy, true);
      // Top color accent
      s.addShape("rect", { x, y: 1.0, w: 1.72, h: 0.55, fill: { color: sc.col }, line: { color: sc.col, width: 0 } });
      s.addText(sc.name, { x, y: 1.0, w: 1.72, h: 0.55, fontSize: 20, fontFace: "Calibri", bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
      s.addText("Rate", { x, y: 1.65, w: 1.72, h: 0.3, fontSize: 9, fontFace: "Calibri", color: C.gray, align: "center", margin: 0 });
      s.addText(sc.rate, { x, y: 1.92, w: 1.72, h: 0.5, fontSize: 24, fontFace: "Calibri", bold: true, color: sc.col, align: "center", margin: 0 });
      s.addText("Tenure", { x, y: 2.5, w: 1.72, h: 0.3, fontSize: 9, fontFace: "Calibri", color: C.gray, align: "center", margin: 0 });
      s.addText(sc.tenure, { x, y: 2.78, w: 1.72, h: 0.4, fontSize: 15, fontFace: "Calibri", bold: true, color: C.white, align: "center", margin: 0 });
      s.addShape("rect", { x: x + 0.15, y: 3.28, w: 1.42, h: 0.04, fill: { color: sc.col, transparency: 60 }, line: { color: sc.col, width: 0 } });
      s.addText(sc.highlight, { x, y: 3.4, w: 1.72, h: 0.3, fontSize: 10, fontFace: "Calibri", bold: true, color: sc.col, align: "center", margin: 0 });
    });

    s.addText("All Post Office schemes are backed by the Government of India — zero default risk, ideal for conservative investors.", {
      x: 0.3, y: 5.1, w: 9.4, h: 0.38, fontSize: 12, fontFace: "Calibri", italic: true, color: C.gray, align: "center", margin: 0
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 14 – INSURANCE AS INVESTMENT
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addDarkBg(s, C.green);
    slideTitle(s, "Insurance — Protection First, Investment Second", 0.25, C.white, 26);

    // Market share pie
    s.addChart(pres.ChartType.doughnut, [{
      name: "Insurance Premium Mix",
      labels: ["Life", "Health", "Motor", "Fire/Property", "Others"],
      values: [51, 22, 16, 7, 4]
    }], {
      x: 0.3, y: 0.88, w: 4.5, h: 3.9,
      chartColors: ["00C896","1565C0","D4A017","00B8D9","8898AA"],
      chartArea: { fill: { color: C.navyMid } },
      showPercent: true, showLegend: true, legendPos: "b",
      legendFontSize: 10, legendColor: C.grayL,
      holeSize: 55,
      showTitle: false,
    });

    // Right guidance
    const items = [
      ["Term Insurance",   "Pure protection — ₹1 Crore cover at ₹8,000-12,000/yr", C.green],
      ["ULIPs",            "Market-linked + life cover — higher charges, lower returns", C.gold],
      ["Endowment Plans",  "Traditional mix — low returns (4-6%) but safe", C.cyan],
      ["PMJJBY / PMSBY",  "Govt schemes — cover from just ₹436/yr", C.blue],
    ];
    items.forEach(([title, desc, col], i) => {
      const y = 0.92 + i * 0.98;
      addCard(s, 5.05, y, 4.6, 0.82, C.navyMid);
      s.addShape("rect", { x: 5.05, y, w: 0.08, h: 0.82, fill: { color: col }, line: { color: col, width: 0 } });
      s.addText(title, { x: 5.25, y: y + 0.05, w: 4.2, h: 0.3, fontSize: 13, fontFace: "Calibri", bold: true, color: col, align: "left", margin: 0 });
      s.addText(desc,  { x: 5.25, y: y + 0.38, w: 4.2, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
    });

    // Bottom advisory
    addCard(s, 0.3, 5.08, 9.4, 0.38, C.navyMid);
    s.addText("💡  Best Practice: Separate insurance and investment. Buy term + invest the savings in equity/MF.", {
      x: 0.4, y: 5.1, w: 9.2, h: 0.34, fontSize: 11.5, fontFace: "Calibri", color: C.gold, align: "center", valign: "middle", margin: 0
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 15 – RISK vs RETURN MATRIX
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addLightBg(s);
    lightTitle(s, "Risk vs Return Matrix — Know Your Position");

    // Scatter chart
    s.addChart(pres.ChartType.scatter, [
      { name: "X", values: [1, 2, 3, 3.5, 5, 6, 7, 8] },
      { name: "Assets", values: [3.5, 5.5, 6.5, 7.0, 8.5, 9.5, 11.5, 14.0] },
    ], {
      x: 0.3, y: 0.95, w: 5.8, h: 4.1,
      chartColors: ["1565C0"],
      chartArea: { fill: { color: C.offW } },
      catAxisLabelColor: C.gray, valAxisLabelColor: C.gray,
      catAxisTitle: "Risk Level →",
      valAxisTitle: "Expected Return (%) →",
      valGridLine: { color: "D0D8E8", size: 0.5 }, catGridLine: { color: "D0D8E8", size: 0.5 },
      showLegend: false, showTitle: false,
    });

    // Labels on scatter
    const assetLabels = [
      [0.95, 4.98, "Savings A/C"],
      [1.35, 4.3, "PPF / NSC"],
      [1.72, 3.95, "FD"],
      [1.98, 3.72, "Gold"],
      [2.5,  3.35, "Debt MF"],
      [2.92, 3.0, "Balanced MF"],
      [3.35, 2.65, "Equity MF"],
      [3.78, 2.3, "Direct Stocks"],
    ];
    assetLabels.forEach(([x, y, label]) => {
      s.addText(label, { x, y, w: 1.5, h: 0.26, fontSize: 9, fontFace: "Calibri", bold: true, color: C.navy, align: "left", margin: 0 });
    });

    // Right: quadrant legend
    const quads = [
      [C.green, "LOW RISK / LOW RETURN",   "FDs, Savings, Post Office\nIdeal for capital preservation"],
      [C.gold,  "MED RISK / MED RETURN",   "Gold, Debt MF, Balanced Hybrid\nIdeal for moderate growth"],
      [C.blue,  "HIGH RISK / HIGH RETURN",  "Equity, MF, Real Estate\nIdeal for long-term wealth"],
      [C.red,   "SPECULATIVE",              "F&O, Crypto, Penny Stocks\nOnly for informed risk-takers"],
    ];
    quads.forEach(([col, title, desc], i) => {
      const y = 1.0 + i * 1.12;
      addCard(s, 6.4, y, 3.3, 0.95, C.navy, true);
      s.addShape("rect", { x: 6.4, y, w: 0.22, h: 0.95, fill: { color: col }, line: { color: col, width: 0 } });
      s.addText(title, { x: 6.72, y: y + 0.06, w: 2.86, h: 0.28, fontSize: 10, fontFace: "Calibri", bold: true, color: col, align: "left", margin: 0 });
      s.addText(desc,  { x: 6.72, y: y + 0.36, w: 2.86, h: 0.5, fontSize: 9, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 16 – SMART DIVERSIFICATION STRATEGY
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addDarkBg(s, C.gold);
    slideTitle(s, "Smart Diversification — Optimal Portfolio Architecture", 0.25, C.white, 24);

    // Three portfolio profiles
    const profiles = [
      {
        name: "Conservative", sub: "Preserve & Grow Safely",
        color: C.green, x: 0.25,
        allocations: [["FD / Post Office", "35%"], ["PPF / Debt MF", "25%"], ["Gold", "20%"], ["Equity MF (Large)", "15%"], ["Cash/Liquid", "5%"]]
      },
      {
        name: "Balanced", sub: "Grow with Stability",
        color: C.cyan, x: 3.5,
        allocations: [["Equity MF", "40%"], ["PPF / Debt MF", "20%"], ["Gold", "15%"], ["Real Estate", "15%"], ["FD / Insurance", "10%"]]
      },
      {
        name: "Aggressive", sub: "Maximise Long-Term Wealth",
        color: C.gold, x: 6.75,
        allocations: [["Direct Equity", "45%"], ["Equity MF", "25%"], ["Gold / Alt", "10%"], ["Real Estate", "15%"], ["Liquid Fund", "5%"]]
      },
    ];

    profiles.forEach(p => {
      addCard(s, p.x, 0.85, 3.0, 4.55, C.navyMid, true);
      s.addShape("rect", { x: p.x, y: 0.85, w: 3.0, h: 0.65, fill: { color: p.color }, line: { color: p.color, width: 0 } });
      s.addText(p.name, { x: p.x, y: 0.85, w: 3.0, h: 0.4, fontSize: 16, fontFace: "Calibri", bold: true, color: C.navy, align: "center", valign: "middle", margin: 0 });
      s.addText(p.sub, { x: p.x, y: 1.22, w: 3.0, h: 0.28, fontSize: 9, fontFace: "Calibri", color: C.navy, align: "center", margin: 0 });
      p.allocations.forEach(([asset, pct], i) => {
        const ay = 1.62 + i * 0.72;
        const barW = parseFloat(pct) / 100 * 2.6;
        s.addShape("rect", { x: p.x + 0.2, y: ay + 0.28, w: 2.6, h: 0.18, fill: { color: C.navyMid }, line: { color: C.navyMid, width: 0 } });
        s.addShape("rect", { x: p.x + 0.2, y: ay + 0.28, w: barW, h: 0.18, fill: { color: p.color }, line: { color: p.color, width: 0 } });
        s.addText(asset, { x: p.x + 0.2, y: ay + 0.04, w: 2.0, h: 0.24, fontSize: 10, fontFace: "Calibri", color: C.white, align: "left", margin: 0 });
        s.addText(pct, { x: p.x + 2.2, y: ay + 0.04, w: 0.6, h: 0.24, fontSize: 10, fontFace: "Calibri", bold: true, color: p.color, align: "right", margin: 0 });
      });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 17 – MODERN INVESTING TRENDS
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addLightBg(s);
    lightTitle(s, "Modern Investing Trends Reshaping India");

    const trends = [
      { icon: icons.rocket, title: "Passive Investing", desc: "Index funds & ETFs now manage ₹9+ Lakh Cr — low cost, market-matching returns driving massive adoption.", col: C.blue },
      { icon: icons.globe,  title: "Global Diversification", desc: "Indians investing in US, European & Asian markets via international MFs and Nasdaq ETFs.", col: C.cyan },
      { icon: icons.trend,  title: "ESG Investing", desc: "Sustainable, ethical investing — ESG funds growing 40%+ YoY as next-gen investors prioritize impact.", col: C.green },
      { icon: icons.chart,  title: "AI-Powered Robo-Advisory", desc: "Zerodha, Groww, Smallcase using AI to automate portfolio management for retail investors.", col: C.gold },
      { icon: icons.coin,   title: "Alternative Assets", desc: "P2P lending, invoice discounting, REITs & InvITs democratizing previously exclusive asset classes.", col: C.purple },
      { icon: icons.bulb,   title: "Fractional Investing", desc: "Own fractions of Apple, Google, Nifty Bees — from as little as ₹10. Zero barriers to entry.", col: C.blue },
    ];

    trends.forEach((t, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 0.3 + col * 3.18, y = 1.08 + row * 2.1;
      addCard(s, x, y, 2.95, 1.88, C.navy, true);
      s.addImage({ data: t.icon, x: x + 0.2, y: y + 0.18, w: 0.45, h: 0.45 });
      s.addText(t.title, { x: x + 0.75, y: y + 0.15, w: 2.1, h: 0.42, fontSize: 13, fontFace: "Calibri", bold: true, color: t.col, align: "left", margin: 0 });
      s.addShape("rect", { x: x + 0.2, y: y + 0.72, w: 2.55, h: 0.03, fill: { color: t.col, transparency: 60 }, line: { color: t.col, width: 0 } });
      s.addText(t.desc, { x: x + 0.2, y: y + 0.82, w: 2.55, h: 0.9, fontSize: 10.5, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 18 – KEY TAKEAWAYS
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    addDarkBg(s, C.cyan);
    slideTitle(s, "Key Takeaways", 0.25, C.white, 32);

    const takeaways = [
      ["01", C.gold,  "Start Early, Stay Consistent", "Compounding rewards patience — even ₹5,000/month invested early creates crores over 30 years."],
      ["02", C.cyan,  "Diversify Across Asset Classes", "No single asset class wins every year. Spread risk intelligently across equity, debt, gold and real estate."],
      ["03", C.green, "Match Risk to Your Time Horizon", "Young investors can absorb volatility. As goals near, shift to safer instruments gradually."],
      ["04", C.gold,  "Maximize Tax Efficiency",        "Use 80C (PPF/ELSS), 80D (health insurance) and LTCG exemptions to keep more of what you earn."],
      ["05", C.cyan,  "Invest, Don't Speculate",        "Focus on fundamentals, long-term plans and goals — avoid market timing and hot tips."],
    ];

    takeaways.forEach((t, i) => {
      const y = 1.0 + i * 0.88;
      addCard(s, 0.3, y, 9.4, 0.76, C.navyMid);
      s.addShape("rect", { x: 0.3, y, w: 0.55, h: 0.76, fill: { color: t[1] }, line: { color: t[1], width: 0 } });
      s.addText(t[0], { x: 0.3, y, w: 0.55, h: 0.76, fontSize: 16, fontFace: "Calibri", bold: true, color: C.navy, align: "center", valign: "middle", margin: 0 });
      s.addText(t[2], { x: 0.98, y: y + 0.06, w: 2.6, h: 0.3, fontSize: 13, fontFace: "Calibri", bold: true, color: t[1], align: "left", margin: 0 });
      s.addText(t[3], { x: 0.98, y: y + 0.36, w: 8.55, h: 0.32, fontSize: 11, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 19 – CONCLUSION
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape("ellipse", { x: 7.2, y: -0.6, w: 4, h: 4, fill: { color: C.blue, transparency: 85 }, line: { color: C.blue, width: 0 } });
    s.addShape("ellipse", { x: -0.5, y: 3.5, w: 3, h: 3, fill: { color: C.gold, transparency: 88 }, line: { color: C.gold, width: 0 } });

    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.07, fill: { color: C.cyan }, line: { color: C.cyan, width: 0 } });

    s.addText("THE BOTTOM LINE", { x: 0.6, y: 0.8, w: 6, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.cyan, charSpacing: 4, margin: 0 });
    s.addText("Your Financial Future\nStarts Today", {
      x: 0.6, y: 1.2, w: 8.5, h: 1.5, fontSize: 38, fontFace: "Calibri", bold: true, color: C.white, align: "left", margin: 0
    });

    s.addShape("rect", { x: 0.6, y: 2.76, w: 1.2, h: 0.05, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });

    const conclusions = [
      "India's financial landscape offers something for every investor profile.",
      "The secret is not picking the 'best' asset — it's building the right mix.",
      "Discipline + Diversification + Time = Generational Wealth.",
    ];
    conclusions.forEach((c, i) => {
      s.addText("›  " + c, { x: 0.6, y: 2.92 + i * 0.52, w: 8.5, h: 0.44, fontSize: 14, fontFace: "Calibri", color: C.grayL, align: "left", margin: 0 });
    });

    // Gold bar
    s.addShape("rect", { x: 0, y: 4.85, w: 10, h: 0.775, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
    s.addText("\"The best time to invest was yesterday. The second-best time is now.\"", {
      x: 0.5, y: 4.88, w: 9, h: 0.7, fontSize: 14, fontFace: "Calibri", italic: true, bold: true, color: C.navy, align: "center", valign: "middle", margin: 0
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 20 – THANK YOU
  // ───────────────────────────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    // Decorative circles
    s.addShape("ellipse", { x: -1, y: -1, w: 5, h: 5, fill: { color: C.navyMid, transparency: 50 }, line: { color: C.navyMid, width: 0 } });
    s.addShape("ellipse", { x: 7.5, y: 2.5, w: 4, h: 4, fill: { color: C.blue, transparency: 82 }, line: { color: C.blue, width: 0 } });
    s.addShape("ellipse", { x: 3.5, y: 3.8, w: 4.5, h: 4.5, fill: { color: C.cyan, transparency: 90 }, line: { color: C.cyan, width: 0 } });

    // Gold accent
    s.addShape("rect", { x: 0, y: 5.555, w: 10, h: 0.07, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });

    // Central thank you
    s.addText("Thank You", { x: 0.5, y: 1.2, w: 9, h: 1.2, fontSize: 60, fontFace: "Calibri", bold: true, color: C.white, align: "center", margin: 0 });
    s.addText("for your attention", { x: 0.5, y: 2.38, w: 9, h: 0.55, fontSize: 22, fontFace: "Calibri", color: C.gold, align: "center", margin: 0 });

    s.addShape("rect", { x: 3.5, y: 3.05, w: 3, h: 0.04, fill: { color: C.cyan, transparency: 30 }, line: { color: C.cyan, width: 0 } });

    s.addText("Financial Sectors — Smart Investing in India", {
      x: 0.5, y: 3.22, w: 9, h: 0.45, fontSize: 14, fontFace: "Calibri", color: C.grayL, align: "center", margin: 0
    });
    s.addText("Invest Smart  |  Diversify Wisely  |  Build Generational Wealth", {
      x: 0.5, y: 3.72, w: 9, h: 0.4, fontSize: 12, fontFace: "Calibri", color: C.gray, align: "center", charSpacing: 1, margin: 0
    });

    // Bottom tag
    s.addShape("rect", { x: 0, y: 5.2, w: 10, h: 0.35, fill: { color: C.navyMid }, line: { color: C.navyMid, width: 0 } });
    s.addText("For Professional Use Only  |  Financial Sectors Series  |  India 2024–2025", {
      x: 0.5, y: 5.22, w: 9, h: 0.3, fontSize: 9, fontFace: "Calibri", color: C.gray, align: "center", charSpacing: 1, margin: 0
    });
  }

  // ─── Save ──────────────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "/mnt/user-data/outputs/Smart_Investing_India.pptx" });
  console.log("✅ Presentation saved successfully.");
}

build().catch(err => { console.error("❌ Error:", err); process.exit(1); });
