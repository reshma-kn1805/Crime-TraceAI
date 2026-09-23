/**
 * CrimeTraceAI — Digital Evidence Service
 */

import { INITIAL_EVIDENCE } from '../data/mockEvidence';
import { api } from './api';

const EVIDENCE_STORAGE_KEY = 'crimetrace_evidence_data';

export const evidenceService = {
  getAllEvidence: async () => {
    const backendData = await api.get('/evidence');
    if (backendData && Array.isArray(backendData)) return backendData;

    const stored = localStorage.getItem(EVIDENCE_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(INITIAL_EVIDENCE));
      return INITIAL_EVIDENCE;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_EVIDENCE;
    }
  },

  getEvidenceByCaseId: async (caseId) => {
    const all = await evidenceService.getAllEvidence();
    return all.filter(e => e.caseId === caseId);
  },

  addEvidence: async (evidenceData) => {
    const all = await evidenceService.getAllEvidence();
    const nextNum = 890 + all.length + 1;
    const newId = `EVD-2026-0${nextNum}`;
    const nowIST = new Date().toISOString();

    const newEvidence = {
      id: newId,
      caseId: evidenceData.caseId || 'CT-2026-00124',
      title: evidenceData.title || 'Digital Exhibit',
      type: evidenceData.type || 'Screenshot',
      sizeBytes: evidenceData.sizeBytes || 1024000,
      fileSizeFormatted: evidenceData.fileSizeFormatted || '1.0 MB',
      sha256: evidenceData.sha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      uploadedAt: nowIST,
      uploadedBy: evidenceData.uploadedBy || 'Inspector Reshma K.',
      badgeId: evidenceData.badgeId || 'KA-CYB-2018-0428',
      custodyStatus: 'Secured in Cyber Vault (Chain of Custody Intact)',
      section65BCertificate: `CERT-65B-IN-2026-0${Math.floor(1000 + Math.random() * 9000)}`,
      tags: evidenceData.tags || ['Digital Evidence', 'Secured'],
      fileUrl: '#'
    };

    await api.post('/evidence', newEvidence);
    const updated = [newEvidence, ...all];
    localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(updated));
    return newEvidence;
  },

  verifyHash: (originalHash, candidateHash) => {
    if (!originalHash || !candidateHash) return false;
    return originalHash.trim().toLowerCase() === candidateHash.trim().toLowerCase();
  }
};
