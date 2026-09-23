import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CaseProvider } from './context/CaseContext';

// Common Components
import { Sidebar } from './components/common/Sidebar';
import { Topbar } from './components/common/Topbar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CasesPage } from './pages/CasesPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { ReportCrimePage } from './pages/ReportCrimePage';
import { CyberMapPage } from './pages/CyberMapPage';
import { PredictionPage } from './pages/PredictionPage';
import { InsightsPage } from './pages/InsightsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { EvidencePage } from './pages/EvidencePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AuditLogPage } from './pages/AuditLogPage';
import { SettingsPage } from './pages/SettingsPage';

const AppShell = () => {
  const { isAuthenticated } = useAuth();

  const [activePage, setActivePage] = useState('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState('CT-2026-00124');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // If officer not authenticated, display high-security login gateway
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setActivePage('dashboard')} />;
  }

  // Navigation handlers
  const handleSelectCase = (caseId) => {
    setSelectedCaseId(caseId);
    setActivePage('case-detail');
  };

  const handleCaseSubmitted = (newCaseId) => {
    setSelectedCaseId(newCaseId);
    setActivePage('case-detail');
  };

  return (
    <div className="app-container">
      {/* Persistent Left Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onNavigateCaseDetail={handleSelectCase}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Topbar with live IST clock & search shortcut */}
        <Topbar
          activePage={activePage}
          setActivePage={setActivePage}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleSidebarMobile={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Page Switcher */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {activePage === 'dashboard' && (
            <DashboardPage
              onSelectCase={handleSelectCase}
              onNavigateReport={() => setActivePage('report')}
              onNavigateCases={() => setActivePage('cases')}
              onNavigatePrediction={() => setActivePage('prediction')}
              onNavigateInsights={() => setActivePage('insights')}
              onNavigateAnalytics={() => setActivePage('analytics')}
            />
          )}

          {activePage === 'report' && (
            <ReportCrimePage
              onCaseSubmitted={handleCaseSubmitted}
              onCancel={() => setActivePage('dashboard')}
            />
          )}

          {activePage === 'cases' && (
            <CasesPage
              onSelectCase={handleSelectCase}
              onNavigateReport={() => setActivePage('report')}
            />
          )}

          {activePage === 'case-detail' && (
            <CaseDetailPage
              caseId={selectedCaseId}
              onBack={() => setActivePage('cases')}
              onNavigateCase={handleSelectCase}
            />
          )}

          {activePage === 'map' && (
            <CyberMapPage
              onSelectCase={handleSelectCase}
            />
          )}

          {activePage === 'prediction' && (
            <PredictionPage
              onApplyToCase={handleSelectCase}
            />
          )}

          {activePage === 'insights' && (
            <InsightsPage
              onSelectCase={handleSelectCase}
            />
          )}

          {activePage === 'analytics' && (
            <AnalyticsPage />
          )}

          {activePage === 'evidence' && (
            <EvidencePage
              onSelectCase={handleSelectCase}
            />
          )}

          {activePage === 'notifications' && (
            <NotificationsPage
              onSelectCase={handleSelectCase}
            />
          )}

          {activePage === 'audit' && (
            <AuditLogPage />
          )}

          {activePage === 'settings' && (
            <SettingsPage />
          )}
        </main>
      </div>

      {/* Global Command Palette / Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCase={handleSelectCase}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CaseProvider>
          <AppShell />
        </CaseProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
