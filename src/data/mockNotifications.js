/**
 * CrimeTraceAI — Real-Time Operational Notifications & Alerts
 */

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    type: 'critical',
    title: 'Urgent Golden-Hour Account Freeze Required',
    message: 'Case CT-2026-00125: ICICI Bank Surat Branch Nodal Officer acknowledged Section 91 CrPC notice. ₹18.5L frozen in Layer-2 mule account.',
    timestamp: '2026-09-23T16:15:00+05:30',
    caseId: 'CT-2026-00125',
    read: false,
    category: 'Bank Action'
  },
  {
    id: 'NOTIF-02',
    type: 'ai',
    title: 'AI Pattern Correlator: Cross-Case Infrastructure Link Detected',
    message: 'AI Model identified 94% similarity between Case CT-2026-00124 (Bengaluru) and CT-2026-00129 (Hyderabad). Shared C2 IP 185.220.101.54.',
    timestamp: '2026-09-23T14:40:00+05:30',
    caseId: 'CT-2026-00124',
    read: false,
    category: 'AI Intelligence'
  },
  {
    id: 'NOTIF-03',
    type: 'assignment',
    title: 'New High-Priority Case Assigned',
    message: 'Superintendent of Police assigned Case CT-2026-00130 (SCADA Telemetry Intrusion) to Inspector Reshma K.',
    timestamp: '2026-09-22T08:15:00+05:30',
    caseId: 'CT-2026-00130',
    read: true,
    category: 'Case Assignment'
  },
  {
    id: 'NOTIF-04',
    type: 'evidence',
    title: 'Forensic Hash Verification Completed',
    message: 'Evidence EVD-2026-0895 (ESXi-DC01.raw) verified with SHA-256 integrity match. Section 65B Certificate generated.',
    timestamp: '2026-09-20T13:00:00+05:30',
    caseId: 'CT-2026-00126',
    read: true,
    category: 'Evidence Vault'
  },
  {
    id: 'NOTIF-05',
    type: 'court',
    title: 'Court Remand Hearing Scheduled',
    message: 'Case CT-2026-00131: Metropolitan Magistrate Court #3 scheduled bail hearing for telecom SIM syndicate suspect.',
    timestamp: '2026-09-19T10:30:00+05:30',
    caseId: 'CT-2026-00131',
    read: true,
    category: 'Legal / Court'
  }
];
