import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Edit2, Trash2, Plus } from 'lucide-react';

interface SendSchedule {
  id: string;
  date: string;
  time: string;
  quantity: number;
  csvFile?: File | null;
}

interface Send {
  id: string;
  campaignType: 'informativa' | 'comercial' | 'promocional' | 'transaccional';
  shortCode: string;
  smsText: string;
  segmentationType: 'csv' | 'active-users';
  selectedProducts: string[];
  schedules: SendSchedule[];
}

interface NewCampaignFormProps {
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    executionDate: string;
    sends: Send[];
    generatedAt: string;
  }) => void;
}

export default function NewCampaignForm({ onClose, onSubmit }: NewCampaignFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Estados de la campaña
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [executionDate, setExecutionDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Envíos creados
  const [sends, setSends] = useState<Send[]>([]);
  
  // Estados del envío en edición/creación
  const [isCreatingOrEditingSend, setIsCreatingOrEditingSend] = useState(false);
  const [editingSendIndex, setEditingSendIndex] = useState<number | null>(null);
  const [shortCode, setShortCode] = useState('');
  const [smsText, setSmsText] = useState('');
  const [campaignType, setCampaignType] = useState<'informativa' | 'comercial' | 'promocional' | 'transaccional'>('informativa');
  const [segmentationType, setSegmentationType] = useState<'csv' | 'active-users'>('active-users');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sendSchedule, setSendSchedule] = useState<SendSchedule>({
    id: '1',
    date: '',
    time: '',
    quantity: 0
  });

  const availableShortCodes = [
    { value: '12345', label: '12345' },
    { value: '54321', label: '54321' },
    { value: '98765', label: '98765' },
    { value: '45678', label: '45678' },
    { value: '87654', label: '87654' }
  ];

  const campaignTypes = [
    { value: 'informativa', label: 'Informativa', description: 'Mensajes de información general' },
    { value: 'comercial', label: 'Comercial', description: 'Ofertas y promociones de productos' }
  ];

  const availableProducts = [
    { id: 'streaming', name: 'Premium Streaming', activeUsers: 45000 },
    { id: 'sports', name: 'Sports Package', activeUsers: 28000 },
    { id: 'gaming', name: 'Gaming Zone', activeUsers: 15000 },
    { id: 'music', name: 'Music Unlimited', activeUsers: 52000 },
    { id: 'news', name: 'News Premium', activeUsers: 18000 }
  ];

  const steps = [
    { number: 1, title: 'Crear Campaña', description: 'Información general' },
    { number: 2, title: 'Crear Envíos', description: 'Configurar envíos' },
    { number: 3, title: 'Resumen', description: 'Revisar y confirmar' }
  ];

  const handleStartNewSend = () => {
    setIsCreatingOrEditingSend(true);
    setEditingSendIndex(null);
    resetSendForm();
  };

  const handleEditSend = (index: number) => {
    const send = sends[index];
    setEditingSendIndex(index);
    setIsCreatingOrEditingSend(true);
    setShortCode(send.shortCode);
    setSmsText(send.smsText);
    setCampaignType(send.campaignType);
    setSegmentationType(send.segmentationType);
    setSelectedProducts(send.selectedProducts);
    setSendSchedule(send.schedules[0]);
  };

  const handleDeleteSend = (index: number) => {
    if (confirm('¿Estás seguro de eliminar este envío?')) {
      setSends(sends.filter((_, i) => i !== index));
    }
  };

  const handleSaveSend = () => {
    // Validar que tenga toda la información necesaria
    if (!shortCode || !smsText) {
      alert('Por favor completa el Short Code y el texto del SMS');
      return;
    }

    if (segmentationType === 'active-users' && selectedProducts.length === 0) {
      alert('Por favor selecciona al menos un producto');
      return;
    }

    const hasValidSchedule = segmentationType === 'csv'
      ? sendSchedule.date && sendSchedule.time && sendSchedule.csvFile
      : sendSchedule.date && sendSchedule.time;

    if (!hasValidSchedule) {
      alert('Por favor completa la programación correctamente');
      return;
    }

    const newSend: Send = {
      id: editingSendIndex !== null ? sends[editingSendIndex].id : Date.now().toString(),
      campaignType,
      shortCode,
      smsText,
      segmentationType,
      selectedProducts: segmentationType === 'active-users' ? selectedProducts : [],
      schedules: [sendSchedule]
    };

    if (editingSendIndex !== null) {
      const updatedSends = [...sends];
      updatedSends[editingSendIndex] = newSend;
      setSends(updatedSends);
    } else {
      setSends([...sends, newSend]);
    }

    setIsCreatingOrEditingSend(false);
    resetSendForm();
  };

  const handleCancelSend = () => {
    setIsCreatingOrEditingSend(false);
    resetSendForm();
  };

  const resetSendForm = () => {
    setShortCode('');
    setSmsText('');
    setCampaignType('informativa');
    setSegmentationType('active-users');
    setSelectedProducts([]);
    setSendSchedule({ id: '1', date: '', time: '', quantity: 0 });
    setEditingSendIndex(null);
  };



  const handleScheduleChange = (field: keyof SendSchedule, value: string | number | File | null) => {
    setSendSchedule({ ...sendSchedule, [field]: value });
  };

  const handleScheduleCsvChange = (file: File | null) => {
    setSendSchedule({ ...sendSchedule, csvFile: file });
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

  const calculateEndDate = () => {
    if (sends.length === 0) return '';
    
    let latestDate = '';
    sends.forEach(send => {
      send.schedules.forEach(schedule => {
        if (schedule.date && (!latestDate || schedule.date > latestDate)) {
          latestDate = schedule.date;
        }
      });
    });
    return latestDate;
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(campaignName && description && executionDate && endDate);
      case 2:
        return sends.length > 0 && !isCreatingOrEditingSend;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        const calculatedEndDate = calculateEndDate();
        if (calculatedEndDate) {
          setEndDate(calculatedEndDate);
        }
      }
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      if (currentStep === 2 && isCreatingOrEditingSend) {
        alert('Por favor guarda o cancela el envío actual antes de continuar');
      } else if (currentStep === 2) {
        alert('Debes crear al menos un envío para continuar');
      } else {
        alert('Por favor completa todos los campos requeridos');
      }
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
      sends: sends,
      generatedAt: new Date().toISOString()
    };

    onSubmit(campaignData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Nueva Campaña SMS</h2>
            <p className="text-sm text-gray-600 mt-1">Paso {currentStep} de 3</p>
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
            {/* Step 1: Crear Campaña */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">Paso 1: Crear Campaña</h3>
                  <p className="text-sm text-blue-800">
                    Define la información general de tu campaña. Después podrás crear múltiples envíos, cada uno con su propia configuración.
                  </p>
                </div>

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
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe el objetivo general de la campaña, su propósito y alcance esperado..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Inicio de la Campaña *
                    </label>
                    <input
                      type="date"
                      required
                      value={executionDate}
                      onChange={(e) => setExecutionDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Fecha general de inicio de la campaña
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Fin de la Campaña *
                    </label>
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Se actualizará con la fecha del último envío
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Crear Envíos */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">Paso 2: Crear Envíos</h3>
                  <p className="text-sm text-blue-800">
                    Crea uno o varios envíos para la campaña "{campaignName}". Cada envío puede tener diferente tipo, short code, mensaje y segmentación.
                  </p>
                </div>

                {/* Lista de envíos creados */}
                {!isCreatingOrEditingSend && (
                  <>
                    {sends.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Envíos Creados ({sends.length})</h4>
                        <div className="space-y-3">
                          {sends.map((send, index) => (
                            <div key={send.id} className="p-4 border-2 border-gray-200 rounded-lg bg-white hover:border-blue-300 transition-colors">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                      Envío #{index + 1}
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 capitalize">
                                      {campaignTypes.find(t => t.value === send.campaignType)?.label}
                                    </span>
                                  </div>
                                  
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-gray-700">Short Code:</span>
                                      <span className="text-gray-900">{send.shortCode}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-700">Mensaje SMS:</span>
                                      <p className="mt-1 font-mono text-xs bg-gray-50 p-3 rounded border border-gray-200 text-gray-900">{send.smsText}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-600 pt-2 border-t border-gray-100">
                                      <span className="flex items-center gap-1">
                                        <span className="font-medium">Segmentación:</span>
                                        {send.segmentationType === 'csv' ? 'Archivo CSV' : `${send.selectedProducts.length} producto(s)`}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <span className="font-medium">Programado:</span>
                                        {send.schedules[0].date} {send.schedules[0].time}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2 ml-4">
                                  <button
                                    type="button"
                                    onClick={() => handleEditSend(index)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Editar envío"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSend(index)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Eliminar envío"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleStartNewSend}
                      className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <Plus className="w-5 h-5" />
                      {sends.length === 0 ? 'Crear Primer Envío' : 'Agregar Otro Envío'}
                    </button>
                  </>
                )}

                {/* Formulario de crear/editar envío */}
                {isCreatingOrEditingSend && (
                  <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50/30">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {editingSendIndex !== null ? `Editando Envío #${editingSendIndex + 1}` : 'Nuevo Envío'}
                    </h4>

                    <div className="space-y-6">
                      {/* Tipo de Envío */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Tipo de Envío *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {campaignTypes.map(type => (
                            <label
                              key={type.value}
                              className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                campaignType === type.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="campaignType"
                                value={type.value}
                                checked={campaignType === type.value}
                                onChange={(e) => setCampaignType(e.target.value as typeof campaignType)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm">{type.label}</p>
                                <p className="text-xs text-gray-600 mt-0.5">{type.description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Short Code y SMS */}
                      <div className="space-y-4 pt-4 border-t border-gray-200">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Código Corto (Short Code) *
                          </label>
                          <select
                            required
                            value={shortCode}
                            onChange={(e) => setShortCode(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                          >
                            <option value="">Selecciona un código corto</option>
                            {availableShortCodes.map(code => (
                              <option key={code.value} value={code.value}>
                                {code.label}
                              </option>
                            ))}
                          </select>
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm bg-white"
                            placeholder="Escribe el texto completo del SMS que recibirá el usuario, incluyendo la URL..."
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            {smsText.length}/160 caracteres
                          </p>
                        </div>
                      </div>

                      {/* Segmentación */}
                      <div className="pt-4 border-t border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Método de Segmentación *
                        </label>
                        <div className="space-y-3">
                          <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            segmentationType === 'active-users'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
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
                              <p className="font-medium text-gray-900">Usuarios activos por producto</p>
                              <p className="text-sm text-gray-600 mt-1">
                                Selecciona productos y el alcance se calcula automáticamente
                              </p>
                            </div>
                          </label>

                          <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            segmentationType === 'csv'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
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
                                Cargarás archivos CSV en la programación
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Selección de productos */}
                      {segmentationType === 'active-users' && (
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Selecciona los productos *
                          </label>
                          <div className="space-y-2">
                            {availableProducts.map(product => (
                              <label
                                key={product.id}
                                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
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

                      {/* Programación */}
                      <div className="pt-4 border-t border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Programación del Envío *
                        </label>

                        <div className="p-4 border border-gray-200 rounded-lg bg-white">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Fecha *
                              </label>
                              <input
                                type="date"
                                required
                                value={sendSchedule.date}
                                onChange={(e) => handleScheduleChange('date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Hora *
                              </label>
                              <input
                                type="time"
                                required
                                value={sendSchedule.time}
                                onChange={(e) => handleScheduleChange('time', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                          </div>

                          {/* CSV Upload */}
                          {segmentationType === 'csv' && !sendSchedule.csvFile && (
                            <div className="mt-3">
                              <label className="block text-xs font-medium text-gray-700 mb-2">
                                Archivo CSV *
                              </label>
                              <label className="flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-colors">
                                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="mt-2 text-sm text-gray-600">Seleccionar archivo CSV</p>
                                <p className="mt-1 text-xs text-gray-500">MSISDN por línea</p>
                                <input
                                  type="file"
                                  accept=".csv"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const file = e.target.files[0];
                                      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                                        handleScheduleCsvChange(file);
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

                          {segmentationType === 'csv' && sendSchedule.csvFile && (
                            <div className="mt-3">
                              <label className="block text-xs font-medium text-gray-700 mb-2">
                                Archivo CSV *
                              </label>
                              <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Check className="w-5 h-5 text-green-600" />
                                  <div>
                                    <span className="text-sm text-green-900 font-medium block">{sendSchedule.csvFile.name}</span>
                                    <span className="text-xs text-green-700">Archivo cargado correctamente</span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleScheduleCsvChange(null)}
                                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Botones de acción del envío */}
                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={handleSaveSend}
                          className="flex-1 py-2.5 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          {editingSendIndex !== null ? 'Guardar Cambios' : 'Guardar Envío'}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelSend}
                          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Resumen */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">Paso 3: Resumen</h3>
                  <p className="text-sm text-blue-800">
                    Revisa toda la configuración de la campaña y sus envíos antes de confirmar.
                  </p>
                </div>

                {/* Información de la Campaña */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
                    Información de la Campaña
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
                      <span className="text-sm text-gray-600">Fecha de Inicio:</span>
                      <span className="text-sm font-medium text-gray-900">{executionDate}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Fecha de Fin:</span>
                      <span className="text-sm font-medium text-gray-900">{endDate}</span>
                    </div>
                  </div>
                </div>

                {/* Envíos */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</div>
                    Envíos Configurados ({sends.length})
                  </h4>
                  <div className="pl-8 space-y-4">
                    {sends.map((send, index) => (
                      <div key={send.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Envío #{index + 1}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                            {campaignTypes.find(t => t.value === send.campaignType)?.label}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600">Short Code:</span>
                            <span className="font-medium text-gray-900">{send.shortCode}</span>
                          </div>
                          <div className="py-1">
                            <span className="text-gray-600 block mb-1">Mensaje SMS:</span>
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <span className="text-sm font-mono text-gray-900">{send.smsText}</span>
                            </div>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600">Segmentación:</span>
                            <span className="font-medium text-gray-900">
                              {send.segmentationType === 'csv' ? 'Archivo CSV' : `${send.selectedProducts.length} producto(s) seleccionado(s)`}
                            </span>
                          </div>

                          {send.segmentationType === 'active-users' && send.selectedProducts.length > 0 && (
                            <div className="py-1">
                              <span className="text-gray-600 block mb-2">Productos:</span>
                              <div className="space-y-1">
                                {send.selectedProducts.map(pid => {
                                  const product = availableProducts.find(p => p.id === pid);
                                  return (
                                    <div key={pid} className="flex justify-between bg-white p-2 rounded text-xs">
                                      <span className="text-gray-900">{product?.name}</span>
                                      <span className="text-gray-600">{product?.activeUsers.toLocaleString()} usuarios</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          <div className="pt-2 border-t border-gray-200">
                            <span className="text-gray-600 block mb-2">Programación:</span>
                            <div className="bg-white p-2 rounded text-xs">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">Fecha y hora:</span>
                                <div className="text-right">
                                  <div className="text-gray-900">{send.schedules[0].date} a las {send.schedules[0].time}</div>
                                  {send.segmentationType === 'csv' && send.schedules[0].csvFile && (
                                    <div className="text-green-600 mt-0.5 flex items-center gap-1 justify-end">
                                      <Check className="w-3 h-3" />
                                      {send.schedules[0].csvFile.name}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-900 mb-2">Información Importante</h4>
                  <p className="text-sm text-yellow-800">
                    Al confirmar, se creará la campaña con {sends.length} envío(s) configurado(s). Cada envío se ejecutará según sus programaciones establecidas.
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

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={currentStep === 2 && isCreatingOrEditingSend}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

    </div>
  );
}
