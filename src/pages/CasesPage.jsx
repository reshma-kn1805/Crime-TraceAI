import React, { useState } from 'react';
import { 
  FolderLock, 
  Search, 
  Filter, 
  Download, 
  PlusCircle, 
  ExternalLink, 
  Edit3, 
  UserPlus, 
  CheckCircle,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { useCases } from '../context/CaseContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { RiskBadge } from '../components/common/RiskBadge';
import { Modal } from '../components/common/Modal';
import { CYBERCRIME_CATEGORIES, CASE_STATUSES, SEVERITY_LEVELS } from '../data/mockCases';
import { MOCK_INVESTIGATORS } from '../data/mockInvestigators';
import { INDIAN_STATES_REGIONS } from '../data/indianGeoData';
import { formatISTDate, formatINR } from '../utils/formatters';

export const CasesPage = ({
  onSelectCase,
  onNavigateReport
}) => {
  const { cases, updateCaseStatus, assignOfficer } = useCases();
  const { currentUser } = useAuth();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');

  // Modals state
  const [statusModalCase, setStatusModalCase] = useState(null);
  const [newStatus, setNewStatus] = useState('Under Investigation');
  const [statusNote, setStatusNote] = useState('');

  const [assignModalCase, setAssignModalCase] = useState(null);
  const [selectedOfficerId, setSelectedOfficerId] = useState(MOCK_INVESTIGATORS[0].id);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter logic
  const filteredCases = cases.filter(c => {
    // Search
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term || (
      c.id.toLowerCase().includes(term) ||
      c.title.toLowerCase().includes(term) ||
      c.victim.name.toLowerCase().includes(term) ||
      c.suspect.name.toLowerCase().includes(term) ||
      c.assignedInvestigator.toLowerCase().includes(term) ||
      c.location.city.toLowerCase().includes(term) ||
      c.attackDetails.ipAddress.toLowerCase().includes(term) ||
      c.attackDetails.transactionRef.toLowerCase().includes(term)
    );

    // Filters
    const matchesCat = categoryFilter === 'All' || c.category === categoryFilter;
    const matchesSev = severityFilter === 'All' || c.severity === severityFilter;
    const matchesStat = statusFilter === 'All' || c.status === statusFilter;
    const matchesState = stateFilter === 'All' || c.location.state === stateFilter;
    const matchesRisk = riskFilter === 'All' || c.aiRiskLevel === riskFilter;

    return matchesSearch && matchesCat && matchesSev && matchesStat && matchesState && matchesRisk;
  });

  const totalPages = Math.ceil(filteredCases.length / pageSize) || 1;
  const paginatedCases = filteredCases.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Case ID', 'Title', 'Category', 'Severity', 'Status', 'AI Risk', 'Loss (INR)', 'City', 'State', 'Investigator', 'Created Date'];
    const rows = filteredCases.map(c => [
      c.id,
      `"${c.title.replace(/"/g, '""')}"`,
      c.category,
      c.severity,
      c.status,
      c.aiRiskLevel,
      c.victim.financialLoss,
      c.location.city,
      c.location.state,
      `"${c.assignedInvestigator}"`,
      formatISTDate(c.createdAt)
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CrimeTraceAI_Cases_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status update submit
  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    if (!statusModalCase) return;
    await updateCaseStatus(statusModalCase.id, newStatus, statusNote);
    setStatusModalCase(null);
    setStatusNote('');
  };

  // Officer assignment submit
  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!assignModalCase) return;
    const officer = MOCK_INVESTIGATORS.find(i => i.id === selectedOfficerId);
    if (officer) {
      await assignOfficer(assignModalCase.id, officer);
    }
    setAssignModalCase(null);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FolderLock size={26} style={{ color: 'var(--accent-cyan)' }} />
            Cybercrime Case Management Directory
          </h1>
          <p className="page-subtitle">
            Comprehensive repository of registered incidents, active forensic tracking, and legal processing.
          </p>
        </div>

        <div className="page-actions">
          <button onClick={handleExportCSV} className="btn btn-secondary btn-sm">
            <FileSpreadsheet size={15} /> Export CSV
          </button>
          <button onClick={onNavigateReport} className="btn btn-primary btn-sm">
            <PlusCircle size={15} /> Register New Case
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="soc-card" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Bar */}
          <div className="input-with-icon" style={{ flex: '1 1 300px' }}>
            <Search size={16} className="input-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Search by Case ID, victim name, suspect alias, IP, UPI VPA, or city..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          {/* Category Filter */}
          <select
            className="form-select"
            style={{ width: 'auto', flex: '1 1 180px' }}
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Categories</option>
            {CYBERCRIME_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="form-select"
            style={{ width: 'auto', flex: '1 1 150px' }}
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Statuses</option>
            {CASE_STATUSES.map(stat => (
              <option key={stat} value={stat}>{stat}</option>
            ))}
          </select>

          {/* Severity Filter */}
          <select
            className="form-select"
            style={{ width: 'auto', flex: '1 1 130px' }}
            value={severityFilter}
            onChange={(e) => { setSeverityFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Severities</option>
            {SEVERITY_LEVELS.map(sev => (
              <option key={sev} value={sev}>{sev}</option>
            ))}
          </select>

          {/* State Filter */}
          <select
            className="form-select"
            style={{ width: 'auto', flex: '1 1 150px' }}
            value={stateFilter}
            onChange={(e) => { setStateFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All States</option>
            {INDIAN_STATES_REGIONS.map(s => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>

          {/* Reset button */}
          {(searchTerm || categoryFilter !== 'All' || severityFilter !== 'All' || statusFilter !== 'All' || stateFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
                setSeverityFilter('All');
                setStatusFilter('All');
                setStateFilter('All');
                setRiskFilter('All');
                setCurrentPage(1);
              }}
              className="btn btn-outline btn-sm"
              title="Clear All Filters"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {/* Count summary bar */}
        <div style={{
          marginTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.76rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredCases.length}</strong> matching case record(s)
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span>Quick Risk:</span>
            {['Critical', 'High', 'Medium'].map(r => (
              <span
                key={r}
                onClick={() => { setRiskFilter(riskFilter === r ? 'All' : r); setCurrentPage(1); }}
                style={{
                  cursor: 'pointer',
                  color: riskFilter === r ? 'var(--accent-cyan)' : 'var(--text-faint)',
                  textDecoration: riskFilter === r ? 'underline' : 'none'
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Cases Table */}
      <div className="table-container">
        <table className="soc-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Incident Title & Category</th>
              <th>Victim / Target</th>
              <th>Loss (INR)</th>
              <th>Jurisdiction</th>
              <th>Severity</th>
              <th>Status</th>
              <th>AI Risk</th>
              <th>Assigned Officer</th>
              <th>Registered (IST)</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCases.length === 0 ? (
              <tr>
                <td colSpan={11} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No cybercrime cases match the active search/filter criteria.
                </td>
              </tr>
            ) : (
              paginatedCases.map(c => (
                <tr key={c.id}>
                  {/* Case ID */}
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {c.id}
                  </td>

                  {/* Title & Category */}
                  <td style={{ maxWidth: '240px' }}>
                    <div
                      onClick={() => onSelectCase(c.id)}
                      style={{ fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      title={c.title}
                    >
                      {c.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {c.category}
                    </div>
                  </td>

                  {/* Victim */}
                  <td>
                    <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {c.victim.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)' }}>
                      {c.victim.phone}
                    </div>
                  </td>

                  {/* Financial Loss */}
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {formatINR(c.victim.financialLoss)}
                  </td>

                  {/* Jurisdiction */}
                  <td>
                    <div style={{ fontSize: '0.8rem' }}>{c.location.city}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)' }}>{c.location.state}</div>
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

                  {/* Assigned Officer */}
                  <td style={{ fontSize: '0.8rem' }}>
                    {c.assignedInvestigator}
                  </td>

                  {/* Date */}
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    {formatISTDate(c.createdAt)}
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => onSelectCase(c.id)}
                        className="btn-icon btn-sm"
                        title="Open Case Dossier Workspace"
                      >
                        <ExternalLink size={13} />
                      </button>
                      <button
                        onClick={() => { setStatusModalCase(c); setNewStatus(c.status); }}
                        className="btn-icon btn-sm"
                        title="Update Investigation Status"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => { setAssignModalCase(c); }}
                        className="btn-icon btn-sm"
                        title="Assign Investigating Officer"
                      >
                        <UserPlus size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          padding: '0 8px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="btn btn-outline btn-sm"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                style={{ minWidth: '32px' }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-outline btn-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* MODAL 1: Update Status Modal */}
      <Modal
        isOpen={!!statusModalCase}
        onClose={() => setStatusModalCase(null)}
        title={`Update Status: ${statusModalCase?.id}`}
        subtitle="Transition investigation lifecycle state in official ledger"
      >
        <form onSubmit={handleStatusSubmit}>
          <div className="form-group">
            <label className="form-label">New Investigation Status</label>
            <select
              className="form-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {CASE_STATUSES.map(stat => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Official Investigation Note / Milestone Reason</label>
            <textarea
              rows={3}
              className="form-textarea"
              placeholder="e.g. Bank nodal officer confirmed lien placement on beneficiary account. Section 91 CrPC notice dispatched."
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              required
            />
          </div>

          <div className="modal-footer" style={{ margin: '0 -24px -24px -24px', borderBottomLeftRadius: 'var(--radius-xl)', borderBottomRightRadius: 'var(--radius-xl)' }}>
            <button type="button" onClick={() => setStatusModalCase(null)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Commit Status Update
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: Assign Officer Modal */}
      <Modal
        isOpen={!!assignModalCase}
        onClose={() => setAssignModalCase(null)}
        title={`Assign Officer: ${assignModalCase?.id}`}
        subtitle="Transfer or assign case responsibility to a specialized investigator"
      >
        <form onSubmit={handleAssignSubmit}>
          <div className="form-group">
            <label className="form-label">Select Law Enforcement Personnel</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MOCK_INVESTIGATORS.map(inv => (
                <div
                  key={inv.id}
                  onClick={() => setSelectedOfficerId(inv.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: selectedOfficerId === inv.id ? 'rgba(0, 180, 216, 0.15)' : 'var(--bg-primary)',
                    border: '1px solid',
                    borderColor: selectedOfficerId === inv.id ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={inv.avatar}
                      alt={inv.name}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>{inv.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {inv.rank} • {inv.department}
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-cyan">{inv.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '0 -24px -24px -24px', borderBottomLeftRadius: 'var(--radius-xl)', borderBottomRightRadius: 'var(--radius-xl)' }}>
            <button type="button" onClick={() => setAssignModalCase(null)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Transfer Case Docket
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
