/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, DashboardView, ServiceType, LeadSource } from './types';
import { INITIAL_LEADS } from './data/mockLeads';
import MainHeader from './components/MainHeader';
import AdminDashboard from './components/AdminDashboard';
import KanbanBoard from './components/KanbanBoard';
import PublicContactForm from './components/PublicContactForm';
import LeadDetailsModal from './components/LeadDetailsModal';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, LogIn, Sparkles, X, ChevronRight, Lock, KeyRound, Kanban } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'it_company_leads';
const ADMIN_LOGGED_KEY = 'it_company_crm_admin_loggedin';

// Indian Names Library to select from during procedurial lead generations
const MOCK_NAMES = [
  'Vikram Malhotra', 'Sumeet Sen', 'Deepa Nair', 'Lokesh Iyer',
  'Meenakshi Swamy', 'Harish Chawla', 'Sunita Rao', 'Karan Jha',
  'Vijay Shekhawat', 'Alok Deshmukh', 'Shalini Hegde', 'Preeti Gowda',
  'Arvind Subramanian', 'Pranav Kulkarni', 'Geeta Reddy', 'Rahul Joshi'
];

const MOCK_COMPANIES = [
  'Malhotra Wealth Management', 'Sen Digital Media', 'Nair Logistics Solutions', 'Iyer Systems India',
  'Meenakshi Textiles Corp', 'Chawla Foodways Pvt Ltd', 'Rao Retail & Boutiques', 'Jha AI Logistics Hub',
  'Shekhawat Global Realty', 'Deshmukh Steel Syndicate', 'Hegde Advisory Group', 'Gowda Agro Processing',
  'Subramanian Legal & Tech', 'Kulkarni Hardware Labs', 'Reddy Pharma & Labs', 'Joshi Edu-Global Group'
];

const SERVICE_OPTS: ServiceType[] = [
  'AI & Agentic Systems', 'Cloud Architecture', 'Full-stack Platform',
  'Enterprise UI/UX', 'DevOps & Automation', 'Mobile App Development'
];

const SOURCE_OPTS: LeadSource[] = [
  'Website Form', 'Google Search', 'LinkedIn', 'Reference', 'Partner Network'
];

const MOCK_BRIEFS = [
  'Needs real-time data visualizers and a customizable dashboard with local data syncing capabilities.',
  'Require an automated serverless system to parse and load CSV client statements directly to active databases.',
  'Looking to reconstruct existing mobile application layout. Mobile conversions optimization has major importance.',
  'Enterprise cloud optimization task. Needs AWS compliance tracking and automated alerts logs for engineers.',
  'Needs tailored Gemini model agents to index internal PDFs and optimize support response velocity.',
  'Developing a cross platform apartment tenant utility collection system with payment gateway integrations.'
];

export default function App() {
  // Leads Store
  const [leads, setLeads] = useState<Lead[]>([]);
  
  // App routing
  const [activeView, setActiveView] = useState<DashboardView>('dashboard');
  
  // Auth gates
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(true); // Logged in initially to show beautiful charts immediately!
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('admin@itcompany.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Current lead inspect drawer
  const [activeInspectLead, setActiveInspectLead] = useState<Lead | null>(null);

  // Sync state with LocalStorage on init
  useEffect(() => {
    const savedLeads = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        setLeads(INITIAL_LEADS);
      }
    } else {
      setLeads(INITIAL_LEADS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
    }

    const savedAuth = localStorage.getItem(ADMIN_LOGGED_KEY);
    if (savedAuth === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Save Leads to LocalStorage whenever they change
  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLeads));
  };

  // Modify individual status
  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    const preLabels: Record<LeadStatus, string> = {
      new: 'New Inquiry',
      contacted: 'Contacted',
      nurturing: 'In Discussion',
      proposal: 'Proposal Sent',
      converted: 'Converted Client',
      lost: 'Lost / Closed'
    };

    const targetLead = leads.find(l => l.id === leadId);
    if (!targetLead) return;

    const transitionText = `Status transitioned from "${preLabels[targetLead.status]}" to "${preLabels[newStatus]}" from overview panel.`;
    
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'status_change' as const,
      content: transitionText,
      timestamp: new Date().toISOString(),
      actor: 'Amit Sharma'
    };

    const updated = leads.map((lead) => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status: newStatus,
          history: [newActivity, ...lead.history]
        };
      }
      return lead;
    });

    saveLeadsToStorage(updated);

    // If modal is inspect-viewing this precise lead, keep in sync
    if (activeInspectLead && activeInspectLead.id === leadId) {
      setActiveInspectLead({
        ...activeInspectLead,
        status: newStatus,
        history: [newActivity, ...activeInspectLead.history]
      });
    }
  };

  // Replace Entire Lead updated in Inspector
  const handleUpdateLead = (updatedLead: Lead) => {
    const updated = leads.map((l) => l.id === updatedLead.id ? updatedLead : l);
    saveLeadsToStorage(updated);
    setActiveInspectLead(updatedLead);
  };

  // Delete lead record
  const handleDeleteLead = (leadId: string) => {
    const updated = leads.filter((l) => l.id !== leadId);
    saveLeadsToStorage(updated);
    if (activeInspectLead && activeInspectLead.id === leadId) {
      setActiveInspectLead(null);
    }
  };

  // Add dynamically incoming Client lead
  const handleAddIncomingLead = (newLead: Lead) => {
    const updated = [newLead, ...leads];
    saveLeadsToStorage(updated);
  };

  // Pre-seed mock lead simulation helper (creates authentic Indian profiles)
  const handleGenerateSampleLead = () => {
    const randomIdx = Math.floor(Math.random() * MOCK_NAMES.length);
    const radServiceIdx = Math.floor(Math.random() * SERVICE_OPTS.length);
    const radSourceIdx = Math.floor(Math.random() * SOURCE_OPTS.length);
    const radBriefIdx = Math.floor(Math.random() * MOCK_BRIEFS.length);

    // Budgets from ₹2.5 Lacs to ₹30 Lacs in steps of 50K
    const randomBudgetLacs = 2.5 + Math.floor(Math.random() * 56) * 0.5;
    const finalBudgetVal = randomBudgetLacs * 100000;

    const generatedLead: Lead = {
      id: `lead-${Date.now()}`,
      name: MOCK_NAMES[randomIdx],
      email: `${MOCK_NAMES[randomIdx].toLowerCase().replace(' ', '.')}@${MOCK_COMPANIES[randomIdx].split(' ')[0].toLowerCase()}.co.in`,
      phone: `+91 ${90000 + Math.floor(Math.random() * 9999)} ${10000 + Math.floor(Math.random() * 89999)}`,
      company: MOCK_COMPANIES[randomIdx],
      service: SERVICE_OPTS[radServiceIdx],
      budget: finalBudgetVal,
      status: 'new',
      source: SOURCE_OPTS[radSourceIdx],
      notes: MOCK_BRIEFS[radBriefIdx],
      created_at: new Date().toISOString(),
      history: [
        {
          id: `act-${Date.now()}-init`,
          type: 'system',
          content: `Simulated inbound lead captured via CRM platform injector. Required: ${SERVICE_OPTS[radServiceIdx]}. Proposed Estimate: ₹${finalBudgetVal.toLocaleString('en-IN')}`,
          timestamp: new Date().toISOString(),
          actor: 'System Auto-Seed'
        }
      ]
    };

    handleAddIncomingLead(generatedLead);
  };

  // Logouts
  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(ADMIN_LOGGED_KEY);
    setActiveView('capture'); // send back to Public landing form on checkout
  };

  // Logins Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'admin@itcompany.com' && loginPassword === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem(ADMIN_LOGGED_KEY, 'true');
      setShowLoginModal(false);
      setLoginError('');
      setActiveView('dashboard'); // route directly to metrics on success!
    } else {
      setLoginError('Invalid Administrator credentials. Please verify credentials.');
    }
  };

  const handleQuickBypassLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem(ADMIN_LOGGED_KEY, 'true');
    setShowLoginModal(false);
    setLoginError('');
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600/30">
      
      {/* Visual background ambient layout globs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Global CRM Header Section */}
      <MainHeader 
        activeView={activeView}
        onViewChange={(view) => {
          if (view !== 'capture' && !isAdminLoggedIn) {
            setShowLoginModal(true);
          } else {
            setActiveView(view);
          }
        }}
        leads={leads}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleLogoutAdmin}
        onTriggerLoginGate={() => setShowLoginModal(true)}
      />

      {/* Main Sandbox Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* Public contact sheet page */}
          {activeView === 'capture' && (
            <motion.div
              key="capture-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <PublicContactForm onAddLead={handleAddIncomingLead} />
            </motion.div>
          )}

          {/* CRM Admin: Dashboard Overview Tab */}
          {activeView === 'dashboard' && isAdminLoggedIn && (
            <motion.div
              key="admin-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <AdminDashboard 
                leads={leads} 
                onSelectLead={(lead) => setActiveInspectLead(lead)}
                onUpdateStatus={handleUpdateStatus}
                onDeleteLead={handleDeleteLead}
                onAddSampleLead={handleGenerateSampleLead}
              />
            </motion.div>
          )}

          {/* CRM Admin: Kanban board view */}
          {activeView === 'kanban' && isAdminLoggedIn && (
            <motion.div
              key="admin-kanban"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Kanban className="w-4 h-4 text-indigo-400" />
                      <span>Sales Engagement Progression Kanban Board</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Interactive client stage columns. Slide prospects left or right using quick arrows to evolve your conversions.
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateSampleLead}
                    className="py-1 px-3 text-[11px] font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg transition"
                  >
                    + Add Dummy Lead
                  </button>
                </div>
              </div>

              <KanbanBoard 
                leads={leads}
                onUpdateStatus={handleUpdateStatus}
                onSelectLead={(lead) => setActiveInspectLead(lead)}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-3.5 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-3">
          <p>© 2026 Enterprise Lead CRM Solutions (US-India). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Currency Standard: INR (₹)</span>
            <span>·</span>
            <span>UTC Clock: 2026-05-28</span>
          </div>
        </div>
      </footer>

      {/* DETAILED LEAD INSPECTOR MODAL DRAWER */}
      <AnimatePresence>
        {activeInspectLead && (
          <LeadDetailsModal 
            lead={activeInspectLead}
            onClose={() => setActiveInspectLead(null)}
            onUpdateLead={handleUpdateLead}
          />
        )}
      </AnimatePresence>

      {/* SECURE ADMIN LOGIN MODAL GATEWAYS */}
      <AnimatePresence>
        {showLoginModal && (
          <div 
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
            id="login-modal-backdrop"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-hidden"
              id="login-modal-card"
            >
              {/* Glow accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-indigo-500 to-sky-500"></div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <h4 className="text-sm font-bold text-white font-sans">CRM Admin Logins</h4>
                </div>
                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    setLoginError('');
                  }}
                  className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-500 hover:text-white"
                  id="login-modal-close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-5 leading-relaxed font-sans">
                Please authenticate as a Sales Administrator node to view active client transactions, statistics, and notes charts.
              </p>

              {/* Login Errors */}
              {loginError && (
                <div className="mb-4 p-2 pb-2.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono leading-normal">
                  ⚠️ {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4" id="admin-login-form">
                {/* Email input */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Corporate Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600">@</span>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="admin@itcompany.com"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 pl-8 text-xs text-slate-205 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Password input */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Security Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600">
                      <KeyRound className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 pl-8 text-xs text-slate-205 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Quick Credentials Info card */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 text-[10px] space-y-1 text-slate-450 shrink-0 select-text">
                  <p className="font-bold text-slate-400 font-sans uppercase text-[8px] tracking-widest">Simulated sandbox credentials:</p>
                  <p className="font-mono">User: <span className="text-indigo-400">admin@itcompany.com</span></p>
                  <p className="font-mono">Pass: <span className="text-indigo-400">admin123</span></p>
                </div>

                {/* Submit row */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                    id="submit-login-raw-btn"
                  >
                    Authenticate Credentials
                  </button>
                  
                  {/* Single click Demo Bypass button */}
                  <button
                    type="button"
                    onClick={handleQuickBypassLogin}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-indigo-950/20 text-indigo-400 font-bold border border-indigo-500/20 text-xs flex items-center justify-center gap-1.5 transition-all"
                    id="submit-login-bypass-btn"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Quick Bypass (Demo Mode)</span>
                  </button>
                </div>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
