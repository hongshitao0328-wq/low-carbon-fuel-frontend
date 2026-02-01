import { LayoutDashboard, TrendingUp, Brain, MessageSquare, FileText, Settings, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: t('dashboard') },
    { id: 'priceIndex', icon: <TrendingUp className="w-5 h-5" />, label: t('priceIndex') },
    { id: 'aiPredictions', icon: <Brain className="w-5 h-5" />, label: t('aiPredictions') },
    { id: 'aiChat', icon: <MessageSquare className="w-5 h-5" />, label: t('aiChat') },
    { id: 'reports', icon: <FileText className="w-5 h-5" />, label: t('reports') },
  ];

  const bottomItems = [
    { icon: <Settings className="w-5 h-5" />, label: t('settings') },
    { icon: <HelpCircle className="w-5 h-5" />, label: t('helpSupport') },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-6">
          <p className="text-xs text-gray-500 px-3 mb-3 uppercase tracking-wider">Main Menu</p>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#1E40AF] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Market Status */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-900">{t('marketStatus')}</p>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <p className="text-xs text-blue-700 mb-3">{t('livePricing')}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-blue-700">{t('lastUpdate')}</span>
                <span className="text-blue-900">2 min ago</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-blue-700">{t('activePorts')}</span>
                <span className="text-blue-900">247</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 px-4 py-4">
          <ul className="space-y-1">
            {bottomItems.map((item, index) => (
              <li key={index}>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
