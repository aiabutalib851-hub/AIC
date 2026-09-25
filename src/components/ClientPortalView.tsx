import React, { useState } from 'react';
import { 
  Building2, 
  Bot, 
  Cpu, 
  Zap, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  MessageSquare, 
  Sparkles,
  ArrowLeft,
  Calendar,
  FileText
} from 'lucide-react';
import { Client, AIAgentSolution } from '../types';

interface ClientPortalViewProps {
  client: Client;
  agents: AIAgentSolution[];
  onExitPortal: () => void;
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  client,
  agents,
  onExitPortal,
}) => {
  const clientAgents = agents.filter(a => a.clientId === client.id || a.clientName === client.name);
  const tokenPct = Math.min(100, Math.round((client.monthlyTokensUsed / client.monthlyTokensLimit) * 100));

  // Chat with their agent
  const primaryAgent = clientAgents[0] || null;
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string; time: string }[]>([
    {
      sender: 'bot',
      text: `Hello! I am your custom ${primaryAgent ? primaryAgent.name : 'AIC Enterprise Copilot'} for ${client.name}. How can I assist your operations today?`,
      time: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isBotReplying, setIsBotReplying] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setMessages(prev => [...prev, { sender: 'user', text: userText, time: 'Just now' }]);
    setInputMsg('');
    setIsBotReplying(true);

    setTimeout(() => {
      setIsBotReplying(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `[${client.name} Agent Verified]: Received request regarding "${userText}". Triaged against your enterprise knowledge base and executed workflow. Status: Completed.`,
          time: 'Just now'
        }
      ]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-800/40 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${client.avatarColor} flex items-center justify-center text-white font-bold text-base shadow-lg`}>
              {client.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {client.company}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Client Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Service Level: <strong className="text-cyan-300">{client.tier}</strong> • Dedicated Architect: <strong className="text-slate-200">{client.leadArchitect}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onExitPortal}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Agency Hub</span>
          </button>
        </div>
      </div>

      {/* Client KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Token Quota */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400 block font-medium">Monthly Token Quota</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-white font-mono">{tokenPct}%</span>
            <span className="text-xs text-slate-400 font-mono">
              {Math.round(client.monthlyTokensUsed / 1000)}k / {Math.round(client.monthlyTokensLimit / 1000)}k
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div 
              style={{ width: `${tokenPct}%` }}
              className={`h-full rounded-full ${tokenPct > 85 ? 'bg-rose-500' : 'bg-cyan-400'}`}
            ></div>
          </div>
          <span className="text-[11px] text-slate-500 mt-2 block">
            Resets on 1st of next month
          </span>
        </div>

        {/* Operational Agents */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400 block font-medium">Active Dedicated Agents</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-cyan-400 font-mono">
              {clientAgents.length} Deployed
            </span>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 99.9% Uptime
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-3 block">
            Average response latency: <strong className="text-slate-200">390ms</strong>
          </span>
        </div>

        {/* Hours Saved for Client */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400 block font-medium">Human Hours Reclaimed</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-emerald-400 font-mono">
              ~{Math.round((client.monthlyTokensUsed / 2500))} hrs
            </span>
            <span className="text-xs text-emerald-300 font-semibold font-mono">
              +$18,200 Est. Value
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-3 block">
            Based on automated ticket resolutions
          </span>
        </div>

      </div>

      {/* Split: Live Agent Chat & Deployed Agents List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Live Bot Chat Widget */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col h-[460px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <h3 className="text-xs font-bold text-white">
                Live Chat with Your AI Agent
              </h3>
            </div>
            <span className="text-[11px] text-cyan-300 font-mono">
              {primaryAgent ? primaryAgent.model : 'gemini-3.8-flash'}
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto space-y-3 py-4 text-xs">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none font-mono text-[11px]'
                }`}>
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}
            {isBotReplying && (
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-200"></span>
                <span>Agent thinking...</span>
              </div>
            )}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask your agent or test an operational query..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim() || isBotReplying}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* Deployed Solutions & Automation Requests */}
        <div className="space-y-4">
          
          {/* Active Solutions List */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              Your Deployed AI Agent Fleet
            </h3>

            <div className="space-y-3">
              {clientAgents.map(ag => (
                <div key={ag.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{ag.name}</h4>
                    <span className="text-[11px] text-slate-400">{ag.category}</span>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-mono">
                      <span>{ag.monthlyRuns.toLocaleString()} runs</span>
                      <span>•</span>
                      <span className="text-emerald-400">{ag.uptimePct}% uptime</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>
              ))}

              {clientAgents.length === 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-500">
                  Agent architecture currently in staging onboarding.
                </div>
              )}
            </div>
          </div>

          {/* Request New Automation or Prompt Tuning */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Request New Automation or Workflow
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Direct line to your lead architect (Abu Talib) for pipeline expansion or tuning.
            </p>

            {requestSent ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Ticket logged. Abu Talib will review during the next sprint cycle!</span>
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  rows={2}
                  placeholder="Describe the new workflow or integration you would like AIC to build..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
                <button
                  onClick={() => setRequestSent(true)}
                  className="w-full py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  Submit Request to AIC Agency
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
