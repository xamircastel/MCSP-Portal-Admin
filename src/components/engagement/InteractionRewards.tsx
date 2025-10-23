import { useState } from 'react';
import { Edit, LogIn, UserPlus, ShoppingBag, CreditCard, Users, Info } from 'lucide-react';
import ChangeRequestModal from './ChangeRequestModal';

export default function InteractionRewards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState<any>(null);

  const interactions = [
    {
      id: 'login',
      name: 'Login Diario',
      description: 'Puntos otorgados al usuario por realizar el primer login del día',
      icon: LogIn,
      points: 50,
      status: 'Activo',
      applyMultiplier: true,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
    },
    {
      id: 'register',
      name: 'Registro en el Portal',
      description: 'Puntos de bienvenida otorgados al completar el registro',
      icon: UserPlus,
      points: 500,
      status: 'Activo',
      applyMultiplier: false,
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
    {
      id: 'subscription',
      name: 'Contratación de Suscripción',
      description: 'Puntos otorgados por cada contratación de suscripción',
      icon: ShoppingBag,
      points: 200,
      status: 'Activo',
      applyMultiplier: true,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
    },
    {
      id: 'oneshot',
      name: 'Compra One-Shot',
      description: 'Puntos otorgados por cada compra única',
      icon: ShoppingBag,
      points: 150,
      status: 'Activo',
      applyMultiplier: true,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
    },
    {
      id: 'recharge',
      name: 'Recarga de Saldo',
      description: 'Puntos otorgados por cada recarga de saldo',
      icon: CreditCard,
      points: 50,
      status: 'Activo',
      applyMultiplier: true,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
    },
    {
      id: 'multi-service',
      name: 'Permanencia Multi-Servicio',
      description: 'Triggers por mantener múltiples suscripciones activas',
      icon: Users,
      points: 0,
      status: 'Activo',
      applyMultiplier: true,
      color: 'bg-pink-500',
      textColor: 'text-pink-600',
      hasTriggers: true,
      triggers: [
        { name: 'Duo 30 días', subscriptions: 2, days: 30, points: 300 },
        { name: 'Trio 60 días', subscriptions: 3, days: 60, points: 600 },
      ],
    },
  ];

  const handleEditInteraction = (interaction: any) => {
    setSelectedInteraction(interaction);
    setIsModalOpen(true);
  };

  const getFormFields = () => {
    if (selectedInteraction?.hasTriggers) {
      return [
        {
          name: 'triggerName',
          label: 'Nombre del Trigger',
          type: 'text' as const,
        },
        {
          name: 'subscriptions',
          label: 'Cantidad de Suscripciones',
          type: 'number' as const,
        },
        {
          name: 'days',
          label: 'Días de Permanencia',
          type: 'number' as const,
        },
        {
          name: 'points',
          label: 'Puntos a Entregar',
          type: 'number' as const,
        },
        {
          name: 'applyMultiplier',
          label: 'Aplicar Multiplicador por Nivel',
          type: 'toggle' as const,
          value: selectedInteraction?.applyMultiplier,
        },
      ];
    }

    return [
      {
        name: 'points',
        label: 'Cantidad de Puntos',
        type: 'number' as const,
        value: selectedInteraction?.points,
      },
      {
        name: 'status',
        label: 'Estado',
        type: 'select' as const,
        options: ['Activo', 'Inactivo'],
        value: selectedInteraction?.status,
      },
      {
        name: 'applyMultiplier',
        label: 'Aplicar Multiplicador por Nivel',
        type: 'toggle' as const,
        value: selectedInteraction?.applyMultiplier,
      },
    ];
  };

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-blue-900">Recompensas por Interacciones</h4>
          <p className="text-sm text-blue-700 mt-1">
            Configure la cantidad de puntos que los usuarios reciben por cada tipo de interacción en la plataforma. 
            Los multiplicadores por nivel se aplican automáticamente según la configuración.
          </p>
        </div>
      </div>

      {/* Interactions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interactions.map((interaction) => {
          const Icon = interaction.icon;
          return (
            <div
              key={interaction.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${interaction.color} rounded-lg flex items-center justify-center text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <button
                  onClick={() => handleEditInteraction(interaction)}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Solicitar cambio"
                >
                  <Edit className="h-5 w-5" />
                </button>
              </div>

              <h3 className={`text-lg font-bold ${interaction.textColor} mb-2`}>
                {interaction.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{interaction.description}</p>

              {!interaction.hasTriggers ? (
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Puntos Base:</span>
                      <span className="text-xl font-bold text-green-600">{interaction.points} pts</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Multiplicador:</span>
                    <span className={`font-semibold ${interaction.applyMultiplier ? 'text-green-600' : 'text-gray-400'}`}>
                      {interaction.applyMultiplier ? 'Sí aplica' : 'No aplica'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Estado:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      interaction.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {interaction.status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700 mb-2">Triggers Configurados:</p>
                  {interaction.triggers?.map((trigger: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-2 text-xs">
                      <div className="font-semibold text-gray-900">{trigger.name}</div>
                      <div className="text-gray-600 mt-1">
                        {trigger.subscriptions} servicios × {trigger.days} días = <span className="text-green-600 font-bold">{trigger.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Resumen de Recompensas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interacción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puntos Base
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Multiplicador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ejemplo (Nivel Gold)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {interactions.filter(i => !i.hasTriggers).map((interaction) => {
                const Icon = interaction.icon;
                const examplePoints = interaction.applyMultiplier ? interaction.points * 2 : interaction.points;
                return (
                  <tr key={interaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 ${interaction.color} rounded-lg flex items-center justify-center text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{interaction.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-green-600">{interaction.points} pts</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-semibold ${interaction.applyMultiplier ? 'text-green-600' : 'text-gray-400'}`}>
                        {interaction.applyMultiplier ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {examplePoints} pts
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        interaction.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {interaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditInteraction(interaction)}
                        className="text-green-600 hover:text-green-900 flex items-center ml-auto"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Request Modal */}
      <ChangeRequestModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedInteraction(null);
        }}
        title={`Solicitar Cambio - ${selectedInteraction?.name}`}
        section="Recompensas por Interacciones"
        currentData={selectedInteraction}
        fields={getFormFields()}
      />
    </div>
  );
}
