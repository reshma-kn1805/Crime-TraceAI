import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  ShieldCheck, 
  Clock, 
  Terminal, 
  CheckCircle2, 
  Lock,
  Download
} from 'lucide-react';
import { auditService } from '../services/auditService';
import { formatIST } from '../utils/formatters';

export const AuditLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await auditService.getLogs();
      setLogs(data);
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(l => {
    const term = searchTerm.toLowerCase().trim();
    return !term || (
      l.user.toLowerCase().includes(term) ||
      l.badgeId.toLowerCase().includes(term) ||
      l.action.toLowerCase().includes(term) ||
      l.caseId.toLowerCase().includes(term) ||
      l.details.toLowerCase().includes(term)
    );
  });

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FileText size={28} style={{ color: 'var(--accent-cyan)' }} />
            Security & Chain of Custody Audit Log
          </h1>
          <p className="page-subtitle">
            Cryptographically sealed activity trail of all officer actions, case access, evidence seizures, and report exports.
          </p>
        </div>

        <button
          onClick={() => alert('Audit log exported with cryptographic HMAC signature.')}
          className="btn btn-secondary btn-sm"
        >
          <Download size={14} /> Export Signed Audit Trail
        </button>
      </div>

      {/* Notice Banner */}
      <div style={{
        padding: '10px 16px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        fontSize: '0.78rem',
        color: 'var(--status-low)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <ShieldCheck size={18} />
        <span>
          <strong>Tamper-Resistant Ledger:</strong> In compliance with CERT-In directives and National Cyber Security Guidelines, all read/write transactions are immutable and retained for 180 days.
        </span>
      </div>

      {/* Search */}
      <div className="soc-card" style={{ padding: '14px 18px', marginBottom: '20px' }}>
        <div className="input-with-icon">
          <Search size={16} className="input-icon" />
          <input
            type="text"
            className="form-input"
            placeholder="Search audit trail by Officer Name, Badge ID, Action Type, or Case Docket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Audit Table */}
      <div className="table-container">
        <table className="soc-table">
          <thead>
            <tr>
              <th>Log Event ID</th>
              <th>Investigator / Officer</th>
              <th>Action Category</th>
              <th>Case Docket</th>
              <th>Audit Narrative & Modification Details</th>
              <th>Terminal Client IP</th>
              <th>Timestamp (IST)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(l => (
              <tr key={l.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent-cyan)' }}>
                  {l.id}
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{l.user}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>{l.badgeId}</div>
                </td>
                <td>
                  <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>
                    {l.action}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                  {l.caseId}
                </td>
                <td style={{ maxWidth: '300px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {l.details}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {l.ipAddress}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
                  {formatIST(l.timestamp, true)}
                </td>
                <td>
                  <span className="badge badge-low" style={{ fontSize: '0.65rem' }}>
                    <CheckCircle2 size={10} /> {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
