import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  type: 'VAS' | 'OTT';
  status: 'Active' | 'Inactive';
}

interface ProviderModalProps {
  provider: Provider | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function ProviderModal({ provider, onClose, onSave }: ProviderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    apiEndpoints: {
      subscription: '',
      charge: '',
      cancellation: ''
    },
    moReceiverEndpoint: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  useEffect(() => {
    if (provider) {
      setFormData({
        name: provider.name,
        apiEndpoints: {
          subscription: '',
          charge: '',
          cancellation: ''
        },
        moReceiverEndpoint: '',
        status: provider.status
      });
    }
  }, [provider]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {provider ? 'Edit Provider' : 'Add New Provider'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Provider Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Provider Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter provider name"
              required
            />
          </div>

          {/* API Configuration */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">API Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription Endpoint
                </label>
                <input
                  type="url"
                  value={formData.apiEndpoints.subscription}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    apiEndpoints: { ...prev.apiEndpoints, subscription: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://api.provider.com/subscription"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Charge Endpoint
                </label>
                <input
                  type="url"
                  value={formData.apiEndpoints.charge}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    apiEndpoints: { ...prev.apiEndpoints, charge: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://api.provider.com/charge"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Endpoint
                </label>
                <input
                  type="url"
                  value={formData.apiEndpoints.cancellation}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    apiEndpoints: { ...prev.apiEndpoints, cancellation: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://api.provider.com/cancellation"
                />
              </div>
            </div>
          </div>

          {/* MO Receiver Configuration */}
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MO Receiver Endpoint *
              </label>
              <input
                type="url"
                value={formData.moReceiverEndpoint}
                onChange={(e) => setFormData(prev => ({ ...prev, moReceiverEndpoint: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://api.provider.com/mo-receiver"
                required
              />
              <p className="mt-2 text-sm text-gray-600">
                URL where the provider will receive user SMS messages (MO - Mobile Originated)
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
              {provider ? 'Update Provider' : 'Create Provider'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}