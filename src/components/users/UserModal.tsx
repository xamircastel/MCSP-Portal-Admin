import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
}

interface UserModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access with all permissions'
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Manage providers, products, and view reports'
  },
  {
    id: '3',
    name: 'Operator',
    description: 'View providers and products, manage support tickets'
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access to providers and products'
  }
];

export default function UserModal({ onClose, onSave }: UserModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    company: '',
    role: ''
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setShowNotification(true);
    
    // Auto-close notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New User
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {showNotification && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 m-6">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  User Created Successfully
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Access credentials will be sent to the email address provided.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* User Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Name *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="user@company.com"
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Company name"
              required
            />
          </div>

          {/* Assigned Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned Role *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select a role</option>
              {mockRoles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            {formData.role && (
              <p className="mt-2 text-sm text-gray-600">
                {mockRoles.find(r => r.name === formData.role)?.description}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={showNotification}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              disabled={showNotification}
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}