# Mirage Pharma — Digital Experience Monorepo

Enterprise life-sciences web application and clinical data portfolio for **Mirage Pharma** (*"Healthy Life"*).

## 🏗️ Architecture & Monorepo Structure

```
mirage-pharma/
├── apps/
│   ├── web/                 # Next.js 15+ App Router Marketing & Innovation Portal
│   │   ├── app/             # Scrollytelling, Science, Pipeline, Culture routes
│   │   ├── components/      # UI, 3D Canvas, Glassmorphism components
│   │   ├── features/        # Pipeline matrix, HCP portal, molecule search
│   │   └── public/          # 3D assets, logos, and medical key visuals
│   └── admin/               # Clinical Dossier & Investigator Management
├── backend/                 # Node.js / Express or Nest API Service
│   ├── src/                 # Clinical trials API, inquiry pipelines, GxP logs
│   └── Dockerfile
├── packages/
│   ├── config/              # Shared Tailwind, TypeScript, ESLint configurations
│   ├── ui/                  # Mirage Biomedical Glass design system components
│   ├── types/               # TypeScript domain interfaces (Molecules, Trials, HCP)
│   └── utils/               # Analytics, formatting, math, and telemetry helpers
├── supabase/
│   └── migrations/          # Inquiries, clinical trials, and newsletter schema
└── docs/                    # Architecture dossiers and UI design tokens
```

## 🌐 Clinical Portals & Core Modules
* **01 / Corporate Flagship (`/`):** Monumental scrollytelling hero, 3 monolithic culture columns, asymmetric therapeutic bento grid, and trust wall.
* **02 / Science & Discovery Matrix (`/science`):** R&D nanotechnology platforms, interactive 4-phase clinical pipeline matrix, and downloadable investigator brochures.
* **03 / Therapeutics Portfolio (`/therapeutics`):** Commercial drug catalog (Rx vs. OTC), SmPC document modal, 2D DataMatrix serialization simulator, and IoT cold-chain tracker.
* **04 / Quality Assurance & ESG (`/quality`):** WHO/FDA/ISO regulatory accreditations, interactive 3-regime thermal simulator, and Net-Zero ESG disclosures.
* **05 / Corporate Culture & Leadership (`/about`):** Chairman & Managing Director Tarek El Attar's desk, executive leadership roster, and corporate milestone timeline.
* **06 / Global B2B & Licensing Hub (`/b2b`):** 4 partnership archetypes, interactive 4-step confidential alliance wizard, and regional headquarters directory.
* **07 / Newsroom & Clinical Media (`/newsroom`):** Breaking clinical ticker, filterable scientific feed, downloadable whitepapers, and institutional media digest.
* **08 / HCP Medical Decision Support (`/hcp-portal`):** Accredited practitioner self-certification gate, Cockcroft-Gault renal clearance calculator, drug monographs, and 24/7 pharmacovigilance safety reporting.

## 🎨 Brand & Color System
* **Primary Medical Blue:** `#2878BC`
* **Deep Pharma Navy:** `#023368`
* **Vitality Green:** `#35AB38`
* **Bio-Glass Cyan:** `#308995` & `#61C0E4`

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run all apps in development mode
pnpm dev

# Build for production
pnpm build

# Run unit tests across workspaces
pnpm test
```
