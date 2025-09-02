import React, { useState } from 'react';
import { Fuel as Funnel, TrendingDown, Users, Download } from 'lucide-react';
import ReportFilters from './ReportFilters';

const mockHEFunnelData = [
  { step: 'Arrive at Landing Page', users: 10000, percentage: 100, conversion: 100 },
  { step: 'Click First Opt-In', users: 7500, percentage: 75, conversion: 75 },
  { step: 'Blacklist Rejection', users: 7200, percentage: 72, conversion: 96 },
  { step: 'Active Subscription Rejection', users: 6800, percentage: 68, conversion: 94.4 },
  { step: 'Arrive at Second Opt-In', users: 6500, percentage: 65, conversion: 95.6 },
  { step: 'Activation Request', users: 5200, percentage: 52, conversion: 80 },
  { step: 'Balance/Credit Rejection', users: 4800, percentage: 48, conversion: 92.3 },
  { step: 'Successful Subscription', users: 4200, percentage: 42, conversion: 87.5 }
];

const mockWIFIFunnelData = [
  { step: 'Arrive at Landing Page', users: 8500, percentage: 100, conversion: 100 },
  { step: 'Enter Mobile Number', users: 6800, percentage: 80, conversion: 80 },
  { step: 'Blacklist Rejection', users: 6500, percentage: 76.5, conversion: 95.6 },
  { step: 'Active Subscription Rejection', users: 6200, percentage: 72.9, conversion: 95.4 },
  { step: 'Arrive at OTP Page', users: 5900, percentage: 69.4, conversion: 95.2 },
  { step: 'Enter OTP', users: 4700, percentage: 55.3, conversion: 79.7 },
  { step: 'Balance/Credit Rejection', users: 4300, percentage: 50.6, conversion: 91.5 },
  { step: 'Successful Subscription', users: 3800, percentage: 44.7, conversion: 88.4 }
];

export default function FunnelReport() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-06-30'
  });
  const [selectedFunnel, setSelectedFunnel] = useState<'HE' | 'WIFI'>('HE');

  const currentFunnelData = selectedFunnel === 'HE' ? mockHEFunnelData : mockWIFIFunnelData;
  const totalUsers = currentFunnelData[0].users;
  const finalConversion = currentFunnelData[currentFunnelData.length - 1].percentage;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Contracting Funnel</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <ReportFilters 
        type="basic"
        onFiltersChange={setSelectedFilters}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* Funnel Type Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Select Contracting Flow</h3>
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedFunnel('HE')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedFunnel === 'HE'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              HE Contracting
            </button>
            <button
              onClick={() => setSelectedFunnel('WIFI')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedFunnel === 'WIFI'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              WIFI Contracting
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {selectedFunnel === 'HE' 
            ? 'Contracting flow via Header Enrichment (automatic identification)'
            : 'Contracting flow via WIFI with OTP verification'
          }
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Initial Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Arrived at Landing Page</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Final Conversion</p>
              <p className="text-2xl font-bold text-gray-900">{finalConversion}%</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <Funnel className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Successful subscriptions</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lost Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {(totalUsers - currentFunnelData[currentFunnelData.length - 1].users).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Did not complete the flow</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Highest Drop-off</p>
              <p className="text-2xl font-bold text-gray-900">
                {selectedFunnel === 'HE' ? 'First Opt-In' : 'Mobile Number'}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Step with highest abandonment</span>
          </div>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Funnel Visualization - {selectedFunnel === 'HE' ? 'Header Enrichment' : 'WIFI with OTP'}
        </h3>

        <div className="space-y-4">
          {currentFunnelData.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Info */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === 0 ? 'bg-blue-100 text-blue-800' :
                    index === currentFunnelData.length - 1 ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{step.step}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {step.users.toLocaleString()} users
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {step.percentage}%
                  </span>
                  {index > 0 && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      step.conversion >= 90 ? 'bg-green-100 text-green-800' :
                      step.conversion >= 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {step.conversion}% conversion
                    </span>
                  )}
                </div>
              </div>

              {/* Funnel Bar */}
              <div className="relative">
                <div className="bg-gray-200 rounded-lg h-12 flex items-center">
                  <div
                    className={`h-12 rounded-lg transition-all duration-1000 flex items-center justify-center ${
                      index === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      index === currentFunnelData.length - 1 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      'bg-gradient-to-r from-orange-500 to-orange-600'
                    }`}
                    style={{ width: `${step.percentage}%` }}
                  >
                    <span className="text-white text-sm font-medium">
                      {step.users.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Drop-off indicator */}
              {index < currentFunnelData.length - 1 && (
                <div className="flex items-center justify-center mt-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <TrendingDown className="h-3 w-3" />
                    <span>
                      -{(step.users - currentFunnelData[index + 1].users).toLocaleString()} users
                      ({(100 - currentFunnelData[index + 1].conversion).toFixed(1)}% abandonment)
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Conversion Analysis by Step</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Step
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Step Conversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lost Users
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentFunnelData.map((step, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {step.step}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {step.users.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {step.percentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {index === 0 ? (
                      <span className="text-gray-500">-</span>
                    ) : (
                      <span className={`font-medium ${
                        step.conversion >= 90 ? 'text-green-600' :
                        step.conversion >= 80 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {step.conversion}%
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    {index < currentFunnelData.length - 1 ? (
                      `${(step.users - currentFunnelData[index + 1].users).toLocaleString()}`
                    ) : (
                      '-'
                    )}
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