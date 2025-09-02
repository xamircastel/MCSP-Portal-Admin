import React, { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, Shield, Key } from 'lucide-react';
import UserModal from './UserModal';
import ChangeHistory from './ChangeHistory';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  status: 'Active' | 'Inactive';
  lastLogin: string;
  createdAt: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@mscp.com',
    role: 'Administrator',
    permissions: ['all'],
    status: 'Active',
    lastLogin: '2024-03-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    username: 'manager1',
    email: 'manager@mscp.com',
    role: 'Manager',
    permissions: ['providers.read', 'providers.write', 'products.read', 'reports.read'],
    status: 'Active',
    lastLogin: '2024-03-14T16:45:00Z',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    username: 'operator1',
    email: 'operator@mscp.com',
    role: 'Operator',
    permissions: ['providers.read', 'products.read', 'tickets.read', 'tickets.write'],
    status: 'Active',
    lastLogin: '2024-03-13T09:20:00Z',
    createdAt: '2024-02-01T00:00:00Z'
  }
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: ['all'],
    userCount: 1
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Manage providers, products, and view reports',
    permissions: ['providers.read', 'providers.write', 'products.read', 'products.write', 'reports.read'],
    userCount: 1
  },
  {
    id: '3',
    name: 'Operator',
    description: 'View providers and products, manage support tickets',
    permissions: ['providers.read', 'products.read', 'tickets.read', 'tickets.write'],
    userCount: 1
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access to providers and products',
    permissions: ['providers.read', 'products.read'],
    userCount: 0
  }
];

export default function UsersRoles() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'history'>('users');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles] = useState<Role[]>(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSaveUser = (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      role: userData.role,
      permissions: [],
      status: 'Active',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    setIsUserModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Users & Roles Management</h1>
        <button 
          onClick={() => setIsUserModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>{activeTab === 'users' ? 'Add User' : 'Add Role'}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'Active').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Roles</p>
              <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Shield className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Permissions</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <Key className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'users', label: 'Users', icon: Users },
              { id: 'roles', label: 'Roles', icon: Shield },
              { id: 'history', label: 'Historial de cambios', icon: Key }
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
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
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
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-gray-400 hover:text-blue-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="grid gap-6">
              {filteredRoles.map((role) => (
                <div key={role.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{role.name}</h4>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{role.userCount} users</span>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Permissions:</h5>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-green-100 text-green-800"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <ChangeHistory />
          )}
        </div>
      </div>

      {isUserModalOpen && (
        <UserModal
          onClose={() => setIsUserModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}