import React from 'react';
import { Languages, Check } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

export const LanguageToggle: React.FC<{ className?: string; compact?: boolean }> = ({ 
  className = '',
  compact = false 
}) => {
  const { language, setLanguage, isBangla } = useLanguage();

  return (
    <div 
      className={`inline-flex items-center p-0.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        title="Switch to English"
        id="lang-switch-en"
        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
          language === 'en'
            ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-950 font-bold scale-[1.02]'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
      >
        <span className="leading-none">EN</span>
        {!compact && <span className="hidden sm:inline text-[10px] font-normal opacity-90">English</span>}
      </button>

      <button
        type="button"
        onClick={() => setLanguage('bn')}
        title="বাংলা ভাষায় পরিবর্তন করুন"
        id="lang-switch-bn"
        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
          language === 'bn'
            ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950 font-bold scale-[1.02]'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
      >
        <span className="leading-none">বাং</span>
        {!compact && <span className="hidden sm:inline text-[10px] font-normal opacity-90">বাংলা</span>}
      </button>
    </div>
  );
};
