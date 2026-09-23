import React from 'react';
import { Cpu } from 'lucide-react';

export const RiskBadge = ({ riskLevel, score }) => {
  const norm = (riskLevel || '').toLowerCase();

  let badgeClass = 'badge-info';
  if (norm === 'critical') badgeClass = 'badge-critical';
  else if (norm === 'high') badgeClass = 'badge-high';
  else if (norm === 'medium') badgeClass = 'badge-medium';
  else if (norm === 'low') badgeClass = 'badge-low';

  return (
    <span className={`badge ${badgeClass}`} title={`AI Risk Score: ${score || 'N/A'}/100`}>
      <Cpu size={12} />
      <span>AI {riskLevel}</span>
      {score ? <span style={{ opacity: 0.8, fontSize: '0.7rem' }}>({score})</span> : null}
    </span>
  );
};
