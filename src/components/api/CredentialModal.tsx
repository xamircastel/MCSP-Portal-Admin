import React, { useState } from 'react';
import { X, Search, AlertCircle, CheckCircle, Key } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  type: 'VAS' | 'OTT';
  status: 'Active' | 'Inactive';
}

interface CredentialModalProps {
  providers: Provider[];
  onClose: () => void;
}

export default function CredentialModal({ providers, onClose }: CredentialModalProps) {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [providerSearch, setProviderSearch] = useState('');
  const [credentials, setCredentials] = useState<{apiKey: string, secretKey: string} | null>(null);
  const [isExisting, setIsExisting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCredentials = async () => {
    if (!selectedProvider) return;

    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate checking if credentials already exist (30% chance)
    const hasExistingCredentials = Math.random() > 0.7;
    
    if (hasExistingCredentials) {
      setCredentials({
        apiKey: 'mscp_live_51H7abc123def456...',
        secretKey: 'mscp_secret_51H7xyz789uvw012...'
      });
      setIsExisting(true);
    } else {
      setCredentials({
        apiKey: `mscp_live_${Date.now().toString(36)}...`,
        secretKey: `mscp_secret_${Date.now().toString(36)}...`
      });
      setIsExisting(false);
    }
    
    setIsGenerating(false);
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(providerSearch.toLowerCase()) &&
    provider.status === 'Active'
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Generar Credenciales de API
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Information Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Key className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">
                  APIs Expuestas por el MSCP
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Las credenciales generadas permitirán al proveedor consumir las APIs que el MSCP expone. 
                  La disponibilidad de estas APIs depende de los acuerdos técnicos y comerciales con cada MNO.
                </p>
              </div>
            </div>
          </div>

          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Proveedor *
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar proveedores..."
                value={providerSearch}
                onChange={(e) => setProviderSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
              />
            </div>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Seleccionar un proveedor</option>
              {filteredProviders.map((provider) => (
                <option key={provider.id} value={provider.name}>
                  {provider.name} ({provider.type})
                </option>
              ))}
            </select>
          </div>

          {/* Available APIs Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">APIs Disponibles para Consumo:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>API de Envío de SMS</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>API de Cobro (On-Demand)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>API de Suscripción</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>API de Cancelación</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>API de Customer Care</span>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerateCredentials}
              disabled={!selectedProvider || isGenerating}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generando Credenciales...</span>
                </>
              ) : (
                <>
                  <Key className="h-4 w-4" />
                  <span>Generar Credenciales</span>
                </>
              )}
            </button>
          </div>

          {/* Notification */}
          {credentials && isExisting && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">
                    Credenciales Existentes Encontradas
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    No se generaron nuevas credenciales. Se muestran las credenciales previamente generadas para este proveedor.
                  </p>
                </div>
              </div>
            </div>
          )}

          {credentials && !isExisting && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">
                    Nuevas Credenciales Generadas
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Se han generado exitosamente nuevas credenciales de API para el proveedor seleccionado.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Credentials Display */}
          {credentials && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Credenciales de API para {selectedProvider}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={credentials.apiKey}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(credentials.apiKey)}
                      className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                    >
                      Copiar
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secret Key
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={credentials.secretKey}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(credentials.secretKey)}
                      className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                    >
                      Copiar
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Información Importante:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Almacene estas credenciales de forma segura</li>
                  <li>• La Secret Key no se mostrará nuevamente</li>
                  <li>• Use estas credenciales para autenticar las llamadas a las APIs del MSCP</li>
                  <li>• La disponibilidad de las APIs depende de los acuerdos con cada MNO</li>
                </ul>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}