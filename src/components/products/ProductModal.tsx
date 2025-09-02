import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  provider: string;
  type: 'VAS' | 'OTT';
  serviceType: 'Subscription' | 'On-demand';
  price: number;
  status: 'Active' | 'Inactive';
}

interface Provider {
  id: string;
  name: string;
  type: 'VAS' | 'OTT';
  status: 'Active' | 'Inactive';
}

interface ProductModalProps {
  product: Product | null;
  providers: Provider[];
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function ProductModal({ product, providers, onClose, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState({
    providerId: '',
    serviceType: 'VAS' as 'VAS' | 'OTT',
    purchaseType: 'subscription' as 'subscription' | 'ondemand',
    serviceName: '',
    description: '',
    category: '',
    subcategory: '',
    contentType: 'web' as 'web' | 'app',
    portalUrl: '',
    revenueShare: '',
    channelOptins: {} as Record<string, 'single' | 'double'>,
    hibridoOptins: {
      firstOptin: [] as string[],
      secondOptin: [] as string[]
    },
    channels: [] as string[],
    shortCode: '',
    keywords: [] as string[],
    pricing: {
      prepaid: '',
      postpaid: ''
    },
    trialAndBuy: false,
    gracePeriod: '',
    smsMessages: {
      welcome: '',
      cancellation: '',
      otp: '',
      reminder: '',
      renewal: ''
    },
    activationCommands: [] as string[],
    cancellationCommands: ['SALIR'] as string[],
    status: 'Active' as 'Active' | 'Inactive'
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [newCommand, setNewCommand] = useState('');
  const [newCancellationCommand, setNewCancellationCommand] = useState('');
  const [providerSearch, setProviderSearch] = useState('');

  // Category and subcategory data
  const categories = [
    'Juegos',
    'Videos',
    'Libros',
    'Adulto',
    'Música',
    'Noticias y Actualidad',
    'TV & Streaming',
    'Educación y Formación',
    'Aplicaciones y Herramientas',
    'Arte y Creatividad'
  ];

  const subcategoriesByCategory: Record<string, string[]> = {
    'Juegos': [
      'Acción',
      'Aventura',
      'Estrategia',
      'Puzzle / Rompecabezas',
      'Deportes',
      'Multijugador / Online',
      'Simulación',
      'Educativos / Infantiles',
      'Arcade',
      'RPG (Role Playing Games)'
    ],
    'Videos': [
      'Películas',
      'Series',
      'Clips / Cortos',
      'Documentales',
      'Tutoriales / Educativos',
      'Videos musicales',
      'Streaming en vivo',
      'Contenido infantil',
      'Contenido viral / entretenimiento'
    ],
    'Libros': [
      'Ficción',
      'Novelas',
      'Ciencia ficción',
      'Fantasía',
      'Misterio / Suspenso',
      'Romance',
      'Autoayuda',
      'Historia',
      'Biografías',
      'Negocios / Finanzas',
      'Técnicos / Profesionales',
      'Infantiles / Juveniles',
      'Libros ilustrados / Cómics',
      'Educativos / Académicos'
    ],
    'Adulto': [
      'Erotismo visual',
      'Relatos eróticos',
      'Videos para adultos',
      'Chats / experiencias interactivas'
    ],
    'Música': [
      'Álbumes',
      'Sencillos',
      'Playlists temáticas',
      'Conciertos / Live Sessions',
      'Podcasts musicales',
      'Contenido exclusivo / Behind the scenes'
    ],
    'Noticias y Actualidad': [
      'Titulares internacionales',
      'Noticias locales',
      'Deportes',
      'Política',
      'Economía / Finanzas',
      'Tecnología',
      'Cultura y entretenimiento',
      'Medio ambiente'
    ],
    'TV & Streaming': [
      'Canales en vivo',
      'Series por demanda',
      'Telenovelas',
      'Reality shows',
      'Programas infantiles',
      'Entrevistas / Magazines'
    ],
    'Educación y Formación': [
      'Cursos en línea',
      'Talleres',
      'Guías paso a paso',
      'Simuladores',
      'Certificaciones',
      'Recursos para docentes',
      'Material escolar / universitario'
    ],
    'Aplicaciones y Herramientas': [
      'Utilidades (calculadoras, conversores, etc.)',
      'Organización personal',
      'Productividad',
      'Edición de contenido',
      'Seguridad y privacidad',
      'Herramientas para desarrolladores'
    ],
    'Arte y Creatividad': [
      'Galerías digitales',
      'Portafolios visuales',
      'Diseño gráfico',
      'Arte interactivo',
      'Creaciones AI',
      'Fotografía'
    ]
  };

  useEffect(() => {
    if (product) {
      setFormData({
        providerId: product.provider,
        serviceType: product.type,
        purchaseType: product.serviceType.toLowerCase() as 'subscription' | 'ondemand',
        serviceName: product.name,
        description: '',
        category: '',
        subcategory: '',
        contentType: 'web',
        portalUrl: '',
        revenueShare: '',
        channels: [],
        shortCode: '',
        channelOptins: {},
        pricing: {
          prepaid: product.price.toString(),
          postpaid: product.price.toString()
        },
        hibridoOptins: {
          firstOptin: [],
          secondOptin: []
        },
        channels: [],
        trialAndBuy: false,
        gracePeriod: '',
        smsMessages: {
          welcome: '',
          cancellation: '',
          otp: '',
          reminder: '',
          renewal: ''
        },
        activationCommands: [],
        cancellationCommands: ['SALIR'],
        status: product.status
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChannelChange = (channel: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        channels: [...prev.channels, channel]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        channels: prev.channels.filter(c => c !== channel),
        channelOptins: Object.fromEntries(
          Object.entries(prev.channelOptins).filter(([key]) => key !== channel)
        )
      }));
      // If unchecking Híbrido, clear the optin selections
      if (channel === 'Híbrido') {
        setFormData(prev => ({
          ...prev,
          hibridoOptins: {
            firstOptin: [],
            secondOptin: []
          }
        }));
      }
    }
  };

  const handleOptinChannelChange = (optinType: 'firstOptin' | 'secondOptin', channel: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      hibridoOptins: {
        ...prev.hibridoOptins,
        [optinType]: checked 
          ? [...prev.hibridoOptins[optinType], channel]
          : prev.hibridoOptins[optinType].filter(c => c !== channel)
      }
    }));
  };

  const handleOptinChange = (channel: string, optinType: 'single' | 'double') => {
    setFormData(prev => ({
      ...prev,
      channelOptins: {
        ...prev.channelOptins,
        [channel]: optinType
      }
    }));
  };

  const addCommand = () => {
    if (newCommand.trim()) {
      setFormData(prev => ({
        ...prev,
        activationCommands: [...prev.activationCommands, newCommand.trim()]
      }));
      setNewCommand('');
    }
  };

  const removeCommand = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activationCommands: prev.activationCommands.filter((_, i) => i !== index)
    }));
  };

  const addCancellationCommand = () => {
    if (newCancellationCommand.trim()) {
      setFormData(prev => ({
        ...prev,
        cancellationCommands: [...prev.cancellationCommands, newCancellationCommand.trim()]
      }));
      setNewCancellationCommand('');
    }
  };

  const removeCancellationCommand = (index: number) => {
    setFormData(prev => ({
      ...prev,
      cancellationCommands: prev.cancellationCommands.filter((_, i) => i !== index)
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category: category,
      subcategory: '' // Reset subcategory when category changes
    }));
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(providerSearch.toLowerCase()) &&
    provider.status === 'Active'
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Provider *
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search providers..."
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
              <option value="">Select a provider</option>
              {filteredProviders.map((provider) => (
                <option key={provider.id} value={provider.name}>
                  {provider.name} ({provider.type})
                </option>
              ))}
            </select>
          </div>

          {/* Service Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type *
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value as 'VAS' | 'OTT' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="VAS">VAS</option>
                <option value="OTT">OTT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Type
              </label>
              <select
                value={formData.purchaseType}
                onChange={(e) => setFormData(prev => ({ ...prev, purchaseType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="subscription">Subscription Purchase</option>
                <option value="ondemand">On-demand Purchase</option>
              </select>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  value={formData.serviceName}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Share (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.revenueShare}
                  onChange={(e) => setFormData(prev => ({ ...prev, revenueShare: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category and Subcategory */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Classification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory *
                </label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={!formData.category}
                  required
                >
                  <option value="">
                    {formData.category ? 'Select a subcategory' : 'Select a category first'}
                  </option>
                  {formData.category && subcategoriesByCategory[formData.category]?.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="web"
                  checked={formData.contentType === 'web'}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentType: e.target.value }))}
                  className="mr-2"
                />
                Web Portal
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="app"
                  checked={formData.contentType === 'app'}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentType: e.target.value }))}
                  className="mr-2"
                />
                Application
              </label>
            </div>
          </div>

          {formData.contentType === 'web' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portal URL
              </label>
              <input
                type="url"
                value={formData.portalUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, portalUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          )}

          {formData.contentType === 'app' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                APK File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop APK file
                </p>
              </div>
            </div>
          )}

          {/* Channels */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Channels
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['HE', 'WIFI', 'SAT PUSH', 'SMS', 'USSD', 'Híbrido'].map(channel => (
                <label key={channel} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.channels.includes(channel)}
                    onChange={(e) => handleChannelChange(channel, e.target.checked)}
                    className="mr-2"
                  />
                  {channel}
                </label>
              ))}
            </div>

            {/* Híbrido Subsection */}
            {formData.channels.includes('Híbrido') && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-md font-medium text-gray-900 mb-4">Híbrido Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Optin */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      First Optin
                    </label>
                    <div className="space-y-2">
                      {['HE', 'SAT PUSH', 'SMS', 'USSD'].map(channel => (
                        <label key={`first-${channel}`} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.hibridoOptins.firstOptin.includes(channel)}
                            onChange={(e) => handleOptinChannelChange('firstOptin', channel, e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{channel}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Second Optin */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Second Optin
                    </label>
                    <div className="space-y-2">
                      {['HE', 'SAT PUSH', 'SMS', 'USSD'].map(channel => (
                        <label key={`second-${channel}`} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.hibridoOptins.secondOptin.includes(channel)}
                            onChange={(e) => handleOptinChannelChange('secondOptin', channel, e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{channel}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Channel Opt-In Configuration */}
            {formData.channels.filter(channel => ['HE', 'SAT PUSH', 'SMS', 'USSD'].includes(channel)).length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="text-md font-medium text-gray-900 mb-4">Channel Opt-In Configuration</h4>
                
                <div className="space-y-4">
                  {formData.channels.filter(channel => ['HE', 'SAT PUSH', 'SMS', 'USSD'].includes(channel)).map(channel => (
                    <div key={`optin-${channel}`} className="border border-gray-200 rounded-lg p-3 bg-white">
                      <h5 className="text-sm font-medium text-gray-800 mb-3">{channel}</h5>
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`optin-${channel}`}
                            checked={formData.channelOptins[channel] === 'single'}
                            onChange={() => handleOptinChange(channel, 'single')}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Single Opt-In</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`optin-${channel}`}
                            checked={formData.channelOptins[channel] === 'double'}
                            onChange={() => handleOptinChange(channel, 'double')}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Double Opt-In</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Short Code & Keywords */}
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Code (6 digits)
              </label>
              <input
                type="text"
                maxLength={6}
                value={formData.shortCode}
                onChange={(e) => setFormData(prev => ({ ...prev, shortCode: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prepaid Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.pricing.prepaid}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing, prepaid: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postpaid Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.pricing.postpaid}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing, postpaid: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.trialAndBuy}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      trialAndBuy: e.target.checked,
                      gracePeriod: e.target.checked ? prev.gracePeriod : ''
                    }))}
                    className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Trial & Buy</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grace Period (days)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.gracePeriod}
                  onChange={(e) => setFormData(prev => ({ ...prev, gracePeriod: e.target.value }))}
                  disabled={!formData.trialAndBuy}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    !formData.trialAndBuy 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* SMS Messages */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Messages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Welcome SMS
                </label>
                <textarea
                  value={formData.smsMessages.welcome}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smsMessages: { ...prev.smsMessages, welcome: e.target.value }
                  }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation SMS
                </label>
                <textarea
                  value={formData.smsMessages.cancellation}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smsMessages: { ...prev.smsMessages, cancellation: e.target.value }
                  }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP SMS (WIFI)
                </label>
                <textarea
                  value={formData.smsMessages.otp}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smsMessages: { ...prev.smsMessages, otp: e.target.value }
                  }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reminder SMS
                </label>
                <textarea
                  value={formData.smsMessages.reminder}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smsMessages: { ...prev.smsMessages, reminder: e.target.value }
                  }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Renewal Notification SMS
                </label>
                <textarea
                  value={formData.smsMessages.renewal}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smsMessages: { ...prev.smsMessages, renewal: e.target.value }
                  }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* SMS Commands */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activation Commands */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activation Commands (SMS)
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCommand}
                  onChange={(e) => setNewCommand(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add activation command (e.g., JUEGOS)"
                />
                <button
                  type="button"
                  onClick={addCommand}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.activationCommands.map((command, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-md"
                  >
                    {command}
                    <button
                      type="button"
                      onClick={() => removeCommand(index)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Cancellation Commands */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Commands (SMS)
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCancellationCommand}
                  onChange={(e) => setNewCancellationCommand(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add cancellation command (e.g., SALIR)"
                />
                <button
                  type="button"
                  onClick={addCancellationCommand}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.cancellationCommands.map((command, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-sm rounded-md"
                  >
                    {command}
                    <button
                      type="button"
                      onClick={() => removeCancellationCommand(index)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Commands users send to cancel subscription
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'Active' | 'Inactive' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}