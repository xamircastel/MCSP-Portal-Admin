import React from 'react';
import { Users, Package, DollarSign, MessageSquare, TrendingUp, Activity, BarChart3, PieChart, LineChart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import StatsCard from './StatsCard';
import ModernCharts from './ModernCharts';
import PerformanceMetrics from './PerformanceMetrics';
import ActivityFeed from './ActivityFeed';

export default function Dashboard() {

  const stats = [
    {
      title: 'Total Providers',
      value: '24',
      change: '+12%',
      trend: 'up' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Products',
      value: '156',
      change: '+8%',
      trend: 'up' as const,
      icon: Package,
      color: 'green'
    },
    {
      title: 'Monthly Revenue',
      value: '$2.4M',
      change: '+15%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Open Tickets',
      value: '12',
      change: '-5%',
      trend: 'down' as const,
      icon: MessageSquare,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="h-4 w-4" />
          <span>Last updated: 2 minutes ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ModernCharts />
        </div>
        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}