import { useState } from 'react';
import { Edit, Phone, Gift, Package, Info, Ticket, Coins, Sparkles } from 'lucide-react';
import ChangeRequestModal from './ChangeRequestModal';

type RewardTab = 'telco' | 'vouchers' | 'raffles' | 'roulette' | 'scratch';

export default function RewardEcosystem() {
  const [activeTab, setActiveTab] = useState<RewardTab>('telco');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  const telcoProducts = [
    {
      id: 1,
      category: 'Minutos',
      name: 'Bono 50 Minutos',
      quantity: 50,
      unit: 'Minutos',
      points: 250,
      description: '50 minutos a cualquier destino nacional',
      stock: 'Ilimitado',
      status: 'Activo',
    },
    {
      id: 2,
      category: 'Minutos',
      name: 'Bono 100 Minutos',
      quantity: 100,
      unit: 'Minutos',
      points: 500,
      description: '100 minutos a cualquier destino nacional',
      stock: 'Ilimitado',
      status: 'Activo',
    },
    {
      id: 3,
      category: 'MegaBytes',
      name: 'Bono 500 MB',
      quantity: 500,
      unit: 'MB',
      points: 300,
      description: '500 MB de navegación',
      stock: 'Ilimitado',
      status: 'Activo',
    },
    {
      id: 4,
      category: 'MegaBytes',
      name: 'Bono 1 GB',
      quantity: 1,
      unit: 'GB',
      points: 550,
      description: '1 GB de navegación',
      stock: 'Ilimitado',
      status: 'Activo',
    },
    {
      id: 5,
      category: 'SMS',
      name: 'Bono 50 SMS',
      quantity: 50,
      unit: 'SMS',
      points: 200,
      description: '50 SMS a cualquier destino nacional',
      stock: 'Ilimitado',
      status: 'Activo',
    },
  ];

  const vouchers = [
    {
      id: 1,
      name: 'Descuento 20% Amazon',
      description: 'Cupón de descuento del 20% válido en Amazon.com',
      category: 'E-commerce',
      points: 1000,
      value: 10,
      stock: 500,
      stockUsed: 243,
      status: 'Activo',
      availableForLevels: ['Bronce', 'Plata', 'Oro'],
    },
    {
      id: 2,
      name: 'Vale $15 Uber Eats',
      description: 'Vale de $15 USD para pedidos en Uber Eats',
      category: 'Comida',
      points: 1500,
      value: 15,
      stock: 300,
      stockUsed: 187,
      status: 'Activo',
      availableForLevels: ['Plata', 'Oro'],
    },
    {
      id: 3,
      name: 'Spotify Premium 1 Mes',
      description: 'Suscripción de 1 mes a Spotify Premium',
      category: 'Entretenimiento',
      points: 800,
      value: 9.99,
      stock: 1000,
      stockUsed: 456,
      status: 'Activo',
      availableForLevels: ['Oro'],
    },
  ];

  const raffles = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      description: 'iPhone 15 Pro Max 256GB color negro. Sorteo mensual exclusivo.',
      pointsPerTicket: 100,
      ticketsSold: 678,
      requiredLevel: 'Gold',
      startDate: '2025-11-01',
      closeDate: '2025-11-30',
      raffleDate: '2025-12-01',
      status: 'Activo',
      method: 'Aleatorio',
    },
    {
      id: 2,
      name: 'PlayStation 5',
      description: 'Consola PlayStation 5 con 2 controles y 3 juegos.',
      pointsPerTicket: 50,
      ticketsSold: 1234,
      requiredLevel: 'Silver',
      startDate: '2025-11-15',
      closeDate: '2025-12-15',
      raffleDate: '2025-12-16',
      status: 'Activo',
      method: 'Aleatorio',
    },
    {
      id: 3,
      name: 'MacBook Air M3',
      description: 'MacBook Air con chip M3, 16GB RAM, 512GB SSD.',
      pointsPerTicket: 200,
      ticketsSold: 0,
      requiredLevel: 'Gold',
      startDate: '2025-12-01',
      closeDate: '2025-12-31',
      raffleDate: '2026-01-05',
      status: 'Programado',
      method: 'Aleatorio',
    },
  ];

  const rouletteConfig = {
    pointsPerSpin: 50,
    status: 'Activo',
    prizes: [
      { id: 1, name: '100 Puntos', type: 'Puntos', value: 100, stock: 'Ilimitado', probability: 15 },
      { id: 2, name: '50 MB', type: 'Datos', value: 50, stock: 'Ilimitado', probability: 20 },
      { id: 3, name: '10 Minutos', type: 'Minutos', value: 10, stock: 'Ilimitado', probability: 20 },
      { id: 4, name: 'Sigue Intentando', type: 'Sin Premio', value: 0, stock: 'N/A', probability: 30 },
      { id: 5, name: 'Vale $5 USD', type: 'Voucher', value: 5, stock: 100, probability: 10 },
      { id: 6, name: '200 Puntos', type: 'Puntos', value: 200, stock: 'Ilimitado', probability: 5 },
    ],
  };

  const scratchConfig = {
    pointsPerAttempt: 30,
    status: 'Activo',
    prizes: [
      { id: 1, name: '50 Puntos', type: 'Puntos', value: 50, stock: 'Ilimitado', probability: 20 },
      { id: 2, name: '100 MB', type: 'Datos', value: 100, stock: 'Ilimitado', probability: 15 },
      { id: 3, name: '5 Minutos', type: 'Minutos', value: 5, stock: 'Ilimitado', probability: 15 },
      { id: 4, name: 'Sigue Intentando', type: 'Sin Premio', value: 0, stock: 'N/A', probability: 40 },
      { id: 5, name: 'Vale $3 USD', type: 'Voucher', value: 3, stock: 50, probability: 8 },
      { id: 6, name: '150 Puntos', type: 'Puntos', value: 150, stock: 'Ilimitado', probability: 2 },
    ],
  };

  const handleEditReward = (reward: any, type: string) => {
    setSelectedReward({ ...reward, rewardType: type });
    setIsModalOpen(true);
  };

  const getFormFields = () => {
    const rewardType = selectedReward?.rewardType;

    if (rewardType === 'telco') {
      return [
        {
          name: 'name',
          label: 'Nombre del Producto',
          type: 'text' as const,
          value: selectedReward?.name,
        },
        {
          name: 'quantity',
          label: 'Cantidad',
          type: 'number' as const,
          value: selectedReward?.quantity,
        },
        {
          name: 'points',
          label: 'Puntos Requeridos',
          type: 'number' as const,
          value: selectedReward?.points,
        },
        {
          name: 'description',
          label: 'Descripción',
          type: 'textarea' as const,
          value: selectedReward?.description,
        },
        {
          name: 'status',
          label: 'Estado',
          type: 'select' as const,
          options: ['Activo', 'Inactivo'],
          value: selectedReward?.status,
        },
      ];
    }

    if (rewardType === 'voucher') {
      return [
        {
          name: 'name',
          label: 'Nombre del Voucher',
          type: 'text' as const,
          value: selectedReward?.name,
        },
        {
          name: 'description',
          label: 'Descripción',
          type: 'textarea' as const,
          value: selectedReward?.description,
        },
        {
          name: 'category',
          label: 'Categoría',
          type: 'select' as const,
          options: ['E-commerce', 'Entretenimiento', 'Comida', 'Servicios'],
          value: selectedReward?.category,
        },
        {
          name: 'points',
          label: 'Puntos Requeridos',
          type: 'number' as const,
          value: selectedReward?.points,
        },
        {
          name: 'value',
          label: 'Valor Monetario (USD)',
          type: 'number' as const,
          value: selectedReward?.value,
        },
        {
          name: 'stock',
          label: 'Cantidad en Stock',
          type: 'number' as const,
          value: selectedReward?.stock,
        },
        {
          name: 'availableForLevels',
          label: 'Disponible para Niveles de Usuario',
          type: 'text' as const,
          value: selectedReward?.availableForLevels?.join(', '),
          placeholder: 'Ej: Bronce, Plata, Oro',
        },
        {
          name: 'status',
          label: 'Estado',
          type: 'select' as const,
          options: ['Activo', 'Inactivo'],
          value: selectedReward?.status,
        },
      ];
    }

    if (rewardType === 'raffle') {
      return [
        {
          name: 'name',
          label: 'Nombre del Premio',
          type: 'text' as const,
          value: selectedReward?.name,
        },
        {
          name: 'description',
          label: 'Descripción',
          type: 'textarea' as const,
          value: selectedReward?.description,
        },
        {
          name: 'pointsPerTicket',
          label: 'Puntos por Ticket',
          type: 'number' as const,
          value: selectedReward?.pointsPerTicket,
        },
        {
          name: 'requiredLevel',
          label: 'Nivel Requerido para Participar',
          type: 'select' as const,
          options: ['Bronce', 'Silver', 'Gold'],
          value: selectedReward?.requiredLevel,
        },
        {
          name: 'startDate',
          label: 'Fecha de Inicio',
          type: 'date' as const,
          value: selectedReward?.startDate,
        },
        {
          name: 'closeDate',
          label: 'Fecha de Cierre',
          type: 'date' as const,
          value: selectedReward?.closeDate,
        },
        {
          name: 'raffleDate',
          label: 'Fecha del Sorteo',
          type: 'date' as const,
          value: selectedReward?.raffleDate,
        },
        {
          name: 'status',
          label: 'Estado',
          type: 'select' as const,
          options: ['Programado', 'Activo', 'Cerrado', 'Finalizado'],
          value: selectedReward?.status,
        },
      ];
    }

    if (rewardType === 'roulette') {
      return [
        {
          name: 'pointsPerSpin',
          label: 'Puntos por Giro',
          type: 'number' as const,
          value: selectedReward?.pointsPerSpin,
        },
        {
          name: 'prizeName',
          label: 'Nombre del Premio (si es específico)',
          type: 'text' as const,
        },
        {
          name: 'prizeValue',
          label: 'Valor del Premio',
          type: 'number' as const,
        },
        {
          name: 'stock',
          label: 'Stock Disponible',
          type: 'text' as const,
        },
        {
          name: 'status',
          label: 'Estado',
          type: 'select' as const,
          options: ['Activo', 'Inactivo'],
          value: selectedReward?.status,
        },
      ];
    }

    if (rewardType === 'scratch') {
      return [
        {
          name: 'pointsPerAttempt',
          label: 'Puntos por Intento',
          type: 'number' as const,
          value: selectedReward?.pointsPerAttempt,
        },
        {
          name: 'prizeName',
          label: 'Nombre del Premio (si es específico)',
          type: 'text' as const,
        },
        {
          name: 'prizeValue',
          label: 'Valor del Premio',
          type: 'number' as const,
        },
        {
          name: 'stock',
          label: 'Stock Disponible',
          type: 'text' as const,
        },
        {
          name: 'status',
          label: 'Estado',
          type: 'select' as const,
          options: ['Activo', 'Inactivo'],
          value: selectedReward?.status,
        },
      ];
    }

    return [];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Programado':
        return 'bg-blue-100 text-blue-800';
      case 'Cerrado':
        return 'bg-orange-100 text-orange-800';
      case 'Finalizado':
        return 'bg-purple-100 text-purple-800';
      case 'Inactivo':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateStockPercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-green-900">Ecosistema de Canje</h4>
          <p className="text-sm text-green-700 mt-1">
            Configure los productos disponibles para canje con puntos: productos telco, vouchers digitales y sorteos de premios físicos.
          </p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('telco')}
            className={`
              py-3 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap
              ${activeTab === 'telco' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <Phone className="h-5 w-5 mr-2" />
            Productos Telco
          </button>
          <button
            onClick={() => setActiveTab('vouchers')}
            className={`
              py-3 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap
              ${activeTab === 'vouchers' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <Ticket className="h-5 w-5 mr-2" />
            Vouchers Digitales
          </button>
          <button
            onClick={() => setActiveTab('raffles')}
            className={`
              py-3 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap
              ${activeTab === 'raffles' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <Gift className="h-5 w-5 mr-2" />
            Premios Físicos (Sorteos)
          </button>
          <button
            onClick={() => setActiveTab('roulette')}
            className={`
              py-3 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap
              ${activeTab === 'roulette' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <Coins className="h-5 w-5 mr-2" />
            Ruleta
          </button>
          <button
            onClick={() => setActiveTab('scratch')}
            className={`
              py-3 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap
              ${activeTab === 'scratch' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Raspa y Gana
          </button>
        </nav>
      </div>

      {/* Telco Products Tab */}
      {activeTab === 'telco' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Productos Telco Canjeables</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Puntos Requeridos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
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
                {telcoProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.quantity} {product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-green-600">{product.points} pts</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditReward(product, 'telco')}
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
      )}

      {/* Vouchers Tab */}
      {activeTab === 'vouchers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {vouchers.map((voucher) => {
              const stockPercentage = calculateStockPercentage(voucher.stockUsed, voucher.stock);
              const stockRemaining = voucher.stock - voucher.stockUsed;
              return (
                <div key={voucher.id} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                        <Package className="h-6 w-6" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-bold text-gray-900">{voucher.name}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                          {voucher.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditReward(voucher, 'voucher')}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="Solicitar cambio"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{voucher.description}</p>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Valor:</span>
                      <span className="text-lg font-bold text-blue-600">${voucher.value} USD</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Costo:</span>
                      <span className="text-lg font-bold text-green-600">{voucher.points} pts</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-600 font-medium">Stock Disponible</span>
                        <span className="text-xs text-gray-900 font-semibold">{stockRemaining} de {voucher.stock}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${stockPercentage > 80 ? 'bg-red-500' : stockPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${100 - stockPercentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-600 font-medium mb-2">Disponible para usuario nivel:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {voucher.availableForLevels.map((level) => (
                          <span
                            key={level}
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                              level === 'Oro' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                              level === 'Plata' ? 'bg-gray-200 text-gray-800 border border-gray-400' :
                              'bg-orange-100 text-orange-800 border border-orange-300'
                            }`}
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Raffles Tab */}
      {activeTab === 'raffles' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {raffles.map((raffle) => {
              const getLevelColor = (level: string) => {
                switch (level) {
                  case 'Gold':
                    return 'bg-yellow-100 text-yellow-800';
                  case 'Silver':
                    return 'bg-gray-100 text-gray-800';
                  case 'Bronce':
                    return 'bg-amber-100 text-amber-800';
                  default:
                    return 'bg-gray-100 text-gray-800';
                }
              };

              return (
                <div key={raffle.id} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
                        <Gift className="h-8 w-8" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900">{raffle.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(raffle.status)}`}>
                          {raffle.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditReward(raffle, 'raffle')}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="Solicitar cambio"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{raffle.description}</p>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xs text-blue-600 font-medium">Costo/Ticket</div>
                        <div className="text-lg font-bold text-blue-900">{raffle.pointsPerTicket} pts</div>
                      </div>
                      <div className={`rounded-lg p-3 ${getLevelColor(raffle.requiredLevel)}`}>
                        <div className="text-xs font-medium">Nivel Requerido</div>
                        <div className="text-sm font-bold">{raffle.requiredLevel}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 font-medium">Tickets Vendidos</span>
                        <span className="text-lg font-bold text-green-600">
                          {raffle.ticketsSold}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Participan todos los usuarios que compren tickets
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200">
                      <div>
                        <div className="text-xs text-gray-500">Inicio</div>
                        <div className="text-xs font-semibold text-gray-900">
                          {new Date(raffle.startDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Cierre</div>
                        <div className="text-xs font-semibold text-gray-900">
                          {new Date(raffle.closeDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Sorteo</div>
                        <div className="text-xs font-semibold text-green-600">
                          {new Date(raffle.raffleDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Roulette Tab */}
      {activeTab === 'roulette' && (
        <div className="space-y-6">
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <Coins className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Ruleta de Premios</h4>
                <p className="text-xs text-blue-700">
                  Los usuarios pueden girar la ruleta gastando puntos. Cada giro tiene probabilidades definidas de obtener diferentes premios.
                  La opción "Sigue Intentando" permite al usuario girar sin ganar premio.
                </p>
              </div>
            </div>
          </div>

          {/* Configuration Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Configuración de la Ruleta</h3>
                <p className="text-sm text-gray-500 mt-1">Configuración general de la mecánica</p>
              </div>
              <button
                onClick={() => handleEdit({ name: 'Ruleta de Premios', ...rouletteConfig })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Editar Configuración
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Puntos por Giro</div>
                <div className="text-2xl font-bold text-gray-900">{rouletteConfig.pointsPerSpin}</div>
                <div className="text-xs text-gray-600 mt-1">Puntos descontados del usuario</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Estado</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    rouletteConfig.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {rouletteConfig.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Prizes Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Premios Disponibles</h3>
              <p className="text-sm text-gray-500 mt-1">Listado de todos los premios de la ruleta con sus probabilidades</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probabilidad</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rouletteConfig.prizes.map((prize) => (
                    <tr key={prize.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{prize.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          prize.type === 'Puntos' ? 'bg-yellow-100 text-yellow-800' :
                          prize.type === 'Datos' ? 'bg-blue-100 text-blue-800' :
                          prize.type === 'Minutos' ? 'bg-green-100 text-green-800' :
                          prize.type === 'Voucher' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {prize.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {prize.value > 0 ? prize.value : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${
                          prize.stock === 'Ilimitado' || prize.stock === 'N/A' ? 'text-green-600' :
                          typeof prize.stock === 'number' && prize.stock > 50 ? 'text-green-600' :
                          typeof prize.stock === 'number' && prize.stock > 0 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {prize.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {prize.probability}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() => handleEdit({ name: prize.name, rewardType: 'roulette', ...prize })}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Scratch and Win Tab */}
      {activeTab === 'scratch' && (
        <div className="space-y-6">
          {/* Info Box */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-900 mb-1">Raspa y Gana</h4>
                <p className="text-xs text-purple-700">
                  Los usuarios pueden raspar una tarjeta virtual gastando puntos. Cada intento tiene probabilidades definidas de obtener diferentes premios.
                  Similar a la ruleta, incluye la opción "Sigue Intentando".
                </p>
              </div>
            </div>
          </div>

          {/* Configuration Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Configuración de Raspa y Gana</h3>
                <p className="text-sm text-gray-500 mt-1">Configuración general de la mecánica</p>
              </div>
              <button
                onClick={() => handleEdit({ name: 'Raspa y Gana', ...scratchConfig })}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Editar Configuración
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Puntos por Intento</div>
                <div className="text-2xl font-bold text-gray-900">{scratchConfig.pointsPerAttempt}</div>
                <div className="text-xs text-gray-600 mt-1">Puntos descontados del usuario</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Estado</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    scratchConfig.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {scratchConfig.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Prizes Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Premios Disponibles</h3>
              <p className="text-sm text-gray-500 mt-1">Listado de todos los premios de raspa y gana con sus probabilidades</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probabilidad</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scratchConfig.prizes.map((prize) => (
                    <tr key={prize.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{prize.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          prize.type === 'Puntos' ? 'bg-yellow-100 text-yellow-800' :
                          prize.type === 'Datos' ? 'bg-blue-100 text-blue-800' :
                          prize.type === 'Minutos' ? 'bg-green-100 text-green-800' :
                          prize.type === 'Voucher' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {prize.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {prize.value > 0 ? prize.value : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${
                          prize.stock === 'Ilimitado' || prize.stock === 'N/A' ? 'text-green-600' :
                          typeof prize.stock === 'number' && prize.stock > 50 ? 'text-green-600' :
                          typeof prize.stock === 'number' && prize.stock > 0 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {prize.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {prize.probability}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() => handleEdit({ name: prize.name, rewardType: 'scratch', ...prize })}
                          className="text-purple-600 hover:text-purple-900 font-medium"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Change Request Modal */}
      <ChangeRequestModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReward(null);
        }}
        title={`Solicitar Cambio - ${selectedReward?.name}`}
        section={`Ecosistema de Canje - ${activeTab === 'telco' ? 'Productos Telco' : activeTab === 'vouchers' ? 'Vouchers' : activeTab === 'raffles' ? 'Sorteos' : activeTab === 'roulette' ? 'Ruleta' : 'Raspa y Gana'}`}
        currentData={selectedReward}
        fields={getFormFields()}
      />
    </div>
  );
}
