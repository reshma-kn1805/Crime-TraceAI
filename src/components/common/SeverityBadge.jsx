import React from 'react';
import { AlertOctagon, AlertTriangle, ShieldAlert, ShieldCheck } from 'lucide-react';

export const SeverityBadge = ({ severity }) => {
  const norm = (severity || '').toLowerCase();

  switch (norm) {
    case 'critical':
      return (
        <span className="badge badge-critical">
          <AlertOctagon size={12} /> Critical
        </span>
      );
    case 'high':
      return (
        <span className="badge badge-high">
          <AlertTriangle size={12} /> High
        </span>
      );
    case 'medium':
      return (
        <span className="badge badge-medium">
          <ShieldAlert size={12} /> Medium
        </span>
      );
    case 'low':
      return (
        <span className="badge badge-low">
          <ShieldCheck size={12} /> Low
        </span>
      );
    default:
      return <span className="badge badge-info">{severity || 'Standard'}</span>;
  }
};
