/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Lead, LeadStatus, ServiceType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Award, IndianRupee, TrendingUp, Users, Percent, Briefcase } from 'lucide-react';

interface AnalyticsSectionProps {
  leads: Lead[];
}

export default function AnalyticsSection({ leads }: AnalyticsSectionProps) {
  const [hoveredStatus, setHoveredStatus] = useState<LeadStatus | null>(null);
  const [hoveredService, setHoveredService] = useState<ServiceType | null>(null);

  // 1. Data Crunching for Metrics
  const totalLeads = leads.length;
  const convertedLeads = leads.filter((l) => l.status === 'converted');
  const activeLeads = leads.filter((l) => l.status !== 'converted' && l.status !== 'lost');
  
  const totalPipeline = leads.reduce((acc, lead) => {
    // Only sum active states
    if (lead.status !== 'lost') {
      return acc + lead.budget;
    }
    return acc;
  }, 0);

  const conversionRate = totalLeads > 0 
    ? Math.round((convertedLeads.length / totalLeads) * 100) 
    : 0;

  // 2. Data Structure for Status Distribution (Donut Chart)
  const statusLabels: Record<LeadStatus, { label: string; color: string; hoverColor: string }> = {
    new: { label: 'New Inquiry', color: '#3b82f6', hoverColor: '#60a5fa' }, // Blue
    contacted: { label: 'Contacted', color: '#eab308', hoverColor: '#fde047' }, // Yellow
    nurturing: { label: 'In Discussion', color: '#a855f7', hoverColor: '#c084fc' }, // Purple
    proposal: { label: 'Proposal Sent', color: '#f97316', hoverColor: '#fb923c' }, // Orange
    converted: { label: 'Converted Client', color: '#10b981', hoverColor: '#34d399' }, // Emerald
    lost: { label: 'Lost / Closed', color: '#ef4444', hoverColor: '#f87171' } // Red
  };

  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<LeadStatus, number>);

  const donutData = Object.keys(statusLabels).map((key) => {
    const status = key as LeadStatus;
    const count = statusCounts[status] || 0;
    const value = leads.filter(l => l.status === status).reduce((sum, l) => sum + l.budget, 0);
    return {
      status,
      count,
      value,
      ...statusLabels[status]
    };
  }).filter(item => item.count > 0);

  // Calculate angles for Donut slices
  const totalCount = donutData.reduce((sum, item) => sum + item.count, 0);
  let accumulatedAngle = 0;

  const donutSlices = donutData.map((slice) => {
    const percentage = totalCount > 0 ? slice.count / totalCount : 0;
    const angleStart = accumulatedAngle;
    const angleEnd = accumulatedAngle + percentage * 360;
    accumulatedAngle = angleEnd;

    // Center coordinates for drawing paths
    const radius = 70;
    const innerRadius = 45;
    const cx = 100;
    const cy = 100;

    // Helper to polar coordinates
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      };
    };

    const startOuter = polarToCartesian(cx, cy, radius, angleStart);
    const endOuter = polarToCartesian(cx, cy, radius, angleEnd);
    const startInner = polarToCartesian(cx, cy, innerRadius, angleStart);
    const endInner = polarToCartesian(cx, cy, innerRadius, angleEnd);

    const largeArcFlag = angleEnd - angleStart <= 180 ? '0' : '1';

    // SVG path description for donut slice
    const pathData = totalCount === 1 || percentage >= 0.99 
      ? `
        M ${cx} ${cy - radius}
        A ${radius} ${radius} 0 1 1 ${cx - 0.01} ${cy - radius}
        M ${cx} ${cy - innerRadius}
        A ${innerRadius} ${innerRadius} 0 1 0 ${cx + 0.01} ${cy - innerRadius}
        Z
      `
      : `
        M ${startOuter.x} ${startOuter.y}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}
        L ${endInner.x} ${endInner.y}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}
        Z
      `;

    return {
      ...slice,
      pathData,
      percentage,
      angleStart,
      angleEnd
    };
  });

  // 3. Data Structure for Service Categories (Bar Chart)
  const servicesList: ServiceType[] = [
    'AI & Agentic Systems',
    'Cloud Architecture',
    'Full-stack Platform',
    'Enterprise UI/UX',
    'DevOps & Automation',
    'Mobile App Development'
  ];

  const serviceData = servicesList.map((service) => {
    const serviceLeads = leads.filter((l) => l.service === service);
    const count = serviceLeads.length;
    const revenue = serviceLeads.reduce((sum, l) => sum + (l.status !== 'lost' ? l.budget : 0), 0);
    return {
      service,
      count,
      revenue
    };
  });

  const maxRevenue = Math.max(...serviceData.map((d) => d.revenue), 1000000); // at least 1M representing top limit

  // INR Formatting Helper (Lacs / Crores format)
  const formatINR = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} Lac`;
    } else {
      return `₹${value.toLocaleString('en-IN')}`;
    }
  };

  return (
    <div className="space-y-6" id="analytics-root">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Card 1 */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg group hover:border-indigo-500/50 transition-all duration-300">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">Total Active Pipelines</p>
              <h3 className="text-2xl font-bold text-white mt-1">{formatINR(totalPipeline)}</h3>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>Across {activeLeads.length} active engagements</span>
              </p>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <IndianRupee className="w-5 h-5" id="metric-icon-rupee" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 w-full rounded-b-2xl"></div>
        </div>

        {/* Metric Card 2 */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg group hover:border-emerald-500/50 transition-all duration-300">
          <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">Total Leads Captured</p>
              <h3 className="text-2xl font-bold text-white mt-1">{totalLeads}</h3>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>New, active, and converted entries</span>
              </p>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Users className="w-5 h-5" id="metric-icon-leads" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 w-full rounded-b-2xl"></div>
        </div>

        {/* Metric Card 3 */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg group hover:border-purple-500/50 transition-all duration-300">
          <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">Lead Conversions</p>
              <h3 className="text-2xl font-bold text-white mt-1">{convertedLeads.length} Leads</h3>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-yellow-500" />
                <span>Successfully signed agreements</span>
              </p>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Award className="w-5 h-5" id="metric-icon-award" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 w-full rounded-b-2xl"></div>
        </div>

        {/* Metric Card 4 */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg group hover:border-yellow-500/50 transition-all duration-300">
          <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all duration-500"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-white mt-1">{conversionRate}%</h3>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-purple-400" />
                <span>Standard industry benchmark is 15%</span>
              </p>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
              <Percent className="w-5 h-5" id="metric-icon-percent" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 w-full rounded-b-2xl"></div>
        </div>
      </div>

      {/* Visual Workspace: Donut Pie and Bar Chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Donut Pie Card (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between" id="section-donut-chart">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-sans font-medium text-slate-200">Pipeline Stage Distribution</h4>
              <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">Pie Chart</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              Proportion of prospective clients segmented by sales-funnel pipeline indicators. Hover slices to isolate values.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
            {/* SVG Donut */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-12">
                {/* Background Track */}
                <circle cx="100" cy="100" r="70" stroke="#1e293b" strokeWidth="26" fill="none" />
                
                {/* Slices */}
                {donutSlices.map((slice, idx) => {
                  const isHovered = hoveredStatus === slice.status;
                  return (
                    <motion.path
                      key={slice.status}
                      d={slice.pathData}
                      fill={slice.color}
                      initial={{ scale: 1, opacity: 0.85 }}
                      animate={{ 
                        scale: isHovered ? 1.05 : 1,
                        opacity: hoveredStatus === null || isHovered ? 1 : 0.6,
                        filter: isHovered ? 'drop-shadow(0 10px 15px rgba(255, 255, 255, 0.15))' : 'none'
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      onMouseEnter={() => setHoveredStatus(slice.status)}
                      onMouseLeave={() => setHoveredStatus(null)}
                      className="cursor-pointer origin-center"
                    />
                  );
                })}
              </svg>

              {/* Central Details Portal */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center rounded-full pointer-events-none select-none">
                <AnimatePresence mode="wait">
                  {hoveredStatus ? (
                    <motion.div
                      key={hoveredStatus}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="px-4"
                    >
                      <p className="text-[10px] font-mono uppercase text-slate-400 tracking-tight leading-none">
                        {statusLabels[hoveredStatus].label}
                      </p>
                      <p className="text-lg font-bold text-white mt-1 leading-none">
                        {statusCounts[hoveredStatus] || 0} Leads
                      </p>
                      <p className="text-[10px] font-mono text-emerald-400 mt-1">
                        {formatINR(leads.filter(l => l.status === hoveredStatus).reduce((s, l) => s + l.budget, 0))}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-4"
                    >
                      <p className="text-[10px] font-mono uppercase text-slate-400 tracking-tight leading-none">Total Pipeline</p>
                      <p className="text-md font-bold text-white mt-1 leading-none">
                        {formatINR(totalPipeline)}
                      </p>
                      <p className="text-[9px] text-slate-500 font-mono mt-1">
                        {activeLeads.length} Active Deals
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Micro Legends */}
            <div className="grow space-y-2 max-w-[200px]" id="donut-legend-box">
              {donutData.map((slice) => {
                const isHovered = hoveredStatus === slice.status;
                const totalValue = slice.value;
                return (
                  <div
                    key={slice.status}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all ${
                      isHovered ? 'bg-slate-800 border-slate-700' : 'bg-transparent border-transparent'
                    }`}
                    onMouseEnter={() => setHoveredStatus(slice.status)}
                    onMouseLeave={() => setHoveredStatus(null)}
                  >
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }}></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-300 truncate leading-none">{slice.label}</p>
                        <p className="text-xs font-bold text-slate-200 leading-none ml-2">{slice.count}</p>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{formatINR(totalValue)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Isometric Bar Graph (3 Cols) */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between" id="section-bar-chart">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-sans font-medium text-slate-200">Revenue Pipeline by Service Category</h4>
              <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">Bar Chart</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              Estimated contract opportunities (active pipelines) across our primary IT consulting verticals. Sparking growth engines.
            </p>
          </div>

          {/* Bar Chart Container */}
          <div className="space-y-4" id="bars-list-box">
            {serviceData.map((item) => {
              const percentage = item.revenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
              const isHovered = hoveredService === item.service;
              
              return (
                <div 
                  key={item.service} 
                  className="space-y-1.5 cursor-pointer group"
                  onMouseEnter={() => setHoveredService(item.service)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                      <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{item.service}</span>
                      {item.count > 0 && (
                        <span className="text-[10px] bg-slate-800 text-slate-400 font-mono px-1.5 py-0.2 rounded border border-slate-700">
                          {item.count} Ld
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-slate-200 group-hover:text-indigo-300 transition-colors">
                      {formatINR(item.revenue)}
                    </span>
                  </div>

                  {/* Sleek Custom "3D Rounded" Bar Frame */}
                  <div className="relative h-6 bg-slate-950 rounded-lg overflow-hidden border border-slate-800/50">
                    {/* Animated Fill Bar with a semi-3D visual gradient effect */}
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-400 rounded-r-md flex items-center justify-end pr-2"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(percentage, 1)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                      {/* Sub-reflective Glass Highlights on Hover to suggest 3D depth */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                      
                      {percentage > 15 && (
                        <span className="text-[9px] font-mono text-white/90 font-bold drop-shadow">
                          {Math.round(percentage)}%
                        </span>
                      )}
                    </motion.div>
                    
                    {/* Active hover overlay */}
                    {isHovered && (
                      <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center text-[11px] font-mono text-slate-500">
            <span>Scale Limit: {formatINR(maxRevenue)}</span>
            <span className="text-[10px] text-emerald-500 font-semibold">Active Value Mapping</span>
          </div>
        </div>
      </div>

      {/* Funnel Stream Workflow Graphic */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg text-slate-300" id="funnel-rate-workflow">
        <h5 className="text-xs font-mono tracking-wider text-slate-400 mb-4 uppercase">
          Client Pipeline Progression Flow
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { stage: 'New inquiry', count: leads.filter(l => l.status === 'new').length, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
            { stage: 'Contacted', count: leads.filter(l => l.status === 'contacted').length, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
            { stage: 'In Discussion', count: leads.filter(l => l.status === 'nurturing').length, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
            { stage: 'Proposal Sent', count: leads.filter(l => l.status === 'proposal').length, color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
            { stage: 'Converted Clients', count: leads.filter(l => l.status === 'converted').length, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' }
          ].map((item, idx) => (
            <div key={item.stage} className={`flex flex-col justify-between p-3 rounded-xl border ${item.color} relative`}>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-mono opacity-80">Stage 0{idx + 1}</p>
                <p className="text-xs font-bold font-sans mt-0.5 truncate">{item.stage}</p>
              </div>
              <div className="flex items-baseline justify-between mt-3">
                <span className="text-lg font-extrabold">{item.count}</span>
                <span className="text-[10px] opacity-70 font-mono">
                  {totalLeads > 0 ? Math.round((item.count / totalLeads) * 100) : 0}% of total
                </span>
              </div>
              {idx < 4 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600 bg-slate-900 border border-slate-800 h-5 w-5 rounded-full flex items-center justify-center font-mono text-[9px]">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
