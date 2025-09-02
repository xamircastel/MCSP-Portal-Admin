import React, { useState } from 'react';
import { FileText, Eye, Edit, Trash2, Plus, Smartphone, Monitor, Calendar, Search } from 'lucide-react';
import LandingPageModal from './LandingPageModal';

interface LandingPage {
  id: string;
  name: string;
  product: string;
  provider: string;
  template: string;
  status: 'Published' | 'Draft';
  views: number;
  conversions: number;
  createdAt: string;
  url: string;
}

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

const mockLandingPages: LandingPage[] = [
  {
    id: '1',
    name: 'Newry Premium LP',
    product: 'Premium Streaming',
    provider: 'Newry',
    template: 'Modern Video',
    status: 'Published',
    views: 15420,
    conversions: 1234,
    createdAt: '2024-03-01',
    url: 'https://lp.mscp.com/newry-premium'
  },
  {
    id: '2',
    name: 'Proveedor 1 Pro LP',
    product: 'Timwe Pro',
    provider: 'Provider 1',
    template: 'Gaming Theme',
    status: 'Published',
    views: 8930,
    conversions: 892,
    createdAt: '2024-03-05',
    url: 'https://lp.mscp.com/proveedor1-pro'
  },
  {
    id: '3',
    name: 'Music Unlimited LP',
    product: 'Music Unlimited',
    provider: 'Provider 2',
    template: 'Music Wave',
    status: 'Draft',
    views: 0,
    conversions: 0,
    createdAt: '2024-03-10',
    url: 'https://lp.mscp.com/music-unlimited'
  }
];

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Newry',
    type: 'OTT',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Provider 1',
    type: 'VAS',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Provider 2',
    type: 'OTT',
    status: 'Active'
  }
];

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
    name: 'Timwe Pro',
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
  }
];

export default function LPBuilder() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>(mockLandingPages);
  const [providers] = useState<Provider[]>(mockProviders);
  const [products] = useState<Product[]>(mockProducts);
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '2024-03-01',
    endDate: '2024-03-31'
  });
  const [selectedProvider, setSelectedProvider] = useState('');

  const conversionRate = (page: LandingPage) => {
    return page.views > 0 ? ((page.conversions / page.views) * 100).toFixed(2) : '0.00';
  };

  const handleSave = (landingPageData: any) => {
    const newLandingPage: LandingPage = {
      id: Date.now().toString(),
      name: landingPageData.name,
      product: landingPageData.productId,
      provider: landingPageData.providerId,
      template: landingPageData.template,
      status: landingPageData.status,
      views: 0,
      conversions: 0,
      createdAt: new Date().toISOString().split('T')[0],
      url: `https://lp.mscp.com/${landingPageData.name.toLowerCase().replace(/\s+/g, '-')}`
    };
    setLandingPages([...landingPages, newLandingPage]);
    setIsModalOpen(false);
  };

  const filteredLandingPagesByProvider = selectedProvider 
    ? landingPages.filter(page => page.provider === selectedProvider)
    : [];

  // Filter data by date range
  const filteredByDate = landingPages.filter(page => {
    const pageDate = new Date(page.createdAt);
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    return pageDate >= start && pageDate <= end;
  });

  const totalViews = filteredByDate.reduce((sum, page) => sum + page.views, 0);
  const totalConversions = filteredByDate.reduce((sum, page) => sum + page.conversions, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Landing Page Builder</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Landing Page</span>
        </button>
      </div>

      {/* Time Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Analytics Time Filter</h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-green-600">{totalConversions.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pages</p>
              <p className="text-2xl font-bold text-gray-900">{landingPages.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {landingPages.filter(p => p.status === 'Published').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <FileText className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {landingPages.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Eye className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-gray-900">
                {landingPages.reduce((sum, p) => sum + p.conversions, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <FileText className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Landing Pages List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Landing Pages</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {landingPages.map((page) => (
                <div key={page.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-medium text-gray-900">{page.name}</h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          page.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {page.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {page.product} • {page.provider}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Template: {page.template}
                      </p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <span>{page.views.toLocaleString()} views</span>
                        <span>{page.conversions.toLocaleString()} conversions</span>
                        <span>{conversionRate(page)}% conversion rate</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedPage(page);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Preview</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Smartphone className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Monitor className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {selectedPage ? (
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{selectedPage.product}</h3>
                    <p className="text-sm opacity-90">Mobile-optimized landing page</p>
                    <button className="mt-4 bg-white text-green-600 px-6 py-2 rounded-lg font-medium">
                      Subscribe Now
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">{selectedPage.name}</h4>
                  <p className="text-sm text-gray-600">Template: {selectedPage.template}</p>
                  <p className="text-xs text-gray-500 font-mono">{selectedPage.url}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Views:</span>
                    <span className="ml-2 font-medium">{selectedPage.views.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Conversions:</span>
                    <span className="ml-2 font-medium">{selectedPage.conversions.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Edit Landing Page
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a landing page to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Provider Landing Pages Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Landing Pages by Provider</h3>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Provider
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a provider</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.name}>
                  {provider.name} ({provider.type})
                </option>
              ))}
            </select>
          </div>

          {selectedProvider && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">
                Landing Page URLs for {selectedProvider}
              </h4>
              {filteredLandingPagesByProvider.length > 0 ? (
                <div className="space-y-2">
                  {filteredLandingPagesByProvider.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{page.name}</p>
                        <p className="text-sm text-blue-600 font-mono">{page.url}</p>
                        <p className="text-xs text-gray-500">Product: {page.product}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          page.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {page.status}
                        </span>
                        <button
                          onClick={() => navigator.clipboard.writeText(page.url)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No landing pages found for this provider.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <LandingPageModal
          providers={providers}
          products={products}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}