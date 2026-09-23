import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  RotateCcw, 
  BarChart, 
  Sliders, 
  Layers, 
  BookOpen,
  Scale
} from 'lucide-react';
import { predictionService } from '../services/predictionService';
import { formatINR, formatIST } from '../utils/formatters';
import { CYBERCRIME_CATEGORIES } from '../data/mockCases';
import { INDIAN_STATES_REGIONS } from '../data/indianGeoData';

export const PredictionPage = ({ onApplyToCase }) => {
  // Input features
  const [incidentTitle, setIncidentTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attackVector, setAttackVector] = useState('');
  const [platform, setPlatform] = useState('');
  const [financialLoss, setFinancialLoss] = useState('');
  const [state, setState] = useState('Karnataka');
  const [victimAge, setVictimAge] = useState(45);
  const [isCriticalInfra, setIsCriticalInfra] = useState(false);
  const [crossBorderSyndicate, setCrossBorderSyndicate] = useState(false);
  const [technicalIndicators, setTechnicalIndicators] = useState('');

  // Execution state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [categoryResult, setCategoryResult] = useState(null);
  const [riskResult, setRiskResult] = useState(null);
  const [analysisTimestamp, setAnalysisTimestamp] = useState(null);

  // Preset incident scenarios
  const presets = [
    {
      label: 'Digital Arrest Video Scam (₹15 Lakhs)',
      title: 'Fake CBI Skype Room Narcotics Extortion of Retired Teacher',
      desc: 'Victim placed under 48-hour continuous Skype surveillance by impersonators claiming FedEx contraband package. Demanded RTGS transfer for Supreme Court bail verification.',
      vector: 'VoIP Call / Skype Video Call Impersonation',
      platform: 'Skype / WhatsApp',
      loss: 1500000,
      state: 'Delhi NCR',
      age: 68,
      infra: false,
      crossBorder: true,
      ioc: 'Forged Supreme Court Seal, Cambodian VoIP proxy 194.26.29.112'
    },
    {
      label: 'BESCOM APK Phishing (₹2.45 Lakhs)',
      title: 'Urgent Electricity Power Cut SMS with Malicious APK Download',
      desc: 'Victim received SMS claiming electricity bill overdue with link to download BESCOM update. APK stole incoming OTP and debited Canara bank account via UPI.',
      vector: 'SMS Smishing with Spoofed Header',
      platform: 'Android APK / WhatsApp',
      loss: 245000,
      state: 'Karnataka',
      age: 52,
      infra: false,
      crossBorder: false,
      ioc: 'SMS Port 8080, C2 185.220.101.54, Mule UPI quickrefund@ybl'
    },
    {
      label: 'Hospital Infrastructure Ransomware (₹50 Lakhs)',
      title: 'ESXi Hypervisor Lockdown & Patient Record Encryption',
      desc: 'Compromised VPN gateway allowed lateral movement and deployment of LockBit 3.0 builder payload. 42 hospital virtual machines encrypted; demanded 10 BTC.',
      vector: 'CVE-2024-3400 Exploitation / RDP Brute Force',
      platform: 'VMware ESXi / Windows Server',
      loss: 5000000,
      state: 'Maharashtra',
      age: 40,
      infra: true,
      crossBorder: true,
      ioc: 'LockBit 3.0, BTC Wallet bc1q8p47w77m80g5a0jkl4n924p5qws2q3948sly8x, Tor exit node'
    },
    {
      label: 'Netbanking Corporate SIM Swap (₹8 Lakhs)',
      title: 'Fraudulent Telecom SIM Replacement & Corporate RTGS Account Takeover',
      desc: 'Suspect deactivated victim mobile number using forged Aadhaar at retail kiosk. Intercepted net-banking password reset OTPs at 2:00 AM and initiated RTGS to mule accounts.',
      vector: 'Unauthorized Physical SIM Swap',
      platform: 'Corporate Net-Banking / Telecom Store POS',
      loss: 800000,
      state: 'Maharashtra',
      age: 49,
      infra: false,
      crossBorder: false,
      ioc: 'Kiosk biometric bypass, Immediate 4-tier mule layer RTGS'
    }
  ];

  const loadPreset = (p) => {
    setIncidentTitle(p.title);
    setDescription(p.desc);
    setAttackVector(p.vector);
    setPlatform(p.platform);
    setFinancialLoss(p.loss);
    setState(p.state);
    setVictimAge(p.age);
    setIsCriticalInfra(p.infra);
    setCrossBorderSyndicate(p.crossBorder);
    setTechnicalIndicators(p.ioc);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setCategoryResult(null);
    setRiskResult(null);

    const [catRes, rskRes] = await Promise.all([
      predictionService.predictCategory({
        title: incidentTitle,
        description,
        attackVector,
        platform,
        financialLoss,
        technicalIndicators
      }),
      predictionService.predictRisk({
        category: '',
        financialLoss,
        victimAge,
        isCriticalInfra,
        crossBorderSyndicate,
        activeIOCs: technicalIndicators ? 4 : 1
      })
    ]);

    setCategoryResult(catRes);
    setRiskResult(rskRes);
    setAnalysisTimestamp(new Date().toISOString());
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setIncidentTitle('');
    setDescription('');
    setAttackVector('');
    setPlatform('');
    setFinancialLoss('');
    setTechnicalIndicators('');
    setCategoryResult(null);
    setRiskResult(null);
  };

  return (
    <div className="page-wrapper" style={{ maxWidth: '1200px' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Cpu size={28} style={{ color: 'var(--accent-cyan)' }} />
            AI Cybercrime Prediction & Risk Intelligence
          </h1>
          <p className="page-subtitle">
            Machine-learning models analyze historical cybercrime patterns to generate risk indicators and predictive insights for investigators.
          </p>
        </div>

        <button onClick={handleReset} className="btn btn-outline btn-sm">
          <RotateCcw size={14} /> Clear Parameters
        </button>
      </div>

      {/* Operational Disclaimer Alert */}
      <div style={{
        padding: '12px 18px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(0, 180, 216, 0.08)',
        border: '1px solid rgba(0, 180, 216, 0.25)',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <AlertCircle size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
        <span>
          <strong>Decision-Support Notice:</strong> Machine Learning inferences provide probabilistic decision support based on Indian Cybercrime Cell historical corpora. They are not deterministic proof and should guide, not replace, formal criminal procedure under the Indian Evidence Act.
        </span>
      </div>

      {/* Quick Scenario Preset Buttons */}
      <div className="soc-card" style={{ padding: '14px 20px', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Quick Load Investigational Scenario Presets (Indian Modus Operandi)
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => loadPreset(p)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.76rem' }}
            >
              <Sparkles size={12} style={{ color: 'var(--accent-cyan)' }} /> {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Input Form + Output Results */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>
        {/* Left Column: Feature Input Workbench */}
        <div className="soc-card">
          <div className="soc-card-title" style={{ marginBottom: '16px' }}>
            <Sliders size={16} style={{ color: 'var(--accent-cyan)' }} />
            Investigative Feature Parameters
          </div>

          <form onSubmit={handleAnalyze}>
            <div className="form-group">
              <label className="form-label">
                Incident Title / Modus Summary
                <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Fake CBI Skype Room Video Extortion of Senior Citizen"
                value={incidentTitle}
                onChange={(e) => setIncidentTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Narrative Modus Operandi & Technical Text
                <span className="required">*</span>
              </label>
              <textarea
                rows={4}
                className="form-textarea"
                placeholder="Enter incident narrative, keywords (e.g., UPI, AnyDesk, CBI, FedEx, Encrypted, SIM swap, Aadhaar, Telegram task)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Attack Vector</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. SMS Phishing / VoIP Skype"
                  value={attackVector}
                  onChange={(e) => setAttackVector(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Digital Platform</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. WhatsApp, Skype, Telegram, UPI"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Financial Loss (₹ INR)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 1500000"
                  value={financialLoss}
                  onChange={(e) => setFinancialLoss(e.target.value)}
                />
                {financialLoss && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                    Formated: {formatINR(financialLoss)}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Victim Age</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 68"
                  value={victimAge}
                  onChange={(e) => setVictimAge(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Technical Indicators & Forensic Clues</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. C2 IP, Tor Exit, Malicious APK name, Beneficiary VPA"
                value={technicalIndicators}
                onChange={(e) => setTechnicalIndicators(e.target.value)}
              />
            </div>

            {/* Checkbox toggles */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isCriticalInfra}
                  onChange={(e) => setIsCriticalInfra(e.target.checked)}
                  style={{ accentColor: 'var(--accent-cyan)' }}
                />
                Critical National Infrastructure / Hospital Target
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={crossBorderSyndicate}
                  onChange={(e) => setCrossBorderSyndicate(e.target.checked)}
                  style={{ accentColor: 'var(--accent-cyan)' }}
                />
                Transnational / Southeast Asian Syndicate Signals
              </label>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              {isAnalyzing ? (
                <span>Executing Dual ML Classification Models...</span>
              ) : (
                <>
                  <Sparkles size={16} /> Run Case Classification & Risk Engine
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Dual Model Results & Explainable AI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {categoryResult && riskResult ? (
            <>
              {/* MODEL 1: Category Prediction */}
              <div className="soc-card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span className="badge badge-cyan" style={{ marginBottom: '6px', fontSize: '0.68rem' }}>
                      ML MODEL 1: SUPERVISED CLASSIFIER
                    </span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {categoryResult.predictedCategory}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                      {categoryResult.confidence}%
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Confidence Score</div>
                  </div>
                </div>

                {/* Model Metadata */}
                <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px', marginBottom: '12px' }}>
                  Model: {categoryResult.modelInfo.modelName} • Precision: {categoryResult.modelInfo.precision} • Inference: {categoryResult.modelInfo.latencyMs}ms
                </div>

                {/* Top Contributing Feature Factors (XAI) */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Explainable AI (XAI) — Key Contributing Modus Factors:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {categoryResult.contributingFactors.map((f, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: '4px' }}>
                        <span>{f.feature}</span>
                        <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{f.weight}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MODEL 2: Case Risk & Priority Classifier */}
              <div className="soc-card" style={{
                borderLeft: `4px solid ${riskResult.riskLevel === 'Critical' ? 'var(--status-critical)' : riskResult.riskLevel === 'High' ? 'var(--status-high)' : 'var(--accent-cyan)'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span className="badge badge-purple" style={{ marginBottom: '6px', fontSize: '0.68rem' }}>
                      ML MODEL 2: RISK & PRIORITY CLASSIFIER
                    </span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Risk Assessment:</span>
                      <span className={`badge ${riskResult.riskLevel === 'Critical' ? 'badge-critical' : riskResult.riskLevel === 'High' ? 'badge-high' : 'badge-low'}`} style={{ fontSize: '0.85rem' }}>
                        {riskResult.riskLevel} ({riskResult.riskScore}/100)
                      </span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {riskResult.confidence}%
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Probability Index</div>
                  </div>
                </div>

                <div style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '14px'
                }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Recommended Operational Priority:
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-cyan)', marginTop: '2px' }}>
                    {riskResult.recommendedPriority}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {riskResult.goldenHourAction}
                  </div>
                </div>

                {/* Statutory SOP Checklist */}
                <div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Recommended Statutory SOP Checklist:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {riskResult.sopChecklist.map((sop, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={13} style={{ color: 'var(--status-low)', flexShrink: 0 }} />
                        <span>{sop}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '14px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', fontSize: '0.72rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                  Inference Timestamp: {formatIST(analysisTimestamp, true)}
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="soc-card" style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--text-muted)' }}>
              <Cpu size={48} style={{ color: 'var(--border-bright)', margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                AI Prediction Engine Standing By
              </h3>
              <p style={{ fontSize: '0.82rem', maxWidth: '380px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
                Select a preset scenario above or enter case features on the left to execute dual machine-learning classification and priority assessment.
              </p>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                Trained on 50,000+ Indian Cybercrime Incidents
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
