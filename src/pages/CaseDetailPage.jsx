import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldAlert, 
  User, 
  MapPin, 
  CreditCard, 
  Clock, 
  Plus, 
  Printer, 
  HardDrive, 
  CheckCircle2, 
  Network, 
  Share2, 
  FileText, 
  Edit3, 
  UserCheck, 
  Lock,
  ExternalLink,
  Fingerprint,
  Phone,
  Building,
  Terminal,
  AlertTriangle
} from 'lucide-react';
import { useCases } from '../context/CaseContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { RiskBadge } from '../components/common/RiskBadge';
import { Modal } from '../components/common/Modal';
import { formatIST, formatINR, formatISTDate } from '../utils/formatters';
import { CASE_STATUSES } from '../data/mockCases';
import { MOCK_INVESTIGATORS } from '../data/mockInvestigators';
import { EVIDENCE_TYPES } from '../data/mockEvidence';
import { generateSHA256 } from '../utils/hashGenerator';

export const CaseDetailPage = ({
  caseId,
  onBack,
  onNavigateCase
}) => {
  const { cases, evidenceList, updateCaseStatus, assignOfficer, addEvidence, addTimelineNote } = useCases();
  const { currentUser } = useAuth();

  const caseData = cases.find(c => c.id === caseId) || cases[0];
  const caseEvidence = evidenceList.filter(e => e.caseId === caseData.id);

  // Tab state
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'timeline' | 'evidence' | 'suspect' | 'similar' | 'dossier'

  // Modals state
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(caseData.status);
  const [statusNote, setStatusNote] = useState('');

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOfficerId, setSelectedOfficerId] = useState(MOCK_INVESTIGATORS[0].id);

  const [showAddEvidenceModal, setShowAddEvidenceModal] = useState(false);
  const [newEvidenceTitle, setNewEvidenceTitle] = useState('');
  const [newEvidenceType, setNewEvidenceType] = useState('Screenshot');

  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [timelineTitle, setTimelineTitle] = useState('');
  const [timelineDesc, setTimelineDesc] = useState('');

  // Status submit
  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    await updateCaseStatus(caseData.id, selectedStatus, statusNote);
    setShowStatusModal(false);
    setStatusNote('');
  };

  // Assign submit
  const handleAssignUpdate = async (e) => {
    e.preventDefault();
    const officer = MOCK_INVESTIGATORS.find(i => i.id === selectedOfficerId);
    if (officer) {
      await assignOfficer(caseData.id, officer);
    }
    setShowAssignModal(false);
  };

  // Add evidence submit
  const handleEvidenceSubmit = async (e) => {
    e.preventDefault();
    const mockHash = await generateSHA256(newEvidenceTitle + Date.now());
    await addEvidence({
      caseId: caseData.id,
      title: newEvidenceTitle,
      type: newEvidenceType,
      sha256: mockHash,
      fileSizeFormatted: '2.4 MB'
    });
    setShowAddEvidenceModal(false);
    setNewEvidenceTitle('');
  };

  // Add timeline note submit
  const handleTimelineSubmit = async (e) => {
    e.preventDefault();
    await addTimelineNote(caseData.id, timelineTitle, timelineDesc);
    setShowTimelineModal(false);
    setTimelineTitle('');
    setTimelineDesc('');
  };

  return (
    <div className="page-wrapper">
      {/* Back button and quick breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button onClick={onBack} className="btn btn-outline btn-sm">
          <ArrowLeft size={14} /> Back to Cases Directory
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setShowStatusModal(true)} className="btn btn-secondary btn-sm">
            <Edit3 size={14} /> Update Status
          </button>
          <button onClick={() => setShowAssignModal(true)} className="btn btn-secondary btn-sm">
            <UserCheck size={14} /> Assign Officer
          </button>
          <button onClick={() => setShowAddEvidenceModal(true)} className="btn btn-secondary btn-sm">
            <Plus size={14} /> Add Evidence
          </button>
          <button onClick={() => setActiveTab('dossier')} className="btn btn-primary btn-sm">
            <Printer size={14} /> Official Case FIR / Dossier
          </button>
        </div>
      </div>

      {/* Case Header Card */}
      <div className="soc-card" style={{ marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '5px',
          height: '100%',
          backgroundColor: caseData.severity === 'Critical' ? 'var(--status-critical)' : 'var(--accent-cyan)'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--accent-cyan)',
                background: 'rgba(0, 180, 216, 0.1)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {caseData.id}
              </span>
              <SeverityBadge severity={caseData.severity} />
              <StatusBadge status={caseData.status} />
              <RiskBadge riskLevel={caseData.aiRiskLevel} score={caseData.riskScore} />
            </div>

            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {caseData.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} style={{ color: 'var(--accent-cyan)' }} />
                {caseData.location.city}, {caseData.location.state} ({caseData.location.station})
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <User size={14} style={{ color: 'var(--accent-cyan)' }} />
                Assigned: <strong style={{ color: 'var(--text-secondary)' }}>{caseData.assignedInvestigator}</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)' }}>
                <Clock size={14} /> Registered: {formatIST(caseData.createdAt)}
              </span>
            </div>
          </div>

          {/* Financial Loss Indicator */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 18px',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Financial Loss Reported
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: caseData.victim.financialLoss > 500000 ? '#FCA5A5' : 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {formatINR(caseData.victim.financialLoss)}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--status-low)' }}>
              1930 Golden Hour Triggered
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '24px',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        {[
          { id: 'overview', label: 'Case Overview & IOCs' },
          { id: 'timeline', label: `Investigation Timeline (${caseData.timeline.length})` },
          { id: 'evidence', label: `Evidence Vault (${caseEvidence.length})` },
          { id: 'suspect', label: 'Suspect Profile & Accounts' },
          { id: 'similar', label: `AI Pattern Linkage (${caseData.relatedCases?.length || 0})` },
          { id: 'dossier', label: 'Official FIR Dossier (Printable)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 16px',
              fontSize: '0.84rem',
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Case Overview & Technical IOCs */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-2">
            {/* Victim Details Card */}
            <div className="soc-card">
              <div className="soc-card-title" style={{ marginBottom: '14px' }}>
                <User size={16} style={{ color: 'var(--accent-cyan)' }} />
                Complainant & Victim Information
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Victim Full Name:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{caseData.victim.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Registered Contact (+91):</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{caseData.victim.phone}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Age & Demography:</span>
                  <span>{caseData.victim.age ? `${caseData.victim.age} Years (Target Vulnerability Index: Medium)` : '—'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Organization / Profession:</span>
                  <span>{caseData.victim.organization || 'Individual Citizen'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Compromised Account:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{caseData.victim.accountAffected}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Victim UPI Handle:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{caseData.victim.upiHandle}</span>
                </div>
              </div>
            </div>

            {/* Attack Vector & Modus Operandi Card */}
            <div className="soc-card">
              <div className="soc-card-title" style={{ marginBottom: '14px' }}>
                <Terminal size={16} style={{ color: 'var(--accent-cyan)' }} />
                Attack Vector & Modus Operandi
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Primary Vector:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{caseData.attackDetails.vector}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Digital Platform:</span>
                  <span>{caseData.attackDetails.platform}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Target Bank / Beneficiary UTR:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                    {caseData.attackDetails.transactionRef || 'N/A'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Suspected Malware / Payload:</span>
                  <span>{caseData.attackDetails.suspectedMalware || 'None Detected'}</span>
                </div>
                <div style={{ marginTop: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Incident Summary:</div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, fontSize: '0.8rem' }}>
                    {caseData.attackDetails.method}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Indicators of Compromise (IOCs) */}
          <div className="soc-card">
            <div className="soc-card-title" style={{ marginBottom: '14px' }}>
              <ShieldAlert size={16} style={{ color: 'var(--accent-cyan)' }} />
              Technical Indicators of Compromise (IOCs)
            </div>
            <div className="grid-3" style={{ fontSize: '0.8rem' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: '4px' }}>SUSPECTED C2 / ORIGIN IP</div>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  {caseData.attackDetails.ipAddress || 'Under Packet Analysis'}
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: '4px' }}>SPOOFED PHISHING URL / DOMAIN</div>
                <div style={{ fontFamily: 'var(--font-mono)', color: '#FCA5A5', fontWeight: 600, wordBreak: 'break-all' }}>
                  {caseData.attackDetails.url || 'N/A'}
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: '4px' }}>HARDWARE / DEVICE FINGERPRINT</div>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {caseData.attackDetails.deviceFingerprint || 'Pending IMEI Dump'}
                </div>
              </div>
            </div>

            {caseData.attackDetails.technicalIndicators && (
              <div style={{
                marginTop: '14px',
                background: 'var(--bg-secondary)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)'
              }}>
                <strong>Forensic Telemetry:</strong> {caseData.attackDetails.technicalIndicators}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Investigation Timeline */}
      {activeTab === 'timeline' && (
        <div className="soc-card">
          <div className="soc-card-header">
            <div>
              <div className="soc-card-title">
                <Clock size={16} style={{ color: 'var(--accent-cyan)' }} />
                Chronological Investigation Timeline (IST Audit Trail)
              </div>
              <div className="soc-card-subtitle">
                Official milestones recorded by investigating officers and system dispatchers
              </div>
            </div>

            <button
              onClick={() => setShowTimelineModal(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus size={14} /> Add Investigation Milestone
            </button>
          </div>

          <div style={{ position: 'relative', paddingLeft: '28px', marginTop: '16px' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              bottom: '8px',
              width: '2px',
              backgroundColor: 'var(--border-medium)'
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {caseData.timeline.map((entry, idx) => (
                <div key={entry.id} style={{ position: 'relative' }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute',
                    left: '-28px',
                    top: '2px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: idx === 0 ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
                    border: '2px solid var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: idx === 0 ? '#060B18' : 'var(--accent-cyan)' }} />
                  </div>

                  {/* Content */}
                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 18px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                        {entry.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                        {formatIST(entry.timestamp, true)}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', marginBottom: '6px' }}>
                      Recorded by: {entry.officer}
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Evidence Vault */}
      {activeTab === 'evidence' && (
        <div className="soc-card">
          <div className="soc-card-header">
            <div>
              <div className="soc-card-title">
                <HardDrive size={16} style={{ color: 'var(--accent-cyan)' }} />
                Secured Digital Evidence Vault ({caseEvidence.length} Exhibits)
              </div>
              <div className="soc-card-subtitle">
                Section 65B Indian Evidence Act certified exhibits with SHA-256 chain of custody
              </div>
            </div>

            <button onClick={() => setShowAddEvidenceModal(true)} className="btn btn-primary btn-sm">
              <Plus size={14} /> Deposit New Exhibit
            </button>
          </div>

          <div className="table-container">
            <table className="soc-table">
              <thead>
                <tr>
                  <th>Exhibit ID</th>
                  <th>Title & Description</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>SHA-256 Hash</th>
                  <th>Seizure Date (IST)</th>
                  <th>Seizing Officer</th>
                  <th>Chain of Custody</th>
                </tr>
              </thead>
              <tbody>
                {caseEvidence.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                      No digital exhibits deposited for this case yet. Click 'Deposit New Exhibit' to upload.
                    </td>
                  </tr>
                ) : (
                  caseEvidence.map(ev => (
                    <tr key={ev.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        {ev.id}
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {ev.title}
                      </td>
                      <td>
                        <span className="badge badge-purple">{ev.type}</span>
                      </td>
                      <td>{ev.fileSizeFormatted}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
                        {ev.sha256.slice(0, 16)}...
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}>
                        {formatISTDate(ev.uploadedAt)}
                      </td>
                      <td style={{ fontSize: '0.78rem' }}>{ev.uploadedBy}</td>
                      <td>
                        <span className="badge badge-low" style={{ fontSize: '0.68rem' }}>
                          <CheckCircle2 size={11} /> Verified
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Suspect Profile */}
      {activeTab === 'suspect' && (
        <div className="soc-card">
          <div className="soc-card-title" style={{ marginBottom: '16px' }}>
            <User size={16} style={{ color: 'var(--accent-cyan)' }} />
            Suspect Profile & Associated Mule Infrastructure
          </div>

          <div className="grid-2">
            <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                KNOWN SUSPECT / NETWORK IDENTITY
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                {caseData.suspect.name}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', marginBottom: '14px' }}>
                Alias: {caseData.suspect.alias}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Contact Series:</span>{' '}
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{caseData.suspect.contact || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Hardware / IMEI Identifiers:</span>{' '}
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{caseData.suspect.knownIdentifiers || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                BENEFICIARY MULE ACCOUNTS & DIGITAL CHANNELS
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: '#FCD34D', marginBottom: '10px' }}>
                {caseData.suspect.associatedAccounts || 'Tracing multi-layer bank transfers'}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Known Origin IP Addresses:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {caseData.suspect.knownIPs?.length > 0 ? (
                  caseData.suspect.knownIPs.map((ip, i) => (
                    <span key={i} className="badge badge-cyan" style={{ fontFamily: 'var(--font-mono)' }}>{ip}</span>
                  ))
                ) : (
                  <span style={{ color: 'var(--text-faint)', fontSize: '0.76rem' }}>None logged</span>
                )}
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                <strong>Intelligence Notes:</strong> {caseData.suspect.notes}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AI Pattern Linkage & Similar Cases */}
      {activeTab === 'similar' && (
        <div className="soc-card">
          <div className="soc-card-header">
            <div>
              <div className="soc-card-title">
                <Network size={16} style={{ color: 'var(--accent-cyan)' }} />
                AI Heuristic Similarity & Syndicated Pattern Linkage
              </div>
              <div className="soc-card-subtitle">
                Supervised graph neural network comparing technical IOCs and modus operandi across Indian cases
              </div>
            </div>
          </div>

          {/* Legal AI Disclaimer */}
          <div style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            fontSize: '0.76rem',
            color: '#FCD34D',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertTriangle size={16} style={{ flexShrink: 0 }} />
            <span>
              <strong>Investigative Caution:</strong> AI-generated similarity scores represent statistical correlation, not judicially confirmed syndicate ties. Cross-verify telecom CDRs and bank account KYC before filing charge-sheets.
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {caseData.relatedCases?.length > 0 ? (
              caseData.relatedCases.map((rel, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(0, 180, 216, 0.15)',
                      border: '2px solid var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      color: 'var(--accent-cyan)',
                      fontSize: '0.88rem'
                    }}>
                      {rel.similarity}%
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                          {rel.caseId}
                        </span>
                        <span className="badge badge-high" style={{ fontSize: '0.65rem' }}>AI Linkage</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {rel.reason}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateCase(rel.caseId)}
                    className="btn btn-outline btn-sm"
                  >
                    View Connected Case <ExternalLink size={12} />
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                No automated pattern links discovered for this case yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: Official FIR / Case Dossier Printable View */}
      {activeTab === 'dossier' && (
        <div className="soc-card" style={{ padding: '40px', backgroundColor: '#0B132B' }}>
          {/* Printable Header */}
          <div style={{ borderBottom: '2px solid var(--accent-cyan)', paddingBottom: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                STATE POLICE CYBERCRIME INVESTIGATION WING • GOVERNMENT OF INDIA
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                FIRST INFORMATION DOSSIER & FORENSIC SUMMARY
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                National Cyber Crime Portal Reference • Registered under IT Act 2000 (Section 43, 66, 66C, 66D)
              </div>
            </div>

            <button onClick={() => window.print()} className="btn btn-primary btn-sm no-print">
              <Printer size={14} /> Print Formal FIR
            </button>
          </div>

          {/* Dossier Grid */}
          <div className="grid-2" style={{ fontSize: '0.84rem', gap: '18px', marginBottom: '24px' }}>
            <div>
              <strong style={{ color: 'var(--text-muted)' }}>OFFICIAL CASE ID:</strong>{' '}
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>{caseData.id}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text-muted)' }}>RECORDED DATE & TIME:</strong>{' '}
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatIST(caseData.createdAt, true)}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text-muted)' }}>CYBERCRIME CATEGORY:</strong>{' '}
              <span>{caseData.category}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text-muted)' }}>SEVERITY LEVEL:</strong>{' '}
              <span>{caseData.severity} (AI Risk: {caseData.aiRiskLevel})</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text-muted)' }}>INVESTIGATING JURISDICTION:</strong>{' '}
              <span>{caseData.location.station}, {caseData.location.city}, {caseData.location.state}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text-muted)' }}>INVESTIGATING OFFICER (IO):</strong>{' '}
              <span>{caseData.assignedInvestigator} ({caseData.investigatorId})</span>
            </div>
          </div>

          {/* Complainant Statement */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontSize: '0.82rem' }}>
            <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>I. COMPLAINANT / VICTIM STATEMENT</div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {caseData.attackDetails.method}
            </p>
            <div style={{ marginTop: '10px', display: 'flex', gap: '20px', color: 'var(--text-muted)' }}>
              <span>Complainant: <strong>{caseData.victim.name}</strong></span>
              <span>Contact: <strong>{caseData.victim.phone}</strong></span>
              <span>Financial Loss: <strong style={{ color: '#FCA5A5' }}>{formatINR(caseData.victim.financialLoss)}</strong></span>
            </div>
          </div>

          {/* Evidence Inventory */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '30px', fontSize: '0.82rem' }}>
            <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>II. INVENTORY OF SEIZED DIGITAL EXHIBITS</div>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {caseEvidence.map(ev => (
                <li key={ev.id}>
                  <strong>{ev.id}:</strong> {ev.title} ({ev.type}, {ev.fileSizeFormatted}) — SHA-256: <code style={{ color: 'var(--accent-cyan)' }}>{ev.sha256}</code>
                </li>
              ))}
            </ul>
          </div>

          {/* Signature Block */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px dashed var(--border-subtle)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid var(--text-muted)', width: '200px', height: '30px' }} />
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Signature of Investigating Officer (IO)
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid var(--text-muted)', width: '200px', height: '30px' }} />
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Superintendent of Police / Cyber Cell In-charge
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Update Status */}
      <Modal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        title={`Update Investigation Status: ${caseData.id}`}
        subtitle="Transition investigation progress"
      >
        <form onSubmit={handleStatusUpdate}>
          <div className="form-group">
            <label className="form-label">New Status</label>
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {CASE_STATUSES.map(stat => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Investigation Note</label>
            <textarea
              rows={3}
              className="form-textarea"
              placeholder="Record reason or operational update for this status change..."
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              required
            />
          </div>

          <div className="modal-footer" style={{ margin: '0 -24px -24px -24px' }}>
            <button type="button" onClick={() => setShowStatusModal(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Status
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL: Assign Officer */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title={`Reassign Investigating Officer: ${caseData.id}`}
      >
        <form onSubmit={handleAssignUpdate}>
          <div className="form-group">
            <label className="form-label">Choose Officer</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MOCK_INVESTIGATORS.map(inv => (
                <div
                  key={inv.id}
                  onClick={() => setSelectedOfficerId(inv.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: selectedOfficerId === inv.id ? 'rgba(0, 180, 216, 0.15)' : 'var(--bg-primary)',
                    border: '1px solid',
                    borderColor: selectedOfficerId === inv.id ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={inv.avatar} alt={inv.name} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                    <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>{inv.name}</span>
                  </div>
                  <span className="badge badge-cyan">{inv.rank.split('&')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '0 -24px -24px -24px' }}>
            <button type="button" onClick={() => setShowAssignModal(false)} className="btn btn-outline btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">Assign</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: Add Evidence */}
      <Modal
        isOpen={showAddEvidenceModal}
        onClose={() => setShowAddEvidenceModal(false)}
        title={`Deposit Digital Exhibit: ${caseData.id}`}
      >
        <form onSubmit={handleEvidenceSubmit}>
          <div className="form-group">
            <label className="form-label">Exhibit Title / Description</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Call Detail Records (CDR) Excel Dump"
              value={newEvidenceTitle}
              onChange={(e) => setNewEvidenceTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Exhibit Category</label>
            <select
              className="form-select"
              value={newEvidenceType}
              onChange={(e) => setNewEvidenceType(e.target.value)}
            >
              {EVIDENCE_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="modal-footer" style={{ margin: '0 -24px -24px -24px' }}>
            <button type="button" onClick={() => setShowAddEvidenceModal(false)} className="btn btn-outline btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">Deposit Exhibit</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: Add Timeline Note */}
      <Modal
        isOpen={showTimelineModal}
        onClose={() => setShowTimelineModal(false)}
        title={`Add Investigation Milestone: ${caseData.id}`}
      >
        <form onSubmit={handleTimelineSubmit}>
          <div className="form-group">
            <label className="form-label">Milestone Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Telecom CDR Analysis Identifies Suspect Location"
              value={timelineTitle}
              onChange={(e) => setTimelineTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Notes / Operational Action</label>
            <textarea
              rows={3}
              className="form-textarea"
              placeholder="Describe actions taken, evidence examined, coordination with banks or telecom providers..."
              value={timelineDesc}
              onChange={(e) => setTimelineDesc(e.target.value)}
              required
            />
          </div>

          <div className="modal-footer" style={{ margin: '0 -24px -24px -24px' }}>
            <button type="button" onClick={() => setShowTimelineModal(false)} className="btn btn-outline btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">Log Milestone</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
