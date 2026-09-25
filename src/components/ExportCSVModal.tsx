import React, { useState, useMemo } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  FileCode, 
  FileText,
  CheckCircle2, 
  X, 
  Table, 
  Layers, 
  ShieldCheck, 
  Info,
  Calendar,
  Sparkles,
  Copy,
  Check,
  Code,
  FileCheck2
} from 'lucide-react';
import { Invoice, BusinessEntity } from '../types';
import { 
  downloadInvoicesCSV, 
  generateInvoicesCSV, 
  CSVExportOptions,
  downloadInvoicesJSON, 
  generateInvoicesJSON, 
  JSONExportOptions 
} from '../utils/csvExport';
import { 
  generateSingleInvoicePdf, 
  generateInvoicesBatchPdf 
} from '../utils/invoicePdfExport';

interface ExportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoices: Invoice[];
  filteredInvoices: Invoice[];
  hasActiveFilters: boolean;
  businesses?: BusinessEntity[];
  defaultFileType?: 'csv' | 'json' | 'pdf';
  onExportSuccess?: (message: string) => void;
}

export const ExportCSVModal: React.FC<ExportCSVModalProps> = ({
  isOpen,
  onClose,
  invoices,
  filteredInvoices,
  hasActiveFilters,
  businesses = [],
  defaultFileType = 'csv',
  onExportSuccess,
}) => {
  const [fileType, setFileType] = useState<'csv' | 'json' | 'pdf'>(defaultFileType);
  const [scope, setScope] = useState<'filtered' | 'all'>(hasActiveFilters ? 'filtered' : 'all');
  const [csvFormat, setCsvFormat] = useState<'detailed' | 'summary'>('detailed');
  const [jsonFormat, setJsonFormat] = useState<'ledger' | 'flat'>('ledger');
  const [pdfFormat, setPdfFormat] = useState<'statement' | 'individual'>('statement');
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const [copiedJSON, setCopiedJSON] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [customFilename, setCustomFilename] = useState<string>(() => {
    return `AIC_Invoices_Export_${new Date().toISOString().split('T')[0]}.${defaultFileType}`;
  });

  // Keep filename extension in sync when switching file type
  const handleFileTypeChange = (type: 'csv' | 'json' | 'pdf') => {
    setFileType(type);
    setCustomFilename(prev => {
      const base = prev.replace(/\.(csv|json|pdf)$/i, '');
      return `${base}.${type}`;
    });
  };

  const targetInvoices = useMemo(() => {
    return scope === 'filtered' ? filteredInvoices : invoices;
  }, [scope, filteredInvoices, invoices]);

  const totalAmount = useMemo(() => {
    return targetInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
  }, [targetInvoices]);

  // Preview generated CSV snippet
  const previewCSVSnippet = useMemo(() => {
    const sample = targetInvoices.slice(0, 3);
    const rawCSV = generateInvoicesCSV(sample, { format: csvFormat });
    const lines = rawCSV.split(/\r?\n/);
    const headers = lines[0] ? lines[0].split(',').map(h => h.replace(/^"|"$/g, '')) : [];
    const sampleRows = lines.slice(1, 4).map(line => {
      const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
      return matches.map(cell => cell.replace(/^"|"$/g, ''));
    });
    return { headers, sampleRows, totalLines: targetInvoices.length };
  }, [targetInvoices, csvFormat]);

  // Preview generated JSON snippet
  const previewJSONSnippet = useMemo(() => {
    const sample = targetInvoices.slice(0, 2);
    const rawJSON = generateInvoicesJSON(sample, { format: jsonFormat, prettyPrint: true });
    return rawJSON;
  }, [targetInvoices, jsonFormat]);

  if (!isOpen) return null;

  const handleCopyJSON = async () => {
    try {
      const fullJSON = generateInvoicesJSON(targetInvoices, { format: jsonFormat, prettyPrint: true });
      await navigator.clipboard.writeText(fullJSON);
      setCopiedJSON(true);
      setTimeout(() => setCopiedJSON(false), 2000);
    } catch {
      setCopiedJSON(false);
    }
  };

  const handleDownload = () => {
    if (fileType === 'pdf') {
      if (pdfFormat === 'statement' || targetInvoices.length > 3) {
        const ensuredName = customFilename.trim().toLowerCase().endsWith('.pdf')
          ? customFilename.trim()
          : `${customFilename.trim()}.pdf`;

        const res = generateInvoicesBatchPdf(targetInvoices, businesses, {
          filename: ensuredName,
          scopeLabel: scope === 'filtered' ? 'Active Filtered Invoice Ledger' : 'All-Time Agency Invoice Portfolio',
        });

        setDownloadSuccess(true);
        if (onExportSuccess) {
          onExportSuccess(`Exported ${res.count} invoices ($${res.totalAmount.toLocaleString()}) to PDF statement: ${res.filename}`);
        }
      } else {
        // Individual invoices export
        targetInvoices.forEach(inv => {
          const invBusiness = businesses.find(b => b.id === inv.businessId) || businesses[0];
          generateSingleInvoicePdf(inv, invBusiness);
        });

        setDownloadSuccess(true);
        if (onExportSuccess) {
          onExportSuccess(`Downloaded ${targetInvoices.length} official PDF invoices.`);
        }
      }
    } else if (fileType === 'csv') {
      const ensuredName = customFilename.trim().toLowerCase().endsWith('.csv') 
        ? customFilename.trim() 
        : `${customFilename.trim()}.csv`;

      const res = downloadInvoicesCSV(targetInvoices, {
        format: csvFormat,
        filename: ensuredName,
      });

      setDownloadSuccess(true);
      if (onExportSuccess) {
        onExportSuccess(`Successfully exported ${res.rowCount} invoices ($${res.totalAmount.toLocaleString()}) to ${res.filename}`);
      }
    } else {
      const ensuredName = customFilename.trim().toLowerCase().endsWith('.json') 
        ? customFilename.trim() 
        : `${customFilename.trim()}.json`;

      const res = downloadInvoicesJSON(targetInvoices, {
        format: jsonFormat,
        filename: ensuredName,
      });

      setDownloadSuccess(true);
      if (onExportSuccess) {
        onExportSuccess(`Successfully exported ${res.rowCount} invoices ($${res.totalAmount.toLocaleString()}) to ${res.filename}`);
      }
    }

    setTimeout(() => {
      setDownloadSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto no-scrollbar">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
              fileType === 'pdf'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : fileType === 'csv' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}>
              {fileType === 'pdf' ? (
                <FileText className="w-5 h-5" />
              ) : fileType === 'csv' ? (
                <FileSpreadsheet className="w-5 h-5" />
              ) : (
                <FileCode className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Export Invoices & Financial Ledger
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full font-bold border ${
                  fileType === 'pdf'
                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    : fileType === 'csv'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                }`}>
                  {fileType.toUpperCase()} MODE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Official PDF statements, Excel/QuickBooks spreadsheets, or automated API JSON pipelines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Format Selector (PDF vs CSV vs JSON) */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            1. Select Export Format
          </label>
          <div className="grid grid-cols-3 gap-3 text-xs">
            {/* PDF Format Option */}
            <button
              type="button"
              onClick={() => handleFileTypeChange('pdf')}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                fileType === 'pdf'
                  ? 'bg-rose-950/40 border-rose-500/80 text-white shadow-md shadow-rose-950/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${
                fileType === 'pdf' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'
              }`}>
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-white block truncate">PDF Document</span>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                  Official branded corporate statements & deliverables.
                </p>
              </div>
            </button>

            {/* CSV Format Option */}
            <button
              type="button"
              onClick={() => handleFileTypeChange('csv')}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                fileType === 'csv'
                  ? 'bg-emerald-950/40 border-emerald-500/80 text-white shadow-md shadow-emerald-950/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${
                fileType === 'csv' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
              }`}>
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-white block truncate">CSV Spreadsheet</span>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                  Excel, Sheets, QuickBooks & Xero accounting imports.
                </p>
              </div>
            </button>

            {/* JSON Format Option */}
            <button
              type="button"
              onClick={() => handleFileTypeChange('json')}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                fileType === 'json'
                  ? 'bg-cyan-950/40 border-cyan-500/80 text-white shadow-md shadow-cyan-950/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${
                fileType === 'json' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
              }`}>
                <FileCode className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-white block truncate">JSON Package</span>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                  Full ERP objects, audit hashes & automated APIs.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Export Scope Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            2. Select Dataset Scope
          </label>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <button
              type="button"
              onClick={() => setScope('filtered')}
              className={`p-3 rounded-xl border text-left transition-all ${
                scope === 'filtered'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <span>Active Filtered View</span>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                  {filteredInvoices.length} inv
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                ${filteredInvoices.reduce((a, b) => a + b.total, 0).toLocaleString()} across selected query/tier
              </p>
            </button>

            <button
              type="button"
              onClick={() => setScope('all')}
              className={`p-3 rounded-xl border text-left transition-all ${
                scope === 'all'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <span>All Invoices (Entire Ledger)</span>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400">
                  {invoices.length} inv
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                ${invoices.reduce((a, b) => a + b.total, 0).toLocaleString()} all-time recorded total
              </p>
            </button>
          </div>
        </div>

        {/* Step 3: Format-Specific Accounting Options */}
        {fileType === 'pdf' ? (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              3. PDF Structure & Delivery Options
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  pdfFormat === 'statement'
                    ? 'bg-slate-950 border-rose-500/60 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="pdfFormat"
                  value="statement"
                  checked={pdfFormat === 'statement'}
                  onChange={() => setPdfFormat('statement')}
                  className="mt-0.5 text-rose-500 focus:ring-0"
                />
                <div className="space-y-1">
                  <span className="font-semibold text-white block">
                    Consolidated Statement (Accounts Receivable Ledger PDF)
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Single multi-page PDF summarizing invoice schedule, settlement tiles, and receivables.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  pdfFormat === 'individual'
                    ? 'bg-slate-950 border-rose-500/60 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="pdfFormat"
                  value="individual"
                  checked={pdfFormat === 'individual'}
                  onChange={() => setPdfFormat('individual')}
                  className="mt-0.5 text-rose-500 focus:ring-0"
                />
                <div className="space-y-1">
                  <span className="font-semibold text-white block">
                    Official Individual Invoices (Itemized Delivery)
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Exports individual PDF invoices with client breakdown, wire instructions, and tax IDs.
                  </p>
                </div>
              </label>
            </div>
          </div>
        ) : fileType === 'csv' ? (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              3. CSV Schema Structure
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  csvFormat === 'detailed'
                    ? 'bg-slate-950 border-emerald-500/60 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="csvFormat"
                  value="detailed"
                  checked={csvFormat === 'detailed'}
                  onChange={() => setCsvFormat('detailed')}
                  className="mt-0.5 text-emerald-500 focus:ring-0"
                />
                <div className="space-y-1">
                  <span className="font-semibold text-white block">
                    Line-Item Detailed (QuickBooks & Xero)
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Itemized rows with unit rates, quantities, payment terms, and GL classifications.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  csvFormat === 'summary'
                    ? 'bg-slate-950 border-emerald-500/60 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="csvFormat"
                  value="summary"
                  checked={csvFormat === 'summary'}
                  onChange={() => setCsvFormat('summary')}
                  className="mt-0.5 text-emerald-500 focus:ring-0"
                />
                <div className="space-y-1">
                  <span className="font-semibold text-white block">
                    Invoice Summary (General Ledger)
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    One row per invoice with aggregated retainer descriptions and clearance status.
                  </p>
                </div>
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              3. JSON Structure Specification
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  jsonFormat === 'ledger'
                    ? 'bg-slate-950 border-cyan-500/60 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="jsonFormat"
                  value="ledger"
                  checked={jsonFormat === 'ledger'}
                  onChange={() => setJsonFormat('ledger')}
                  className="mt-0.5 text-cyan-500 focus:ring-0"
                />
                <div className="space-y-1">
                  <span className="font-semibold text-white block">
                    Comprehensive Accounting Ledger (Recommended)
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Includes executive metadata, GL codes, collection rate, nested client details, and audit hashes.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  jsonFormat === 'flat'
                    ? 'bg-slate-950 border-cyan-500/60 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="jsonFormat"
                  value="flat"
                  checked={jsonFormat === 'flat'}
                  onChange={() => setJsonFormat('flat')}
                  className="mt-0.5 text-cyan-500 focus:ring-0"
                />
                <div className="space-y-1">
                  <span className="font-semibold text-white block">
                    Standard Record Array
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Direct raw array of invoice objects for database seeders or custom scripts.
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 4: File Destination & Encoding */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-slate-300">4. File Destination & Encoding</label>
            <span className={`text-[10px] flex items-center gap-1 font-mono ${
              fileType === 'pdf' ? 'text-rose-400' : fileType === 'csv' ? 'text-emerald-400' : 'text-cyan-400'
            }`}>
              <ShieldCheck className="w-3 h-3" />
              {fileType === 'pdf' 
                ? 'Standard PDF Document (A4 • Vector Rendered)' 
                : fileType === 'csv' 
                ? 'UTF-8 BOM Encoded (Excel Safe)' 
                : 'MIME: application/json (UTF-8)'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
              placeholder={`AIC_Invoices_Export_${today}.${fileType}`}
            />
          </div>
        </div>

        {/* Preview snippet container */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
            >
              {fileType === 'pdf' ? (
                <FileText className="w-3.5 h-3.5 text-rose-400" />
              ) : fileType === 'csv' ? (
                <Table className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Code className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>{showPreview ? 'Hide' : 'Show'} Sample {fileType.toUpperCase()} Preview</span>
            </button>

            <div className="flex items-center gap-3">
              {fileType === 'json' && showPreview && (
                <button
                  type="button"
                  onClick={handleCopyJSON}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors"
                >
                  {copiedJSON ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedJSON ? 'Copied Full JSON!' : 'Copy to Clipboard'}</span>
                </button>
              )}
              <span className="text-[10px] text-slate-500">
                Total volume: ${totalAmount.toLocaleString()} USD
              </span>
            </div>
          </div>

          {showPreview && (
            fileType === 'pdf' ? (
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-rose-400 font-bold">PDF Statement Preview:</span>
                    <span className="text-slate-400">
                      {targetInvoices.length} invoices scheduled
                    </span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">
                    ${totalAmount.toLocaleString()} Total
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Total Volume</span>
                    <span className="font-bold text-white">${totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Settled (Paid)</span>
                    <span className="font-bold text-emerald-400">
                      ${targetInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Pending</span>
                    <span className="font-bold text-amber-400">
                      ${targetInvoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.total, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Overdue</span>
                    <span className="font-bold text-rose-400">
                      ${targetInvoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
                  <FileCheck2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>
                    Includes executive statement header, agency tax ID, itemized schedule, and settlement breakdown.
                  </span>
                </div>
              </div>
            ) : fileType === 'csv' ? (
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 overflow-x-auto max-h-32 text-[10px] font-mono text-slate-300">
                <div className="text-emerald-400 font-semibold border-b border-slate-800 pb-1 mb-1 whitespace-nowrap">
                  {previewCSVSnippet.headers.slice(0, 6).join(' | ')} | ... ({previewCSVSnippet.headers.length} fields total)
                </div>
                {previewCSVSnippet.sampleRows.map((r, idx) => (
                  <div key={idx} className="whitespace-nowrap text-slate-400 py-0.5">
                    {r.slice(0, 6).join(' | ')} | ...
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 overflow-x-auto max-h-40 text-[11px] font-mono text-slate-300 relative group">
                <pre className="text-slate-300 text-[10px] leading-relaxed">
                  {previewJSONSnippet.slice(0, 900)}
                  {previewJSONSnippet.length > 900 && '\n  ... [truncated preview]'}
                </pre>
              </div>
            )
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Exporting <strong className="text-white">{targetInvoices.length}</strong> invoices ({fileType.toUpperCase()})
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={targetInvoices.length === 0}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg transition-all ${
                downloadSuccess
                  ? 'bg-emerald-500 text-white'
                  : fileType === 'pdf'
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/25'
                  : fileType === 'csv'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/25'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Downloaded {fileType.toUpperCase()}!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download {fileType.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
