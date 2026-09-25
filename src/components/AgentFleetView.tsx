import React, { useState } from 'react';
import { 
  Bot, 
  Plus, 
  Play, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Clock, 
  DollarSign, 
  Code, 
  Sparkles,
  Zap,
  RotateCw
} from 'lucide-react';
import { AIAgentSolution, Client } from '../types';

interface AgentFleetViewProps {
  agents: AIAgentSolution[];
  clients: Client[];
  onOpenDeployAgent: () => void;
  searchQuery: string;
}

export const AgentFleetView: React.FC<AgentFleetViewProps> = ({
  agents,
  clients,
  onOpenDeployAgent,
  searchQuery,
}) => {
  const [selectedAgentForTest, setSelectedAgentForTest] = useState<AIAgentSolution>(agents[0] || null);
  const [testInput, setTestInput] = useState<string>(agents[0]?.sampleInput || '');
  const [testOutput, setTestOutput] = useState<string>(agents[0]?.sampleOutput || '');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedMetrics, setSimulatedMetrics] = useState<{
    latency: number;
    tokens: number;
    cost: number;
  } | null>({ latency: 410, tokens: 280, cost: 0.00042 });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectingPromptAgent, setInspectingPromptAgent] = useState<AIAgentSolution | null>(null);

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle agent test execution in sandbox
  const handleRunSimulation = () => {
    if (!testInput.trim()) return;
    setIsSimulating(true);
    setTestOutput('');

    setTimeout(() => {
      setIsSimulating(false);
      
      // Contextual realistic AI response generation based on agent type
      if (selectedAgentForTest.category.includes('Healthcare') || selectedAgentForTest.name.includes('CareTriage')) {
        setTestOutput(`[CareTriage Response]: Assessment recorded. Patient reports symptoms consistent with standard postoperative recovery. 
Recommendation: Advise elevation & cold pack compression. Note logged to EHR. Flagged for nurse follow-up callback tomorrow morning.`);
      } else if (selectedAgentForTest.name.includes('Aura') || selectedAgentForTest.category.includes('Commerce')) {
        setTestOutput(`[Aura Concierge]: Order verified in Shopify (#AUR-8821). Processed instant exchange request. 
Return shipping label created: 1Z9999999999999999. Replacement dispatch scheduled within 4 business hours.`);
      } else if (selectedAgentForTest.name.includes('FinAudit') || selectedAgentForTest.category.includes('RAG')) {
        setTestOutput(`[FinAudit RAG Engine]: Parsed 14 SEC filings and KYC logs. 
Risk Score: Low (12/100). No sanctioned entity associations found. Transaction cleared for automatic settlement.`);
      } else {
        setTestOutput(`[${selectedAgentForTest.name}]: Input analyzed successfully. Triggered automated pipeline with 100% confidence. Response dispatched to client webhook.`);
      }

      setSimulatedMetrics({
        latency: Math.floor(Math.random() * 200) + 320,
        tokens: Math.floor(Math.random() * 150) + 180,
        cost: 0.00035 + Math.random() * 0.0002
      });
    }, 700);
  };

  const handleSelectAgentToTest = (agent: AIAgentSolution) => {
    setSelectedAgentForTest(agent);
    setTestInput(agent.sampleInput);
    setTestOutput(agent.sampleOutput);
    setSimulatedMetrics({
      latency: agent.avgLatencyMs,
      tokens: 240,
      cost: 0.00038
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            Autonomous AI Agent Fleet & Telemetry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {agents.length} production & staging agents deployed across enterprise client infrastructure
          </p>
        </div>

        <button
          onClick={onOpenDeployAgent}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-md shadow-indigo-600/25"
        >
          <Plus className="w-4 h-4" />
          <span>Deploy New Agent</span>
        </button>
      </div>

      {/* Interactive Agent Sandbox Tester */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 border border-indigo-900/40 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                Live Agent Simulator & Sandbox
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  Interactive Testbed
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Execute sample payloads through any deployed agency agent to inspect latency, tokens, and outputs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Target Agent:</span>
            <select
              value={selectedAgentForTest?.id || ''}
              onChange={(e) => {
                const found = agents.find(a => a.id === e.target.value);
                if (found) handleSelectAgentToTest(found);
              }}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-cyan-300 font-semibold focus:outline-none focus:border-cyan-500"
            >
              {agents.map(a => (
                <option key={a.id} value={a.id} className="bg-slate-900 text-slate-200">
                  {a.name} ({a.clientName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sandbox Body: Input / Output Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          
          {/* Input side */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Test Input Payload (Customer / Webhook)</span>
              <button
                type="button"
                onClick={() => setTestInput(selectedAgentForTest.sampleInput)}
                className="text-indigo-400 hover:text-indigo-300 text-[11px]"
              >
                Reset Sample
              </button>
            </div>
            <textarea
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              rows={4}
              placeholder="Enter customer message, webhook event, or raw document snippet..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">
                Model: <strong className="text-slate-300 font-mono">{selectedAgentForTest.model}</strong>
              </span>
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Test Payload</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output side */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Agent Output & Verification</span>
              {simulatedMetrics && (
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="text-cyan-400">{simulatedMetrics.latency}ms</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-indigo-400">{simulatedMetrics.tokens} tokens</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-emerald-400">${simulatedMetrics.cost.toFixed(5)}</span>
                </div>
              )}
            </div>
            <div className="w-full h-[120px] bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono overflow-y-auto leading-relaxed border-dashed">
              {isSimulating ? (
                <div className="flex items-center gap-2 text-slate-400 h-full justify-center">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>Agent routing through prompt guardrails...</span>
                </div>
              ) : testOutput ? (
                <p className="text-slate-200 whitespace-pre-wrap">{testOutput}</p>
              ) : (
                <span className="text-slate-600 italic">Click "Run Test Payload" to simulate output.</span>
              )}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Guardrails: <span className="text-emerald-400 font-semibold">Enforced (Zero Hallucination Mode)</span></span>
              <button
                type="button"
                onClick={() => setInspectingPromptAgent(selectedAgentForTest)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
              >
                <Code className="w-3 h-3" />
                <span>View System Prompt</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Fleet Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Agent Categories</option>
            <option value="Customer Support Copilot">Customer Support Copilot</option>
            <option value="Inbound Lead Qualifier">Inbound Lead Qualifier</option>
            <option value="RAG Document Intelligence">RAG Document Intelligence</option>
            <option value="CRM & ERP Automation">CRM & ERP Automation</option>
            <option value="Voice & Omnichannel Agent">Voice & Omnichannel Agent</option>
            <option value="Invoice & Financial Auditor">Invoice & Financial Auditor</option>
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Showing <strong className="text-slate-200">{filteredAgents.length}</strong> of {agents.length} active agents
        </span>
      </div>

      {/* Agent Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAgents.map((agent) => (
          <div 
            key={agent.id}
            className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white leading-tight">
                      {agent.name}
                    </h3>
                    <span className="text-[11px] text-cyan-400 font-medium">
                      {agent.clientName}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 flex items-center gap-1 ${
                  agent.status === 'operational'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'operational' ? 'bg-emerald-400' : 'bg-cyan-400'} animate-pulse`}></span>
                  {agent.status}
                </span>
              </div>

              {/* Category & Model */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80 text-slate-300">
                  {agent.category}
                </span>
                <span className="font-mono text-indigo-300 font-medium text-[10px]">
                  {agent.model}
                </span>
              </div>

              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Uptime</span>
                  <span className="font-mono font-semibold text-emerald-400">{agent.uptimePct}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Avg Latency</span>
                  <span className="font-mono font-semibold text-slate-200">{agent.avgLatencyMs}ms</span>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] text-slate-500 block">Monthly Runs</span>
                  <span className="font-mono font-semibold text-cyan-300">{agent.monthlyRuns.toLocaleString()}</span>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] text-slate-500 block">API Cost / Mo</span>
                  <span className="font-mono font-semibold text-slate-300">${agent.monthlyCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setInspectingPromptAgent(agent)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Code className="w-3.5 h-3.5 text-slate-400" />
                <span>Prompt</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectAgentToTest(agent)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Test in Sandbox</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* System Prompt Inspector Modal */}
      {inspectingPromptAgent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  System Prompt & Guardrails
                </h3>
                <span className="text-xs text-slate-400">
                  {inspectingPromptAgent.name} • {inspectingPromptAgent.clientName}
                </span>
              </div>
              <button
                onClick={() => setInspectingPromptAgent(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Model: <strong className="text-cyan-300 font-mono">{inspectingPromptAgent.model}</strong></span>
                <span>Last Tuned: {inspectingPromptAgent.lastTuned}</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {inspectingPromptAgent.systemPrompt}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  handleSelectAgentToTest(inspectingPromptAgent);
                  setInspectingPromptAgent(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Open in Test Simulator
              </button>
              <button
                onClick={() => setInspectingPromptAgent(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
