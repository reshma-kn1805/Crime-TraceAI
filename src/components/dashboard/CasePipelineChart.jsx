import React from 'react';
import { Layers, ShieldCheck, AlertOctagon } from 'lucide-react';
import { useCases } from '../../context/CaseContext';

export const CasePipelineChart = () => {
  const { cases } = useCases();

  // Investigation statuses pipeline
  const pipeline = [
    { label: 'Reported', count: 18, color: '#00B4D8' },
    { label: 'Under Investigation', count: 42, color: '#3B82F6' },
    { label: 'Evidence Collection', count: 29, color: '#8B5CF6' },
    { label: 'Suspect Identified', count: 22, color: '#F97316' },
    { label: 'Legal Processing', count: 15, color: '#F59E0B' },
    { label: 'Resolved / Recovered', count: 68, color: '#10B981' }
  ];

  const maxPipeline = Math.max(...pipeline.map(p => p.count));

  // Severity metrics
  const severities = [
    { label: 'Critical', count: 14, percent: 14, color: 'var(--status-critical)' },
    { label: 'High', count: 38, percent: 38, color: 'var(--status-high)' },
    { label: 'Medium', count: 32, percent: 32, color: 'var(--status-medium)' },
    { label: 'Low', count: 16, percent: 16, color: 'var(--status-low)' }
  ];

  return (
    <div className="soc-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="soc-card-header">
        <div>
          <div className="soc-card-title">
            <Layers size={16} style={{ color: 'var(--accent-cyan)' }} />
            Investigation Funnel & Severity Index
          </div>
          <div className="soc-card-subtitle">
            Lifecycle progress from first 1930 distress call to Judicial Charge-sheet
          </div>
        </div>
      </div>

      {/* Severity Horizontal Strip */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.74rem',
          color: 'var(--text-muted)',
          marginBottom: '6px'
        }}>
          <span>Severity Distribution</span>
          <span style={{ color: 'var(--status-critical)', fontWeight: 600 }}>52% Critical + High</span>
        </div>

        {/* Stacked bar */}
        <div style={{
          display: 'flex',
          height: '10px',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-tertiary)',
          gap: '2px'
        }}>
          {severities.map((s, idx) => (
            <div
              key={idx}
              style={{
                width: `${s.percent}%`,
                backgroundColor: s.color,
                transition: 'width 0.3s ease'
              }}
              title={`${s.label}: ${s.percent}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          {severities.map((s, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: s.color }} />
              <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
              <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{s.percent}%</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Status Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'center' }}>
        {pipeline.map((item, idx) => {
          const widthPct = Math.round((item.count / maxPipeline) * 100);

          return (
            <div key={idx}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.76rem',
                marginBottom: '3px'
              }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {item.count} Cases
                </span>
              </div>

              <div style={{
                height: '7px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-tertiary)',
                overflow: 'hidden'
              }}>
                <div
                  style={{
                    height: '100%',
                    width: `${widthPct}%`,
                    backgroundColor: item.color,
                    borderRadius: '4px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
