/**
 * CrimeTraceAI — Digital Evidence Management Database
 * Forensics artifacts, chain of custody, and SHA-256 integrity verification records.
 */

export const INITIAL_EVIDENCE = [
  {
    id: 'EVD-2026-0891',
    caseId: 'CT-2026-00124',
    title: 'Decompiled Malicious APK (BESCOM_Update.apk)',
    type: 'Malware Binary',
    sizeBytes: 8492000,
    fileSizeFormatted: '8.1 MB',
    sha256: '9f83a48e71b2d01934c9f1a0e82c5d64821a0910f54321789c0b1e4a7d653198',
    uploadedAt: '2026-09-18T14:30:00+05:30',
    uploadedBy: 'Inspector Reshma K.',
    badgeId: 'KA-CYB-2018-0428',
    custodyStatus: 'Secured in Cyber Vault (Chain of Custody Intact)',
    section65BCertificate: 'CERT-65B-KA-2026-00192',
    tags: ['Android Trojan', 'Hydra Variant', 'Jamtara Vector'],
    fileUrl: '#'
  },
  {
    id: 'EVD-2026-0892',
    caseId: 'CT-2026-00124',
    title: 'HDFC & Canara Bank Beneficiary UTR Account Statement',
    type: 'Transaction Record',
    sizeBytes: 1420000,
    fileSizeFormatted: '1.4 MB',
    sha256: '4b7a1928cf0184d09283fa71029b3c48571029e8471029c84910283749281a0b',
    uploadedAt: '2026-09-18T16:15:00+05:30',
    uploadedBy: 'Inspector Reshma K.',
    badgeId: 'KA-CYB-2018-0428',
    custodyStatus: 'Secured in Cyber Vault (Chain of Custody Intact)',
    section65BCertificate: 'CERT-65B-KA-2026-00193',
    tags: ['Bank Statement', 'Mule Trail', 'CFCFRMS'],
    fileUrl: '#'
  },
  {
    id: 'EVD-2026-0893',
    caseId: 'CT-2026-00125',
    title: 'Skype Video Call Recording & Screen Capture (Digital Arrest)',
    type: 'Video',
    sizeBytes: 245000000,
    fileSizeFormatted: '233.6 MB',
    sha256: 'c8192847a019b847291038475629104857291048572910485729104857291048',
    uploadedAt: '2026-09-19T18:45:00+05:30',
    uploadedBy: 'ACP Rajesh Verma',
    badgeId: 'DL-IPS-2012-0112',
    custodyStatus: 'Secured in Cyber Vault (Chain of Custody Intact)',
    section65BCertificate: 'CERT-65B-DL-2026-00841',
    tags: ['Skype Intercept', 'Forged CBI Warrant', 'Voice Sample'],
    fileUrl: '#'
  },
  {
    id: 'EVD-2026-0894',
    caseId: 'CT-2026-00125',
    title: 'Forged Supreme Court of India Arrest Warrant PDF',
    type: 'Document',
    sizeBytes: 890000,
    fileSizeFormatted: '870 KB',
    sha256: 'a109284756192837465019283746501928374650192837465019283746501928',
    uploadedAt: '2026-09-19T19:10:00+05:30',
    uploadedBy: 'ACP Rajesh Verma',
    badgeId: 'DL-IPS-2012-0112',
    custodyStatus: 'Secured in Cyber Vault (Chain of Custody Intact)',
    section65BCertificate: 'CERT-65B-DL-2026-00842',
    tags: ['Forged Judicial Document', 'Digital Seal Analysis'],
    fileUrl: '#'
  },
  {
    id: 'EVD-2026-0895',
    caseId: 'CT-2026-00126',
    title: 'Memory Dump (ESXi-DC01.raw) & VMware Event Logs',
    type: 'Disk Image',
    sizeBytes: 16400000000,
    fileSizeFormatted: '15.2 GB',
    sha256: 'e501928374650192837465019283746501928374650192837465019283746501',
    uploadedAt: '2026-09-20T12:30:00+05:30',
    uploadedBy: 'Sneha Patel',
    badgeId: 'MH-CYB-2020-0789',
    custodyStatus: 'Secured in Air-Gapped Forensics Storage (Chain Intact)',
    section65BCertificate: 'CERT-65B-MH-2026-01201',
    tags: ['LockBit Ransomware', 'ESXi Memory Dump', 'Mimikatz Artifacts'],
    fileUrl: '#'
  },
  {
    id: 'EVD-2026-0896',
    caseId: 'CT-2026-00127',
    title: 'Seized 3D-Printed Silicone Thumbprint Mold Photographs',
    type: 'Image',
    sizeBytes: 18400000,
    fileSizeFormatted: '17.5 MB',
    sha256: 'f719283746501928374650192837465019283746501928374650192837465019',
    uploadedAt: '2026-09-23T15:00:00+05:30',
    uploadedBy: 'Inspector Anand Swaminathan',
    badgeId: 'TN-CYB-2017-0902',
    custodyStatus: 'Secured in Physical Evidence Locker #4',
    section65BCertificate: 'CERT-65B-TN-2026-00412',
    tags: ['AePS Biometric Clone', 'Macro Photographs', 'Seizure Memo #18'],
    fileUrl: '#'
  }
];

export const EVIDENCE_TYPES = [
  'Screenshot',
  'Document',
  'Image',
  'Video',
  'Audio',
  'Log file',
  'Transaction record',
  'URL',
  'Disk Image',
  'Malware Binary',
  'Other'
];
