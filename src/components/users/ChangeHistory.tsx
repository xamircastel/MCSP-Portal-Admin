import React, { useState } from 'react';
import { Calendar, User, Clock, Filter, Search, Eye, Package, Users, Code, FileText, MessageSquare } from 'lucide-react';

interface ChangeRecord {
  id: string;
  actionType: 'create' | 'update' | 'delete';
  entityType: 'provider' | 'product' | 'package' | 'user' | 'api-endpoint' | 'landing-page' | 'ticket';
  entityName: string;
  description: string;
  userId: string;
  userName: string;
  userEmail: string;
  timestamp: string;
  details?: string;
}

const mockChangeHistory: ChangeRecord[] = [
  {
    id: '1',
    actionType: 'create',
    entityType: 'provider',
    entityName: 'Digital Virgo',
    description: 'Created new provider with API configuration',
    userId: '1',
    userName: 'admin',
    userEmail: 'admin@mscp.com',
    timestamp: '2024-03-15T10:30:00Z',
    details: 'Provider created with subscription and charge endpoints configured'
  },
  {
    id: '2',
    actionType: 'update',
    entityType: 'product',
    entityName: 'Premium Streaming',
    description: 'Updated product pricing configuration',
    userId: '2',
    userName: 'manager1',
    userEmail: 'manager@mscp.com',
    timestamp: '2024-03-15T14:22:00Z',
    details: 'Changed prepaid price from $8.99 to $9.99',
    createdBy: 'support@timwe.com'
  },
  {
    id: '3',
    actionType: 'create',
    entityType: 'package',
    entityName: 'Digital Virgo Premium Bundle',
    description: 'Created new package combining streaming service with telco services',
    userId: '1',
    userName: 'admin',
    userEmail: 'admin@mscp.com',
    timestamp: '2024-03-14T16:45:00Z',
    details: 'Package includes Premium Streaming + 10GB data + 500 minutes + 100 SMS'
  },
  {
    id: '4',
    actionType: 'delete',
    entityType: 'api-endpoint',
    entityName: 'Legacy SMS Endpoint',
    description: 'Removed deprecated API endpoint',
    userId: '3',
    userName: 'operator1',
    userEmail: 'operator@mscp.com',
    timestamp: '2024-03-14T09:15:00Z',
    details: 'Endpoint was no longer in use and posed security risk'
  },
  {
    id: '5',
    actionType: 'create',
    entityType: 'user',
    entityName: 'support@newprovider.com',
    description: 'Created new user account',
    userId: '1',
    userName: 'admin',
    userEmail: 'admin@mscp.com',
    timestamp: '2024-03-13T11:30:00Z',
    details: 'User assigned Operator role with limited permissions'
  },
  {
    id: '6',
    actionType: 'update',
    entityType: 'landing-page',
    entityName: 'Timwe Pro LP',
    description: 'Updated landing page legal texts',
    userId: '2',
    userName: 'manager1',
    userEmail: 'manager@mscp.com',
    timestamp: '2024-03-13T08:20:00Z',
    details: 'Updated terms and conditions URL and legal text 2'
  },
  {
    id: '7',
    actionType: 'update',
    entityType: 'ticket',
    entityName: 'API Integration Issue #1234',
    description: 'Updated ticket status to closed',
    userId: '3',
    userName: 'operator1',
    userEmail: 'operator@mscp.com',
    timestamp: '2024-03-12T15:45:00Z',
    details: 'Issue resolved after API endpoint configuration update'
  },
  {
    id: '8',
    actionType: 'create',
    entityType: 'product',
    entityName: 'Music Unlimited Pro',
    description: 'Created new music streaming product',
    userId: '1',
    userName: 'admin',
    userEmail: 'admin@mscp.com',
    timestamp: '2024-03-12T13:10:00Z',
    details: 'Product configured with subscription model and SMS activation'
  }
];

export default function ChangeHistory() {
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEntityType, setFilterEntityType] = useState<string>('all');
  const [filterActionType, setFilterActionType] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<ChangeRecord | null>(null);

  // Filter records by selected month
  const filteredByMonth = mockChangeHistory.filter(record => {
    const recordMonth = record.timestamp.substring(0, 7); // YYYY-MM format
    return recordMonth === selectedMonth;
  });

  // Apply additional filters
  const filteredRecords = filteredByMonth.filter(record => {
    const matchesSearch = 
      record.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEntityType = filterEntityType === 'all' || record.entityType === filterEntityType;
    const matchesActionType = filterActionType === 'all' || record.actionType === filterActionType;
    
    return matchesSearch && matchesEntityType && matchesActionType;
  });

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'create': return 'bg-green-100 text-green-800';
      case 'update': return 'bg-blue-100 text-blue-800';
      case 'delete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionText = (actionType: string) => {
    switch (actionType) {
      case 'create': return 'Creado';
      case 'update': return 'Modificado';
      case 'delete': return 'Eliminado';
      default: return actionType;
    }
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'provider': return <Users className="h-4 w-4" />;
      case 'product': return <Package className="h-4 w-4" />;
      case 'package': return <Package className="h-4 w-4" />;
      case 'user': return <User className="h-4 w-4" />;
      case 'api-endpoint': return <Code className="h-4 w-4" />;
      case 'landing-page': return <FileText className="h-4 w-4" />;
      case 'ticket': return <MessageSquare className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getEntityTypeText = (entityType: string) => {
    switch (entityType) {
      case 'provider': return 'Provider';
      case 'product': return 'Product';
      case 'package': return 'Package';
      case 'user': return 'User';
      case 'api-endpoint': return 'API Endpoint';
      case 'landing-page': return 'Landing Page';
      case 'ticket': return 'Ticket';
      default: return entityType;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const value = date.toISOString().substring(0, 7);
      const label = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
      options.push({ value, label });
    }
    
    return options;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Historial de Cambios</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{filteredRecords.length} registros encontrados</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Month Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-1" />
              Mes de consulta
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {generateMonthOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="h-4 w-4 inline mr-1" />
              Buscar
            </label>
            <input
              type="text"
              placeholder="Buscar por entidad, descripción o usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Entity Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="h-4 w-4 inline mr-1" />
              Tipo de entidad
            </label>
            <select
              value={filterEntityType}
              onChange={(e) => setFilterEntityType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Todos</option>
              <option value="provider">Proveedores</option>
              <option value="product">Productos</option>
              <option value="package">Paquetes</option>
              <option value="user">Usuarios</option>
              <option value="api-endpoint">API Endpoints</option>
              <option value="landing-page">Landing Pages</option>
              <option value="ticket">Tickets</option>
            </select>
          </div>

          {/* Action Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de acción
            </label>
            <select
              value={filterActionType}
              onChange={(e) => setFilterActionType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Todas</option>
              <option value="create">Creación</option>
              <option value="update">Modificación</option>
              <option value="delete">Eliminación</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Registros de {generateMonthOptions().find(opt => opt.value === selectedMonth)?.label}
          </h3>
        </div>

        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div
                key={record.id}
                className="p-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedRecord(record)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getEntityIcon(record.entityType)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(record.actionType)}`}>
                          {getActionText(record.actionType)}
                        </span>
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-800">
                          {getEntityTypeText(record.entityType)}
                        </span>
                      </div>
                      
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {record.entityName}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {record.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {record.userName}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(record.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Eye className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron registros
              </h3>
              <p className="text-gray-500">
                No hay cambios registrados para el período seleccionado con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Detalle del Cambio
              </h2>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Eye className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Action and Entity Info */}
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  {getEntityIcon(selectedRecord.entityType)}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(selectedRecord.actionType)}`}>
                      {getActionText(selectedRecord.actionType)}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-800">
                      {getEntityTypeText(selectedRecord.entityType)}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedRecord.entityName}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Descripción</h4>
                <p className="text-gray-900">{selectedRecord.description}</p>
              </div>

              {/* Details */}
              {selectedRecord.details && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Detalles adicionales</h4>
                  <p className="text-gray-600">{selectedRecord.details}</p>
                </div>
              )}

              {/* User and Timestamp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Usuario responsable</h4>
                  <div className="space-y-1">
                    <p className="text-gray-900 font-medium">{selectedRecord.userName}</p>
                    <p className="text-sm text-gray-600">{selectedRecord.userEmail}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Fecha y hora</h4>
                  <p className="text-gray-900">{formatDate(selectedRecord.timestamp)}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}