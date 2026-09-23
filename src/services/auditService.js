/**
 * CrimeTraceAI — Audit Service
 */

import { INITIAL_AUDIT_LOGS } from '../data/mockAuditLogs';
import { api } from './api';

const AUDIT_STORAGE_KEY = 'crimetrace_audit_logs';

export const auditService = {
  getLogs: async () => {
    const backendData = await api.get('/audit-logs');
    if (backendData && Array.isArray(backendData)) return backendData;

    const stored = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(INITIAL_AUDIT_LOGS));
      return INITIAL_AUDIT_LOGS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  },

  logAction: async ({ user, badgeId, action, caseId = 'SYSTEM', details, ipAddress = '10.24.110.42 (Active Session)' }) => {
    const logs = await auditService.getLogs();
    const newLog = {
      id: `AUD-${Math.floor(90000 + Math.random() * 9999)}`,
      user: user || 'Inspector Reshma K.',
      badgeId: badgeId || 'KA-CYB-2018-0428',
      action,
      caseId,
      details,
      timestamp: new Date().toISOString(),
      ipAddress,
      status: 'SUCCESS'
    };

    await api.post('/audit-logs', newLog);
    const updated = [newLog, ...logs];
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
    return newLog;
  }
};
