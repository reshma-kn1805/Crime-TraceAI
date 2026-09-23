/**
 * CrimeTraceAI — Case Service (Spring Boot REST + Local Persistence Fallback)
 */

import { INITIAL_CASES } from '../data/mockCases';
import { api } from './api';

const STORAGE_KEY = 'crimetrace_cases_data';

export const caseService = {
  // Load all cases
  getAllCases: async () => {
    // Attempt backend first
    const backendData = await api.get('/cases');
    if (backendData && Array.isArray(backendData)) {
      return backendData;
    }

    // Fallback to local storage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CASES));
      return INITIAL_CASES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_CASES;
    }
  },

  // Get specific case by ID
  getCaseById: async (caseId) => {
    const backendData = await api.get(`/cases/${caseId}`);
    if (backendData && backendData.id) return backendData;

    const cases = await caseService.getAllCases();
    return cases.find(c => c.id === caseId) || null;
  },

  // Create new Cybercrime Case
  createCase: async (caseData) => {
    const cases = await caseService.getAllCases();
    
    // Generate new official Case ID: CT-2026-00XXX
    const nextNum = 124 + cases.length;
    const newId = `CT-2026-00${nextNum}`;
    
    const nowIST = new Date().toISOString();
    
    const newCase = {
      id: newId,
      title: caseData.title || 'Reported Cybercrime Incident',
      category: caseData.category || 'Financial Fraud (UPI/Net-Banking)',
      severity: caseData.severity || 'High',
      status: 'Reported',
      aiRiskLevel: caseData.aiRiskLevel || 'High',
      riskScore: caseData.riskScore || 75,
      createdAt: nowIST,
      updatedAt: nowIST,
      assignedInvestigator: caseData.assignedInvestigator || 'Inspector Reshma K.',
      investigatorId: caseData.investigatorId || 'INV-0428',
      department: caseData.department || 'Cyber Crime Police Station (CID)',
      location: {
        city: caseData.city || 'Bengaluru',
        state: caseData.state || 'Karnataka',
        lat: caseData.lat || 12.9716,
        lng: caseData.lng || 77.5946,
        station: caseData.station || 'Cyber Cell Headquarters'
      },
      victim: {
        name: caseData.victimName || 'Anonymous Citizen',
        phone: caseData.victimPhone || '+91 98000 00000',
        age: caseData.victimAge || 35,
        organization: caseData.victimOrg || 'Private Sector',
        accountAffected: caseData.accountAffected || 'Bank Account',
        financialLoss: Number(caseData.financialLoss) || 0,
        upiHandle: caseData.upiHandle || '—'
      },
      attackDetails: {
        vector: caseData.attackVector || 'Online Platform',
        method: caseData.method || caseData.description || 'Cybercrime incident reported.',
        platform: caseData.platform || 'Internet',
        url: caseData.url || '—',
        ipAddress: caseData.ipAddress || '—',
        deviceFingerprint: caseData.deviceInfo || '—',
        transactionRef: caseData.transactionRef || '—',
        suspectedMalware: caseData.suspectedMalware || '—',
        technicalIndicators: caseData.technicalDetails || '—'
      },
      suspect: {
        name: caseData.suspectName || 'Unknown Threat Actor',
        alias: caseData.suspectAlias || '—',
        contact: caseData.suspectContact || '—',
        knownIdentifiers: caseData.suspectIdentifiers || '—',
        associatedAccounts: caseData.suspectAccounts || '—',
        knownIPs: caseData.suspectIP ? [caseData.suspectIP] : [],
        notes: caseData.suspectNotes || 'Preliminary suspect details captured.'
      },
      evidenceCount: caseData.evidenceCount || 1,
      timeline: [
        {
          id: `TL-${Date.now()}`,
          title: 'Case Registered via CrimeTraceAI Portal',
          timestamp: nowIST,
          officer: caseData.assignedInvestigator || 'Inspector Reshma K.',
          description: `Formal case initiated. Complaint acknowledgment reference #NCRP-2026-${Math.floor(100000 + Math.random() * 900000)}.`
        }
      ],
      relatedCases: []
    };

    // Try backend
    await api.post('/cases', newCase);

    // Save locally
    const updated = [newCase, ...cases];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return newCase;
  },

  // Update Case Status
  updateStatus: async (caseId, newStatus, officerName = 'Inspector Reshma K.', note = '') => {
    const cases = await caseService.getAllCases();
    const nowIST = new Date().toISOString();
    
    const updated = cases.map(c => {
      if (c.id === caseId) {
        const newTimeline = [
          ...c.timeline,
          {
            id: `TL-${Date.now()}`,
            title: `Investigation Status Updated to "${newStatus}"`,
            timestamp: nowIST,
            officer: officerName,
            description: note || `Official status transition recorded in case ledger.`
          }
        ];
        return {
          ...c,
          status: newStatus,
          updatedAt: nowIST,
          timeline: newTimeline
        };
      }
      return c;
    });

    await api.put(`/cases/${caseId}/status`, { status: newStatus, note });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find(c => c.id === caseId);
  },

  // Assign Officer
  assignInvestigator: async (caseId, investigator) => {
    const cases = await caseService.getAllCases();
    const nowIST = new Date().toISOString();

    const updated = cases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          assignedInvestigator: investigator.name,
          investigatorId: investigator.id,
          department: investigator.department,
          updatedAt: nowIST,
          timeline: [
            ...c.timeline,
            {
              id: `TL-${Date.now()}`,
              title: `Investigator Assigned: ${investigator.name}`,
              timestamp: nowIST,
              officer: 'Superintendent of Police',
              description: `Case dossier transferred to ${investigator.rank} (${investigator.department}).`
            }
          ]
        };
      }
      return c;
    });

    await api.put(`/cases/${caseId}/assign`, { investigatorId: investigator.id });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find(c => c.id === caseId);
  },

  // Add timeline note
  addTimelineEntry: async (caseId, title, description, officerName = 'Inspector Reshma K.') => {
    const cases = await caseService.getAllCases();
    const nowIST = new Date().toISOString();

    const updated = cases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          updatedAt: nowIST,
          timeline: [
            ...c.timeline,
            {
              id: `TL-${Date.now()}`,
              title,
              timestamp: nowIST,
              officer: officerName,
              description
            }
          ]
        };
      }
      return c;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find(c => c.id === caseId);
  }
};
