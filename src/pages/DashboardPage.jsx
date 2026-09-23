import React from 'react';
import { 
  Shield, 
  FileCheck2, 
  AlertOctagon, 
  CheckCircle2, 
  Calendar, 
  HardDrive,
  Download,
  PlusCircle,
  RefreshCw
} from 'lucide-react';
import { useCases } from '../context/CaseContext';
import { KpiCard } from '../components/common/KpiCard';
import { CyberTrendChart } from '../components/dashboard/CyberTrendChart';
import { CategoryDonutChart } from '../components/dashboard/CategoryDonutChart';
import { CasePipelineChart } from '../components/dashboard/CasePipelineChart';
import { AiIntelligenceTicker } from '../components/dashboard/AiIntelligenceTicker';
import { RecentCasesTable } from '../components/dashboard/RecentCasesTable';

export const DashboardPage = ({
  onSelectCase,
  onNavigateReport,
  onNavigateCases,
  onNavigatePrediction,
  onNavigateInsights,
  onNavigateAnalytics
}) => {
  const { cases } = useCases();

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Shield size={28} style={{ color: 'var(--accent-cyan)' }} />
            Cybercrime Intelligence Dashboard
          </h1>
          <p className="page-subtitle">
            Monitor active investigations, emerging cybercrime patterns, and AI-generated intelligence across Indian jurisdictions.
          </p>
        </div>

        <div className="page-actions">
          <button
            onClick={onNavigateAnalytics}
            className="btn btn-secondary btn-sm"
          >
            <Download size={14} /> Export Briefing
          </button>
          <button
            onClick={onNavigateReport}
            className="btn btn-primary btn-sm"
          >
            <PlusCircle size={15} /> Report New Incident
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-6" style={{ marginBottom: '24px' }}>
        <KpiCard
          title="Total Cases"
          value="1,890"
          trend="+14.2%"
          trendPositive={true}
          icon={Shield}
          variant="cyan"
          description="Cumulative registered FIRs"
        />

        <KpiCard
          title="Active Inquiries"
          value="124"
          trend="+8.5%"
          trendPositive={true}
          icon={FileCheck2}
          variant="info"
          description="Under active investigation"
        />

        <KpiCard
          title="Critical Cases"
          value="18"
          trend="-5.2%"
          trendPositive={true}
          icon={AlertOctagon}
          variant="critical"
          description="Immediate Golden Hour response"
        />

        <KpiCard
          title="Cases Resolved"
          value="1,460"
          trend="+22.1%"
          trendPositive={true}
          icon={CheckCircle2}
          variant="success"
          description="Lien placed / Charge-sheet filed"
        />

        <KpiCard
          title="Cases This Month"
          value="490"
          trend="+12.0%"
          trendPositive={false}
          icon={Calendar}
          variant="purple"
          description="September 2026 filings"
        />

        <KpiCard
          title="Pending Forensics"
          value="38"
          trend="-8.0%"
          trendPositive={true}
          icon={HardDrive}
          variant="high"
          description="Awaiting digital hash verification"
        />
      </div>

      {/* Main Analytics Grid: Trend + Category Distribution */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        <CyberTrendChart />
        <CategoryDonutChart />
      </div>

      {/* Secondary Grid: Pipeline/Severity + AI Intelligence Ticker */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        <CasePipelineChart />
        <AiIntelligenceTicker
          onNavigatePrediction={onNavigatePrediction}
          onNavigateInsights={onNavigateInsights}
        />
      </div>

      {/* Recent Cases Table */}
      <RecentCasesTable
        cases={cases}
        onSelectCase={onSelectCase}
        onViewAllCases={onNavigateCases}
      />
    </div>
  );
};
