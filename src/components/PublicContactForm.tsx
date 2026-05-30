/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lead, ServiceType, LeadSource } from '../types';
import { motion } from 'motion/react';
import { Send, CheckCircle2, DollarSign, Calendar, Landmark, Info, Briefcase, HelpCircle } from 'lucide-react';

interface PublicContactFormProps {
  onAddLead: (newLead: Lead) => void;
}

const SERVICES_CATALOG: { type: ServiceType; desc: string }[] = [
  { type: 'AI & Agentic Systems', desc: 'Deploy customized Gemini LLM agents, automated task solvers & workflows.' },
  { type: 'Cloud Architecture', desc: 'Secure cloud migration, serverless design & multi-region database replications.' },
  { type: 'Full-stack Platform', desc: 'Enterprise SaaS Web portals built with React, Node, SQL or fast key-value engines.' },
  { type: 'Enterprise UI/UX', desc: 'Responsive high-fidelity Figma layouts, interactive wireframes & micro-interactions.' },
  { type: 'DevOps & Automation', desc: 'Automated CI/CD workflows, Docker orchestration, and factory uptime monitor logs.' },
  { type: 'Mobile App Development', desc: 'Cross-platform native iOS & Android binaries with integrated global payment gates.' },
];

export default function PublicContactForm({ onAddLead }: PublicContactFormProps) {
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState<ServiceType>('AI & Agentic Systems');
  const [budgetLacs, setBudgetLacs] = useState<number>(8); // In Lacs represent base
  const [source, setSource] = useState<LeadSource>('Website Form');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Quick Indian Lead Templates
  const applyTemplate = (tpl: { name: string; email: string; phone: string; company: string; service: ServiceType; budgetLacs: number; notes: string }) => {
    setName(tpl.name);
    setEmail(tpl.email);
    setPhone(tpl.phone);
    setCompany(tpl.company);
    setService(tpl.service);
    setBudgetLacs(tpl.budgetLacs);
    setNotes(tpl.notes);
  };

  const templates = [
    {
      name: 'Ramesh Ramamurthy',
      email: 'ramesh.r@ramurthyconsulting.in',
      phone: '+91 98213 45678',
      company: 'Ramamurthy FinTech',
      service: 'Full-stack Platform' as ServiceType,
      budgetLacs: 18,
      notes: 'Requires a secure mutual fund client investment dashboard linked with local payment APIs. Needs detailed logging.'
    },
    {
      name: 'Ramu Naidu',
      email: 'ramu.naidu@andhrasolar.com',
      phone: '+91 80123 98765',
      company: 'Andhra Solar Systems Ltd',
      service: 'Cloud Architecture' as ServiceType,
      budgetLacs: 12,
      notes: 'Wants to optimize our cloud database nodes for tracking solar grid metrics and automate telemetry replication to Mumbai data center.'
    },
    {
      name: 'Sunita Rao',
      email: 'sunita@raofashions.co',
      phone: '+91 77654 32109',
      company: 'Rao Boutique & Retail',
      service: 'Enterprise UI/UX' as ServiceType,
      budgetLacs: 4,
      notes: 'Redesigning our ecommerce app checkout funnel. Mobile conversion speed is our core bottleneck.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    const budgetVal = budgetLacs * 100000; // Lacs to Rupees

    setTimeout(() => {
      // Craft formal Lead record
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        name,
        email,
        phone: phone || '+91 99999 88888',
        company: company || 'Independant',
        service,
        budget: budgetVal,
        status: 'new',
        source,
        notes: notes || 'No additional details provided.',
        created_at: new Date().toISOString(),
        history: [
          {
            id: `act-${Date.now()}-init`,
            type: 'system',
            content: `Inquiry successfully submitted via Web Contact Form. Desired Service: ${service}. Budget estimated: ₹${budgetVal.toLocaleString('en-IN')}.`,
            timestamp: new Date().toISOString(),
            actor: 'System'
          }
        ]
      };

      onAddLead(newLead);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form variables
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setNotes('');
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="lead-capture-container">
      {/* LEFT: Explanation/Pitch Column (5 cols) */}
      <div className="lg:col-span-5 space-y-6 text-slate-350">
        
        {/* Pitch Headline */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden" id="capture-pitch">
          <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <p className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">Interactive Simulation</p>
          <h2 className="text-xl font-bold text-white mt-1.5 font-sans leading-snug">Public Contact Form Sandbox</h2>
          <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
            This module represents the client-facing website of our US-based IT consulting firm. 
            When visitors log their project needs here, they are dispatched instantaneously to our CRM dashboard.
          </p>
        </div>

        {/* Quick presets generator to optimize demo experience */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3.5" id="presets-card">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">One-Click Client Presets</h4>
          </div>
          <p className="text-xs text-slate-400">
            Click any template below to pre-populate the form with a structured proposal requirement using authentic Indian client profiles:
          </p>
          <div className="space-y-2">
            {templates.map((tpl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => applyTemplate(tpl)}
                className="w-full text-left p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800 hover:border-slate-700 hover:text-white text-xs flex items-center justify-between group transition-all"
              >
                <div>
                  <p className="font-bold text-slate-300 font-sans group-hover:text-white">{tpl.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[240px]">
                    {tpl.company} · ₹{tpl.budgetLacs} Lacs
                  </p>
                </div>
                <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/25 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                  Fill Template
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Vertical scope briefs */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5" id="services-briefs">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
            Active IT Service Verticals
          </p>
          <ul className="space-y-2">
            <li className="text-xs flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
              <span><strong>US-Owned operations</strong> catering to global offshore support.</span>
            </li>
            <li className="text-xs flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span>Billing pipelines processed securely in Indian Rupees (₹).</span>
            </li>
          </ul>
        </div>

      </div>

      {/* RIGHT: Actual Interactive Contact Card (7 cols) */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative" id="contact-form-widget">
        
        {/* Success Gate */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 flex flex-col items-center text-center space-y-4"
            id="submission-success-visual"
          >
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="max-w-md">
              <h3 className="text-xl font-bold text-white">Inquiry Sent Successfully!</h3>
              <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                Thank you for contacting us. The lead payload has been dispatched, and added into our secure **CRM admin panel**.
              </p>
            </div>
            
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 max-w-sm text-left">
              <p className="text-[10px] font-mono text-slate-500 leading-normal uppercase">Dispatched Payload:</p>
              <p className="text-xs text-indigo-400 font-mono mt-1">Status: Stage 1 - New Inquiry</p>
              <p className="text-xs text-slate-350 font-sans mt-1">We will notify the pipeline manager.</p>
            </div>

            <button
              onClick={() => setIsSuccess(false)}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" id="web-contact-form">
            <h3 className="text-md font-sans font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Submit Project Requirements</span>
              <span className="text-[10px] font-mono text-slate-500">Auto-injects to localDB</span>
            </h3>

            {/* Inputs: Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Ramamurthy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all font-sans"
                  id="form-input-name"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ramesh@fintech.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all font-sans"
                  id="form-input-email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Num */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                  Phone (India Contact preferred)
                </label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all font-sans"
                  id="form-input-phone"
                />
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                  Company / Agency Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramamurthy Solutions"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all font-sans"
                  id="form-input-company"
                />
              </div>
            </div>

            {/* Service catalog choice chip layout */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                Select Required IT Vertical *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="service-types-chips">
                {SERVICES_CATALOG.map((cat) => {
                  const isSelected = service === cat.type;
                  return (
                    <button
                      key={cat.type}
                      type="button"
                      onClick={() => setService(cat.type)}
                      className={`text-left p-3 rounded-2xl border transition-all ${
                        isSelected 
                        ? 'border-indigo-500 bg-indigo-500/10 text-white' 
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <p className="text-xs font-bold leading-none">{cat.type}</p>
                      <p className="text-[10px] text-slate-500 mt-1 lines-clamp-2 leading-relaxed">
                        {cat.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget slide selector in Lacs (₹) */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-850">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                  Estimated Project Budget (INR)
                </label>
                <span className="text-xs font-extrabold text-emerald-400 font-mono">
                  ₹{budgetLacs} Lacs {(budgetLacs * 100000).toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={budgetLacs}
                onChange={(e) => setBudgetLacs(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                id="form-input-budget"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500 pt-1">
                <span>₹1 Lac</span>
                <span>₹10 Lacs</span>
                <span>₹25 Lacs</span>
                <span>₹50 Lacs (₹5,000,000)</span>
              </div>
            </div>

            {/* Multi-line Details Brief */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                Brief Project Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Outline core systems requirements, timeline expectations, tech stack integrations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-205 focus:outline-none focus:border-indigo-500 transition-all font-sans leading-relaxed"
                id="form-input-notes"
              />
            </div>

            {/* Inquiry Trigger Buttons */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-[10px] text-slate-500 font-sans flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-500" />
                <span>Field marked (*) are required.</span>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 group transition-all"
                id="form-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"></span>
                    <span>Transmitting lead...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-white" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
