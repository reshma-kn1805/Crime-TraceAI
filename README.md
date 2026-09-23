# CrimeTraceAI — AI-Powered Cybercrime Investigation & Intelligence Platform

[![Live Application](https://img.shields.io/badge/Live%20Demo-CrimeTraceAI%20SOC-00B4D8?style=for-the-badge&logo=google-chrome&logoColor=white)](https://reshma-kn1805.github.io/Crime-TraceAI/)
[![Deployment Status](https://img.shields.io/badge/Deployment-GitHub%20Pages-22C55E?style=for-the-badge&logo=github)](https://reshma-kn1805.github.io/Crime-TraceAI/)
[![Build Status](https://img.shields.io/badge/Build-Passing-10B981?style=for-the-badge&logo=vite)](https://github.com/reshma-kn1805/Crime-TraceAI)
[![Operational Jurisdiction](https://img.shields.io/badge/Jurisdiction-India%20Cyber%20Crime%20Cells-00B4D8?style=for-the-badge&logo=shield)](https://cybercrime.gov.in)
[![Security Standard](https://img.shields.io/badge/Statutory-IT%20Act%202000%20%7C%20Sec%2065B-8B5CF6?style=for-the-badge)](https://www.meity.gov.in)

> 🚀 **Live Working App URL (GitHub Pages)**:  
> **[https://reshma-kn1805.github.io/Crime-TraceAI/](https://reshma-kn1805.github.io/Crime-TraceAI/)**
> 
> ⚡ **Instant 1-Click Live Deployments (Free)**:  
> [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/reshma-kn1805/Crime-TraceAI) &nbsp; [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/reshma-kn1805/Crime-TraceAI)

**CrimeTraceAI** is a state-of-the-art cybercrime investigation, intelligence analysis, and case management platform built specifically for Indian law-enforcement agencies (Cyber Crime Cells, State Police Specialized Units, and Central Law Enforcement Agencies working in coordination with India's National Cyber Crime Reporting ecosystem and I4C).

Designed to reflect the realities of modern cybersecurity SOCs and digital forensics labs, CrimeTraceAI eliminates generic crime dashboard aesthetics in favor of a mission-critical, intelligence-first command center.

---

## 🏛️ Core Purpose & Operational Capabilities

1. **Cybercrime Case Intake & FIR Registration**:
   - Multi-step reporting wizard compliant with **National Cyber Crime Reporting Portal (`cybercrime.gov.in`)** and **I4C** standards.
   - Comprehensive capture of Complainant, Victim, Technical IOCs, Beneficiary Mule Accounts, and Suspect Profiles.
2. **AI-Assisted Dual Machine Learning Workflows**:
   - **Model 1: Supervised Cybercrime Category Classifier**: Real-time classification of incoming narratives into vectors such as UPI/Net-Banking Fraud, Phishing, Ransomware, Identity Theft (AePS clones), Account Takeover, Cyberstalking, or Data Breaches.
   - **Model 2: Case Risk & Priority Classifier**: Computes probability-based risk scores (Critical, High, Medium, Low), triggering **1930 / CFCFRMS Golden Hour** bank account lien alerts.
   - **Explainable AI (XAI)**: Displays contributing factor attribution weights for every prediction.
3. **Interactive National Geographic Cybercrime Map**:
   - Calibrated Leaflet map centered on India with CartoDB Dark Matter SOC tiles.
   - City and state markers across Indian hubs (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Ahmedabad, Kolkata, Jamtara, Mewat).
   - Side analytics panel detailing regional loss leaderboards and cyber police station jurisdictions.
4. **Digital Evidence Vault & Chain of Custody**:
   - Cryptographic **SHA-256** hash generation and bitstream verification.
   - **Section 65B Indian Evidence Act** certificate generation and logging.
5. **Syndicate Pattern Detection & IOC Correlator**:
   - Heuristic graph linking across cases sharing malicious C2 IP blocks, spoofed SMS headers, mule accounts, or Telegram scam bots.
6. **Statutory Analytics & Official FIR Dossier Generation**:
   - Pan-India financial loss recovery metrics (Reported vs Frozen in Golden Hour).
   - Instant printable / exportable official Case FIRs and Executive Briefings with IST headers and signature blocks.
7. **Role-Based Access Control (RBAC) & Immutable Audit Trail**:
   - Role separation: **Administrator**, **Investigator**, and **Analyst**.
   - Tamper-resistant activity ledger tracking all case access, evidence seizures, and status transitions in **IST (UTC+5:30)**.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Core Framework** | React 19 + Vite (Fast HMR & Optimized Bundles) |
| **Styling & Design System** | Custom Cybersecurity SOC Theme (CSS Variables, Midnight Navy, High Contrast) |
| **Icons & Visuals** | Lucide React |
| **Geographic Mapping** | Leaflet & React-Leaflet (CartoDB Dark Matter Basemap) |
| **Data Visualizations** | Custom SVG/Canvas Charts (Trend Timeseries, Donut Slices, Severity Funnel) |
| **Formatting** | Indian Standard Time (**IST, DD-MM-YYYY**), INR (**₹**) with Indian comma grouping, +91 Mobile |
| **Backend Integration Architecture** | Clean REST Service Layer (`/services/api.js`) ready for Spring Boot backend |

---

## 📁 Project Architecture

```
CrimeTraceAI/
├── public/
│   ├── favicon.svg             # Law enforcement cyber shield emblem
├── src/
│   ├── components/
│   │   ├── common/             # Sidebar, Topbar, Modal, Badges, GlobalSearchModal
│   │   └── dashboard/          # CyberTrendChart, CategoryDonutChart, CasePipeline, AiTicker
│   ├── context/
│   │   ├── AuthContext.jsx     # Session, Role-Based Access, 2FA
│   │   ├── CaseContext.jsx     # Global Reactive Case State, Evidence, Alerts
│   │   └── ToastContext.jsx    # Real-Time Operational Alerts
│   ├── data/
│   │   ├── mockCases.js        # Realistic Indian cybercrime cases dataset
│   │   ├── mockEvidence.js     # Forensics exhibits with SHA-256 hashes
│   │   ├── mockInvestigators.js# Officer profiles (Inspectors, ACPs, Analysts)
│   │   ├── indianGeoData.js    # Coordinates & regional statistics for Indian States
│   │   ├── mockNotifications.js# Time-critical statutory alerts
│   │   └── mockAuditLogs.js    # Immutable activity trail
│   ├── pages/
│   │   ├── LoginPage.jsx       # High-security split-screen auth gateway
│   │   ├── DashboardPage.jsx   # Main intelligence command center
│   │   ├── CasesPage.jsx       # Searchable, filterable case directory with CSV export
│   │   ├── CaseDetailPage.jsx  # Detailed investigation workspace with printable FIR
│   │   ├── ReportCrimePage.jsx # 6-step reporting wizard
│   │   ├── CyberMapPage.jsx    # Interactive India cybercrime map
│   │   ├── PredictionPage.jsx  # Dual ML classification & risk workbench
│   │   ├── InsightsPage.jsx    # Syndicate pattern detection
│   │   ├── AnalyticsPage.jsx   # Metrics & statutory report compiler
│   │   ├── EvidencePage.jsx    # Digital evidence vault & SHA-256 verification tool
│   │   ├── NotificationsPage.jsx
│   │   ├── AuditLogPage.jsx    # Security audit trail
│   │   └── SettingsPage.jsx    # Profile, 2FA, Hindi/English language toggle
│   ├── services/
│   │   ├── api.js              # Spring Boot REST client abstraction
│   │   ├── caseService.js      # CRUD & status transitions
│   │   ├── evidenceService.js  # Exhibit ingestion & hash verification
│   │   ├── predictionService.js# Machine learning inference client
│   │   └── auditService.js     # Audit logging
│   ├── utils/
│   │   ├── formatters.js       # IST dates, ₹ INR currency, +91 phone formatting
│   │   ├── mlPredictor.js      # Supervised ML classification engine
│   │   └── hashGenerator.js   # Digital forensic SHA-256 hashing
│   ├── App.jsx                 # Main application layout & router
│   ├── index.css               # SOC Design System
│   └── main.jsx
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

---

## 🔌 Spring Boot Backend Integration Architecture

The frontend is structured with an extensible service layer located in `src/services/`.

- **API Base URL**: Configurable via the `VITE_API_BASE_URL` environment variable (defaults to `http://localhost:8080/api/v1`).
- **REST Endpoints Supported**:
  - `POST /auth/login` — Officer authentication and JWT token issuance
  - `GET /cases` — Paginated case directory with search and jurisdictional filtering
  - `POST /cases` — Intake of new cybercrime FIRs
  - `PUT /cases/{id}/status` — Transition of investigation status with audit log
  - `GET /evidence` & `POST /evidence` — Digital exhibits with SHA-256 validation
  - `POST /predict/category` & `POST /predict/risk` — ML inference hooks
  - `GET /audit-logs` — Immutable audit trail retrieval
- **Zero-Friction Fallback**: If a live Spring Boot server is not running during local demonstration, the client automatically utilizes an active `localStorage` persistence layer, allowing full CRUD operations, status updates, and exhibit uploads to persist across browser refreshes.

---

## 🚀 Setup & Local Execution

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/reshma-kn1805/Crime-TraceAI.git
cd Crime-TraceAI

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` (or the port indicated in terminal) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 👮 Demo Personnel Credentials

For quick evaluation and demonstrations, the login portal includes 1-click credential auto-fill for three official roles:

| Officer Name | Role | Department / Hub |
|---|---|---|
| **Inspector Reshma K.** | Lead Investigator | Cyber Crime Police Station (CID), Bengaluru |
| **ACP Rajesh Verma** | Administrator | IFSO Special Cell, New Delhi |
| **Sneha Patel** | Cyber Forensic Analyst | CSOC, Mumbai |

Alternatively, any valid official police email format can be entered. Use the sidebar demo pill to toggle roles dynamically during evaluation.

---

## 📜 Legal & Compliance Notice

This system handles sensitive simulated cybercrime data for academic and law-enforcement technological evaluation. In production deployments, access is restricted to authorized cyber cell personnel in accordance with the **Information Technology Act, 2000** and statutory criminal procedure.
