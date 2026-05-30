/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LeadStatus = 'new' | 'contacted' | 'nurturing' | 'proposal' | 'converted' | 'lost';

export type ServiceType = 
  | 'AI & Agentic Systems' 
  | 'Cloud Architecture' 
  | 'Full-stack Platform' 
  | 'Enterprise UI/UX' 
  | 'DevOps & Automation' 
  | 'Mobile App Development';

export type LeadSource = 'Website Form' | 'Google Search' | 'LinkedIn' | 'Reference' | 'Partner Network';

export interface Activity {
  id: string;
  type: 'status_change' | 'note' | 'system' | 'email' | 'call' | 'meeting' | 'budget_change';
  content: string;
  timestamp: string;
  actor: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: ServiceType;
  budget: number; // in INR (₹)
  status: LeadStatus;
  source: LeadSource;
  notes: string;
  created_at: string;
  history: Activity[];
}

export type DashboardView = 'dashboard' | 'kanban' | 'leads' | 'capture';

export interface CRMStats {
  totalLeads: number;
  totalPipelineValue: number;
  convertedCount: number;
  conversionRate: number;
  statusDistribution: Record<LeadStatus, number>;
  serviceRevenue: Record<ServiceType, number>;
}
