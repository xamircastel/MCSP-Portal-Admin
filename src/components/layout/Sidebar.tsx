import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Settings, Code, FileText, Calculator, MessageSquare, Shield, Box, Monitor, Headphones, BarChart3, ChevronDown, ChevronRight, DollarSign, UserPlus, Ban, AlertTriangle, Fuel as Funnel } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const navigation = [
  { name: 'nav.dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'nav.providers', href: '/providers', icon: Users },
  { name: 'nav.products', href: '/products', icon: Package },
  { name: 'nav.packages', href: '/packages', icon: Box },
  { name: 'nav.api', href: '/api-manager', icon: Code },
  { name: 'nav.lpbuilder', href: '/lp-builder', icon: FileText },
  { name: 'nav.reconciliator', href: '/reconciliator', icon: Calculator },
  { name: 'nav.cms', href: '/cms', icon: Monitor },
  { name: 'nav.tickets', href: '/communication', icon: MessageSquare },
  { name: 'nav.customercare', href: '/customer-care', icon: Headphones },
  { name: 'nav.users', href: '/users-roles', icon: Shield },
];

const reportsNavigation = [
  { name: 'nav.reports.financial', href: '/reports/financial', icon: DollarSign },
  { name: 'nav.reports.users', href: '/reports/users', icon: UserPlus },
  { name: 'nav.reports.subscriptions', href: '/reports/subscriptions', icon: Users },
  { name: 'nav.reports.blocks', href: '/reports/blocks', icon: Ban },
  { name: 'nav.reports.claims', href: '/reports/claims', icon: AlertTriangle },
  { name: 'nav.reports.funnel', href: '/reports/funnel', icon: Funnel },
];

export default function Sidebar() {
  const { t } = useLanguage();
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <img src="/Logo.svg" alt="MSCP Admin" className="h-10 w-auto" />
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
                {t(item.name)}
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
                {t('nav.reports')}
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
                      {t(item.name)}
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