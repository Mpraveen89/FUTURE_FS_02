# 💼 Client Lead Management System (Mini CRM) — Enterprise Inbound Pipeline Control Platform

## Full Stack Web Development – Portfolio Showcase (2026) | Future Interns

A high-performance, immersive, and conversion-focused business dashboard and contact capture portal engineered for IT consulting agencies, freelancers, and startups to receive, track, and convert prospective client pipelines with lightning speed.

---

# 🚀 Project Overview

The **Client Lead Management System (Mini CRM)** serves as a robust backend control system behind an enterprise service provider’s public website. It connects client-facing project inquiries directly with internally privileged sales executives, optimizing transaction velocity from initial inquiry to closed client accounts.

The platform functions as a dual-sided digital application:
1. **Public Website Intake Form**: Allows visitors to select specialized services, slide their projected budgets, and submit detailed engineering project briefs. Includes instant "1-Click Client Presets" to simulate real-time enterprise requirements.
2. **Internal CRM Operations Dashboard**: Provides secure administrative access to live pipeline analytics, interactive data charts, historical follow-up timelines, and drag-and-drop workflow status managers.

---

# 🎯 Business Objective

### Problem Statement

Small-to-medium businesses and freelance agencies often struggle with:
* **Leaked Lead Pipelines**: Inquiries submitted through standard contact forms get lost in cluttered email inboxes.
* **Lack of Accountability**: No persistent audit trails recording which operator contacted the lead, or what custom proposals were sent.
* **Unclear Valuation**: Difficulty analyzing how much potential revenue is currently resting in each stage (Contacted, Nurturing, Proposal).
* **Communication Overhead**: Spending excessive time manually syncing data instead of taking rapid action.

---

### Solution

This custom CRM introduces a visually stunning, responsive, and secure digital management dashboard that:
* **Centralizes Lead Ingestion**: Captures form responses instantly, storing details like contact information, budget metrics, and historical logs.
* **Visualizes Pipeline Stages**: Harnesses rich interactive SVG Donut charts and responsive bar graphs to calculate potential pipeline revenue in **Indian Rupees (₹)**.
* **Organizes Follow-Ups**: Allows managers to log actions like phone calls, meetings, or custom emails, in addition to editing project requirements and updating values.
* **Fosters Transparency**: Maintains a serial, unalterable history log tracking actions by specific key operators (*Amit Sharma*, *Deepak Rao*, *Srinivas Murthy*).

---

# 💼 Business Monetization Strategy

This application supports agencies, freelancers, and software consulting companies in capturing more profit through:

## 📈 Instant Lead Valuation
By estimating budgets directly in Indian Rupees (₹) and displaying them in simplified Indian metrics (Lacs/Crores), operators can immediately prioritize high-value enterprise accounts.

---

## 📅 Simplified Follow-Up Workflows
The interactive Kanban panel minimizes scheduling friction, keeping representatives aligned on which leads require immediate proposals or initial introductory phone calls.

---

## 📊 Analytics-Led Performance Tracking
Through instant calculation of conversion percentages, total active valuations, and platform revenues by service vertical, business owners gain direct insights into which specialties drive the highest consulting return-on-investment (ROI).

---

# 🏢 Business Information

### IT Consulting & Services Agency

**Industry**  
Enterprise Software Engineering & IT Advisory Services

**Geographical Focus**  
US-based operations with highly optimized offshoring delivery hubs located in Bangalore, Hyderabad, and Mumbai, India.

**Standard Transaction Metric**  
Specialized project contracts priced in Indian Rupees (₹) ranging from ₹1 Lac up to ₹50 Lacs (₹5,000,000).

**Primary Service Verticals**  
* **AI & Agentic Systems**: Customized Gemini LLM multi-agent systems and task-solving workflows.
* **Cloud Architecture**: Secure AWS/GCP transitions, serverless architecture, and multi-region db replication.
* **Full-stack Platform**: Enterprise SaaS Web applications using robust frontend-to-backend stacks.
* **Enterprise UI/UX**: Premium Figma design systems, interactive wiring frames, and smooth micro-interactions.
* **DevOps & Automation**: Scalable CI/CD pipelines, container runtime orchestration, and cluster monitoring.
* **Mobile App Development**: Native iOS & Android binaries with integrated multi-channel payment gates.

---

# ✨ Core Features

## 🖥 1. Public Consultation Website Intake Portal
* Clean, high-fidelity corporate consulting intake page with spacious modern forms.
* **Service catalog selection chips** displaying detailed technical description helpers.
* **Interactive Budget Slider**: Adjust target budgets dynamically from ₹1 Lac to ₹50 Lacs with live text indicators.
* **1-Click Client Presets**: Seamlessly fill out the form using authentic Indian client identities (*Ramesh Ramamurthy*, *Ramu Naidu*, *Sunita Rao*) to simulate professional service inquiries instantly.

---

## 📊 2. High-Fidelity Interactive Analytics Panel
* **SVG Donut Chart (Pipeline Stages)**: Plots active deal segments (New, Contacted, In Discussion, Proposal, Converted, Lost). Hovering highlights specific counts and segment values dynamically.
* **Isometric Vertical Bar Chart (Service Revenue)**: Graphically displays the total estimated pipeline value across the six core consulting disciplines.
* **Funnel Stream Diagram**: Detailed structural workflow mapping conversion rates and team performance at each point of contact.

---

## 📋 3. Real-Time Kanban Board
* Responsive column grid tracking sales progression.
* Slide prospective accounts left or right using quick navigational arrows.
* View total accumulative revenue caps and active log counters per column.
* Click **Inspect** to draw up deep-dive profiles instantly.

---

## 🔍 4. Deep-Registry Sheet Inspector (Modal)
* **Direct Communication Triggers**: Click to initiate corporate email drafts or native phone routing.
* **Comprehensive Operator Logs**: Easily record rapid logs (Dispatched Proposal, Logged Call, Hosted Meeting) authored by designated operators.
* **Requirement Editor**: Full text areas to edit requirements with auto-saving behaviors.
* **Value Adjustment**: Real-time project valuation overrides.

---

## 🔒 5. Secure Admin Gateway
* Full credentials protection layer designed to prevent unauthorized visitors from accessing core CRM databases.
* Easy "Bypass" feature for recruiters and reviewers to evaluate features inside preview modes.
* Standard mock credentials:
  * **Email**: `admin@itcompany.com`
  * **Password**: `admin123`

---

# 🎨 Design Philosophy

Inspired by modern elite SaaS dashboards, the application follows a futuristic slate theme to focus purely on visual hierarchy:

* **Canvas**: Deep Obsidian Slate dark backgrounds (`slate-950`) with elevated dark card panels (`slate-900`) and borders (`slate-800`).
* **Highlights**: Tailored accent colors for state representations—blue for new, yellow for contacted, purple for discussion, orange for proposals, emerald for wins, and red for lost pipelines.
* **Interactive Motion**: Powered by Framer Motion, presenting elegant layout shifting animations on cards, fade transitions on routes, and smooth pop-ups on modal streams.
* **Typography**: Clean, professional sans-serif headings paired with monospace indicators (`font-mono`) for numerical values and system timestamps.

---

# 🛠 Technology Stack

## Core Architecture
* **React 19**: Modern functional components integrated with state hooks.
* **Vite**: Accelerated local bundler.
* **TypeScript**: Strict type definitions for core pipelines, activities, and analytical summaries.

## Styles & Presentation
* **Tailwind CSS v4**: High-performance layout engines.
* **Motion (Framer Motion)**: Dynamic entrance transitions and micro-state responses.
* **Lucide React**: Clean SVGs for status elements and operations.

---

# 📂 Project Structure

```bash
client-lead-crm/
│
├── src/
│   ├── components/
│   │   ├── AdminDashboard.tsx       # Main analytics engine + filtered list management table
│   │   ├── AnalyticsSection.tsx     # Custom SVG Donut Pie & 3D Bar chart visualizations
│   │   ├── KanbanBoard.tsx          # Drag-and-move stage advancement system
│   │   ├── LeadDetailsModal.tsx     # Registry sheet operator notes & actions timeline
│   │   ├── MainHeader.tsx           # Global branding navigation, role tags & alerts 
│   │   └── PublicContactForm.tsx    # Customer portal inquiry & 1-click preset demo templates
│   │
│   ├── data/
│   │   └── mockLeads.ts             # Seeding file holding initial Indian client records
│   │
│   ├── types.ts                     # TypeScript schemas, pipeline states & service definitions
│   ├── App.tsx                      # Primary controller, local storage & state synchronizers
│   ├── main.tsx                     # Entry mountpoint
│   └── index.css                    # Tailwind imports and premium font theme overrides
│
├── package.json                     # System packages and terminal run scripts
├── tsconfig.json                    # Compliation parameters
└── README.md                        # Documentation
```

---

# ⚙️ Local Development Setup

To run this application on your local machine using Visual Studio Code, complete the following:

## Step 1: Open Terminal in VS Code
Go to `File` > `Open Folder...`, choose this project folder, and press `` Ctrl + ` `` to launch the integrated terminal.

---

## Step 2: Install Package Dependencies
```bash
npm install
```

---

## Step 3: Launch Local Server
```bash
npm run dev
```

---

## Step 4: Explore the CRM!
The console will display the local network link. Paste it into your preferred web browser to explore.
```text
http://localhost:3000
```

---

### Production Compiles
Create optimized static outputs inside the `/dist` directory:
```bash
npm run build
```

---

# 📈 Future Enhancements

* **Database Core Integration**: Standard Firestore or Supabase real-time synchronizations.
* **Authentic Auth Integrations**: Secure login verification backed by OTP verification methods.
* **AI Follow-up Summarizer**: Automatic classification of customer inquiry briefs using Gemini AI API models.
* **Bill Generator**: Click to generate customized contract budgets directly in PDF formats.

---

# 🎓 Learning Outcomes

Through this project, I strengthened my ability to:
* Set up customizable React structures utilizing TypeScript and local storage.
* Draw crisp math-based SVG donut charts, managing angles and polar coordinates programmatically.
* Build high-density layout tables, complete with search algorithms, multi-parameter segmentations, and currency formatters.
* Design complex modal windows complete with scroll locks, key escapes, and dynamic activity histories.

---

# 👨‍💻 Developer

### M. Praveen

B.Tech Information Technology Student  
Full Stack Developer | Software Engineering Enthusiast  

* **GitHub**: [https://github.com/Mpraveen89](https://github.com/Mpraveen89)
* **LinkedIn**: [https://linkedin.com/in/m-praveen-b4772734a](https://linkedin.com/in/m-praveen-b4772734a)
* **Email**: [mpraveen982005@gmail.com](mailto:mpraveen982005@gmail.com)

---

# 📜 License

Developed strictly for professional portfolio presentation, demonstration, and evaluation. Feel free to clone, study, or fork this software for educational purposes.

---

# 🙏 Acknowledgements

* **Future Interns** – for hosting this constructive task framework.
* **Modern Web Community** – for standardizing Tailwind CSS, React functional hooks, and Motion libraries.

---

### "Empowering small agencies & freelancers to unlock faster pipeline growth using robust software and gorgeous visual analytics dashboards."
