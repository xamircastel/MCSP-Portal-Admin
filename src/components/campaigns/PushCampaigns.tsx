import { useState } from 'react';
import NewPushCampaignForm from './NewPushCampaignForm';

interface PushCampaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  template: 'text-only' | 'text-sms' | 'text-browser';
  pushText: string;
  smsText?: string;
  shortCode?: string;
  targetUrl?: string;
  audience: number;
  sent: number;
  delivered: number;
  clicks: number;
  scheduledDate?: string;
  createdAt: string;
}

const mockPushCampaigns: PushCampaign[] = [
  {
    id: '1',
    name: 'Weekend Special Push',
    status: 'completed',
    template: 'text-browser',
    pushText: 'Oferta especial de fin de semana! Premium Streaming con 30% OFF solo por 48h',
    targetUrl: 'https://portal.mscp.com/promo/weekend',
    audience: 80000,
    sent: 80000,
    delivered: 77360,
    clicks: 3170,
    scheduledDate: '2025-10-25 10:00',
    createdAt: '2025-10-20'
  },
  {
    id: '2',
    name: 'Gaming Launch Notification',
    status: 'active',
    template: 'text-sms',
    pushText: 'Nuevo: Gaming Plus Pro - Juega sin límites por $4.99/mes. ¡Actívalo ahora!',
    smsText: 'GAMING',
    shortCode: '1234',
    audience: 50000,
    sent: 35000,
    delivered: 33950,
    clicks: 1086,
    scheduledDate: '2025-10-29 14:00',
    createdAt: '2025-10-28'
  },
  {
    id: '3',
    name: 'Mantenimiento Programado',
    status: 'scheduled',
    template: 'text-only',
    pushText: 'El portal estará en mantenimiento el domingo de 02:00 a 06:00 AM. Disculpa las molestias.',
    audience: 120000,
    sent: 0,
    delivered: 0,
    clicks: 0,
    scheduledDate: '2025-11-03 01:50',
    createdAt: '2025-10-30'
  }
];

export default function PushCampaigns() {
  const [campaigns, setCampaigns] = useState<PushCampaign[]>(mockPushCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
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

  const getTemplateLabel = (template: string) => {
    const labels = {
      'text-only': '📝 Solo Texto',
      'text-sms': '💬 Texto + SMS',
      'text-browser': '🌐 Texto + Navegador'
    };
    return labels[template as keyof typeof labels] || template;
  };

  const handleNewCampaign = (formData: any) => {
    const newCampaign: PushCampaign = {
      id: Date.now().toString(),
      name: formData.campaignName,
      status: 'draft',
      template: formData.sends[0]?.template || 'text-only',
      pushText: formData.sends[0]?.pushText || '',
      smsText: formData.sends[0]?.smsText,
      shortCode: formData.sends[0]?.shortCode,
      targetUrl: formData.sends[0]?.targetUrl,
      audience: 0,
      sent: 0,
      delivered: 0,
      clicks: 0,
      scheduledDate: formData.sends[0]?.schedules[0]?.dateTime,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCampaigns([newCampaign, ...campaigns]);
    setShowNewCampaignForm(false);
  };

  const calculateMetrics = (campaign: PushCampaign) => {
    const deliveryRate = campaign.sent > 0 ? (campaign.delivered / campaign.sent * 100).toFixed(1) : '0.0';
    const ctr = campaign.delivered > 0 ? (campaign.clicks / campaign.delivered * 100).toFixed(2) : '0.00';
    
    return { deliveryRate, ctr };
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="draft">Borrador</option>
              <option value="scheduled">Programada</option>
              <option value="active">Activa</option>
              <option value="paused">Pausada</option>
              <option value="completed">Completada</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => setShowNewCampaignForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Nueva Campaña PUSH
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
                        {campaign.status === 'completed' ? 'Completada' : 
                         campaign.status === 'active' ? 'Activa' : 
                         campaign.status === 'scheduled' ? 'Programada' :
                         campaign.status === 'paused' ? 'Pausada' :
                         'Borrador'}
                      </span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                        {getTemplateLabel(campaign.template)}
                      </span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-2">
                      <p className="text-sm text-gray-900 mb-2">{campaign.pushText}</p>
                      {campaign.template === 'text-sms' && campaign.smsText && (
                        <div className="flex items-center gap-2 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                          <span className="font-medium">SMS:</span>
                          <span>{campaign.smsText}</span>
                          <span className="ml-auto bg-blue-100 px-2 py-0.5 rounded">{campaign.shortCode}</span>
                        </div>
                      )}
                      {campaign.template === 'text-browser' && campaign.targetUrl && (
                        <div className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 p-2 rounded">
                          <span className="font-medium">URL:</span>
                          <span className="truncate">{campaign.targetUrl}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Audiencia: {campaign.audience.toLocaleString()}</span>
                      {campaign.scheduledDate && (
                        <span>Programada: {campaign.scheduledDate}</span>
                      )}
                      <span>Creada: {campaign.createdAt}</span>
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
                        Reanudar
                      </button>
                    )}
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Metrics */}
                {campaign.sent > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
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
                      <p className="text-xs text-gray-500 mb-1">Clicks</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {campaign.clicks.toLocaleString()}
                      </p>
                      <p className="text-xs text-blue-600">CTR {metrics.ctr}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tasa de Conversión</p>
                      <p className="text-lg font-semibold text-purple-600">
                        {((campaign.clicks / campaign.delivered) * 100).toFixed(2)}%
                      </p>
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
          <button 
            onClick={() => setShowNewCampaignForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Crear Campaña PUSH
          </button>
        </div>
      )}

      {/* New Campaign Form Modal */}
      {showNewCampaignForm && (
        <NewPushCampaignForm
          onSubmit={handleNewCampaign}
          onClose={() => setShowNewCampaignForm(false)}
        />
      )}
    </div>
  );
}
