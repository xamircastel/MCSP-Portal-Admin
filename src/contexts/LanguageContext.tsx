import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.providers': 'Providers',
    'nav.products': 'Products',
    'nav.packages': 'Packages',
    'nav.api': 'API Manager',
    'nav.lpbuilder': 'LP Builder',
    'nav.reconciliator': 'Reconciliator',
    'nav.tickets': 'Tickets',
    'nav.cms': 'CMS',
    'nav.customercare': 'Customer Care',
    'nav.users': 'Users & Roles',
    'nav.reports': 'Reports',
    'nav.reports.financial': 'Charges Report',
    'nav.reports.users': 'User Base',
    'nav.reports.subscriptions': 'Subscriptions & Cancellations',
    'nav.reports.blocks': 'Blocks & Unblocks',
    'nav.reports.claims': 'Claims',
    'nav.reports.funnel': 'Contracting Funnel',
    'dashboard.title': 'Dashboard Overview',
    'dashboard.providers': 'Total Providers',
    'dashboard.products': 'Total Products',
    'dashboard.revenue': 'Monthly Revenue',
    'dashboard.tickets': 'Open Tickets',
    'login.title': 'MSCP Admin Portal',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.button': 'Sign In',
    'login.error': 'Invalid credentials',
  },
  es: {
    'nav.dashboard': 'Panel Principal',
    'nav.providers': 'Proveedores',
    'nav.products': 'Productos',
    'nav.packages': 'Paquetes',
    'nav.api': 'Gestor API',
    'nav.lpbuilder': 'Constructor LP',
    'nav.reconciliator': 'Reconciliador',
    'nav.tickets': 'Tickets',
    'nav.cms': 'CMS',
    'nav.customercare': 'Atención al Cliente',
    'nav.users': 'Usuarios y Roles',
    'nav.reports': 'Reportes',
    'nav.reports.financial': 'Reporte de Cobros',
    'nav.reports.users': 'Bases de Usuarios',
    'nav.reports.subscriptions': 'Suscripciones y Cancelaciones',
    'nav.reports.blocks': 'Bloqueos y Desbloqueos',
    'nav.reports.claims': 'Reclamaciones',
    'nav.reports.funnel': 'Funnel de Contratación',
    'dashboard.title': 'Resumen del Panel',
    'dashboard.providers': 'Total Proveedores',
    'dashboard.products': 'Total Productos',
    'dashboard.revenue': 'Ingresos Mensuales',
    'dashboard.tickets': 'Tickets Abiertos',
    'login.title': 'Portal MSCP Admin',
    'login.username': 'Usuario',
    'login.password': 'Contraseña',
    'login.button': 'Iniciar Sesión',
    'login.error': 'Credenciales inválidas',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}