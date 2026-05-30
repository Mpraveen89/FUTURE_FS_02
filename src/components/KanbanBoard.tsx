/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lead, LeadStatus, ServiceType } from '../types';
import { motion } from 'motion/react';
import { IndianRupee, MessagesSquare, ChevronLeft, ChevronRight, Eye, Briefcase, Calendar } from 'lucide-react';

interface KanbanBoardProps {
  leads: Lead[];
  onUpdateStatus: (leadId: string, newStatus: LeadStatus) => void;
  onSelectLead: (lead: Lead) => void;
}

interface Column {
  id: LeadStatus;
  title: string;
  color: string;
  badgeBg: string;
  badgeText: string;
}

export default function KanbanBoard({ leads, onUpdateStatus, onSelectLead }: KanbanBoardProps) {
  const columns: Column[] = [
    { id: 'new', title: 'New Inquiries', color: 'border-t-blue-500', badgeBg: 'bg-blue-500/10', badgeText: 'text-blue-400' },
    { id: 'contacted', title: 'Contacted', color: 'border-t-yellow-500', badgeBg: 'bg-yellow-500/10', badgeText: 'text-yellow-400' },
    { id: 'nurturing', title: 'In Discussion', color: 'border-t-purple-500', badgeBg: 'bg-purple-500/10', badgeText: 'text-purple-400' },
    { id: 'proposal', title: 'Proposal Sent', color: 'border-t-orange-500', badgeBg: 'bg-orange-500/10', badgeText: 'text-orange-400' },
    { id: 'converted', title: 'Clients Won', color: 'border-t-emerald-500', badgeBg: 'bg-emerald-500/10', badgeText: 'text-emerald-400' },
    { id: 'lost', title: 'Lost / Closed', color: 'border-t-red-500', badgeBg: 'bg-red-500/10', badgeText: 'text-red-400' }
  ];

  // Service Badge Styling Helper
  const getServiceBadgeStyle = (service: ServiceType) => {
    switch(service) {
      case 'AI & Agentic Systems': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Cloud Architecture': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'Full-stack Platform': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Enterprise UI/UX': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'DevOps & Automation': return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'Mobile App Development': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  // INR Currency Formatter
  const formatINR = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} Lac`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  // Safe navigation of status index values
  const statusFlow: LeadStatus[] = ['new', 'contacted', 'nurturing', 'proposal', 'converted', 'lost'];

  const shiftStatus = (leadId: string, currentStatus: LeadStatus, direction: 'left' | 'right') => {
    const currentIndex = statusFlow.indexOf(currentStatus);
    if (direction === 'left' && currentIndex > 0) {
      onUpdateStatus(leadId, statusFlow[currentIndex - 1]);
    } else if (direction === 'right' && currentIndex < statusFlow.length - 1) {
      onUpdateStatus(leadId, statusFlow[currentIndex + 1]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4 items-start" id="kanban-columns-grid">
      {columns.map((column) => {
        const columnLeads = leads.filter((lead) => lead.status === column.id);
        const columnRevenue = columnLeads.reduce((acc, current) => acc + current.budget, 0);

        return (
          <div 
            key={column.id} 
            className="flex flex-col bg-slate-950/80 rounded-2xl border border-slate-800/80 min-h-[480px] shrink-0 p-3 shadow-lg"
            id={`kanban-col-${column.id}`}
          >
            {/* Column Header */}
            <div className={`p-1.5 border-t-4 ${column.color} rounded-t mb-3`}>
              <div className="flex items-center justify-between mt-1">
                <h5 className="text-white text-xs font-bold font-sans tracking-wide truncate">{column.title}</h5>
                <span className={`text-[10px] font-mono font-extrabold px-1.5 py-0.2 rounded-md ${column.badgeBg} ${column.badgeText}`}>
                  {columnLeads.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1.5">
                <span>Value:</span>
                <span className="text-slate-400 font-semibold">{formatINR(columnRevenue)}</span>
              </div>
            </div>

            {/* Leads Stack */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[580px] pr-1" id={`lead-cards-container-${column.id}`}>
              {columnLeads.length === 0 ? (
                <div className="h-28 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center p-3 text-center text-slate-600 select-none">
                  <MessagesSquare className="w-5 h-5 opacity-40 mb-1" />
                  <span className="text-[10px] font-sans">No leads in pipeline</span>
                </div>
              ) : (
                columnLeads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layoutId={lead.id}
                    className="group bg-slate-900 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-3 shadow-md relative overflow-hidden transition-all duration-200"
                    id={`kanban-card-${lead.id}`}
                  >
                    {/* Visual 3D hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                    {/* Service Badge & Source */}
                    <div className="flex justify-between items-center mb-2.5">
                      <span className={`text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded border ${getServiceBadgeStyle(lead.service)}`}>
                        {lead.service.split(' ')[0]} {/* shortened */}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-1 py-0.2 rounded border border-slate-800">
                        {lead.source}
                      </span>
                    </div>

                    {/* Name & Company */}
                    <div className="mb-2">
                      <h6 className="text-xs font-bold text-slate-200 truncate group-hover:text-indigo-300 transition-colors">
                        {lead.name}
                      </h6>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {lead.company || "Independant Lead"}
                      </p>
                    </div>

                    {/* Divider line */}
                    <div className="border-t border-slate-800/60 my-2"></div>

                    {/* Stats bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-slate-200">
                        <IndianRupee className="w-3 h-3 text-emerald-400" />
                        <span>{formatINR(lead.budget)}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-mono">
                        <MessagesSquare className="w-3 h-3" />
                        <span>{lead.history.length} logs</span>
                      </div>
                    </div>

                    {/* Timeline Date indicator */}
                    <div className="mt-2.5 flex items-center gap-1 text-[9px] font-mono text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(lead.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short'
                        })}
                      </span>
                    </div>

                    {/* Client Quick Action Overlay Drawer */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/50 flex items-center justify-between gap-1.5 opacity-90 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Left status pull */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shiftStatus(lead.id, lead.status, 'left');
                        }}
                        disabled={statusFlow.indexOf(lead.status) === 0}
                        className="p-1 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs transition-colors"
                        title="Move Stage Left"
                        id={`btn-shift-left-${lead.id}`}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>

                      {/* View detailed card */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLead(lead);
                        }}
                        className="flex-1 py-1 px-2 rounded bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-[10px] font-medium text-slate-200 hover:text-white flex items-center justify-center gap-1 transition-all"
                        id={`btn-view-lead-${lead.id}`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>

                      {/* Right status push */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shiftStatus(lead.id, lead.status, 'right');
                        }}
                        disabled={statusFlow.indexOf(lead.status) === statusFlow.length - 1}
                        className="p-1 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs transition-colors"
                        title="Move Stage Right"
                        id={`btn-shift-right-${lead.id}`}
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </motion.div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
