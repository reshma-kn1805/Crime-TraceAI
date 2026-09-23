import React from 'react';
import { 
  Bell, 
  CheckCheck, 
  AlertTriangle, 
  Clock, 
  Cpu, 
  HardDrive, 
  UserPlus, 
  Scale, 
  ExternalLink 
} from 'lucide-react';
import { useCases } from '../context/CaseContext';
import { formatIST } from '../utils/formatters';

export const NotificationsPage = ({ onSelectCase }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadNotificationsCount } = useCases();

  const getNotifIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertTriangle size={18} style={{ color: 'var(--status-critical)' }} />;
      case 'ai': return <Cpu size={18} style={{ color: 'var(--accent-cyan)' }} />;
      case 'assignment': return <UserPlus size={18} style={{ color: 'var(--status-high)' }} />;
      case 'evidence': return <HardDrive size={18} style={{ color: 'var(--status-purple)' }} />;
      case 'court': return <Scale size={18} style={{ color: 'var(--status-low)' }} />;
      default: return <Bell size={18} style={{ color: 'var(--accent-cyan)' }} />;
    }
  };

  return (
    <div className="page-wrapper" style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Bell size={28} style={{ color: 'var(--accent-cyan)' }} />
            Operational Alerts & Notifications Center
          </h1>
          <p className="page-subtitle">
            Time-critical statutory alerts, 1930 Golden Hour freeze signals, and court deadline notifications.
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <button onClick={markAllNotificationsRead} className="btn btn-outline btn-sm">
            <CheckCheck size={14} /> Mark All as Read ({unreadNotificationsCount})
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            className="soc-card"
            style={{
              padding: '16px 20px',
              backgroundColor: n.read ? 'var(--bg-card)' : 'rgba(0, 180, 216, 0.08)',
              borderLeft: `4px solid ${n.type === 'critical' ? 'var(--status-critical)' : n.type === 'ai' ? 'var(--accent-cyan)' : 'var(--border-medium)'}`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {getNotifIcon(n.type)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${n.type === 'critical' ? 'badge-critical' : 'badge-cyan'}`} style={{ fontSize: '0.68rem' }}>
                    {n.category}
                  </span>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {n.title}
                  </div>
                </div>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                  {formatIST(n.timestamp)}
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '4px' }}>
                {n.message}
              </p>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '10px' }}>
                {n.caseId && (
                  <button
                    onClick={() => onSelectCase(n.caseId)}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                  >
                    View Docket {n.caseId} <ExternalLink size={11} />
                  </button>
                )}

                {!n.read && (
                  <button
                    onClick={() => markNotificationRead(n.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.74rem', cursor: 'pointer' }}
                  >
                    Acknowledge & Mark Read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
