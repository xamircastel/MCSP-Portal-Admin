import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface ChangeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  section: string;
  currentData?: any;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'textarea' | 'date' | 'toggle';
    options?: string[];
    value?: any;
  }>;
}

export default function ChangeRequestModal({
  isOpen,
  onClose,
  title,
  section,
  currentData,
  fields,
}: ChangeRequestModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  // Filtrar campos técnicos que no deben mostrarse al usuario
  const filterDisplayData = (data: any) => {
    if (!data) return null;
    
    const excludedFields = [
      'id', 'icon', 'color', 'textColor', 'bgColor', 'rewardType',
      'participants', 'completions', 'stockUsed', 'ticketsSold',
      'managedIn', 'hasTriggers', 'triggers', 'actionLabel', 'limitLabel',
      'totalTickets', 'minTickets', 'method'
    ];
    
    const filtered: Record<string, any> = {};
    Object.entries(data).forEach(([key, value]) => {
      if (!excludedFields.includes(key)) {
        filtered[key] = value;
      }
    });
    
    return Object.keys(filtered).length > 0 ? filtered : null;
  };

  const displayData = filterDisplayData(currentData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí se generaría el ticket de atención
    const ticket = {
      id: `TICKET-${Date.now()}`,
      section,
      requestedChanges: formData,
      currentData,
      description,
      requestedBy: 'admin@mscp.com',
      requestedAt: new Date().toISOString(),
      status: 'pending',
    };

    console.log('Ticket generado:', ticket);
    
    // Mostrar confirmación
    alert(`Ticket ${ticket.id} generado exitosamente.\nEl equipo de backoffice procesará su solicitud.`);
    
    onClose();
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">Solicitud de cambio - {section}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              {/* Current Data Display */}
              {displayData && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Configuración Actual:</h4>
                  <div className="text-sm text-gray-600">
                    {Object.entries(displayData).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1">
                        <span className="font-medium">{key}:</span>
                        <span>{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Form Fields */}
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  
                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={formData[field.name] || field.value || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={`Ingrese ${field.label.toLowerCase()}`}
                    />
                  )}

                  {field.type === 'number' && (
                    <input
                      type="number"
                      value={formData[field.name] || field.value || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={`Ingrese ${field.label.toLowerCase()}`}
                    />
                  )}

                  {field.type === 'select' && (
                    <select
                      value={formData[field.name] || field.value || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Seleccione una opción</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      value={formData[field.name] || field.value || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={`Ingrese ${field.label.toLowerCase()}`}
                    />
                  )}

                  {field.type === 'date' && (
                    <input
                      type="date"
                      value={formData[field.name] || field.value || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  )}

                  {field.type === 'toggle' && (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData[field.name] || field.value || false}
                        onChange={(e) => handleInputChange(field.name, e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {formData[field.name] || field.value ? 'Activado' : 'Desactivado'}
                      </span>
                    </label>
                  )}
                </div>
              ))}

              {/* Additional Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción adicional del cambio solicitado
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Proporcione detalles adicionales sobre los cambios que necesita..."
                  required
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
