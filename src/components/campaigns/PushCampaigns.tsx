import { useState } from 'react';

interface PushCampaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  title: string;
  message: string;
  platform: 'Android' | 'iOS' | 'Both';
  audience: number;
  sent: number;
  delivered: number;
  impressions: number;
  clicks: number;
  conversions: number;
  scheduledDate?: string;
}

const mockPushCampaigns: PushCampaign[] = [
  {
    id: '1',
    name: 'Weekend Special Push',
    status: 'completed',
    title: 'Oferta especial de fin de semana!',
    message: 'Premium Streaming con 30% OFF solo por 48h',
    platform: 'Both',
    audience: 80000,
    sent: 80000,
    delivered: 77360,
    impressions: 62088,
    clicks: 3170,
    conversions: 892,
    scheduledDate: '2025-10-25 10:00'
  },
  {
    id: '2',
    name: 'Gaming Launch Notification',
    status: 'active',
    title: 'Nuevo: Gaming Plus Pro',
    message: 'Juega sin límites por $4.99/mes. ¡Actívalo ahora!',
    platform: 'Android',
    audience: 50000,
    sent: 35000,
    delivered: 33950,
    impressions: 27160,
    clicks: 1086,
    conversions: 245,
    scheduledDate: '2025-10-29 14:00'
  }
];

export default function PushCampaigns() {
  const [campaigns] = useState<PushCampaign[]>(mockPushCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || campaign.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const calculateMetrics = (campaign: PushCampaign) => {
    const deliveryRate = campaign.sent > 0 ? (campaign.delivered / campaign.sent * 100).toFixed(1) : '0.0';
    const impressionRate = campaign.delivered > 0 ? (campaign.impressions / campaign.delivered * 100).toFixed(1) : '0.0';
    const ctr = campaign.delivered > 0 ? (campaign.clicks / campaign.delivered * 100).toFixed(2) : '0.00';
    const conversionRate = campaign.clicks > 0 ? (campaign.conversions / campaign.clicks * 100).toFixed(2) : '0.00';
    
    return { deliveryRate, impressionRate, ctr, conversionRate };
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar campañas push..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas las plataformas</option>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
              <option value="Both">Ambas</option>
            </select>
          </div>
        </div>

        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Nueva Campaña Push
        </button>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map(campaign => {
          const metrics = calculateMetrics(campaign);
          
          return (
            <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Campaign Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status === 'completed' ? 'Completada' : campaign.status === 'active' ? 'Activa' : campaign.status}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        {campaign.platform}
                      </span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-2">
                      <p className="text-sm font-medium text-gray-900 mb-1">{campaign.title}</p>
                      <p className="text-sm text-gray-600">{campaign.message}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Audiencia: {campaign.audience.toLocaleString()}</span>
                      {campaign.scheduledDate && (
                        <span>Programada: {campaign.scheduledDate}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      Ver
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      Editar
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      Duplicar
                    </button>
                    {campaign.status === 'active' && (
                      <button className="px-3 py-1 text-sm text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg">
                        Pausar
                      </button>
                    )}
                    {campaign.status === 'paused' && (
                      <button className="px-3 py-1 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg">
                        Iniciar
                      </button>
                    )}
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Metrics */}
                {campaign.sent > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Enviados</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {campaign.sent.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Entregados</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {campaign.delivered.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600">{metrics.deliveryRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Impresiones</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {campaign.impressions.toLocaleString()}
                      </p>
                      <p className="text-xs text-blue-600">{metrics.impressionRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Clicks</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {campaign.clicks.toLocaleString()}
                      </p>
                      <p className="text-xs text-blue-600">CTR {metrics.ctr}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Conversiones</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {campaign.conversions.toLocaleString()}
                      </p>
                      <p className="text-xs text-purple-600">{metrics.conversionRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">CPA</p>
                      <p className="text-lg font-semibold text-gray-900">$12.30</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ROI</p>
                      <p className="text-lg font-semibold text-green-600">+310%</p>
                    </div>
                  </div>
                )}

                {/* Progress Bar for Active Campaigns */}
                {campaign.status === 'active' && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progreso de envío</span>
                      <span>{((campaign.sent / campaign.audience) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${(campaign.sent / campaign.audience) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron campañas push</h3>
          <p className="text-gray-600 mb-4">
            Comienza creando tu primera campaña de notificaciones push
          </p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Crear Campaña Push
          </button>
        </div>
      )}
    </div>
  );
}
