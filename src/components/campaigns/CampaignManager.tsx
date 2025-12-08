import { useState } from 'react';
import SMSCampaigns from './SMSCampaigns';
import PushCampaigns from './PushCampaigns';
import DigitalCampaigns from './DigitalCampaigns';

type TabType = 'overview' | 'sms' | 'push' | 'digital';

interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalReach: number;
}

export default function CampaignManager() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const stats: CampaignStats = {
    totalCampaigns: 48,
    activeCampaigns: 12,
    totalReach: 2500000
  };

  const tabs = [
    { id: 'overview' as TabType, name: 'Overview' },
    { id: 'sms' as TabType, name: 'SMS Campaigns' },
    { id: 'push' as TabType, name: 'Push Campaigns' },
    { id: 'digital' as TabType, name: 'Digital Ads' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Manager</h1>
          <p className="text-gray-600 mt-2">
            Gestiona y analiza campañas promocionales a través de múltiples canales
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Nueva Campaña
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Campañas</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Campañas Activas</p>
          <p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Alcance Total</p>
          <p className="text-2xl font-bold text-gray-900">
            {(stats.totalReach / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'sms' && <SMSCampaigns />}
          {activeTab === 'push' && <PushCampaigns />}
          {activeTab === 'digital' && <DigitalCampaigns />}
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SMS Summary */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">SMS</h3>
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              SMS
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">18 Campañas</p>
          <p className="text-sm text-gray-600 mb-4">6 activas</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tasa de entrega</span>
              <span className="font-semibold">98.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">CTR promedio</span>
              <span className="font-semibold">2.9%</span>
            </div>
          </div>
        </div>

        {/* Push Summary */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">PUSH</h3>
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
              PUSH
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">15 Campañas</p>
          <p className="text-sm text-gray-600 mb-4">4 activas</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tasa de entrega</span>
              <span className="font-semibold">96.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">CTR promedio</span>
              <span className="font-semibold">3.8%</span>
            </div>
          </div>
        </div>

        {/* Digital Summary */}
        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">DIGITAL</h3>
            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
              DIGITAL
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">15 Campañas</p>
          <p className="text-sm text-gray-600 mb-4">2 activas</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Impresiones</span>
              <span className="font-semibold">2.1M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">CTR promedio</span>
              <span className="font-semibold">2.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Campañas Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaña</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Canal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alcance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Black Friday Promo</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">SMS</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Activa</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">150,000</td>
                <td className="px-6 py-4 text-sm text-gray-600">3.2%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Sports Package Launch</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Digital</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Activa</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">500,000</td>
                <td className="px-6 py-4 text-sm text-gray-600">2.8%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Weekend Special Push</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Push</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Completada</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">80,000</td>
                <td className="px-6 py-4 text-sm text-gray-600">4.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
