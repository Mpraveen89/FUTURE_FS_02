/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lead } from '../types';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@techindiaops.com',
    phone: '+91 98765 43210',
    company: 'TechIndia Solutions',
    service: 'AI & Agentic Systems',
    budget: 1500000,
    status: 'proposal',
    source: 'LinkedIn',
    notes: 'Inquiring about deploying customized Gemini-powered customer Support agents for their enterprise division. Needs high performance and secure enterprise guardrails.',
    created_at: '2026-05-12T09:15:00Z',
    history: [
      {
        id: 'act-1-1',
        type: 'system',
        content: 'Lead created via LinkedIn Outreach.',
        timestamp: '2026-05-12T09:15:00Z',
        actor: 'System'
      },
      {
        id: 'act-1-2',
        type: 'call',
        content: 'Initial discovery call completed by Admin. Rajesh confirmed budget limit of ₹15 Lacs and timeline of two months.',
        timestamp: '2026-05-13T11:00:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-1-3',
        type: 'status_change',
        content: 'Status updated from "New" to "Contacted"',
        timestamp: '2026-05-13T11:01:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-1-4',
        type: 'status_change',
        content: 'Status updated from "Contacted" to "Nurturing" after brief tech-stack discussion.',
        timestamp: '2026-05-18T14:30:00Z',
        actor: 'Srinivas Murthy'
      },
      {
        id: 'act-1-5',
        type: 'meeting',
        content: 'Architectural walkthrough. Presented prototype for Agentic workflows. Team was highly impressed.',
        timestamp: '2026-05-22T10:00:00Z',
        actor: 'Srinivas Murthy'
      },
      {
        id: 'act-1-6',
        type: 'status_change',
        content: 'Status updated from "Nurturing" to "Proposal" and structured PDF draft submitted.',
        timestamp: '2026-05-25T16:45:00Z',
        actor: 'Amit Sharma'
      }
    ]
  },
  {
    id: 'lead-2',
    name: 'Ramu Pillai',
    email: 'ramu@pillailogistics.in',
    phone: '+91 94432 10987',
    company: 'Pillai Global Logistics',
    service: 'Cloud Architecture',
    budget: 850000,
    status: 'converted',
    source: 'Website Form',
    notes: 'Wants to migrate their legacy on-premise inventory tracking DB to AWS/GCP with real-time replication and live sync controls.',
    created_at: '2026-05-05T08:30:00Z',
    history: [
      {
        id: 'act-2-1',
        type: 'system',
        content: 'Lead submitted from web consultation form.',
        timestamp: '2026-05-05T08:30:00Z',
        actor: 'System'
      },
      {
        id: 'act-2-2',
        type: 'email',
        content: 'Follow-up email sent outlining migration frameworks and scheduling details.',
        timestamp: '2026-05-05T10:00:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-2-3',
        type: 'status_change',
        content: 'Status updated to "Contacted"',
        timestamp: '2026-05-05T10:02:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-2-4',
        type: 'meeting',
        content: 'Completed audit of local Postgres schema. Estimated 120-engineer-hours to run full replication setup.',
        timestamp: '2026-05-09T15:00:00Z',
        actor: 'Deepak Rao'
      },
      {
        id: 'act-2-5',
        type: 'status_change',
        content: 'Status updated to "Nurturing" and project proposal compiled.',
        timestamp: '2026-05-10T12:00:00Z',
        actor: 'Deepak Rao'
      },
      {
        id: 'act-2-6',
        type: 'status_change',
        content: 'Status changed to "Proposal" with contract terms attached.',
        timestamp: '2026-05-14T10:00:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-2-7',
        type: 'status_change',
        content: 'Status changed to "Converted" after receiving final signoff from Ramu. Initial advance of ₹3 Lac cleared.',
        timestamp: '2026-05-20T11:40:00Z',
        actor: 'Amit Sharma'
      }
    ]
  },
  {
    id: 'lead-3',
    name: 'Priya Sharma',
    email: 'priya.sharma@sharmacare.net',
    phone: '+91 99912 34567',
    company: 'Sharma Healthcare Group',
    service: 'Full-stack Platform',
    budget: 2400000,
    status: 'nurturing',
    source: 'Reference',
    notes: 'Referral with strong interest. Needs a multi-tenant client scheduling and electronic medical record management system with secure encryption.',
    created_at: '2026-05-15T14:20:00Z',
    history: [
      {
        id: 'act-3-1',
        type: 'system',
        content: 'Created via internal referral from partner agency.',
        timestamp: '2026-05-15T14:20:00Z',
        actor: 'System'
      },
      {
        id: 'act-3-2',
        type: 'meeting',
        content: 'In-person presentation explaining security standard, React setup, and node hosting. Priya raised concerns about HIPAA guidelines.',
        timestamp: '2026-05-19T11:00:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-3-3',
        type: 'status_change',
        content: 'Status changed to "Contacted"',
        timestamp: '2026-05-19T11:05:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-3-4',
        type: 'note',
        content: 'Preparing specific compliance whitepaper to address privacy demands. The estimated budget remains strong at ₹24 Lacs.',
        timestamp: '2026-05-24T09:30:00Z',
        actor: 'Deepak Rao'
      },
      {
        id: 'act-3-5',
        type: 'status_change',
        content: 'Status changed to "Nurturing" while whitepaper is under review.',
        timestamp: '2026-05-24T10:00:00Z',
        actor: 'Amit Sharma'
      }
    ]
  },
  {
    id: 'lead-4',
    name: 'Ananya Das',
    email: 'ananya@dasfashion.co.in',
    phone: '+91 88776 55443',
    company: 'Das Fashion Retail',
    service: 'Enterprise UI/UX',
    budget: 450000,
    status: 'new',
    source: 'Google Search',
    notes: 'Wants to completely redesign their custom storefront. Mobile responsiveness is paramount as 90% of checkout traffic comes from Instagram ads.',
    created_at: '2026-05-27T10:30:00Z',
    history: [
      {
        id: 'act-4-1',
        type: 'system',
        content: 'Lead captured through website Contact Inquiry Form.',
        timestamp: '2026-05-27T10:30:00Z',
        actor: 'System'
      }
    ]
  },
  {
    id: 'lead-5',
    name: 'Sanjay Gupta',
    email: 'sanjay@guptasteels.com',
    phone: '+91 97654 32109',
    company: 'Gupta Steels Ltd',
    service: 'DevOps & Automation',
    budget: 650000,
    status: 'contacted',
    source: 'Website Form',
    notes: 'Requires set up of automated CI/CD pipelines, container orchestration with Kubernetes, and robust uptime monitoring alerts for factory ERP system.',
    created_at: '2026-05-20T06:12:00Z',
    history: [
      {
        id: 'act-5-1',
        type: 'system',
        content: 'Lead created via contact page.',
        timestamp: '2026-05-20T06:12:00Z',
        actor: 'System'
      },
      {
        id: 'act-5-2',
        type: 'email',
        content: 'Sent detailed introduction brochure for DevOps optimization services.',
        timestamp: '2026-05-21T15:40:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-5-3',
        type: 'status_change',
        content: 'Status altered from "New" to "Contacted"',
        timestamp: '2026-05-21T15:42:00Z',
        actor: 'Amit Sharma'
      }
    ]
  },
  {
    id: 'lead-6',
    name: 'Kiran Patel',
    email: 'kiran@patelbuilders.com',
    phone: '+91 96543 21098',
    company: 'Patel Realty & Developers',
    service: 'Mobile App Development',
    budget: 1250000,
    status: 'proposal',
    source: 'Partner Network',
    notes: 'Requires a native IOS & Android app for building tenants to log complaints, view utility bills, and purchase parking tokens. Needs Razorpay gateway integration.',
    created_at: '2026-05-10T11:45:00Z',
    history: [
      {
        id: 'act-6-1',
        type: 'system',
        content: 'Lead recorded via Partner Referral Agency.',
        timestamp: '2026-05-10T11:45:00Z',
        actor: 'System'
      },
      {
        id: 'act-6-2',
        type: 'call',
        content: 'Conducted kickoff call. Understood user stories. Estimating budget at ₹12.5 Lacs over 3.5 months development timeline.',
        timestamp: '2026-05-12T14:00:00Z',
        actor: 'Deepak Rao'
      },
      {
        id: 'act-6-3',
        type: 'status_change',
        content: 'Status changed to "Contacted"',
        timestamp: '2026-05-12T14:02:00Z',
        actor: 'Deepak Rao'
      },
      {
        id: 'act-6-4',
        type: 'meeting',
        content: 'Walkthrough of interactive Figma wires. Kiran offered positive reviews regarding payment screens.',
        timestamp: '2026-05-17T11:00:00Z',
        actor: 'Deepak Rao'
      },
      {
        id: 'act-6-5',
        type: 'status_change',
        content: 'Status updated to "Nurturing"',
        timestamp: '2026-05-17T11:05:00Z',
        actor: 'Deepak Rao'
      },
      {
        id: 'act-6-6',
        type: 'status_change',
        content: 'Proposal draft shared via secure PDF link.',
        timestamp: '2026-05-22T09:12:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-6-7',
        type: 'status_change',
        content: 'Status updated to "Proposal"',
        timestamp: '2026-05-22T09:15:00Z',
        actor: 'Amit Sharma'
      }
    ]
  },
  {
    id: 'lead-7',
    name: 'Arjun Verma',
    email: 'arjun@vermaedu.org',
    phone: '+91 93210 98765',
    company: 'Verma Shiksha Academy',
    service: 'Full-stack Platform',
    budget: 950000,
    status: 'converted',
    source: 'Google Search',
    notes: 'Online learning platform offering custom test prep modules. Demands clean dashboards for parents, analytical student tracking, and automated reporting systems.',
    created_at: '2026-05-01T15:00:00Z',
    history: [
      {
        id: 'act-7-1',
        type: 'system',
        content: 'Lead initiated via Contact Sheet.',
        timestamp: '2026-05-01T15:00:00Z',
        actor: 'System'
      },
      {
        id: 'act-7-2',
        type: 'status_change',
        content: 'Contact established. Setup presentation timeline.',
        timestamp: '2026-05-03T09:30:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-7-3',
        type: 'status_change',
        content: 'Status updated to "Nurturing"',
        timestamp: '2026-05-08T11:00:00Z',
        actor: 'Deepak Rao'
      },
      {
        id: 'act-7-4',
        type: 'status_change',
        content: 'Full budget and milestone outline sent. Budget scheduled at ₹9,50,000.',
        timestamp: '2026-05-11T12:00:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-7-5',
        type: 'status_change',
        content: 'Status updated to "Proposal"',
        timestamp: '2026-05-11T12:02:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-7-6',
        type: 'status_change',
        content: 'Contract officially signed by Arjun. Commencing development on June 1st.',
        timestamp: '2026-05-15T15:30:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-7-7',
        type: 'status_change',
        content: 'Status updated to "Converted"',
        timestamp: '2026-05-15T15:32:00Z',
        actor: 'Amit Sharma'
      }
    ]
  },
  {
    id: 'lead-8',
    name: 'Meera Nair',
    email: 'meera@nairconsulting.co',
    phone: '+91 91234 56789',
    company: 'Nair Financial Services',
    service: 'Cloud Architecture',
    budget: 1800000,
    status: 'lost',
    source: 'Partner Network',
    notes: 'Required standard ISO compliance setups on multi-region AWS cloud. Lost deal after feedback that we lacked locally physical data offices in Mumbai for audit storage requirements.',
    created_at: '2026-05-02T10:00:00Z',
    history: [
      {
        id: 'act-8-1',
        type: 'system',
        content: 'Lead incoming via partner referral.',
        timestamp: '2026-05-02T10:00:00Z',
        actor: 'System'
      },
      {
        id: 'act-8-2',
        type: 'meeting',
        content: 'Presented our standard AWS security templates. Client insisted on in-country hardware ownership audits.',
        timestamp: '2026-05-06T14:30:00Z',
        actor: 'Srinivas Murthy'
      },
      {
        id: 'act-8-3',
        type: 'status_change',
        content: 'Lead marked as "Lost" as target on-premise hardware storage nodes do not conform with cloud-only platform offerings.',
        timestamp: '2026-05-12T16:00:00Z',
        actor: 'Amit Sharma'
      },
      {
        id: 'act-8-4',
        type: 'status_change',
        content: 'Status upgraded to "Lost"',
        timestamp: '2026-05-12T16:02:00Z',
        actor: 'Amit Sharma'
      }
    ]
  }
];
