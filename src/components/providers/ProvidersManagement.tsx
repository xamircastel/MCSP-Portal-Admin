import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import ProviderModal from './ProviderModal';

interface Provider {
  id: string;
  name: string;
  type: 'VAS' | 'OTT';
  products: number;
  revenue: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Newry',
    type: 'OTT',
    products: 12,
    revenue: 450000,
    status: 'Active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Proveedor 1',
    type: 'VAS',
    products: 8,
    revenue: 280000,
    status: 'Active',
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    name: 'Proveedor 2',
    type: 'OTT',
    products: 5,
    revenue: 180000,
    status: 'Inactive',
    createdAt: '2024-03-10'
  }
];

export default function ProvidersManagement() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProviders(providers.filter(p => p.id !== id));
  };

  const handleSave = (providerData: any) => {
    if (selectedProvider) {
      setProviders(providers.map(p => 
        p.id === selectedProvider.id ? { ...p, ...providerData } : p
      ));
    } else {
      const newProvider: Provider = {
        id: Date.now().toString(),
        ...providerData,
        products: 0,
        revenue: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProviders([...providers, newProvider]);
    }
    setIsModalOpen(false);
    setSelectedProvider(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Providers Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Provider</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProviders.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{provider.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {provider.products}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${provider.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      provider.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {provider.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(provider)}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(provider.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ProviderModal
          provider={selectedProvider}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProvider(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}