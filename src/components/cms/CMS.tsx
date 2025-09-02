import React, { useState } from 'react';
import { Monitor, Menu, Image, Filter, Save, Eye, Upload, ArrowUp, ArrowDown, Plus, Trash2 } from 'lucide-react';

interface MenuOption {
  id: string;
  name: string;
  type: 'category' | 'section';
  enabled: boolean;
  order: number;
}

interface FeaturedImage {
  id: string;
  title: string;
  desktopImage: string;
  mobileImage: string;
  link: string;
  order: number;
}

interface FilterOption {
  id: string;
  name: string;
  enabled: boolean;
}

const productCategories = [
  'Juegos', 'Videos', 'Libros', 'Adulto', 'Música',
  'Noticias y Actualidad', 'TV & Streaming', 'Educación y Formación',
  'Aplicaciones y Herramientas', 'Arte y Creatividad'
];

const additionalSections = [
  'Packs', 'Promociones', 'Ofertas', 'Preguntas frecuentes', 'Contacto'
];

const mockMenuOptions: MenuOption[] = [
  ...productCategories.map((cat, index) => ({
    id: `cat-${index}`,
    name: cat,
    type: 'category' as const,
    enabled: index < 5, // First 5 enabled by default
    order: index
  })),
  ...additionalSections.map((section, index) => ({
    id: `sec-${index}`,
    name: section,
    type: 'section' as const,
    enabled: index < 3, // First 3 enabled by default
    order: productCategories.length + index
  }))
];

const mockFeaturedImages: FeaturedImage[] = [
  {
    id: '1',
    title: 'Gaming Collection',
    desktopImage: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    mobileImage: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    link: '/games',
    order: 1
  },
  {
    id: '2',
    title: 'Video Streaming',
    desktopImage: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    mobileImage: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    link: '/videos',
    order: 2
  },
  {
    id: '3',
    title: 'Music Library',
    desktopImage: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    mobileImage: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    link: '/music',
    order: 3
  }
];

const mockFilterOptions: FilterOption[] = [
  { id: '1', name: 'Categorías', enabled: true },
  { id: '2', name: 'Gama de precios', enabled: true },
  { id: '3', name: 'Popularidad / Calificaciones', enabled: false },
  { id: '4', name: 'Fecha de lanzamiento', enabled: false }
];

export default function CMS() {
  const [activeTab, setActiveTab] = useState<'menu' | 'featured' | 'filters'>('menu');
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(mockMenuOptions);
  const [featuredImages, setFeaturedImages] = useState<FeaturedImage[]>(mockFeaturedImages);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>(mockFilterOptions);
  const [previewMode, setPreviewMode] = useState(false);

  const handleMenuToggle = (id: string) => {
    setMenuOptions(options =>
      options.map(option =>
        option.id === id ? { ...option, enabled: !option.enabled } : option
      )
    );
  };

  const handleMenuReorder = (id: string, direction: 'up' | 'down') => {
    const currentIndex = menuOptions.findIndex(option => option.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === menuOptions.length - 1)
    ) {
      return;
    }

    const newOptions = [...menuOptions];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Swap orders
    const temp = newOptions[currentIndex].order;
    newOptions[currentIndex].order = newOptions[targetIndex].order;
    newOptions[targetIndex].order = temp;
    
    // Swap positions
    [newOptions[currentIndex], newOptions[targetIndex]] = [newOptions[targetIndex], newOptions[currentIndex]];
    
    setMenuOptions(newOptions);
  };

  const handleFilterToggle = (id: string) => {
    setFilterOptions(filters =>
      filters.map(filter =>
        filter.id === id ? { ...filter, enabled: !filter.enabled } : filter
      )
    );
  };

  const handleImageReorder = (id: string, direction: 'up' | 'down') => {
    const currentIndex = featuredImages.findIndex(img => img.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === featuredImages.length - 1)
    ) {
      return;
    }

    const newImages = [...featuredImages];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Swap orders
    const temp = newImages[currentIndex].order;
    newImages[currentIndex].order = newImages[targetIndex].order;
    newImages[targetIndex].order = temp;
    
    // Swap positions
    [newImages[currentIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[currentIndex]];
    
    setFeaturedImages(newImages);
  };

  const enabledMenuOptions = menuOptions.filter(option => option.enabled).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">CMS - Content Management System</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Monitor className="h-4 w-4" />
            <span>Portal: https://pre-mcsp.zed.com/home.html</span>
          </div>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              previewMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>{previewMode ? 'Exit Preview' : 'Preview Portal'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'menu', label: 'Portal Menu Management', icon: Menu },
              { id: 'featured', label: 'Featured Section', icon: Image },
              { id: 'filters', label: 'Advanced Filters', icon: Filter }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Portal Menu Management */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Portal Menu Configuration</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Available Options */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">Available Menu Options</h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {menuOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          option.enabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={option.enabled}
                            onChange={() => handleMenuToggle(option.id)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <span className={`font-medium ${option.enabled ? 'text-green-800' : 'text-gray-600'}`}>
                            {option.name}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            option.type === 'category' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {option.type === 'category' ? 'Category' : 'Section'}
                          </span>
                        </div>
                        
                        {option.enabled && (
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleMenuReorder(option.id, 'up')}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              disabled={menuOptions.findIndex(o => o.id === option.id) === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleMenuReorder(option.id, 'down')}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              disabled={menuOptions.findIndex(o => o.id === option.id) === menuOptions.length - 1}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">Menu Preview</h4>
                  <div className="bg-gray-900 text-white p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-bold text-lg">MSCP Portal</h5>
                      <div className="text-sm text-gray-300">Navigation Menu</div>
                    </div>
                    <nav className="space-y-2">
                      {enabledMenuOptions.map((option, index) => (
                        <div
                          key={option.id}
                          className="flex items-center justify-between p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                        >
                          <span className="text-sm">{option.name}</span>
                          <span className="text-xs text-gray-400">#{index + 1}</span>
                        </div>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Featured Section */}
          {activeTab === 'featured' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Featured Section Configuration</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Featured Item</span>
                </button>
              </div>

              <div className="space-y-4">
                {featuredImages.map((image, index) => (
                  <div key={image.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-medium text-gray-800">{image.title}</h4>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleImageReorder(image.id, 'up')}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleImageReorder(image.id, 'down')}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          disabled={index === featuredImages.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Desktop Image */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Desktop Image (1200x400px)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                          <img
                            src={image.desktopImage}
                            alt={`${image.title} - Desktop`}
                            className="w-full h-24 object-cover rounded mb-2"
                          />
                          <div className="flex items-center justify-center">
                            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
                              <Upload className="h-4 w-4" />
                              <span>Change Desktop Image</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Image */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Image (800x600px)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                          <img
                            src={image.mobileImage}
                            alt={`${image.title} - Mobile`}
                            className="w-full h-24 object-cover rounded mb-2"
                          />
                          <div className="flex items-center justify-center">
                            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
                              <Upload className="h-4 w-4" />
                              <span>Change Mobile Image</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Link URL
                      </label>
                      <input
                        type="text"
                        value={image.link}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter link URL"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Filters */}
          {activeTab === 'filters' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Advanced Filters Configuration</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Filter Settings</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Filter Options */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">Available Filter Options</h4>
                  <div className="space-y-3">
                    {filterOptions.map((filter) => (
                      <div
                        key={filter.id}
                        className={`flex items-center justify-between p-4 border rounded-lg ${
                          filter.enabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={filter.enabled}
                            onChange={() => handleFilterToggle(filter.id)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <span className={`font-medium ${filter.enabled ? 'text-green-800' : 'text-gray-600'}`}>
                            {filter.name}
                          </span>
                        </div>
                        <div className={`px-2 py-1 text-xs rounded-full ${
                          filter.enabled 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {filter.enabled ? 'Enabled' : 'Disabled'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filter Preview */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">Filter Panel Preview</h4>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">Filtros Avanzados</h5>
                    <div className="space-y-3">
                      {filterOptions.filter(f => f.enabled).map((filter) => (
                        <div key={filter.id} className="border-b border-gray-100 pb-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {filter.name}
                          </label>
                          {filter.name === 'Categorías' && (
                            <select className="w-full text-sm border border-gray-300 rounded px-2 py-1">
                              <option>Todas las categorías</option>
                              <option>Juegos</option>
                              <option>Videos</option>
                              <option>Música</option>
                            </select>
                          )}
                          {filter.name === 'Gama de precios' && (
                            <div className="flex space-x-2">
                              <input type="number" placeholder="Min" className="w-1/2 text-sm border border-gray-300 rounded px-2 py-1" />
                              <input type="number" placeholder="Max" className="w-1/2 text-sm border border-gray-300 rounded px-2 py-1" />
                            </div>
                          )}
                          {filter.name === 'Popularidad / Calificaciones' && (
                            <select className="w-full text-sm border border-gray-300 rounded px-2 py-1">
                              <option>Todas las calificaciones</option>
                              <option>5 estrellas</option>
                              <option>4+ estrellas</option>
                              <option>3+ estrellas</option>
                            </select>
                          )}
                          {filter.name === 'Fecha de lanzamiento' && (
                            <select className="w-full text-sm border border-gray-300 rounded px-2 py-1">
                              <option>Cualquier fecha</option>
                              <option>Último mes</option>
                              <option>Últimos 3 meses</option>
                              <option>Último año</option>
                            </select>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}