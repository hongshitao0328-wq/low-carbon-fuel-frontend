import { Droplet, Zap, Leaf, DollarSign, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { EnhancedKPICard } from '../components/EnhancedKPICard';
import { PriceChart } from '../components/PriceChart';
import { EnhancedFuelTable } from '../components/EnhancedFuelTable';

export function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="p-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-2">{t('pageTitle')}</h1>
              <p className="text-gray-600">{t('pageSubtitle')}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {t('updatedAgo')}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <EnhancedKPICard
            title={t('vlsfoPrice')}
            value="$547.23"
            unit="/MT"
            change="+2.3%"
            trend="up"
            icon={<Droplet className="w-6 h-6" />}
            color="blue"
            technicalData={{
              heatValue: '42.7 MJ/kg',
              carbonIntensity: '77.4 gCO₂/MJ',
            }}
          />
          <EnhancedKPICard
            title={t('methanolEquiv')}
            value="$876.20"
            unit="/MT"
            change="-1.2%"
            trend="down"
            icon={<Zap className="w-6 h-6" />}
            color="green"
            technicalData={{
              marketPrice: '$450.00/MT',
              energyEquiv: '$965.58/MT',
              heatValue: '19.9 MJ/kg (0.47x)',
              carbonAdjusted: '$939.10/MT',
              carbonSavings: '$26.47/MT',
            }}
          />
          <EnhancedKPICard
            title={t('ammoniaEquiv')}
            value="$1,124.80"
            unit="/MT"
            change="+4.1%"
            trend="up"
            icon={<Leaf className="w-6 h-6" />}
            color="teal"
            technicalData={{
              marketPrice: '$600.00/MT',
              energyEquiv: '$1,377.42/MT',
              heatValue: '18.6 MJ/kg (0.44x)',
              carbonAdjusted: '$1,197.61/MT',
              zeroCarbon: true,
            }}
          />
          <EnhancedKPICard
            title={t('carbonCredit')}
            value="$50.00"
            unit="/tCO₂"
            change="+0.8%"
            trend="up"
            icon={<DollarSign className="w-6 h-6" />}
            color="indigo"
            technicalData={{
              reference: 'EU ETS',
            }}
          />
        </div>

        {/* Formula Explanation Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#1E40AF] rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-3">Energy Equivalent Price Calculation Formula</h3>
              <div className="bg-white rounded-lg p-4 mb-3 border border-blue-100">
                <code className="text-sm text-gray-800">
                  Energy Equivalent Price = Market Price × (VLSFO Heat Value ÷ Fuel Heat Value)
                </code>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <code className="text-sm text-gray-800">
                  Carbon Adjusted Price = Energy Equiv - (Carbon Savings × Carbon Credit Price)
                </code>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Example: Methanol at $450/MT with 19.9 MJ/kg heat value → Energy Equiv = $450 × (42.7 ÷ 19.9) = $965.58/MT
              </p>
            </div>
          </div>
        </div>

        {/* Price Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 mb-1">{t('priceTrend')}</h2>
              <p className="text-gray-600">{t('priceTrendSubtitle')}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                7D
              </button>
              <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-md">
                30D
              </button>
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                90D
              </button>
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                1Y
              </button>
            </div>
          </div>
          <PriceChart />
        </div>

        {/* Fuel Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-1">{t('fuelComparison')}</h2>
            <p className="text-gray-600">{t('fuelComparisonSubtitle')}</p>
          </div>
          <EnhancedFuelTable />
        </div>
      </div>
    </div>
  );
}