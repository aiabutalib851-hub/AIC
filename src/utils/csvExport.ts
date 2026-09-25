import { Invoice } from '../types';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';

export interface CSVExportOptions {
  format?: 'detailed' | 'summary';
  filename?: string;
  accountingSoftware?: 'standard' | 'quickbooks' | 'xero';
}

export interface JSONExportOptions {
  format?: 'ledger' | 'flat' | 'audit';
  filename?: string;
  prettyPrint?: boolean;
}

/**
 * Escapes a field for CSV according to RFC 4180:
 * - Surrounds with double quotes
 * - Escapes embedded double quotes by doubling them (" -> "")
 */
function escapeCSV(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return '""';
  }
  const stringVal = String(value);
  // Escape inner quotes
  const escaped = stringVal.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Generates CSV string for invoices formatted for external accounting software
 * (e.g. QuickBooks, Xero, FreshBooks, NetSuite, Excel)
 */
export function generateInvoicesCSV(
  invoices: Invoice[],
  options: CSVExportOptions = {}
): string {
  const { format = 'detailed' } = options;

  if (format === 'detailed') {
    // Detailed Line-Item format (Standard for QuickBooks, Xero, NetSuite)
    const headers = [
      'Invoice Number',
      'Client Name',
      'Client ID',
      'Service Tier',
      'Invoice Tags',
      'Issue Date',
      'Due Date',
      'Status',
      'Item Description',
      'Quantity / Hours',
      'Unit Rate (USD)',
      'Line Total (USD)',
      'Invoice Subtotal (USD)',
      'Tax (USD)',
      'Invoice Total (USD)',
      'Currency',
      'Account Classification',
      'Payment Terms'
    ];

    const rows: string[] = [headers.join(',')];

    invoices.forEach((invoice) => {
      // Calculate payment terms roughly (days between issue and due)
      let terms = 'Net 15';
      try {
        const issue = new Date(invoice.issueDate).getTime();
        const due = new Date(invoice.dueDate).getTime();
        const days = Math.round((due - issue) / (1000 * 60 * 60 * 24));
        if (days > 0) terms = `Net ${days}`;
      } catch {
        terms = 'Net 15';
      }

      const tierStr = invoice.serviceTier || 'Standard';
      const tagsStr = (invoice.tags || []).join('; ');

      if (invoice.items && invoice.items.length > 0) {
        invoice.items.forEach((item) => {
          const row = [
            escapeCSV(invoice.invoiceNumber),
            escapeCSV(invoice.clientName),
            escapeCSV(invoice.clientId),
            escapeCSV(tierStr),
            escapeCSV(tagsStr),
            escapeCSV(invoice.issueDate),
            escapeCSV(invoice.dueDate),
            escapeCSV(invoice.status.toUpperCase()),
            escapeCSV(item.description),
            escapeCSV(item.hoursOrQty),
            escapeCSV(Number(item.rate).toFixed(2)),
            escapeCSV(Number(item.total).toFixed(2)),
            escapeCSV(Number(invoice.subtotal).toFixed(2)),
            escapeCSV(Number(invoice.tax || 0).toFixed(2)),
            escapeCSV(Number(invoice.total).toFixed(2)),
            escapeCSV('USD'),
            escapeCSV('AI Consulting & Automation Retainer Revenue'),
            escapeCSV(terms),
          ];
          rows.push(row.join(','));
        });
      } else {
        // Fallback single line if items array is empty
        const row = [
          escapeCSV(invoice.invoiceNumber),
          escapeCSV(invoice.clientName),
          escapeCSV(invoice.clientId),
          escapeCSV(tierStr),
          escapeCSV(tagsStr),
          escapeCSV(invoice.issueDate),
          escapeCSV(invoice.dueDate),
          escapeCSV(invoice.status.toUpperCase()),
          escapeCSV('Monthly Retainer Service'),
          escapeCSV(1),
          escapeCSV(Number(invoice.total).toFixed(2)),
          escapeCSV(Number(invoice.total).toFixed(2)),
          escapeCSV(Number(invoice.subtotal).toFixed(2)),
          escapeCSV(Number(invoice.tax || 0).toFixed(2)),
          escapeCSV(Number(invoice.total).toFixed(2)),
          escapeCSV('USD'),
          escapeCSV('AI Consulting & Automation Retainer Revenue'),
          escapeCSV(terms),
        ];
        rows.push(row.join(','));
      }
    });

    return rows.join('\r\n');
  } else {
    // Summary Format: 1 row per invoice with aggregated items
    const headers = [
      'Invoice Number',
      'Client Name',
      'Client ID',
      'Service Tier',
      'Invoice Tags',
      'Issue Date',
      'Due Date',
      'Status',
      'Line Items Summary',
      'Subtotal (USD)',
      'Tax (USD)',
      'Total Amount (USD)',
      'Currency',
      'Account Classification'
    ];

    const rows: string[] = [headers.join(',')];

    invoices.forEach((invoice) => {
      const itemsSummary = invoice.items && invoice.items.length > 0
        ? invoice.items.map((i) => `${i.description} (x${i.hoursOrQty} @ $${i.rate})`).join('; ')
        : 'Monthly Retainer Service';

      const tierStr = invoice.serviceTier || 'Standard';
      const tagsStr = (invoice.tags || []).join('; ');

      const row = [
        escapeCSV(invoice.invoiceNumber),
        escapeCSV(invoice.clientName),
        escapeCSV(invoice.clientId),
        escapeCSV(tierStr),
        escapeCSV(tagsStr),
        escapeCSV(invoice.issueDate),
        escapeCSV(invoice.dueDate),
        escapeCSV(invoice.status.toUpperCase()),
        escapeCSV(itemsSummary),
        escapeCSV(Number(invoice.subtotal).toFixed(2)),
        escapeCSV(Number(invoice.tax || 0).toFixed(2)),
        escapeCSV(Number(invoice.total).toFixed(2)),
        escapeCSV('USD'),
        escapeCSV('AI Consulting & Automation Retainer Revenue'),
      ];
      rows.push(row.join(','));
    });

    return rows.join('\r\n');
  }
}

/**
 * Generates formatted JSON data for invoices structured specifically for accounting ERPs,
 * custom audits, tax filings, and programmatic ingestions.
 */
export function generateInvoicesJSON(
  invoices: Invoice[],
  options: JSONExportOptions = {}
): string {
  const { format = 'ledger', prettyPrint = true } = options;

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + (inv.total || 0), 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + (inv.total || 0), 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + (inv.total || 0), 0);

  if (format === 'flat') {
    // Flat JSON array of invoice records
    return prettyPrint ? JSON.stringify(invoices, null, 2) : JSON.stringify(invoices);
  }

  // Comprehensive Accounting Ledger structure
  const ledgerPayload = {
    exportMetadata: {
      agencyName: AIC_AGENCY_INFO.name,
      director: AIC_AGENCY_INFO.director,
      contactEmail: AIC_AGENCY_INFO.email,
      hotline: AIC_AGENCY_INFO.phone,
      whatsapp: AIC_AGENCY_INFO.whatsapp,
      exportedAt: new Date().toISOString(),
      accountingStandard: 'AIC-GAAP-Retainer-Ledger-v2.5',
      currency: 'USD',
      summary: {
        totalInvoices: invoices.length,
        totalBilledUSD: totalRevenue,
        settledRevenueUSD: totalPaid,
        pendingReceivablesUSD: totalPending,
        overdueUSD: totalOverdue,
        collectionRatePercent: totalRevenue > 0 ? Math.round((totalPaid / totalRevenue) * 100) : 100,
      }
    },
    generalLedgerCode: 'GL-4010-AI-RETAINER-REVENUE',
    accountClassification: 'AI Automation & Retainer Consulting Revenue',
    invoices: invoices.map((inv) => {
      // Calculate terms
      let terms = 'Net 15';
      try {
        const issue = new Date(inv.issueDate).getTime();
        const due = new Date(inv.dueDate).getTime();
        const days = Math.round((due - issue) / (1000 * 60 * 60 * 24));
        if (days > 0) terms = `Net ${days}`;
      } catch {
        terms = 'Net 15';
      }

      return {
        invoiceId: inv.id,
        invoiceNumber: inv.invoiceNumber,
        client: {
          id: inv.clientId,
          name: inv.clientName,
          serviceTier: inv.serviceTier || 'Standard Retainer',
          tags: inv.tags || []
        },
        billingSchedule: {
          issueDate: inv.issueDate,
          dueDate: inv.dueDate,
          paymentTerms: terms,
          status: inv.status
        },
        financials: {
          subtotalUSD: inv.subtotal,
          taxUSD: inv.tax || 0,
          totalUSD: inv.total,
          currency: 'USD'
        },
        lineItems: inv.items.map(item => ({
          description: item.description,
          quantityOrHours: item.hoursOrQty,
          unitRateUSD: item.rate,
          lineTotalUSD: item.total
        })),
        auditHash: `INV-${inv.invoiceNumber}-${inv.total}-${inv.status}`
      };
    })
  };

  return prettyPrint ? JSON.stringify(ledgerPayload, null, 2) : JSON.stringify(ledgerPayload);
}

/**
 * Triggers browser file download of CSV content with UTF-8 BOM
 * ensuring full compatibility with Excel, QuickBooks, Xero, and other accounting tools.
 */
export function downloadInvoicesCSV(
  invoices: Invoice[],
  options: CSVExportOptions = {}
): { filename: string; rowCount: number; totalAmount: number } {
  const csvContent = generateInvoicesCSV(invoices, options);
  
  const today = new Date().toISOString().split('T')[0];
  const defaultFilename = `AIC_Invoices_Export_${today}.csv`;
  const filename = options.filename || defaultFilename;

  // Prepend UTF-8 BOM (\uFEFF) to make Excel and spreadsheet tools open international/currency characters correctly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);

  const totalAmount = invoices.reduce((acc, inv) => acc + (inv.total || 0), 0);

  return {
    filename,
    rowCount: invoices.length,
    totalAmount,
  };
}

/**
 * Triggers browser file download of JSON content structured for accounting systems.
 */
export function downloadInvoicesJSON(
  invoices: Invoice[],
  options: JSONExportOptions = {}
): { filename: string; rowCount: number; totalAmount: number } {
  const jsonContent = generateInvoicesJSON(invoices, options);
  
  const today = new Date().toISOString().split('T')[0];
  const defaultFilename = `AIC_Invoices_Export_${today}.json`;
  const filename = options.filename || defaultFilename;

  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);

  const totalAmount = invoices.reduce((acc, inv) => acc + (inv.total || 0), 0);

  return {
    filename,
    rowCount: invoices.length,
    totalAmount,
  };
}

