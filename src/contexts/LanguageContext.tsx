import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    appTitle: 'Marine Fuel Index',
    appSubtitle: 'Low Carbon Solutions',
    searchPlaceholder: 'Search fuel types, ports, or market data...',
    user: 'John Maritime',
    userRole: 'Analyst',
    
    // Sidebar
    dashboard: 'Dashboard',
    priceIndex: 'Price Index',
    aiPredictions: 'AI Predictions',
    aiChat: 'AI Chat',
    reports: 'Reports',
    settings: 'Settings',
    helpSupport: 'Help & Support',
    marketStatus: 'Market Status',
    livePricing: 'Live pricing active',
    lastUpdate: 'Last Update',
    activePorts: 'Active Ports',
    
    // Dashboard
    pageTitle: 'Low Carbon Marine Fuel Price Index',
    pageSubtitle: 'Real-time pricing and intelligent analysis for sustainable marine fuels',
    updatedAgo: 'Updated 5 mins ago',
    
    // KPI Cards
    vlsfoPrice: 'VLSFO Price',
    methanolEquiv: 'Methanol Equivalent',
    ammoniaEquiv: 'Ammonia Equivalent',
    carbonCredit: 'Carbon Credit',
    marketPrice: 'Market Price',
    energyEquiv: 'Energy Equivalent',
    heatValue: 'Heat Value',
    carbonAdjusted: 'Carbon Adjusted',
    carbonSavings: 'Carbon Savings',
    carbonIntensity: 'Carbon Intensity',
    zeroCarbon: 'Zero Carbon Fuel',
    
    // Charts
    priceTrend: 'Price Trend Analysis',
    priceTrendSubtitle: '30-day fuel price comparison',
    
    // Table
    fuelComparison: 'Fuel Comparison Table',
    fuelComparisonSubtitle: 'Detailed pricing and emissions data across fuel types',
    fuelType: 'Fuel Type',
    currentPrice: 'Market Price',
    change24h: '24h Change',
    co2Emissions: 'CO₂ Emissions',
    energyRatio: 'Energy Ratio',
    energyEquivPrice: 'Energy Equiv Price',
    availability: 'Availability',
    marketShare: 'Market Share',
    region: 'Region',
    status: 'Status',
  },
  zh: {
    // Navbar
    appTitle: '船用燃料指数',
    appSubtitle: '低碳解决方案',
    searchPlaceholder: '搜索燃料类型、港口或市场数据...',
    user: '张海运',
    userRole: '分析师',
    
    // Sidebar
    dashboard: '仪表板',
    priceIndex: '价格指数',
    aiPredictions: 'AI预测',
    aiChat: 'AI助手',
    reports: '报告',
    settings: '设置',
    helpSupport: '帮助与支持',
    marketStatus: '市场状态',
    livePricing: '实时定价已激活',
    lastUpdate: '最后更新',
    activePorts: '活跃港口',
    
    // Dashboard
    pageTitle: '船用低碳燃料价格指数',
    pageSubtitle: '可持续船用燃料的实时定价与智能分析',
    updatedAgo: '5分钟前更新',
    
    // KPI Cards
    vlsfoPrice: 'VLSFO价格',
    methanolEquiv: '甲醇当量',
    ammoniaEquiv: '氨当量',
    carbonCredit: '碳信用',
    marketPrice: '市场价格',
    energyEquiv: '能量当量',
    heatValue: '热值',
    carbonAdjusted: '碳调整价',
    carbonSavings: '碳节省',
    carbonIntensity: '碳强度',
    zeroCarbon: '零碳燃料',
    
    // Charts
    priceTrend: '价格趋势分析',
    priceTrendSubtitle: '30天燃料价格对比',
    
    // Table
    fuelComparison: '燃料对比表',
    fuelComparisonSubtitle: '各燃料类型的详细定价和排放数据',
    fuelType: '燃料类型',
    currentPrice: '市场价格',
    change24h: '24小时变化',
    co2Emissions: 'CO₂排放',
    energyRatio: '能量比',
    energyEquivPrice: '能量当量价',
    availability: '可用性',
    marketShare: '市场份额',
    region: '地区',
    status: '状态',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
