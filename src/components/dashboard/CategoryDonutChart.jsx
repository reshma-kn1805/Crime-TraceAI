import React, { useState } from 'react';
import { PieChart, ShieldAlert } from 'lucide-react';

export const CategoryDonutChart = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const categories = [
    { name: 'Financial Fraud (UPI/Net-Banking)', percentage: 34, count: 642, color: '#00B4D8' },
    { name: 'Phishing & Smishing Portals', percentage: 28, count: 529, color: '#0077B6' },
    { name: 'Identity Theft & AePS Clone', percentage: 12, count: 227, color: '#7209B7' },
    { name: 'Account Takeover / SIM Swap', percentage: 9, count: 170, color: '#F59E0B' },
    { name: 'Ransomware (Infra/Healthcare)', percentage: 7, count: 132, color: '#EF4444' },
    { name: 'Cyberstalking & Extortion', percentage: 6, count: 113, color: '#EC4899' },
    { name: 'Malware & SCADA C2', percentage: 4, count: 77, color: '#10B981' }
  ];

  const total = categories.reduce((sum, c) => sum + c.count, 0);

  // SVG Donut calculation
  const radius = 70;
  const strokeWidth = 26;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="soc-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="soc-card-header">
        <div>
          <div className="soc-card-title">
            <PieChart size={16} style={{ color: 'var(--accent-cyan)' }} />
            Cybercrime Category Distribution
          </div>
          <div className="soc-card-subtitle">
            Current operational breakdown across 1,890 active investigations
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '16px',
        flex: 1
      }}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: '180px', height: '180px', flexShrink: 0 }}>
          <svg viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
            {categories.map((cat, idx) => {
              const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += cat.percentage;

              const isHovered = hoveredIdx === idx;

              return (
                <circle
                  key={idx}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    opacity: hoveredIdx === null || isHovered ? 1 : 0.4
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>

          {/* Center Info */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {hoveredIdx !== null ? `${categories[hoveredIdx].percentage}%` : '1,890'}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {hoveredIdx !== null ? categories[hoveredIdx].name.split(' ')[0] : 'Total Cases'}
            </div>
          </div>
        </div>

        {/* Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '220px' }}>
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                background: hoveredIdx === idx ? 'rgba(255,255,255,0.04)' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.color, flexShrink: 0 }} />
                <span style={{
                  color: hoveredIdx === idx ? '#FFFFFF' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}>
                  {cat.name}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {cat.percentage}%
                </span>
                <span style={{ color: 'var(--text-faint)', fontSize: '0.7rem' }}>
                  ({cat.count})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
