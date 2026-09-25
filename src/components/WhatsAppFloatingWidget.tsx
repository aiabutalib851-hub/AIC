import React, { useState } from 'react';
import { MessageSquare, X, ArrowUpRight, Award, ExternalLink, Phone, ShieldCheck } from 'lucide-react';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';

export const WhatsAppFloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl p-4 text-xs space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-start justify-between border-b border-slate-800 pb-2.5">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Chat with AIC & Abu Talib</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Direct WhatsApp Hotline • Fast Response
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={`https://wa.me/8801321990066?text=${encodeURIComponent('Hello Abu Talib, I would like to consult with AIC regarding your digital growth services and AI agency solutions.')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 fill-current" />
                <div>
                  <span className="text-[10px] text-emerald-400 block font-bold">WHATSAPP CHAT</span>
                  <span className="font-mono text-white text-xs font-semibold">01321990066</span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Founder Portfolios & Hubs
              </span>
              <div className="space-y-1">
                <a
                  href={AIC_AGENCY_INFO.founderPortfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-slate-300 hover:text-cyan-300 py-1 transition-colors text-[11px]"
                >
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-cyan-400" />
                    <span>Netlify: {AIC_AGENCY_INFO.founderPortfolioDisplay}</span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href={AIC_AGENCY_INFO.founderAcademyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-slate-300 hover:text-indigo-300 py-1 transition-colors text-[11px]"
                >
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-indigo-400" />
                    <span>Academy: {AIC_AGENCY_INFO.founderAcademyDisplay}</span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
            <span>Abrar IT Care - AIC</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified Channel
            </span>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/70 border border-emerald-400/40 font-bold text-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        title="Chat on WhatsApp (01321990066) or View Founder Portfolio"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span className="hidden sm:inline">WhatsApp 01321990066</span>
        <span className="sm:hidden">WhatsApp</span>
        <span className="w-2 h-2 rounded-full bg-emerald-200 animate-ping" />
      </button>

    </div>
  );
};
