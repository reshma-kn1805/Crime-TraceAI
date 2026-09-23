/**
 * CrimeTraceAI — Administrative Security Audit Log
 * Immutable activity trail recording investigator actions, case modifications,
 * evidence access, and report generation in IST.
 */

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUD-90182',
    user: 'Inspector Reshma K.',
    badgeId: 'KA-CYB-2018-0428',
    action: 'Updated Case Investigation Status',
    caseId: 'CT-2026-00124',
    details: 'Status transitioned from "Evidence Collection" to "Under Investigation" following Jamtara tower dump review.',
    timestamp: '2026-09-22T16:45:00+05:30',
    ipAddress: '10.24.110.42 (Internal Cyber Police LAN)',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-90181',
    user: 'Inspector Anand Swaminathan',
    badgeId: 'TN-CYB-2017-0902',
    action: 'Seized Digital Evidence Registered',
    caseId: 'CT-2026-00127',
    details: 'Uploaded 142 silicone rubber thumbprints photos and POS terminal firmware dump with SHA-256 hash.',
    timestamp: '2026-09-23T15:00:00+05:30',
    ipAddress: '10.28.14.88 (CCB Chennai)',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-90180',
    user: 'ACP Rajesh Verma',
    badgeId: 'DL-IPS-2012-0112',
    action: 'Generated Official Legal FIR Report',
    caseId: 'CT-2026-00125',
    details: 'Exported Section 66D IT Act Case Dossier for transmission to Metropolitan Sessions Court.',
    timestamp: '2026-09-23T11:30:00+05:30',
    ipAddress: '10.12.5.19 (IFSO Special Cell)',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-90179',
    user: 'Sneha Patel',
    badgeId: 'MH-CYB-2020-0789',
    action: 'Executed AI Pattern Correlator Batch',
    caseId: 'ALL_CASES',
    details: 'Executed supervised similarity matrix across 45 active ransomware and phishing IOCs.',
    timestamp: '2026-09-23T09:15:00+05:30',
    ipAddress: '10.19.82.11 (CSOC Mumbai)',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-90178',
    user: 'Sub-Inspector Vikram Rathore',
    badgeId: 'MH-CYB-2021-0554',
    action: 'Case Marked Resolved & Closed',
    caseId: 'CT-2026-00131',
    details: 'SIM swap accused remanded to judicial custody; ₹28.5L refunded under court direction.',
    timestamp: '2026-09-18T16:30:00+05:30',
    ipAddress: '10.19.82.44 (BKC Cyber PS)',
    status: 'SUCCESS'
  }
];
