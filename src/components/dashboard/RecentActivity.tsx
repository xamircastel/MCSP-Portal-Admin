import React from 'react';
import { Clock, User, Package, AlertCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'provider',
    message: 'New provider "Digital Virgo" added',
    time: '2 minutes ago',
    icon: User,
    color: 'text-blue-600'
  },
  {
    id: 2,
    type: 'product',
    message: 'Product "Timwe" updated',
    time: '15 minutes ago',
    icon: Package,
    color: 'text-green-600'
  },
  {
    id: 3,
    type: 'ticket',
    message: 'Support ticket #1234 opened',
    time: '1 hour ago',
    icon: AlertCircle,
    color: 'text-orange-600'
  },
  {
    id: 4,
    type: 'provider',
    message: 'Provider "Digital Virgo" revenue updated',
    time: '2 hours ago',
    icon: User,
    color: 'text-purple-600'
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 text-sm text-green-600 hover:text-green-700 font-medium">
        View all activity
      </button>
    </div>
  );
}