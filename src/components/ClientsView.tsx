import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  MoreVertical, 
  Building2, 
  Mail, 
  Bot, 
  Calendar, 
  ShieldCheck, 
  DollarSign,
  Eye,
  Edit2
} from 'lucide-react';
import { Client, ClientTier, ClientStatus } from '../types';

interface ClientsViewProps {
  clients: Client[];
  onOpenNewClient: () => void;
  onSelectClientPortal: (clientId: string) => void;
  onEditClient: (client: Client) => void;
  searchQuery: string;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  onOpenNewClient,
  onSelectClientPortal,
  onEditClient,
  searchQuery,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTier = selectedTier === 'all' || client.tier === selectedTier;
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;

    return matchesSearch && matchesTier && matchesStatus;
  });

  const totalMonthlyRetainers = filteredClients.reduce((acc, c) => acc + c.monthlyFee, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Client Accounts & AI Retainers
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Managing {clients.length} accounts • ${totalMonthlyRetainers.toLocaleString()} aggregate monthly retainers
          </p>
        </div>

        <button
          onClick={onOpenNewClient}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-md shadow-indigo-600/25"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Tier:</span>
          </div>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Retainer Tiers</option>
            <option value="Starter AI">Starter AI ($2.5k)</option>
            <option value="Growth Copilot">Growth Copilot ($4.5k - $5k)</option>
            <option value="Enterprise Automation">Enterprise Automation ($8.5k)</option>
            <option value="Custom Agent Suite">Custom Agent Suite ($12k)</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium ml-2">
            <span>Status:</span>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="onboarding">Onboarding</option>
            <option value="proposal">Proposal</option>
            <option value="paused">Paused</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 self-end sm:self-auto text-xs">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClients.map((client) => {
            const tokenPct = Math.min(100, Math.round((client.monthlyTokensUsed / client.monthlyTokensLimit) * 100));
            return (
              <div 
                key={client.id}
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Avatar & Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${client.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {client.name}
                        </h3>
                        <p className="text-xs text-slate-400">{client.industry}</p>
                      </div>
                    </div>

                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      client.status === 'active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : client.status === 'onboarding'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </div>

                  {/* Tier & Fee Badge */}
                  <div className="mt-4 p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Retainer Plan</span>
                      <span className="text-xs font-semibold text-slate-200">{client.tier}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Monthly Fee</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">${client.monthlyFee.toLocaleString()}/mo</span>
                    </div>
                  </div>

                  {/* Quota & Health */}
                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="text-[11px]">Monthly Token Quota</span>
                        <span className="font-mono text-slate-300">{tokenPct}% ({Math.round(client.monthlyTokensUsed / 1000)}k / {Math.round(client.monthlyTokensLimit / 1000)}k)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${tokenPct}%` }}
                          className={`h-full rounded-full transition-all ${
                            tokenPct > 85 ? 'bg-rose-500' : tokenPct > 65 ? 'bg-amber-400' : 'bg-indigo-500'
                          }`}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        Account Health:
                      </span>
                      <span className="font-bold text-white font-mono">{client.healthScore}/100</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        {client.contactName}
                      </span>
                      <span className="text-slate-500">{client.contactEmail}</span>
                    </div>

                    {client.notes && (
                      <p className="text-[11px] text-slate-400 bg-slate-950/40 p-2 rounded border border-slate-800/40 line-clamp-2">
                        {client.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onEditClient(client)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3 h-3 text-slate-400" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectClientPortal(client.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 border border-cyan-700/50 transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Portal</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table Mode */
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Client / Company</th>
                  <th className="py-3.5 px-4">Retainer Plan</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Monthly Fee</th>
                  <th className="py-3.5 px-4">Token Quota</th>
                  <th className="py-3.5 px-4">Lead Architect</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                {filteredClients.map((client) => {
                  const tokenPct = Math.min(100, Math.round((client.monthlyTokensUsed / client.monthlyTokensLimit) * 100));
                  return (
                    <tr key={client.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${client.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                            {client.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-white block">{client.name}</span>
                            <span className="text-[10px] text-slate-400">{client.industry}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium">{client.tier}</td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          client.status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono">
                        ${client.monthlyFee.toLocaleString()}/mo
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="w-24">
                          <span className="text-[10px] text-slate-400 block mb-1 font-mono">{tokenPct}%</span>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div style={{ width: `${tokenPct}%` }} className="h-full bg-indigo-500 rounded-full"></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{client.leadArchitect}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEditClient(client)}
                            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                            title="Edit Client"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onSelectClientPortal(client.id)}
                            className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900 transition-colors text-xs flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Portal</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
