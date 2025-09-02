import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react';

export default function ModernCharts() {
  const [activeChart, setActiveChart] = useState('revenue');
  const [timeRange, setTimeRange] = useState('6months');

  const revenueData = [
    { month: 'Jan', revenue: 180000, growth: 12 },
    { month: 'Feb', revenue: 220000, growth: 22 },
    { month: 'Mar', revenue: 190000, growth: -14 },
    { month: 'Apr', revenue: 250000, growth: 32 },
    { month: 'May', revenue: 280000, growth: 12 },
    { month: 'Jun', revenue: 240000, growth: -14 }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 1200, active: 980 },
    { month: 'Feb', users: 1450, active: 1180 },
    { month: 'Mar', users: 1380, active: 1120 },
    { month: 'Apr', users: 1680, active: 1420 },
    { month: 'May', users: 1920, active: 1650 },
    { month: 'Jun', users: 2100, active: 1890 }
  ];

  const productPerformance = [
    { name: 'Digital Virgo', value: 35, color: 'bg-blue-500' },
    { name: 'Timwe', value: 28, color: 'bg-green-500' },
    { name: 'Renxo', value: 22, color: 'bg-purple-500' },
    { name: 'Others', value: 15, color: 'bg-orange-500' }
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const maxUsers = Math.max(...userGrowthData.map(d => d.users));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Analytics Overview</h3>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
            </select>
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveChart('revenue')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeChart === 'revenue'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Revenue Trends
          </button>
          <button
            onClick={() => setActiveChart('users')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeChart === 'users'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            User Growth
          </button>
          <button
            onClick={() => setActiveChart('products')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeChart === 'products'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Product Mix
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Revenue Chart */}
        {activeChart === 'revenue' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900">Monthly Revenue</h4>
                <p className="text-sm text-gray-600">Revenue trends over the last 6 months</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">$1.36M</p>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
            </div>

            {/* Line Chart Simulation */}
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between space-x-2">
                {revenueData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full">
                      {/* Growth indicator */}
                      <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium ${
                        item.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.growth > 0 ? '+' : ''}{item.growth}%
                      </div>
                      
                      {/* Bar */}
                      <div
                        className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 hover:from-green-600 hover:to-green-500 cursor-pointer"
                        style={{ height: `${(item.revenue / maxRevenue) * 200}px` }}
                        title={`${item.month}: $${(item.revenue / 1000).toFixed(0)}K`}
                      ></div>
                    </div>
                    
                    {/* Month label */}
                    <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                    <div className="text-xs text-gray-500">${(item.revenue / 1000).toFixed(0)}K</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Growth Chart */}
        {activeChart === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900">Active Users</h4>
                <p className="text-sm text-gray-600">Active users over time</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">1,890</p>
                <p className="text-sm text-gray-500">Active Users</p>
              </div>
            </div>

            {/* Single Bar Chart */}
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between space-x-1">
                {userGrowthData.map((item, index) => (
                  <div key={index} className="flex-1 flex justify-center">
                    {/* Active Users Bar */}
                    <div className="flex flex-col items-center w-full">
                      <div
                        className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 hover:from-green-600 hover:to-green-500"
                        style={{ height: `${(item.active / Math.max(...userGrowthData.map(d => d.active))) * 200}px` }}
                        title={`${item.month} Active: ${item.active}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Month labels */}
              <div className="absolute -bottom-8 inset-x-0 flex justify-between">
                {userGrowthData.map((item, index) => (
                  <div key={index} className="flex-1 text-center">
                    <div className="text-xs font-medium text-gray-600">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Indicator */}
            <div className="text-center">
              <span className="text-sm text-green-600 font-medium">+12.5% growth this month</span>
            </div>
          </div>
        )}

        {/* Product Performance Chart */}
        {activeChart === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900">Product Performance</h4>
                <p className="text-sm text-gray-600">Revenue distribution by product</p>
              </div>
            </div>

            {/* Radial Progress Bars */}
            <div className="grid grid-cols-2 gap-6">
              {productPerformance.map((product, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {/* Circular Progress */}
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
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
                        strokeDasharray={`${product.value * 1.76} 176`}
                        className={product.color.replace('bg-', 'text-')}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">{product.value}%</span>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div>
                    <h5 className="font-medium text-gray-900">{product.name}</h5>
                    <p className="text-sm text-gray-600">${(product.value * 38.8).toFixed(0)}K revenue</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Horizontal Bar Chart */}
            <div className="space-y-3">
              {productPerformance.map((product, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-20 text-sm font-medium text-gray-600 text-right">
                    {product.name}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${product.color} transition-all duration-1000`}
                      style={{ width: `${product.value}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm font-medium text-gray-900">
                    {product.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}