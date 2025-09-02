import React, { useState } from 'react';
import { Calculator, Download, Filter, Calendar, TrendingUp, DollarSign } from 'lucide-react';

interface RevenueData {
  id: string;
  provider: string;
  product: string;
  totalRevenue: number;
  revenueShare: number;
  providerRevenue: number;
  platformRevenue: number;
  period: string;
  transactions: number;
}

const mockRevenueData: RevenueData[] = [
  {
    id: '1',
    provider: 'Digital Virgo',
    product: 'Premium Streaming',
    totalRevenue: 153780,
    revenueShare: 70,
    providerRevenue: 107646,
    platformRevenue: 46134,
    period: '2024-03',
    transactions: 15420
  },
  {
    id: '2',
    provider: 'Timwe',
    product: 'Timwe Pro',
    totalRevenue: 44560,
    revenueShare: 65,
    providerRevenue: 28964,
    platformRevenue: 15596,
    period: '2024-03',
    transactions: 8930
  },
  {
    id: '3',
    provider: 'Renxo',
    product: 'Music Unlimited',
    totalRevenue: 25890,
    revenueShare: 75,
    providerRevenue: 19417.5,
    platformRevenue: 6472.5,
    period: '2024-03',
    transactions: 3240
  }
];

export default function Reconciliator() {
  const [revenueData] = useState<RevenueData[]>(mockRevenueData);
  const [selectedPeriod, setSelectedPeriod] = useState('2024-03');
  const [exportFormat, setExportFormat] = useState<'excel' | 'csv' | 'pdf'>('excel');

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.totalRevenue, 0);
  const totalProviderRevenue = revenueData.reduce((sum, item) => sum + item.providerRevenue, 0);
  const totalPlatformRevenue = revenueData.reduce((sum, item) => sum + item.platformRevenue, 0);
  const totalTransactions = revenueData.reduce((sum, item) => sum + item.transactions, 0);

  const handleExport = () => {
    // Simulate export functionality
    console.log(`Exporting data as ${exportFormat.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Revenue Reconciliator</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="2024-03">March 2024</option>
            <option value="2024-02">February 2024</option>
            <option value="2024-01">January 2024</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'excel' | 'csv' | 'pdf')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
            <button
              onClick={handleExport}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+12%</span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Provider Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalProviderRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <Calculator className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              {((totalProviderRevenue / totalRevenue) * 100).toFixed(1)}% of total
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalPlatformRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              {((totalPlatformRevenue / totalRevenue) * 100).toFixed(1)}% of total
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{totalTransactions.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              Avg: ${(totalRevenue / totalTransactions).toFixed(2)} per transaction
            </span>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Revenue Breakdown</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">{selectedPeriod}</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue Share
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transactions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {revenueData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${item.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.revenueShare}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    ${item.providerRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                    ${item.platformRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.transactions.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue Distribution</h3>
        
        <div className="space-y-4">
          {revenueData.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-32 text-sm font-medium text-gray-600 truncate">
                {item.provider}
              </div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(item.totalRevenue / totalRevenue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-24 text-sm font-medium text-gray-900 text-right">
                ${item.totalRevenue.toLocaleString()}
              </div>
              <div className="w-16 text-sm text-gray-500 text-right">
                {((item.totalRevenue / totalRevenue) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}