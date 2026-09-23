import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_INVESTIGATORS } from '../data/mockInvestigators';
import { formatIST } from '../utils/formatters';

export const LoginPage = ({ onLoginSuccess }) => {
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('reshma.k@cyberpolice.gov.in');
  const [password, setPassword] = useState('CyberCell@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setErrorMsg('Please enter both official identifier and authorization credential.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(async () => {
      const res = await login(identifier, password, rememberMe);
      setIsLoading(false);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setErrorMsg(res.message || 'Authentication failed. Please verify credentials.');
      }
    }, 600);
  };

  const fillQuickCredentials = (officer) => {
    setIdentifier(officer.email);
    setPassword('CyberCell@2026');
    setErrorMsg('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: 'var(--bg-base)',
      color: 'var(--text-primary)'
    }}>
      {/* Left Column: Law Enforcement Platform Branding */}
      <div style={{
        flex: '1 1 50%',
        background: 'linear-gradient(135deg, #060B18 0%, #0A1128 50%, #0F1A36 100%)',
        borderRight: '1px solid var(--border-subtle)',
        padding: '60px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle cyber background grid */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(rgba(0, 180, 216, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }} />

        {/* Top Header */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: '#0B132B',
              border: '2px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <ShieldAlert size={26} style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                CrimeTrace<span style={{ color: 'var(--accent-cyan)' }}>AI</span>
              </h1>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                AI-Powered Cybercrime Investigation & Intelligence Platform
              </p>
            </div>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(0, 180, 216, 0.1)',
            border: '1px solid rgba(0, 180, 216, 0.3)',
            fontSize: '0.78rem',
            color: 'var(--accent-cyan)',
            marginBottom: '32px'
          }}>
            <ShieldCheck size={14} />
            <span>Authorized Law Enforcement & Cyber Cell Access Only</span>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '520px', marginBottom: '32px' }}>
            Empowering Cyber Crime Cells, State Police Specialized Units, and Central Agencies across India with machine learning crime classification, financial mule network tracing, and predictive threat analytics.
          </p>

          {/* Key Capabilities Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '480px' }}>
            {[
              { title: 'Supervised ML Cybercrime Classification', desc: 'Real-time categorization of phishing, UPI scams, and ransomware vectors' },
              { title: '1930 / I4C CFCFRMS Synchronization', desc: 'Golden Hour bank account freeze tracking & Section 91 CrPC notices' },
              { title: 'Digital Forensics Evidence Chain of Custody', desc: 'SHA-256 integrity hash verification and Section 65B Indian Evidence Act logging' }
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(15, 26, 54, 0.6)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <CheckCircle size={18} style={{ color: 'var(--accent-cyan)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{feature.title}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Legal Notice & IST Timestamp */}
        <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: 'var(--text-faint)' }}>
            <div>Aligned with IT Act 2000 (Sec 43, 66, 66C, 66D)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)' }}>
              <Clock size={13} /> Current Session Time: {formatIST(new Date(), false)}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Secure Login Card */}
      <div style={{
        flex: '1 1 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px 32px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Investigator Login
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Enter official credentials or select a demo personnel profile below.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--status-critical-bg)',
              border: '1px solid var(--status-critical-border)',
              color: '#FCA5A5',
              fontSize: '0.82rem',
              marginBottom: '20px'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Identifier */}
            <div className="form-group">
              <label className="form-label">
                Official Police Email / Officer Badge ID
                <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. reshma.k@cyberpolice.gov.in"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">
                Security Password / Passcode
                <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              marginBottom: '24px'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--accent-cyan)' }}
                />
                Remember terminal device
              </label>

              <a
                href="#forgot"
                onClick={(e) => { e.preventDefault(); alert('Please contact State Cyber Cell Nodal IT Administrator for smart card / 2FA token reset.'); }}
                style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
              style={{ width: '100%', padding: '12px', fontSize: '0.92rem' }}
            >
              {isLoading ? (
                <span>Validating Security Token...</span>
              ) : (
                <>
                  <span>Sign In to Cyber Cell</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins Section */}
          <div style={{ marginTop: '28px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
              marginBottom: '10px'
            }}>
              Quick Demo Personnel Login (1-Click Fill)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MOCK_INVESTIGATORS.slice(0, 3).map((officer) => (
                <button
                  key={officer.id}
                  type="button"
                  onClick={() => fillQuickCredentials(officer)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: identifier === officer.email ? 'rgba(0, 180, 216, 0.15)' : 'var(--bg-secondary)',
                    border: '1px solid',
                    borderColor: identifier === officer.email ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={officer.avatar}
                      alt={officer.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {officer.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {officer.rank.split('&')[0]} ({officer.city})
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                    {officer.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
