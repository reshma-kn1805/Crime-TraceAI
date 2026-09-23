import React from 'react';
import { 
  AlertCircle, 
  Clock, 
  FileSearch, 
  UserCheck, 
  Scale, 
  CheckCircle, 
  Archive 
} from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const normalized = (status || '').toLowerCase();

  switch (normalized) {
    case 'reported':
      return (
        <span className="badge badge-cyan">
          <Clock size={12} /> Reported
        </span>
      );
    case 'under investigation':
      return (
        <span className="badge badge-info">
          <FileSearch size={12} /> Under Investigation
        </span>
      );
    case 'evidence collection':
      return (
        <span className="badge badge-purple">
          <AlertCircle size={12} /> Evidence Collection
        </span>
      );
    case 'suspect identified':
      return (
        <span className="badge badge-high">
          <UserCheck size={12} /> Suspect Identified
        </span>
      );
    case 'legal processing':
      return (
        <span className="badge badge-medium">
          <Scale size={12} /> Legal Processing
        </span>
      );
    case 'resolved':
      return (
        <span className="badge badge-low">
          <CheckCircle size={12} /> Resolved
        </span>
      );
    case 'closed':
      return (
        <span className="badge badge-info" style={{ opacity: 0.8 }}>
          <Archive size={12} /> Closed
        </span>
      );
    default:
      return <span className="badge badge-info">{status || 'Unknown'}</span>;
  }
};
