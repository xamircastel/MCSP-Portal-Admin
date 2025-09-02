import React, { useState } from 'react';
import { X, Upload, Search } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  type: 'VAS' | 'OTT';
  status: 'Active' | 'Inactive';
}

interface Product {
  id: string;
  name: string;
  provider: string;
  type: 'VAS' | 'OTT';
  status: 'Active' | 'Inactive';
}

interface LandingPageModalProps {
  providers: Provider[];
  products: Product[];
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function LandingPageModal({ providers, products, onClose, onSave }: LandingPageModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    providerId: '',
    productId: '',
    template: 'Modern Video',
    backgroundImages: {
      high: null as File | null,
      medium: null as File | null,
      low: null as File | null
    },
    legalTexts: {
      text1: '',
      text2: '',
      text3: ''
    },
    termsConditionsUrl: '',
    status: 'Draft' as 'Published' | 'Draft'
  });

  const [providerSearch, setProviderSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = (resolution: 'high' | 'medium' | 'low', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      backgroundImages: {
        ...prev.backgroundImages,
        [resolution]: file
      }
    }));
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(providerSearch.toLowerCase()) &&
    provider.status === 'Active'
  );

  const filteredProducts = products.filter(product =>
    product.provider === formData.providerId && product.status === 'Active'
  );

  const getImageSizeText = (resolution: 'high' | 'medium' | 'low') => {
    switch (resolution) {
      case 'high': return '1920px to 2560px';
      case 'medium': return '800px to 1200px';
      case 'low': return '400px to 600px';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Landing Page
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Landing Page Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter landing page name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template
              </label>
              <select
                value={formData.template}
                onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Modern Video">Modern Video</option>
                <option value="Gaming Theme">Gaming Theme</option>
                <option value="Music Wave">Music Wave</option>
                <option value="Minimal Clean">Minimal Clean</option>
              </select>
            </div>
          </div>

          {/* Provider and Product Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                onChange={(e) => setFormData(prev => ({ ...prev, providerId: e.target.value, productId: '' }))}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product *
              </label>
              <select
                value={formData.productId}
                onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                disabled={!formData.providerId}
              >
                <option value="">Select a product</option>
                {filteredProducts.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name} ({product.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Background Images */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Background Images</h3>
            <p className="text-sm text-gray-600 mb-4">
              Accepted formats: <strong>WebP, AVIF, JPG</strong>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['high', 'medium', 'low'] as const).map((resolution) => (
                <div key={resolution}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {resolution.charAt(0).toUpperCase() + resolution.slice(1)} Resolution
                    <span className="text-gray-500 ml-1">({getImageSizeText(resolution)})</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <input
                      type="file"
                      accept=".webp,.avif,.jpg,.jpeg"
                      onChange={(e) => handleImageUpload(resolution, e.target.files?.[0] || null)}
                      className="hidden"
                      id={`upload-${resolution}`}
                    />
                    <label
                      htmlFor={`upload-${resolution}`}
                      className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                    >
                      {formData.backgroundImages[resolution] 
                        ? formData.backgroundImages[resolution]?.name 
                        : 'Click to upload image'
                      }
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Texts */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Legal Texts</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Text 1
                </label>
                <textarea
                  value={formData.legalTexts.text1}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    legalTexts: { ...prev.legalTexts, text1: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter first legal text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Text 2
                </label>
                <textarea
                  value={formData.legalTexts.text2}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    legalTexts: { ...prev.legalTexts, text2: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter second legal text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Text 3
                </label>
                <textarea
                  value={formData.legalTexts.text3}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    legalTexts: { ...prev.legalTexts, text3: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter third legal text"
                />
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Terms & Conditions URL
            </label>
            <input
              type="url"
              value={formData.termsConditionsUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, termsConditionsUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://example.com/terms-and-conditions"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'Published' | 'Draft' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
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
              Create Landing Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}