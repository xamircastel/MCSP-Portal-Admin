import { useState } from 'react';

interface DigitalCampaign {
  id: string;
  name: string;
  channel: 'Google Ads' | 'Facebook' | 'Instagram' | 'TikTok';
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cpc: number;
  cpa: number;
  roi: number;
  lastSync: string;
}

const mockDigitalCampaigns: DigitalCampaign[] = [
  {
    id: '1',
    name: 'Sports Package Q4',
    channel: 'Google Ads',
    status: 'active',
    budget: 5000,
    spent: 1860,
    impressions: 150000,
    clicks: 3500,
    conversions: 120,
    cpc: 0.53,
    cpa: 15.50,
    roi: 245,
    lastSync: '2025-10-30 14:30'
  },
  {
    id: '2',
    name: 'Music Promo Oct',
    channel: 'Facebook',
    status: 'active',
    budget: 3000,
    spent: 2214,
    impressions: 200000,
    clicks: 5000,
    conversions: 180,
    cpc: 0.44,
    cpa: 12.30,
    roi: 310,
    lastSync: '2025-10-30 14:28'
  },
  {
    id: '3',
    name: 'Gaming Launch',
    channel: 'TikTok',
    status: 'paused',
    budget: 2500,
    spent: 1215,
    impressions: 80000,
    clicks: 2100,
    conversions: 65,
    cpc: 0.58,
    cpa: 18.70,
    roi: 189,
    lastSync: '2025-10-30 10:15'
  },
  {
    id: '4',
    name: 'Premium Streaming Awareness',
    channel: 'Instagram',
    status: 'active',
    budget: 4000,
    spent: 2840,
    impressions: 350000,
    clicks: 8750,
    conversions: 285,
    cpc: 0.32,
    cpa: 9.96,
    roi: 425,
    lastSync: '2025-10-30 14:30'
  }
];

export default function DigitalCampaigns() {
  const [campaigns] = useState<DigitalCampaign[]>(mockDigitalCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState<string>('all');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = filterChannel === 'all' || campaign.channel === filterChannel;
    return matchesSearch && matchesChannel;
  });

  const getChannelColor = (channel: string) => {
    const colors = {
      'Google Ads': 'bg-red-100 text-red-800',
      'Facebook': 'bg-blue-100 text-blue-800',
      'Instagram': 'bg-pink-100 text-pink-800',
      'TikTok': 'bg-purple-100 text-purple-800'
    };
    return colors[channel as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  const calculateMetrics = (campaign: DigitalCampaign) => {
    const ctr = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions * 100).toFixed(2) : '0.00';
    const conversionRate = campaign.clicks > 0 ? (campaign.conversions / campaign.clicks * 100).toFixed(2) : '0.00';
    const budgetSpent = campaign.budget > 0 ? (campaign.spent / campaign.budget * 100).toFixed(1) : '0.0';
    
    return { ctr, conversionRate, budgetSpent };
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              Sincronización automática cada hora
            </h4>
            <p className="text-sm text-blue-700">
              Las métricas se importan automáticamente desde las plataformas conectadas. 
              Las campañas se gestionan directamente en cada plataforma.
            </p>
          </div>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Sincronizar ahora
          </button>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar campañas digitales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterChannel}
              onChange={(e) => setFilterChannel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los canales</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaña</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Canal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Presupuesto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impresiones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CTR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversiones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCampaigns.map(campaign => {
                const metrics = calculateMetrics(campaign);
                
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-xs text-gray-500">Última sync: {campaign.lastSync}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getChannelColor(campaign.channel)}`}>
                        {campaign.channel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status === 'active' ? 'Activa' : campaign.status === 'paused' ? 'Pausada' : 'Completada'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                        </p>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${Math.min(parseFloat(metrics.budgetSpent), 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {campaign.impressions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {campaign.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      {metrics.ctr}%
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {campaign.conversions}
                        </p>
                        <p className="text-xs text-gray-500">
                          {metrics.conversionRate}%
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${campaign.cpa.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-green-600">
                        +{campaign.roi}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          Ver
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          Abrir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron campañas digitales</h3>
          <p className="text-gray-600">
            Conecta tus cuentas publicitarias para ver las campañas
          </p>
        </div>
      )}
    </div>
  );
}
