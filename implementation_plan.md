# Implementation Plan: CrimeTraceAI — AI-Powered Cybercrime Investigation & Case Management System

Build a full-scale, production-grade cybercrime investigation and intelligence web application designed specifically for Indian law-enforcement agencies (Cyber Crime Cells, State Police Cyber Units, and I4C coordination). The system provides end-to-end case registration, interactive investigation tracking, geographic cybercrime mapping across Indian states/cities, two machine learning prediction workflows, digital evidence chain of custody, actionable intelligence analytics, and audit logging.

## Proposed Architecture & Tech Stack

- **Frontend Core**: React 18/19 with Vite for ultra-fast performance, zero-friction local development, and clean component isolation.
- **Icons & Visuals**: `lucide-react` for authoritative, high-clarity SOC and law-enforcement icons.
- **Geographic Mapping**: Leaflet & React-Leaflet with custom CartoDB Dark Matter / OpenStreetMap tiles centered on India (`[20.5937, 78.9629]`), custom cyber incident markers, cluster/heat visualization, state boundaries, and incident cards.
- **Data Visualizations**: Custom, responsive SVG & Canvas chart components (Trend Lines, Category Donut with inner legends, Investigation Funnel, State Loss Bars, ML Confidence Radar/Probability Curves) built cleanly with zero bloat and smooth animations.
- **Styling & Design System**: Modern cybersecurity SOC interface using CSS variables:
  - Deep Navy / Midnight Blue (`#0B132B`, `#0F1D38`, `#122347`)
  - Subtle borders (`#1E2E4E`, `#253B65`)
  - Accent colors: Police Cyan (`#00B4D8`), Alert Amber (`#F59E0B`), Emergency Red (`#EF4444`), Resolved Emerald (`#10B981`)
  - Modern typography: `Inter` / `IBM Plex Sans` from Google Fonts
  - High-density information layout with clear visual hierarchy
- **Operational Indian Context**:
  - Timestamps: Strictly formatted in Indian Standard Time (**IST, UTC+5:30**) in `DD-MM-YYYY HH:mm` format
  - Currency: Indian Rupee (**₹**) formatted with Indian numbering notation (e.g., `₹2,45,000`, `₹15,00,000`)
  - Phone numbers: Indian format (`+91 98XXX XXXXX`)
  - Locations: Real Indian States & Major Cybercrime Hubs (Maharashtra - Mumbai/Pune, Karnataka - Bengaluru, Delhi NCR, Tamil Nadu - Chennai, Telangana - Hyderabad, Gujarat - Ahmedabad, West Bengal - Kolkata, Rajasthan - Jaipur, etc.)
  - Legal & Procedural references: Aligned with India's National Cyber Crime Reporting Portal (`cybercrime.gov.in`), I4C, Section 66/66C/66D/43 IT Act 2000, Golden Hour freeze protocols, and Section 91 CrPC notices.
- **Backend-Ready REST Service Layer**:
  - `src/services/api.js` with `VITE_API_BASE_URL` configurable environment variable
  - Modular API clients (`caseService`, `evidenceService`, `predictionService`, `analyticsService`, `authService`, `auditService`)
  - Automatic localStorage persistence layer so investigator actions (creating cases, uploading evidence, updating status, running predictions) persist across refreshes during live demonstrations.
- **Version Control**: Git repository initialized, clean `.gitignore`, conventional commits, and pushed to `https://github.com/reshma-kn1805/Crime-TraceAI.git` on `main`.

---

## User Review Required

> [!IMPORTANT]
> - **Demo Credentials**: The application will include pre-loaded official credentials for quick access (Lead Cyber Investigator, ACP Admin, and Cyber Intelligence Analyst) as well as quick-switch role toggling to demonstrate role-based access control.
> - **Machine Learning Engine**: Two operational supervised classification & risk scoring ML models will be implemented directly on the frontend (with extensible backend REST hooks), providing real-time inference, confidence intervals, contributing factor radar weights, and investigative recommendations.
> - **GitHub Push**: Git commit and push will target `https://github.com/reshma-kn1805/Crime-TraceAI.git` on branch `main` using the configured local Git credential manager.

---

## Proposed Modules & Implementation Steps

### 1. Project Initialization & Styling System
- Set up Vite + React project with all dependencies (`lucide-react`, `leaflet`, `react-leaflet`).
- Establish `index.css` design system with CSS custom properties (dark midnight SOC theme tokens, typography, glass highlights, custom scrollbars, badges, card layouts, tooltips, responsive grid).
- Configure Google Fonts (`Inter`, `JetBrains Mono` for IOCs/hashes).

### 2. State Management & REST Integration Layer
- **`src/services/api.js`**: Centralized HTTP client abstraction with interceptors, base URL config (`VITE_API_BASE_URL`), and mock fallback.
- **`src/services/caseService.js`**: CRUD operations, search/filter algorithms, and status transition tracking.
- **`src/services/predictionService.js`**: Inference API client and simulated ML classifier models with explainable feature weights.
- **`src/context/AuthContext.jsx`**: Investigator session, role permissions (Admin, Investigator, Analyst), IST login logs.
- **`src/context/CaseContext.jsx`**: Global active cases, evidence vault, notifications, live status update hooks.
- **`src/context/ToastContext.jsx`**: High-priority alert toasts and operation feedback.

### 3. Comprehensive Indian Cybercrime Dataset
- Construct realistic dataset of 20+ detailed cybercrime cases featuring:
  - UPI / QR Code Merchant Phishing (`CT-2026-00124`)
  - Netbanking SIM Swap & OTP Bypass (`CT-2026-00125`)
  - State Healthcare Infrastructure Ransomware (`CT-2026-00126`)
  - Digital Arrest & CBI Impersonation Scam (`CT-2026-00127`)
  - Aadhaar-Enabled Payment System (AePS) Biometric Clone (`CT-2026-00128`)
  - Fake Investment & Telegram Task Syndicate (`CT-2026-00129`)
  - Micro-Loan App Extortion & Contact Harassment (`CT-2026-00130`)
  - Deepfake Video Call Blackmail (`CT-2026-00131`)
- Detailed suspect records, technical IOCs (malicious IPs, mule UPI VPAs, fake domains), and digital evidence items with SHA-256 hashes.

### 4. Core Application Shell & Navigation
- **Sidebar**: Persistent, collapsible left navigation with CrimeTraceAI shield emblem, active menu items, role indicator, and quick sign-out.
- **Topbar**: Breadcrumbs, live IST clock, global search shortcut (`Ctrl+K`), CERT-In threat level badge, notification bell with unread badge counter, and officer profile menu.
- **Global Search Modal (`Ctrl+K`)**: Rapid search across Case IDs, victim names, suspect aliases, IP addresses, UPI handles, and evidence filenames.

### 5. Main Dashboard (`/`)
- 6 KPI metric cards with historical month-over-month trends: Total Cases, Active Investigations, Critical High-Risk Cases, Solved Cases, New Cases (This Month), Pending Evidence Analysis.
- Interactive Cybercrime Trend chart with daily/weekly/monthly aggregation and IST date axis.
- Cybercrime Category Distribution Donut chart with legend and percentage breakdowns.
- Case Severity distribution breakdown and Investigation Status funnel.
- Recent Cases interactive table with status badge, priority chip, assigned investigator, and direct view actions.
- Real-time AI Intelligence stream showing emerging syndicate warnings and actionable alerts.

### 6. Multi-Step Cybercrime Reporting Workflow (`/report`)
- 6-step wizard with visual progress bar, validation, and draft saving:
  - **Step 1: Incident Information** (Title, Category, IST Date/Time picker, State & District dropdown, Digital Platform, Description).
  - **Step 2: Victim Information** (Full Name, Indian Mobile `+91`, Age, Organization, Account/Platform ID, Financial Loss in `₹` with Indian commas).
  - **Step 3: Attack Details** (Attack Vector, Technique, Platform, Malicious URL/Domain, IP Address, Device Fingerprint, Transaction/UPI Reference ID / UTR, Suspected Malware).
  - **Step 4: Digital Evidence** (Drag-and-drop file upload, file type categorization, auto-generated SHA-256 hash preview, size, IST timestamp, chain-of-custody note).
  - **Step 5: Suspect Information** (Suspect Name/Alias, Contact info, Mule Accounts, Known UPI IDs, Known IPs, Telegram/WhatsApp handles).
  - **Step 6: Review & Final Submission** (Comprehensive preview card, Save Draft, and Submit Case).
- Submission generates unique Case ID (`CT-2026-XXXXX`), logs audit trail, adds to global state, and renders an official confirmation screen citing alignment with India's National Cyber Crime Reporting Portal (`cybercrime.gov.in`).

### 7. Cases Management & Case Details Workspace (`/cases` & `/cases/:id`)
- **Cases Table Page**:
  - Filter by Category, Status, Severity, State/Region, Investigator, and AI Risk Level.
  - Quick actions: View, Update Status modal, Assign Officer modal, Export to CSV/JSON.
- **Case Details Workspace**:
  - Full investigation header with status badges, risk level meter, and action toolbar.
  - Incident & Victim Overview card with financial loss in ₹ and location badge.
  - Technical IOCs card (IPs, Domains, UPI VPAs, Hashes).
  - Chain of Custody & Evidence Vault (view attached evidence, verify hash, preview).
  - Suspect Intelligence Profile.
  - Interactive Investigation Timeline (IST chronological audit trail with "Add Investigation Note" modal).
  - AI Similar Cases & IOC Linkage panel (shows % similarity, shared mule account, and link explanation).
  - Official Report Generation button with instant printable FIR/Case Dossier view.

### 8. Interactive Geographic Cybercrime Map (`/map`)
- Leaflet map centered on India with CartoDB Dark Matter tiles.
- Geo-located incident markers across Indian states (Maharashtra, Karnataka, Delhi NCR, Tamil Nadu, Telangana, Gujarat, West Bengal, etc.).
- Heatmap / cluster density visualization.
- Interactive popups showing Case ID, Category, Severity, Loss (₹), Status, Date (IST), and quick view link.
- Side Analytics Panel: State incident leaderboard, top threat vectors, incident count, and state-level filters.

### 9. AI Cybercrime Prediction & Risk Intelligence (`/prediction`)
- **Model 1: Supervised Cybercrime Category Classification**:
  - Evaluates attack method, technical indicators, financial loss, communication channel, and platform.
  - Outputs predicted category, confidence percentage, input feature importance, and model evaluation metrics (Precision, Recall, F1).
- **Model 2: Case Risk & Priority Classifier**:
  - Evaluates financial impact (₹), vulnerability index, syndicate pattern indicators, and cross-border infrastructure.
  - Outputs Risk Level (Critical, High, Medium, Low), recommended investigation priority, and key contributing factors.
- **Interactive Investigator Analysis Workbench**:
  - Preset incident quick-loaders (e.g. "Senior Citizen Digital Arrest ₹15L", "UPI QR Code Phishing ₹45k", "Hospital Ransomware ₹50L") or custom input form.
  - Live animated inference sequence simulating neural network processing.
  - Decision-support explanation card detailing why the AI reached this conclusion and recommended investigative steps (e.g., Section 91 CrPC notice, Golden Hour bank freeze).

### 10. AI Pattern Detection & Intelligence (`/insights`)
- Syndicate pattern detection (e.g. Jamtara/Mewat fake loan app nexus, Southeast Asian task fraud networks).
- IOC Cross-Case Correlator (matching IP addresses, mule accounts, bank IFSCs across multiple cases).
- Potentially related case matrix with similarity breakdown.

### 11. Analytics & Official Report Generator (`/analytics`)
- Deep analytical dashboards:
  - Temporal trend analysis (monthly case surge vs resolution rate).
  - Financial loss recovery statistics (Amount Reported vs Amount Frozen in Golden Hour).
  - Average investigation resolution duration by category.
  - Regional distribution across Indian states.
  - Investigator workload distribution chart.
- **Official Report Generator**:
  - Select report type (Comprehensive Case Dossier, State Trend Report, Evidence Audit Summary, AI Risk Analysis Report).
  - Generates official formatted document with National Cyber Crime emblem, official reference numbers, watermarks, IST timestamps, and Investigating Officer signature lines.
  - Instant print and PDF export support.

### 12. Digital Evidence Vault (`/evidence`)
- Centralized repository of all seized digital evidence.
- Categorization (Disk Image, Packet Capture, Mobile Dump, Bank Statement, Chat Log, Screenshot, Malware Binary).
- Built-in SHA-256 integrity hash verification tool to validate chain of custody.
- Upload New Evidence modal with metadata tagging.

### 13. Security, Settings, Audit Log & Role Management
- **Audit Log (`/audit`)**: Immutable chronological log of all officer actions (Case viewed, status modified, evidence downloaded, report generated) with IST timestamps and IP addresses.
- **Notifications (`/notifications`)**: Urgent Golden-Hour freeze alerts, AI IOC matches, court deadline reminders.
- **Profile & Settings (`/settings`)**: Officer credentials, 2FA settings, active sessions with IST timestamps, UI language toggle (English / Hindi), role switcher (Admin / Lead Investigator / Analyst).

### 14. Testing, Documentation & Git Deployment
- Build validation with Vite (`npm run build`).
- Verify responsive layout, keyboard interactions, modal flows, and data consistency.
- Create comprehensive `README.md` with system overview, architecture, Spring Boot REST API integration guide, and screenshots/feature descriptions.
- Commit all code with conventional commit messages and push to `https://github.com/reshma-kn1805/Crime-TraceAI.git` on `main`.

---

## Verification Plan

### Automated Checks
- `npm run build`: Verify clean TypeScript/JavaScript compilation, zero syntax errors, and optimized bundle output.
- Check bundle assets and ensure all assets resolve without broken links.

### Manual & Interactive Verification
- **Login Flow**: Test authentication, role switching, and session timestamp formatting.
- **Dashboard**: Verify all 6 KPI cards, trend chart switching (Daily/Weekly/Monthly), donut chart interactions, and recent cases table.
- **Reporting Stepper**: Complete a full 6-step cybercrime case filing with Indian phone, INR currency, file upload, and verify generated `CT-2026-XXXXX` case appears in the Cases list.
- **Map View**: Verify India map rendering, markers on Mumbai, Bengaluru, Delhi, etc., popup details, and side analytics filtering.
- **AI Prediction Engine**: Test Category Classification and Case Risk models with both presets and custom inputs; verify confidence scores, feature weights, and investigative recommendations.
- **Evidence Vault**: Verify SHA-256 hash generator and chain of custody log.
- **Analytics & Report Generation**: Generate an official printable Case Dossier and verify IST date/time headers and official layout.
- **Audit Log**: Verify actions logged during the session appear with accurate IST timestamps.
- **Git Push**: Verify successful push to `https://github.com/reshma-kn1805/Crime-TraceAI.git`.
