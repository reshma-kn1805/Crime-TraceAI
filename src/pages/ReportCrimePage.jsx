import React, { useState } from 'react';
import { 
  FilePlus, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  UploadCloud, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  Printer, 
  ExternalLink,
  Trash2,
  Lock
} from 'lucide-react';
import { useCases } from '../context/CaseContext';
import { useAuth } from '../context/AuthContext';
import { INDIAN_STATES_REGIONS } from '../data/indianGeoData';
import { CYBERCRIME_CATEGORIES, SEVERITY_LEVELS } from '../data/mockCases';
import { EVIDENCE_TYPES } from '../data/mockEvidence';
import { formatINR, formatIST } from '../utils/formatters';
import { generateSHA256 } from '../utils/hashGenerator';

export const ReportCrimePage = ({ onCaseSubmitted, onCancel }) => {
  const { createCase, addEvidence } = useCases();
  const { currentUser } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCase, setSubmittedCase] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Incident Info
    title: '',
    category: 'Financial Fraud (UPI/Net-Banking)',
    severity: 'High',
    incidentDate: new Date().toISOString().slice(0, 16),
    state: 'Karnataka',
    city: 'Bengaluru',
    station: 'Infantry Road Cyber Crime Police Station',
    platform: 'UPI / Mobile Banking',
    description: '',

    // Step 2: Victim Info
    victimName: '',
    victimPhone: '',
    victimAge: '',
    victimOrg: '',
    accountAffected: '',
    financialLoss: '',
    upiHandle: '',

    // Step 3: Attack Details
    attackVector: 'Phishing SMS / Fake Customer Support',
    method: '',
    suspectedTechnique: 'Credential Harvesting & Reverse APK Surcharge',
    url: '',
    ipAddress: '',
    deviceInfo: '',
    transactionRef: '',
    suspectedMalware: '',
    technicalDetails: '',

    // Step 5: Suspect Info
    suspectName: '',
    suspectAlias: '',
    suspectContact: '',
    suspectIdentifiers: '',
    suspectAccounts: '',
    suspectIP: '',
    suspectNotes: ''
  });

  // Step 4 Evidence Files
  const [evidenceFiles, setEvidenceFiles] = useState([
    {
      id: 'TEMP-EVD-1',
      name: 'Bank_Statement_Fraud_Debit.pdf',
      type: 'Transaction record',
      size: '1.2 MB',
      sha256: '8f9210948b8192a0194827c81920384756192837465019283746501928374650',
      date: formatIST(new Date(), false),
      status: 'Hash Verified'
    }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Mock file upload handler
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    for (const f of files) {
      const hash = await generateSHA256(f);
      const newFile = {
        id: `TEMP-EVD-${Date.now()}`,
        name: f.name,
        type: f.name.endsWith('.pdf') ? 'Document' : f.name.endsWith('.apk') ? 'Malware Binary' : 'Screenshot',
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
        sha256: hash,
        date: formatIST(new Date(), false),
        status: 'Hash Verified'
      };
      setEvidenceFiles(prev => [...prev, newFile]);
    }
  };

  const removeEvidence = (id) => {
    setEvidenceFiles(prev => prev.filter(e => e.id !== id));
  };

  // Submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Find state coordinates
      const stateObj = INDIAN_STATES_REGIONS.find(s => s.name.toLowerCase() === formData.state.toLowerCase());
      const lat = stateObj?.cities[0]?.lat || 12.9716;
      const lng = stateObj?.cities[0]?.lng || 77.5946;

      const created = await createCase({
        ...formData,
        lat,
        lng,
        evidenceCount: evidenceFiles.length
      });

      // Save attached evidence to central vault
      for (const ev of evidenceFiles) {
        await addEvidence({
          caseId: created.id,
          title: ev.name,
          type: ev.type,
          sha256: ev.sha256,
          fileSizeFormatted: ev.size
        });
      }

      setSubmittedCase(created);
    } catch (err) {
      console.error('Case submission error', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: 'Incident Information' },
    { num: 2, title: 'Victim Details' },
    { num: 3, title: 'Attack Details' },
    { num: 4, title: 'Digital Evidence' },
    { num: 5, title: 'Suspect Info' },
    { num: 6, title: 'Review & Submit' }
  ];

  // Confirmation Screen after Submission
  if (submittedCase) {
    return (
      <div className="page-wrapper" style={{ maxWidth: '850px' }}>
        <div className="soc-card" style={{ textAlign: 'center', padding: '40px 32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid var(--status-low)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            color: 'var(--status-low)'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Cybercrime Case Successfully Registered
          </h2>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Case docket has been securely recorded and dispatched into the active law-enforcement investigation queue.
          </p>

          {/* Docket Card */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            maxWidth: '540px',
            margin: '0 auto 30px auto',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Assigned Official Case ID:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '1.05rem' }}>
                {submittedCase.id}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Filing Timestamp (IST):</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {formatIST(submittedCase.createdAt, true)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Incident Category:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{submittedCase.category}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Jurisdiction Police Station:</span>
              <span style={{ color: 'var(--text-primary)' }}>{submittedCase.location.station} ({submittedCase.location.city})</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Financial Impact Reported:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                {formatINR(submittedCase.victim.financialLoss)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Initial Investigation Status:</span>
              <span className="badge badge-cyan">{submittedCase.status}</span>
            </div>
          </div>

          {/* National Cybercrime Portal Alignment Notice */}
          <div style={{
            background: 'rgba(0, 180, 216, 0.08)',
            border: '1px solid rgba(0, 180, 216, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 18px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            maxWidth: '620px',
            margin: '0 auto 28px auto',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textAlign: 'left'
          }}>
            <ShieldCheck size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
            <span>
              <strong>Statutory Compliance Note:</strong> This FIR dossier follows reporting standards aligned with India's <strong>National Cyber Crime Reporting Portal (cybercrime.gov.in)</strong> and the <strong>Indian Cyber Crime Coordination Centre (I4C)</strong> under Section 66/66C/66D of the Information Technology Act, 2000.
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button
              onClick={() => onCaseSubmitted(submittedCase.id)}
              className="btn btn-primary"
            >
              Open Case Investigation Workspace <ArrowRight size={16} />
            </button>
            <button
              onClick={() => window.print()}
              className="btn btn-secondary"
            >
              <Printer size={15} /> Print Registration Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ maxWidth: '960px' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FilePlus size={26} style={{ color: 'var(--accent-cyan)' }} />
            Register Cybercrime Incident (Multi-Step Wizard)
          </h1>
          <p className="page-subtitle">
            Formal law-enforcement intake following National Cyber Crime Reporting Portal protocol.
          </p>
        </div>

        <button onClick={onCancel} className="btn btn-outline btn-sm">
          Cancel & Return
        </button>
      </div>

      {/* Stepper Navigation */}
      <div className="stepper">
        {steps.map(s => {
          const isActive = currentStep === s.num;
          const isCompleted = currentStep > s.num;

          return (
            <div
              key={s.num}
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => currentStep > s.num && setCurrentStep(s.num)}
            >
              <div className="step-indicator">
                {isCompleted ? <CheckCircle2 size={18} /> : s.num}
              </div>
              <div className="step-title">{s.title}</div>
            </div>
          );
        })}
      </div>

      {/* Form Card */}
      <div className="soc-card">
        <form onSubmit={currentStep === 6 ? handleSubmit : (e) => { e.preventDefault(); setCurrentStep(prev => Math.min(6, prev + 1)); }}>
          
          {/* STEP 1: Incident Information */}
          {currentStep === 1 && (
            <div>
              <div className="soc-card-title" style={{ marginBottom: '16px' }}>
                Step 1 — Incident Overview & Classification
              </div>

              <div className="form-group">
                <label className="form-label">
                  Incident Title / Headline
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="e.g. Electricity Bill Disconnection Phishing & Malicious APK Surcharge Fraud"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Cybercrime Category
                    <span className="required">*</span>
                  </label>
                  <select
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {CYBERCRIME_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Incident Severity
                    <span className="required">*</span>
                  </label>
                  <select
                    name="severity"
                    className="form-select"
                    value={formData.severity}
                    onChange={handleChange}
                  >
                    {SEVERITY_LEVELS.map(sev => (
                      <option key={sev} value={sev}>{sev}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">
                    State / Union Territory
                    <span className="required">*</span>
                  </label>
                  <select
                    name="state"
                    className="form-select"
                    value={formData.state}
                    onChange={(e) => {
                      const selState = INDIAN_STATES_REGIONS.find(s => s.name === e.target.value);
                      setFormData(prev => ({
                        ...prev,
                        state: e.target.value,
                        city: selState?.cities[0]?.name || 'Bengaluru',
                        station: selState?.cities[0]?.hub || 'Cyber Police Station'
                      }));
                    }}
                  >
                    {INDIAN_STATES_REGIONS.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    City / Cyber Cell Jurisdiction
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-input"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Date & Time of Incident (IST)
                  </label>
                  <input
                    type="datetime-local"
                    name="incidentDate"
                    className="form-input"
                    value={formData.incidentDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Digital Platform Involved</label>
                <input
                  type="text"
                  name="platform"
                  className="form-input"
                  placeholder="e.g. WhatsApp, Telegram, Google Pay, SBI YONO, Android APK, Skype"
                  value={formData.platform}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Incident Description & Modus Operandi
                  <span className="required">*</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  className="form-textarea"
                  placeholder="Describe how the victim was contacted, threats issued, deceptive narratives, and sequence of events..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 2: Victim Information */}
          {currentStep === 2 && (
            <div>
              <div className="soc-card-title" style={{ marginBottom: '16px' }}>
                Step 2 — Victim & Financial Loss Details
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Victim Full Name
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="victimName"
                    className="form-input"
                    placeholder="e.g. Sunil R. Hegde"
                    value={formData.victimName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Indian Mobile Number (+91)
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="victimPhone"
                    className="form-input"
                    placeholder="+91 98450 12345"
                    value={formData.victimPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    name="victimAge"
                    className="form-input"
                    placeholder="e.g. 58"
                    value={formData.victimAge}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Profession / Organization</label>
                  <input
                    type="text"
                    name="victimOrg"
                    className="form-input"
                    placeholder="e.g. Retired Telecom Engineer"
                    value={formData.victimOrg}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Financial Loss (₹ INR)
                  </label>
                  <input
                    type="number"
                    name="financialLoss"
                    className="form-input"
                    placeholder="e.g. 245000"
                    value={formData.financialLoss}
                    onChange={handleChange}
                  />
                  {formData.financialLoss && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                      Formated: {formatINR(formData.financialLoss)}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Victim Bank Account / Card Number (Masked)</label>
                  <input
                    type="text"
                    name="accountAffected"
                    className="form-input"
                    placeholder="e.g. Canara Bank A/c No. XX8921"
                    value={formData.accountAffected}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Victim UPI VPA Handle</label>
                  <input
                    type="text"
                    name="upiHandle"
                    className="form-input"
                    placeholder="e.g. sunil.hegde@okaxis"
                    value={formData.upiHandle}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Attack Details */}
          {currentStep === 3 && (
            <div>
              <div className="soc-card-title" style={{ marginBottom: '16px' }}>
                Step 3 — Technical IOCs & Attack Vector
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Attack Vector</label>
                  <input
                    type="text"
                    name="attackVector"
                    className="form-input"
                    placeholder="e.g. SMS Smishing with Spoofed BESCOM Header"
                    value={formData.attackVector}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Suspected Technique (MITRE ATT&CK)</label>
                  <input
                    type="text"
                    name="suspectedTechnique"
                    className="form-input"
                    placeholder="e.g. T1566 Phishing, T1417 Input Capture"
                    value={formData.suspectedTechnique}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Malicious URL / Domain / Phishing Link</label>
                  <input
                    type="text"
                    name="url"
                    className="form-input"
                    placeholder="https://bescom-bill-update.online"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Suspected IP Address</label>
                  <input
                    type="text"
                    name="ipAddress"
                    className="form-input"
                    placeholder="e.g. 103.212.43.118"
                    value={formData.ipAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Transaction Reference (UPI UTR / Bank TXN / Wallet ID)</label>
                  <input
                    type="text"
                    name="transactionRef"
                    className="form-input"
                    placeholder="e.g. UPI/426819208392/HDFC"
                    value={formData.transactionRef}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Suspected Malware / APK Payload</label>
                  <input
                    type="text"
                    name="suspectedMalware"
                    className="form-input"
                    placeholder="e.g. Hydra Banking Trojan v3.1 / SpyLoan.apk"
                    value={formData.suspectedMalware}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Technical Forensic Details</label>
                <textarea
                  name="technicalDetails"
                  rows={3}
                  className="form-textarea"
                  placeholder="C2 IP, forwarding SMS port, Tor exit nodes, user agents, telecom IMEI headers..."
                  value={formData.technicalDetails}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* STEP 4: Evidence Upload */}
          {currentStep === 4 && (
            <div>
              <div className="soc-card-title" style={{ marginBottom: '16px' }}>
                Step 4 — Digital Evidence Seizure & Integrity Hashes
              </div>

              {/* Upload Dropzone */}
              <div style={{
                border: '2px dashed var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                padding: '30px 20px',
                textAlign: 'center',
                backgroundColor: 'var(--bg-secondary)',
                marginBottom: '20px'
              }}>
                <UploadCloud size={36} style={{ color: 'var(--accent-cyan)', margin: '0 auto 10px auto' }} />
                <div style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '4px' }}>
                  Upload Digital Evidence (Screenshots, Bank PDFs, PCAP Logs, APKs)
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  SHA-256 cryptographic hashes are automatically computed upon ingestion for Section 65B Indian Evidence Act compliance.
                </div>
                <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                  Browse Local Forensics Drive
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {/* Uploaded Evidence Table */}
              <div className="table-container">
                <table className="soc-table">
                  <thead>
                    <tr>
                      <th>Exhibit Name</th>
                      <th>Category</th>
                      <th>Size</th>
                      <th>SHA-256 Integrity Checksum</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evidenceFiles.map(ev => (
                      <tr key={ev.id}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{ev.name}</td>
                        <td><span className="badge badge-cyan">{ev.type}</span></td>
                        <td>{ev.size}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-cyan)' }}>
                          {ev.sha256.slice(0, 20)}...
                        </td>
                        <td><span className="badge badge-low">{ev.status}</span></td>
                        <td>
                          <button
                            type="button"
                            onClick={() => removeEvidence(ev.id)}
                            className="btn-icon btn-sm"
                            style={{ color: '#F87171', border: 'none' }}
                            title="Remove Exhibit"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STEP 5: Suspect Information */}
          {currentStep === 5 && (
            <div>
              <div className="soc-card-title" style={{ marginBottom: '16px' }}>
                Step 5 — Suspect Profile & Mule Account Intelligence
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Suspect Name / Known Identity</label>
                  <input
                    type="text"
                    name="suspectName"
                    className="form-input"
                    placeholder="e.g. Santosh Kumar Mondal or 'Unknown Caller'"
                    value={formData.suspectName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Alias / Handle / Telegram Username</label>
                  <input
                    type="text"
                    name="suspectAlias"
                    className="form-input"
                    placeholder="e.g. @Raju_Jamtara / CBI DIG Anupam"
                    value={formData.suspectAlias}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Suspect Contact Number(s)</label>
                  <input
                    type="text"
                    name="suspectContact"
                    className="form-input"
                    placeholder="e.g. +91 91234 56780, +855 92 841 029"
                    value={formData.suspectContact}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Beneficiary Mule Bank Account(s) / UPI VPAs</label>
                  <input
                    type="text"
                    name="suspectAccounts"
                    className="form-input"
                    placeholder="e.g. Bank of Baroda A/c 9012001928491, quickrefund99@ybl"
                    value={formData.suspectAccounts}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Hardware Identifiers (IMEI / MAC / Skype ID)</label>
                  <input
                    type="text"
                    name="suspectIdentifiers"
                    className="form-input"
                    placeholder="e.g. IMEI: 864209048123901"
                    value={formData.suspectIdentifiers}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Known Malicious IP Address</label>
                  <input
                    type="text"
                    name="suspectIP"
                    className="form-input"
                    placeholder="e.g. 103.212.43.118"
                    value={formData.suspectIP}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Investigator Notes on Syndicate / Gang</label>
                <textarea
                  name="suspectNotes"
                  rows={3}
                  className="form-textarea"
                  placeholder="Notes on suspected hub (Mewat, Jamtara, Southeast Asia cyber compound, call center)..."
                  value={formData.suspectNotes}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* STEP 6: Review & Final Submission */}
          {currentStep === 6 && (
            <div>
              <div className="soc-card-title" style={{ marginBottom: '16px' }}>
                Step 6 — Final Review & Statutory Case Registration
              </div>

              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#FFFFFF', marginBottom: '12px' }}>
                  {formData.title || 'Untitled Incident'}
                </div>

                <div className="grid-3" style={{ fontSize: '0.8rem', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Category:</span>{' '}
                    <strong>{formData.category}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Severity:</span>{' '}
                    <span className="badge badge-high">{formData.severity}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Location:</span>{' '}
                    <strong>{formData.city}, {formData.state}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Victim:</span>{' '}
                    <strong>{formData.victimName || 'Anonymous'}</strong> ({formData.victimPhone || 'N/A'})
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Financial Impact:</span>{' '}
                    <strong style={{ color: '#FCA5A5', fontFamily: 'var(--font-mono)' }}>
                      {formatINR(formData.financialLoss)}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Exhibits Attached:</span>{' '}
                    <strong>{evidenceFiles.length} item(s)</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                  <strong>Description:</strong> {formData.description || 'No description provided.'}
                </div>
              </div>

              <div style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0, 180, 216, 0.08)',
                border: '1px solid rgba(0, 180, 216, 0.25)',
                fontSize: '0.76rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px'
              }}>
                <ShieldCheck size={18} style={{ color: 'var(--accent-cyan)' }} />
                <span>
                  By proceeding, you certify this entry as an official law-enforcement case docket. An automated audit trail entry will be generated under your officer badge credentials.
                </span>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '20px',
            marginTop: '24px'
          }}>
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="btn btn-secondary btn-sm"
                >
                  <ArrowLeft size={14} /> Previous Step
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => alert('Draft saved to local workstation cache.')}
                className="btn btn-outline btn-sm"
              >
                <Save size={14} /> Save Draft
              </button>

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
                  className="btn btn-primary btn-sm"
                >
                  Next Step <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ backgroundColor: 'var(--status-low)' }}
                >
                  {isSubmitting ? 'Registering FIR Case...' : 'Submit Official Case'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
