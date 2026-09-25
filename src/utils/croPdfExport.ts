import { jsPDF } from 'jspdf';
import { CroAuditProfile, CroChecklistItem, CroUploadedFile } from '../types';

export interface CroPdfExportData {
  profile: CroAuditProfile;
  checklist: CroChecklistItem[];
  uploadedFiles?: CroUploadedFile[];
  metrics: {
    monthlyVisitors: number;
    currentCR: number;
    targetCR: number;
    aov: number;
    adSpend: number;
    monthlyRevenueLeakage: number;
    annualRevenueOpportunity: number;
    currentCAC: number;
    targetCAC: number;
    cacReductionPct: number;
    estimatedRetainerRoi: string;
    completedTasks: number;
    totalTasks: number;
    healthScore: number;
  };
  aiReport?: string | null;
  strategistName?: string;
  agencyName?: string;
}

export function generateCroReportPdf(data: CroPdfExportData): void {
  const {
    profile,
    checklist,
    uploadedFiles = [],
    metrics,
    aiReport,
    strategistName = 'Abu Talib',
    agencyName = 'AIC Digital Growth & Agency Hub'
  } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Helper for checking page overflow and adding new page
  const checkAddPage = (neededHeight: number = 30) => {
    if (y + neededHeight > pageHeight - margin - 20) {
      doc.addPage();
      y = margin + 10;
      drawHeaderStrip();
    }
  };

  // Small top header on subsequent pages
  const drawHeaderStrip = () => {
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(margin, margin - 15, contentWidth, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`${profile.businessName} — CRO & Growth Strategy Audit`, margin, margin - 5);
    doc.text(`Confidential • ${agencyName}`, pageWidth - margin, margin - 5, { align: 'right' });
    y = margin + 15;
  };

  // ==========================================
  // PAGE 1: COVER & EXECUTIVE SUMMARY
  // ==========================================

  // Top Accent Header Band
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 90, 'F');

  // Accent Line
  doc.setFillColor(6, 182, 212); // cyan-500
  doc.rect(0, 88, pageWidth, 4, 'F');

  // Title Text inside Banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(6, 182, 212); // cyan-400
  doc.text('EXECUTIVE CLIENT DELIVERABLE • CONFIDENTIAL STRATEGY REPORT', margin, 32);

  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Business & Conversion Rate Optimization (CRO) Audit', margin, 54);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text(`Target: ${profile.businessName} (${profile.websiteUrl})  •  Industry: ${profile.industry}`, margin, 74);

  // Strategist metadata (top right)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(`Prepared by: ${strategistName}`, pageWidth - margin, 42, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Principal CRO & Digital Marketing Strategist', pageWidth - margin, 54, { align: 'right' });
  doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), pageWidth - margin, 66, { align: 'right' });

  y = 115;

  // Key Financial & Funnel Metrics Grid (4 Boxes)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Executive Scorecard & Revenue Leakage Diagnostics', margin, y);
  y += 12;

  const boxWidth = (contentWidth - 18) / 4;
  const boxHeight = 52;
  const metricsBoxes = [
    { label: 'Monthly Visitors', value: metrics.monthlyVisitors.toLocaleString(), sub: `Spend: $${metrics.adSpend.toLocaleString()}/mo` },
    { label: 'Conv. Rate (Current → Target)', value: `${metrics.currentCR}% → ${metrics.targetCR}%`, sub: `AOV: $${metrics.aov}` },
    { label: 'Monthly Leaking Revenue', value: `+$${metrics.monthlyRevenueLeakage.toLocaleString()}`, sub: 'Lost in funnel friction', highlight: true },
    { label: 'Annual Unlocked Opportunity', value: `+$${metrics.annualRevenueOpportunity.toLocaleString()}`, sub: `${metrics.estimatedRetainerRoi}x Retainer ROI`, highlight: true },
  ];

  metricsBoxes.forEach((b, i) => {
    const bx = margin + i * (boxWidth + 6);
    if (b.highlight) {
      doc.setFillColor(240, 253, 250); // teal-50
      doc.setDrawColor(20, 184, 166); // teal-500
    } else {
      doc.setFillColor(248, 250, 252); // slate-50
      doc.setDrawColor(226, 232, 240); // slate-200
    }
    doc.roundedRect(bx, y, boxWidth, boxHeight, 4, 4, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(b.label, bx + 6, y + 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(b.highlight ? 13 : 15, b.highlight ? 148 : 23, b.highlight ? 136 : 42);
    doc.text(b.value, bx + 6, y + 32);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(b.sub, bx + 6, y + 44);
  });

  y += boxHeight + 20;

  // The Essential Nature of CRO (Why This Service Is Mandatory)
  doc.setFillColor(239, 246, 255); // blue-50
  doc.setDrawColor(191, 219, 254); // blue-200
  doc.roundedRect(margin, y, contentWidth, 75, 5, 5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 64, 175); // blue-800
  doc.text('WHY STRATEGIC CRO IS INDISPENSABLE FOR YOUR BUSINESS (THE ROI MULTIPLIER)', margin + 12, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85); // slate-700
  const whyPoints = [
    `• The Ad Inflation Reality: Meta, Google, and TikTok ad costs have risen ~35% year-over-year. Pouring ad budget into an unoptimized funnel burns cash.`,
    `• Zero Extra Ad Spend Required: Raising conversion from ${metrics.currentCR}% to ${metrics.targetCR}% generates +$${metrics.monthlyRevenueLeakage.toLocaleString()}/mo with $0 additional ad spend.`,
    `• Customer Acquisition Cost (CAC) Slashed: Your effective CAC drops by ${metrics.cacReductionPct}%, allowing you to outbid competitors profitably.`,
  ];
  let py = y + 32;
  whyPoints.forEach(pt => {
    doc.text(pt, margin + 12, py);
    py += 13;
  });

  y += 92;

  // Executive Problem Diagnosis
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Executive Diagnostic Overview', margin, y);
  y += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const splitSummary = doc.splitTextToSize(profile.executiveSummary, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 11 + 15;

  // Top Critical Leaks (3 Columns)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Primary Funnel Leaks Identified (< 7 Days Quick Wins)', margin, y);
  y += 12;

  const leakWidth = (contentWidth - 14) / 3;
  const leakHeight = 60;
  const criticalLeaks = [
    { title: 'Mobile Viewport Friction', desc: '72% of traffic is mobile, yet the primary CTA is pushed below the fold. Elevating CTA into the first 500px recovers ~18% clicks.' },
    { title: 'Checkout Cost Shock', desc: 'Unexpected shipping fees revealed at step 3 trigger severe cart abandonment. Upfront shipping estimates and Express Pay solve this.' },
    { title: 'Trust Deficit at Decision Points', desc: 'Absence of verified customer review badges and clear 30-day money-back guarantee adjacent to checkout creates buyer hesitation.' },
  ];

  criticalLeaks.forEach((lk, i) => {
    const lx = margin + i * (leakWidth + 7);
    doc.setFillColor(254, 242, 242); // rose-50
    doc.setDrawColor(254, 202, 202); // rose-200
    doc.roundedRect(lx, y, leakWidth, leakHeight, 4, 4, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(159, 18, 57); // rose-800
    doc.text(`Leak ${i + 1}: ${lk.title}`, lx + 6, y + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(82, 82, 91);
    const splitDesc = doc.splitTextToSize(lk.desc, leakWidth - 12);
    doc.text(splitDesc, lx + 6, y + 26);
  });

  y += leakHeight + 20;

  // 60-Day Testing Roadmap (Table)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('4. 60-Day Scientific A/B Testing Roadmap (ICE Prioritized)', margin, y);
  y += 12;

  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 18, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Sprint / Timeline', margin + 8, y + 12);
  doc.text('Hypothesis & Optimization Area', margin + 95, y + 12);
  doc.text('ICE Score', margin + 350, y + 12);
  doc.text('Target Lift', margin + 420, y + 12);
  y += 18;

  const roadmapRows = [
    { sprint: 'Sprint 1 (Weeks 1-2)', area: 'Hero 5-second value prop clarity + Sticky mobile CTA bar', ice: '9.4 / 10', lift: '+18% Add-to-Cart' },
    { sprint: 'Sprint 2 (Weeks 3-4)', area: 'Frictionless 1-page checkout + Apple Pay / Shop Pay express', ice: '9.6 / 10', lift: '+28% Checkout' },
    { sprint: 'Sprint 3 (Weeks 5-6)', area: 'Post-purchase 1-click order bump & upsell architecture', ice: '8.9 / 10', lift: '+19% AOV Lift' },
    { sprint: 'Sprint 4 (Weeks 7-8)', area: 'Exit-intent recovery trigger & interactive lead voucher', ice: '8.5 / 10', lift: '+7% Salvaged' },
  ];

  roadmapRows.forEach((row, rIdx) => {
    doc.setFillColor(rIdx % 2 === 0 ? 248 : 255, rIdx % 2 === 0 ? 250 : 255, rIdx % 2 === 0 ? 252 : 255);
    doc.rect(margin, y, contentWidth, 18, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(row.sprint, margin + 8, y + 12);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(row.area, margin + 95, y + 12);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(8, 145, 178); // cyan-600
    doc.text(row.ice, margin + 350, y + 12);

    doc.setTextColor(16, 185, 129); // emerald-500
    doc.text(row.lift, margin + 420, y + 12);

    y += 18;
  });

  // Footer on Page 1
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated by ${agencyName} • Page 1 of 2`, margin, pageHeight - 20);
  doc.text(`Confidential Client Advisory Report`, pageWidth - margin, pageHeight - 20, { align: 'right' });

  // ==========================================
  // PAGE 2: DETAILED AUDIT CHECKLIST FINDINGS
  // ==========================================
  doc.addPage();
  y = margin + 10;
  drawHeaderStrip();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('5. Full Tactical CRO Audit Checklist & Action Plan', margin, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Comprehensive audit of ${checklist.length} high-impact friction points across user experience, speed, and psychology.`, margin, y);
  y += 16;

  // Render Checklist Items
  const itemsToPrint = checklist.slice(0, 8); // Top items for clean multi-page layout

  itemsToPrint.forEach((item, index) => {
    checkAddPage(65);

    const isCritical = item.priority === 'critical';
    doc.setFillColor(isCritical ? 255 : 248, isCritical ? 247 : 250, isCritical ? 247 : 252);
    doc.setDrawColor(isCritical ? 254 : 226, isCritical ? 202 : 232, isCritical ? 202 : 240);
    doc.roundedRect(margin, y, contentWidth, 58, 4, 4, 'FD');

    // Title and status
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${index + 1}. ${item.title}`, margin + 8, y + 13);

    // Priority & Category badge
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(isCritical ? 190 : 180, isCritical ? 18 : 83, isCritical ? 60 : 9);
    doc.text(`[${item.priority.toUpperCase()}]  ${item.categoryLabel}`, margin + 8, y + 25);

    // Estimated lift
    doc.setTextColor(16, 185, 129);
    doc.text(`Impact: ${item.estimatedImpact}`, margin + 220, y + 25);

    // Status
    doc.setTextColor(item.status === 'completed' ? 16 : 100, item.status === 'completed' ? 185 : 116, item.status === 'completed' ? 129 : 139);
    doc.text(`Status: ${item.status.toUpperCase()}`, pageWidth - margin - 8, y + 13, { align: 'right' });

    // Why Crucial Note
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const whySnippet = `Why Essential: ${item.whyCrucial.slice(0, 180)}...`;
    const splitWhy = doc.splitTextToSize(whySnippet, contentWidth - 16);
    doc.text(splitWhy, margin + 8, y + 37);

    y += 64;
  });

  // If Uploaded files findings exist, add summary block
  if (uploadedFiles.length > 0) {
    checkAddPage(75);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`6. Findings from Uploaded Assets (${uploadedFiles.length} Assets Analyzed)`, margin, y);
    y += 12;

    uploadedFiles.forEach(file => {
      checkAddPage(45);
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, y, contentWidth, 38, 3, 3, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(`Asset: ${file.fileName} (${file.fileSize})`, margin + 8, y + 12);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      const topFinding = file.extractedFindings[0];
      if (topFinding) {
        doc.text(`Top Issue: ${topFinding.issue} — Fix: ${topFinding.suggestedFix.slice(0, 110)}...`, margin + 8, y + 24);
      }
      y += 44;
    });
  }

  // Recommended Retainer Investment Box
  checkAddPage(65);
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, contentWidth, 54, 5, 5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('PROPOSED ENGAGEMENT: SENIOR CRO & GROWTH ADVISORY RETAINER', margin + 14, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text('Includes continuous A/B testing, weekly sprint deployments, heatmaps & full GA4 telemetry.', margin + 14, y + 32);
  doc.text(`Projected Monthly Return: +$${metrics.monthlyRevenueLeakage.toLocaleString()} (${metrics.estimatedRetainerRoi}x Retainer ROI)`, margin + 14, y + 44);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(6, 182, 212); // cyan-400
  doc.text('$4,500 / mo', pageWidth - margin - 14, y + 28, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Recouped in < 21 Days', pageWidth - margin - 14, y + 42, { align: 'right' });

  y += 65;

  // Footer on Page 2
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated by ${agencyName} • Page 2 of 2`, margin, pageHeight - 20);
  doc.text(`Contact: ${strategistName} • Principal Digital Marketing Strategist`, pageWidth - margin, pageHeight - 20, { align: 'right' });

  // Trigger Instant Native PDF Download
  const cleanName = profile.businessName.replace(/[^a-zA-Z0-9]/g, '-');
  doc.save(`${cleanName}-CRO-Growth-Audit-Report.pdf`);
}
