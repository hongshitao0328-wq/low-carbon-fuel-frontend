import { useState } from 'react';
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';

interface EnhancedKPICardProps {
  title: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'teal' | 'indigo';
  technicalData?: Record<string, any>;
}

export function EnhancedKPICard({ title, value, unit, change, trend, icon, color, technicalData }: EnhancedKPICardProps) {
  const [expanded, setExpanded] = useState(false);

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all">
      <div className="p-6">
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
        
        {technicalData && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:text-gray-900 border-t border-gray-100"
          >
            <span>Technical Details</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>
      
      {expanded && technicalData && (
        <div className="px-6 pb-6 pt-0">
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {Object.entries(technicalData).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className="text-gray-900">
                  {typeof value === 'boolean' ? (value ? '✓ Yes' : 'No') : value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
