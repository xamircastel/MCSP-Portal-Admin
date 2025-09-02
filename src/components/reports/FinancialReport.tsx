import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, BarChart3, Calendar, Filter, Download } from 'lucide-react';
import ReportFilters from './ReportFilters';

interface FinancialMetrics {
  totalRevenue: number;
  roi: number;
  arpu: number;
  revenueGrowth: number;
}

const mockFinancialData: FinancialMetrics = {
  totalRevenue: 2450000,
  roi: 185.5,
  arpu: 24.50,
  revenueGrowth: 12.3
};

const mockRevenueData = [
  { month: 'Ene', revenue: 180000, roi: 165, arpu: 22.5 },
  { month: 'Feb', revenue: 220000, roi: 172, arpu: 23.1 },
  { month: 'Mar', revenue: 190000, roi: 158, arpu: 21.8 },
  { month: 'Abr', revenue: 250000, roi: 178, arpu: 24.2 },
  { month: 'May', revenue: 280000, roi: 185, arpu: 25.1 },
  { month: 'Jun', revenue: 240000, roi: 180, arpu: 24.0 }
];

export default function FinancialReport() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-06-30'
  });

  const maxRevenue = Math.max(...mockRevenueData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Ingresos y KPIs Financieros</h1>
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
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">
                ${mockFinancialData.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+{mockFinancialData.revenueGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ROI</p>
              <p className="text-2xl font-bold text-gray-900">{mockFinancialData.roi}%</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+8.2%</span>
            <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ARPU</p>
              <p className="text-2xl font-bold text-gray-900">${mockFinancialData.arpu}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+5.1%</span>
            <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Crecimiento</p>
              <p className="text-2xl font-bold text-gray-900">+{mockFinancialData.revenueGrowth}%</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Tendencia mensual</span>
          </div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Tendencia de Ingresos</h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>

        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-2">
            {mockRevenueData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 hover:from-green-600 hover:to-green-500 cursor-pointer"
                    style={{ height: `${(item.revenue / maxRevenue) * 200}px` }}
                    title={`${item.month}: $${(item.revenue / 1000).toFixed(0)}K`}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                <div className="text-xs text-gray-500">${(item.revenue / 1000).toFixed(0)}K</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI and ARPU Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Evolución del ROI</h3>
          <div className="space-y-4">
            {mockRevenueData.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(item.roi / 200) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm font-medium text-gray-900 text-right">
                  {item.roi}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Evolución del ARPU</h3>
          <div className="space-y-4">
            {mockRevenueData.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(item.arpu / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm font-medium text-gray-900 text-right">
                  ${item.arpu}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}