import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import ProvidersManagement from './components/providers/ProvidersManagement';
import ProductsOverview from './components/products/ProductsOverview';
import APIManager from './components/api/APIManager';
import LPBuilder from './components/lpbuilder/LPBuilder';
import Reconciliator from './components/reconciliator/Reconciliator';
import Engagement from './components/engagement/Engagement';
import Communication from './components/communication/Communication';
import UsersRoles from './components/users/UsersRoles';
import Packages from './components/packages/Packages';
import CMS from './components/cms/CMS';
import CustomerCare from './components/customercare/CustomerCare';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import FinancialReport from './components/reports/FinancialReport';
import UsersReport from './components/reports/UsersReport';
import SubscriptionsReport from './components/reports/SubscriptionsReport';
import BlocksReport from './components/reports/BlocksReport';
import ClaimsReport from './components/reports/ClaimsReport';
import FunnelReport from './components/reports/FunnelReport';

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/providers" element={<ProvidersManagement />} />
        <Route path="/products" element={<ProductsOverview />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/api-manager" element={<APIManager />} />
        <Route path="/lp-builder" element={<LPBuilder />} />
        <Route path="/reconciliator" element={<Reconciliator />} />
        <Route path="/engagement" element={<Engagement />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/cms" element={<CMS />} />
        <Route path="/customer-care" element={<CustomerCare />} />
        <Route path="/users-roles" element={<UsersRoles />} />
        <Route path="/reports/financial" element={<FinancialReport />} />
        <Route path="/reports/users" element={<UsersReport />} />
        <Route path="/reports/subscriptions" element={<SubscriptionsReport />} />
        <Route path="/reports/blocks" element={<BlocksReport />} />
        <Route path="/reports/claims" element={<ClaimsReport />} />
        <Route path="/reports/funnel" element={<FunnelReport />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <AppContent />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;