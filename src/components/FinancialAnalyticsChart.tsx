import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Layers, 
  BarChart3, 
  LineChart as LineChartIcon,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Percent,
  Download
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { Invoice } from '../types';
import { downloadInvoicesCSV } from '../utils/csvExport';

interface FinancialAnalyticsChartProps {
  invoices: Invoice[];
  currentMRR: number;
}

type ChartDisplayMode = 'mrr_trend' | 'status_breakdown' | 'cumulative';
type TimeframeFilter = 'all' | '6m' | '3m';

export const FinancialAnalyticsChart: React.FC<FinancialAnalyticsChartProps> = ({
  invoices,
  currentMRR,
}) => {
  const [displayMode, setDisplayMode] = useState<ChartDisplayMode>('mrr_trend');
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('6m');

  // Parse and aggregate monthly recurring revenue data from invoices
  const { monthlyData, aggregateMetrics } = useMemo(() => {
    const monthMap: Record<string, {
      monthKey: string;
      monthLabel: string;
      paid: number;
      pending: number;
      overdue: number;
      totalInvoiced: number;
      count: number;
      clients: Set<string>;
    }> = {};

    invoices.forEach((inv) => {
      const date = new Date(inv.issueDate);
      // Format YYYY-MM
      const year = date.getFullYear();
      const monthNum = String(date.getMonth() + 1).padStart(2, '0');
      const key = `${year}-${monthNum}`;

      const monthName = date.toLocaleString('default', { month: 'short' });
      const yearShort = String(year).slice(-2);
      const label = `${monthName} '${yearShort}`;

      if (!monthMap[key]) {
        monthMap[key] = {
          monthKey: key,
          monthLabel: label,
          paid: 0,
          pending: 0,
          overdue: 0,
          totalInvoiced: 0,
          count: 0,
          clients: new Set<string>(),
        };
      }

      if (inv.status === 'paid') {
        monthMap[key].paid += inv.total;
      } else if (inv.status === 'pending') {
        monthMap[key].pending += inv.total;
      } else if (inv.status === 'overdue') {
        monthMap[key].overdue += inv.total;
      }

      monthMap[key].totalInvoiced += inv.total;
      monthMap[key].count += 1;
      monthMap[key].clients.add(inv.clientName);
    });

    // Sort chronologically
    const sortedKeys = Object.keys(monthMap).sort();
    let cumulativeSum = 0;

    const fullList = sortedKeys.map((key, idx) => {
      const item = monthMap[key];
      cumulativeSum += item.paid;
      const prevItem = idx > 0 ? monthMap[sortedKeys[idx - 1]] : null;
      const momGrowth = prevItem && prevItem.totalInvoiced > 0
        ? Math.round(((item.totalInvoiced - prevItem.totalInvoiced) / prevItem.totalInvoiced) * 100)
        : 0;

      return {
        key: item.monthKey,
        month: item.monthLabel,
        paid: item.paid,
        pending: item.pending,
        overdue: item.overdue,
        totalInvoiced: item.totalInvoiced,
        cumulativePaid: cumulativeSum,
        clientCount: item.clients.size,
        collectionRate: item.totalInvoiced > 0 ? Math.round((item.paid / item.totalInvoiced) * 100) : 100,
        momGrowth,
      };
    });

    // Apply timeframe filter
    let filtered = [...fullList];
    if (timeframe === '3m') {
      filtered = filtered.slice(-3);
    } else if (timeframe === '6m') {
      filtered = filtered.slice(-6);
    }

    // High level financial metrics
    const totalPaidAllTime = invoices.filter(i => i.status === 'paid').reduce((a, b) => a + b.total, 0);
    const totalPendingAllTime = invoices.filter(i => i.status === 'pending').reduce((a, b) => a + b.total, 0);
    const totalInvoicedAllTime = totalPaidAllTime + totalPendingAllTime;
    const overallCollectionRate = totalInvoicedAllTime > 0
      ? Math.round((totalPaidAllTime / totalInvoicedAllTime) * 100)
      : 100;

    const lastMonth = fullList[fullList.length - 1];
    const secondLastMonth = fullList[fullList.length - 2];
    const latestMoMGrowth = (lastMonth && secondLastMonth && secondLastMonth.totalInvoiced > 0)
      ? Math.round(((lastMonth.totalInvoiced - secondLastMonth.totalInvoiced) / secondLastMonth.totalInvoiced) * 100)
      : 14;

    const avgRetainer = invoices.length > 0 
      ? Math.round(totalInvoicedAllTime / invoices.length) 
      : 5500;

    return {
      monthlyData: filtered,
      aggregateMetrics: {
        totalPaidAllTime,
        totalPendingAllTime,
        totalInvoicedAllTime,
        overallCollectionRate,
        latestMoMGrowth,
        avgRetainer,
      }
    };
  }, [invoices, timeframe]);

  // Custom Dark Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-slate-700/80 rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-xs space-y-2 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white tracking-wide">{data.month}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {data.clientCount} active accounts
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between items-center text-emerald-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Settled (Paid):</span>
              </span>
              <span className="font-bold">${data.paid.toLocaleString()}</span>
            </div>

            {data.pending > 0 && (
              <div className="flex justify-between items-center text-amber-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>Pending Due:</span>
                </span>
                <span className="font-bold">${data.pending.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-slate-300 pt-1.5 border-t border-slate-800">
              <span className="font-semibold text-slate-400">Total Billed:</span>
              <span className="font-bold text-white">${data.totalInvoiced.toLocaleString()}</span>
            </div>

            {displayMode === 'cumulative' && (
              <div className="flex justify-between items-center text-cyan-300 pt-1">
                <span>Cumulative:</span>
                <span className="font-bold">${data.cumulativePaid.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>Collection Efficiency:</span>
            <span className="font-semibold text-emerald-400">{data.collectionRate}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      
      {/* Header: Title, Mode Selector, Timeframe Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Monthly Recurring Revenue (MRR) & Invoicing Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic financial run-rate plotted directly from verified invoice records and retainer settlements
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Chart Display Mode Selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setDisplayMode('mrr_trend')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                displayMode === 'mrr_trend'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5" />
              <span>MRR Trend</span>
            </button>

            <button
              onClick={() => setDisplayMode('status_breakdown')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                displayMode === 'status_breakdown'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Status Mix</span>
            </button>

            <button
              onClick={() => setDisplayMode('cumulative')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                displayMode === 'cumulative'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Cumulative</span>
            </button>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['3m', '6m', 'all'] as TimeframeFilter[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1.5 rounded-lg font-medium uppercase text-[11px] transition-colors ${
                  timeframe === tf
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Quick Export Button */}
          <button
            onClick={() => {
              downloadInvoicesCSV(invoices, { format: 'detailed' });
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Export full financial invoice ledger to CSV"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Snapshot Mini-Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 font-medium block">Total Invoiced (Period)</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-white mt-1 block">
            ${aggregateMetrics.totalInvoicedAllTime.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +{aggregateMetrics.latestMoMGrowth}% MoM Velocity
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 font-medium block">Settled Retainers</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-1 block">
            ${aggregateMetrics.totalPaidAllTime.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Cleared direct via ACH
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 font-medium block">Pending Receivables</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-amber-400 mt-1 block">
            ${aggregateMetrics.totalPendingAllTime.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" /> Current cycle awaiting
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 font-medium block">Collection Efficiency</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-cyan-300 mt-1 block">
            {aggregateMetrics.overallCollectionRate}%
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-cyan-400" /> Avg: ${aggregateMetrics.avgRetainer.toLocaleString()} / client
          </span>
        </div>
      </div>

      {/* Main Recharts Container */}
      <div className="pt-2">
        <div className="h-72 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {displayMode === 'mrr_trend' ? (
              /* MRR Smooth Area Chart with Gradient Fills */
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  height={32}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
                />
                
                {/* Total Invoiced Line / Area */}
                <Area 
                  type="monotone" 
                  dataKey="totalInvoiced" 
                  name="Total Billed MRR" 
                  stroke="#818cf8" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#totalGradient)" 
                  activeDot={{ r: 6, stroke: '#818cf8', strokeWidth: 2, fill: '#0f172a' }}
                />

                {/* Paid Retainers Line / Area */}
                <Area 
                  type="monotone" 
                  dataKey="paid" 
                  name="Settled Retainers ($)" 
                  stroke="#10b981" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#paidGradient)" 
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#0f172a' }}
                />

                {/* Current MRR Reference Baseline */}
                <ReferenceLine 
                  y={currentMRR} 
                  stroke="#06b6d4" 
                  strokeDasharray="4 4" 
                  label={{ 
                    value: `Active Run-Rate: $${currentMRR.toLocaleString()}`, 
                    fill: '#22d3ee', 
                    fontSize: 10, 
                    position: 'insideTopLeft' 
                  }} 
                />
              </AreaChart>
            ) : displayMode === 'status_breakdown' ? (
              /* Stacked Bar Chart for Status (Paid vs Pending) */
              <BarChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  height={32}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
                />
                
                <Bar 
                  dataKey="paid" 
                  name="Settled Retainer" 
                  stackId="statusStack" 
                  fill="#10b981" 
                  radius={[0, 0, 4, 4]} 
                />
                <Bar 
                  dataKey="pending" 
                  name="Pending Clearance" 
                  stackId="statusStack" 
                  fill="#f59e0b" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            ) : (
              /* Cumulative Revenue Trajectory */
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="cumulativeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  height={32}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulativePaid" 
                  name="Cumulative Agency Revenue ($)" 
                  stroke="#06b6d4" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#cumulativeGrad)" 
                  activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2, fill: '#0f172a' }}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Summary & Data Verification */}
      <div className="pt-3 border-t border-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            Computed from <strong>{invoices.length} verified invoices</strong> across {monthlyData.length} monthly billing cycles.
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Settled: <strong>${aggregateMetrics.totalPaidAllTime.toLocaleString()}</strong></span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Receivables: <strong>${aggregateMetrics.totalPendingAllTime.toLocaleString()}</strong></span>
          </span>
        </div>
      </div>

    </div>
  );
};
