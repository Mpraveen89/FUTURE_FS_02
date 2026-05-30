/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Lead, LeadStatus, ServiceType, Activity } from '../types';
import { motion } from 'motion/react';
import { 
  X, Briefcase, IndianRupee, Mail, Phone, Building, Info, Calendar, 
  Send, Plus, Clock, CheckCircle2, AlertTriangle, MessageSquare, PhoneCall, ListFilter 
} from 'lucide-react';

interface LeadDetailsModalProps {
  lead: Lead;
  onClose: () => void;
  onUpdateLead: (updatedLead: Lead) => void;
}

export default function LeadDetailsModal({ lead, onClose, onUpdateLead }: LeadDetailsModalProps) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [budget, setBudget] = useState<number>(lead.budget);
  const [noteText, setNoteText] = useState<string>('');
  const [actorName, setActorName] = useState<string>('Amit Sharma'); // Default CRM Operator Indian Name
  const [tempNotes, setTempNotes] = useState<string>(lead.notes);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync external props if lead resets
    setStatus(lead.status);
    setBudget(lead.budget);
    setTempNotes(lead.notes);
  }, [lead]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Log action helper
  const addHistoryItem = (type: Activity['type'], content: string) => {
    const newActivity: Activity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      content,
      timestamp: new Date().toISOString(),
      actor: actorName
    };

    const updatedLead: Lead = {
      ...lead,
      notes: tempNotes,
      status,
      budget,
      history: [newActivity, ...lead.history]
    };

    onUpdateLead(updatedLead);
  };

  const handleStatusChange = (newStatus: LeadStatus) => {
    if (newStatus === status) return;
    setStatus(newStatus);
    
    const preLabels: Record<LeadStatus, string> = {
      new: 'New Inquiry',
      contacted: 'Contacted',
      nurturing: 'In Discussion',
      proposal: 'Proposal Sent',
      converted: 'Converted Client',
      lost: 'Lost / Closed'
    };

    const content = `Lead pipeline status migrated from "${preLabels[status]}" to "${preLabels[newStatus]}".`;
    
    // Auto trigger updates
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'status_change',
      content,
      timestamp: new Date().toISOString(),
      actor: actorName
    };

    const updatedLead: Lead = {
      ...lead,
      status: newStatus,
      notes: tempNotes,
      history: [newActivity, ...lead.history]
    };

    onUpdateLead(updatedLead);
  };

  const handleSaveBudget = () => {
    setIsEditingBudget(false);
    if (budget === lead.budget) return;

    const content = `Revised estimated project pipeline value from ₹${lead.budget.toLocaleString('en-IN')} to ₹${budget.toLocaleString('en-IN')}.`;
    
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'budget_change',
      content,
      timestamp: new Date().toISOString(),
      actor: actorName
    };

    const updatedLead: Lead = {
      ...lead,
      budget,
      notes: tempNotes,
      history: [newActivity, ...lead.history]
    };

    onUpdateLead(updatedLead);
  };

  const handleSaveCoreNotes = () => {
    if (tempNotes === lead.notes) return;
    
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'note',
      content: `Updated core project brief/requirements specifications.`,
      timestamp: new Date().toISOString(),
      actor: actorName
    };

    const updatedLead: Lead = {
      ...lead,
      notes: tempNotes,
      history: [newActivity, ...lead.history]
    };

    onUpdateLead(updatedLead);
  };

  const handleAddNoteLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    addHistoryItem('note', noteText.trim());
    setNoteText('');
  };

  const logQuickAction = (actionType: 'email' | 'call' | 'meeting') => {
    let text = '';
    if (actionType === 'email') {
      text = `Dispatched formal technical proposal outline and engagement schedule via email.`;
    } else if (actionType === 'call') {
      text = `Completed follow-up audio diagnostic briefing. Reviewed requirements alignments.`;
    } else if (actionType === 'meeting') {
      text = `Hosted digital architectural walkthrough to detail milestone deliverables.`;
    }

    addHistoryItem(actionType, text);
  };

  // INR Formatter
  const formatINR = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  // Activity icon picker
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'status_change': return <ListFilter className="w-3.5 h-3.5 text-blue-400" />;
      case 'budget_change': return <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />;
      case 'email': return <Mail className="w-3.5 h-3.5 text-pink-400" />;
      case 'call': return <PhoneCall className="w-3.5 h-3.5 text-yellow-400" />;
      case 'meeting': return <Calendar className="w-3.5 h-3.5 text-purple-400" />;
      case 'note': return <MessageSquare className="w-3.5 h-3.5 text-teal-400" />;
      default: return <Clock className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      id="modal-backdrop"
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        id="modal-card"
      >
        {/* Glow corner line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500"></div>

        {/* Modal Top Nav Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/30">
          <div className="flex items-center gap-2.5">
            <span className="h-8 w-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              LD
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-200">Lead Registry Inspector</h3>
              <p className="text-[10px] text-slate-500 font-mono">ID: {lead.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            id="modal-close-icon-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Contents Scrollable area */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6" id="modal-content-grid">
          
          {/* LEFT Column: Detailed Indicators & Actions (7/12) */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Primary Profile Data Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-lg font-extrabold text-white font-sans">{lead.name}</h4>
                  <p className="text-xs text-sky-400 font-mono flex items-center gap-1.5 mt-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>{lead.company || 'Private Practitioner'}</span>
                  </p>
                </div>
                
                {/* Source Label Badge */}
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                    Source: {lead.source}
                  </span>
                  <p className="text-[9px] font-mono text-slate-500 mt-1.5">
                    Since {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Direct Communication Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a 
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-xs text-slate-300 transition-all truncate"
                >
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </a>
                <a 
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-xs text-slate-300 transition-all truncate"
                >
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="truncate">{lead.phone}</span>
                </a>
              </div>
            </div>

            {/* Stage Migrator & Budget adjustments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pipeline Selector */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  CRM Engagement Stage
                </label>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  id="modal-status-selector"
                >
                  <option value="new">🆕 Stage 1: New Inquiry</option>
                  <option value="contacted">📞 Stage 2: Contact Established</option>
                  <option value="nurturing">💜 Stage 3: In Technical Discussion</option>
                  <option value="proposal">📝 Stage 4: Proposal Submitted</option>
                  <option value="converted">✅ Stage 5: Won Account / Closed Success</option>
                  <option value="lost">❌ Stage 6: Terminated / Lost Account</option>
                </select>
              </div>

              {/* Budget Value Settings */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Pipeline Valuation
                  </label>
                  {!isEditingBudget && (
                    <button 
                      onClick={() => setIsEditingBudget(true)}
                      className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300"
                    >
                      Change
                    </button>
                  )}
                </div>

                {isEditingBudget ? (
                  <div className="flex gap-2 items-center mt-1">
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-xs">₹</span>
                      <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded p-1.5 pl-6 focus:outline-none focus:border-indigo-500 font-mono"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleSaveBudget}
                      className="text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <IndianRupee className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-lg font-extrabold text-white font-mono">
                      {lead.budget.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Core Specifications Summary */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Project Spec Scope ({lead.service})</span>
                </div>
              </div>
              <textarea
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                onBlur={handleSaveCoreNotes}
                rows={3}
                placeholder="Details of client requirements specs..."
                className="w-full bg-slate-950 border border-slate-800/80 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-slate-600 transition-all font-sans leading-relaxed"
                id="modal-notes-textarea"
              />
              <p className="text-[10px] text-slate-500 font-mono text-right">
                Auto-saves on blur
              </p>
            </div>

            {/* CRM Quick Actions panel */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Pipeline Quick logs
              </p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => logQuickAction('email')}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/20 hover:bg-slate-850 hover:border-slate-700 text-slate-300 hover:text-white flex flex-col items-center justify-center text-center group transition-all"
                  id="quick-log-email"
                >
                  <Mail className="w-5 h-5 text-pink-400 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium font-sans">Sent Proposal</span>
                </button>

                <button
                  onClick={() => logQuickAction('call')}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/20 hover:bg-slate-850 hover:border-slate-700 text-slate-300 hover:text-white flex flex-col items-center justify-center text-center group transition-all"
                  id="quick-log-call"
                >
                  <PhoneCall className="w-5 h-5 text-yellow-400 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium font-sans">Logged Call</span>
                </button>

                <button
                  onClick={() => logQuickAction('meeting')}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/20 hover:bg-slate-850 hover:border-slate-700 text-slate-300 hover:text-white flex flex-col items-center justify-center text-center group transition-all"
                  id="quick-log-meeting"
                >
                  <Calendar className="w-5 h-5 text-purple-400 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium font-sans">Hosted Meeting</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT Column: Live Followup Logs & Stream Timeline (5/12) */}
          <div className="md:col-span-5 flex flex-col space-y-4 max-h-[64vh]">
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Activity History Stream & Milestones
            </p>

            {/* Freeform Action Logger Input */}
            <form onSubmit={handleAddNoteLog} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-3 shrink-0">
              <div className="flex gap-2 items-center">
                <label className="text-[10px] font-mono text-slate-400 shrink-0 uppercase">By:</label>
                <select
                  value={actorName}
                  onChange={(e) => setActorName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-indigo-300 text-[10px] font-mono rounded px-1.5 py-0.5 focus:outline-none"
                >
                  <option value="Amit Sharma">Amit Sharma (VP Sales)</option>
                  <option value="Deepak Rao">Deepak Rao (Tech Lead)</option>
                  <option value="Srinivas Murthy">Srinivas Murthy (SysArch)</option>
                  <option value="Admin">Executive Manager</option>
                </select>
              </div>

              <div className="flex gap-1.5 items-center">
                <input
                  type="text"
                  placeholder="Record sync summary or status discussion note..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-sans"
                  id="modal-note-content-input"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-1.5 rounded transition-colors group shrink-0"
                  title="Post note to stream"
                >
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </form>

            {/* Custom Log Timeline Stream */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 border border-slate-900 p-3 rounded-xl bg-slate-950/40" id="comments-timeline-scroll">
              {lead.history.map((act, index) => (
                <div key={act.id || index} className="flex gap-3 text-xs leading-relaxed relative">
                  {/* Visual Node line */}
                  {index < lead.history.length - 1 && (
                    <span className="absolute left-[13px] top-[26px] bottom-[-20px] w-0.5 bg-slate-800"></span>
                  )}

                  {/* Log circle badge icon */}
                  <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                    {getActivityIcon(act.type)}
                  </div>

                  <div className="flex-1 bg-slate-900/40 border border-slate-800/40 rounded-xl p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 font-mono text-[10px]">
                        {act.actor}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">
                        {new Date(act.timestamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-slate-350 text-xs font-sans">
                      {act.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Modal Status Summary Footer bar */}
        <div className="px-6 py-4 border-t border-slate-900 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Automatic timezone: Asia/Kolkata (IST)</span>
          </div>
          <span className="text-[10px] text-slate-500">
            Press Escape to exit window
          </span>
        </div>

      </motion.div>
    </div>
  );
}
