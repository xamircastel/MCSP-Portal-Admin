import React, { useState, useEffect } from 'react';
import { X, Search, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

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
}

interface PackageModalProps {
  package: PackageItem | null;
  products: Product[];
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function PackageModal({ package: pkg, products, onClose, onSave }: PackageModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    baseProductId: '',
    complementaryProductIds: [] as string[],
    includeTelcoServices: false,
    telcoServices: {
      data: '',
      voice: '',
      sms: ''
    },
    price: '',
    description: ''
  });

  const [productSearch, setProductSearch] = useState('');
  const [showTicketPreview, setShowTicketPreview] = useState(false);

  useEffect(() => {
    if (pkg) {
      setFormData({
        name: pkg.name,
        baseProductId: pkg.baseProduct.id,
        complementaryProductIds: pkg.complementaryProducts.map(p => p.id),
        includeTelcoServices: !!pkg.telcoServices,
        telcoServices: pkg.telcoServices || {
          data: '',
          voice: '',
          sms: ''
        },
        price: pkg.price.toString(),
        description: ''
      });
    }
  }, [pkg]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baseProduct = products.find(p => p.id === formData.baseProductId);
    const complementaryProducts = products.filter(p => 
      formData.complementaryProductIds.includes(p.id)
    );

    const packageData = {
      name: formData.name,
      baseProduct,
      complementaryProducts,
      telcoServices: formData.includeTelcoServices ? formData.telcoServices : undefined,
      price: formData.price,
      description: formData.description
    };

    onSave(packageData);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearch.toLowerCase()) &&
    product.status === 'Active' &&
    product.id !== formData.baseProductId &&
    !formData.complementaryProductIds.includes(product.id)
  );

  const baseProductOptions = products.filter(product =>
    product.status === 'Active' && 
    (product.type === 'VAS' || product.type === 'OTT')
  );

  const selectedBaseProduct = products.find(p => p.id === formData.baseProductId);
  const selectedComplementaryProducts = products.filter(p => 
    formData.complementaryProductIds.includes(p.id)
  );

  const addComplementaryProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      complementaryProductIds: [...prev.complementaryProductIds, productId]
    }));
  };

  const removeComplementaryProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      complementaryProductIds: prev.complementaryProductIds.filter(id => id !== productId)
    }));
  };

  const getProductTypeColor = (type: string) => {
    switch (type) {
      case 'OTT': return 'bg-blue-100 text-blue-800';
      case 'VAS': return 'bg-purple-100 text-purple-800';
      case 'Telco': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateTicketContent = () => {
    const baseProduct = products.find(p => p.id === formData.baseProductId);
    const complementaryProducts = products.filter(p => 
      formData.complementaryProductIds.includes(p.id)
    );

    return `
SOLICITUD DE CREACIÓN DE PAQUETE COMERCIAL

Nombre del Paquete: ${formData.name}
Precio: $${formData.price}

PRODUCTO BASE:
- Nombre: ${baseProduct?.name}
- Proveedor: ${baseProduct?.provider}
- Tipo: ${baseProduct?.type}
- Lógica: Este producto define los flujos de negocio del paquete

PRODUCTOS COMPLEMENTARIOS (${complementaryProducts.length}):
${complementaryProducts.map((p, i) => `${i + 1}. ${p.name} (${p.provider}) - ${p.type}`).join('\n')}

${formData.includeTelcoServices ? `
SERVICIOS DE TELECOMUNICACIONES:
- Datos Móviles: ${formData.telcoServices.data}
- Minutos de Voz: ${formData.telcoServices.voice}
- SMS: ${formData.telcoServices.sms}

NOTA: Los servicios de telecomunicaciones requieren validación de acuerdos técnicos y comerciales con la MNO.
` : ''}

DESCRIPCIÓN ADICIONAL:
${formData.description || 'Sin descripción adicional'}

---
Este ticket requiere configuración manual por parte del equipo de soporte central.
Fecha de solicitud: ${new Date().toLocaleString()}
    `.trim();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {pkg ? 'Edit Package' : 'Create New Commercial Package'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Information Banner */}
        <div className="p-6 bg-blue-50 border-b border-blue-200">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                Package Creation Process
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                When submitting this form, a support ticket will be generated for the central team. 
                The package will not be created automatically, but will require manual configuration 
                according to established commercial agreements.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Package Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g.: Entertainment Bundle Pro"
              required
            />
          </div>

          {/* Base Product Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Product * 
              <span className="text-xs text-gray-500 ml-1">(Defines business flow logic)</span>
            </label>
            <select
              value={formData.baseProductId}
              onChange={(e) => setFormData(prev => ({ ...prev, baseProductId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select base product</option>
              {baseProductOptions.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.provider} ({product.type})
                </option>
              ))}
            </select>
            
            {selectedBaseProduct && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Selected Base Product:</p>
                    <p className="text-sm text-green-700">{selectedBaseProduct.name} - {selectedBaseProduct.provider}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProductTypeColor(selectedBaseProduct.type)}`}>
                    {selectedBaseProduct.type}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Complementary Products */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complementary Products
              <span className="text-xs text-gray-500 ml-1">(Optional - Added to package)</span>
            </label>
            
            {/* Selected Complementary Products */}
            {selectedComplementaryProducts.length > 0 && (
              <div className="mb-4 space-y-2">
                <p className="text-sm font-medium text-gray-600">Selected products:</p>
                {selectedComplementaryProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.provider}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProductTypeColor(product.type)}`}>
                        {product.type}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeComplementaryProduct(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Complementary Products */}
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products to add..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="max-h-40 overflow-y-auto space-y-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => addComplementaryProduct(product.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.provider}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProductTypeColor(product.type)}`}>
                          {product.type}
                        </span>
                      </div>
                      <Plus className="h-4 w-4 text-green-600" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    {productSearch ? 'No products found' : 'Search products to add to package'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Telco Services */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="includeTelco"
                checked={formData.includeTelcoServices}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  includeTelcoServices: e.target.checked,
                  telcoServices: e.target.checked ? prev.telcoServices : { data: '', voice: '', sms: '' }
                }))}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="includeTelco" className="text-sm font-medium text-gray-700">
                Include Telecommunications Services
              </label>
            </div>

            {formData.includeTelcoServices && (
              <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <p className="text-sm font-medium text-orange-800">
                      Services subject to MNO agreements
                    </p>
                  </div>
                  <p className="text-xs text-orange-700">
                    The inclusion of telecommunications services requires validation of technical and commercial agreements with the Mobile Operator.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Data
                    </label>
                    <input
                      type="text"
                      value={formData.telcoServices.data}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        telcoServices: { ...prev.telcoServices, data: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g.: 10 GB"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voice Minutes
                    </label>
                    <input
                      type="text"
                      value={formData.telcoServices.voice}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        telcoServices: { ...prev.telcoServices, voice: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g.: 500 minutes"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMS
                    </label>
                    <input
                      type="text"
                      value={formData.telcoServices.sms}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        telcoServices: { ...prev.telcoServices, sms: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g.: 100 SMS"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Package Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="29.99"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Additional information for support team..."
            />
          </div>

          {/* Ticket Preview */}
          {formData.name && formData.baseProductId && (
            <div className="border border-gray-200 rounded-lg p-4">
              <button
                type="button"
                onClick={() => setShowTicketPreview(!showTicketPreview)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Support ticket preview</span>
                <span className="text-xs text-gray-500">
                  {showTicketPreview ? '(Hide)' : '(Show)'}
                </span>
              </button>
              
              {showTicketPreview && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                    {generateTicketContent()}
                  </pre>
                </div>
              )}
            </div>
          )}

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
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>{pkg ? 'Update Package' : 'Create Support Ticket'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}