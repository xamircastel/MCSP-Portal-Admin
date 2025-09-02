import React, { useState } from 'react';
import { Calendar, Filter, RotateCcw } from 'lucide-react';

interface ReportFiltersProps {
  type: 'complete' | 'basic';
  onFiltersChange: (filters: any) => void;
  dateRange: { startDate: string; endDate: string };
  onDateRangeChange: (dateRange: { startDate: string; endDate: string }) => void;
}

const providers = ['Digital Virgo', 'Timwe', 'Renxo'];
const products = ['Premium Streaming', 'Gaming Plus Pro', 'Music Unlimited'];
const categories = ['Juegos', 'Videos', 'Música', 'Libros', 'Adulto'];
const markets = ['Prepago', 'Postpago'];
const chargeTypes = ['Suscripción', 'Renovación'];
const channels = ['HE', 'WIFI', 'SAT PUSH', 'USSD', 'SMS', 'Híbrido'];
const shortcodes = ['123456', '654321', '789012'];
const chargePeriods = ['Diario', 'Semanal', 'Mensual'];

export default function ReportFilters({ type, onFiltersChange, dateRange, onDateRangeChange }: ReportFiltersProps) {
  const [filters, setFilters] = useState({
    providers: [],
    products: [],
    categories: [],
    markets: [],
    chargeTypes: [],
    channels: [],
    shortcodes: [],
    chargePeriods: []
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    const newFilters = { ...filters };
    if (checked) {
      newFilters[filterType] = [...newFilters[filterType], value];
    } else {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    }
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(filters);
  };

  const resetFilters = () => {
    const emptyFilters = {
      providers: [],
      products: [],
      categories: [],
      markets: [],
      chargeTypes: [],
      channels: [],
      shortcodes: [],
      chargePeriods: []
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
    onDateRangeChange({
      startDate: '2024-01-01',
      endDate: '2024-06-30'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-green-600 hover:text-green-700"
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Fecha de Inicio
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => onDateRangeChange({ ...dateRange, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Fecha de Fin
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => onDateRangeChange({ ...dateRange, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Basic Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Providers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Proveedor</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {providers.map((provider) => (
                  <label key={provider} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.providers.includes(provider)}
                      onChange={(e) => handleFilterChange('providers', provider, e.target.checked)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{provider}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Producto</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {products.map((product) => (
                  <label key={product} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.products.includes(product)}
                      onChange={(e) => handleFilterChange('products', product, e.target.checked)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{product}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Categoría</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={(e) => handleFilterChange('categories', category, e.target.checked)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Markets (only for complete filters) */}
            {type === 'complete' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Mercado</label>
                <div className="space-y-2">
                  {markets.map((market) => (
                    <label key={market} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.markets.includes(market)}
                        onChange={(e) => handleFilterChange('markets', market, e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{market}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Complete Filters Additional Options */}
          {type === 'complete' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Charge Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Charge Type</label>
                <div className="space-y-2">
                  {chargeTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.chargeTypes.includes(type)}
                        onChange={(e) => handleFilterChange('chargeTypes', type, e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Channels */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Contracting Channel</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {channels.map((channel) => (
                    <label key={channel} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.channels.includes(channel)}
                        onChange={(e) => handleFilterChange('channels', channel, e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shortcodes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Shortcode</label>
                <div className="space-y-2">
                  {shortcodes.map((shortcode) => (
                    <label key={shortcode} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.shortcodes.includes(shortcode)}
                        onChange={(e) => handleFilterChange('shortcodes', shortcode, e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{shortcode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Charge Periods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Charge Frequency</label>
                <div className="space-y-2">
                  {chargePeriods.map((period) => (
                    <label key={period} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.chargePeriods.includes(period)}
                        onChange={(e) => handleFilterChange('chargePeriods', period, e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{period}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear</span>
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}