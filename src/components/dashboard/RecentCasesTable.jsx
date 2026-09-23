import React from 'react';
import { ExternalLink, Shield, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { SeverityBadge } from '../common/SeverityBadge';
import { RiskBadge } from '../common/RiskBadge';
import { formatISTDate, formatINR } from '../../utils/formatters';

export const RecentCasesTable = ({ cases, onSelectCase, onViewAllCases }) => {
  return (
    <div className="soc-card">
      <div className="soc-card-header">
        <div>
          <div className="soc-card-title">
            <Shield size={16} style={{ color: 'var(--accent-cyan)' }} />
            Active Cybercrime Inquiries & Recent Filings
          </div>
          <div className="soc-card-subtitle">
            Synchronized with State Cyber Cells & National Cyber Crime Reporting Portal
          </div>
        </div>

        <button
          onClick={onViewAllCases}
          className="btn btn-outline btn-sm"
          style={{ fontSize: '0.76rem' }}
        >
          View All Cases ({cases.length}) <ArrowRight size={13} />
        </button>
      </div>

      <div className="table-container">
        <table className="soc-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Incident Title & Category</th>
              <th>Financial Loss</th>
              <th>Jurisdiction</th>
              <th>Severity</th>
              <th>Status</th>
              <th>AI Risk</th>
              <th>Assigned Officer</th>
              <th>Date (IST)</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.slice(0, 6).map((c) => (
              <tr key={c.id}>
                {/* Case ID */}
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {c.id}
                </td>

                {/* Title & Category */}
                <td style={{ maxWidth: '280px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {c.category}
                  </div>
                </td>

                {/* Financial Loss */}
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: c.victim.financialLoss > 500000 ? '#FCA5A5' : 'var(--text-primary)' }}>
                  {formatINR(c.victim.financialLoss)}
                </td>

                {/* City/State */}
                <td>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {c.location.city}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)' }}>
                    {c.location.state}
                  </div>
                </td>

                {/* Severity */}
                <td>
                  <SeverityBadge severity={c.severity} />
                </td>

                {/* Status */}
                <td>
                  <StatusBadge status={c.status} />
                </td>

                {/* AI Risk */}
                <td>
                  <RiskBadge riskLevel={c.aiRiskLevel} score={c.riskScore} />
                </td>

                {/* Officer */}
                <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {c.assignedInvestigator}
                </td>

                {/* Date */}
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {formatISTDate(c.createdAt)}
                </td>

                {/* Action */}
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => onSelectCase(c.id)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                    title="Open Case Workspace"
                  >
                    Investigate <ExternalLink size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
