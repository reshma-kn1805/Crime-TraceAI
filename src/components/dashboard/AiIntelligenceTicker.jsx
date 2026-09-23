import React from 'react';
import { Cpu, AlertCircle, ArrowUpRight, ShieldCheck, Sparkles, Network } from 'lucide-react';

export const AiIntelligenceTicker = ({ onNavigatePrediction, onNavigateInsights }) => {
  const insights = [
    {
      id: 'AI-01',
      type: 'surge',
      severity: 'high',
      title: 'Phishing-related incidents surge detected in South/West Zones (+24%)',
      summary: 'Automated clustering flagged 18 new electricity bill smishing domains pointing to an identical Russian C2 IP block (185.220.101.54).',
      recommendation: 'Request urgent emergency domain blocking via DoT and CERT-In.',
      timestamp: 'Today, 14:20 IST'
    },
    {
      id: 'AI-02',
      type: 'infrastructure',
      severity: 'critical',
      title: 'Shared Infrastructure Link: Cases CT-2026-00124 & CT-2026-00129',
      summary: 'Heuristic pattern correlator matched mule banking IFSC and Telegram bot token between Bengaluru and Hyderabad incidents with 94% probabilistic confidence.',
      recommendation: 'Merge investigative evidence dossiers and issue joint Section 91 CrPC notice to nodal bank.',
      timestamp: 'Today, 11:45 IST'
    },
    {
      id: 'AI-03',
      type: 'risk',
      severity: 'medium',
      title: 'Geographic Clustering: Digital Arrest Video Scams in NCR & Mumbai',
      summary: '7 senior citizen complaints in the last 72 hours exhibit identical forged CBI Skype room visual watermarks and Surat-based shell firm accounts.',
      recommendation: 'Alert Crime Branch field teams to inspect identified current account registered premises.',
      timestamp: 'Yesterday, 18:30 IST'
    }
  ];

  return (
    <div className="soc-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="soc-card-header">
        <div>
          <div className="soc-card-title">
            <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
            AI Crime Intelligence & Predictive Heuristics
          </div>
          <div className="soc-card-subtitle">
            <span style={{ color: 'var(--accent-cyan)' }}>AI-Assisted Decision Support</span> • Generated from pattern clustering across Indian police units
          </div>
        </div>

        <button
          onClick={onNavigateInsights}
          className="btn btn-outline btn-sm"
          style={{ fontSize: '0.74rem' }}
        >
          <Network size={14} /> View All Clusters
        </button>
      </div>

      {/* Notice Banner */}
      <div style={{
        padding: '8px 12px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(0, 180, 216, 0.08)',
        border: '1px solid rgba(0, 180, 216, 0.2)',
        fontSize: '0.74rem',
        color: 'var(--text-secondary)',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <AlertCircle size={15} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
        <span>
          <strong>Operational Guideline:</strong> AI outputs represent algorithmic pattern correlation, not judicially established facts. Verify independently before enforcement.
        </span>
      </div>

      {/* Insights Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {insights.map(item => (
          <div
            key={item.id}
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderLeft: `4px solid ${item.severity === 'critical' ? 'var(--status-critical)' : item.severity === 'high' ? 'var(--status-high)' : 'var(--accent-cyan)'}`,
              transition: 'border-color 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className={`badge ${item.severity === 'critical' ? 'badge-critical' : item.severity === 'high' ? 'badge-high' : 'badge-cyan'}`} style={{ fontSize: '0.65rem' }}>
                  {item.severity} Alert
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                  {item.timestamp}
                </span>
              </div>

              <button
                onClick={onNavigatePrediction}
                className="btn-icon btn-sm"
                title="Run ML Analysis"
                style={{ padding: '2px 6px', border: 'none' }}
              >
                <ArrowUpRight size={14} style={{ color: 'var(--accent-cyan)' }} />
              </button>
            </div>

            <div style={{ fontWeight: 600, fontSize: '0.84rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {item.title}
            </div>

            <div style={{ fontSize: '0.77rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '6px' }}>
              {item.summary}
            </div>

            <div style={{
              fontSize: '0.73rem',
              color: 'var(--text-secondary)',
              background: 'var(--bg-primary)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--border-subtle)'
            }}>
              <strong style={{ color: 'var(--accent-cyan)' }}>Investigative Action:</strong> {item.recommendation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
