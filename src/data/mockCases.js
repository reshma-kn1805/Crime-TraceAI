/**
 * CrimeTraceAI — Comprehensive Indian Cybercrime Case Database
 * Fictional sample cases reflecting real Indian cybercrime vectors:
 * UPI Phishing, Digital Arrest, SIM Swap, Loan App Extortion, Ransomware, AePS fraud.
 */

export const INITIAL_CASES = [
  {
    id: 'CT-2026-00124',
    title: 'Electricity Bill Disconnection Phishing & Malicious APK Surcharge Fraud',
    category: 'Phishing',
    severity: 'High',
    status: 'Under Investigation',
    aiRiskLevel: 'High',
    riskScore: 78,
    createdAt: '2026-09-18T10:30:00+05:30',
    updatedAt: '2026-09-22T16:45:00+05:30',
    assignedInvestigator: 'Inspector Reshma K.',
    investigatorId: 'INV-0428',
    department: 'Cyber Crime Police Station (CID)',
    location: {
      city: 'Bengaluru',
      state: 'Karnataka',
      lat: 12.9716,
      lng: 77.5946,
      station: 'Infantry Road Cyber Cell'
    },
    victim: {
      name: 'Sunil R. Hegde',
      phone: '+91 98451 22901',
      age: 58,
      organization: 'Retired BSNL Telecom Engineer',
      accountAffected: 'Canara Bank A/c No. XX8921',
      financialLoss: 245000,
      upiHandle: 'sunil.hegde@okaxis'
    },
    attackDetails: {
      vector: 'SMS Smishing with Spoofed Sender ID (VK-BESCOM)',
      method: 'Threat of power cut within 2 hours; urged victim to download "BESCOM_QuickUpdate.apk"',
      platform: 'Android APK / WhatsApp / Remote Access Tool (AnyDesk)',
      url: 'https://bescom-pay-bill.support-portal.in',
      ipAddress: '103.212.43.118',
      deviceFingerprint: 'Xiaomi Redmi Note 11 (Suspect handset in Jamtara hub)',
      transactionRef: 'UPI/426819208392/HDFC/PaytmMule',
      suspectedMalware: 'Hydra Android Banking Trojan Variant v3.1',
      technicalIndicators: 'C2 IP: 185.220.101.54, Forwarding SMS port 8080, Beneficiary UPI: quickrefund99@ybl'
    },
    suspect: {
      name: 'Santosh Kumar Mondal (Alias: "Raju Bhai")',
      alias: 'Raju Jamtara / Telegram @bescom_support_bot',
      contact: '+91 91234 56780',
      knownIdentifiers: 'IMEI: 864209048123901, SIM registered on forged Bihar Aadhaar',
      associatedAccounts: 'Bank of Baroda Mule A/c No. 9012001928491 (Branch: Deoghar)',
      knownIPs: ['103.212.43.118', '117.247.182.9'],
      notes: 'Active member of Jamtara-Karmatar phishing syndicate operating mass SMS gateways.'
    },
    evidenceCount: 4,
    timeline: [
      {
        id: 'TL-1',
        title: 'Case Registered via National Cyber Crime Reporting Portal (1930)',
        timestamp: '2026-09-18T10:30:00+05:30',
        officer: 'System Dispatcher (I4C)',
        description: 'Victim logged complaint at 1930 helpline within 45 minutes of debit. Acknowledgment number 20918004291.'
      },
      {
        id: 'TL-2',
        title: 'Golden Hour Freeze Request Sent via CFCFRMS',
        timestamp: '2026-09-18T11:15:00+05:30',
        officer: 'Inspector Reshma K.',
        description: 'Notice served to Bank of Baroda Nodal Officer under Section 91 CrPC. Successfully froze ₹1,80,000 in beneficiary mule account.'
      },
      {
        id: 'TL-3',
        title: 'Malicious APK Extracted & Forensically Decompiled',
        timestamp: '2026-09-20T14:20:00+05:30',
        officer: 'Sneha Patel (CSOC)',
        description: 'SHA-256 hash verified. Malware intercepted incoming OTPs and exfiltrated banking credentials to Russian C2 IP.'
      },
      {
        id: 'TL-4',
        title: 'Telecom CDR Analysis Identifies Suspect Location',
        timestamp: '2026-09-22T16:45:00+05:30',
        officer: 'Inspector Reshma K.',
        description: 'Cell tower dumps pinpoint active device to Karmatar village, Jamtara district, Jharkhand. Raid team coordination initiated.'
      }
    ],
    relatedCases: [
      { caseId: 'CT-2026-00129', similarity: 91, reason: 'Identical C2 IP (185.220.101.54) and similar SMS sender spoofing kit' },
      { caseId: 'CT-2026-00135', similarity: 84, reason: 'Shared Bank of Baroda beneficiary mule IFSC and phone series' }
    ]
  },
  {
    id: 'CT-2026-00125',
    title: 'Senior Citizen Digital Arrest & CBI Impersonation Video Extortion',
    category: 'Social Engineering',
    severity: 'Critical',
    status: 'Evidence Collection',
    aiRiskLevel: 'Critical',
    riskScore: 94,
    createdAt: '2026-09-19T14:15:00+05:30',
    updatedAt: '2026-09-23T11:00:00+05:30',
    assignedInvestigator: 'ACP Rajesh Verma',
    investigatorId: 'INV-0112',
    department: 'IFSO Special Cell',
    location: {
      city: 'New Delhi',
      state: 'Delhi NCR',
      lat: 28.6139,
      lng: 77.2090,
      station: 'IFSO Cyber Police Station Dwarka'
    },
    victim: {
      name: 'Dr. Ramesh Chandra Mathur',
      phone: '+91 98101 44329',
      age: 71,
      organization: 'Former Professor, AIIMS New Delhi',
      accountAffected: 'State Bank of India A/c No. XX4109',
      financialLoss: 4800000,
      upiHandle: 'rcmathur@sbi'
    },
    attackDetails: {
      vector: 'VoIP Call from Fake FedEX Customs / CBI HQ Skype Video Room',
      method: 'Alleged intercepted courier containing illegal narcotics; subjected victim to 48-hr Skype Digital Arrest; coerced RTGS transfer for "Supreme Court verification"',
      platform: 'Skype Video / WhatsApp VoIP / Signal',
      url: 'https://cbi-investigation-portal.org.in (Forged Fake Legal Notice)',
      ipAddress: '194.26.29.112 (Cambodia/Myanmar proxy VPN)',
      deviceFingerprint: 'Virtual Windows 10 VM on Linode Cloud',
      transactionRef: 'RTGS/SBIN4202609190019284/ICICI/MulePvtLtd',
      suspectedMalware: 'Skype Screen-Sharing Recording & Deepfake Badge Overlay',
      technicalIndicators: 'Forged Supreme Court Seal, Fake CBI Officer ID Card (Rank: DIG Anupam Shrivastava)'
    },
    suspect: {
      name: 'Unidentified Syndicate ("Operation Golden Triangle Nexus")',
      alias: 'Telegram handler: @cbi_special_inquiry',
      contact: '+91 88265 99401 (Virtual WhatsApp eSIM)',
      knownIdentifiers: 'Skype ID: cbi.specialcell.gov.desk4',
      associatedAccounts: 'Current A/c in name of "Apex Trading Enterprises", ICICI Bank, Surat Branch',
      knownIPs: ['194.26.29.112', '45.154.255.88'],
      notes: 'Operating from Southeast Asia (Sihanoukville scam compound) employing trafficked Indian operatives.'
    },
    evidenceCount: 6,
    timeline: [
      {
        id: 'TL-1',
        title: 'Victim Approached Special Cell with Family',
        timestamp: '2026-09-19T14:15:00+05:30',
        officer: 'ACP Rajesh Verma',
        description: 'Victim under severe psychological distress following 48 hours of continuous video surveillance.'
      },
      {
        id: 'TL-2',
        title: 'Intermediary Current Accounts Traced Across 3 Layers',
        timestamp: '2026-09-21T09:30:00+05:30',
        officer: 'ACP Rajesh Verma',
        description: 'Layer 1 (Surat ICICI) transferred ₹48L into 12 crypto P2P merchant accounts within 18 minutes.'
      },
      {
        id: 'TL-3',
        title: 'Mule Account Proprietor Arrested in Surat',
        timestamp: '2026-09-23T11:00:00+05:30',
        officer: 'Sub-Inspector Vikram Rathore',
        description: 'Dummy company director admitted to handing over net-banking token for ₹25,000 commission.'
      }
    ],
    relatedCases: [
      { caseId: 'CT-2026-00127', similarity: 96, reason: 'Identical fake CBI Skype room background & forged Supreme Court warrant' },
      { caseId: 'CT-2026-00138', similarity: 89, reason: 'Matching Surat mule current account syndicate' }
    ]
  },
  {
    id: 'CT-2026-00126',
    title: 'State Multi-Specialty Hospital Ransomware & Patient Record Lockdown',
    category: 'Ransomware',
    severity: 'Critical',
    status: 'Under Investigation',
    aiRiskLevel: 'Critical',
    riskScore: 98,
    createdAt: '2026-09-20T03:40:00+05:30',
    updatedAt: '2026-09-23T08:15:00+05:30',
    assignedInvestigator: 'Sneha Patel',
    investigatorId: 'INV-0789',
    department: 'Cyber Security Operations Center (CSOC)',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      lat: 19.0760,
      lng: 72.8777,
      station: 'BKC Cyber Police Station'
    },
    victim: {
      name: 'Apex Lifecare Institute of Medical Sciences',
      phone: '+91 98200 11990',
      age: 44,
      organization: '850-Bed Super Specialty Healthcare Network',
      accountAffected: 'Internal HIS/PACS Database & Active Directory Servers',
      financialLoss: 12500000,
      upiHandle: 'N/A (Demanded 15 Bitcoin)'
    },
    attackDetails: {
      vector: 'Compromised VPN Gateway via CVE-2024-3400 (Palo Alto GlobalProtect)',
      method: 'Lateral movement through Mimikatz credential dumping; encrypted 42 VM hosts and deleted Volume Shadow Copies',
      platform: 'VMware ESXi 7.0 / Windows Server 2022',
      url: 'hxxp://ransom-portal-onion-recovery.onion',
      ipAddress: '91.240.118.62 (Tor Exit Node / Russian Federation)',
      deviceFingerprint: 'Domain Controller: DC01.APEXHOSPITAL.LOCAL',
      transactionRef: 'BTC Wallet: bc1q8p47w77m80g5a0jkl4n924p5qws2q3948sly8x',
      suspectedMalware: 'LockBit 3.0 (Black) Ransomware Builder Affiliate #41',
      technicalIndicators: 'Ransom note: RESTORE-MY-FILES.txt, Encrypted extension: .h0sp1tal_lock'
    },
    suspect: {
      name: 'Threat Actor Group "ShadowMedic-Affiliate"',
      alias: 'Tox ID: 7F2190A8B4291880C9421A4B02, Telegram @medic_locker',
      contact: 'onion portal chat only',
      knownIdentifiers: 'Signature Ransomware Hash: 4a2e5d989f... (LockBit 3.0)',
      associatedAccounts: 'BTC Wallet holding 84.2 BTC from previous health attacks',
      knownIPs: ['91.240.118.62', '185.196.220.14'],
      notes: 'Specifically targets Indian healthcare and municipal utilities during early morning hours.'
    },
    evidenceCount: 8,
    timeline: [
      {
        id: 'TL-1',
        title: 'Critical Alert Raised by CERT-In & Hospital IT Director',
        timestamp: '2026-09-20T03:40:00+05:30',
        officer: 'Sneha Patel',
        description: 'Emergency response team dispatched. Isolated OT network to prevent medical device infection.'
      },
      {
        id: 'TL-2',
        title: 'Memory Dump & ESXi System Logs Acquired',
        timestamp: '2026-09-20T11:00:00+05:30',
        officer: 'Sub-Inspector Vikram Rathore',
        description: 'Acquired forensic images of 3 affected domain controllers before shutdown.'
      },
      {
        id: 'TL-3',
        title: 'Decryption Key Flaw Identified in Shadow Copy Backups',
        timestamp: '2026-09-22T19:30:00+05:30',
        officer: 'Sneha Patel',
        description: 'Successfully salvaged 65% of patient EHR database from offline tape archives without ransom payment.'
      }
    ],
    relatedCases: [
      { caseId: 'CT-2026-00133', similarity: 93, reason: 'Identical CVE-2024-3400 initial exploit script and LockBit 3.0 variant' }
    ]
  },
  {
    id: 'CT-2026-00127',
    title: 'Aadhaar-Enabled Payment System (AePS) Biometric Silicone Clone Syndicate',
    category: 'Identity Theft',
    severity: 'High',
    status: 'Suspect Identified',
    aiRiskLevel: 'High',
    riskScore: 76,
    createdAt: '2026-09-21T09:10:00+05:30',
    updatedAt: '2026-09-23T14:30:00+05:30',
    assignedInvestigator: 'Inspector Anand Swaminathan',
    investigatorId: 'INV-0902',
    department: 'Central Crime Branch (CCB)',
    location: {
      city: 'Chennai',
      state: 'Tamil Nadu',
      lat: 13.0827,
      lng: 80.2707,
      station: 'Greater Chennai CCB Cyber Wing'
    },
    victim: {
      name: 'V. Jayalakshmi & 18 Rural Beneficiaries',
      phone: '+91 94441 55678',
      age: 63,
      organization: 'Rural Agricultural Cooperative Society',
      accountAffected: 'Indian Overseas Bank AePS Enabled Savings Accounts',
      financialLoss: 620000,
      upiHandle: 'N/A (AePS Direct Micro-ATM Withdrawal)'
    },
    attackDetails: {
      vector: 'Leaked Land Registry Sale Deeds containing Fingerprint Scans and Aadhaar numbers',
      method: 'Fabricated artificial silicone rubber thumb impressions using 3D printer and photographic chemicals to execute unauthorized Micro-ATM AePS withdrawals',
      platform: 'Micro-ATM Biometric POS Terminal / PayNearby / SpiceMoney Agent App',
      url: 'N/A (Physical POS Biometric Tampering)',
      ipAddress: '106.51.22.84',
      deviceFingerprint: 'Mantra MFS100 Optical Fingerprint Scanner',
      transactionRef: 'AePS/TXN/IOBA/42019882/PayNearbyAgent',
      suspectedMalware: 'Registry Data Scraping Script (Python Selenium)',
      technicalIndicators: 'Consecutive ₹10,000 AePS daily maximum cap withdrawals from same BC Agent ID 99281'
    },
    suspect: {
      name: 'M. Selvakumar (Business Correspondent Agent)',
      alias: '"Bio-Selva" / Cyber CSC Center Owner',
      contact: '+91 97910 88234',
      knownIdentifiers: 'Aadhaar: XXXX-XXXX-4912, CSC Agent ID: BC-TN-0912',
      associatedAccounts: 'Equitas Small Finance Bank A/c 2001928419',
      knownIPs: ['106.51.22.84'],
      notes: 'Procured registered document scans from district sub-registrar portal and cloned 180+ biometric prints.'
    },
    evidenceCount: 5,
    timeline: [
      {
        id: 'TL-1',
        title: 'Cluster Complaint Received from Kancheepuram Rural District',
        timestamp: '2026-09-21T09:10:00+05:30',
        officer: 'Inspector Anand Swaminathan',
        description: '19 elderly pension beneficiaries noticed unexplained ₹10,000 debit SMS without visiting bank.'
      },
      {
        id: 'TL-2',
        title: 'UIDAI & NPCI Audit Log Cross-Referenced',
        timestamp: '2026-09-22T14:00:00+05:30',
        officer: 'Inspector Anand Swaminathan',
        description: 'All 19 transactions routed via single CSC micro-ATM terminal in Tambaram.'
      },
      {
        id: 'TL-3',
        title: 'Physical Seizure of 142 Silicone Rubber Fingerprints',
        timestamp: '2026-09-23T14:30:00+05:30',
        officer: 'Inspector Anand Swaminathan',
        description: 'Suspect detained at shop. 142 cloned silicone prints, chemical kits, and 3 POS scanners seized.'
      }
    ],
    relatedCases: [
      { caseId: 'CT-2026-00137', similarity: 88, reason: 'Identical silicone molding methodology and sub-registrar document source' }
    ]
  },
  {
    id: 'CT-2026-00128',
    title: 'Instant Micro-Loan App Extortion & Contact List Image Morphin Network',
    category: 'Cyberstalking',
    severity: 'High',
    status: 'Legal Processing',
    aiRiskLevel: 'High',
    riskScore: 82,
    createdAt: '2026-09-17T11:20:00+05:30',
    updatedAt: '2026-09-22T17:10:00+05:30',
    assignedInvestigator: 'Inspector Reshma K.',
    investigatorId: 'INV-0428',
    department: 'Cyber Crime Police Station (CID)',
    location: {
      city: 'Pune',
      state: 'Maharashtra',
      lat: 18.5204,
      lng: 73.8567,
      station: 'Shivajinagar Cyber Cell'
    },
    victim: {
      name: 'Aditi V. Deshpande',
      phone: '+91 98220 77149',
      age: 26,
      organization: 'IT Software Quality Analyst',
      accountAffected: 'HDFC Bank Account',
      financialLoss: 380000,
      upiHandle: 'aditi.deshpande@okhdfcbank'
    },
    attackDetails: {
      vector: 'Sideloaded Malicious APK "SpeedCash Loan Express"',
      method: 'Exfiltrated victim contacts and photo gallery; disbursed unsolicited ₹4,500 loan and demanded ₹45,000 within 5 days; circulated morphed obscene pictures to WhatsApp contacts',
      platform: 'WhatsApp Call / Android APK / Telegram Harassment Groups',
      url: 'https://speedcash-loan.vip/download',
      ipAddress: '103.145.74.20',
      deviceFingerprint: 'Cloud PBX Automated Calling Dialer (VOIP)',
      transactionRef: 'UPI/MULE/9921098234@razorpay',
      suspectedMalware: 'SpyLoan Trojan Exfiltrator v4.2',
      technicalIndicators: 'Permissions requested: READ_CONTACTS, READ_EXTERNAL_STORAGE, ACCESS_FINE_LOCATION'
    },
    suspect: {
      name: 'Call Center Recovery Agent "Rocky" (Rohit Sharma)',
      alias: 'Telegram handle: @loan_recovery_king',
      contact: '+91 97120 44921',
      knownIdentifiers: 'UPI VPA: quickloansettle@ibl',
      associatedAccounts: 'Yes Bank Nodal Escrow Mule A/c 09210082491',
      knownIPs: ['103.145.74.20', '43.242.119.5'],
      notes: 'Operated illegal call center in Thane employing 25 recovery telecallers.'
    },
    evidenceCount: 7,
    timeline: [
      {
        id: 'TL-1',
        title: 'Emergency Complaint Lodged with WhatsApp Harassment Screenshots',
        timestamp: '2026-09-17T11:20:00+05:30',
        officer: 'Inspector Reshma K.',
        description: 'Morphed photos received by victim parents and office manager.'
      },
      {
        id: 'TL-2',
        title: 'Bank Accounts Frozen & Cloud PBX Numbers Blocked',
        timestamp: '2026-09-19T16:00:00+05:30',
        officer: 'Inspector Reshma K.',
        description: 'Issued Section 69A IT Act emergency blocking order to DoT for 14 VoIP numbers.'
      },
      {
        id: 'TL-3',
        title: 'Raid on Thane Call Center; 6 Arrested',
        timestamp: '2026-09-22T17:10:00+05:30',
        officer: 'Inspector Reshma K.',
        description: 'Seized 38 laptops, 52 Android handsets, and server database containing 50,000+ Indian citizen contact books.'
      }
    ],
    relatedCases: [
      { caseId: 'CT-2026-00130', similarity: 94, reason: 'Identical SpyLoan APK source repository and Razorpay merchant key' }
    ]
  },
  {
    id: 'CT-2026-00129',
    title: 'Telegram Part-Time YouTube Video Liking & Cryptocurrency Investment Syndicate',
    category: 'Financial Fraud (UPI/Net-Banking)',
    severity: 'High',
    status: 'Evidence Collection',
    aiRiskLevel: 'High',
    riskScore: 84,
    createdAt: '2026-09-16T15:40:00+05:30',
    updatedAt: '2026-09-21T18:00:00+05:30',
    assignedInvestigator: 'Sneha Patel',
    investigatorId: 'INV-0789',
    department: 'Cyber Security Operations Center (CSOC)',
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
      lat: 17.3850,
      lng: 78.4867,
      station: 'Telangana Cyber Security Bureau (TGCSB)'
    },
    victim: {
      name: 'K. Venkat Ramana',
      phone: '+91 99890 33412',
      age: 38,
      organization: 'Senior Cloud Architect, HITEC City',
      accountAffected: 'Axis Bank & Kotak Mahindra Accounts',
      financialLoss: 1850000,
      upiHandle: 'venkat.ramana@axisbank'
    },
    attackDetails: {
      vector: 'WhatsApp Invitation from foreign number (+855 Cambodia) -> Telegram VIP Group',
      method: 'Initial reward of ₹150 for liking YouTube videos; prompted to invest in bogus cryptocurrency trading portal "BitX-India.vip" with simulated 400% profits; account frozen upon withdrawal request',
      platform: 'Telegram / Fake Web Trading Terminal',
      url: 'https://bitx-india-pro.cc/trade',
      ipAddress: '104.21.65.198 (Cloudflare CDN)',
      deviceFingerprint: 'Web3 Simulated Trading Canvas',
      transactionRef: 'NEFT/AXIS/420199482910/MuleAirtelPayments',
      suspectedMalware: 'Fake Trading Web App (WebSocket Price Manipulation Script)',
      technicalIndicators: 'Beneficiary accounts rotated every 15 minutes across Airtel Payments Bank and Fino Bank'
    },
    suspect: {
      name: 'Network "Cyber Dragon Task Scam"',
      alias: 'Telegram Admin: @VIP_Finance_Mentor_Sara',
      contact: '+855 92 841 029 (Cambodia Telegram Bot)',
      knownIdentifiers: 'USDT TRC20 Wallet: TQ4yN2pL99xX4aK1m9ZqR2bC8v7s4D5e',
      associatedAccounts: '14 Mule Accounts in Airtel Payments Bank, Fino Bank, and Paytm Bank',
      knownIPs: ['104.21.65.198', '172.67.180.44'],
      notes: 'Laundered ₹18.5 Lakhs through 8 layers within 45 minutes into USDT on Binance P2P.'
    },
    evidenceCount: 9,
    timeline: [
      {
        id: 'TL-1',
        title: 'Complaint Registered at TGCSB Portal',
        timestamp: '2026-09-16T15:40:00+05:30',
        officer: 'Sneha Patel',
        description: 'Victim realized scam after scammers demanded ₹5,00,000 "TDS Tax Clearance" to release funds.'
      },
      {
        id: 'TL-2',
        title: 'Crypto Transaction Tracking via Chainalysis Reactor',
        timestamp: '2026-09-18T12:00:00+05:30',
        officer: 'Sneha Patel',
        description: 'Traced 22,400 USDT to deposit address on Huobi Exchange. Mutual Legal Assistance Treaty (MLAT) inquiry initiated.'
      }
    ],
    relatedCases: [
      { caseId: 'CT-2026-00124', similarity: 79, reason: 'Common secondary mule bank infrastructure in Jharkhand' },
      { caseId: 'CT-2026-00139', similarity: 92, reason: 'Identical BitX trading web template and Telegram bot code' }
    ]
  },
  {
    id: 'CT-2026-00130',
    title: 'Municipal Corporation Smart City SCADA System Unauthorized Access & Ransom Threat',
    category: 'Malware',
    severity: 'Critical',
    status: 'Reported',
    aiRiskLevel: 'Critical',
    riskScore: 91,
    createdAt: '2026-09-22T08:00:00+05:30',
    updatedAt: '2026-09-23T16:00:00+05:30',
    assignedInvestigator: 'Inspector Reshma K.',
    investigatorId: 'INV-0428',
    department: 'Cyber Crime Police Station (CID)',
    location: {
      city: 'Ahmedabad',
      state: 'Gujarat',
      lat: 23.0225,
      lng: 72.5714,
      station: 'CID Crime Cyber Police Station'
    },
    victim: {
      name: 'Ahmedabad Urban Development Authority (AUDA)',
      phone: '+91 79 2754 1122',
      age: 49,
      organization: 'Municipal Water Distribution & Traffic Control SCADA Unit',
      accountAffected: 'Internal PLC / Modbus Network Gateway',
      financialLoss: 0,
      upiHandle: 'N/A (Critical Infrastructure Threat)'
    },
    attackDetails: {
      vector: 'Exposed RDP Port 3389 without MFA with Default Admin Credentials',
      method: 'Brute-force dictionary attack on edge telemetry router; executed PowerShell script to disable antivirus and dump memory credentials',
      platform: 'Windows Server 2016 / Siemens SCADA WinCC',
      url: 'hxxps://darkweb-leak-site.tor/auda_infra',
      ipAddress: '185.176.27.104',
      deviceFingerprint: 'RDP Session Client: Kali-Linux-2026.1',
      transactionRef: 'N/A',
      suspectedMalware: 'Cobalt Strike Beacon v4.9 / Mimikatz',
      technicalIndicators: 'Outbound beaconing to 185.176.27.104:443 every 60 seconds with jitter 20%'
    },
    suspect: {
      name: 'Advanced Persistent Threat "APT-IndoStrike"',
      alias: 'Unknown State-Sponsored / Hacktivist Operator',
      contact: 'N/A',
      knownIdentifiers: 'Cobalt Strike Watermark: 987654321',
      associatedAccounts: 'N/A',
      knownIPs: ['185.176.27.104', '45.148.10.22'],
      notes: 'Targeting Indian critical water supply and power distribution telemetry systems.'
    },
    evidenceCount: 3,
    timeline: [
      {
        id: 'TL-1',
        title: 'Intrusion Alert Forwarded by NCIIPC & CERT-In',
        timestamp: '2026-09-22T08:00:00+05:30',
        officer: 'Inspector Reshma K.',
        description: 'Anomalous outbound traffic detected from municipal water pumping telemetry station.'
      },
      {
        id: 'TL-2',
        title: 'Emergency Firewall Rule Deployed & RDP Isolated',
        timestamp: '2026-09-22T09:15:00+05:30',
        officer: 'Sub-Inspector Vikram Rathore',
        description: 'Hardened external perimeter, changed administrative passwords, and killed malicious PowerShell subprocesses.'
      }
    ],
    relatedCases: [
      { caseId: 'CT-2026-00126', similarity: 82, reason: 'Identical Cobalt Strike C2 server subnet and lateral movement tools' }
    ]
  },
  {
    id: 'CT-2026-00131',
    title: 'Net-Banking SIM Swap & High-Value Corporate RTGS Account Takeover',
    category: 'Account Takeover',
    severity: 'High',
    status: 'Resolved',
    aiRiskLevel: 'High',
    riskScore: 79,
    createdAt: '2026-09-10T11:45:00+05:30',
    updatedAt: '2026-09-18T16:30:00+05:30',
    assignedInvestigator: 'Sub-Inspector Vikram Rathore',
    investigatorId: 'INV-0554',
    department: 'Cyber Crime Police Station (BKC)',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      lat: 19.0760,
      lng: 72.8777,
      station: 'BKC Cyber Police Station'
    },
    victim: {
      name: 'Rajesh Narang (Managing Director, Narang Exports)',
      phone: '+91 98200 44102',
      age: 52,
      organization: 'Textile Export Corporation',
      accountAffected: 'Punjab National Bank Corporate Account',
      financialLoss: 3400000,
      upiHandle: 'narang.exports@pnb'
    },
    attackDetails: {
      vector: 'Fraudulent SIM Replacement at Telecom Retail Store using Fake Aadhaar',
      method: 'Suspect deactivated victim legitimate Airtel SIM via store insider; intercepted corporate net-banking password reset OTPs at 2:00 AM; initiated RTGS transfers to 4 mule accounts',
      platform: 'Telecom Store POS / Corporate Internet Banking',
      url: 'https://netbanking.pnbindia.in (Legitimate site abused via stolen OTP)',
      ipAddress: '115.240.90.12',
      deviceFingerprint: 'OnePlus 10 Pro (MAC: 48:2C:6A:11:89:FE)',
      transactionRef: 'RTGS/PUNB420199210082/CANARA/MuleExports',
      suspectedMalware: 'N/A (Social Engineering / Telecom Store Insider Collusion)',
      technicalIndicators: 'SIM swap timestamp: 2026-09-10 18:30 IST; First unauthorized login: 2026-09-11 02:14 IST'
    },
    suspect: {
      name: 'Dharmendra Yadav & Telecom Store Executive Imran Khan',
      alias: '"Dharmi Mumbai" / @sim_kingpin',
      contact: '+91 98330 11984',
      knownIdentifiers: 'Fingerprint match from store biometric kiosk log',
      associatedAccounts: 'Canara Bank Mule Account 11092841029',
      knownIPs: ['115.240.90.12'],
      notes: 'Store executive received ₹50,000 for approving fraudulent SIM swap without physical ID verification.'
    },
    evidenceCount: 6,
    timeline: [
      {
        id: 'TL-1',
        title: 'Victim Reported Sudden "No Service" on Mobile & ₹34L Debit',
        timestamp: '2026-09-11T09:00:00+05:30',
        officer: 'Sub-Inspector Vikram Rathore',
        description: 'FIR registered under Section 66C and 66D IT Act, along with Section 420 IPC.'
      },
      {
        id: 'TL-2',
        title: 'CFCFRMS Emergency Lien Placed on ₹28.5L',
        timestamp: '2026-09-11T10:15:00+05:30',
        officer: 'Sub-Inspector Vikram Rathore',
        description: 'Quick coordination with Canara Bank froze ₹28,50,000 before ATM cash withdrawal.'
      },
      {
        id: 'TL-3',
        title: 'Telecom Store Executive & Mastermind Arrested; Charge Sheet Filed',
        timestamp: '2026-09-18T16:30:00+05:30',
        officer: 'Sub-Inspector Vikram Rathore',
        description: 'Both accused remanded to judicial custody. Court order obtained to refund ₹28.5L to victim.'
      }
    ],
    relatedCases: [
      { caseId: 'CT-2026-00124', similarity: 68, reason: 'Similar secondary mule beneficiary accounts' }
    ]
  },
  {
    id: 'CT-2026-00132',
    title: 'University Examination Portal SQL Injection & Student Record Data Breach',
    category: 'Data Breach',
    severity: 'Medium',
    status: 'Suspect Identified',
    aiRiskLevel: 'Medium',
    riskScore: 54,
    createdAt: '2026-09-14T16:20:00+05:30',
    updatedAt: '2026-09-20T12:00:00+05:30',
    assignedInvestigator: 'Sneha Patel',
    investigatorId: 'INV-0789',
    department: 'Cyber Security Operations Center (CSOC)',
    location: {
      city: 'Kolkata',
      state: 'West Bengal',
      lat: 22.5726,
      lng: 88.3639,
      station: 'Lalbazar Cyber Crime PS'
    },
    victim: {
      name: 'State Technical University Examination Board',
      phone: '+91 33 2214 5500',
      age: 48,
      organization: 'State Affiliated Higher Education Institution (65,000 Students)',
      accountAffected: 'Oracle Database Server / Web Results Portal',
      financialLoss: 0,
      upiHandle: 'N/A'
    },
    attackDetails: {
      vector: 'Unsanitized GET parameter in Examination Results Search Form',
      method: 'Union-based SQL injection dumped 65,000 student records including Aadhaar numbers, DOB, phone numbers, and academic transcripts; offered for sale on BreachForums for $800',
      platform: 'PHP 7.4 / Apache / Oracle 12c',
      url: 'https://results.statetechuniv-wb.ac.in/check_marks.php?reg_no=1',
      ipAddress: '14.139.212.45',
      deviceFingerprint: 'sqlmap/1.7.2#stable',
      transactionRef: 'N/A',
      suspectedMalware: 'Automated SQLmap Scanner & Darkweb Extortion Threat',
      technicalIndicators: 'User-Agent: sqlmap/1.7#stable; Payload: UNION SELECT null, username, password_hash, aadhaar FROM admin_users--'
    },
    suspect: {
      name: 'Sourav B. (Alias "H4ck3r_Bengal")',
      alias: 'BreachForums handle: @KolkataRoot',
      contact: '+91 98300 29104',
      knownIdentifiers: 'Telegram ID: 5910284918',
      associatedAccounts: 'Crypto Monero (XMR) Address',
      knownIPs: ['14.139.212.45', '115.187.40.91'],
      notes: 'Final year computer science student from affiliated college looking to modify 6th-semester marks.'
    },
    evidenceCount: 4,
    timeline: [
      {
        id: 'TL-1',
        title: 'Darkweb Intelligence Scraping Alert Triggered',
        timestamp: '2026-09-14T16:20:00+05:30',
        officer: 'Sneha Patel',
        description: 'Automated CSOC crawler spotted sample university database dump on hacker forum.'
      },
      {
        id: 'TL-2',
        title: 'Web Application Vulnerability Patched',
        timestamp: '2026-09-15T11:00:00+05:30',
        officer: 'Sneha Patel',
        description: 'Vulnerability mitigated using parameterized prepared statements. Audit of database access logs.'
      },
      {
        id: 'TL-3',
        title: 'ISP Broadband Subscriber Traced to College Hostel in Salt Lake',
        timestamp: '2026-09-20T12:00:00+05:30',
        officer: 'Sneha Patel',
        description: 'Suspect laptop seized under Section 43/66 IT Act. Accused confessed to discovering flaw via YouTube tutorial.'
      }
    ],
    relatedCases: []
  }
];

export const CYBERCRIME_CATEGORIES = [
  'Phishing',
  'Financial Fraud (UPI/Net-Banking)',
  'Identity Theft',
  'Account Takeover',
  'Malware',
  'Ransomware',
  'Cyberstalking',
  'Social Engineering',
  'Data Breach',
  'Other Cybercrimes'
];

export const CASE_STATUSES = [
  'Reported',
  'Under Investigation',
  'Evidence Collection',
  'Suspect Identified',
  'Legal Processing',
  'Resolved',
  'Closed'
];

export const SEVERITY_LEVELS = [
  'Critical',
  'High',
  'Medium',
  'Low'
];
