import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const fuelData = [
  {
    fuelType: 'VLSFO',
    currentPrice: '$682.50',
    change: '+2.3%',
    trend: 'up',
    co2Emissions: '3.114',
    availability: 'High',
    marketShare: '68%',
    region: 'Global'
  },
  {
    fuelType: 'Methanol',
    currentPrice: '$876.20',
    change: '-1.2%',
    trend: 'down',
    co2Emissions: '1.375',
    availability: 'Medium',
    marketShare: '8%',
    region: 'Global'
  },
  {
    fuelType: 'Ammonia',
    currentPrice: '$1,124.80',
    change: '+4.1%',
    trend: 'up',
    co2Emissions: '0.000',
    availability: 'Low',
    marketShare: '2%',
    region: 'Limited'
  },
  {
    fuelType: 'LNG',
    currentPrice: '$945.30',
    change: '0.0%',
    trend: 'neutral',
    co2Emissions: '2.750',
    availability: 'Medium',
    marketShare: '15%',
    region: 'Global'
  },
  {
    fuelType: 'Bio-LNG',
    currentPrice: '$1,285.00',
    change: '+1.5%',
    trend: 'up',
    co2Emissions: '0.275',
    availability: 'Low',
    marketShare: '1%',
    region: 'Europe'
  },
  {
    fuelType: 'Hydrogen',
    currentPrice: '$2,450.00',
    change: '-0.8%',
    trend: 'down',
    co2Emissions: '0.000',
    availability: 'Very Low',
    marketShare: '<1%',
    region: 'Limited'
  },
];

export function FuelTable() {
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
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-gray-700">Fuel Type</th>
            <th className="text-left py-3 px-4 text-gray-700">Current Price</th>
            <th className="text-left py-3 px-4 text-gray-700">24h Change</th>
            <th className="text-left py-3 px-4 text-gray-700">CO₂ Emissions (kg/kg fuel)</th>
            <th className="text-left py-3 px-4 text-gray-700">Availability</th>
            <th className="text-left py-3 px-4 text-gray-700">Market Share</th>
            <th className="text-left py-3 px-4 text-gray-700">Region</th>
          </tr>
        </thead>
        <tbody>
          {fuelData.map((fuel, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4">
                <span className="text-gray-900">{fuel.fuelType}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-gray-900">{fuel.currentPrice}</span>
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
                <span className="text-gray-700">{fuel.co2Emissions}</span>
              </td>
              <td className="py-4 px-4">
                <span className={`px-2 py-1 rounded-full text-xs ${getAvailabilityColor(fuel.availability)}`}>
                  {fuel.availability}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                    <div 
                      className="bg-[#1E40AF] h-2 rounded-full" 
                      style={{ width: fuel.marketShare }}
                    ></div>
                  </div>
                  <span className="text-gray-700 text-xs">{fuel.marketShare}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-gray-700">{fuel.region}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
