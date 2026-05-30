/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DashboardView, Lead } from '../types';
import { motion } from 'motion/react';
import { 
  Building2, Users, Kanban, CalendarRange, Laptop, 
  Settings, LogOut, Bell, ShieldEllipsis, ShieldCheck 
} from 'lucide-react';

interface MainHeaderProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  leads: Lead[];
  onLogoutAdmin: () => void;
  isAdminLoggedIn: boolean;
  onTriggerLoginGate: () => void;
}

export default function MainHeader({ 
  activeView, onViewChange, leads, onLogoutAdmin, isAdminLoggedIn, onTriggerLoginGate 
}: MainHeaderProps) {
  
  // Real-time calculation of new inquiries (Alert badge state)
  const newInquiriesCount = leads.filter((l) => l.status === 'new').length;

  return (
    <header className="bg-slate-950 border-b border-slate-800 shrink-0 select-none relative z-45" id="global-header-wrapper">
      
      {/* Upper bar: Logo, Dual Simulation Node Selector & Auth */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Core Brand Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-[1px] flex items-center justify-center shadow-lg shadow-indigo-500/10">
            <div className="h-full w-full rounded-xl bg-slate-950 flex items-center justify-center text-white">
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white font-sans tracking-tight">Enterprise Client Lead System</h1>
            <p className="text-[10px] text-slate-500 font-mono">Operations: US-Co & India Offshore</p>
          </div>
        </div>

        {/* Portal Switching Panel */}
        <div className="flex items-center gap-2 bg-slate-900/60 p-1 rounded-2xl border border-slate-850">
          
          {/* Simulation: Contact Page Form */}
          <button
            onClick={() => onViewChange('capture')}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeView === 'capture'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            id="nav-to-capture-form"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Public Website Form</span>
          </button>

          {/* Secure Admin CRM System */}
          {isAdminLoggedIn ? (
            <button
              onClick={() => onViewChange('dashboard')}
              className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeView !== 'capture'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              id="nav-to-dashboard-core"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>CRM Admin Area</span>
            </button>
          ) : (
            <button
              onClick={onTriggerLoginGate}
              className="py-1.5 px-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center gap-2 transition-all"
              id="nav-trigger-login-gate"
            >
              <ShieldEllipsis className="w-3.5 h-3.5 text-indigo-400" />
              <span>Login Admin CRM</span>
            </button>
          )}

        </div>

        {/* Inbound Notifications Alert & Auth actions */}
        <div className="flex items-center gap-4">
          
          {/* Unred leads notification capsule */}
          {newInquiriesCount > 0 && (
            <div 
              className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px]"
              title={`${newInquiriesCount} unresolved new lead inquiries awaiting review.`}
              id="header-notification-capsule"
            >
              <Bell className="w-3.5 h-3.5 animate-bounce" />
              <span>{newInquiriesCount} New Leads</span>
            </div>
          )}

          {/* Admin user tag/Logout button close-down */}
          {isAdminLoggedIn && (
            <div className="flex items-center gap-3 border-l border-slate-900 pl-4">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-slate-300">Sales Ops Dashboard</p>
                <p className="text-[9px] font-mono text-slate-500">Amit Sharma (VP)</p>
              </div>
              <button
                onClick={onLogoutAdmin}
                className="p-1 px-2.5 bg-slate-900/65 border border-slate-800/80 hover:border-red-500/50 text-slate-400 hover:text-white rounded-xl text-xs font-sans transition-all flex items-center gap-1.5"
                title="Disconnect Administrator Session"
                id="header-logout-btn"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Lower Bar: Secondary Navigation Links inside Admin Panel (Only visible if Admin is authorized) */}
      {isAdminLoggedIn && activeView !== 'capture' && (
        <div className="bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs font-mono font-bold text-slate-400">
            {/* Nav Links */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => onViewChange('dashboard')}
                className={`py-1 px-3.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-slate-900 text-indigo-400 border border-slate-800'
                    : 'hover:text-white'
                }`}
                id="subnav-dashboard-link"
              >
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span>Executive Overview</span>
              </button>

              <button
                onClick={() => onViewChange('kanban')}
                className={`py-1 px-3.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeView === 'kanban'
                    ? 'bg-slate-900 text-indigo-400 border border-slate-800'
                    : 'hover:text-white'
                }`}
                id="subnav-kanban-link"
              >
                <Kanban className="w-3.5 h-3.5 shrink-0" />
                <span>Interactive Board (Kanban)</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <Settings className="w-3.5 h-3.5" />
              <span>System Role: CRM Full-Auth Administrator Privileged Node</span>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
