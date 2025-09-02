import React, { useState } from 'react';
import { Shield, ShieldOff, Ban, Unlock, Download } from 'lucide-react';
import ReportFilters from './ReportFilters';

const mockBlockData = {
  totalBlocks: 1850,
  totalUnblocks: 420,
  netBlocks: 1430,
  blockGrowth: 15.2
};

const mockBlocksByType = [
  { type: 'Bloqueo General', count: 680, percentage: 36.8, color: 'bg-red-500' },
  { type: 'Bloqueo de Proveedor', count: 520, percentage: 28.1, color: 'bg-orange-500' },
  { type: 'Bloqueo de Producto', count: 420, percentage: 22.7, color: 'bg-yellow-500' },
  { type: 'Bloqueo de Categoría', count: 230, percentage: 12.4, color: 'bg-purple-500' }
];

const mockBlockTrend = [
  { month: 'Ene', blocks: 280, unblocks: 65, general: 105, provider: 85, product: 70, category: 20 },
  { month: 'Feb', blocks: 320, unblocks: 75, general: 125, provider: 95, product: 80, category: 20 },
  { month: 'Mar', blocks: 290, unblocks: 60, general: 110, provider: 80, product: 75, category: 25 },
  { month: 'Abr', blocks: 350, unblocks: 80, general: 135, provider: 100, product: 85, category: 30 },
  { month: 'May', blocks: 380, unblocks: 90, general: 145, provider: 110, product: 95, category: 30 },
  { month: 'Jun', blocks: 330, unblocks: 70, general: 125, provider: 95, product: 80, category: 30 }
];

export default function BlocksReport() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-06-30'
  });

  const maxValue = Math.max(...mockBlockTrend.map(d => d.blocks));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Bloqueos y Desbloqueos</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bloqueos</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockBlockData.totalBlocks.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <Ban className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Shield className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-sm font-medium text-red-600">+{mockBlockData.blockGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Desbloqueos</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockBlockData.totalUnblocks.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <Unlock className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Este período</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bloqueos Netos</p>
              <p className="text-2xl font-bold text-gray-900">
                +{mockBlockData.netBlocks.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <ShieldOff className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Bloqueos - Desbloqueos</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ratio Bloqueo/Desbloqueo</p>
              <p className="text-2xl font-bold text-gray-900">
                {(mockBlockData.totalBlocks / mockBlockData.totalUnblocks).toFixed(1)}:1
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <Shield className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Bloqueos por desbloqueo</span>
          </div>
        </div>
      </div>

      {/* Block Types Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Distribución de Bloqueos por Tipo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart Representation */}
          <div className="space-y-4">
            {mockBlocksByType.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-gray-600">{item.type}</div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm font-medium text-gray-900 text-right">
                  {item.count.toLocaleString()}
                </div>
                <div className="w-12 text-sm text-gray-500 text-right">
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Resumen de Bloqueos</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Más frecuente:</span>
                  <span className="text-sm font-medium text-gray-900">Bloqueo General</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Menos frecuente:</span>
                  <span className="text-sm font-medium text-gray-900">Bloqueo de Categoría</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total tipos:</span>
                  <span className="text-sm font-medium text-gray-900">4 categorías</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blocks vs Unblocks Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Tendencia de Bloqueos vs Desbloqueos</h3>

        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-2">
            {mockBlockTrend.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full flex space-x-1">
                  {/* Blocks Bar */}
                  <div
                    className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.blocks / maxValue) * 200}px` }}
                    title={`Bloqueos: ${item.blocks.toLocaleString()}`}
                  ></div>
                  {/* Unblocks Bar */}
                  <div
                    className="w-4 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.unblocks / 100) * 200}px` }}
                    title={`Desbloqueos: ${item.unblocks.toLocaleString()}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                <div className="text-xs text-gray-500">
                  +{(item.blocks - item.unblocks).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Bloqueos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Desbloqueos</span>
          </div>
        </div>
      </div>

      {/* Detailed Block Types Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Evolución por Tipo de Bloqueo</h3>
        
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-2">
            {mockBlockTrend.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full flex flex-col">
                  {/* Stacked bars for different block types */}
                  <div className="w-full flex flex-col">
                    <div
                      className="w-full bg-red-500 transition-all duration-500"
                      style={{ height: `${(item.general / maxValue) * 200}px` }}
                      title={`General: ${item.general}`}
                    ></div>
                    <div
                      className="w-full bg-orange-500 transition-all duration-500"
                      style={{ height: `${(item.provider / maxValue) * 200}px` }}
                      title={`Proveedor: ${item.provider}`}
                    ></div>
                    <div
                      className="w-full bg-yellow-500 transition-all duration-500"
                      style={{ height: `${(item.product / maxValue) * 200}px` }}
                      title={`Producto: ${item.product}`}
                    ></div>
                    <div
                      className="w-full bg-purple-500 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(item.category / maxValue) * 200}px` }}
                      title={`Categoría: ${item.category}`}
                    ></div>
                  </div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                <div className="text-xs text-gray-500">{item.blocks}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">General</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-600">Proveedor</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Producto</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-600">Categoría</span>
          </div>
        </div>
      </div>
    </div>
  );
}