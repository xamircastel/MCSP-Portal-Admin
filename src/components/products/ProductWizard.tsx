import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Upload, Plus, Trash2 } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  type: 'VAS' | 'OTT';
  status: 'Active' | 'Inactive';
}

interface ProductWizardProps {
  providers: Provider[];
  onClose: () => void;
  onSave: (data: any) => void;
}

interface FormData {
  // Step 1: Product Definition
  providerId: string;
  serviceName: string;
  description: string;
  status: 'Active' | 'Inactive';
  shortCode: string;
  icon: File | null;
  images: File[];

  // Step 2: Keywords
  activationKeywords: Array<{
    keyword: string;
    trialAndBuy: boolean;
    trialDays: string;
    historyValidation: boolean;
    chargePeriod: 'daily' | 'weekly' | 'monthly';
    optinType: 'single' | 'double';
  }>;
  cancellationKeywords: string[];

  // Step 3: Messages and Pricing
  smsMessages: {
    welcome: string;
    otp: string;
    cancellation: string;
    reminder: string;
    content: string;
    renewal: string;
  };
  pricing: {
    fullPrice: string;
    scaledPrices: string[];
  };

  // Step 4: Product Content
  contentType: 'portal' | 'app';
  portalUrl: string;
  apkFile: File | null;

  // Step 5: Packaging
  category: string;
  subcategory: string;
}

const categories = [
  'Games',
  'Videos',
  'Books',
  'Adult',
  'Music',
  'News & Current Affairs',
  'TV & Streaming',
  'Education & Training',
  'Applications & Tools',
  'Art & Creativity'
];

const subcategoriesByCategory: Record<string, string[]> = {
  'Games': [
    'Action',
    'Adventure',
    'Strategy',
    'Puzzle',
    'Sports',
    'Multiplayer / Online',
    'Simulation',
    'Educational / Kids',
    'Arcade',
    'RPG (Role Playing Games)'
  ],
  'Videos': [
    'Movies',
    'Series',
    'Clips / Shorts',
    'Documentaries',
    'Tutorials / Educational',
    'Music videos',
    'Live streaming',
    'Kids content',
    'Viral / entertainment content'
  ],
  'Books': [
    'Fiction',
    'Novels',
    'Science fiction',
    'Fantasy',
    'Mystery / Suspense',
    'Romance',
    'Self-help',
    'History',
    'Biographies',
    'Business / Finance',
    'Technical / Professional',
    'Kids / Young adult',
    'Illustrated books / Comics',
    'Educational / Academic'
  ],
  'Adult': [
    'Visual eroticism',
    'Erotic stories',
    'Adult videos',
    'Chats / interactive experiences'
  ],
  'Music': [
    'Albums',
    'Singles',
    'Themed playlists',
    'Concerts / Live Sessions',
    'Music podcasts',
    'Exclusive content / Behind the scenes'
  ],
  'News & Current Affairs': [
    'International headlines',
    'Local news',
    'Sports',
    'Politics',
    'Economy / Finance',
    'Technology',
    'Culture and entertainment',
    'Environment'
  ],
  'TV & Streaming': [
    'Live channels',
    'On-demand series',
    'Soap operas',
    'Reality shows',
    'Kids programs',
    'Interviews / Magazines'
  ],
  'Education & Training': [
    'Online courses',
    'Workshops',
    'Step-by-step guides',
    'Simulators',
    'Certifications',
    'Teacher resources',
    'School / university material'
  ],
  'Applications & Tools': [
    'Utilities (calculators, converters, etc.)',
    'Personal organization',
    'Productivity',
    'Content editing',
    'Security and privacy',
    'Developer tools'
  ],
  'Art & Creativity': [
    'Digital galleries',
    'Visual portfolios',
    'Graphic design',
    'Interactive art',
    'AI creations',
    'Photography'
  ]
};

const steps = [
  { id: 1, name: 'Product Definition', description: 'Basic information' },
  { id: 2, name: 'Keywords', description: 'Activation and cancellation' },
  { id: 3, name: 'Messages & Pricing', description: 'SMS and pricing configuration' },
  { id: 4, name: 'Product Content', description: 'Content delivery method' },
  { id: 5, name: 'Packaging', description: 'Category and classification' }
];

export default function ProductWizard({ providers, onClose, onSave }: ProductWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Step 1
    providerId: '',
    serviceName: '',
    description: '',
    status: 'Active',
    shortCode: '',
    icon: null,
    images: [],

    // Step 2
    activationKeywords: [],
    cancellationKeywords: [],

    // Step 3
    smsMessages: {
      welcome: '',
      otp: '',
      cancellation: '',
      reminder: '',
      content: '',
      renewal: ''
    },
    pricing: {
      fullPrice: '',
      scaledPrices: ['', '', '', '']
    },

    // Step 4
    contentType: 'portal',
    portalUrl: '',
    apkFile: null,

    // Step 5
    category: '',
    subcategory: ''
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [newCancellationKeyword, setNewCancellationKeyword] = useState('');

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.providerId && formData.serviceName && formData.shortCode);
      case 2:
        return formData.activationKeywords.length > 0 && formData.cancellationKeywords.length > 0;
      case 3:
        return !!(formData.smsMessages.welcome && formData.pricing.fullPrice);
      case 4:
        return formData.contentType === 'portal' ? !!formData.portalUrl : !!formData.apkFile;
      case 5:
        return !!(formData.category && formData.subcategory);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 5 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (isStepValid(5)) {
      onSave(formData);
    }
  };

  const addActivationKeyword = () => {
    if (newKeyword.trim()) {
      setFormData(prev => ({
        ...prev,
        activationKeywords: [
          ...prev.activationKeywords,
          {
            keyword: newKeyword.trim(),
            trialAndBuy: false,
            trialDays: '',
            historyValidation: false,
            chargePeriod: 'monthly',
            optinType: 'single'
          }
        ]
      }));
      setNewKeyword('');
    }
  };

  const removeActivationKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activationKeywords: prev.activationKeywords.filter((_, i) => i !== index)
    }));
  };

  const updateActivationKeyword = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      activationKeywords: prev.activationKeywords.map((keyword, i) =>
        i === index ? { ...keyword, [field]: value } : keyword
      )
    }));
  };

  const addCancellationKeyword = () => {
    if (newCancellationKeyword.trim()) {
      setFormData(prev => ({
        ...prev,
        cancellationKeywords: [...prev.cancellationKeywords, newCancellationKeyword.trim()]
      }));
      setNewCancellationKeyword('');
    }
  };

  const removeCancellationKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      cancellationKeywords: prev.cancellationKeywords.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateScaledPrice = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        scaledPrices: prev.pricing.scaledPrices.map((price, i) => i === index ? value : price)
      }
    }));
  };

  const activeProviders = providers.filter(p => p.status === 'Active');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <nav className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center space-x-2 ${
                  step.id === currentStep 
                    ? 'text-green-600' 
                    : step.id < currentStep 
                      ? 'text-green-500' 
                      : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id === currentStep
                      ? 'bg-green-600 text-white'
                      : step.id < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium">{step.name}</div>
                    <div className="text-xs">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${
                    step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Step 1: Product Definition */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Product Definition</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provider *
                  </label>
                  <select
                    value={formData.providerId}
                    onChange={(e) => setFormData(prev => ({ ...prev, providerId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a provider</option>
                    {activeProviders.map((provider) => (
                      <option key={provider.id} value={provider.name}>
                        {provider.name} ({provider.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={formData.serviceName}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter service name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter product description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Code (6 digits) *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.shortCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, shortCode: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="123456"
                    required
                  />
                </div>
              </div>

              {/* Icon Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Icon
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.files?.[0] || null }))}
                    className="hidden"
                    id="icon-upload"
                  />
                  <label htmlFor="icon-upload" className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                    {formData.icon ? formData.icon.name : 'Click to upload icon'}
                  </label>
                </div>
              </div>

              {/* Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="images-upload"
                  />
                  <label htmlFor="images-upload" className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                    Click to upload images (multiple files allowed)
                  </label>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-500 text-center p-2">{image.name}</span>
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Keywords */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Keywords Configuration</h3>
              
              {/* Activation Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Activation Keywords *
                </label>
                
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Add activation keyword (e.g., GAMES)"
                  />
                  <button
                    type="button"
                    onClick={addActivationKeyword}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.activationKeywords.map((keyword, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">{keyword.keyword}</h4>
                        <button
                          onClick={() => removeActivationKeyword(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Charge Period
                          </label>
                          <select
                            value={keyword.chargePeriod}
                            onChange={(e) => updateActivationKeyword(index, 'chargePeriod', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Opt-in Type
                          </label>
                          <select
                            value={keyword.optinType}
                            onChange={(e) => updateActivationKeyword(index, 'optinType', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="single">Single Opt-in</option>
                            <option value="double">Double Opt-in</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={keyword.trialAndBuy}
                            onChange={(e) => updateActivationKeyword(index, 'trialAndBuy', e.target.checked)}
                            className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <span className="text-sm font-medium text-gray-700">Enable Trial & Buy</span>
                        </label>
                      </div>

                      {keyword.trialAndBuy && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trial Days
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={keyword.trialDays}
                                onChange={(e) => updateActivationKeyword(index, 'trialDays', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="7"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={keyword.historyValidation}
                                  onChange={(e) => updateActivationKeyword(index, 'historyValidation', e.target.checked)}
                                  className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">History Validation</span>
                              </label>
                            </div>
                          </div>
                          <p className="text-xs text-blue-700 mt-2">
                            History validation prevents users who have already used a trial benefit from accessing a new one.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cancellation Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Cancellation Keywords *
                </label>
                
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newCancellationKeyword}
                    onChange={(e) => setNewCancellationKeyword(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Add cancellation keyword (e.g., STOP)"
                  />
                  <button
                    type="button"
                    onClick={addCancellationKeyword}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.cancellationKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                    >
                      {keyword}
                      <button
                        onClick={() => removeCancellationKeyword(index)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Messages and Pricing */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Messages & Pricing</h3>
              
              {/* SMS Messages */}
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-4">SMS Messages</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Welcome SMS *
                    </label>
                    <textarea
                      value={formData.smsMessages.welcome}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        smsMessages: { ...prev.smsMessages, welcome: e.target.value }
                      }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Welcome message for new subscribers"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OTP SMS
                    </label>
                    <textarea
                      value={formData.smsMessages.otp}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        smsMessages: { ...prev.smsMessages, otp: e.target.value }
                      }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="OTP message for WiFi flow"
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
                      placeholder="Cancellation confirmation message"
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
                      placeholder="Service reminder message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content SMS
                    </label>
                    <textarea
                      value={formData.smsMessages.content}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        smsMessages: { ...prev.smsMessages, content: e.target.value }
                      }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Content delivery message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Renewal SMS
                    </label>
                    <textarea
                      value={formData.smsMessages.renewal}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        smsMessages: { ...prev.smsMessages, renewal: e.target.value }
                      }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Renewal notification message"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-4">Pricing Configuration</h4>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Service Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.pricing.fullPrice}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      pricing: { ...prev.pricing, fullPrice: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="9.99"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scaled Prices (applied if full charge fails)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.pricing.scaledPrices.map((price, index) => (
                      <div key={index}>
                        <label className="block text-xs text-gray-500 mb-1">
                          Price {index + 1}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={price}
                          onChange={(e) => updateScaledPrice(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder={`${(parseFloat(formData.pricing.fullPrice) * (0.8 - index * 0.1)).toFixed(2)}`}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    These prices will be attempted in order if the full price charge fails
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Product Content */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Product Content</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Content Delivery Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="portal"
                      checked={formData.contentType === 'portal'}
                      onChange={(e) => setFormData(prev => ({ ...prev, contentType: e.target.value as 'portal' | 'app' }))}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Portal Access</div>
                      <div className="text-sm text-gray-600">User receives URL to access content</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="app"
                      checked={formData.contentType === 'app'}
                      onChange={(e) => setFormData(prev => ({ ...prev, contentType: e.target.value as 'portal' | 'app' }))}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Mobile Application</div>
                      <div className="text-sm text-gray-600">User receives APK file for installation</div>
                    </div>
                  </label>
                </div>
              </div>

              {formData.contentType === 'portal' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portal URL *
                  </label>
                  <input
                    type="url"
                    value={formData.portalUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, portalUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://portal.provider.com/content"
                    required
                  />
                </div>
              )}

              {formData.contentType === 'app' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    APK File *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <input
                      type="file"
                      accept=".apk"
                      onChange={(e) => setFormData(prev => ({ ...prev, apkFile: e.target.files?.[0] || null }))}
                      className="hidden"
                      id="apk-upload"
                    />
                    <label htmlFor="apk-upload" className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                      {formData.apkFile ? formData.apkFile.name : 'Click to upload APK file'}
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Packaging */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Product Packaging</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      category: e.target.value,
                      subcategory: '' // Reset subcategory when category changes
                    }))}
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

              {/* Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Product Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Service:</span>
                    <span className="ml-2 text-gray-900">{formData.serviceName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Provider:</span>
                    <span className="ml-2 text-gray-900">{formData.providerId}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="ml-2 text-gray-900">{formData.category} → {formData.subcategory}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Price:</span>
                    <span className="ml-2 text-gray-900">${formData.pricing.fullPrice}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Keywords:</span>
                    <span className="ml-2 text-gray-900">{formData.activationKeywords.length} activation, {formData.cancellationKeywords.length} cancellation</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Content:</span>
                    <span className="ml-2 text-gray-900">{formData.contentType === 'portal' ? 'Portal Access' : 'Mobile App'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid(5)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="h-4 w-4" />
              <span>Create Product</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}