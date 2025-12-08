import { useState } from 'react';
import NewCampaignForm from './NewCampaignForm';

interface SMSCampaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
  message: string;
  audience: number;
  sent: number;
  delivered: number;
  clicks: number;
  scheduledDate?: string;
  createdAt: string;
}

const mockCampaigns: SMSCampaign[] = [
  {
    id: '1',
    name: 'Black Friday Promo',
    status: 'active',
    message: 'Hola {nombre}! Aprovecha 50% OFF en Premium Streaming...',
    audience: 150000,
    sent: 120000,
    delivered: 117960,
    clicks: 3775,
    createdAt: '2025-10-28'
  },
  {
    id: '2',
    name: 'Sports Package Launch',
    status: 'scheduled',
    message: 'Nuevo paquete deportivo por solo $12.99/mes...',
    audience: 80000,
    sent: 0,
    delivered: 0,
    clicks: 0,
    scheduledDate: '2025-11-01 10:00',
    createdAt: '2025-10-27'
  },
  {
    id: '3',
    name: 'Weekend Special',
    status: 'completed',
    message: 'Fin de semana especial! Activa cualquier servicio...',
    audience: 200000,
    sent: 200000,
    delivered: 196000,
    clicks: 5684,
    createdAt: '2025-10-25'
  }
];

export default function SMSCampaigns() {
  const [campaigns, setCampaigns] = useState<SMSCampaign[]>(mockCampaigns);
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
      completed: 'bg-purple-100 text-purple-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      draft: 'Borrador',
      scheduled: 'Programada',
      active: 'Activa',
      paused: 'Pausada',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const calculateMetrics = (campaign: SMSCampaign) => {
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
              placeholder="Buscar campañas..."
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
              <option value="draft">Borradores</option>
              <option value="scheduled">Programadas</option>
              <option value="active">Activas</option>
              <option value="paused">Pausadas</option>
              <option value="completed">Completadas</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => setShowNewCampaignForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Nueva Campaña SMS
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
                        {getStatusLabel(campaign.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{campaign.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        Audiencia: {campaign.audience.toLocaleString()}
                      </span>
                      {campaign.scheduledDate && (
                        <span>
                          Programada: {campaign.scheduledDate}
                        </span>
                      )}
                      {!campaign.scheduledDate && (
                        <span>
                          Creada: {campaign.createdAt}
                        </span>
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
                    {(campaign.status === 'draft' || campaign.status === 'paused') && (
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
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
                        className="bg-blue-600 h-2 rounded-full transition-all"
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron campañas</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza creando tu primera campaña SMS'}
          </p>
          <button 
            onClick={() => setShowNewCampaignForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Crear Campaña SMS
          </button>
        </div>
      )}

      {/* Modal de Nueva Campaña */}
      {showNewCampaignForm && (
        <NewCampaignForm
          onClose={() => setShowNewCampaignForm(false)}
          onSubmit={(data) => {
            // Crear nueva campaña
            const newCampaign: SMSCampaign = {
              id: Date.now().toString(),
              name: data.name,
              status: 'draft',
              message: 'Mensaje de campaña',
              audience: data.totalReach,
              sent: 0,
              delivered: 0,
              clicks: 0,
              scheduledDate: data.sendSchedules[0]?.date || '',
              createdAt: new Date().toISOString().split('T')[0]
            };
            
            setCampaigns([newCampaign, ...campaigns]);
            setShowNewCampaignForm(false);
            
            // Aquí se enviaría la información a la API de Newry
            console.log('Datos de campaña para enviar a Newry:', data);
          }}
        />
      )}
    </div>
  );
}
