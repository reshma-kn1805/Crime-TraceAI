import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Filter, 
  Calendar,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useCases } from '../context/CaseContext';
import { INDIAN_STATES_REGIONS } from '../data/indianGeoData';
import { CYBERCRIME_CATEGORIES, SEVERITY_LEVELS } from '../data/mockCases';
import { MOCK_INVESTIGATORS } from '../data/mockInvestigators';
import { formatINR, formatIST, formatISTDate } from '../utils/formatters';
import { Modal } from '../components/common/Modal';

export const AnalyticsPage = () => {
  const { cases } = useCases();

  // Filters
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Report Generator Modal State
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState('Comprehensive Case Dossier');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportDate, setReportDate] = useState(null);

  const reportTypes = [
    'Comprehensive Case Dossier Report',
    'Pan-India Cybercrime Trend & Surge Analysis',
    'State Cyber Cell Investigation Performance Summary',
    'Digital Forensics Evidence & Hash Integrity Audit',
    'AI Predictive Risk & Syndicate Assessment',
    'Monthly Statutory Executive Briefing'
  ];

  // Financial metrics
  const totalReportedLoss = cases.reduce((sum, c) => sum + (c.victim?.financialLoss || 0), 0) + 184500000;
  const totalFrozenInGoldenHour = Math.round(totalReportedLoss * 0.42);

  // Resolution duration metrics
  const durationMetrics = [
    { category: 'Phishing (APK/SMS)', avgDays: 14, targetDays: 21, onTrack: true },
    { category: 'Financial Fraud (UPI)', avgDays: 18, targetDays: 30, onTrack: true },
    { category: 'Identity Theft (AePS)', avgDays: 24, targetDays: 45, onTrack: true },
    { category: 'Ransomware (ESXi/Infra)', avgDays: 45, targetDays: 60, onTrack: true },
    { category: 'Account Takeover / SIM Swap', avgDays: 12, targetDays: 15, onTrack: true }
  ];

  const handleGenerateReport = () => {
    setReportGenerated(true);
    setReportDate(new Date().toISOString());
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <BarChart3 size={28} style={{ color: 'var(--accent-cyan)' }} />
            Cybercrime Analytics & Statutory Reports
          </h1>
          <p className="page-subtitle">
            Pan-India clearance velocity, financial loss restitution, and official compliance report generation.
          </p>
        </div>

        <div className="page-actions">
          <button
            onClick={() => { setShowReportModal(true); setReportGenerated(false); }}
            className="btn btn-primary btn-sm"
          >
            <FileText size={15} /> Generate Official Report
          </button>
        </div>
      </div>

      {/* Top Metric Cards: Financial Losses and Restitution */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="soc-card" style={{ borderLeft: '4px solid #EF4444' }}>
          <div className="soc-card-title">Cumulative Financial Loss Reported</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FCA5A5', fontFamily: 'var(--font-mono)', margin: '8px 0' }}>
            {formatINR(totalReportedLoss)}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Across 1,890 citizen complaints registered via 1930 Helpline
          </div>
        </div>

        <div className="soc-card" style={{ borderLeft: '4px solid #10B981' }}>
          <div className="soc-card-title">Frozen via 1930 / CFCFRMS Golden Hour</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#6EE7B7', fontFamily: 'var(--font-mono)', margin: '8px 0' }}>
            {formatINR(totalFrozenInGoldenHour)}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            42.0% restitution rate intercepted before ATM cash-out
          </div>
        </div>

        <div className="soc-card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
          <div className="soc-card-title">Average Charge-Sheet Velocity</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', margin: '8px 0' }}>
            21.4 Days
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Average duration from initial FIR to court charge-sheet filing
          </div>
        </div>
      </div>

      {/* Analytics Grid: Duration Table + State Loss Ranking */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {/* Average Duration by Crime Category */}
        <div className="soc-card">
          <div className="soc-card-title" style={{ marginBottom: '14px' }}>
            <Clock size={16} style={{ color: 'var(--accent-cyan)' }} />
            Investigation Duration by Cybercrime Category
          </div>

          <div className="table-container">
            <table className="soc-table">
              <thead>
                <tr>
                  <th>Crime Category</th>
                  <th>Avg Days</th>
                  <th>Statutory Target</th>
                  <th>SLA Compliance</th>
                </tr>
              </thead>
              <tbody>
                {durationMetrics.map((m, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.category}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {m.avgDays} Days
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{m.targetDays} Days</td>
                    <td>
                      <span className="badge badge-low">
                        <CheckCircle2 size={11} /> Within SLA
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* State Loss Leaderboard */}
        <div className="soc-card">
          <div className="soc-card-title" style={{ marginBottom: '14px' }}>
            <TrendingUp size={16} style={{ color: 'var(--accent-cyan)' }} />
            State-Level Financial Loss & Incident Density
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {INDIAN_STATES_REGIONS.slice(0, 5).map((st, idx) => (
              <div
                key={st.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>
                    #{idx + 1} {st.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Primary Threat: {st.topThreat}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FCA5A5', fontSize: '0.88rem' }}>
                    {formatINR(st.lossINR)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)' }}>
                    {st.incidentCount} Registered Cases
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investigator Workload Matrix */}
      <div className="soc-card">
        <div className="soc-card-title" style={{ marginBottom: '14px' }}>
          <UserCheck size={16} style={{ color: 'var(--accent-cyan)' }} />
          Specialized Officer Workload & Clearance Rate
        </div>

        <div className="table-container">
          <table className="soc-table">
            <thead>
              <tr>
                <th>Officer Name</th>
                <th>Rank & Department</th>
                <th>Station Hub</th>
                <th>Assigned Inquiries</th>
                <th>Solved Cases</th>
                <th>Clearance Ratio</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVESTIGATORS.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={inv.avatar} alt={inv.name} style={{ width: '26px', height: '26px', borderRadius: '50%' }} />
                      <span>{inv.name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>{inv.rank}</td>
                  <td>{inv.city}, {inv.state}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{inv.assignedCasesCount}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--status-low)' }}>{inv.solvedCasesCount}</td>
                  <td>
                    <span className="badge badge-cyan">{inv.clearanceRate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Report Generator Modal */}
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Official Intelligence & Statutory Report Generator"
        subtitle="Generate formatted PDF / Printable reports compliant with Indian procedural norms"
        maxWidth="720px"
      >
        {!reportGenerated ? (
          <div>
            <div className="form-group">
              <label className="form-label">Select Report Template</label>
              <select
                className="form-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                {reportTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Jurisdictional Scope</label>
                <select className="form-select">
                  <option>All Indian States (National Aggregation)</option>
                  <option>Karnataka State Cyber Cell</option>
                  <option>Delhi NCR IFSO Special Cell</option>
                  <option>Maharashtra Cyber Crime Unit</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Reporting Period</label>
                <select className="form-select">
                  <option>Current Operational Month (September 2026)</option>
                  <option>Current Financial Quarter (Q2 2026-27)</option>
                  <option>Last 90 Days</option>
                  <option>Full Calendar Year 2026</option>
                </select>
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 180, 216, 0.08)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              marginBottom: '20px'
            }}>
              <strong>Format Guarantee:</strong> Report document will contain official reference numbers, watermarks, IST generation timestamps, and formal signature blocks for Investigating Officers and State Cyber Cell In-charges.
            </div>

            <div className="modal-footer" style={{ margin: '0 -24px -24px -24px' }}>
              <button onClick={() => setShowReportModal(false)} className="btn btn-outline btn-sm">
                Cancel
              </button>
              <button onClick={handleGenerateReport} className="btn btn-primary btn-sm">
                Compile & Preview Report
              </button>
            </div>
          </div>
        ) : (
          /* Report Preview View */
          <div>
            <div style={{
              background: '#0B132B',
              border: '1px solid var(--border-medium)',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              fontSize: '0.82rem'
            }}>
              <div style={{ borderBottom: '2px solid var(--accent-cyan)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
                  GOVERNMENT OF INDIA • CYBER CRIME INVESTIGATION & INTELLIGENCE DIVISION
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                  {reportType}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  Doc Ref: CRIME-TRACE-RPT-2026-09281 • Generated: {formatIST(reportDate, true)}
                </div>
              </div>

              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                <p><strong>Executive Abstract:</strong> This statutory cybercrime analytics intelligence document provides synthesis of registered FIRs, identified transnational fraud syndicates, and financial restitution metrics achieved under the National 1930 Golden Hour protocol.</p>
              </div>

              <div className="grid-2" style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>
                <div>Total Recorded Inquiries: <strong>1,890</strong></div>
                <div>Restitution Rate: <strong style={{ color: 'var(--status-low)' }}>42.0%</strong></div>
                <div>Primary Modus: <strong>UPI & SIM Swap Phishing</strong></div>
                <div>Status: <strong>Statutory Approved</strong></div>
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                CONFIDENTIAL — STRICTLY FOR LAW ENFORCEMENT & JUDICIAL OFFICIALS
              </div>
            </div>

            <div className="modal-footer" style={{ margin: '0 -24px -24px -24px' }}>
              <button onClick={() => setReportGenerated(false)} className="btn btn-outline btn-sm">
                Change Parameters
              </button>
              <button onClick={() => window.print()} className="btn btn-secondary btn-sm">
                <Printer size={14} /> Print Document
              </button>
              <button onClick={() => { alert('Report PDF exported to official downloads repository.'); setShowReportModal(false); }} className="btn btn-primary btn-sm">
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
