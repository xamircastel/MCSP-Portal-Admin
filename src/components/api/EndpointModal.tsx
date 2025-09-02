import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  type: 'VAS' | 'OTT';
  status: 'Active' | 'Inactive';
}

interface EndpointModalProps {
  providers: Provider[];
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function EndpointModal({ providers, onClose, onSave }: EndpointModalProps) {
  const [formData, setFormData] = useState({
    providerId: '',
    endpointType: 'subscription' as 'subscription' | 'charge' | 'cancellation' | 'mo',
    url: '',
    method: 'POST' as 'GET' | 'POST' | 'PUT' | 'DELETE',
    description: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  const [providerSearch, setProviderSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(providerSearch.toLowerCase()) &&
    provider.status === 'Active'
  );

  const getEventTypeDescription = (type: string) => {
    switch (type) {
      case 'subscription': return 'Notificación cuando un usuario se suscribe a un servicio';
      case 'charge': return 'Notificación cuando se realiza un cobro exitoso';
      case 'cancellation': return 'Notificación cuando un usuario cancela su suscripción';
      case 'mo': return 'Notificación de mensajes MO (Mobile Originated) del usuario';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Agregar Endpoint de Notificación
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              value={formData.providerId}
              onChange={(e) => setFormData(prev => ({ ...prev, providerId: e.target.value }))}
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

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Evento *
            </label>
            <select
              value={formData.endpointType}
              onChange={(e) => setFormData(prev => ({ ...prev, endpointType: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="subscription">Notificación de Alta de Suscripción</option>
              <option value="charge">Notificación de Cobro Exitoso</option>
              <option value="cancellation">Notificación de Cancelación</option>
              <option value="mo">Notificación de MO</option>
            </select>
            {formData.endpointType && (
              <p className="mt-2 text-sm text-gray-600">
                {getEventTypeDescription(formData.endpointType)}
              </p>
            )}
          </div>

          {/* HTTP Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método HTTP *
            </label>
            <select
              value={formData.method}
              onChange={(e) => setFormData(prev => ({ ...prev, method: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="GET">GET</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL del Endpoint *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://api.proveedor.com/notifications/subscription"
              required
            />
            <p className="mt-2 text-sm text-gray-600">
              URL donde el MSCP enviará las notificaciones de eventos
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Descripción del endpoint y su propósito"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'Active' | 'Inactive' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Active">Activo</option>
              <option value="Inactive">Inactivo</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Crear Endpoint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}