import React, { useState } from 'react';
import { Users, UserPlus, UserMinus, TrendingUp, Download } from 'lucide-react';
import ReportFilters from './ReportFilters';

const mockUserData = {
  totalActiveUsers: 27590,
  newUsers: 3420,
  cancelledUsers: 1280,
  userGrowth: 8.5
};

const mockUserEvolution = [
  { month: 'Ene', active: 22000, new: 2800, cancelled: 1200 },
  { month: 'Feb', active: 23500, new: 3100, cancelled: 1400 },
  { month: 'Mar', active: 24200, new: 2900, cancelled: 1100 },
  { month: 'Abr', active: 25800, new: 3200, cancelled: 1300 },
  { month: 'May', active: 26900, new: 3400, cancelled: 1250 },
  { month: 'Jun', active: 27590, new: 3420, cancelled: 1280 }
];

const mockUserDistribution = [
  { category: 'Games', users: 8500, percentage: 30.8 },
  { category: 'Videos', users: 7200, percentage: 26.1 },
  { category: 'Music', users: 5800, percentage: 21.0 },
  { category: 'Books', users: 3900, percentage: 14.1 },
  { category: 'Others', users: 2190, percentage: 7.9 }
];

export default function UsersReport() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-06-30'
  });

  const maxUsers = Math.max(...mockUserEvolution.map(d => d.active));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">User Base</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockUserData.totalActiveUsers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+{mockUserData.userGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs previous month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockUserData.newUsers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <UserPlus className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">This month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cancellations</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockUserData.cancelledUsers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <UserMinus className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">This month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Growth</p>
              <p className="text-2xl font-bold text-gray-900">
                +{(mockUserData.newUsers - mockUserData.cancelledUsers).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">New - Cancellations</span>
          </div>
        </div>
      </div>

      {/* User Evolution Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Active User Base Evolution</h3>

        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-2">
            {mockUserEvolution.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full flex space-x-1">
                  {/* Active Users Bar */}
                  <div
                    className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.active / maxUsers) * 200}px` }}
                    title={`Active: ${item.active.toLocaleString()}`}
                  ></div>
                  {/* New Users Bar */}
                  <div
                    className="w-2 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.new / 4000) * 200}px` }}
                    title={`New: ${item.new.toLocaleString()}`}
                  ></div>
                  {/* Cancelled Users Bar */}
                  <div
                    className="w-2 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.cancelled / 2000) * 200}px` }}
                    title={`Cancelled: ${item.cancelled.toLocaleString()}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                <div className="text-xs text-gray-500">{(item.active / 1000).toFixed(0)}K</div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Active Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">New Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Cancellations</span>
          </div>
        </div>
      </div>

      {/* User Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">User Distribution by Category</h3>
        
        <div className="space-y-4">
          {mockUserDistribution.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-24 text-sm font-medium text-gray-600">{item.category}</div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-20 text-sm font-medium text-gray-900 text-right">
                {item.users.toLocaleString()}
              </div>
              <div className="w-12 text-sm text-gray-500 text-right">
                {item.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}