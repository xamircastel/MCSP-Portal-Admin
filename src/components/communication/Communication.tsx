import React, { useState } from 'react';
import { MessageSquare, Search, Filter, Clock, User, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  provider: string;
  product: string;
  status: 'Open' | 'In Process' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'API Integration Issue',
    description: 'Unable to receive subscription notifications from the API endpoint',
    provider: 'Newry',
    product: 'Premium Streaming',
    status: 'Open',
    priority: 'High',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
    createdBy: 'john.doe@streammax.com'
  },
  {
    id: '2',
    title: 'Revenue Share Discrepancy',
    description: 'The revenue share calculation seems incorrect for last month',
    provider: 'Proveedor 1',
    product: 'Timwe Pro',
    status: 'In Process',
    priority: 'Medium',
    createdAt: '2024-03-14T14:20:00Z',
    updatedAt: '2024-03-15T09:15:00Z',
    createdBy: 'support@gamingplus.com'
  },
  {
    id: '3',
    title: 'Landing Page Not Loading',
    description: 'The mobile landing page is showing a 404 error',
    provider: 'Proveedor 2',
    product: 'Music Unlimited',
    status: 'Closed',
    priority: 'Low',
    createdAt: '2024-03-13T16:45:00Z',
    updatedAt: '2024-03-14T11:30:00Z',
    createdBy: 'tech@musicstream.com'
  }
];

export default function Communication() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Open' | 'In Process' | 'Closed'>('all');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateTicketStatus = (ticketId: string, newStatus: 'Open' | 'In Process' | 'Closed') => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() }
        : ticket
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus, updatedAt: new Date().toISOString() });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="h-4 w-4" />;
      case 'In Process': return <Clock className="h-4 w-4" />;
      case 'Closed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Process': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <MessageSquare className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900">
                {tickets.filter(t => t.status === 'Open').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <AlertCircle className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Process</p>
              <p className="text-2xl font-bold text-gray-900">
                {tickets.filter(t => t.status === 'In Process').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Closed Tickets</p>
              <p className="text-2xl font-bold text-gray-900">
                {tickets.filter(t => t.status === 'Closed').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Open">Open</option>
                  <option value="In Process">In Process</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-6 cursor-pointer hover:bg-gray-50 ${
                    selectedTicket?.id === ticket.id ? 'bg-green-50 border-l-4 border-green-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-medium text-gray-900">{ticket.title}</h4>
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1">{ticket.status}</span>
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{ticket.provider}</span>
                        <span>•</span>
                        <span>{ticket.product}</span>
                        <span>•</span>
                        <span>{formatDate(ticket.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Ticket Details</h3>
          </div>

          <div className="p-6">
            {selectedTicket ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedTicket.title}</h4>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                      {getStatusIcon(selectedTicket.status)}
                      <span className="ml-1">{selectedTicket.status}</span>
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                  </div>
                  <p className="text-gray-600">{selectedTicket.description}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Provider:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedTicket.provider}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Product:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedTicket.product}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Created by:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedTicket.createdBy}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Created:</span>
                    <span className="ml-2 text-sm text-gray-900">{formatDate(selectedTicket.createdAt)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Last updated:</span>
                    <span className="ml-2 text-sm text-gray-900">{formatDate(selectedTicket.updatedAt)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Update Status</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Open', 'In Process', 'Closed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateTicketStatus(selectedTicket.id, status as any)}
                        className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors ${
                          selectedTicket.status === status
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Comment</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Add a comment..."
                  />
                  <button className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Add Comment
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a ticket to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}