import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface SendSchedule {
  id: string;
  date: string;
  time: string;
  quantity: number;
  csvFile?: File | null;
}

interface NewCampaignFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function NewCampaignForm({ onClose, onSubmit }: NewCampaignFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [executionDate, setExecutionDate] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [smsText, setSmsText] = useState('');
  const [campaignType, setCampaignType] = useState<'informativa' | 'comercial' | 'promocional' | 'transaccional'>('informativa');
  const [segmentationType, setSegmentationType] = useState<'csv' | 'active-users'>('active-users');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sendSchedules, setSendSchedules] = useState<SendSchedule[]>([
    { id: '1', date: '', time: '', quantity: 0 }
  ]);

  const availableShortCodes = [
    { value: '12345', label: '12345' },
    { value: '54321', label: '54321' },
    { value: '98765', label: '98765' },
    { value: '45678', label: '45678' },
    { value: '87654', label: '87654' }
  ];

  const campaignTypes = [
    { value: 'informativa', label: 'Informativa', description: 'Mensajes de información general' },
    { value: 'comercial', label: 'Comercial', description: 'Ofertas y promociones de productos' },
    { value: 'promocional', label: 'Promocional', description: 'Campañas promocionales especiales' },
    { value: 'transaccional', label: 'Transaccional', description: 'Notificaciones de transacciones' }
  ];

  const availableProducts = [
    { id: 'streaming', name: 'Premium Streaming', activeUsers: 45000 },
    { id: 'sports', name: 'Sports Package', activeUsers: 28000 },
    { id: 'gaming', name: 'Gaming Zone', activeUsers: 15000 },
    { id: 'music', name: 'Music Unlimited', activeUsers: 52000 },
    { id: 'news', name: 'News Premium', activeUsers: 18000 }
  ];

  const steps = [
    { number: 1, title: 'Información Básica', description: 'Datos generales de la campaña' },
    { number: 2, title: 'Tipo y Segmentación', description: 'Configura el público objetivo' },
    { number: 3, title: 'Programación', description: 'Configura los envíos' },
    { number: 4, title: 'Resumen', description: 'Revisa y confirma' }
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

  const handleScheduleChange = (id: string, field: keyof SendSchedule, value: string | number | File | null) => {
    setSendSchedules(sendSchedules.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handleScheduleCsvChange = (id: string, file: File | null) => {
    setSendSchedules(sendSchedules.map(s => 
      s.id === id ? { ...s, csvFile: file } : s
    ));
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };



  const getTotalAvailableUsers = () => {
    return availableProducts
      .filter(p => selectedProducts.includes(p.id))
      .reduce((sum, p) => sum + p.activeUsers, 0);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(campaignName && description && executionDate && shortCode && smsText);
      case 2:
        if (segmentationType === 'csv') {
          return true; // CSV se carga en el paso 3
        }
        return selectedProducts.length > 0;
      case 3:
        if (segmentationType === 'csv') {
          return sendSchedules.every(s => s.date && s.time && s.csvFile);
        }
        return sendSchedules.every(s => s.date && s.time && s.quantity > 0);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      alert('Por favor completa todos los campos requeridos antes de continuar');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const campaignData = {
      name: campaignName,
      description,
      executionDate,
      shortCode,
      smsText,
      campaignType,
      segmentationType,
      selectedProducts: segmentationType === 'active-users' ? selectedProducts : [],
      sendSchedules,
      generatedAt: new Date().toISOString()
    };

    onSubmit(campaignData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Nueva Campaña SMS</h2>
            <p className="text-sm text-gray-600 mt-1">Paso {currentStep} de 4</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep > step.number 
                      ? 'bg-green-600 text-white' 
                      : currentStep === step.number 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                  </div>
                  <div className="text-center mt-2">
                    <p className={`text-xs font-medium ${
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                    }`}>{step.title}</p>
                    <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded transition-all ${
                    currentStep > step.number ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Step 1: Información Básica */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
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
                    <select
                      required
                      value={shortCode}
                      onChange={(e) => setShortCode(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecciona un código corto</option>
                      {availableShortCodes.map(code => (
                        <option key={code.value} value={code.value}>
                          {code.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texto del SMS (incluyendo URL) *
                  </label>
                  <textarea
                    required
                    value={smsText}
                    onChange={(e) => setSmsText(e.target.value)}
                    rows={4}
                    maxLength={160}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    placeholder="Escribe el texto completo del SMS que recibirá el usuario, incluyendo la URL. Ejemplo: ¡Oferta especial! Obtén 50% de descuento. Visita: https://ejemplo.com/promo"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {smsText.length}/160 caracteres
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Tipo y Segmentación */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                {/* Tipo de Campaña */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tipo de Campaña *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {campaignTypes.map(type => (
                      <label
                        key={type.value}
                        className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          campaignType === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="campaignType"
                          value={type.value}
                          checked={campaignType === type.value}
                          onChange={(e) => setCampaignType(e.target.value as any)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{type.label}</p>
                          <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Método de Segmentación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Método de Segmentación *
                  </label>
                  
                  <div className="space-y-3">
                    <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      segmentationType === 'active-users' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
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
                          Selecciona uno o varios productos. El alcance se calcula automáticamente.
                        </p>
                      </div>
                    </label>

                    <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      segmentationType === 'csv' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
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
                          El alcance se determina por la cantidad de registros en el archivo.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Configuración según tipo de segmentación */}
                {segmentationType === 'active-users' && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Selecciona los productos *
                    </label>
                    <div className="space-y-2">
                      {availableProducts.map(product => (
                        <label
                          key={product.id}
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
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
                            {product.activeUsers.toLocaleString()} usuarios
                          </span>
                        </label>
                      ))}
                    </div>
                    {selectedProducts.length > 0 && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-900">
                          <span className="font-semibold">Alcance Total:</span>{' '}
                          {getTotalAvailableUsers().toLocaleString()} usuarios
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {segmentationType === 'csv' && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-900 mb-1">
                          Carga de archivos CSV
                        </h4>
                        <p className="text-sm text-blue-800">
                          En el siguiente paso podrás cargar los archivos CSV para cada envío programado de forma independiente.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Programación de Envíos */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Programación de Envíos</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {segmentationType === 'csv' 
                        ? 'Configura cuándo se enviará y carga el CSV para cada envío'
                        : 'Configura cuándo y a cuántos usuarios se enviará'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSchedule}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    + Agregar Envío
                  </button>
                </div>

                <div className="space-y-3">
                  {sendSchedules.map((schedule, index) => (
                    <div key={schedule.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-900">Envío #{index + 1}</h4>
                        {sendSchedules.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSchedule(schedule.id)}
                            className="text-sm text-red-600 hover:text-red-800 transition-colors"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                      
                      <div className={`grid grid-cols-1 ${segmentationType === 'csv' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 mb-4`}>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Fecha *
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
                            Hora *
                          </label>
                          <input
                            type="time"
                            required
                            value={schedule.time}
                            onChange={(e) => handleScheduleChange(schedule.id, 'time', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                        
                        {segmentationType !== 'csv' && (
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Cantidad *
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
                        )}
                      </div>

                      {/* Carga de CSV por envío */}
                      {segmentationType === 'csv' && !schedule.csvFile && (
                        <div className="mt-3">
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            Archivo CSV para este envío *
                          </label>
                          <label className="flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-colors">
                            <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">
                              Haz clic para seleccionar un archivo CSV
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              Formato: MSISDN por línea
                            </p>
                            <input
                              type="file"
                              accept=".csv"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                                    handleScheduleCsvChange(schedule.id, file);
                                  } else {
                                    alert('Por favor selecciona un archivo CSV válido');
                                  }
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                      
                      {segmentationType === 'csv' && schedule.csvFile && (
                        <div className="mt-3">
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            Archivo CSV para este envío *
                          </label>
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Check className="w-5 h-5 text-green-600" />
                              <div>
                                <span className="text-sm text-green-900 font-medium block">{schedule.csvFile.name}</span>
                                <span className="text-xs text-green-700">Archivo cargado correctamente</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleScheduleCsvChange(schedule.id, null)}
                              className="text-sm text-red-600 hover:text-red-800 font-medium"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Resumen */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen de la Campaña</h3>
                  
                  {/* Información Básica */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
                      Información Básica
                    </h4>
                    <div className="pl-8 space-y-2">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Nombre:</span>
                        <span className="text-sm font-medium text-gray-900">{campaignName}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Descripción:</span>
                        <span className="text-sm font-medium text-gray-900 text-right max-w-md">{description}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Fecha de Ejecución:</span>
                        <span className="text-sm font-medium text-gray-900">{executionDate}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Short Code:</span>
                        <span className="text-sm font-medium text-gray-900">{shortCode}</span>
                      </div>
                      <div className="py-2">
                        <span className="text-sm text-gray-600 block mb-1">Texto del SMS:</span>
                        <div className="bg-gray-50 p-3 rounded border border-gray-200">
                          <span className="text-sm font-mono text-gray-900">{smsText}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tipo y Segmentación */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</div>
                      Tipo y Segmentación
                    </h4>
                    <div className="pl-8 space-y-2">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Tipo de Campaña:</span>
                        <span className="text-sm font-medium text-gray-900 capitalize">{campaignTypes.find(t => t.value === campaignType)?.label}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Método de Segmentación:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {segmentationType === 'csv' ? 'Archivo CSV' : 'Usuarios Activos por Producto'}
                        </span>
                      </div>
                      {segmentationType === 'active-users' && (
                        <div className="py-2">
                          <span className="text-sm text-gray-600 block mb-2">Productos Seleccionados:</span>
                          <div className="space-y-1">
                            {selectedProducts.map(pid => {
                              const product = availableProducts.find(p => p.id === pid);
                              return (
                                <div key={pid} className="flex justify-between bg-gray-50 p-2 rounded text-sm">
                                  <span className="text-gray-900">{product?.name}</span>
                                  <span className="text-gray-600">{product?.activeUsers.toLocaleString()} usuarios</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <span className="text-sm font-semibold text-blue-900">
                              Alcance Total: {getTotalAvailableUsers().toLocaleString()} usuarios
                            </span>
                          </div>
                        </div>
                      )}
                      {segmentationType === 'csv' && (
                        <div className="py-2">
                          <div className="bg-blue-50 p-3 rounded border border-blue-200">
                            <span className="text-sm text-blue-800">
                              Los archivos CSV se cargarán individualmente en cada envío programado
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Programación */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</div>
                      Programación de Envíos
                    </h4>
                    <div className="pl-8 space-y-2">
                      {sendSchedules.map((schedule, index) => (
                        <div key={schedule.id} className="bg-gray-50 p-3 rounded border border-gray-200">
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-medium text-gray-900">Envío #{index + 1}</span>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">
                                {schedule.date} a las {schedule.time}
                              </div>
                              {segmentationType === 'csv' && schedule.csvFile ? (
                                <div className="text-sm text-blue-600 mt-1 flex items-center gap-1 justify-end">
                                  <Check className="w-3 h-3" />
                                  {schedule.csvFile.name}
                                </div>
                              ) : (
                                <div className="text-sm text-gray-600 mt-1">
                                  {schedule.quantity.toLocaleString()} usuarios
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-900 mb-2">Información Importante</h4>
                  <p className="text-sm text-yellow-800">
                    Al confirmar, se creará la campaña y se generará un ID único. El texto del SMS será enviado 
                    tal como lo configuraste. Newry registrará todos los envíos y su seguimiento.
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Footer with Navigation */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
          <button
            type="button"
            onClick={currentStep === 1 ? onClose : handlePrevious}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors flex items-center gap-2"
          >
            {currentStep === 1 ? (
              'Cancelar'
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </>
            )}
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Crear Campaña
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
