import React, { useState } from 'react';
import { Bot, X, Sparkles } from 'lucide-react';
import { AIAgentSolution, Client, AgentCategory } from '../types';

interface DeployAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
  onDeployAgent: (agent: AIAgentSolution) => void;
}

export const DeployAgentModal: React.FC<DeployAgentModalProps> = ({
  isOpen,
  onClose,
  clients,
  onDeployAgent,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AgentCategory>('Customer Support Copilot');
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [model, setModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-pro-preview' | 'gpt-4o' | 'claude-3.5-sonnet'>('gemini-3.8-flash');
  const [systemPrompt, setSystemPrompt] = useState(
    'You are an autonomous AI Agent deployed by AIC Agency for enterprise operations. Verify all inputs with zero hallucination.'
  );
  const [sampleInput, setSampleInput] = useState('Customer inquiry regarding account verification and priority status.');
  const [sampleOutput, setSampleOutput] = useState('Account verified with 100% confidence. Priority status active. Escalation avoided.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === clientId) || clients[0];
    if (!name || !client) return;

    const newAgent: AIAgentSolution = {
      id: `agent-${Date.now()}`,
      name,
      category,
      clientName: client.name,
      clientId: client.id,
      model,
      status: 'operational',
      uptimePct: 100,
      avgLatencyMs: model === 'gemini-3.8-flash' ? 380 : 720,
      dailyRuns: 0,
      monthlyRuns: 1,
      errorRatePct: 0.0,
      monthlyCost: 0.15,
      systemPrompt,
      lastTuned: 'Just now',
      sampleInput,
      sampleOutput
    };

    onDeployAgent(newAgent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            Deploy Autonomous AI Agent Solution
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Agent Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Inbound WhatsApp Lead Qualifier"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Client Account</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Solution Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AgentCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Customer Support Copilot">Customer Support Copilot</option>
                <option value="Inbound Lead Qualifier">Inbound Lead Qualifier</option>
                <option value="RAG Document Intelligence">RAG Document Intelligence</option>
                <option value="CRM & ERP Automation">CRM & ERP Automation</option>
                <option value="Voice & Omnichannel Agent">Voice & Omnichannel Agent</option>
                <option value="Invoice & Financial Auditor">Invoice & Financial Auditor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Foundation Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-cyan-300 font-mono font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="gemini-3.8-flash">gemini-3.8-flash (Ultra-fast, lowest latency & cost)</option>
              <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex reasoning & compliance audits)</option>
              <option value="claude-3.5-sonnet">claude-3.5-sonnet (High nuanced writing)</option>
              <option value="gpt-4o">gpt-4o (Multimodal generalist)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">System Prompt & Guardrails</label>
            <textarea
              rows={4}
              required
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Sample Test Input</label>
              <input
                type="text"
                value={sampleInput}
                onChange={(e) => setSampleInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Sample Verified Output</label>
              <input
                type="text"
                value={sampleOutput}
                onChange={(e) => setSampleOutput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
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
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/25 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Deploy to Fleet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
