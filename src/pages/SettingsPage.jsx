import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  ShieldCheck, 
  Key, 
  Globe, 
  Bell, 
  Lock, 
  Clock, 
  CheckCircle2, 
  Save, 
  Smartphone,
  Shield,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatIST } from '../utils/formatters';

export const SettingsPage = () => {
  const { currentUser, sessionStartTime, switchRole } = useAuth();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security' | 'preferences' | 'roles'
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [notificationUrgent, setNotificationUrgent] = useState(true);
  const [notificationWeekly, setNotificationWeekly] = useState(true);

  const activeSessions = [
    {
      device: 'Workstation Terminal (Windows 11 / Chrome 128)',
      ip: '10.24.110.42 (CID Headquarters Intranet)',
      location: 'Bengaluru, Karnataka',
      loginTime: sessionStartTime,
      current: true
    },
    {
      device: 'Field Investigation Tablet (Android 14 / Secure Browser)',
      ip: '103.21.90.114 (State Police VPN)',
      location: 'Shivajinagar Cyber Cell, Pune',
      loginTime: '2026-09-22T09:14:00+05:30',
      current: false
    }
  ];

  return (
    <div className="page-wrapper" style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Settings size={28} style={{ color: 'var(--accent-cyan)' }} />
            Investigator Profile & Security Settings
          </h1>
          <p className="page-subtitle">
            Manage officer authentication credentials, biometric 2FA tokens, and role-based clearance settings.
          </p>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '24px'
      }}>
        {[
          { id: 'profile', label: 'Officer Profile' },
          { id: 'security', label: '2FA & Active Sessions' },
          { id: 'preferences', label: 'Language & Preferences' },
          { id: 'roles', label: 'Role Permissions Matrix' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              fontSize: '0.84rem',
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Profile */}
      {activeTab === 'profile' && (
        <div className="soc-card">
          <div className="soc-card-title" style={{ marginBottom: '20px' }}>
            <User size={16} style={{ color: 'var(--accent-cyan)' }} />
            Official Law Enforcement Profile
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'}
              alt={currentUser?.name}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                border: '3px solid var(--accent-cyan)',
                objectFit: 'cover'
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>{currentUser?.name}</h2>
                <span className="badge badge-cyan">{currentUser?.role}</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {currentUser?.rank} • {currentUser?.department}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                Official Badge ID: {currentUser?.badgeNumber}
              </div>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Official Email Address</label>
              <input type="text" className="form-input" value={currentUser?.email || ''} readOnly />
            </div>

            <div className="form-group">
              <label className="form-label">Official Mobile (+91)</label>
              <input type="text" className="form-input" value={currentUser?.phone || ''} readOnly />
            </div>

            <div className="form-group">
              <label className="form-label">Posting Jurisdiction</label>
              <input type="text" className="form-input" value={`${currentUser?.city || 'Bengaluru'}, ${currentUser?.state || 'Karnataka'}`} readOnly />
            </div>

            <div className="form-group">
              <label className="form-label">System Clearance Level</label>
              <input type="text" className="form-input" value="Level 4 — Sensitive Cybercrime & Financial Forensic Access" readOnly />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '10px', textAlign: 'right' }}>
            <button onClick={() => alert('Profile credentials verified against police department database.')} className="btn btn-primary btn-sm">
              <Save size={14} /> Save Profile Settings
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Security & 2FA */}
      {activeTab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 2FA Toggle Card */}
          <div className="soc-card">
            <div className="soc-card-title" style={{ marginBottom: '14px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--accent-cyan)' }} />
              Two-Factor Authentication (2FA) & Smart Token
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.88rem' }}>
                  Hardware FIDO2 Security Key / Authenticator App
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Mandated by National Cyber Security Policy for all investigating officers.
                </div>
              </div>

              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`btn btn-sm ${twoFactorEnabled ? 'btn-primary' : 'btn-outline'}`}
              >
                {twoFactorEnabled ? 'Enabled & Active' : 'Disabled'}
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="soc-card">
            <div className="soc-card-title" style={{ marginBottom: '14px' }}>
              <Clock size={16} style={{ color: 'var(--accent-cyan)' }} />
              Active Terminal Sessions (IST Logged)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeSessions.map((sess, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                      {sess.device}
                      {sess.current && (
                        <span className="badge badge-low" style={{ marginLeft: '8px', fontSize: '0.65rem' }}>
                          Current Session
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      IP: {sess.ip} • {sess.location}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
                    Session Started: {formatIST(sess.loginTime, true)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Preferences (Language, Hindi, Notifications) */}
      {activeTab === 'preferences' && (
        <div className="soc-card">
          <div className="soc-card-title" style={{ marginBottom: '16px' }}>
            <Globe size={16} style={{ color: 'var(--accent-cyan)' }} />
            Application Preferences & Official Languages
          </div>

          <div className="grid-2" style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label className="form-label">System Display Language</label>
              <select
                className="form-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="English">English (Official Court Language)</option>
                <option value="Hindi">हिंदी (Hindi / Rajbhasha)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date & Time Format Standard</label>
              <input type="text" className="form-input" value="DD-MM-YYYY, HH:mm:ss IST (UTC+5:30)" readOnly />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <div style={{ fontSize: '0.84rem', fontWeight: 600, marginBottom: '12px' }}>
              Notification Subscriptions
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notificationUrgent}
                  onChange={(e) => setNotificationUrgent(e.target.checked)}
                  style={{ accentColor: 'var(--accent-cyan)' }}
                />
                1930 / I4C Golden Hour Account Freeze Real-Time Broadcasts
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notificationWeekly}
                  onChange={(e) => setNotificationWeekly(e.target.checked)}
                  style={{ accentColor: 'var(--accent-cyan)' }}
                />
                AI Cross-Jurisdiction Pattern Linkage & IOC Match Reports
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Role Permissions Matrix */}
      {activeTab === 'roles' && (
        <div className="soc-card">
          <div className="soc-card-title" style={{ marginBottom: '14px' }}>
            <Layers size={16} style={{ color: 'var(--accent-cyan)' }} />
            Role-Based Access Control (RBAC) Specification
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            CrimeTraceAI implements strict law-enforcement privilege separation. Use the sidebar demo switch to test each role's view.
          </div>

          <div className="table-container">
            <table className="soc-table">
              <thead>
                <tr>
                  <th>Capability / Module</th>
                  <th>Administrator</th>
                  <th>Investigator</th>
                  <th>Analyst</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Register New Incident FIR', admin: true, io: true, analyst: false },
                  { feature: 'Update Case Status & Add Timeline', admin: true, io: true, analyst: false },
                  { feature: 'Reassign Investigating Officers', admin: true, io: false, analyst: false },
                  { feature: 'Deposit Digital Evidence & Compute Hashes', admin: true, io: true, analyst: false },
                  { feature: 'Execute Machine Learning Predictions', admin: true, io: true, analyst: true },
                  { feature: 'View Syndicate Clusters & Heuristic IOCs', admin: true, io: true, analyst: true },
                  { feature: 'Compile & Export Statutory Reports', admin: true, io: true, analyst: true },
                  { feature: 'View Immutable Security Audit Logs', admin: true, io: false, analyst: false }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.feature}</td>
                    <td>{row.admin ? <span className="badge badge-low">Allowed</span> : <span className="badge badge-critical">Denied</span>}</td>
                    <td>{row.io ? <span className="badge badge-low">Allowed</span> : <span className="badge badge-critical">Denied</span>}</td>
                    <td>{row.analyst ? <span className="badge badge-low">Allowed</span> : <span className="badge badge-critical">Denied</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
