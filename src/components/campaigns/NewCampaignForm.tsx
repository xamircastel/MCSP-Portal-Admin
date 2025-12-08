import { useState } from 'react';

interface SendSchedule {
  id: string;
  date: string;
  time: string;
  quantity: number;
}

interface NewCampaignFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function NewCampaignForm({ onClose, onSubmit }: NewCampaignFormProps) {
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [executionDate, setExecutionDate] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [finalUrl, setFinalUrl] = useState('');
  const [segmentationType, setSegmentationType] = useState<'csv' | 'active-users'>('active-users');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [totalReach, setTotalReach] = useState<number>(0);
  const [sendSchedules, setSendSchedules] = useState<SendSchedule[]>([
    { id: '1', date: '', time: '', quantity: 0 }
  ]);

  const availableProducts = [
    { id: 'streaming', name: 'Premium Streaming', activeUsers: 45000 },
    { id: 'sports', name: 'Sports Package', activeUsers: 28000 },
    { id: 'gaming', name: 'Gaming Zone', activeUsers: 15000 },
    { id: 'music', name: 'Music Unlimited', activeUsers: 52000 },
    { id: 'news', name: 'News Premium', activeUsers: 18000 }
  ];

  const handleAddSchedule = () => {
    const newSchedule: SendSchedule = {
      id: Date.now().toString(),
      date: '',
      time: '',
      quantity: 0
    };
    setSendSchedules([...sendSchedules, newSchedule]);
  };

  const handleRemoveSchedule = (id: string) => {
    if (sendSchedules.length > 1) {
      setSendSchedules(sendSchedules.filter(s => s.id !== id));
    }
  };

  const handleScheduleChange = (id: string, field: keyof SendSchedule, value: string | number) => {
    setSendSchedules(sendSchedules.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setCsvFile(file);
      } else {
        alert('Por favor selecciona un archivo CSV válido');
      }
    }
  };

  const getTotalScheduledUsers = () => {
    return sendSchedules.reduce((sum, schedule) => sum + (schedule.quantity || 0), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const campaignData = {
      name: campaignName,
      description,
      executionDate,
      shortCode,
      finalUrl,
      segmentationType,
      csvFile: segmentationType === 'csv' ? csvFile : null,
      selectedProducts: segmentationType === 'active-users' ? selectedProducts : [],
      totalReach,
      sendSchedules,
      generatedAt: new Date().toISOString()
    };

    onSubmit(campaignData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Nueva Campaña SMS</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Información Básica</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Campaña *
              </label>
              <input
                type="text"
                required
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Black Friday 2025"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción de la Campaña *
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe el objetivo y contenido de la campaña..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Ejecución *
                </label>
                <input
                  type="date"
                  required
                  value={executionDate}
                  onChange={(e) => setExecutionDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código Corto (Short Code) *
                </label>
                <input
                  type="text"
                  required
                  value={shortCode}
                  onChange={(e) => setShortCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 2020"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Final (Destino) *
              </label>
              <input
                type="url"
                required
                value={finalUrl}
                onChange={(e) => setFinalUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://ejemplo.com/promocion"
              />
              <p className="mt-1 text-xs text-gray-500">
                Esta es la URL final a la que llegará el usuario. Newry generará automáticamente una URL de control corta.
              </p>
            </div>
          </div>

          {/* Segmentación de Usuarios */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Segmentación de Usuarios</h3>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="segmentation"
                  value="active-users"
                  checked={segmentationType === 'active-users'}
                  onChange={(e) => setSegmentationType(e.target.value as 'active-users')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Enviar a usuarios activos por producto</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Selecciona uno o varios productos para enviar el mensaje a todos sus usuarios activos
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="segmentation"
                  value="csv"
                  checked={segmentationType === 'csv'}
                  onChange={(e) => setSegmentationType(e.target.value as 'csv')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Cargar base de usuarios (CSV)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Carga un archivo CSV con MSISDN y texto del SMS personalizado para cada usuario
                  </p>
                </div>
              </label>
            </div>

            {/* Selección de Productos */}
            {segmentationType === 'active-users' && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Selecciona los productos *
                </label>
                <div className="space-y-2">
                  {availableProducts.map(product => (
                    <label
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleProductToggle(product.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.activeUsers.toLocaleString()} usuarios activos
                      </span>
                    </label>
                  ))}
                </div>
                {selectedProducts.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">Total de usuarios seleccionados:</span>{' '}
                      {availableProducts
                        .filter(p => selectedProducts.includes(p.id))
                        .reduce((sum, p) => sum + p.activeUsers, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Carga de CSV */}
            {segmentationType === 'csv' && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Archivo CSV *
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-white">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        {csvFile ? csvFile.name : 'Haz clic para seleccionar un archivo CSV'}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        El archivo debe contener: MSISDN, Texto del SMS
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                      required={segmentationType === 'csv'}
                    />
                  </label>
                </div>
                {csvFile && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-green-900">Archivo cargado: {csvFile.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCsvFile(null)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Configuración de Envíos */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Configuración de Envíos</h3>
              <button
                type="button"
                onClick={handleAddSchedule}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                + Agregar Envío
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alcance Total *
              </label>
              <input
                type="number"
                required
                min="1"
                value={totalReach}
                onChange={(e) => setTotalReach(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cantidad total de usuarios a impactar"
              />
              <p className="mt-1 text-xs text-gray-500">
                Total de usuarios que se quiere alcanzar con esta campaña
              </p>
            </div>

            <div className="space-y-3">
              {sendSchedules.map((schedule, index) => (
                <div key={schedule.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900">Envío #{index + 1}</h4>
                    {sendSchedules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSchedule(schedule.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Fecha
                      </label>
                      <input
                        type="date"
                        required
                        value={schedule.date}
                        onChange={(e) => handleScheduleChange(schedule.id, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Hora
                      </label>
                      <input
                        type="time"
                        required
                        value={schedule.time}
                        onChange={(e) => handleScheduleChange(schedule.id, 'time', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Cantidad
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={schedule.quantity || ''}
                        onChange={(e) => handleScheduleChange(schedule.id, 'quantity', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Usuarios"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sendSchedules.length > 0 && totalReach > 0 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Total programado en envíos</p>
                    <p className="text-xs text-blue-700 mt-1">
                      {getTotalScheduledUsers().toLocaleString()} de {totalReach.toLocaleString()} usuarios
                    </p>
                  </div>
                  <div className="text-right">
                    {getTotalScheduledUsers() === totalReach ? (
                      <span className="inline-flex items-center gap-1 text-sm text-green-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completo
                      </span>
                    ) : getTotalScheduledUsers() > totalReach ? (
                      <span className="text-sm text-red-700">Excede el alcance</span>
                    ) : (
                      <span className="text-sm text-yellow-700">Incompleto</span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                  <div
                    className={`h-2 rounded-full ${
                      getTotalScheduledUsers() === totalReach 
                        ? 'bg-green-600' 
                        : getTotalScheduledUsers() > totalReach 
                        ? 'bg-red-600' 
                        : 'bg-blue-600'
                    }`}
                    style={{ width: `${Math.min((getTotalScheduledUsers() / totalReach) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Información de URL de Control */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-900 mb-2">URL de Control de Newry</h4>
            <p className="text-sm text-yellow-800">
              Al crear esta campaña, se generará automáticamente un ID de Campaña. Newry utilizará este ID 
              para crear una URL corta de control que se incluirá en el SMS. Esta URL registrará los clics 
              y redirigirá a los usuarios a la URL final configurada.
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Crear Campaña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
