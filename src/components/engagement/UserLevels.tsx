import { useState } from 'react';
import { Edit, Info } from 'lucide-react';
import ChangeRequestModal from './ChangeRequestModal';

export default function UserLevels() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);

  const levels = [
    {
      name: 'Bronce',
      minPoints: 0,
      maxPoints: 1000,
      multiplier: 1.0,
      color: 'bg-amber-700',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
    },
    {
      name: 'Silver',
      minPoints: 1001,
      maxPoints: 2000,
      multiplier: 1.5,
      color: 'bg-gray-400',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
    {
      name: 'Gold',
      minPoints: 2001,
      maxPoints: null,
      multiplier: 2.0,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  const handleEditLevel = (level: any) => {
    setSelectedLevel(level);
    setIsModalOpen(true);
  };

  const formFields = [
    {
      name: 'minPoints',
      label: 'Puntos Mínimos',
      type: 'number' as const,
      value: selectedLevel?.minPoints,
    },
    {
      name: 'maxPoints',
      label: 'Puntos Máximos',
      type: 'number' as const,
      value: selectedLevel?.maxPoints,
    },
    {
      name: 'multiplier',
      label: 'Multiplicador',
      type: 'number' as const,
      value: selectedLevel?.multiplier,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-blue-900">Información sobre Niveles</h4>
          <p className="text-sm text-blue-700 mt-1">
            Los niveles determinan los rangos de puntos acumulados por cada usuario y el multiplicador
            aplicado a sus futuras recompensas. Los cambios se aplicarán mediante ticket de soporte.
          </p>
        </div>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level) => (
          <div
            key={level.name}
            className={`${level.bgColor} border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-12 h-12 ${level.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {level.name[0]}
                </div>
                <div className="ml-3">
                  <h3 className={`text-xl font-bold ${level.textColor}`}>{level.name}</h3>
                  <p className="text-sm text-gray-500">Nivel de Usuario</p>
                </div>
              </div>
              <button
                onClick={() => handleEditLevel(level)}
                className="p-2 text-gray-600 hover:text-green-600 hover:bg-white rounded-lg transition-colors"
                title="Solicitar cambio"
              >
                <Edit className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Puntos Mínimos:</span>
                <span className="text-sm font-bold text-gray-900">{level.minPoints.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Puntos Máximos:</span>
                <span className="text-sm font-bold text-gray-900">
                  {level.maxPoints ? level.maxPoints.toLocaleString() : 'Ilimitado'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-gray-600">Multiplicador:</span>
                <span className="text-lg font-bold text-green-600">x{level.multiplier}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Los usuarios en este nivel reciben <span className="font-semibold">{level.multiplier}x</span> puntos
                en todas sus interacciones.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Resumen de Configuración</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nivel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rango de Puntos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Multiplicador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ejemplo de Recompensa
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {levels.map((level) => (
                <tr key={level.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 ${level.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {level.name[0]}
                      </div>
                      <span className={`ml-3 font-medium ${level.textColor}`}>{level.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {level.minPoints.toLocaleString()} - {level.maxPoints ? level.maxPoints.toLocaleString() : '∞'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-bold text-green-600">x{level.multiplier}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    100 pts base = {100 * level.multiplier} pts totales
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditLevel(level)}
                      className="text-green-600 hover:text-green-900 flex items-center ml-auto"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Request Modal */}
      <ChangeRequestModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLevel(null);
        }}
        title={`Solicitar Cambio - Nivel ${selectedLevel?.name}`}
        section="Niveles de Usuario"
        currentData={selectedLevel}
        fields={formFields}
      />
    </div>
  );
}
