import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const KpiCard = ({
  title,
  value,
  trend,
  trendPositive,
  trendLabel = 'vs last month',
  icon: Icon,
  variant = 'cyan',
  description
}) => {
  return (
    <div className={`kpi-card kpi-${variant}`}>
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        {Icon && (
          <div className="kpi-icon">
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="kpi-value">{value}</div>

      <div className="kpi-footer">
        {trend && (
          <span className={trendPositive ? 'trend-up' : 'trend-down'}>
            {trendPositive ? <TrendingUp size={14} style={{ marginRight: '3px' }} /> : <TrendingDown size={14} style={{ marginRight: '3px' }} />}
            {trend}
          </span>
        )}
        <span style={{ color: 'var(--text-faint)' }}>{trendLabel}</span>
      </div>

      {description && (
        <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)', marginTop: '4px' }}>
          {description}
        </div>
      )}
    </div>
  );
};
