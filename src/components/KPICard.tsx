import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'teal' | 'indigo';
}

export function KPICard({ title, value, unit, change, trend, icon, color }: KPICardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    teal: 'bg-teal-100 text-teal-700',
    indigo: 'bg-indigo-100 text-indigo-700',
  };

  const trendColorClasses = trend === 'up' 
    ? 'text-green-700 bg-green-100' 
    : 'text-red-700 bg-red-100';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${trendColorClasses}`}>
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <div>
        <p className="text-gray-600 mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-gray-900 text-3xl">{value}</span>
          <span className="text-gray-500">{unit}</span>
        </div>
      </div>
    </div>
  );
}
