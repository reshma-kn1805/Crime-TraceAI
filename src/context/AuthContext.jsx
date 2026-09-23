/**
 * CrimeTraceAI — Authentication & Role-Based Access Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_INVESTIGATORS } from '../data/mockInvestigators';
import { auditService } from '../services/auditService';

const AuthContext = createContext();

const AUTH_USER_KEY = 'crimetrace_active_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(AUTH_USER_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    // Default logged in user: Inspector Reshma K.
    return MOCK_INVESTIGATORS[0];
  });

  const [sessionStartTime, setSessionStartTime] = useState(() => new Date().toISOString());
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [currentUser]);

  // Login handler
  const login = async (emailOrId, password, remember = true) => {
    // Search mock investigators by email or badge number or id
    const found = MOCK_INVESTIGATORS.find(
      inv => inv.email.toLowerCase() === emailOrId.toLowerCase() ||
             inv.badgeNumber.toLowerCase() === emailOrId.toLowerCase() ||
             inv.id.toLowerCase() === emailOrId.toLowerCase()
    );

    if (found) {
      setCurrentUser(found);
      setIsAuthenticated(true);
      setSessionStartTime(new Date().toISOString());
      
      // Log login action
      await auditService.logAction({
        user: found.name,
        badgeId: found.badgeNumber,
        action: 'Officer Authenticated & Session Initiated',
        caseId: 'AUTH_GATEWAY',
        details: `Successful 2FA login from Cyber Crime Cell Intranet.`
      });

      return { success: true, user: found };
    } else {
      // Allow generic demo login if valid email structure
      if (emailOrId && emailOrId.includes('@')) {
        const customUser = {
          id: 'INV-DEMO',
          name: emailOrId.split('@')[0].toUpperCase(),
          rank: 'Investigating Officer',
          department: 'Cyber Crime Police Station',
          city: 'Bengaluru',
          state: 'Karnataka',
          badgeNumber: 'IN-CYB-2026-DEMO',
          email: emailOrId,
          phone: '+91 98450 11223',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
          role: 'Investigator'
        };
        setCurrentUser(customUser);
        setIsAuthenticated(true);
        return { success: true, user: customUser };
      }
      return { success: false, message: 'Invalid Official Badge ID or Police Credentials. Please check and retry.' };
    }
  };

  // Switch role dynamically to test role-based access
  const switchRole = (newRole) => {
    if (!currentUser) return;
    const updated = { ...currentUser, role: newRole };
    setCurrentUser(updated);
  };

  // Switch officer to another pre-loaded investigator
  const switchOfficer = (officerId) => {
    const found = MOCK_INVESTIGATORS.find(i => i.id === officerId);
    if (found) {
      setCurrentUser(found);
    }
  };

  // Logout handler
  const logout = async () => {
    if (currentUser) {
      await auditService.logAction({
        user: currentUser.name,
        badgeId: currentUser.badgeNumber,
        action: 'Officer Signed Out',
        caseId: 'AUTH_GATEWAY',
        details: `Session closed by officer.`
      });
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        sessionStartTime,
        login,
        logout,
        switchRole,
        switchOfficer,
        isAdmin: currentUser?.role === 'Administrator',
        isInvestigator: currentUser?.role === 'Investigator',
        isAnalyst: currentUser?.role === 'Analyst'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
