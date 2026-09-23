import React, { useState } from 'react';
import { 
  HardDrive, 
  Search, 
  Filter, 
  UploadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck, 
  Hash, 
  AlertTriangle,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useCases } from '../context/CaseContext';
import { EVIDENCE_TYPES } from '../data/mockEvidence';
import { formatISTDate } from '../utils/formatters';
import { Modal } from '../components/common/Modal';
import { generateSHA256 } from '../utils/hashGenerator';

export const EvidencePage = ({ onSelectCase }) => {
  const { evidenceList, addEvidence } = useCases();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // Verify Hash Tool Modal
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [targetEvidence, setTargetEvidence] = useState(null);
  const [candidateHash, setCandidateHash] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  // Upload Evidence Modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState('Screenshot');
  const [uploadCaseId, setUploadCaseId] = useState('CT-2026-00124');

  // Filter evidence
  const filteredEvidence = evidenceList.filter(e => {
    const term = searchTerm.toLowerCase().trim();
    const matchTerm = !term || (
      e.id.toLowerCase().includes(term) ||
      e.title.toLowerCase().includes(term) ||
      e.caseId.toLowerCase().includes(term) ||
      e.sha256.toLowerCase().includes(term)
    );
    const matchType = selectedType === 'All' || e.type === selectedType;
    return matchTerm && matchType;
  });

  // Verify hash execution
  const handleVerify = (e) => {
    e.preventDefault();
    if (!targetEvidence || !candidateHash) return;

    const matches = targetEvidence.sha256.trim().toLowerCase() === candidateHash.trim().toLowerCase();
    setVerifyResult(matches ? 'MATCH' : 'MISMATCH');
  };

  // Upload exhibit
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const hash = await generateSHA256(uploadTitle + Date.now());
    await addEvidence({
      caseId: uploadCaseId,
      title: uploadTitle,
      type: uploadType,
      sha256: hash,
      fileSizeFormatted: '3.6 MB'
    });
    setShowUploadModal(false);
    setUploadTitle('');
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <HardDrive size={28} style={{ color: 'var(--accent-cyan)' }} />
            Digital Evidence Management & Forensics Vault
          </h1>
          <p className="page-subtitle">
            Cryptographic SHA-256 chain of custody and Section 65B Indian Evidence Act exhibit storage.
          </p>
        </div>

        <button onClick={() => setShowUploadModal(true)} className="btn btn-primary btn-sm">
          <Plus size={15} /> Deposit Digital Exhibit
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="soc-card" style={{ padding: '14px 18px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="input-with-icon" style={{ flex: '1 1 300px' }}>
            <Search size={16} className="input-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Search by Exhibit ID, Title, Case ID, or SHA-256 Hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="form-select"
            style={{ width: 'auto', flex: '1 1 180px' }}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All Exhibit Types</option>
            {EVIDENCE_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Evidence Table */}
      <div className="table-container">
        <table className="soc-table">
          <thead>
            <tr>
              <th>Exhibit ID</th>
              <th>Case Docket</th>
              <th>Exhibit Title & Forensic Details</th>
              <th>Type</th>
              <th>File Size</th>
              <th>SHA-256 Cryptographic Checksum</th>
              <th>Seizure Date (IST)</th>
              <th>Chain of Custody</th>
              <th style={{ textAlign: 'right' }}>Integrity Check</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvidence.map(ev => (
              <tr key={ev.id}>
                {/* Exhibit ID */}
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {ev.id}
                </td>

                {/* Case Docket */}
                <td>
                  <span
                    onClick={() => onSelectCase(ev.caseId)}
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline' }}
                    title="View Associated Case"
                  >
                    {ev.caseId}
                  </span>
                </td>

                {/* Title */}
                <td style={{ maxWidth: '280px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{ev.title}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Deposited by: {ev.uploadedBy} ({ev.badgeId || 'KA-CYB-001'})
                  </div>
                </td>

                {/* Type */}
                <td>
                  <span className="badge badge-purple">{ev.type}</span>
                </td>

                {/* Size */}
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                  {ev.fileSizeFormatted}
                </td>

                {/* SHA-256 */}
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)' }} title={ev.sha256}>
                  {ev.sha256.slice(0, 18)}...
                </td>

                {/* Date */}
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}>
                  {formatISTDate(ev.uploadedAt)}
                </td>

                {/* Custody */}
                <td>
                  <span className="badge badge-low" style={{ fontSize: '0.68rem' }}>
                    <ShieldCheck size={11} /> Intact (Sec 65B)
                  </span>
                </td>

                {/* Verify Button */}
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => {
                      setTargetEvidence(ev);
                      setCandidateHash('');
                      setVerifyResult(null);
                      setShowVerifyModal(true);
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                  >
                    <Hash size={12} /> Verify Hash
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verify Hash Modal */}
      <Modal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        title="Forensic SHA-256 Hash Integrity Verification"
        subtitle="Verify bitstream exhibit integrity against court-admissible original checksum"
      >
        {targetEvidence && (
          <form onSubmit={handleVerify}>
            <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Exhibit ID & Title:</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#FFFFFF' }}>{targetEvidence.id} — {targetEvidence.title}</div>
              
              <div style={{ marginTop: '8px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>Official Master Checksum:</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent-cyan)', wordBreak: 'break-all' }}>
                {targetEvidence.sha256}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Paste Candidate Hash to Verify:</label>
              <input
                type="text"
                className="form-input"
                placeholder="Paste computed SHA-256 hash here..."
                value={candidateHash}
                onChange={(e) => setCandidateHash(e.target.value)}
                required
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              />
            </div>

            <button
              type="button"
              onClick={() => setCandidateHash(targetEvidence.sha256)}
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.74rem', cursor: 'pointer', marginBottom: '14px', display: 'block' }}
            >
              [Auto-Fill Correct Hash for Verification Demo]
            </button>

            {verifyResult && (
              <div style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: verifyResult === 'MATCH' ? 'var(--status-low-bg)' : 'var(--status-critical-bg)',
                border: `1px solid ${verifyResult === 'MATCH' ? 'var(--status-low-border)' : 'var(--status-critical-border)'}`,
                color: verifyResult === 'MATCH' ? '#6EE7B7' : '#FCA5A5',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                {verifyResult === 'MATCH' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                <div>
                  <strong>{verifyResult === 'MATCH' ? 'INTEGRITY VERIFIED 100%' : 'INTEGRITY FAILURE / HASH MISMATCH'}</strong>
                  <div style={{ fontSize: '0.74rem', marginTop: '2px' }}>
                    {verifyResult === 'MATCH'
                      ? 'Exhibit bitstream perfectly matches master forensic seizure record. Section 65B Certificate remains valid.'
                      : 'Bitstream does not match original exhibit. Possible file tampering, corruption, or invalid input.'}
                  </div>
                </div>
              </div>
            )}

            <div className="modal-footer" style={{ margin: '0 -24px -24px -24px' }}>
              <button type="button" onClick={() => setShowVerifyModal(false)} className="btn btn-outline btn-sm">
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Run Checksum Comparison
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Upload Exhibit Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Deposit Digital Exhibit into Central Vault"
        subtitle="Ingest forensically secured file with automatic SHA-256 calculation"
      >
        <form onSubmit={handleUploadSubmit}>
          <div className="form-group">
            <label className="form-label">Exhibit Title / File Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Wireshark_Packet_Capture_Telegram_C2.pcapng"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Associated Case Docket ID</label>
              <input
                type="text"
                className="form-input"
                value={uploadCaseId}
                onChange={(e) => setUploadCaseId(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Exhibit Classification</label>
              <select
                className="form-select"
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
              >
                {EVIDENCE_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '0 -24px -24px -24px' }}>
            <button type="button" onClick={() => setShowUploadModal(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Ingest & Hash
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
