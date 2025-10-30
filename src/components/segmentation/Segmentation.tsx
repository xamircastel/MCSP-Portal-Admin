import { useState } from 'react';
import { Users, Package, Target, Edit, Save, Settings } from 'lucide-react';

// Interfaces
interface Product {
  id: string;
  name: string;
  provider: string;
  type: 'VAS' | 'OTT';
  price: number;
}

interface Segment {
  id: string;
  name: string;
  description: string;
  marketType: 'Prepago' | 'Postpago' | 'Ambos';
  clientType: 'Natural' | 'Empresa' | 'Ambos';
  arpuRange: string;
  color: string;
}

interface ProductSegmentation {
  productId: string;
  segments: string[];
}

// Mock data
const mockProducts: Product[] = [
  { id: '1', name: 'Premium Streaming', provider: 'Newry', type: 'OTT', price: 9.99 },
  { id: '2', name: 'Gaming Plus Pro', provider: 'Provider 1', type: 'VAS', price: 4.99 },
  { id: '3', name: 'Music Unlimited', provider: 'Provider 2', type: 'OTT', price: 7.99 },
  { id: '4', name: 'Sports Package', provider: 'Newry', type: 'OTT', price: 12.99 },
  { id: '5', name: 'News Premium', provider: 'Provider 3', type: 'OTT', price: 5.99 },
];

const mockSegments: Segment[] = [
  {
    id: 'low',
    name: 'Low ARPU',
    description: 'Usuarios con ARPU menor a $20',
    marketType: 'Ambos',
    clientType: 'Ambos',
    arpuRange: '< $20',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'mid-low',
    name: 'Mid-Low ARPU',
    description: 'Usuarios con ARPU entre $20 y $40',
    marketType: 'Ambos',
    clientType: 'Ambos',
    arpuRange: '$20 - $40',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'mid',
    name: 'Mid ARPU',
    description: 'Usuarios con ARPU entre $40 y $70',
    marketType: 'Ambos',
    clientType: 'Ambos',
    arpuRange: '$40 - $70',
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 'mid-high',
    name: 'Mid-High ARPU',
    description: 'Usuarios con ARPU entre $70 y $100',
    marketType: 'Ambos',
    clientType: 'Ambos',
    arpuRange: '$70 - $100',
    color: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'high',
    name: 'High ARPU',
    description: 'Usuarios con ARPU mayor a $100',
    marketType: 'Ambos',
    clientType: 'Ambos',
    arpuRange: '> $100',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'prepago',
    name: 'Prepago',
    description: 'Usuarios con plan prepago',
    marketType: 'Prepago',
    clientType: 'Ambos',
    arpuRange: 'Variable',
    color: 'bg-cyan-100 text-cyan-800'
  },
  {
    id: 'postpago',
    name: 'Postpago',
    description: 'Usuarios con plan postpago',
    marketType: 'Postpago',
    clientType: 'Ambos',
    arpuRange: 'Variable',
    color: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 'empresa',
    name: 'Empresas',
    description: 'Clientes corporativos',
    marketType: 'Ambos',
    clientType: 'Empresa',
    arpuRange: 'Variable',
    color: 'bg-gray-100 text-gray-800'
  }
];

export default function Segmentation() {
  const [products] = useState<Product[]>(mockProducts);
  const [segments] = useState<Segment[]>(mockSegments);
  const [productSegmentations, setProductSegmentations] = useState<ProductSegmentation[]>([
    { productId: '1', segments: ['mid', 'mid-high', 'high', 'postpago'] },
    { productId: '2', segments: ['low', 'mid-low', 'prepago'] },
    { productId: '3', segments: ['mid-low', 'mid', 'mid-high'] },
  ]);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'VAS' | 'OTT'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique providers
  const providers = Array.from(new Set(products.map(p => p.provider)));

  const getProductSegmentation = (productId: string): ProductSegmentation => {
    return productSegmentations.find(ps => ps.productId === productId) || {
      productId,
      segments: []
    };
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = filterProvider === 'all' || product.provider === filterProvider;
    const matchesType = filterType === 'all' || product.type === filterType;
    return matchesSearch && matchesProvider && matchesType;
  });

  const handleSegmentToggle = (productId: string, segmentId: string) => {
    setProductSegmentations(prev => {
      const existing = prev.find(ps => ps.productId === productId);
      if (existing) {
        const updatedSegments = existing.segments.includes(segmentId)
          ? existing.segments.filter(s => s !== segmentId)
          : [...existing.segments, segmentId];
        
        return prev.map(ps =>
          ps.productId === productId
            ? { ...ps, segments: updatedSegments }
            : ps
        );
      } else {
        return [...prev, { productId, segments: [segmentId] }];
      }
    });
  };

  const handleSave = (productId: string) => {
    setEditingProduct(null);
    // Aquí se haría la llamada a la API para guardar
    console.log('Guardando configuración para producto:', productId);
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Segmentación de Productos</h1>
          <p className="text-gray-600 mt-2">
            Configura qué productos estarán disponibles para cada segmento de usuarios
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Settings size={20} />
          Configurar Rangos ARPU
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Segmentos</p>
              <p className="text-2xl font-bold text-gray-900">{segments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Productos Configurados</p>
              <p className="text-2xl font-bold text-gray-900">{productSegmentations.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Segments Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Segmentos Disponibles</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {segments.map(segment => (
            <div key={segment.id} className="p-4 border border-gray-200 rounded-lg">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${segment.color}`}>
                {segment.name}
              </span>
              <p className="text-xs text-gray-600 mt-2">{segment.description}</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500">
                  <span className="font-medium">ARPU:</span> {segment.arpuRange}
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Tipo:</span> {segment.marketType}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Productos</h2>
          <p className="text-sm text-gray-600 mb-4">
            Selecciona los segmentos objetivo para cada producto
          </p>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar Producto
              </label>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Proveedor
              </label>
              <select
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los Proveedores</option>
                {providers.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Tipo
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'VAS' | 'OTT')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los Tipos</option>
                <option value="OTT">OTT</option>
                <option value="VAS">VAS</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Mostrando {filteredProducts.length} de {products.length} productos
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredProducts.map(product => {
            const segmentation = getProductSegmentation(product.id);
            const isEditing = editingProduct === product.id;

            return (
              <div key={product.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.type === 'OTT' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.provider} • ${product.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <button
                        onClick={() => handleSave(product.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Save size={18} />
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingProduct(product.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Edit size={18} />
                        Editar
                      </button>
                    )}
                  </div>
                </div>

                {/* Segments Selection */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Segmentos Objetivo
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {segments.map(segment => {
                      const isSelected = segmentation.segments.includes(segment.id);
                      return (
                        <button
                          key={segment.id}
                          onClick={() => isEditing && handleSegmentToggle(product.id, segment.id)}
                          disabled={!isEditing}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            isSelected
                              ? `${segment.color} ring-2 ring-offset-2 ring-blue-500`
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          } ${!isEditing && 'cursor-default'}`}
                        >
                          {segment.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Summary */}
                {segmentation.segments.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Este producto será visible para:</span>{' '}
                      {segmentation.segments.map(sId => {
                        const seg = segments.find(s => s.id === sId);
                        return seg?.name;
                      }).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
