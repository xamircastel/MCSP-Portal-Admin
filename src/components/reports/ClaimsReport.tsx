import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, FileText, Download } from 'lucide-react';
import ReportFilters from './ReportFilters';

const mockClaimsData = {
  totalClaims: 1240,
  claimsGrowth: -8.5,
  avgResolutionTime: 2.3,
  resolutionRate: 94.2
};

const mockClaimsTrend = [
  { month: 'Ene', claims: 180, resolved: 165, pending: 15 },
  { month: 'Feb', claims: 220, resolved: 205, pending: 15 },
  { month: 'Mar', claims: 190, resolved: 185, pending: 5 },
  { month: 'Abr', claims: 250, resolved: 240, pending: 10 },
  { month: 'May', claims: 200, resolved: 190, pending: 10 },
  { month: 'Jun', claims: 200, resolved: 195, pending: 5 }
];

const mockClaimsByProvider = [
  { provider: 'Digital Virgo', claims: 520, percentage: 41.9, trend: -5.2 },
  { provider: 'Timwe', claims: 420, percentage: 33.9, trend: -12.1 },
  { provider: 'Provider 2', claims: 300, percentage: 24.2, trend: -6.8 }
];

const mockClaimsByCategory = [
  { category: 'Juegos', claims: 380, percentage: 30.6 },
  { category: 'Videos', claims: 290, percentage: 23.4 },
  { category: 'Música', claims: 220, percentage: 17.7 },
  { category: 'Libros', claims: 180, percentage: 14.5 },
  { category: 'Otros', claims: 170, percentage: 13.7 }
];

const mockClaimsByProduct = [
  { product: 'Premium Streaming', claims: 280, provider: 'Digital Virgo' },
  { product: 'Gaming Plus Pro', claims: 240, provider: 'Timwe' },
  { product: 'Music Unlimited', claims: 180, provider: 'Renxo' },
  { product: 'Video Pro', claims: 160, provider: 'Digital Virgo' },
  { product: 'Book Library', claims: 120, provider: 'Timwe' }
];

export default function ClaimsReport() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-06-30'
  });

  const maxClaims = Math.max(...mockClaimsTrend.map(d => d.claims));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Reclamaciones</h1>
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
              <p className="text-sm font-medium text-gray-600">Total Reclamaciones</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockClaimsData.totalClaims.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1 rotate-180" />
            <span className="text-sm font-medium text-green-600">{mockClaimsData.claimsGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa de Resolución</p>
              <p className="text-2xl font-bold text-gray-900">{mockClaimsData.resolutionRate}%</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <FileText className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+2.1%</span>
            <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
              <p className="text-2xl font-bold text-gray-900">{mockClaimsData.avgResolutionTime} días</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Resolución promedio</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockClaimsTrend[mockClaimsTrend.length - 1].pending}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Sin resolver</span>
          </div>
        </div>
      </div>

      {/* Claims Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Evolución de Reclamaciones</h3>

        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-2">
            {mockClaimsTrend.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full flex space-x-1">
                  {/* Total Claims Bar */}
                  <div
                    className="flex-1 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.claims / maxClaims) * 200}px` }}
                    title={`Total: ${item.claims.toLocaleString()}`}
                  ></div>
                  {/* Resolved Claims Overlay */}
                  <div
                    className="w-2 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.resolved / maxClaims) * 200}px` }}
                    title={`Resueltas: ${item.resolved.toLocaleString()}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                <div className="text-xs text-gray-500">{item.claims}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-600">Total Reclamaciones</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Resueltas</span>
          </div>
        </div>
      </div>

      {/* Claims by Provider and Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Provider */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Reclamaciones por Proveedor</h3>
          
          <div className="space-y-4">
            {mockClaimsByProvider.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.provider}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{item.claims}</span>
                    <span className={`text-xs font-medium ${
                      item.trend < 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.trend > 0 ? '+' : ''}{item.trend}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Reclamaciones por Categoría</h3>
          
          <div className="space-y-4">
            {mockClaimsByCategory.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm font-medium text-gray-900">{item.claims}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products with Claims */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Productos con Más Reclamaciones</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reclamaciones
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % del Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockClaimsByProduct.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {product.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">
                    {product.claims.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {((product.claims / mockClaimsData.totalClaims) * 100).toFixed(1)}%
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