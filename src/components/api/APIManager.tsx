import React, { useState } from 'react';
import { Code, Copy, Eye, EyeOff, Key, Globe, Download, Plus } from 'lucide-react';
import EndpointModal from './EndpointModal';
import CredentialModal from './CredentialModal';

interface APIEndpoint {
  id: string;
  provider: string;
  type: 'subscription' | 'charge' | 'cancellation' | 'mo';
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'Active' | 'Inactive';
  description: string;
}

interface APICredential {
  id: string;
  provider: string;
  apiKey: string;
  secretKey: string;
  createdAt: string;
  lastUsed: string;
  status: 'Active' | 'Revoked';
}

interface MSCPApi {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  method: string;
  useCases: string[];
  status: 'Available' | 'Under Development' | 'Deprecated';
}

interface ContentPortal {
  id: string;
  provider: string;
  product: string;
  portalType: 'Web Portal' | 'Application';
  url?: string;
  fileName?: string;
  description: string;
  status: 'Active' | 'Inactive';
}

interface Provider {
  id: string;
  name: string;
  type: 'VAS' | 'OTT';
  status: 'Active' | 'Inactive';
}

const mockEndpoints: APIEndpoint[] = [
  {
    id: '1',
    provider: 'Newry',
    type: 'subscription',
    url: 'https://api.newry.com/v1/notifications/subscription',
    method: 'POST',
    status: 'Active',
    description: 'Subscription activation notification'
  },
  {
    id: '2',
    provider: 'Newry',
    type: 'charge',
    url: 'https://api.newry.com/v1/notifications/charge',
    method: 'POST',
    status: 'Active',
    description: 'Successful charge notification'
  },
  {
    id: '3',
    provider: 'Proveedor 1',
    type: 'subscription',
    url: 'https://api.provider1.com/notifications/subscription',
    method: 'POST',
    status: 'Active',
    description: 'Subscription activation notification'
  },
  {
    id: '4',
    provider: 'Proveedor 1',
    type: 'mo',
    url: 'https://api.provider1.com/notifications/mo',
    method: 'POST',
    status: 'Active',
    description: 'MO (Mobile Originated) notification'
  }
];

const mockCredentials: APICredential[] = [
  {
    id: '1',
    provider: 'Newry',
    apiKey: 'mscp_live_51H7abc123def456...',
    secretKey: 'mscp_secret_51H7xyz789uvw012...',
    createdAt: '2024-01-15',
    lastUsed: '2024-03-15',
    status: 'Active'
  },
  {
    id: '2',
    provider: 'Proveedor 1',
    apiKey: 'mscp_live_42K9ghi789jkl012...',
    secretKey: 'mscp_secret_42K9mno345pqr678...',
    createdAt: '2024-02-20',
    lastUsed: '2024-03-14',
    status: 'Active'
  }
];

const mockMSCPApis: MSCPApi[] = [
  {
    id: '1',
    name: 'SMS Sending API',
    description: 'Allows a CP to request sending an SMS to an end user',
    endpoint: '/api/v1/sms/send',
    method: 'POST',
    useCases: [
      'Sending promotional notifications',
      'Transaction confirmations',
      'Verification codes'
    ],
    status: 'Available'
  },
  {
    id: '2',
    name: 'Charge API (On-Demand)',
    description: 'Allows a CP to request a one-time charge to a user',
    endpoint: '/api/v1/charge/ondemand',
    method: 'POST',
    useCases: [
      'Pay-per-event services (Oneshot)',
      'Purchases from CP portal',
      'CP backend webhooks'
    ],
    status: 'Available'
  },
  {
    id: '3',
    name: 'Subscription API',
    description: 'Allows requesting subscription activation for a user',
    endpoint: '/api/v1/subscription/activate',
    method: 'POST',
    useCases: [
      'CPs with their own Landing Pages',
      'Integration with MNO channels',
      'My Operator Apps'
    ],
    status: 'Available'
  },
  {
    id: '4',
    name: 'Cancellation API',
    description: 'Allows requesting cancellation of an active subscription',
    endpoint: '/api/v1/subscription/cancel',
    method: 'POST',
    useCases: [
      'CP content portals',
      'Customer service systems',
      'MNO own channels'
    ],
    status: 'Available'
  },
  {
    id: '5',
    name: 'Customer Care API',
    description: 'Exposes digital service information for a user',
    endpoint: '/api/v1/customer/info',
    method: 'GET',
    useCases: [
      'Active subscription queries',
      'Integration with MNO platforms',
      'Customer service systems'
    ],
    status: 'Available'
  }
];

const mockContentPortals: ContentPortal[] = [
  {
    id: '1',
    provider: 'Newry',
    product: 'Premium Streaming',
    portalType: 'Web Portal',
    url: 'https://portal.newry.com/streaming',
    description: 'Premium streaming content portal',
    status: 'Active'
  },
  {
    id: '2',
    provider: 'Proveedor 1',
    product: 'Gaming Plus Pro',
    portalType: 'Web Portal',
    url: 'https://games.provider1.com/pro',
    description: 'Premium gaming portal',
    status: 'Active'
  },
  {
    id: '3',
    provider: 'Proveedor 2',
    product: 'Music Unlimited',
    portalType: 'Application',
    fileName: 'provider2-music-v2.1.apk',
    description: 'Mobile music application',
    status: 'Active'
  }
];

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Newry',
    type: 'OTT',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Proveedor 1',
    type: 'VAS',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Proveedor 2',
    type: 'OTT',
    status: 'Active'
  }
];

export default function APIManager() {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'credentials' | 'portals'>('endpoints');
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>(mockEndpoints);
  const [credentials] = useState<APICredential[]>(mockCredentials);
  const [mscpApis] = useState<MSCPApi[]>(mockMSCPApis);
  const [contentPortals] = useState<ContentPortal[]>(mockContentPortals);
  const [providers] = useState<Provider[]>(mockProviders);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [isEndpointModalOpen, setIsEndpointModalOpen] = useState(false);
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'subscription': return 'Subscription Activation';
      case 'charge': return 'Successful Charge';
      case 'cancellation': return 'Cancellation';
      case 'mo': return 'MO (Mobile Originated)';
      default: return type;
    }
  };

  const getApiStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Under Development': return 'bg-yellow-100 text-yellow-800';
      case 'Deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSaveEndpoint = (endpointData: any) => {
    const newEndpoint: APIEndpoint = {
      id: Date.now().toString(),
      provider: endpointData.providerId,
      type: endpointData.endpointType,
      url: endpointData.url,
      method: endpointData.method,
      status: endpointData.status,
      description: endpointData.description || ''
    };
    setEndpoints([...endpoints, newEndpoint]);
    setIsEndpointModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestor API</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Code className="h-4 w-4" />
          <span>Gestión centralizada de integraciones API</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'endpoints', label: 'API Endpoints', icon: Code, description: 'Notificaciones Outbound' },
              { id: 'credentials', label: 'Credenciales', icon: Key, description: 'APIs Expuestas por MSCP' },
              { id: 'portals', label: 'Content Portals', icon: Globe, description: 'Gestión de Contenido' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
                <span className="text-xs text-gray-400 mt-1">{tab.description}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* API Endpoints - Outbound Notifications */}
          {activeTab === 'endpoints' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">API Endpoints - Notificaciones Outbound</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Gestión de endpoints de proveedores para notificaciones de eventos del MSCP
                  </p>
                </div>
                <button 
                  onClick={() => setIsEndpointModalOpen(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Agregar Endpoint</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proveedor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo de Evento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Método
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        URL
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
                    {endpoints.map((endpoint) => (
                      <tr key={endpoint.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {endpoint.provider}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {getEventTypeText(endpoint.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono max-w-xs truncate">
                          {endpoint.url}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            endpoint.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {endpoint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => copyToClipboard(endpoint.url)}
                            className="text-gray-400 hover:text-gray-600 mr-2"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Credentials - MSCP Exposed APIs */}
          {activeTab === 'credentials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Credenciales - APIs Expuestas por MSCP</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Gestión de credenciales y documentación de APIs que el MSCP expone a terceros
                  </p>
                </div>
                <button 
                  onClick={() => setIsCredentialModalOpen(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Generar Credenciales</span>
                </button>
              </div>

              {/* MSCP APIs Catalog */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-blue-900 mb-4">Catálogo de APIs del MSCP</h4>
                <div className="grid gap-4">
                  {mscpApis.map((api) => (
                    <div key={api.id} className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h5 className="text-md font-medium text-gray-900">{api.name}</h5>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getApiStatusColor(api.status)}`}>
                              {api.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{api.description}</p>
                          <div className="flex items-center space-x-4 mb-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(api.method)}`}>
                              {api.method}
                            </span>
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                              {api.endpoint}
                            </code>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(api.endpoint)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-2">Casos de Uso:</h6>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {api.useCases.map((useCase, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated Credentials */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Credenciales Generadas</h4>
                <div className="grid gap-6">
                  {credentials.map((credential) => (
                    <div key={credential.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{credential.provider}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Creado: {credential.createdAt}</span>
                            <span>Último uso: {credential.lastUsed}</span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              credential.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {credential.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            API Key
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type={visibleKeys.has(`${credential.id}-api`) ? 'text' : 'password'}
                              value={credential.apiKey}
                              readOnly
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm"
                            />
                            <button
                              onClick={() => toggleKeyVisibility(`${credential.id}-api`)}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              {visibleKeys.has(`${credential.id}-api`) ? 
                                <EyeOff className="h-4 w-4" /> : 
                                <Eye className="h-4 w-4" />
                              }
                            </button>
                            <button
                              onClick={() => copyToClipboard(credential.apiKey)}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Secret Key
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type={visibleKeys.has(`${credential.id}-secret`) ? 'text' : 'password'}
                              value={credential.secretKey}
                              readOnly
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm"
                            />
                            <button
                              onClick={() => toggleKeyVisibility(`${credential.id}-secret`)}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              {visibleKeys.has(`${credential.id}-secret`) ? 
                                <EyeOff className="h-4 w-4" /> : 
                                <Eye className="h-4 w-4" />
                              }
                            </button>
                            <button
                              onClick={() => copyToClipboard(credential.secretKey)}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Portals */}
          {activeTab === 'portals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Content Portals - Gestión de Contenido</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    URLs y activos digitales asociados a cada producto para redirección post-suscripción
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proveedor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Producto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        URL/Archivo
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
                    {contentPortals.map((portal) => (
                      <tr key={portal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {portal.provider}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {portal.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            portal.portalType === 'Web Portal' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {portal.portalType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono max-w-xs truncate">
                          {portal.url || portal.fileName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            portal.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {portal.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            {portal.url && (
                              <button
                                onClick={() => copyToClipboard(portal.url!)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            )}
                            {portal.fileName && (
                              <button className="text-gray-400 hover:text-gray-600">
                                <Download className="h-4 w-4" />
                              </button>
                            )}
                            <button className="text-gray-400 hover:text-gray-600">
                              <Globe className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Portal Management Info */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">
                      Gestión de Portales de Contenido
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Los portales de contenido definen hacia dónde se redirige al usuario después de completar 
                      una suscripción exitosa. Pueden ser URLs de portales web o archivos de aplicaciones móviles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isEndpointModalOpen && (
        <EndpointModal
          providers={providers}
          onClose={() => setIsEndpointModalOpen(false)}
          onSave={handleSaveEndpoint}
        />
      )}

      {isCredentialModalOpen && (
        <CredentialModal
          providers={providers}
          onClose={() => setIsCredentialModalOpen(false)}
        />
      )}
    </div>
  );
}