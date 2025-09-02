import React, { useState } from 'react';
import { Package, Plus, Search, Edit, Trash2, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import PackageModal from './PackageModal';

interface Product {
  id: string;
  name: string;
  provider: string;
  type: 'VAS' | 'OTT' | 'Telco';
  status: 'Active' | 'Inactive';
}

interface PackageItem {
  id: string;
  name: string;
  baseProduct: Product;
  complementaryProducts: Product[];
  telcoServices?: {
    data: string;
    voice: string;
    sms: string;
  };
  price: number;
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string;
  ticketId?: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Streaming',
    provider: 'Newry',
    type: 'OTT',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Gaming Plus Pro',
    provider: 'Provider 1',
    type: 'VAS',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Music Unlimited',
    provider: 'Provider 2',
    type: 'OTT',
    status: 'Active'
  },
  {
    id: '4',
    name: 'News Premium',
    provider: 'Newry',
    type: 'VAS',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Data Plan 10GB',
    provider: 'MNO Partner',
    type: 'Telco',
    status: 'Active'
  },
  {
    id: '6',
    name: 'Voice Minutes 500',
    provider: 'MNO Partner',
    type: 'Telco',
    status: 'Active'
  }
];

const mockPackages: PackageItem[] = [
  {
    id: '1',
    name: 'Entertainment Bundle Pro',
    baseProduct: mockProducts[0], // Premium Streaming
    complementaryProducts: [mockProducts[1], mockProducts[2]], // Gaming Plus Pro, Music Unlimited
    telcoServices: {
      data: '10 GB',
      voice: '500 minutes',
      sms: '100 SMS'
    },
    price: 29.99,
    status: 'Active',
    createdAt: '2024-03-01',
    ticketId: 'TICK-2024-001'
  },
  {
    id: '2',
    name: 'Newry Complete',
    baseProduct: mockProducts[0], // Premium Streaming
    complementaryProducts: [mockProducts[3]], // News Premium
    price: 19.99,
    status: 'Active',
    createdAt: '2024-03-05',
    ticketId: 'TICK-2024-002'
  },
  {
    id: '3',
    name: 'Gaming & Music Pack',
    baseProduct: mockProducts[1], // Gaming Plus Pro
    complementaryProducts: [mockProducts[2]], // Music Unlimited
    price: 14.99,
    status: 'Pending',
    createdAt: '2024-03-10',
    ticketId: 'TICK-2024-003'
  }
];

export default function Packages() {
  const [packages, setPackages] = useState<PackageItem[]>(mockPackages);
  const [products] = useState<Product[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.baseProduct.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.baseProduct.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
    setViewMode('detail');
  };

  const handleEdit = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este paquete?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const handleSave = (packageData: any) => {
    const newPackage: PackageItem = {
      id: Date.now().toString(),
      name: packageData.name,
      baseProduct: packageData.baseProduct,
      complementaryProducts: packageData.complementaryProducts,
      telcoServices: packageData.telcoServices,
      price: parseFloat(packageData.price),
      status: 'Pending', // Always pending until support team configures it
      createdAt: new Date().toISOString().split('T')[0],
      ticketId: `TICK-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`
    };
    setPackages([...packages, newPackage]);
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="h-4 w-4" />;
      case 'Inactive': return <Trash2 className="h-4 w-4" />;
      case 'Pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getProductTypeColor = (type: string) => {
    switch (type) {
      case 'OTT': return 'bg-blue-100 text-blue-800';
      case 'VAS': return 'bg-purple-100 text-purple-800';
      case 'Telco': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'detail' && selectedPackage) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('list')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to list
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Package Details</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedPackage.status)}`}>
              {getStatusIcon(selectedPackage.status)}
              <span className="ml-1">{selectedPackage.status}</span>
            </span>
          </div>
        </div>

        {/* Package Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{selectedPackage.name}</h2>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">${selectedPackage.price}</p>
              <p className="text-sm text-gray-500">Package price</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Creation date:</span>
              <p className="text-gray-900">{selectedPackage.createdAt}</p>
            </div>
            <div>
              <span className="font-medium">Ticket ID:</span>
              <p className="text-gray-900">{selectedPackage.ticketId}</p>
            </div>
            <div>
              <span className="font-medium">Status:</span>
              <p className="text-gray-900">{selectedPackage.status}</p>
            </div>
          </div>
        </div>

        {/* Base Product */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-green-600" />
            Base Product
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{selectedPackage.baseProduct.name}</h4>
                <p className="text-sm text-gray-600">Provider: {selectedPackage.baseProduct.provider}</p>
                <p className="text-xs text-gray-500 mt-2">
                  This product defines the business flow logic for the entire package
                </p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProductTypeColor(selectedPackage.baseProduct.type)}`}>
                {selectedPackage.baseProduct.type}
              </span>
            </div>
          </div>
        </div>

        {/* Complementary Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-blue-600" />
            Complementary Products ({selectedPackage.complementaryProducts.length})
          </h3>
          <div className="space-y-3">
            {selectedPackage.complementaryProducts.map((product, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">Provider: {product.provider}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProductTypeColor(product.type)}`}>
                    {product.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Telco Services */}
        {selectedPackage.telcoServices && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-orange-600" />
              Telecommunications Services
            </h3>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">📱</div>
                  <p className="text-sm font-medium text-gray-700">Mobile Data</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPackage.telcoServices.data}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">📞</div>
                  <p className="text-sm font-medium text-gray-700">Voice Minutes</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPackage.telcoServices.voice}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">💬</div>
                  <p className="text-sm font-medium text-gray-700">SMS</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPackage.telcoServices.sms}</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Telecommunications services are subject to technical and commercial agreements with the Mobile Network Operator (MNO).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Package Status Information */}
        {selectedPackage.status === 'Pending' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Package Pending Configuration
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  This package has been sent to the central support team for manual configuration. 
                  Ticket <strong>{selectedPackage.ticketId}</strong> contains all necessary information 
                  to proceed with activation according to established commercial agreements.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Commercial Packages</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Package className="h-4 w-4" />
            <span>{packages.length} total packages</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Package</span>
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-blue-800">
              Commercial Package Information
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Packages combine multiple products to create unified commercial offers. 
              Each package requires a <strong>base product</strong> that defines the business logic, 
              and can include <strong>complementary products</strong> and telecommunications services 
              subject to agreements with the MNO.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Packages</p>
              <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <Package className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Packages</p>
              <p className="text-2xl font-bold text-gray-900">
                {packages.filter(p => p.status === 'Active').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {packages.filter(p => p.status === 'Pending').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
              <AlertCircle className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Price</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(packages.reduce((sum, p) => sum + p.price, 0) / packages.length || 0).toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Package className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Complementary Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telco Services
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{pkg.name}</div>
                    <div className="text-sm text-gray-500">Created: {pkg.createdAt}</div>
                    {pkg.ticketId && (
                      <div className="text-xs text-blue-600">Ticket: {pkg.ticketId}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{pkg.baseProduct.name}</div>
                    <div className="text-xs text-gray-500">{pkg.baseProduct.provider}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getProductTypeColor(pkg.baseProduct.type)}`}>
                      {pkg.baseProduct.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {pkg.complementaryProducts.length} product{pkg.complementaryProducts.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-xs text-gray-500">
                      {pkg.complementaryProducts.slice(0, 2).map(p => p.name).join(', ')}
                      {pkg.complementaryProducts.length > 2 && '...'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pkg.telcoServices ? (
                      <div className="space-y-1">
                        <div>📱 {pkg.telcoServices.data}</div>
                        <div>📞 {pkg.telcoServices.voice}</div>
                        <div>💬 {pkg.telcoServices.sms}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">No services</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${pkg.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                      {getStatusIcon(pkg.status)}
                      <span className="ml-1">{pkg.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(pkg)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
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
        <PackageModal
          package={selectedPackage}
          products={products}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPackage(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}