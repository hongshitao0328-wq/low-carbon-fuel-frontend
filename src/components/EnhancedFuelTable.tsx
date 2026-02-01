import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const fuelData = [
  {
    fuelType: 'VLSFO',
    marketPrice: '$547.23',
    heatValue: '42.7',
    energyRatio: '1.00',
    energyEquivPrice: '$547.23',
    carbonIntensity: '77.4',
    carbonAdjusted: '$547.23',
    change: '+2.3%',
    trend: 'up',
    availability: 'High',
    status: '⚫ Base',
  },
  {
    fuelType: 'Methanol',
    marketPrice: '$450.00',
    heatValue: '19.9',
    energyRatio: '0.47',
    energyEquivPrice: '$965.58',
    carbonIntensity: '65.0',
    carbonAdjusted: '$939.10',
    change: '-1.2%',
    trend: 'down',
    availability: 'Medium',
    status: '🟢 Good',
  },
  {
    fuelType: 'Ammonia',
    marketPrice: '$600.00',
    heatValue: '18.6',
    energyRatio: '0.44',
    energyEquivPrice: '$1,377.42',
    carbonIntensity: '0.0',
    carbonAdjusted: '$1,197.61',
    change: '+4.1%',
    trend: 'up',
    availability: 'Low',
    status: '🟡 Fair',
  },
  {
    fuelType: 'LNG',
    marketPrice: '$12.00/MMBtu',
    heatValue: '48.6',
    energyRatio: '1.14',
    energyEquivPrice: '$10.54',
    carbonIntensity: '56.0',
    carbonAdjusted: '-$35.15',
    change: '0.0%',
    trend: 'neutral',
    availability: 'Medium',
    status: '🟢 Good',
  },
  {
    fuelType: 'Biodiesel',
    marketPrice: '$1,200.00',
    heatValue: '37.8',
    energyRatio: '0.89',
    energyEquivPrice: '$1,355.56',
    carbonIntensity: '25.0',
    carbonAdjusted: '$1,243.68',
    change: '+1.5%',
    trend: 'up',
    availability: 'Low',
    status: '🔴 High',
  },
  {
    fuelType: 'HVO',
    marketPrice: '$1,100.00',
    heatValue: '44.0',
    energyRatio: '1.03',
    energyEquivPrice: '$1,063.57',
    carbonIntensity: '20.0',
    carbonAdjusted: '$941.02',
    change: '-0.8%',
    trend: 'down',
    availability: 'Very Low',
    status: '🟡 Fair',
  },
];

export function EnhancedFuelTable() {
  const { t } = useLanguage();

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <ArrowDownRight className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-700 bg-green-50';
    if (trend === 'down') return 'text-red-700 bg-red-50';
    return 'text-gray-700 bg-gray-50';
  };

  const getAvailabilityColor = (availability: string) => {
    if (availability === 'High') return 'bg-green-100 text-green-800';
    if (availability === 'Medium') return 'bg-yellow-100 text-yellow-800';
    if (availability === 'Low') return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gray-50">
            <th className="text-left py-3 px-4 text-gray-700">{t('fuelType')}</th>
            <th className="text-left py-3 px-4 text-gray-700">{t('currentPrice')}</th>
            <th className="text-left py-3 px-4 text-gray-700">{t('heatValue')}<br/><span className="text-xs text-gray-500">(MJ/kg)</span></th>
            <th className="text-left py-3 px-4 text-gray-700">{t('energyRatio')}<br/><span className="text-xs text-gray-500">(vs VLSFO)</span></th>
            <th className="text-left py-3 px-4 text-gray-700">{t('energyEquivPrice')}</th>
            <th className="text-left py-3 px-4 text-gray-700">{t('carbonIntensity')}<br/><span className="text-xs text-gray-500">(gCO₂/MJ)</span></th>
            <th className="text-left py-3 px-4 text-gray-700">{t('carbonAdjusted')}</th>
            <th className="text-left py-3 px-4 text-gray-700">{t('change24h')}</th>
            <th className="text-left py-3 px-4 text-gray-700">{t('availability')}</th>
            <th className="text-left py-3 px-4 text-gray-700">{t('status')}</th>
          </tr>
        </thead>
        <tbody>
          {fuelData.map((fuel, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
              <td className="py-4 px-4">
                <span className="text-gray-900">{fuel.fuelType}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-gray-900">{fuel.marketPrice}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-gray-700">{fuel.heatValue}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-gray-700">{fuel.energyRatio}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-gray-900">{fuel.energyEquivPrice}</span>
              </td>
              <td className="py-4 px-4">
                <span className={fuel.carbonIntensity === '0.0' ? 'text-green-700' : 'text-gray-700'}>
                  {fuel.carbonIntensity}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-gray-900">{fuel.carbonAdjusted}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  {getTrendIcon(fuel.trend)}
                  <span className={`px-2 py-1 rounded text-xs ${getTrendColor(fuel.trend)}`}>
                    {fuel.change}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className={`px-2 py-1 rounded-full text-xs ${getAvailabilityColor(fuel.availability)}`}>
                  {fuel.availability}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-gray-700">{fuel.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
