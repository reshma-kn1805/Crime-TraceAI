/**
 * CrimeTraceAI — Global Cases & Evidence State Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { caseService } from '../services/caseService';
import { evidenceService } from '../services/evidenceService';
import { auditService } from '../services/auditService';
import { INITIAL_NOTIFICATIONS } from '../data/mockNotifications';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
  const [cases, setCases] = useState([]);
  const [evidenceList, setEvidenceList] = useState([]);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    severity: 'All',
    status: 'All',
    state: 'All',
    riskLevel: 'All'
  });

  const { currentUser } = useAuth();
  const { addToast } = useToast();

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [loadedCases, loadedEvidence] = await Promise.all([
          caseService.getAllCases(),
          evidenceService.getAllEvidence()
        ]);
        setCases(loadedCases);
        setEvidenceList(loadedEvidence);
      } catch (err) {
        console.error('Failed to load initial crime data', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Create Case
  const createCase = async (formData) => {
    try {
      const newCase = await caseService.createCase({
        ...formData,
        assignedInvestigator: currentUser?.name || 'Inspector Reshma K.',
        investigatorId: currentUser?.id || 'INV-0428',
        department: currentUser?.department || 'Cyber Crime Police Station'
      });

      setCases(prev => [newCase, ...prev]);

      await auditService.logAction({
        user: currentUser?.name || 'Officer',
        badgeId: currentUser?.badgeNumber || 'IN-CYB-001',
        action: 'New Cybercrime Case Created',
        caseId: newCase.id,
        details: `Registered FIR for ${newCase.category} in ${newCase.location.city}, ${newCase.location.state}.`
      });

      addToast({
        type: 'success',
        title: 'Case Registered Successfully',
        message: `Official Case ${newCase.id} created and logged in Cyber Cell records.`
      });

      return newCase;
    } catch (err) {
      addToast({
        type: 'critical',
        title: 'Registration Error',
        message: 'Failed to record case in database. Please check inputs.'
      });
      throw err;
    }
  };

  // Update Status
  const updateCaseStatus = async (caseId, newStatus, note) => {
    try {
      const updatedCase = await caseService.updateStatus(
        caseId,
        newStatus,
        currentUser?.name || 'Inspector Reshma K.',
        note
      );

      setCases(prev => prev.map(c => c.id === caseId ? updatedCase : c));

      await auditService.logAction({
        user: currentUser?.name || 'Officer',
        badgeId: currentUser?.badgeNumber || 'IN-CYB-001',
        action: 'Case Status Updated',
        caseId,
        details: `Status set to ${newStatus}. Note: ${note || 'Status updated.'}`
      });

      addToast({
        type: 'info',
        title: 'Status Updated',
        message: `Case ${caseId} status updated to "${newStatus}".`
      });

      return updatedCase;
    } catch (err) {
      console.error(err);
    }
  };

  // Assign Officer
  const assignOfficer = async (caseId, officer) => {
    try {
      const updated = await caseService.assignInvestigator(caseId, officer);
      setCases(prev => prev.map(c => c.id === caseId ? updated : c));

      await auditService.logAction({
        user: currentUser?.name || 'Officer',
        badgeId: currentUser?.badgeNumber || 'IN-CYB-001',
        action: 'Investigator Reassigned',
        caseId,
        details: `Assigned to ${officer.name} (${officer.department}).`
      });

      addToast({
        type: 'success',
        title: 'Officer Assigned',
        message: `Case ${caseId} transferred to ${officer.name}.`
      });

      return updated;
    } catch (err) {
      console.error(err);
    }
  };

  // Add Evidence
  const addEvidence = async (evidenceData) => {
    try {
      const newEvd = await evidenceService.addEvidence({
        ...evidenceData,
        uploadedBy: currentUser?.name || 'Inspector Reshma K.',
        badgeId: currentUser?.badgeNumber || 'KA-CYB-2018-0428'
      });

      setEvidenceList(prev => [newEvd, ...prev]);

      // Increment case evidence count
      if (evidenceData.caseId) {
        setCases(prev => prev.map(c => {
          if (c.id === evidenceData.caseId) {
            return { ...c, evidenceCount: (c.evidenceCount || 0) + 1 };
          }
          return c;
        }));
      }

      await auditService.logAction({
        user: currentUser?.name || 'Officer',
        badgeId: currentUser?.badgeNumber || 'IN-CYB-001',
        action: 'Evidence Added to Vault',
        caseId: evidenceData.caseId || 'SYSTEM',
        details: `Deposited exhibit "${newEvd.title}" (${newEvd.fileSizeFormatted}) with SHA-256 integrity hash.`
      });

      addToast({
        type: 'success',
        title: 'Evidence Secured',
        message: `Exhibit ${newEvd.id} recorded in digital chain of custody.`
      });

      return newEvd;
    } catch (err) {
      console.error(err);
    }
  };

  // Add timeline note
  const addTimelineNote = async (caseId, title, desc) => {
    const updated = await caseService.addTimelineEntry(
      caseId,
      title,
      desc,
      currentUser?.name || 'Inspector Reshma K.'
    );
    setCases(prev => prev.map(c => c.id === caseId ? updated : c));

    await auditService.logAction({
      user: currentUser?.name || 'Officer',
      badgeId: currentUser?.badgeNumber || 'IN-CYB-001',
      action: 'Investigation Timeline Entry Added',
      caseId,
      details: title
    });

    addToast({
      type: 'info',
      title: 'Investigation Note Logged',
      message: 'New timeline milestone added to official record.'
    });

    return updated;
  };

  // Notifications
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as reviewed.'
    });
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <CaseContext.Provider
      value={{
        cases,
        evidenceList,
        notifications,
        unreadNotificationsCount,
        isLoading,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        createCase,
        updateCaseStatus,
        assignOfficer,
        addEvidence,
        addTimelineNote,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export const useCases = () => {
  const context = useContext(CaseContext);
  if (!context) throw new Error('useCases must be used within a CaseProvider');
  return context;
};
