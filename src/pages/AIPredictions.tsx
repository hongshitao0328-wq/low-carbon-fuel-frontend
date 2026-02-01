import { useState } from 'react';
import { TrendingUp, Brain, Download, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';

const historicalData = [
  { date: 'Nov 1', actual: 445, predicted: null, lower: null, upper: null },
  { date: 'Nov 4', actual: 448, predicted: null, lower: null, upper: null },
  { date: 'Nov 7', actual: 447, predicted: null, lower: null, upper: null },
  { date: 'Nov 10', actual: 450, predicted: null, lower: null, upper: null },
  { date: 'Nov 13', actual: 449, predicted: null, lower: null, upper: null },
  { date: 'Nov 16', actual: 452, predicted: null, lower: null, upper: null },
  { date: 'Nov 19', actual: 450, predicted: null, lower: null, upper: null },
  { date: 'Nov 20', actual: 450, predicted: 450, lower: 445, upper: 455 },
  { date: 'Nov 21', actual: null, predicted: 453, lower: 447, upper: 459 },
  { date: 'Nov 22', actual: null, predicted: 456, lower: 449, upper: 463 },
  { date: 'Nov 23', actual: null, predicted: 459, lower: 451, upper: 467 },
  { date: 'Nov 24', actual: null, predicted: 462, lower: 453, upper: 471 },
  { date: 'Nov 25', actual: null, predicted: 465, lower: 455, upper: 475 },
  { date: 'Nov 26', actual: null, predicted: 468, lower: 457, upper: 479 },
  { date: 'Nov 27', actual: null, predicted: 471, lower: 459, upper: 483 },
];

const dailyPredictions = [
  { date: 'Nov 21, 2024', predicted: '$453.00', lower: '$447.00', upper: '$459.00', confidence: '95%' },
  { date: 'Nov 22, 2024', predicted: '$456.00', lower: '$449.00', upper: '$463.00', confidence: '92%' },
  { date: 'Nov 23, 2024', predicted: '$459.00', lower: '$451.00', upper: '$467.00', confidence: '89%' },
  { date: 'Nov 24, 2024', predicted: '$462.00', lower: '$453.00', upper: '$471.00', confidence: '86%' },
  { date: 'Nov 25, 2024', predicted: '$465.00', lower: '$455.00', upper: '$475.00', confidence: '83%' },
  { date: 'Nov 26, 2024', predicted: '$468.00', lower: '$457.00', upper: '$479.00', confidence: '80%' },
  { date: 'Nov 27, 2024', predicted: '$471.00', lower: '$459.00', upper: '$483.00', confidence: '77%' },
];

export function AIPredictions() {
  const [selectedFuel, setSelectedFuel] = useState('Methanol');
  const [timeHorizon, setTimeHorizon] = useState('7days');
  const [model, setModel] = useState('lstm-prophet');

  return (
    <div className="p-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">AI Predictions / AI预测</h1>
          <p className="text-gray-600">Advanced machine learning price forecasting for marine fuels</p>
        </div>

        {/* Prediction Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-[#1E40AF]" />
            <h2 className="text-gray-900">Prediction Settings / 预测设置</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Fuel Type / 燃料类型</label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="Methanol">Methanol / 甲醇</option>
                <option value="Ammonia">Ammonia / 氨</option>
                <option value="VLSFO">VLSFO</option>
                <option value="LNG">LNG</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Time Horizon / 时间范围</label>
              <select
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="7days">7 Days / 7天</option>
                <option value="30days">30 Days / 30天</option>
                <option value="90days">90 Days / 90天</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Model / 模型</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="lstm-prophet">LSTM-Prophet Hybrid</option>
                <option value="lstm">LSTM Only</option>
                <option value="prophet">Prophet Only</option>
                <option value="arima">ARIMA</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-blue-800 transition-colors">
                Generate Forecast / 生成预测
              </button>
            </div>
          </div>
        </div>

        {/* Forecast Visualization */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 mb-1">Price Forecast Visualization / 价格预测可视化</h2>
              <p className="text-gray-600">7-day forecast with 95% confidence interval</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Download Forecast
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-blue-700 mb-1">Current Price / 当前价格</p>
              <p className="text-2xl text-blue-900">$450.00</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <p className="text-sm text-green-700 mb-1">7-Day Avg Forecast / 7天平均预测</p>
              <p className="text-2xl text-green-900">$461.29</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
              <p className="text-sm text-indigo-700 mb-1">Trend / 趋势</p>
              <p className="text-2xl text-indigo-900 flex items-center gap-2">
                +2.5% <TrendingUp className="w-5 h-5" />
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <p className="text-sm text-purple-700 mb-1">Model Accuracy (MAPE)</p>
              <p className="text-2xl text-purple-900">4.2%</p>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={[430, 490]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="upper"
                stackId="1"
                stroke="none"
                fill="#93c5fd"
                fillOpacity={0.3}
                name="Upper Bound"
              />
              <Area
                type="monotone"
                dataKey="lower"
                stackId="1"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
                name="Lower Bound"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#1E40AF"
                strokeWidth={3}
                dot={{ fill: '#1E40AF', r: 4 }}
                name="Historical Price"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#10B981"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: '#10B981', r: 4 }}
                name="Predicted Price"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Prediction Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-gray-900 mb-4">Daily Predictions / 每日预测</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-gray-700">Date / 日期</th>
                  <th className="text-left py-3 px-4 text-gray-700">Predicted Price / 预测价格</th>
                  <th className="text-left py-3 px-4 text-gray-700">Lower Bound / 下限</th>
                  <th className="text-left py-3 px-4 text-gray-700">Upper Bound / 上限</th>
                  <th className="text-left py-3 px-4 text-gray-700">Confidence / 置信度</th>
                </tr>
              </thead>
              <tbody>
                {dailyPredictions.map((pred, index) => {
                  const confidence = parseInt(pred.confidence);
                  let confidenceColor = 'bg-green-100 text-green-800';
                  if (confidence < 85) confidenceColor = 'bg-yellow-100 text-yellow-800';
                  if (confidence < 80) confidenceColor = 'bg-orange-100 text-orange-800';

                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-4 text-gray-900">{pred.date}</td>
                      <td className="py-4 px-4 text-gray-900">{pred.predicted}</td>
                      <td className="py-4 px-4 text-gray-700">{pred.lower}</td>
                      <td className="py-4 px-4 text-gray-700">{pred.upper}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${confidenceColor}`}>
                          {pred.confidence}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Model Information */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#1E40AF] rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-4">Model Information / 模型信息</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Algorithm / 算法:</p>
                  <p className="text-gray-900">LSTM + Prophet Hybrid</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Training Data / 训练数据:</p>
                  <p className="text-gray-900">90 days historical</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Features / 特征:</p>
                  <p className="text-gray-900">Price, Volume, Crude Oil, Natural Gas, Seasonality</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Trained / 最后训练:</p>
                  <p className="text-gray-900">2024-11-20 08:00 UTC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}