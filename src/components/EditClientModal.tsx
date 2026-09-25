import React, { useState } from 'react';
import { Edit2, X } from 'lucide-react';
import { Client, ClientStatus, ClientTier } from '../types';

interface EditClientModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveClient: (updatedClient: Client) => void;
}

export const EditClientModal: React.FC<EditClientModalProps> = ({
  client,
  isOpen,
  onClose,
  onSaveClient,
}) => {
  if (!isOpen || !client) return null;

  const [name, setName] = useState(client.name);
  const [company, setCompany] = useState(client.company);
  const [industry, setIndustry] = useState(client.industry);
  const [tier, setTier] = useState<ClientTier>(client.tier);
  const [status, setStatus] = useState<ClientStatus>(client.status);
  const [monthlyFee, setMonthlyFee] = useState(client.monthlyFee.toString());
  const [notes, setNotes] = useState(client.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveClient({
      ...client,
      name,
      company,
      industry,
      tier,
      status,
      monthlyFee: Number(monthlyFee) || client.monthlyFee,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-indigo-400" />
            Edit Client Account: {client.name}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Company Name</label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ClientStatus)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="active">Active</option>
                <option value="onboarding">Onboarding</option>
                <option value="proposal">Proposal</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Monthly Retainer ($)</label>
              <input
                type="number"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Retainer Tier</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as ClientTier)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Starter AI">Starter AI</option>
              <option value="Growth Copilot">Growth Copilot</option>
              <option value="Enterprise Automation">Enterprise Automation</option>
              <option value="Custom Agent Suite">Custom Agent Suite</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Account Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
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
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
