import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Users, Download, BarChart3 } from 'lucide-react';
import ReportFilters from './ReportFilters';

const mockFinancialData = {
  totalRevenue: 2450000,
  revenueGrowth: 12.5,
  totalCharges: 45280,
  chargesGrowth: 8.5,
  arpu: 54.12,
  arpuGrowth: 3.2
};

const mockRevenueEvolution = [
  { month: 'Jan', revenue: 380000, charges: 6800, arpu: 55.88 },
  { month: 'Feb', revenue: 420000, charges: 7200, arpu: 58.33 },
  { month: 'Mar', revenue: 390000, charges: 6900, arpu: 56.52 },
  { month: 'Apr', revenue: 450000, charges: 7800, arpu: 57.69 },
  { month: 'May', revenue: 480000, charges: 8200, arpu: 58.54 },
  { month: 'Jun', revenue: 530000, charges: 8380, arpu: 63.25 }
];

const mockRevenueByProvider = [
  { provider: 'Digital Virgo', revenue: 980000, charges: 18500, arpu: 52.97, percentage: 40.0 },
  { provider: 'Timwe', revenue: 820000, charges: 15200, arpu: 53.95, percentage: 33.5 },
  { provider: 'Renxo', revenue: 650000, charges: 11580, arpu: 56.14, percentage: 26.5 }
];

const mockRevenueByProduct = [
  { product: 'Premium Streaming', provider: 'Digital Virgo', revenue: 680000, charges: 12800, arpu: 53.13 },
  { product: 'Gaming Plus Pro', provider: 'Timwe', revenue: 420000, charges: 9200, arpu: 45.65 },
  { product: 'Music Unlimited', provider: 'Renxo', revenue: 380000, charges: 8500, arpu: 44.71 },
  { product: 'Video Pro', provider: 'Digital Virgo', revenue: 350000, charges: 7800, arpu: 44.87 },
  { product: 'Book Library', provider: 'Timwe', revenue: 320000, charges: 6980, arpu: 45.84 }
];

const mockARPUByCategory = [
  { category: 'Games', arpu: 48.50, users: 8500, revenue: 412250 },
  { category: 'Videos', arpu: 62.30, users: 7200, revenue: 448560 },
  { category: 'Music', arpu: 55.80, users: 5800, revenue: 323640 },
  { category: 'Books', arpu: 42.10, users: 3900, revenue: 164190 },
  { category: 'Others', arpu: 38.90, users: 2190, revenue: 85191 }
];

const mockChargesByChannel = [
  { channel: 'HE (Header Enrichment)', charges: 18500, percentage: 40.9, revenue: 980000 },
  { channel: 'WIFI', charges: 12800, percentage: 28.3, revenue: 680000 },
  { channel: 'SMS', charges: 8200, percentage: 18.1, revenue: 435000 },
  { channel: 'SAT PUSH', charges: 3980, percentage: 8.8, revenue: 211000 },
  { channel: 'USSD', charges: 1800, percentage: 4.0, revenue: 95000 }
];

export default function FinancialReport() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-06-30'
  });

  const maxRevenue = Math.max(...mockRevenueEvolution.map(d => d.revenue));
  const maxCharges = Math.max(...mockRevenueEvolution.map(d => d.charges));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Financial Report</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${mockFinancialData.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+{mockFinancialData.revenueGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs previous month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Charges</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockFinancialData.totalCharges.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+{mockFinancialData.chargesGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs previous month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ARPU</p>
              <p className="text-2xl font-bold text-gray-900">
                ${mockFinancialData.arpu}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+{mockFinancialData.arpuGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs previous month</span>
          </div>
        </div>
      </div>

      {/* Revenue and Charges Evolution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue and Charges Evolution</h3>

        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-2">
            {mockRevenueEvolution.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full flex space-x-1">
                  {/* Revenue Bar */}
                  <div
                    className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.revenue / maxRevenue) * 200}px` }}
                    title={`Revenue: $${item.revenue.toLocaleString()}`}
                  ></div>
                  {/* Charges Bar (scaled) */}
                  <div
                    className="w-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.charges / maxCharges) * 200}px` }}
                    title={`Charges: ${item.charges.toLocaleString()}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                <div className="text-xs text-gray-500">${(item.revenue / 1000).toFixed(0)}K</div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Revenue ($)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Charges (Volume)</span>
          </div>
        </div>
      </div>

      {/* ARPU Evolution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">ARPU (Average Revenue Per User) Evolution</h3>

        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-2">
            {mockRevenueEvolution.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.arpu / 70) * 200}px` }}
                    title={`ARPU: $${item.arpu.toFixed(2)}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                <div className="text-xs text-gray-500">${item.arpu.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Current ARPU: <strong>${mockFinancialData.arpu}</strong> | 
            Growth: <strong className="text-green-600">+{mockFinancialData.arpuGrowth}%</strong>
          </p>
        </div>
      </div>

      {/* Revenue and ARPU by Provider */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue and ARPU by Provider</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Charges
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ARPU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Total Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRevenueByProvider.map((provider, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {provider.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    ${provider.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                    {provider.charges.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                    ${provider.arpu.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {provider.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Distribution by Provider */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue Distribution by Provider</h3>
        
        <div className="space-y-4">
          {mockRevenueByProvider.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.provider}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">${item.revenue.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">
                    ARPU: ${item.arpu.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ARPU by Category */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">ARPU by Category</h3>
        
        <div className="space-y-4">
          {mockARPUByCategory.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.category}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-purple-600">${item.arpu.toFixed(2)}</span>
                  <span className="text-xs text-gray-500">
                    {item.users.toLocaleString()} users
                  </span>
                </div>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(item.arpu / 70) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charges by Channel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Charges by Contracting Channel</h3>
        
        <div className="space-y-4">
          {mockChargesByChannel.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.channel}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">{item.charges.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">
                    ${item.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products by Revenue */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Top Products by Revenue</h3>
        
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
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Charges
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ARPU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Total Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRevenueByProduct.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {product.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    ${product.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                    {product.charges.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                    ${product.arpu.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {((product.revenue / mockFinancialData.totalRevenue) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}