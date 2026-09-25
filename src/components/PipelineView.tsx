import React, { useState } from 'react';
import { 
  GitBranch, 
  Plus, 
  Calendar, 
  User, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Clock,
  Sparkles
} from 'lucide-react';
import { PipelineProject, ProjectStage, PriorityLevel, Client } from '../types';

interface PipelineViewProps {
  projects: PipelineProject[];
  clients: Client[];
  onUpdateProjectStage: (projectId: string, newStage: ProjectStage) => void;
  onAddNewProject: (project: Omit<PipelineProject, 'id'>) => void;
}

const STAGES: { id: ProjectStage; label: string; color: string }[] = [
  { id: 'discovery', label: '1. Discovery & Scoping', color: 'border-amber-500/40 text-amber-300' },
  { id: 'prompt_eng', label: '2. Prompt & Architecture', color: 'border-blue-500/40 text-blue-300' },
  { id: 'integration', label: '3. Integration & Webhooks', color: 'border-purple-500/40 text-purple-300' },
  { id: 'testing_uat', label: '4. Testing & Client UAT', color: 'border-cyan-500/40 text-cyan-300' },
  { id: 'production', label: '5. Live Production', color: 'border-emerald-500/40 text-emerald-300' },
];

export const PipelineView: React.FC<PipelineViewProps> = ({
  projects,
  clients,
  onUpdateProjectStage,
  onAddNewProject,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newClientId, setNewClientId] = useState(clients[0]?.id || '');
  const [newBudget, setNewBudget] = useState('7500');
  const [newDueDate, setNewDueDate] = useState('2024-10-15');
  const [newPriority, setNewPriority] = useState<PriorityLevel>('medium');
  const [newDeliverable, setNewDeliverable] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === newClientId);
    if (!newTitle || !client) return;

    onAddNewProject({
      title: newTitle,
      clientName: client.name,
      clientId: client.id,
      stage: 'discovery',
      priority: newPriority,
      progressPct: 10,
      targetLaunchDate: newDueDate,
      budget: Number(newBudget) || 5000,
      lead: 'Abu Talib',
      deliverables: newDeliverable ? [newDeliverable] : ['Initial requirements spec', 'Workflow architecture design']
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  const getNextStage = (current: ProjectStage): ProjectStage | null => {
    const idx = STAGES.findIndex(s => s.id === current);
    return idx < STAGES.length - 1 ? STAGES[idx + 1].id : null;
  };

  const getPrevStage = (current: ProjectStage): ProjectStage | null => {
    const idx = STAGES.findIndex(s => s.id === current);
    return idx > 0 ? STAGES[idx - 1].id : null;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            AI Agency Project Pipeline & Roadmap
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracking client automation buildouts from scoping to live production deployment
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-md shadow-indigo-600/25"
        >
          <Plus className="w-4 h-4" />
          <span>New Project Sprint</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageProjects = projects.filter(p => p.stage === stage.id);
          const stageBudget = stageProjects.reduce((acc, p) => acc + p.budget, 0);

          return (
            <div 
              key={stage.id} 
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex flex-col min-w-[260px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div>
                  <span className={`text-xs font-bold block ${stage.color}`}>
                    {stage.label}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ${stageBudget.toLocaleString()} pipeline
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
                  {stageProjects.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-1">
                {stageProjects.map((project) => {
                  const next = getNextStage(project.stage);
                  const prev = getPrevStage(project.stage);

                  return (
                    <div
                      key={project.id}
                      className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        {/* Tags */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                            {project.clientName}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            project.priority === 'high' 
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {project.priority}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-bold text-white leading-snug group-hover:text-cyan-200 transition-colors">
                          {project.title}
                        </h4>

                        {/* Progress */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                            <span>Progress</span>
                            <span className="font-mono text-slate-300">{project.progressPct}%</span>
                          </div>
                          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${project.progressPct}%` }}
                              className={`h-full rounded-full ${project.progressPct === 100 ? 'bg-emerald-400' : 'bg-indigo-500'}`}
                            ></div>
                          </div>
                        </div>

                        {/* Deliverables snippet */}
                        {project.deliverables && project.deliverables.length > 0 && (
                          <div className="mt-3 space-y-1">
                            {project.deliverables.map((deliv, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                                <span className="truncate">{deliv}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Meta info */}
                        <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {project.targetLaunchDate}
                          </span>
                          <span className="font-mono text-emerald-400 font-semibold">
                            ${project.budget.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Stage transition controls */}
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        {prev ? (
                          <button
                            type="button"
                            onClick={() => onUpdateProjectStage(project.id, prev)}
                            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="Move back"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <div />
                        )}

                        <span className="text-[10px] text-slate-500 font-medium">
                          {project.lead}
                        </span>

                        {next ? (
                          <button
                            type="button"
                            onClick={() => onUpdateProjectStage(project.id, next)}
                            className="px-2 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-[11px] font-medium transition-colors flex items-center gap-1"
                            title="Advance stage"
                          >
                            <span>Advance</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Deployed
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {stageProjects.length === 0 && (
                  <div className="h-24 rounded-lg border border-dashed border-slate-800 flex items-center justify-center text-[11px] text-slate-500">
                    No active cards
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                Create New Client Project Sprint
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Name / Scope</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Multi-agent Order Return Dispatcher"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Client Account</label>
                <select
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Budget ($)</label>
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as PriorityLevel)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Primary Deliverable</label>
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  placeholder="e.g. Prompt engineering, Vector DB setup, and UAT test plan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/25"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
