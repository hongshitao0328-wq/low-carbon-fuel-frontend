import { MapPin, Filter, Download } from 'lucide-react';
import { useState } from 'react';

export function PriceIndex() {
  const [selectedPort, setSelectedPort] = useState('Singapore');
  const [selectedFuel, setSelectedFuel] = useState('All');

  const ports = [
    { name: 'Singapore', nameZh: '新加坡', price: '$547.23', change: '+2.3%', trend: 'up', updated: '5 mins ago' },
    { name: 'Rotterdam', nameZh: '鹿特丹', price: '$552.10', change: '+1.8%', trend: 'up', updated: '8 mins ago' },
    { name: 'Houston', nameZh: '休斯顿', price: '$543.50', change: '-0.5%', trend: 'down', updated: '12 mins ago' },
    { name: 'Shanghai', nameZh: '上海', price: '$549.00', change: '+3.1%', trend: 'up', updated: '3 mins ago' },
    { name: 'Ningbo', nameZh: '宁波', price: '$548.75', change: '+2.8%', trend: 'up', updated: '6 mins ago' },
    { name: 'Fujairah', nameZh: '富查伊拉', price: '$545.20', change: '+1.2%', trend: 'up', updated: '10 mins ago' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Price Index / 价格指数</h1>
          <p className="text-gray-600">Real-time fuel pricing across major bunkering ports worldwide</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Filters:</span>
            </div>
            <select
              value={selectedPort}
              onChange={(e) => setSelectedPort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="All">All Ports</option>
              {ports.map(port => (
                <option key={port.name} value={port.name}>{port.name} / {port.nameZh}</option>
              ))}
            </select>
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="All">All Fuel Types</option>
              <option value="VLSFO">VLSFO</option>
              <option value="Methanol">Methanol</option>
              <option value="Ammonia">Ammonia</option>
              <option value="LNG">LNG</option>
              <option value="Biodiesel">Biodiesel</option>
            </select>
            <div className="flex gap-2 ml-auto">
              <input
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                defaultValue="2024-11-01"
              />
              <input
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                defaultValue="2024-11-20"
              />
              <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-blue-800 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Price Board */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">Real-time Price Board / 实时价格看板</h2>
          <div className="grid grid-cols-3 gap-6">
            {ports.map((port) => (
              <div key={port.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#1E40AF]" />
                    <div>
                      <h3 className="text-gray-900">{port.name}</h3>
                      <p className="text-sm text-gray-500">{port.nameZh}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    port.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {port.change}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">VLSFO Price</p>
                  <p className="text-3xl text-gray-900">{port.price}</p>
                  <p className="text-xs text-gray-500 mt-1">per metric ton</p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">{port.updated}</span>
                  </div>
                  <button className="text-sm text-[#1E40AF] hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Price Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 mb-1">Historical Price Trends / 历史价格趋势</h2>
              <p className="text-gray-600">Interactive chart with technical indicators</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Line Chart
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Candlestick
              </button>
              <button className="px-4 py-2 flex items-center gap-2 bg-[#1E40AF] text-white rounded-lg hover:bg-blue-800 transition-colors">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
          <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Interactive chart placeholder - Historical price data visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
}