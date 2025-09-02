import React, { useState } from 'react';
import { CreditCard, TrendingUp, Calendar, Download, DollarSign, Users, BarChart3, AlertTriangle } from 'lucide-react';
import ReportFilters from './ReportFilters';

interface ChargeMetrics {
  totalCharges: number;
  successfulCharges: number;
  failedCharges: number;
  chargeGrowth: number;
  successRate: number;
  totalAmount: number;
  avgChargeAmount: number;
}

const mockChargeData: ChargeMetrics = {
  totalCharges: 45280,
  successfulCharges: 42150,
  failedCharges: 3130,
  chargeGrowth: 8.5,
  successRate: 93.1,
  totalAmount: 2450000,
  avgChargeAmount: 54.12
};

const mockChargeEvolution = [
  { month: 'Jan', total: 6800, successful: 6350, failed: 450, amount: 380000 },
  { month: 'Feb', total: 7200, successful: 6720, failed: 480, amount: 420000 },
  { month: 'Mar', total: 6900, successful: 6440, failed: 460, amount: 390000 },
  { month: 'Apr', total: 7800, successful: 7280, failed: 520, amount: 450000 },
  { month: 'May', total: 8200, successful: 7650, failed: 550, amount: 480000 },
  { month: 'Jun', total: 8380, successful: 7760, failed: 620, amount: 530000 }
];

const mockChargesByProvider = [
  { provider: 'Newry', charges: 18500, successful: 17280, failed: 1220, successRate: 93.4, amount: 980000 },
  { provider: 'Proveedor 1', charges: 15200, successful: 14120, failed: 1080, successRate: 92.9, amount: 820000 },
  { provider: 'Proveedor 2', charges: 11580, successful: 10750, failed: 830, successRate: 92.8, amount: 650000 }
];

const mockChargesByProduct = [
  { product: 'Premium Streaming', provider: 'Newry', charges: 12800, amount: 680000, avgAmount: 53.13 },
  { product: 'Gaming Plus Pro', provider: 'Proveedor 1', charges: 9200, amount: 420000, avgAmount: 45.65 },
  { product: 'Music Unlimited', provider: 'Proveedor 2', charges: 8500, amount: 380000, avgAmount: 44.71 },
  { product: 'Video Pro', provider: 'Newry', charges: 7800, amount: 350000, avgAmount: 44.87 },
  { product: 'Book Library', provider: 'Proveedor 1', charges: 6980, amount: 320000, avgAmount: 45.84 }
];

const mockChargesByType = [
  { type: 'Subscription Charges', charges: 28500, percentage: 62.9, color: 'bg-blue-500', amount: 1540000 },
  { type: 'Renewal Charges', charges: 12800, percentage: 28.3, color: 'bg-green-500', amount: 690000 },
  { type: 'On-Demand Charges', charges: 3980, percentage: 8.8, color: 'bg-purple-500', amount: 220000 }
];

const mockChargesByChannel = [
  { channel: 'HE (Header Enrichment)', charges: 18500, percentage: 40.9, successRate: 94.2 },
  { channel: 'WIFI', charges: 12800, percentage: 28.3, successRate: 91.8 },
  { channel: 'SMS', charges: 8200, percentage: 18.1, successRate: 89.5 },
  { channel: 'SAT PUSH', charges: 3980, percentage: 8.8, successRate: 95.1 },
  { channel: 'USSD', charges: 1800, percentage: 4.0, successRate: 87.3 }
];

const mockChargeVolumeByHour = [
  { hour: '00:00', charges: 1200, successful: 1140, failed: 60 },
  { hour: '02:00', charges: 800, successful: 760, failed: 40 },
  { hour: '04:00', charges: 600, successful: 570, failed: 30 },
  { hour: '06:00', charges: 1400, successful: 1330, failed: 70 },
  { hour: '08:00', charges: 2200, successful: 2090, failed: 110 },
  { hour: '10:00', charges: 2800, successful: 2660, failed: 140 },
  { hour: '12:00', charges: 3200, successful: 3040, failed: 160 },
  { hour: '14:00', charges: 3400, successful: 3230, failed: 170 },
  { hour: '16:00', charges: 3100, successful: 2945, failed: 155 },
  { hour: '18:00', charges: 2900, successful: 2755, failed: 145 },
  { hour: '20:00', charges: 2600, successful: 2470, failed: 130 },
  { hour: '22:00', charges: 2000, successful: 1900, failed: 100 }
];

const mockChargesByDay = [
  { day: 'Monday', charges: 7200, successful: 6840, failed: 360, successRate: 95.0 },
  { day: 'Tuesday', charges: 6800, successful: 6460, failed: 340, successRate: 95.0 },
  { day: 'Wednesday', charges: 6500, successful: 6175, failed: 325, successRate: 95.0 },
  { day: 'Thursday', charges: 6900, successful: 6555, failed: 345, successRate: 95.0 },
  { day: 'Friday', charges: 7800, successful: 7410, failed: 390, successRate: 95.0 },
  { day: 'Saturday', charges: 5200, successful: 4940, failed: 260, successRate: 95.0 },
  { day: 'Sunday', charges: 4880, successful: 4636, failed: 244, successRate: 95.0 }
];

const mockFailureReasons = [
  { reason: 'Insufficient Balance', count: 1420, percentage: 45.4 },
  { reason: 'User Blocked', count: 680, percentage: 21.7 },
  { reason: 'Network Error', count: 520, percentage: 16.6 },
  { reason: 'Invalid User', count: 310, percentage: 9.9 },
  { reason: 'Service Unavailable', count: 200, percentage: 6.4 }
];

export default function FinancialReport() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-06-30'
  });

  const maxCharges = Math.max(...mockChargeEvolution.map(d => d.total));
  const maxHourlyCharges = Math.max(...mockChargeVolumeByHour.map(d => d.charges));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Charges Report</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <ReportFilters 
        type="complete"
        onFiltersChange={setSelectedFilters}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* Charge Volume Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Charges</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockChargeData.totalCharges.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+{mockChargeData.chargeGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Successful Charges</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockChargeData.successfulCharges.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Success Rate: {mockChargeData.successRate}%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed Charges</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockChargeData.failedCharges.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Failure Rate: {(100 - mockChargeData.successRate).toFixed(1)}%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                ${mockChargeData.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Avg: ${mockChargeData.avgChargeAmount}</span>
          </div>
        </div>
      </div>

      {/* Charge Volume Evolution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Charge Volume Evolution</h3>

        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-2">
            {mockChargeEvolution.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full flex space-x-1">
                  {/* Successful Charges Bar */}
                  <div
                    className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.successful / maxCharges) * 200}px` }}
                    title={`Successful: ${item.successful.toLocaleString()}`}
                  ></div>
                  {/* Failed Charges Bar */}
                  <div
                    className="w-3 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.failed / maxCharges) * 200}px` }}
                    title={`Failed: ${item.failed.toLocaleString()}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                <div className="text-xs text-gray-500">{item.total.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Successful Charges</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Failed Charges</span>
          </div>
        </div>
      </div>

      {/* Charge Volume by Hour */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Charge Volume by Hour of Day</h3>

        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-1">
            {mockChargeVolumeByHour.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.charges / maxHourlyCharges) * 200}px` }}
                    title={`${item.hour}: ${item.charges.toLocaleString()} charges`}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600 transform -rotate-45">
                  {item.hour}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Peak hours: <strong>12:00-16:00</strong> | Lowest activity: <strong>02:00-06:00</strong>
          </p>
        </div>
      </div>

      {/* Charge Volume by Day of Week */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Charge Volume by Day of Week</h3>
        
        <div className="space-y-4">
          {mockChargesByDay.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.day}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">{item.charges.toLocaleString()}</span>
                  <span className="text-xs text-green-600 font-medium">
                    {item.successRate}% success
                  </span>
                </div>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(item.charges / Math.max(...mockChargesByDay.map(d => d.charges))) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charges by Provider and Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Provider */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Charges by Provider</h3>
          
          <div className="space-y-4">
            {mockChargesByProvider.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.provider}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{item.charges.toLocaleString()}</span>
                    <span className="text-xs text-green-600 font-medium">
                      {item.successRate}% success
                    </span>
                  </div>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(item.charges / mockChargeData.totalCharges) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Amount: ${item.amount.toLocaleString()}</span>
                  <span>Failed: {item.failed.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Channel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Charges by Channel</h3>
          
          <div className="space-y-4">
            {mockChargesByChannel.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.channel}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900">{item.charges.toLocaleString()}</span>
                    <span className="text-xs text-green-600 font-medium">
                      {item.successRate}% success
                    </span>
                  </div>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charge Type Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Charge Distribution by Type</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockChargesByType.map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${item.percentage * 1.76} 176`}
                    className={item.color.replace('bg-', 'text-')}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{item.percentage}%</span>
                  <span className="text-xs text-gray-500">{item.charges.toLocaleString()}</span>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{item.type}</h4>
              <p className="text-sm text-gray-600">${item.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products by Charges */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Top Products by Charge Volume</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Charges
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg per Charge
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Total Volume
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockChargesByProduct.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {product.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                    {product.charges.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    ${product.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.avgAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {((product.charges / mockChargeData.totalCharges) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charge Failure Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Charge Failure Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Failure Reasons */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-4">Top Failure Reasons</h4>
            <div className="space-y-3">
              {mockFailureReasons.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.reason}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{item.count.toLocaleString()}</span>
                      <span className="text-xs text-red-600 font-medium">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Failure Summary */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-4">Failure Summary</h4>
            <div className="bg-red-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Failed Charges:</span>
                <span className="text-sm font-medium text-red-600">
                  {mockChargeData.failedCharges.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Failure Rate:</span>
                <span className="text-sm font-medium text-red-600">
                  {(100 - mockChargeData.successRate).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Most Common Reason:</span>
                <span className="text-sm font-medium text-gray-900">
                  Insufficient Balance
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Lost Revenue (Est.):</span>
                <span className="text-sm font-medium text-red-600">
                  ${(mockChargeData.failedCharges * mockChargeData.avgChargeAmount).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charge Success Rate by Provider */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Charge Success Rate by Provider</h3>
        
        <div className="space-y-4">
          {mockChargesByProvider.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-24 text-sm font-medium text-gray-600">{item.provider}</div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${item.successRate}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-sm font-medium text-gray-900 text-right">
                {item.successRate}%
              </div>
              <div className="w-32 text-sm text-gray-500 text-right">
                {item.successful.toLocaleString()}/{item.charges.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}