import React, { useState } from 'react';
import { Search, Phone, User, Calendar, Package, AlertCircle, CheckCircle, XCircle, Clock, Ban } from 'lucide-react';

interface Subscription {
  id: string;
  productName: string;
  providerName: string;
  contractDate: string;
  serviceType: 'Suscripción' | 'On-demand';
  status: 'Activa' | 'Cancelada' | 'Cancelación programada' | 'En trial';
  contractChannel: 'HE' | 'WIFI' | 'SAT PUSH' | 'SMS' | 'USSD' | 'Híbrido';
  cancellationChannel?: 'SMS' | 'Ciclo de Vida' | 'Customer Care';
  cancellationDate?: string;
  isBlocked?: boolean;
}

interface UserInfo {
  phoneNumber: string;
  subscriptions: Subscription[];
}

const mockUserData: Record<string, UserInfo> = {
  '573001234567': {
    phoneNumber: '573001234567',
    subscriptions: [
      {
        id: '1',
        productName: 'Premium Streaming',
        providerName: 'Digital Virgo',
        contractDate: '2024-02-15',
        serviceType: 'Suscripción',
        status: 'Activa',
        contractChannel: 'HE'
      },
      {
        id: '2',
        productName: 'Gaming Plus Pro',
        providerName: 'Timwe',
        contractDate: '2024-01-20',
        serviceType: 'Suscripción',
        status: 'Cancelada',
        contractChannel: 'SMS',
        cancellationChannel: 'SMS',
        cancellationDate: '2024-03-10'
      },
      {
        id: '3',
        productName: 'Music Unlimited',
        providerName: 'Renxo',
        contractDate: '2024-03-01',
        serviceType: 'On-demand',
        status: 'Activa',
        contractChannel: 'WIFI'
      }
    ]
  },
  '573009876543': {
    phoneNumber: '573009876543',
    subscriptions: [
      {
        id: '4',
        productName: 'Video Streaming Pro',
        providerName: 'Digital Virgo',
        contractDate: '2024-03-05',
        serviceType: 'Suscripción',
        status: 'En trial',
        contractChannel: 'Híbrido'
      },
      {
        id: '5',
        productName: 'News Premium',
        providerName: 'Timwe',
        contractDate: '2024-02-28',
        serviceType: 'Suscripción',
        status: 'Cancelación programada',
        contractChannel: 'USSD'
      }
    ]
  }
};

export default function CustomerCare() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const handleSearch = async () => {
    if (!phoneNumber.trim()) {
      setSearchError('Por favor ingrese un número de teléfono');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    setUserInfo(null);

    // Simulate API call
    setTimeout(() => {
      const userData = mockUserData[phoneNumber];
      if (userData) {
        setUserInfo(userData);
        setSubscriptions(userData.subscriptions);
        setSearchError('');
      } else {
        setSearchError('No se encontró información para este número de teléfono');
        setUserInfo(null);
        setSubscriptions([]);
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleCancelSubscription = (subscriptionId: string) => {
    if (window.confirm('¿Está seguro de que desea cancelar esta suscripción?')) {
      setSubscriptions(subs =>
        subs.map(sub =>
          sub.id === subscriptionId
            ? {
                ...sub,
                status: 'Cancelada' as const,
                cancellationChannel: 'Customer Care' as const,
                cancellationDate: new Date().toISOString().split('T')[0]
              }
            : sub
        )
      );
    }
  };

  const handleBlockProduct = (subscriptionId: string) => {
    if (window.confirm('¿Está seguro de que desea bloquear este producto para el usuario? Esta acción impedirá futuras contrataciones.')) {
      setSubscriptions(subs =>
        subs.map(sub =>
          sub.id === subscriptionId
            ? { ...sub, isBlocked: true }
            : sub
        )
      );
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Activa': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Cancelada': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'Cancelación programada': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'En trial': return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa': return 'bg-green-100 text-green-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      case 'Cancelación programada': return 'bg-yellow-100 text-yellow-800';
      case 'En trial': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'HE': return 'bg-purple-100 text-purple-800';
      case 'WIFI': return 'bg-blue-100 text-blue-800';
      case 'SAT PUSH': return 'bg-green-100 text-green-800';
      case 'SMS': return 'bg-orange-100 text-orange-800';
      case 'USSD': return 'bg-pink-100 text-pink-800';
      case 'Híbrido': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Customer Care</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Phone className="h-4 w-4" />
          <span>Gestión de atención al cliente</span>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Búsqueda de Usuario</h3>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="tel"
              placeholder="Ingrese el número de línea móvil (ej: 573001234567)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Buscando...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Buscar</span>
              </>
            )}
          </button>
        </div>

        {searchError && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {searchError}
          </div>
        )}
      </div>

      {/* User Information */}
      {userInfo && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Información del Usuario</h3>
                <p className="text-sm text-gray-600">Número de línea: {userInfo.phoneNumber}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-md font-medium text-gray-800">Suscripciones del Usuario</h4>
              <span className="text-sm text-gray-500">
                {subscriptions.length} suscripción{subscriptions.length !== 1 ? 'es' : ''} encontrada{subscriptions.length !== 1 ? 's' : ''}
              </span>
            </div>

            {subscriptions.length > 0 ? (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h5 className="text-lg font-medium text-gray-900">{subscription.productName}</h5>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                            {getStatusIcon(subscription.status)}
                            <span className="ml-1">{subscription.status}</span>
                          </span>
                          {subscription.isBlocked && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              <Ban className="h-3 w-3 mr-1" />
                              Bloqueado
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Proveedor: {subscription.providerName}</p>
                      </div>

                      {subscription.status === 'Activa' && !subscription.isBlocked && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleCancelSubscription(subscription.id)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleBlockProduct(subscription.id)}
                            className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-1"
                          >
                            <Ban className="h-3 w-3" />
                            <span>Bloquear</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Fecha de contratación:</span>
                        <p className="text-sm text-gray-900 mt-1 flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDate(subscription.contractDate)}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-500">Tipo de servicio:</span>
                        <p className="text-sm text-gray-900 mt-1 flex items-center">
                          <Package className="h-4 w-4 mr-1 text-gray-400" />
                          {subscription.serviceType}
                        </p>
                      </div>

                      {subscription.serviceType === 'Suscripción' && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Canal de contratación:</span>
                          <p className="text-sm mt-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChannelColor(subscription.contractChannel)}`}>
                              {subscription.contractChannel}
                            </span>
                          </p>
                        </div>
                      )}

                      {subscription.status === 'Cancelada' && subscription.cancellationChannel && (
                        <>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Canal de cancelación:</span>
                            <p className="text-sm mt-1">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                {subscription.cancellationChannel}
                              </span>
                            </p>
                          </div>
                          {subscription.cancellationDate && (
                            <div>
                              <span className="text-sm font-medium text-gray-500">Fecha de cancelación:</span>
                              <p className="text-sm text-gray-900 mt-1 flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                {formatDate(subscription.cancellationDate)}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron suscripciones
                </h3>
                <p className="text-gray-500">
                  Este usuario no tiene suscripciones activas o históricas.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Demo Numbers Helper */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Números de prueba disponibles:</h4>
        <div className="flex flex-wrap gap-2">
          {Object.keys(mockUserData).map((phone) => (
            <button
              key={phone}
              onClick={() => setPhoneNumber(phone)}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
            >
              {phone}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}