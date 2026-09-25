import React, { useState } from 'react';
import { Users, X } from 'lucide-react';
import { Client, ClientTier } from '../types';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: Client) => void;
}

export const NewClientModal: React.FC<NewClientModalProps> = ({
  isOpen,
  onClose,
  onAddClient,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [tier, setTier] = useState<ClientTier>('Growth Copilot');
  const [monthlyFee, setMonthlyFee] = useState('4500');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company) return;

    const colors = [
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-teal-700',
      'from-violet-500 to-purple-700',
      'from-amber-500 to-rose-600',
      'from-cyan-500 to-blue-700'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newClient: Client = {
      id: `client-${Date.now()}`,
      name,
      company,
      industry: industry || 'Technology',
      avatarColor: randomColor,
      status: 'active',
      tier,
      monthlyFee: Number(monthlyFee) || 4500,
      monthlyTokensLimit: tier === 'Enterprise Automation' ? 1200000 : tier === 'Custom Agent Suite' ? 2500000 : 600000,
      monthlyTokensUsed: 15000,
      automationsCount: 1,
      contactName: contactName || 'Primary Contact',
      contactEmail: contactEmail || 'contact@client.com',
      leadArchitect: 'Abu Talib',
      joinedDate: new Date().toISOString().split('T')[0],
      healthScore: 98,
      activeSolutions: [],
      notes: notes || 'New engagement initialized.'
    };

    onAddClient(newClient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            Add New AI Agency Client
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Brand / Short Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Legal Company Name</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Corporation LLC"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Industry Sector</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Healthcare, FinTech, Retail"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Retainer Tier</label>
              <select
                value={tier}
                onChange={(e) => {
                  const t = e.target.value as ClientTier;
                  setTier(t);
                  if (t === 'Starter AI') setMonthlyFee('2500');
                  else if (t === 'Growth Copilot') setMonthlyFee('4500');
                  else if (t === 'Enterprise Automation') setMonthlyFee('8500');
                  else if (t === 'Custom Agent Suite') setMonthlyFee('12000');
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Starter AI">Starter AI ($2,500/mo)</option>
                <option value="Growth Copilot">Growth Copilot ($4,500/mo)</option>
                <option value="Enterprise Automation">Enterprise Automation ($8,500/mo)</option>
                <option value="Custom Agent Suite">Custom Agent Suite ($12,000/mo)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Monthly Fee ($ USD)</label>
              <input
                type="number"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Contact Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Jane Doe"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Contact Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="e.g. operations@acme.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Initial Scope / Bot Requirements</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Key automation priorities..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/25"
            >
              Onboard Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
