import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'dashboard': 'Dashboard',
    'products': 'Products',
    'packages': 'Packages',
    'providers': 'Providers',
    'users': 'Users & Roles',
    'reports': 'Reports',
    'api_manager': 'API Manager',
    'customer_care': 'Customer Care',
    'communication': 'Communication',
    'reconciliator': 'Reconciliator',
    'lp_builder': 'LP Builder',
    'cms': 'CMS',
    'logout': 'Logout',
    
    // Common
    'search': 'Search',
    'add': 'Add',
    'edit': 'Edit',
    'delete': 'Delete',
    'save': 'Save',
    'cancel': 'Cancel',
    'view': 'View',
    'status': 'Status',
    'active': 'Active',
    'inactive': 'Inactive',
    'pending': 'Pending',
    'name': 'Name',
    'description': 'Description',
    'actions': 'Actions',
    'created': 'Created',
    'updated': 'Updated',
    
    // Login
    'login_title': 'Sign in to your account',
    'email': 'Email',
    'password': 'Password',
    'sign_in': 'Sign in',
    'remember_me': 'Remember me',
    'forgot_password': 'Forgot your password?',
    
    // Dashboard
    'welcome_back': 'Welcome back',
    'overview': 'Overview',
    'recent_activity': 'Recent Activity',
    'quick_stats': 'Quick Stats',
    
    // Products
    'product_management': 'Product Management',
    'add_product': 'Add Product',
    'product_name': 'Product Name',
    'product_type': 'Product Type',
    'provider': 'Provider',
    'price': 'Price',
    
    // Packages
    'package_management': 'Package Management',
    'commercial_packages': 'Commercial Packages',
    'base_product': 'Base Product',
    'complementary_products': 'Complementary Products',
    'telco_services': 'Telco Services',
    
    // API Manager
    'api_management': 'API Management',
    'endpoints': 'Endpoints',
    'credentials': 'Credentials',
    'content_portals': 'Content Portals',
    
    // Reports
    'financial_reports': 'Financial Reports',
    'user_reports': 'User Reports',
    'subscription_reports': 'Subscription Reports',
    'billing_reports': 'Billing Reports',
    
    // Customer Care
    'customer_support': 'Customer Support',
    'user_search': 'User Search',
    'phone_number': 'Phone Number',
    'subscriptions': 'Subscriptions',
    
    // Error messages
    'error_occurred': 'An error occurred',
    'try_again': 'Please try again',
    'invalid_input': 'Invalid input',
    'required_field': 'This field is required'
  },
  es: {
    // Navigation
    'dashboard': 'Panel de Control',
    'products': 'Productos',
    'packages': 'Paquetes',
    'providers': 'Proveedores',
    'users': 'Usuarios y Roles',
    'reports': 'Reportes',
    'api_manager': 'Gestor API',
    'customer_care': 'Atención al Cliente',
    'communication': 'Comunicación',
    'reconciliator': 'Reconciliador',
    'lp_builder': 'Constructor LP',
    'cms': 'CMS',
    'logout': 'Cerrar Sesión',
    
    // Common
    'search': 'Buscar',
    'add': 'Agregar',
    'edit': 'Editar',
    'delete': 'Eliminar',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'view': 'Ver',
    'status': 'Estado',
    'active': 'Activo',
    'inactive': 'Inactivo',
    'pending': 'Pendiente',
    'name': 'Nombre',
    'description': 'Descripción',
    'actions': 'Acciones',
    'created': 'Creado',
    'updated': 'Actualizado',
    
    // Login
    'login_title': 'Iniciar sesión en tu cuenta',
    'email': 'Correo electrónico',
    'password': 'Contraseña',
    'sign_in': 'Iniciar sesión',
    'remember_me': 'Recordarme',
    'forgot_password': '¿Olvidaste tu contraseña?',
    
    // Dashboard
    'welcome_back': 'Bienvenido de nuevo',
    'overview': 'Resumen',
    'recent_activity': 'Actividad Reciente',
    'quick_stats': 'Estadísticas Rápidas',
    
    // Products
    'product_management': 'Gestión de Productos',
    'add_product': 'Agregar Producto',
    'product_name': 'Nombre del Producto',
    'product_type': 'Tipo de Producto',
    'provider': 'Proveedor',
    'price': 'Precio',
    
    // Packages
    'package_management': 'Gestión de Paquetes',
    'commercial_packages': 'Paquetes Comerciales',
    'base_product': 'Producto Base',
    'complementary_products': 'Productos Complementarios',
    'telco_services': 'Servicios Telco',
    
    // API Manager
    'api_management': 'Gestión de API',
    'endpoints': 'Endpoints',
    'credentials': 'Credenciales',
    'content_portals': 'Portales de Contenido',
    
    // Reports
    'financial_reports': 'Reportes Financieros',
    'user_reports': 'Reportes de Usuarios',
    'subscription_reports': 'Reportes de Suscripciones',
    'billing_reports': 'Reportes de Facturación',
    
    // Customer Care
    'customer_support': 'Atención al Cliente',
    'user_search': 'Búsqueda de Usuario',
    'phone_number': 'Número de Teléfono',
    'subscriptions': 'Suscripciones',
    
    // Error messages
    'error_occurred': 'Ocurrió un error',
    'try_again': 'Por favor intenta de nuevo',
    'invalid_input': 'Entrada inválida',
    'required_field': 'Este campo es requerido'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
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