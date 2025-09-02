import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function RevenueChart() {
  const data = [
    { month: 'Jan', revenue: 180000 },
    { month: 'Feb', revenue: 220000 },
    { month: 'Mar', revenue: 190000 },
    { month: 'Apr', revenue: 250000 },
    { month: 'May', revenue: 280000 },
    { month: 'Jun', revenue: 240000 }
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
        <BarChart3 className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-20 text-sm font-medium text-gray-900 text-right">
              ${(item.revenue / 1000).toFixed(0)}K
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Revenue (6 months)</span>
          <span className="font-semibold text-gray-900">$1.36M</span>
        </div>
      </div>
    </div>
  );
}