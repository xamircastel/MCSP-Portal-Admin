import React from 'react';
import { Clock, User, Package, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

export default function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: 'provider',
      message: 'New provider "Digital Virgo" added',
      user: 'Admin User',
      time: '2 minutes ago',
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'product',
      message: 'Product "Timwe" updated',
      user: 'Manager User',
      time: '15 minutes ago',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      type: 'ticket',
      message: 'Support ticket #1234 resolved',
      user: 'Support Team',
      time: '1 hour ago',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      type: 'revenue',
      message: 'Provider "Digital Virgo" revenue updated',
      user: 'System',
      time: '2 hours ago',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 5,
      type: 'alert',
      message: 'API rate limit warning',
      user: 'System Monitor',
      time: '3 hours ago',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Activity Feed</h3>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>
      
      {/* Activity List */}
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">by {activity.user}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 text-sm text-green-600 hover:text-green-700 font-medium py-2 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
        View All Activity
      </button>
    </div>
  );
}