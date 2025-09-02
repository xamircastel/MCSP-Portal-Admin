import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Settings, Code, FileText, Calculator, MessageSquare, Shield, Box, Monitor, Headphones, BarChart3, ChevronDown, ChevronRight, DollarSign, UserPlus, Ban, AlertTriangle, Fuel as Funnel } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Providers', href: '/providers', icon: Users },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Packages', href: '/packages', icon: Box },
  { name: 'API Manager', href: '/api-manager', icon: Code },
  { name: 'LP Builder', href: '/lp-builder', icon: FileText },
  { name: 'Reconciliator', href: '/reconciliator', icon: Calculator },
  { name: 'CMS', href: '/cms', icon: Monitor },
  { name: 'Tickets', href: '/communication', icon: MessageSquare },
  { name: 'Customer Care', href: '/customer-care', icon: Headphones },
  { name: 'Users & Roles', href: '/users-roles', icon: Shield },
];

const reportsNavigation = [
  { name: 'Financials Report', href: '/reports/financial', icon: DollarSign },
  { name: 'User Base', href: '/reports/users', icon: UserPlus },
  { name: 'Subscriptions & Cancellations', href: '/reports/subscriptions', icon: Users },
  { name: 'Blocks & Unblocks', href: '/reports/blocks', icon: Ban },
  { name: 'Claims', href: '/reports/claims', icon: AlertTriangle },
  { name: 'Contracting Funnel', href: '/reports/funnel', icon: Funnel },
];

export default function Sidebar() {
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <img 
          src="/LogoA1 copy copy.png" 
          alt="MSCP Admin" 
          className="w-10 h-10 object-contain"
        />
      </div>
      
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            </li>
          ))}
          
          {/* Reports Section with Dropdown */}
          <li>
            <button
              onClick={() => setIsReportsOpen(!isReportsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <div className="flex items-center">
                <BarChart3 className="mr-3 h-5 w-5" />
                Reports
              </div>
              {isReportsOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {/* Reports Submenu */}
            {isReportsOpen && (
              <ul className="mt-2 ml-4 space-y-1">
                {reportsNavigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-green-50 text-green-700 border-l-2 border-green-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}