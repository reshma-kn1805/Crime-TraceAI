import React, { useState } from 'react';
import { 
  Lightbulb, 
  Network, 
  AlertTriangle, 
  ExternalLink, 
  ShieldAlert, 
  TrendingUp, 
  Share2, 
  CheckCircle2, 
  Radio, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { useCases } from '../context/CaseContext';
import { formatINR } from '../utils/formatters';

export const InsightsPage = ({ onSelectCase }) => {
  const { cases } = useCases();

  // Active syndicated clusters
  const clusters = [
    {
      id: 'CLUSTER-2026-A',
      name: 'Jamtara-Karmatar Power Bill Smishing Syndicate',
      threatVector: 'Spoofed SMS Gateways & Malicious BESCOM/MSEB APKs',
      affectedStates: ['Karnataka', 'Maharashtra', 'Telangana'],
      casesCount: 14,
      totalLoss: 3850000,
      confidence: 96,
      sharedIOCs: [
        'C2 IP Block: 185.220.101.54:8080',
        'SMS Sender spoof: VK-BESCOM / VM-MSEB',
        'Beneficiary Bank of Baroda Mule Series 901200XXXX',
        'Remote Access Tool: AnyDesk & Hydra APK variant'
      ],
      investigativeAction: 'Issue coordinated multi-state arrest warrant to Jharkhand CID; Request NPCI freeze on 14 identified mule VPA handles.'
    },
    {
      id: 'CLUSTER-2026-B',
      name: 'Southeast Asian "Digital Arrest" & Fake CBI VoIP Ring',
      threatVector: 'Deepfake Skype Video Rooms & Forged Supreme Court Seals',
      affectedStates: ['Delhi NCR', 'Maharashtra', 'Gujarat'],
      casesCount: 9,
      totalLoss: 14200000,
      confidence: 94,
      sharedIOCs: [
        'VoIP Proxy Subnet: 194.26.29.0/24 (Cambodian Scam Compound)',
        'Mule Current Account: ICICI Bank Surat Branch (Apex Trading)',
        'Cryptocurrency USDT TRC-20 Layering via Binance P2P'
      ],
      investigativeAction: 'File INTERPOL Purple Notice via CBI Interpol NCB New Delhi; summon shell firm directors in Surat.'
    },
    {
      id: 'CLUSTER-2026-C',
      name: 'South Indian Sub-Registrar AePS Biometric Clone Nexus',
      threatVector: 'Stolen Land Registry Deeds & 3D Printed Silicone Fingerprints',
      affectedStates: ['Tamil Nadu', 'Andhra Pradesh', 'Karnataka'],
      casesCount: 8,
      totalLoss: 2100000,
      confidence: 91,
      sharedIOCs: [
        'Common Micro-ATM POS BC Terminal Agent ID 99281',
        'Consecutive ₹10,000 maximum daily cap withdrawals at 2:00 PM',
        'Harvested UIDAI document PDF timestamps matching local cyber cafe IP'
      ],
      investigativeAction: 'Enforce physical biometric terminal hardware lock; initiate forensic inspection of district land registry document portals.'
    }
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Lightbulb size={28} style={{ color: 'var(--accent-cyan)' }} />
            AI Syndicate Pattern Detection & Intelligence
          </h1>
          <p className="page-subtitle">
            Heuristic graph analytics correlating shared infrastructure, mule networks, and attack techniques across Indian police jurisdictions.
          </p>
        </div>
      </div>

      {/* Legal & Algorithmic Notice Banner */}
      <div style={{
        padding: '12px 18px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        fontSize: '0.8rem',
        color: '#FCD34D',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <AlertTriangle size={20} style={{ flexShrink: 0 }} />
        <span>
          <strong>Operational Intelligence Notice:</strong> Cluster detection represents statistical pattern linkage and shared technical IOCs. Algorithmic similarity does not constitute judicial proof of conspiracy until verified with CDR dumps, IP logs, and bank statements.
        </span>
      </div>

      {/* Syndicated Crime Clusters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
          Identified Cross-Jurisdiction Crime Clusters ({clusters.length})
        </div>

        {clusters.map((cluster) => (
          <div key={cluster.id} className="soc-card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.8rem' }}>
                    {cluster.id}
                  </span>
                  <span className="badge badge-high" style={{ fontSize: '0.68rem' }}>
                    {cluster.confidence}% Heuristic Match
                  </span>
                  <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                    {cluster.casesCount} Linked Cases
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {cluster.name}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Threat Vector: {cluster.threatVector}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FCA5A5', fontFamily: 'var(--font-mono)' }}>
                  {formatINR(cluster.totalLoss)}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Estimated Cumulative Loss</div>
              </div>
            </div>

            {/* Affected States & Shared IOCs */}
            <div className="grid-2" style={{ marginBottom: '16px' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Jurisdictional Spread (Indian States)
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {cluster.affectedStates.map((st, i) => (
                    <span key={i} className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                      <MapPin size={10} /> {st}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Shared Technical IOC Signatures
                </div>
                <ul style={{ paddingLeft: '16px', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {cluster.sharedIOCs.map((ioc, i) => (
                    <li key={i}>{ioc}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Action */}
            <div style={{
              background: 'rgba(0, 180, 216, 0.08)',
              border: '1px solid rgba(0, 180, 216, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div>
                <strong style={{ color: 'var(--accent-cyan)' }}>SOP Investigative Recommendation:</strong>{' '}
                <span style={{ color: 'var(--text-primary)' }}>{cluster.investigativeAction}</span>
              </div>

              <button
                onClick={() => onSelectCase(cases[0].id)}
                className="btn btn-primary btn-sm"
                style={{ fontSize: '0.74rem' }}
              >
                Inspect Linked Dossiers <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
