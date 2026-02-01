import { FileText, Download, Calendar, CheckCircle, Clock, Eye } from 'lucide-react';

export function Reports() {
  const recentReports = [
    {
      title: 'Weekly Market Analysis',
      titleZh: '每周市场分析',
      date: 'Nov 13-20, 2024',
      type: 'Weekly Summary / 每周总结',
      status: 'Ready / 已完成',
      statusColor: 'green',
      size: '2.4 MB',
      pages: 12,
    },
    {
      title: 'Methanol Forecast Report',
      titleZh: '甲醇预测报告',
      date: 'Nov 20, 2024',
      type: 'Prediction Analysis / 预测分析',
      status: 'Ready / 已完成',
      statusColor: 'green',
      size: '1.8 MB',
      pages: 8,
    },
    {
      title: 'Carbon Credit Analysis',
      titleZh: '碳信用分析',
      date: 'Nov 18, 2024',
      type: 'Market Research / 市场研究',
      status: 'Ready / 已完成',
      statusColor: 'green',
      size: '3.2 MB',
      pages: 15,
    },
    {
      title: 'Q4 2024 Fuel Trends',
      titleZh: '2024年第四季度燃料趋势',
      date: 'Nov 15, 2024',
      type: 'Quarterly Report / 季度报告',
      status: 'Processing / 处理中',
      statusColor: 'yellow',
      size: 'Generating...',
      pages: 0,
    },
    {
      title: 'Port Price Comparison',
      titleZh: '港口价格对比',
      date: 'Nov 12, 2024',
      type: 'Comparative Analysis / 对比分析',
      status: 'Ready / 已完成',
      statusColor: 'green',
      size: '2.1 MB',
      pages: 10,
    },
    {
      title: 'Ammonia Market Overview',
      titleZh: '氨市场概述',
      date: 'Nov 10, 2024',
      type: 'Market Overview / 市场概览',
      status: 'Ready / 已完成',
      statusColor: 'green',
      size: '1.5 MB',
      pages: 7,
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Reports / 报告</h1>
          <p className="text-gray-600">Generate and download comprehensive market analysis reports</p>
        </div>

        {/* Report Generator */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-6 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[#1E40AF] rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">Generate New Report / 生成新报告</h2>
              <p className="text-gray-600">Create custom reports with your preferred parameters</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Report Type / 报告类型</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] bg-white">
                <option value="daily">Daily Market Summary / 每日市场摘要</option>
                <option value="weekly">Weekly Analysis / 每周分析</option>
                <option value="monthly">Monthly Overview / 月度概览</option>
                <option value="forecast">Price Forecast / 价格预测</option>
                <option value="comparison">Fuel Comparison / 燃料对比</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Date Range / 日期范围</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] bg-white">
                <option value="7days">Last 7 Days / 最近7天</option>
                <option value="30days">Last 30 Days / 最近30天</option>
                <option value="90days">Last 90 Days / 最近90天</option>
                <option value="custom">Custom Range / 自定义</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Fuel Types / 燃料类型</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] bg-white">
                <option value="all">All Fuels / 所有燃料</option>
                <option value="vlsfo">VLSFO Only</option>
                <option value="methanol">Methanol Only / 仅甲醇</option>
                <option value="ammonia">Ammonia Only / 仅氨</option>
                <option value="lng">LNG Only</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-blue-800 transition-colors">
                Generate Report / 生成报告
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 p-3 bg-white rounded-lg border border-blue-100">
            <input type="checkbox" id="priceData" className="mt-1" defaultChecked />
            <label htmlFor="priceData" className="flex-1 text-sm text-gray-700">
              Include Price Data / 包含价格数据
            </label>
            <input type="checkbox" id="predictions" className="mt-1" defaultChecked />
            <label htmlFor="predictions" className="flex-1 text-sm text-gray-700">
              Include Predictions / 包含预测
            </label>
            <input type="checkbox" id="comparisons" className="mt-1" defaultChecked />
            <label htmlFor="comparisons" className="flex-1 text-sm text-gray-700">
              Include Comparisons / 包含对比
            </label>
            <input type="checkbox" id="charts" className="mt-1" defaultChecked />
            <label htmlFor="charts" className="flex-1 text-sm text-gray-700">
              Include Charts / 包含图表
            </label>
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <h2 className="text-gray-900 mb-4">Recent Reports / 最近报告</h2>
          <div className="grid grid-cols-3 gap-6">
            {recentReports.map((report, index) => {
              const statusIcons = {
                green: <CheckCircle className="w-5 h-5 text-green-600" />,
                yellow: <Clock className="w-5 h-5 text-yellow-600" />,
              };

              const statusBgColors = {
                green: 'bg-green-50 border-green-200',
                yellow: 'bg-yellow-50 border-yellow-200',
              };

              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-sm border-2 p-6 hover:shadow-md transition-all ${statusBgColors[report.statusColor as keyof typeof statusBgColors]}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-gray-600" />
                    </div>
                    {statusIcons[report.statusColor as keyof typeof statusIcons]}
                  </div>

                  <h3 className="text-gray-900 mb-1">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{report.titleZh}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{report.date}</span>
                    </div>
                    <div className="text-sm text-gray-600">{report.type}</div>
                    <div className="text-sm text-gray-600">
                      {report.pages > 0 && `${report.pages} pages • `}
                      {report.size}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-3">{report.status}</p>
                    {report.statusColor === 'green' ? (
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          <Eye className="w-4 h-4" />
                          View / 查看
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-blue-800 transition-colors text-sm">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-2 text-sm text-yellow-700">
                        Processing...
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Sources Footer */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Data Sources & Information / 数据来源与信息</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm text-gray-700 mb-2">Data Sources / 数据来源:</h4>
              <p className="text-sm text-gray-600">
                Argus Media, S&P Platts, Ship & Bunker, EIA, Bloomberg
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-700 mb-2">Powered By / 技术支持:</h4>
              <p className="text-sm text-gray-600">
                AI Prediction Models (LSTM + Prophet Hybrid)
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-700 mb-2">Last Update / 最后更新:</h4>
              <p className="text-sm text-gray-600">Nov 20, 2024 - 10:30 UTC</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-700 mb-2">Data Refresh / 数据刷新:</h4>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Every 5 minutes / 每5分钟
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}