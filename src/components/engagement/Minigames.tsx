import { useState } from 'react';
import { Edit, Gamepad2, Award, Info } from 'lucide-react';
import ChangeRequestModal from './ChangeRequestModal';

export default function Minigames() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const minigames = [
    {
      id: 'quiz',
      name: 'Quiz Interactivo',
      description: 'Los usuarios responden preguntas de trivia y ganan puntos por cada respuesta correcta',
      icon: Gamepad2,
      pointsPerAction: 10,
      dailyLimit: 10,
      actionLabel: 'Puntos por pregunta correcta',
      limitLabel: 'Preguntas diarias',
      status: 'Activo',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      managedIn: 'Way Platform',
    },
    {
      id: 'palabra-premiada',
      name: 'Palabra Premiada',
      description: 'Los usuarios descubren la palabra oculta del día y ganan puntos al completarla',
      icon: Award,
      pointsPerAction: 80,
      dailyLimit: 1,
      actionLabel: 'Puntos por palabra completa',
      limitLabel: 'Intentos diarios',
      status: 'Activo',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      managedIn: 'Way Platform',
    },
  ];

  const handleEditGame = (game: any) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const formFields = [
    {
      name: 'pointsPerAction',
      label: selectedGame?.actionLabel || 'Puntos por acción',
      type: 'number' as const,
      value: selectedGame?.pointsPerAction,
    },
    {
      name: 'dailyLimit',
      label: selectedGame?.limitLabel || 'Límite diario',
      type: 'number' as const,
      value: selectedGame?.dailyLimit,
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select' as const,
      options: ['Activo', 'Inactivo'],
      value: selectedGame?.status,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-amber-900">Gestión de Minijuegos</h4>
          <p className="text-sm text-amber-700 mt-1">
            La administración completa de minijuegos se realiza en la plataforma <strong>Way</strong>. 
            Aquí puede visualizar la configuración actual y solicitar cambios mediante tickets que serán 
            procesados por el equipo de backoffice.
          </p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {minigames.map((game) => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              className={`${game.bgColor} border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-14 h-14 ${game.color} rounded-lg flex items-center justify-center text-white`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">{game.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                      {game.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleEditGame(game)}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-white rounded-lg transition-colors"
                  title="Solicitar cambio"
                >
                  <Edit className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">{game.description}</p>

              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">{game.actionLabel}:</span>
                    <span className="text-lg font-bold text-green-600">{game.pointsPerAction} pts</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">{game.limitLabel}:</span>
                    <span className="text-lg font-bold text-blue-600">{game.dailyLimit}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-500">
                  Máximo diario: <span className="font-semibold">{game.pointsPerAction * game.dailyLimit} puntos/día</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Configuración Detallada de Minijuegos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Minijuego
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puntos por Acción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Límite Diario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Max. Puntos/Día
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
              {minigames.map((game) => {
                const Icon = game.icon;
                return (
                  <tr key={game.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 ${game.color} rounded-lg flex items-center justify-center text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{game.name}</div>
                          <div className="text-xs text-gray-500">{game.managedIn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-green-600">{game.pointsPerAction} pts</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {game.dailyLimit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-purple-600">
                        {game.pointsPerAction * game.dailyLimit} pts
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {game.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditGame(game)}
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
          setSelectedGame(null);
        }}
        title={`Solicitar Cambio - ${selectedGame?.name}`}
        section="Minijuegos"
        currentData={selectedGame}
        fields={formFields}
      />
    </div>
  );
}
