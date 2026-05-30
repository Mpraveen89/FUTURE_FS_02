/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Lead, LeadStatus, ServiceType } from '../types';
import AnalyticsSection from './AnalyticsSection';
import { 
  Search, Eye, HelpCircle, ArrowUpDown, SlidersHorizontal, 
  Trash2, Plus, IndianRupee, Mail, Phone, Calendar, Star, Kanban 
} from 'lucide-react';

interface AdminDashboardProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onDeleteLead: (leadId: string) => void;
  onAddSampleLead: () => void;
}

export default function AdminDashboard({ leads, onSelectLead, onUpdateStatus, onDeleteLead, onAddSampleLead }: AdminDashboardProps) {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState<ServiceType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [minBudget, setMinBudget] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'date' | 'budget'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Sorting Handler
  const handleSort = (field: 'date' | 'budget') => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  // Status Badge Colors
  const getStatusBadgeStyle = (status: LeadStatus) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'contacted': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'nurturing': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'proposal': return 'bg-orange-500/10 text-orange-400 border-orange-500/25';
      case 'converted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'lost': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  // Filter & Search Logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesService = serviceFilter === 'all' || lead.service === serviceFilter;
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesBudget = lead.budget >= minBudget;

    return matchesSearch && matchesService && matchesStatus && matchesBudget;
  }).sort((a, b) => {
    if (sortBy === 'budget') {
      return sortDirection === 'asc' ? a.budget - b.budget : b.budget - a.budget;
    } else {
      // Sort by launch date (created_at)
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
  });

  // INR Currency display
  const formatINR = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-8" id="admin-dashboard-container">
      
      {/* Live Operational Metrics Analytics with Custom Chart Elements */}
      <AnalyticsSection leads={leads} />

      {/* Leads management listings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl" id="dashboard-leads-table-container">
        
        {/* Table Controls Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h4 className="text-md font-sans font-bold text-white flex items-center gap-2">
              <span>Clients Pipeline Core Records</span>
              <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono px-2 py-0.5 rounded-full">
                {filteredLeads.length} of {leads.length} Listed
              </span>
            </h4>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Analyze, review, filter, and inspect incoming inquiries. Double-click line entries or click inspect to view details.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Quick action simulation button if database falls short */}
            <button
              onClick={onAddSampleLead}
              className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-600 transition-all flex items-center gap-1.5"
              title="Prepopulate random Indian client demo lead"
              id="btn-add-sample"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Generate Fake Client Lead</span>
            </button>
          </div>
        </div>

        {/* Filters and Inputs row */}
        <div className="py-4 space-y-4" id="table-search-filters-bar">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search inputs */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search CRM by lead name, email, phone sequence, or company..."
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-750 text-xs text-slate-200 rounded-xl py-2 pl-9 pr-4 focus:outline-none focus:border-indigo-500 transition-all font-sans"
                id="leads-search-input"
              />
            </div>

            {/* Pivot buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsFiltersOpen(prev => !prev)}
                className={`py-2 px-3 border rounded-xl text-xs flex items-center gap-2 transition-all ${
                  isFiltersOpen 
                  ? 'bg-indigo-600/15 border-indigo-400/50 text-indigo-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                id="leads-filters-toggle-btn"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters Pivot</span>
              </button>
            </div>
          </div>

          {/* Collapsible advanced segmented filters */}
          {isFiltersOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-850" id="advanced-filters-drawer">
              {/* Service vertical dropdown */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-slate-500 uppercase">Service Category</label>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value as ServiceType | 'all')}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">🌐 All Services</option>
                  <option value="AI & Agentic Systems">AI & Agentic Systems</option>
                  <option value="Cloud Architecture">Cloud Architecture</option>
                  <option value="Full-stack Platform">Full-stack Platform</option>
                  <option value="Enterprise UI/UX">Enterprise UI/UX</option>
                  <option value="DevOps & Automation">DevOps & Automation</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                </select>
              </div>

              {/* Status categories */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-slate-500 uppercase">Pipeline Stage</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'all')}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">📊 All Pipelines</option>
                  <option value="new">New Inquiries</option>
                  <option value="contacted">Contact Established</option>
                  <option value="nurturing">In Discussion</option>
                  <option value="proposal">Proposals Sent</option>
                  <option value="converted">Won / Active Clients</option>
                  <option value="lost">Lost / Closed</option>
                </select>
              </div>

              {/* Minimum budget threshold slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase">Min Value</label>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    {minBudget > 0 ? formatINR(minBudget) : 'Any Value'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="100000"
                  value={minBudget}
                  onChange={(e) => setMinBudget(Number(e.target.value))}
                  className="w-full bg-slate-850 accent-indigo-500 h-1 cursor-pointer rounded-lg"
                />
                <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                  <span>Any</span>
                  <span>₹5 L</span>
                  <span>₹10 L</span>
                  <span>₹20 Lacs</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table layout area */}
        <div className="overflow-x-auto" id="dashboard-leads-table-wrapper">
          {filteredLeads.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6">
              <Search className="w-8 h-8 text-slate-700 stroke-1 mb-2.5" />
              <h5 className="text-white text-xs font-bold font-sans">No matching leads detected</h5>
              <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
                Try widening your active layout query, clearing search parameters, or submitting an inquiry via the Public Form simulation!
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse" id="leads-data-table">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-950/40">
                  <th className="py-3 px-4">Lead Client Details</th>
                  <th className="py-3 px-4">IT Specialization</th>
                  <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('budget')}>
                    <span className="flex items-center gap-1">
                      <span>Deal Budget</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </span>
                  </th>
                  <th className="py-3 px-4">Engagement Stage</th>
                  <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('date')}>
                    <span className="flex items-center gap-1">
                      <span>Received On</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </span>
                  </th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id}
                    onDoubleClick={() => onSelectLead(lead)}
                    className="hover:bg-slate-950/80 transition-colors group cursor-pointer"
                  >
                    {/* Client details columns */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          lead.status === 'converted' 
                          ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950' 
                          : 'bg-slate-850 text-slate-300 border border-slate-750'
                        }`}>
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors truncate">
                            {lead.name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5 font-mono">
                            <span className="truncate max-w-[140px]">{lead.company || 'Independant'}</span>
                            <span>·</span>
                            <span>{lead.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* IT vertical requested */}
                    <td className="py-3.5 px-4 font-sans text-slate-300">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-250 leading-none">{lead.service}</span>
                        <span className="text-[9px] font-mono text-slate-500 mt-1">Source: {lead.source}</span>
                      </div>
                    </td>

                    {/* Value in INR */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                      <div className="flex items-center gap-0.5 text-emerald-400 text-[11px]">
                        <span>{formatINR(lead.budget)}</span>
                      </div>
                      <span className="text-[8px] text-slate-500 tracking-wide block mt-1">
                        Est. contract value
                      </span>
                    </td>

                    {/* Engagement phase pipeline indicator */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {/* Status Select inside row layout */}
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                          onClick={(e) => e.stopPropagation()} // stop trigger row navigations
                          className={`text-[10px] font-mono font-bold rounded-lg border px-2 py-1 focus:outline-none transition-all ${getStatusBadgeStyle(lead.status)}`}
                        >
                          <option value="new" className="bg-slate-900 text-slate-300">NEW INQUIRY</option>
                          <option value="contacted" className="bg-slate-900 text-slate-300">CONTACT ESTD</option>
                          <option value="nurturing" className="bg-slate-900 text-slate-300">DISCUSSION</option>
                          <option value="proposal" className="bg-slate-900 text-slate-300">PROPOSAL SENT</option>
                          <option value="converted" className="bg-slate-900 text-slate-300">CONVERTED CLIENT</option>
                          <option value="lost" className="bg-slate-900 text-slate-300">LOST PIPELINE</option>
                        </select>
                      </div>
                    </td>

                    {/* Creation Dates */}
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      <div className="flex flex-col text-[10px]">
                        <span>
                          {new Date(lead.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-[9px] text-slate-500 mt-1">
                          {new Date(lead.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>

                    {/* Action Triggers */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {/* Inspect Card */}
                        <button
                          onClick={() => onSelectLead(lead)}
                          className="p-1 px-2.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 hover:text-white hover:bg-slate-850 hover:border-slate-700 transition"
                          title="Open full inspector sheet"
                          id={`btn-table-inspect-${lead.id}`}
                        >
                          Inspect
                        </button>

                        {/* Permanent destruction of record */}
                        <button
                          onClick={() => {
                            if (confirm(`Remove lead "${lead.name}" forever? This operation cannot be reversed.`)) {
                              onDeleteLead(lead.id);
                            }
                          }}
                          className="p-1 text-slate-500 hover:text-red-400 hover:bg-slate-950 rounded transition"
                          title="Destroy leads log entry"
                          id={`btn-table-delete-${lead.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </div>
  );
}
