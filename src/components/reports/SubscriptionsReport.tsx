import React, { useState } from 'react';
import { UserPlus, UserX, TrendingDown, BarChart3, Download } from 'lucide-react';
import ReportFilters from './ReportFilters';

const mockSubscriptionData = {
  newSubscriptions: 4280,
  cancellations: 1650,
  churnRate: 5.8,
  netGrowth: 2630
};

const mockSubscriptionTrend = [
  { month: 'Ene', subscriptions: 3800, cancellations: 1400, churn: 6.2 },
  { month: 'Feb', subscriptions: 4100, cancellations: 1600, churn: 6.8 },
  { month: 'Mar', subscriptions: 3900, cancellations: 1300, churn: 5.5 },
  { month: 'Abr', subscriptions: 4300, cancellations: 1500, churn: 6.0 },
  { month: 'May', subscriptions: 4500, cancellations: 1700, churn: 6.3 },
  { month: 'Jun', subscriptions: 4280, cancellations: 1650, churn: 5.8 }
];

const mockProviderBreakdown = [
  { provider: 'Digital Virgo', subscriptions: 1850, cancellations: 680, churn: 5.2 },
  { provider: 'Timwe', subscriptions: 1420, cancellations: 520, churn: 6.1 },
  { provider: 'Provider 2', subscriptions: 1010, cancellations: 450, churn: 6.8 }
];

export default function SubscriptionsReport() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-06-30'
  });

  const maxValue = Math.max(...mockSubscriptionTrend.map(d => Math.max(d.subscriptions, d.cancellations)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Suscripciones y Cancelaciones</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
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
              <p className="text-sm font-medium text-gray-600">Nuevas Suscripciones</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockSubscriptionData.newSubscriptions.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <UserPlus className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Este período</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelaciones</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockSubscriptionData.cancellations.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <UserX className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Este período</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa de Cancelación</p>
              <p className="text-2xl font-bold text-gray-900">{mockSubscriptionData.churnRate}%</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-sm font-medium text-red-600">-0.5%</span>
            <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Crecimiento Neto</p>
              <p className="text-2xl font-bold text-gray-900">
                +{mockSubscriptionData.netGrowth.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Suscripciones - Cancelaciones</span>
          </div>
        </div>
      </div>

      {/* Subscription vs Cancellation Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Comparativo Suscripciones vs Cancelaciones</h3>

        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-2">
            {mockSubscriptionTrend.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full flex space-x-1">
                  {/* Subscriptions Bar */}
                  <div
                    className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.subscriptions / maxValue) * 200}px` }}
                    title={`Suscripciones: ${item.subscriptions.toLocaleString()}`}
                  ></div>
                  {/* Cancellations Bar */}
                  <div
                    className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.cancellations / maxValue) * 200}px` }}
                    title={`Cancelaciones: ${item.cancellations.toLocaleString()}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                <div className="text-xs text-gray-500">
                  +{(item.subscriptions - item.cancellations).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Nuevas Suscripciones</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Cancelaciones</span>
          </div>
        </div>
      </div>

      {/* Churn Rate Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Evolución de la Tasa de Cancelación (Churn Rate)</h3>
        
        <div className="space-y-4">
          {mockSubscriptionTrend.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(item.churn / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-sm font-medium text-gray-900 text-right">
                {item.churn}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Provider Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Desglose por Proveedor</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suscripciones
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cancelaciones
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasa de Cancelación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crecimiento Neto
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockProviderBreakdown.map((provider, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {provider.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    +{provider.subscriptions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                    -{provider.cancellations.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {provider.churn}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                    +{(provider.subscriptions - provider.cancellations).toLocaleString()}
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