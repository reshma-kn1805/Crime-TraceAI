import React from 'react';
import { 
  LayoutDashboard, 
  FilePlus, 
  FolderLock, 
  MapPin, 
  Cpu, 
  Lightbulb, 
  BarChart3, 
  HardDrive, 
  Bell, 
  Settings, 
  FileText, 
  LogOut, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCases } from '../../context/CaseContext';

export const Sidebar = ({
  activePage,
  setActivePage,
  isCollapsed,
  setIsCollapsed,
  onNavigateCaseDetail
}) => {
  const { currentUser, logout, switchRole } = useAuth();
  const { unreadNotificationsCount } = useCases();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'report', label: 'Report Cybercrime', icon: FilePlus, highlight: true },
    { id: 'cases', label: 'Cases Directory', icon: FolderLock },
    { id: 'map', label: 'Cybercrime Map', icon: MapPin },
    { id: 'prediction', label: 'AI Prediction', icon: Cpu, badge: 'ML' },
    { id: 'insights', label: 'AI Insights', icon: Lightbulb },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'evidence', label: 'Evidence Vault', icon: HardDrive },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadNotificationsCount },
    { id: 'audit', label: 'Security Audit Log', icon: FileText, adminOnly: true },
    { id: 'settings', label: 'Profile & Settings', icon: Settings }
  ];

  return (
    <aside
      className="sidebar"
      style={{
        width: isCollapsed ? '72px' : '260px',
        backgroundColor: 'var(--bg-primary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          padding: isCollapsed ? '0' : '0 18px',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div
          onClick={() => setActivePage('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          {/* Custom SVG Shield Emblem */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0A1128 0%, #0F1A36 100%)',
              border: '1.5px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)',
              flexShrink: 0
            }}
          >
            <ShieldAlert size={20} style={{ color: 'var(--accent-cyan)' }} />
          </div>

          {!isCollapsed && (
            <div>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                CrimeTrace<span style={{ color: 'var(--accent-cyan)' }}>AI</span>
              </div>
              <div
                style={{
                  fontSize: '0.64rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 600
                }}
              >
                Cybercrime Intel System
              </div>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="btn-icon btn-sm"
            title="Collapse Sidebar"
            style={{ border: 'none', padding: '4px' }}
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <button
            onClick={() => setIsCollapsed(false)}
            className="btn-icon btn-sm"
            title="Expand Sidebar"
            style={{ border: 'none' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <nav
        style={{
          flex: 1,
          padding: '14px 10px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              title={isCollapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: '12px',
                width: '100%',
                padding: isCollapsed ? '10px' : '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: isActive
                  ? 'rgba(0, 180, 216, 0.15)'
                  : item.highlight && !isActive
                  ? 'rgba(0, 180, 216, 0.05)'
                  : 'transparent',
                border: isActive
                  ? '1px solid rgba(0, 180, 216, 0.4)'
                  : item.highlight
                  ? '1px dashed var(--border-medium)'
                  : '1px solid transparent',
                color: isActive
                  ? '#FFFFFF'
                  : item.highlight
                  ? 'var(--accent-cyan)'
                  : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
            >
              <Icon
                size={18}
                style={{
                  color: isActive
                    ? 'var(--accent-cyan)'
                    : item.highlight
                    ? 'var(--accent-cyan)'
                    : 'inherit',
                  flexShrink: 0
                }}
              />

              {!isCollapsed && (
                <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              )}

              {/* Badges or counts */}
              {!isCollapsed && item.count !== undefined && item.count > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--status-critical)',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    padding: '2px 7px',
                    fontSize: '0.68rem',
                    fontWeight: 700
                  }}
                >
                  {item.count}
                </span>
              )}

              {!isCollapsed && item.badge && (
                <span
                  style={{
                    backgroundColor: 'rgba(0, 180, 216, 0.2)',
                    color: 'var(--accent-cyan)',
                    borderRadius: '4px',
                    padding: '1px 5px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Role Switcher Pill (for evaluation/demo) */}
      {!isCollapsed && (
        <div style={{ padding: '0 12px 10px 12px' }}>
          <div
            style={{
              padding: '8px 10px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.72rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-faint)', textTransform: 'uppercase', fontWeight: 700 }}>
                Demo Role Switch
              </span>
              <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>
                {currentUser?.role || 'Officer'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['Investigator', 'Administrator', 'Analyst'].map((r) => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  style={{
                    flex: 1,
                    fontSize: '0.66rem',
                    padding: '3px 0',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: currentUser?.role === r ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                    background: currentUser?.role === r ? 'rgba(0, 180, 216, 0.2)' : 'transparent',
                    color: currentUser?.role === r ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {r === 'Administrator' ? 'Admin' : r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Profile Bar */}
      <div
        style={{
          padding: isCollapsed ? '12px 6px' : '14px 16px',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          gap: '10px'
        }}
      >
        <div
          onClick={() => setActivePage('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
          title={isCollapsed ? `${currentUser?.name} (${currentUser?.badgeNumber})` : undefined}
        >
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'}
            alt="Avatar"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: '2px solid var(--accent-cyan)',
              objectFit: 'cover',
              flexShrink: 0
            }}
          />

          {!isCollapsed && (
            <div style={{ overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                {currentUser?.name || 'Officer'}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {currentUser?.badgeNumber || 'IN-CYB-001'}
              </div>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            onClick={logout}
            className="btn-icon btn-sm"
            title="Sign Out"
            style={{ border: 'none', color: 'var(--text-muted)' }}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
};
