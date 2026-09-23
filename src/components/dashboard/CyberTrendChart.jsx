import React, { useState } from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

export const CyberTrendChart = () => {
  const [timeframe, setTimeframe] = useState('monthly'); // 'daily' | 'weekly' | 'monthly'

  const dataSets = {
    daily: [
      { label: '17-09', cases: 38, resolved: 24 },
      { label: '18-09', cases: 45, resolved: 29 },
      { label: '19-09', cases: 52, resolved: 33 },
      { label: '20-09', cases: 41, resolved: 30 },
      { label: '21-09', cases: 64, resolved: 42 },
      { label: '22-09', cases: 72, resolved: 49 },
      { label: '23-09', cases: 68, resolved: 46 }
    ],
    weekly: [
      { label: 'W1 (Aug)', cases: 280, resolved: 195 },
      { label: 'W2 (Aug)', cases: 310, resolved: 220 },
      { label: 'W3 (Aug)', cases: 345, resolved: 260 },
      { label: 'W4 (Aug)', cases: 390, resolved: 285 },
      { label: 'W1 (Sep)', cases: 415, resolved: 310 },
      { label: 'W2 (Sep)', cases: 460, resolved: 345 },
      { label: 'W3 (Sep)', cases: 490, resolved: 370 }
    ],
    monthly: [
      { label: 'Apr 2026', cases: 1120, resolved: 840 },
      { label: 'May 2026', cases: 1250, resolved: 920 },
      { label: 'Jun 2026', cases: 1410, resolved: 1040 },
      { label: 'Jul 2026', cases: 1590, resolved: 1180 },
      { label: 'Aug 2026', cases: 1740, resolved: 1320 },
      { label: 'Sep 2026', cases: 1890, resolved: 1460 }
    ]
  };

  const points = dataSets[timeframe];
  const maxVal = Math.max(...points.map(p => p.cases)) * 1.15;

  // Chart dimensions
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const getX = (index) => paddingX + (index * (svgWidth - 2 * paddingX)) / (points.length - 1);
  const getY = (val) => svgHeight - paddingY - (val / maxVal) * (svgHeight - 2 * paddingY);

  // SVG Path for cases
  const casesPath = points.reduce((acc, curr, idx) => {
    const x = getX(idx);
    const y = getY(curr.cases);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Fill area under cases
  const areaPath = `${casesPath} L ${getX(points.length - 1)} ${svgHeight - paddingY} L ${getX(0)} ${svgHeight - paddingY} Z`;

  // Resolved path
  const resolvedPath = points.reduce((acc, curr, idx) => {
    const x = getX(idx);
    const y = getY(curr.resolved);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <div className="soc-card" style={{ height: '100%' }}>
      <div className="soc-card-header">
        <div>
          <div className="soc-card-title">
            <TrendingUp size={16} style={{ color: 'var(--accent-cyan)' }} />
            Cybercrime Incident Trend & Resolution Velocity
          </div>
          <div className="soc-card-subtitle">
            All temporal data tracked in Indian Standard Time (IST, DD-MM-YYYY)
          </div>
        </div>

        {/* Timeframe switchers */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-secondary)', padding: '2px', borderRadius: 'var(--radius-md)' }}>
          {['daily', 'weekly', 'monthly'].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                background: timeframe === tf ? 'var(--accent-cyan)' : 'transparent',
                color: timeframe === tf ? '#060B18' : 'var(--text-secondary)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: '220px', display: 'block' }}
        >
          <defs>
            <linearGradient id="casesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00B4D8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = paddingY + pct * (svgHeight - 2 * paddingY);
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={svgWidth - paddingX}
                y2={y}
                stroke="var(--border-subtle)"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill="url(#casesGrad)" />

          {/* Cases Line */}
          <path
            d={casesPath}
            fill="none"
            stroke="#00B4D8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Resolved Line */}
          <path
            d={resolvedPath}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {points.map((p, idx) => {
            const cx = getX(idx);
            const cy = getY(p.cases);
            return (
              <g key={idx}>
                <circle cx={cx} cy={cy} r="4" fill="#00B4D8" stroke="#0A1128" strokeWidth="2" />
                <text
                  x={cx}
                  y={svgHeight - 10}
                  textAnchor="middle"
                  fill="var(--text-muted)"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Chart Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        marginTop: '12px',
        fontSize: '0.76rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '3px', background: '#00B4D8', display: 'inline-block' }} />
          <span>New Reported Cases (+18.4% surge)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '3px', background: '#10B981', display: 'inline-block', borderTop: '1px dashed #10B981' }} />
          <span>Resolved / Lien Imposed (+22.1%)</span>
        </div>
      </div>
    </div>
  );
};
