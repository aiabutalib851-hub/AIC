import { jsPDF } from 'jspdf';
import { Invoice, BusinessEntity, InvoiceItem } from '../types';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';

export interface InvoicePdfOptions {
  filename?: string;
  agencyDirector?: string;
  showSignatureLine?: boolean;
}

export interface BatchInvoicePdfOptions {
  filename?: string;
  title?: string;
  scopeLabel?: string;
}

// Format currency safely for standard PDF helvetica font
function formatCurrency(amount: number, currency: string = 'USD'): string {
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (currency === 'BDT') {
    return `BDT ${formatted}`;
  } else if (currency === 'EUR') {
    return `EUR ${formatted}`;
  }
  return `$${formatted}`;
}

/**
 * Generates and downloads a single high-fidelity corporate invoice PDF
 */
export function generateSingleInvoicePdf(
  invoice: Invoice,
  business?: BusinessEntity,
  options: InvoicePdfOptions = {}
): string {
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

  const entityName = business?.name || AIC_AGENCY_INFO.fullName;
  const legalName = business?.legalName || AIC_AGENCY_INFO.name;
  const email = business?.email || AIC_AGENCY_INFO.email;
  const phone = business?.phone || AIC_AGENCY_INFO.phone;
  const website = business?.website || AIC_AGENCY_INFO.websiteDisplay;
  const address = business?.address || 'Dhaka, Bangladesh • Global Remote Operations';
  const taxId = business?.taxId || 'VAT/BIN: 004829104-0102';
  const currency = invoice.currency || business?.currency || 'USD';
  const director = options.agencyDirector || AIC_AGENCY_INFO.director;

  // Header helper for multi-page invoices
  const drawPageHeader = (pageNum: number) => {
    if (pageNum > 1) {
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(margin, margin - 15, contentWidth, 1.5, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`Invoice #${invoice.invoiceNumber} — ${invoice.clientName}`, margin, margin - 5);
      doc.text(`Page ${pageNum}`, pageWidth - margin, margin - 5, { align: 'right' });
      y = margin + 15;
    }
  };

  // Check page height helper
  const checkPageBreak = (neededHeight: number = 30) => {
    if (y + neededHeight > pageHeight - margin - 35) {
      doc.addPage();
      const pageCount = doc.getNumberOfPages();
      drawPageHeader(pageCount);
    }
  };

  // ==========================================
  // TOP ACCENT BRANDING HEADER
  // ==========================================
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 94, 'F');

  // Cyan gradient line
  doc.setFillColor(6, 182, 212); // cyan-500
  doc.rect(0, 91, pageWidth, 3, 'F');

  // Business / Agency Name inside banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(entityName.toUpperCase(), margin, 36);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(legalName, margin, 49);
  doc.text(`${email}   |   ${phone}   |   ${website}`, margin, 61);
  doc.text(`${address}   |   Tax ID: ${taxId}`, margin, 73);

  // Invoice Title & Status (Top Right)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(6, 182, 212); // cyan-400
  doc.text('TAX INVOICE / STATEMENT', pageWidth - margin, 34, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text(`#${invoice.invoiceNumber}`, pageWidth - margin, 53, { align: 'right' });

  // Status Badge in Header
  const statusUpper = invoice.status.toUpperCase();
  let badgeFill = [245, 158, 11]; // amber-500
  let badgeText = [255, 255, 255];
  if (invoice.status === 'paid') {
    badgeFill = [16, 185, 129]; // emerald-500
  } else if (invoice.status === 'overdue') {
    badgeFill = [225, 29, 72]; // rose-600
  } else if (invoice.status === 'draft') {
    badgeFill = [100, 116, 139]; // slate-500
  }

  const badgeWidth = 64;
  const badgeHeight = 16;
  const badgeX = pageWidth - margin - badgeWidth;
  const badgeY = 62;

  doc.setFillColor(badgeFill[0], badgeFill[1], badgeFill[2]);
  doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(badgeText[0], badgeText[1], badgeText[2]);
  doc.text(statusUpper, badgeX + badgeWidth / 2, badgeY + 11, { align: 'center' });

  y = 114;

  // ==========================================
  // BILLED TO & INVOICE METRICS (2 COLUMNS)
  // ==========================================
  const colWidth = (contentWidth - 20) / 2;

  // Left Box: Client / Billed To
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, y, colWidth, 76, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text('BILLED TO (CLIENT)', margin + 12, y + 15);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(invoice.clientName, margin + 12, y + 31);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(`Client ID: ${invoice.clientId || 'CL-DIRECT'}`, margin + 12, y + 45);
  doc.text(`Service Tier: ${invoice.serviceTier || 'Enterprise Retainer'}`, margin + 12, y + 57);
  if (invoice.tags && invoice.tags.length > 0) {
    doc.text(`Tags: ${invoice.tags.slice(0, 3).join(', ')}`, margin + 12, y + 69);
  }

  // Right Box: Payment Details
  const rightX = margin + colWidth + 20;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rightX, y, colWidth, 76, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('PAYMENT SCHEDULE & TERMS', rightX + 12, y + 15);

  const drawScheduleRow = (label: string, value: string, rowY: number, highlight = false) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(label, rightX + 12, rowY);

    doc.setFont('helvetica', highlight ? 'bold' : 'normal');
    if (highlight) {
      doc.setTextColor(8, 145, 178); // cyan-600
    } else {
      doc.setTextColor(15, 23, 42);
    }
    doc.text(value, rightX + colWidth - 12, rowY, { align: 'right' });
  };

  drawScheduleRow('Issue Date:', invoice.issueDate, y + 31);
  drawScheduleRow('Due Date:', invoice.dueDate, y + 45);
  drawScheduleRow('Payment Terms:', invoice.paymentTerms || 'Net 15 Days', y + 57);
  drawScheduleRow('Settlement Method:', invoice.paymentMethod || 'Wire / Bank Transfer', y + 69, true);

  y += 88;

  // ==========================================
  // ITEMIZED LINE ITEMS TABLE
  // ==========================================
  checkPageBreak(120);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Scope of Work & Deliverables', margin, y);
  y += 8;

  // Table Header
  const tableHeaderHeight = 22;
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, y, contentWidth, tableHeaderHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  // Column X offsets
  const colDescX = margin + 10;
  const colCategoryX = margin + contentWidth * 0.52;
  const colQtyX = margin + contentWidth * 0.70;
  const colRateX = margin + contentWidth * 0.83;
  const colAmountX = margin + contentWidth - 10;

  doc.text('DESCRIPTION / DELIVERABLE', colDescX, y + 14);
  doc.text('CATEGORY', colCategoryX, y + 14);
  doc.text('QTY / HRS', colQtyX, y + 14, { align: 'center' });
  doc.text('RATE', colRateX, y + 14, { align: 'right' });
  doc.text('AMOUNT', colAmountX, y + 14, { align: 'right' });

  y += tableHeaderHeight;

  // Render Line Items
  const items = invoice.items && invoice.items.length > 0
    ? invoice.items
    : [{ description: 'Retainer Services & Deliverables', hoursOrQty: 1, rate: invoice.total, total: invoice.total }];

  items.forEach((item, index) => {
    checkPageBreak(32);

    const isEven = index % 2 === 0;
    const rowHeight = 24;

    if (isEven) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(248, 250, 252); // slate-50
    }
    doc.rect(margin, y, contentWidth, rowHeight, 'F');

    // Bottom border line
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y + rowHeight, margin + contentWidth, y + rowHeight);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);

    // Truncate long descriptions cleanly
    const safeDesc = item.description.length > 52 
      ? item.description.substring(0, 49) + '...' 
      : item.description;
    doc.text(safeDesc, colDescX, y + 15);

    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(item.category || 'Retainer', colCategoryX, y + 15);

    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(String(item.hoursOrQty || 1), colQtyX, y + 15, { align: 'center' });

    const rateVal = item.rate || item.total;
    doc.text(formatCurrency(rateVal, currency), colRateX, y + 15, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.text(formatCurrency(item.total, currency), colAmountX, y + 15, { align: 'right' });

    y += rowHeight;
  });

  y += 12;

  // ==========================================
  // FINANCIAL SUMMARY (SUBTOTAL, TAX, TOTAL)
  // ==========================================
  checkPageBreak(120);

  const summaryWidth = 230;
  const summaryX = margin + contentWidth - summaryWidth;

  // Subtotal
  const subtotal = invoice.subtotal !== undefined ? invoice.subtotal : invoice.total;
  const tax = invoice.tax || 0;
  const discount = invoice.discount || 0;
  const total = invoice.total;

  const drawSummaryLine = (label: string, amountStr: string, isBold = false, color?: number[]) => {
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setFontSize(8.5);
    if (color) {
      doc.setTextColor(color[0], color[1], color[2]);
    } else {
      doc.setTextColor(71, 85, 105);
    }
    doc.text(label, summaryX + 8, y + 12);
    doc.text(amountStr, margin + contentWidth - 10, y + 12, { align: 'right' });
    y += 18;
  };

  drawSummaryLine('Subtotal (Exclusive of VAT):', formatCurrency(subtotal, currency));

  if (discount > 0) {
    drawSummaryLine('Contractual Discount / Credit:', `-${formatCurrency(discount, currency)}`, false, [16, 185, 129]);
  }

  if (tax > 0 || invoice.taxRatePct) {
    const taxLabel = invoice.taxRatePct ? `Tax / VAT (${invoice.taxRatePct}%):` : 'Tax / VAT:';
    drawSummaryLine(taxLabel, `+${formatCurrency(tax, currency)}`);
  }

  // Total Box
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(summaryX, y, summaryWidth, 32, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL AMOUNT DUE:', summaryX + 12, y + 20);

  doc.setFontSize(13);
  doc.setTextColor(6, 182, 212); // cyan-400
  doc.text(formatCurrency(total, currency), margin + contentWidth - 10, y + 21, { align: 'right' });

  y += 44;

  // ==========================================
  // PAYMENT INSTRUCTIONS & NOTES
  // ==========================================
  checkPageBreak(90);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 68, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('WIRE / SETTLEMENT INSTRUCTIONS', margin + 12, y + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);

  const notesText = invoice.notes ||
    `Payment Rails: Bank Wire Transfer, Wise Business, or Standard Chartered BD.\nAccount Name: ${legalName} | Reference: INV-${invoice.invoiceNumber}\nPlease notify finance@abrar.academy upon dispatching funds.`;

  const splitNotes = doc.splitTextToSize(notesText, contentWidth - 24);
  doc.text(splitNotes, margin + 12, y + 26);

  y += 78;

  // ==========================================
  // SIGNATURE & CONFIDENTIALITY FOOTER
  // ==========================================
  checkPageBreak(65);

  const showSig = options.showSignatureLine !== false;
  if (showSig) {
    const sigX = margin + contentWidth - 160;
    doc.setDrawColor(148, 163, 184);
    doc.line(sigX, y + 22, margin + contentWidth, y + 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(director, sigX, y + 32);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text('Authorized Finance Signatory', sigX, y + 41);
  }

  // Bottom Copyright Strip
  const footerY = pageHeight - margin + 15;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY - 8, margin + contentWidth, footerY - 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `Official computer-generated invoice statement issued by ${entityName}. Generated on ${new Date().toUTCString()}.`,
    margin,
    footerY
  );
  doc.text(
    `Page 1 of ${doc.getNumberOfPages()}`,
    pageWidth - margin,
    footerY,
    { align: 'right' }
  );

  // Save the document
  const safeClient = invoice.clientName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = options.filename || `${invoice.invoiceNumber}_Invoice_${safeClient}.pdf`;
  doc.save(filename);
  return filename;
}

/**
 * Generates and downloads a consolidated Multi-Invoice Statement / Ledger PDF
 */
export function generateInvoicesBatchPdf(
  invoices: Invoice[],
  businesses: BusinessEntity[],
  options: BatchInvoicePdfOptions = {}
): { filename: string; count: number; totalAmount: number } {
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

  const totalAmount = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
  const paidInvoices = invoices.filter((i) => i.status === 'paid');
  const pendingInvoices = invoices.filter((i) => i.status === 'pending');
  const overdueInvoices = invoices.filter((i) => i.status === 'overdue');

  const paidTotal = paidInvoices.reduce((s, i) => s + (i.total || 0), 0);
  const pendingTotal = pendingInvoices.reduce((s, i) => s + (i.total || 0), 0);
  const overdueTotal = overdueInvoices.reduce((s, i) => s + (i.total || 0), 0);

  // Header helper for multi-page statements
  const drawPageHeader = (pageNum: number) => {
    if (pageNum > 1) {
      doc.setFillColor(15, 23, 42);
      doc.rect(margin, margin - 15, contentWidth, 1.5, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`${AIC_AGENCY_INFO.fullName} — Accounts Receivable Statement`, margin, margin - 5);
      doc.text(`Page ${pageNum}`, pageWidth - margin, margin - 5, { align: 'right' });
      y = margin + 15;
    }
  };

  const checkPageBreak = (neededHeight: number = 30) => {
    if (y + neededHeight > pageHeight - margin - 35) {
      doc.addPage();
      const pageCount = doc.getNumberOfPages();
      drawPageHeader(pageCount);
    }
  };

  // ==========================================
  // STATEMENT HEADER BANNER
  // ==========================================
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 90, 'F');

  doc.setFillColor(6, 182, 212); // cyan-500
  doc.rect(0, 87, pageWidth, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('ACCOUNTS RECEIVABLE & INVOICES STATEMENT', margin, 36);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`${AIC_AGENCY_INFO.fullName}  |  ${AIC_AGENCY_INFO.email}  |  ${AIC_AGENCY_INFO.websiteDisplay}`, margin, 50);
  doc.text(`Scope: ${options.scopeLabel || 'Consolidated Agency Portfolio'}  •  Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`, margin, 63);

  // Top Right Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(6, 182, 212);
  doc.text(`TOTAL: $${totalAmount.toLocaleString()}`, pageWidth - margin, 42, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(`${invoices.length} Invoices Listed`, pageWidth - margin, 56, { align: 'right' });

  y = 108;

  // ==========================================
  // 4 METRIC TILES
  // ==========================================
  const tileWidth = (contentWidth - 18) / 4;
  const tileHeight = 44;
  const tiles = [
    { label: 'Total Invoiced', value: `$${totalAmount.toLocaleString()}`, sub: `${invoices.length} entries` },
    { label: 'Settled (Paid)', value: `$${paidTotal.toLocaleString()}`, sub: `${paidInvoices.length} invoices`, color: [16, 185, 129] },
    { label: 'Pending Settlement', value: `$${pendingTotal.toLocaleString()}`, sub: `${pendingInvoices.length} invoices`, color: [245, 158, 11] },
    { label: 'Overdue Balance', value: `$${overdueTotal.toLocaleString()}`, sub: `${overdueInvoices.length} invoices`, color: [225, 29, 72] },
  ];

  tiles.forEach((tile, i) => {
    const tx = margin + i * (tileWidth + 6);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(tx, y, tileWidth, tileHeight, 4, 4, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(tile.label.toUpperCase(), tx + 8, y + 13);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    if (tile.color) {
      doc.setTextColor(tile.color[0], tile.color[1], tile.color[2]);
    } else {
      doc.setTextColor(15, 23, 42);
    }
    doc.text(tile.value, tx + 8, y + 27);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(tile.sub, tx + 8, y + 37);
  });

  y += tileHeight + 16;

  // ==========================================
  // INVOICES LEDGER TABLE
  // ==========================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Consolidated Retainer Invoices Schedule', margin, y);
  y += 8;

  // Header Row
  const headerHeight = 20;
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, headerHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);

  const colInvX = margin + 8;
  const colBusX = margin + contentWidth * 0.20;
  const colClientX = margin + contentWidth * 0.40;
  const colDueX = margin + contentWidth * 0.64;
  const colStatusX = margin + contentWidth * 0.78;
  const colAmtX = margin + contentWidth - 8;

  doc.text('INVOICE #', colInvX, y + 13);
  doc.text('ISSUING ENTITY', colBusX, y + 13);
  doc.text('CLIENT & TIER', colClientX, y + 13);
  doc.text('DUE DATE', colDueX, y + 13);
  doc.text('STATUS', colStatusX, y + 13);
  doc.text('TOTAL AMOUNT', colAmtX, y + 13, { align: 'right' });

  y += headerHeight;

  invoices.forEach((inv, idx) => {
    checkPageBreak(22);

    const isEven = idx % 2 === 0;
    const rowH = 20;

    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(margin, y, contentWidth, rowH, 'F');

    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y + rowH, margin + contentWidth, y + rowH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(inv.invoiceNumber, colInvX, y + 13);

    const bus = businesses.find((b) => b.id === inv.businessId);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const busName = bus?.name ? (bus.name.length > 20 ? bus.name.slice(0, 18) + '..' : bus.name) : 'Abrar IT Care';
    doc.text(busName, colBusX, y + 13);

    const clientDesc = `${inv.clientName} (${inv.serviceTier || 'Tier 1'})`;
    const safeClient = clientDesc.length > 24 ? clientDesc.slice(0, 22) + '..' : clientDesc;
    doc.text(safeClient, colClientX, y + 13);

    doc.text(inv.dueDate, colDueX, y + 13);

    // Status pill text
    doc.setFont('helvetica', 'bold');
    if (inv.status === 'paid') {
      doc.setTextColor(16, 185, 129);
    } else if (inv.status === 'overdue') {
      doc.setTextColor(225, 29, 72);
    } else {
      doc.setTextColor(217, 119, 6);
    }
    doc.text(inv.status.toUpperCase(), colStatusX, y + 13);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(formatCurrency(inv.total, inv.currency || bus?.currency || 'USD'), colAmtX, y + 13, { align: 'right' });

    y += rowH;
  });

  // Table summary line
  y += 10;
  checkPageBreak(40);

  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 24, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`SCHEDULE TOTAL (${invoices.length} Invoices):`, margin + 10, y + 16);
  doc.setTextColor(8, 145, 178);
  doc.text(`$${totalAmount.toLocaleString()}`, colAmtX, y + 16, { align: 'right' });

  // Bottom footer
  const footerY = pageHeight - margin + 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `AIC Agency Treasury Ledger • Generated automatically on ${new Date().toUTCString()}`,
    margin,
    footerY
  );
  doc.text(
    `Page 1 of ${doc.getNumberOfPages()}`,
    pageWidth - margin,
    footerY,
    { align: 'right' }
  );

  const filename = options.filename || `AIC_Invoices_Statement_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);

  return {
    filename,
    count: invoices.length,
    totalAmount,
  };
}
