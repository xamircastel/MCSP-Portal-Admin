import { useState } from 'react';
import { Edit, Target, Calendar, Award, Info, TrendingUp } from 'lucide-react';
import ChangeRequestModal from './ChangeRequestModal';

export default function Missions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<any>(null);

  const missions = [
    {
      id: 1,
      name: 'Descubre Netflix',
      description: 'Contrata Netflix Premium este mes',
      type: 'specific-product',
      product: 'Netflix Premium',
      productId: 'PROD_025',
      points: 500,
      expirationDate: '2025-12-31',
      status: 'Activo',
      participants: 145,
      completions: 89,
      icon: Target,
      color: 'bg-red-500',
    },
    {
      id: 2,
      name: 'Compra 3 Servicios',
      description: 'Realiza 3 compras on demand esta semana',
      type: 'quantity',
      quantity: 3,
      productType: 'Cualquier producto',
      points: 300,
      expirationDate: '2025-11-30',
      status: 'Activo',
      participants: 234,
      completions: 156,
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      id: 3,
      name: 'Fan de Disney+',
      description: 'Suscríbete a Disney+ y mantén activa tu suscripción por 30 días',
      type: 'specific-product',
      product: 'Disney+ Premium',
      productId: 'PROD_042',
      points: 600,
      expirationDate: '2025-12-15',
      status: 'Activo',
      participants: 98,
      completions: 45,
      icon: Award,
      color: 'bg-indigo-500',
    },
    {
      id: 4,
      name: 'Compra 5 Productos',
      description: 'Adquiere 5 productos diferentes durante este mes',
      type: 'quantity',
      quantity: 5,
      productType: 'Cualquier producto',
      points: 800,
      expirationDate: '2025-11-25',
      status: 'Programada',
      participants: 0,
      completions: 0,
      icon: Target,
      color: 'bg-purple-500',
    },
  ];

  const handleEditMission = (mission: any) => {
    setSelectedMission(mission);
    setIsModalOpen(true);
  };

  const getFormFields = () => {
    if (selectedMission?.type === 'specific-product') {
      return [
        {
          name: 'name',
          label: 'Nombre de la Misión',
          type: 'text' as const,
          value: selectedMission?.name,
        },
        {
          name: 'description',
          label: 'Descripción',
          type: 'textarea' as const,
          value: selectedMission?.description,
        },
        {
          name: 'product',
          label: 'Producto Específico',
          type: 'text' as const,
          value: selectedMission?.product,
        },
        {
          name: 'points',
          label: 'Puntos a Entregar',
          type: 'number' as const,
          value: selectedMission?.points,
        },
        {
          name: 'expirationDate',
          label: 'Fecha de Caducidad',
          type: 'date' as const,
          value: selectedMission?.expirationDate,
        },
        {
          name: 'status',
          label: 'Estado',
          type: 'select' as const,
          options: ['Activo', 'Programada', 'Inactivo', 'Finalizada'],
          value: selectedMission?.status,
        },
      ];
    }

    return [
      {
        name: 'name',
        label: 'Nombre de la Misión',
        type: 'text' as const,
        value: selectedMission?.name,
      },
      {
        name: 'description',
        label: 'Descripción',
        type: 'textarea' as const,
        value: selectedMission?.description,
      },
      {
        name: 'quantity',
        label: 'Cantidad de Productos',
        type: 'number' as const,
        value: selectedMission?.quantity,
      },
      {
        name: 'productType',
        label: 'Tipo de Productos',
        type: 'select' as const,
        options: ['Cualquier producto', 'Suscripciones', 'One-Shot', 'Categoría específica'],
        value: selectedMission?.productType,
      },
      {
        name: 'points',
        label: 'Puntos a Entregar',
        type: 'number' as const,
        value: selectedMission?.points,
      },
      {
        name: 'expirationDate',
        label: 'Fecha de Caducidad',
        type: 'date' as const,
        value: selectedMission?.expirationDate,
      },
      {
        name: 'status',
        label: 'Estado',
        type: 'select' as const,
        options: ['Activo', 'Programada', 'Inactivo', 'Finalizada'],
        value: selectedMission?.status,
      },
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Programada':
        return 'bg-blue-100 text-blue-800';
      case 'Inactivo':
        return 'bg-gray-100 text-gray-800';
      case 'Finalizada':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateCompletionRate = (completions: number, participants: number) => {
    if (participants === 0) return 0;
    return Math.round((completions / participants) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-purple-900">Misiones y Desafíos</h4>
          <p className="text-sm text-purple-700 mt-1">
            Las misiones son objetivos temporales que los usuarios pueden completar para ganar puntos extra. 
            Incluyen misiones de producto específico y de cantidad de productos.
          </p>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {missions.map((mission) => {
          const Icon = mission.icon;
          const completionRate = calculateCompletionRate(mission.completions, mission.participants);
          return (
            <div
              key={mission.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-14 h-14 ${mission.color} rounded-lg flex items-center justify-center text-white`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">{mission.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(mission.status)}`}>
                      {mission.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleEditMission(mission)}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Solicitar cambio"
                >
                  <Edit className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">{mission.description}</p>

              <div className="space-y-3">
                {mission.type === 'specific-product' ? (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-blue-600 font-medium mb-1">Producto Requerido</div>
                    <div className="text-sm font-semibold text-blue-900">{mission.product}</div>
                    <div className="text-xs text-blue-600 mt-1">ID: {mission.productId}</div>
                  </div>
                ) : (
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xs text-green-600 font-medium mb-1">Cantidad Requerida</div>
                    <div className="text-sm font-semibold text-green-900">
                      {mission.quantity} productos - {mission.productType}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 font-medium">Recompensa</div>
                    <div className="text-lg font-bold text-green-600">{mission.points} pts</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 font-medium flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Expira
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {new Date(mission.expirationDate).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                </div>

                {mission.status === 'Activo' && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-600 font-medium">Progreso</span>
                      <span className="text-xs text-gray-900 font-semibold">{completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{mission.participants} participantes</span>
                      <span>{mission.completions} completados</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Todas las Misiones</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Misión
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puntos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Caducidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participantes
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {missions.map((mission) => {
                const Icon = mission.icon;
                return (
                  <tr key={mission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 ${mission.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{mission.name}</div>
                          <div className="text-xs text-gray-500">{mission.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mission.type === 'specific-product' ? 'Producto Específico' : 'Cantidad'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-green-600">{mission.points} pts</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(mission.expirationDate).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                        {mission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mission.participants} ({mission.completions} completados)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditMission(mission)}
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
          setSelectedMission(null);
        }}
        title={`Solicitar Cambio - ${selectedMission?.name}`}
        section="Misiones y Desafíos"
        currentData={selectedMission}
        fields={getFormFields()}
      />
    </div>
  );
}
