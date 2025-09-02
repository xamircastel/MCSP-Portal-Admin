import React from 'react';
import { TrendingUp, TrendingDown, Target, Zap, Users, DollarSign } from 'lucide-react';

export default function PerformanceMetrics() {
  const metrics = [
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.4%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Avg. Response Time',
      value: '1.2s',
      change: '-0.3s',
      trend: 'up',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Sessions',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Revenue/User',
      value: '$24.50',
      change: '-2.1%',
      trend: 'down',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];


  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{metric.title}</p>
                  <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}