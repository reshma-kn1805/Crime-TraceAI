import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Shield, User, HardDrive, ArrowRight, CornerDownLeft, X } from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { StatusBadge } from './StatusBadge';
import { SeverityBadge } from './SeverityBadge';
import { formatINR } from '../../utils/formatters';

export const GlobalSearchModal = ({ isOpen, onClose, onSelectCase }) => {
  const { cases, evidenceList } = useCases();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // trigger open in parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  // Search cases
  const matchedCases = cleanQ
    ? cases.filter(c =>
        c.id.toLowerCase().includes(cleanQ) ||
        c.title.toLowerCase().includes(cleanQ) ||
        c.category.toLowerCase().includes(cleanQ) ||
        c.victim.name.toLowerCase().includes(cleanQ) ||
        c.suspect.name.toLowerCase().includes(cleanQ) ||
        c.attackDetails.ipAddress.toLowerCase().includes(cleanQ) ||
        c.location.city.toLowerCase().includes(cleanQ) ||
        c.location.state.toLowerCase().includes(cleanQ)
      ).slice(0, 5)
    : cases.slice(0, 4);

  // Search evidence
  const matchedEvidence = cleanQ
    ? evidenceList.filter(e =>
        e.id.toLowerCase().includes(cleanQ) ||
        e.title.toLowerCase().includes(cleanQ) ||
        e.type.toLowerCase().includes(cleanQ) ||
        e.sha256.toLowerCase().includes(cleanQ)
      ).slice(0, 3)
    : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '680px', maxHeight: '80vh', padding: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-medium)',
          background: 'var(--bg-primary)'
        }}>
          <Search size={20} style={{ color: 'var(--accent-cyan)' }} />
          <input
            ref={inputRef}
            type="text"
            className="form-input"
            placeholder="Search Case ID, Victim, Suspect, IP, UPI, or Evidence (e.g. 'CT-2026', 'Jamtara', 'UPI')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '4px 0',
              fontSize: '1rem',
              boxShadow: 'none'
            }}
          />
          <button
            onClick={onClose}
            className="btn-icon btn-sm"
            style={{ border: 'none' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div style={{ padding: '16px 20px', maxHeight: '60vh', overflowY: 'auto' }}>
          {/* Cases Group */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              letterSpacing: '0.05em',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Shield size={14} /> Cybercrime Cases ({matchedCases.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {matchedCases.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCase(c.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--accent-cyan)'
                    }}>
                      {c.id}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                        {c.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {c.category} • {c.location.city}, {c.location.state} • Loss: {formatINR(c.victim.financialLoss)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <SeverityBadge severity={c.severity} />
                    <StatusBadge status={c.status} />
                    <ArrowRight size={14} style={{ color: 'var(--text-faint)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Group */}
          {matchedEvidence.length > 0 && (
            <div>
              <div style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                letterSpacing: '0.05em',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <HardDrive size={14} /> Digital Evidence Vault ({matchedEvidence.length})
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {matchedEvidence.map(e => (
                  <div
                    key={e.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>{e.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                        ID: {e.id} • Case: {e.caseId} • SHA-256: {e.sha256.slice(0, 16)}...
                      </div>
                    </div>
                    <span className="badge badge-purple">{e.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          background: 'var(--bg-primary)',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <span><kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 5px', borderRadius: '3px' }}>↑↓</kbd> Navigate</span>
            <span><kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 5px', borderRadius: '3px' }}>Enter</kbd> Select</span>
            <span><kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 5px', borderRadius: '3px' }}>ESC</kbd> Close</span>
          </div>
          <div>National Cybercrime Operational Index (1930 / I4C Sync)</div>
        </div>
      </div>
    </div>
  );
};
