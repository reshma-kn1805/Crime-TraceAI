import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Clock, 
  ShieldCheck, 
  PlusCircle, 
  Radio, 
  Menu, 
  Moon, 
  Sun,
  AlertTriangle,
  CheckCheck
} from 'lucide-react';
import { formatIST } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { useCases } from '../../context/CaseContext';

export const Topbar = ({
  activePage,
  setActivePage,
  onOpenSearch,
  onToggleSidebarMobile
}) => {
  const { currentUser } = useAuth();
  const { notifications, unreadNotificationsCount, markNotificationRead, markAllNotificationsRead } = useCases();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Live IST Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const getPageTitle = (page) => {
    switch (page) {
      case 'dashboard': return 'Cybercrime Intelligence Dashboard';
      case 'report': return 'Report Cybercrime Incident';
      case 'cases': return 'Investigation Cases Directory';
      case 'case-detail': return 'Case Investigation Workspace';
      case 'map': return 'Geographic Cybercrime Map';
      case 'prediction': return 'AI Cybercrime Prediction & Risk Intelligence';
      case 'insights': return 'AI Syndicate Pattern Intelligence';
      case 'analytics': return 'Analytics & Statutory Reports';
      case 'evidence': return 'Digital Evidence Management Vault';
      case 'notifications': return 'Incident Notifications Center';
      case 'audit': return 'Security & Chain of Custody Audit Log';
      case 'settings': return 'Investigator Profile & Security Settings';
      default: return 'CrimeTraceAI Platform';
    }
  };

  return (
    <header
      className="topbar"
      style={{
        height: '64px',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}
    >
      {/* Left: Mobile trigger & Breadcrumb Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebarMobile}
          className="btn-icon btn-sm md:hidden"
          style={{ display: 'none' }}
          aria-label="Toggle Mobile Menu"
        >
          <Menu size={18} />
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            <span>CrimeTraceAI</span>
            <span>/</span>
            <span style={{ color: 'var(--accent-cyan)', textTransform: 'capitalize' }}>{activePage}</span>
          </div>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {getPageTitle(activePage)}
          </h2>
        </div>
      </div>

      {/* Center: Live National Threat Status & IST Clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* National Advisory Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            fontSize: '0.74rem',
            color: '#FCD34D'
          }}
          className="hidden-mobile"
        >
          <Radio size={12} className="animate-pulse" style={{ color: '#F59E0B' }} />
          <span>I4C Threat Level: <strong style={{ color: '#FFFFFF' }}>ELEVATED (UPI/APK)</strong></span>
        </div>

        {/* Live IST Clock */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)'
          }}
          className="hidden-mobile"
        >
          <Clock size={14} style={{ color: 'var(--accent-cyan)' }} />
          <span>{formatIST(currentTime, true)}</span>
        </div>
      </div>

      {/* Right Controls: Search, New Case, Alerts, Theme, Officer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="btn btn-outline btn-sm"
          style={{
            gap: '10px',
            padding: '6px 12px',
            fontSize: '0.78rem',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <Search size={14} />
          <span className="hidden-mobile">Search cases, IPs...</span>
          <kbd
            style={{
              background: 'var(--bg-tertiary)',
              padding: '1px 5px',
              borderRadius: '3px',
              fontSize: '0.68rem',
              color: 'var(--text-muted)'
            }}
          >
            Ctrl+K
          </kbd>
        </button>

        {/* Quick Report Button */}
        <button
          onClick={() => setActivePage('report')}
          className="btn btn-primary btn-sm"
        >
          <PlusCircle size={15} />
          <span className="hidden-mobile">Report Incident</span>
        </button>

        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="btn-icon"
            style={{ position: 'relative' }}
            aria-label="Open notifications"
          >
            <Bell size={18} />
            {unreadNotificationsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  backgroundColor: 'var(--status-critical)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}
              >
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: 0,
                width: '360px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1000,
                overflow: 'hidden',
                animation: 'scaleIn 0.15s ease-out'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border-subtle)',
                  background: 'var(--bg-primary)'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                  Law Enforcement Alerts ({unreadNotificationsCount})
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <CheckCheck size={12} /> Mark read
                </button>
              </div>

              <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                {notifications.slice(0, 5).map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.caseId) {
                        // could navigate to case
                      }
                    }}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                      backgroundColor: n.read ? 'transparent' : 'rgba(0, 180, 216, 0.05)',
                      cursor: 'pointer',
                      transition: 'background 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span className={`badge ${n.type === 'critical' ? 'badge-critical' : 'badge-cyan'}`} style={{ fontSize: '0.65rem' }}>
                        {n.category}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-faint)' }}>
                        {formatIST(n.timestamp)}
                      </span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                      {n.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                      {n.message}
                    </div>
                  </div>
                ))}
              </div>

              <div
                onClick={() => {
                  setShowNotifDropdown(false);
                  setActivePage('notifications');
                }}
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  background: 'var(--bg-primary)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-cyan)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                View All Notification Logs →
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn-icon"
          title={isDarkMode ? 'Switch to Day Mode' : 'Switch to SOC Dark Mode'}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Officer Badge Pill */}
        <div
          onClick={() => setActivePage('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 8px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer'
          }}
          className="hidden-mobile"
        >
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'}
            alt="Avatar"
            style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>{currentUser?.name}</div>
            <div style={{ fontSize: '0.66rem', color: 'var(--accent-cyan)' }}>{currentUser?.rank?.split('&')[0]}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
