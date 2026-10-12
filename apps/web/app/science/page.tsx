'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, Badge, Card, StatusPip } from '@mirage/ui';
import type { PipelineMolecule } from '@mirage/types';
import {
  Search,
  Dna,
  ArrowRight,
  ChevronRight,
  X,
  Layers,
  ShieldCheck,
  Microscope,
  Download,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

const PIPELINE_DATA: PipelineMolecule[] = [
  {
    id: 'mrg-701',
    code: 'MRG-701',
    name: 'Targeted Polypeptide Alpha',
    category: 'Oncology',
    mechanism: 'CD47 / SIRPα Checkpoint Modulator',
    indication: 'Metastatic Non-Small Cell Lung Carcinoma',
    currentPhase: 'Phase III',
    progress: 75,
    regulatory: 'FDA Fast Track',
    leadInvestigator: 'Dr. Evelyn Vance (Basel Clinical Oncology)',
    cohortSize: '840 Patients across 42 Centers',
    primaryEndpoint: 'Overall Survival (OS) & Progression-Free Survival (PFS)',
    trialId: 'NCT05423811',
    targetReceptor: 'CD47 / SIRPα Axis',
  },
  {
    id: 'mrg-408',
    code: 'MRG-408',
    name: 'Bispecific ADC Conjugate',
    category: 'Oncology',
    mechanism: 'HER2 / TROP2 Cleavable Linker ADC',
    indication: 'Refractory Triple-Negative Breast Cancer',
    currentPhase: 'Phase II',
    progress: 50,
    regulatory: 'EMA Priority Medicines (PRIME)',
    leadInvestigator: 'Prof. Marcus Thorne (Boston Cancer Institute)',
    cohortSize: '320 Patients across 18 Centers',
    primaryEndpoint: 'Objective Response Rate (ORR) & Duration of Response',
    trialId: 'NCT05819034',
    targetReceptor: 'HER2 / TROP-2 Receptors',
  },
  {
    id: 'mrg-310',
    code: 'MRG-310',
    name: 'AtheroShield Endothelial Peptidomimetic',
    category: 'Cardiology',
    mechanism: 'PCSK9 / ANGPTL3 Dual Inhibitor',
    indication: 'Severe Familial Hypercholesterolemia',
    currentPhase: 'Phase II',
    progress: 50,
    regulatory: 'FDA Breakthrough Therapy',
    leadInvestigator: 'Dr. Tariq Mansour (Cairo Heart Center)',
    cohortSize: '510 Patients across 26 Centers',
    primaryEndpoint: 'LDL-C Reduction from Baseline at Week 24',
    trialId: 'NCT04982170',
    targetReceptor: 'PCSK9 & ANGPTL3 Protein Matrix',
  },
  {
    id: 'mrg-215',
    code: 'MRG-215',
    name: 'CardioRestore Micro-mRNA',
    category: 'Cardiology',
    mechanism: 'Myocardial Revascularization Factor',
    indication: 'Post-Infarction Heart Failure with Reduced EF',
    currentPhase: 'Phase I',
    progress: 25,
    regulatory: 'FDA IND Approved',
    leadInvestigator: 'Dr. Sarah Jenkins (Zurich Cardiovascular Center)',
    cohortSize: '64 Healthy & Patient Cohorts',
    primaryEndpoint: 'Safety, Tolerability, and Left Ventricular Ejection Fraction',
    trialId: 'NCT06129841',
    targetReceptor: 'VEGF-A / MicroRNA Signaling Complex',
  },
  {
    id: 'mrg-450',
    code: 'MRG-450',
    name: 'Cytokine Homeostasis Monoclonal',
    category: 'Immunology',
    mechanism: 'Selective IL-23 / IL-17 Dual Antagonist',
    indication: 'Severe Psoriatic Arthritis & Crohn’s Disease',
    currentPhase: 'Phase III',
    progress: 75,
    regulatory: 'FDA & EMA Fast Track',
    leadInvestigator: 'Prof. Clara Weber (Berlin Immunology Center)',
    cohortSize: '1,120 Patients across 65 Centers',
    primaryEndpoint: 'ACR50 & PASI 90 Clinical Remission at Week 16',
    trialId: 'NCT05210944',
    targetReceptor: 'Interleukin-23 / Interleukin-17 Subunits',
  },
  {
    id: 'mrg-108',
    code: 'MRG-108',
    name: 'ImmunoRegulator Beta',
    category: 'Immunology',
    mechanism: 'JAK1 / TYK2 Selective Allosteric Kinase',
    indication: 'Atopic Dermatitis & Systemic Lupus Erythematosus',
    currentPhase: 'Phase I',
    progress: 25,
    regulatory: 'IND Harmonized',
    leadInvestigator: 'Dr. Noah Meyer (Geneva Life Sciences)',
    cohortSize: '96 Volunteers (Dose-Escalation Cohorts)',
    primaryEndpoint: 'Pharmacokinetics, Bioavailability & Phospho-STAT Inhibition',
    trialId: 'NCT06387220',
    targetReceptor: 'Janus Kinase 1 / Tyrosine Kinase 2',
  },
  {
    id: 'mrg-904',
    code: 'MRG-904',
    name: 'NeuroProtect Enzyme Chaperone',
    category: 'Rare Diseases',
    mechanism: 'Blood-Brain Barrier Penetrating Lysosomal Chaperone',
    indication: 'Late-Onset Pompe Disease & MPS Type II',
    currentPhase: 'Phase II',
    progress: 50,
    regulatory: 'Orphan Drug Designation (FDA & EMA)',
    leadInvestigator: 'Dr. Elena Rostova (Cambridge Rare Disease Hub)',
    cohortSize: '88 Pediatric & Adult Patients',
    primaryEndpoint: '6-Minute Walk Distance (6MWD) & Glycogen Clearance',
    trialId: 'NCT05649012',
    targetReceptor: 'Acid Alpha-Glucosidase (GAA) Chaperone',
  },
  {
    id: 'mrg-801',
    code: 'MRG-801',
    name: 'PulmoVance Aerosol Surfactant',
    category: 'Rare Diseases',
    mechanism: 'Recombinant Synthetic Pulmonary Protein SP-B/C',
    indication: 'Idiopathic Pulmonary Fibrosis (IPF)',
    currentPhase: 'Commercial',
    progress: 100,
    regulatory: 'Global Approved (38 Countries)',
    leadInvestigator: 'Mirage Commercial Medical Affairs Group',
    cohortSize: 'Commercial Market Phase IV Surveillance',
    primaryEndpoint: 'Sustained Forced Vital Capacity (FVC) Preservation',
    trialId: 'NCT04423019',
    targetReceptor: 'Alveolar Type II Epithelial Matrix',
  },
];

const CATEGORIES = ['All', 'Oncology', 'Cardiology', 'Immunology', 'Rare Diseases'] as const;

export default function SciencePage() {
  const [activeCategory, setActiveCategory] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedMolecule, setSelectedMolecule] = React.useState<PipelineMolecule | null>(null);
  const [protocolDownloaded, setProtocolDownloaded] = React.useState<boolean>(false);

  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const lastActiveElementRef = React.useRef<HTMLElement | null>(null);

  // Manage drawer accessibility, keyboard escape, and scroll locking
  React.useEffect(() => {
    if (!selectedMolecule) {
      return undefined;
    }

    lastActiveElementRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    // Focus drawer close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMolecule(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      if (lastActiveElementRef.current) {
        lastActiveElementRef.current.focus();
      }
    };
  }, [selectedMolecule]);

  // Clean, sanitized filtering logic
  const filteredMolecules = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PIPELINE_DATA.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;

      return (
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.indication.toLowerCase().includes(query) ||
        item.mechanism.toLowerCase().includes(query) ||
        (item.targetReceptor && item.targetReceptor.toLowerCase().includes(query)) ||
        item.regulatory.toLowerCase().includes(query)
      );
    });
  }, [activeCategory, searchQuery]);

  const handleOpenDossier = (mol: PipelineMolecule) => {
    setProtocolDownloaded(false);
    setSelectedMolecule(mol);
  };

  const handleSimulatedProtocolDownload = () => {
    setProtocolDownloaded(true);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* =========================================================================
          TIER 8.1 — SCIENTIFIC PLATFORM HERO & MOLECULAR R&D SHOWCASE
      ========================================================================= */}
      <section
        aria-labelledby="science-hero"
        className="relative pt-14 pb-20 md:pt-18 md:pb-28 overflow-hidden telemetry-grid border-b border-slate-200/90 bg-white/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="glass" className="py-1 px-3">
                <StatusPip status="optimal" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-wider text-brand-navy uppercase">
                  Biopharmaceutical R&amp;D • GxP Pipeline
                </span>
              </Badge>
            </div>

            <h1
              id="science-hero"
              className="text-display-2xl font-extrabold text-brand-navy font-heading tracking-tight leading-[1.06]"
            >
              Precision Driven by <br />
              <span className="text-brand-primary">Molecular Ingenuity.</span>
            </h1>

            <p className="text-body-lg text-slate-700 font-sans leading-relaxed">
              Advancing targeted biologics and allosteric small molecules from computational crystal modeling through multi-center Phase III clinical investigations. Engineered to resolve refractory oncology, vascular disease, and autoimmune dysregulation with mathematical bio-precision.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button variant="primary" size="lg" asChild>
                <a href="#pipeline-matrix" className="flex items-center gap-2">
                  Explore Clinical Pipeline <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link href="/quality" className="flex items-center gap-2">
                  Inspect GxP Standards <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            {/* Fast Telemetry Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-border-subtle max-w-xl">
              <div>
                <div className="text-telemetry-lg font-bold text-brand-navy font-mono tabular-numbers">
                  24+
                </div>
                <div className="text-caption text-slate-700 font-semibold mt-0.5">
                  Investigational Assets
                </div>
              </div>
              <div>
                <div className="text-telemetry-lg font-bold text-brand-green font-mono tabular-numbers">
                  42
                </div>
                <div className="text-caption text-slate-700 font-semibold mt-0.5">
                  Global Clinical Centers
                </div>
              </div>
              <div>
                <div className="text-telemetry-lg font-bold text-brand-primary font-mono tabular-numbers">
                  100%
                </div>
                <div className="text-caption text-slate-700 font-semibold mt-0.5">
                  21 CFR Part 11 Validated
                </div>
              </div>
            </div>
          </div>

          {/* 3 R&D Platform Showcase Panels */}
          <div className="grid md:grid-cols-3 gap-6 pt-4">
            {/* Platform 1: Targeted Bio-Nanocarriers */}
            <Card variant="interactive" className="p-8 space-y-4 bg-white/90">
              <div className="p-3 w-fit rounded-xl bg-blue-50 text-brand-primary">
                <Microscope className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-wider text-brand-primary uppercase">
                  Platform 01
                </span>
                <h2 className="text-xl font-bold text-brand-navy font-heading">
                  Targeted Bio-Nanocarriers
                </h2>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                Engineered liposomal and polymer nanostructures calibrated for targeted membrane translocation. Delivers cytotoxic ADCs and peptide cargo directly into malignant cell receptors while protecting healthy peripheral somatic tissue.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-brand-primary">
                <span>8 Active ADC &amp; Peptide Programs</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </Card>

            {/* Platform 2: Cellular Longevity Shields */}
            <Card variant="interactive" className="p-8 space-y-4 bg-white/90">
              <div className="p-3 w-fit rounded-xl bg-emerald-50 text-brand-green">
                <Dna className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-wider text-brand-green uppercase">
                  Platform 02
                </span>
                <h2 className="text-xl font-bold text-brand-navy font-heading">
                  Cellular Longevity Shields
                </h2>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                Selective cytokine neutralization, telomeric protection, and mitochondrial NAD+ bio-energetic precursors that mitigate chronic cellular senescence and systemic immune inflammation across rare and metabolic pathologies.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                <span>6 Multi-Center Clinical Trials</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </Card>

            {/* Platform 3: High-Throughput Robotics */}
            <Card variant="interactive" className="p-8 space-y-4 bg-white/90">
              <div className="p-3 w-fit rounded-xl bg-slate-100 text-brand-navy">
                <Layers className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-wider text-brand-navy uppercase">
                  Platform 03
                </span>
                <h2 className="text-xl font-bold text-brand-navy font-heading">
                  High-Throughput Robotics
                </h2>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                Fully automated microfluidic synthesis and continuous HPLC purity verification running round-the-clock. Screen millions of conformational crystal states weekly to compress lead-optimization timelines from years to months.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-brand-navy">
                <span>GxP Cleanroom Automated Cell</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 8.2 — INTERACTIVE CLINICAL PIPELINE MATRIX (CORE FEATURE)
      ========================================================================= */}
      <section
        id="pipeline-matrix"
        aria-labelledby="matrix-heading"
        className="py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200/90"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header & Live Filter Area */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
                  Clinical Development Matrix
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 text-brand-navy">
                  Active Investigator View
                </span>
              </div>
              <h2
                id="matrix-heading"
                className="text-display-lg font-bold text-brand-navy font-heading tracking-tight"
              >
                Interactive Molecule Pipeline.
              </h2>
              <p className="text-sm text-slate-700 max-w-xl font-sans">
                Real-time tracking of investigational assets across discovery, clinical trials (Phases I–III), and commercial health authority approvals.
              </p>
            </div>

            {/* Quick Search with accessible label */}
            <div className="w-full lg:w-80 relative">
              <label htmlFor="pipeline-search-input" className="sr-only">
                Search molecule by code, name, mechanism, or indication
              </label>
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              <input
                id="pipeline-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search code, target, or indication…"
                className="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs bg-white border border-slate-300 text-brand-navy placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-transparent outline-none shadow-xs font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-800"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills with Accessible ARIA Selected */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Therapeutic pipeline filter">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              const count =
                cat === 'All'
                  ? PIPELINE_DATA.length
                  : PIPELINE_DATA.filter((m) => m.category === cat).length;

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                    isSelected
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-brand-navy'
                  }`}
                >
                  {cat}
                  <span className={`ms-1.5 font-mono text-[11px] ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Pipeline Table Card */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <caption className="sr-only">
                  Clinical trial pipeline table displaying molecule ID, target mechanism, indication, phase status, regulatory badge, and dossier link.
                </caption>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono uppercase text-[11px]">
                    <th scope="col" className="py-4 px-6 font-bold">Molecule ID</th>
                    <th scope="col" className="py-4 px-6 font-bold">Mechanism of Action</th>
                    <th scope="col" className="py-4 px-6 font-bold">Target Indication</th>
                    <th scope="col" className="py-4 px-6 font-bold min-w-[240px]">Phase Progress Visualizer</th>
                    <th scope="col" className="py-4 px-6 font-bold">Regulatory Status</th>
                    <th scope="col" className="py-4 px-6 font-bold text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMolecules.length > 0 ? (
                    filteredMolecules.map((mol) => (
                      <tr
                        key={mol.id}
                        tabIndex={0}
                        onClick={() => handleOpenDossier(mol)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenDossier(mol);
                          }
                        }}
                        aria-label={`Open clinical dossier for ${mol.code} ${mol.name}`}
                        className="hover:bg-blue-50/50 focus:bg-blue-50/70 focus:outline-none transition-colors cursor-pointer group"
                      >
                        {/* Molecule ID */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-sm text-brand-navy font-mono group-hover:text-brand-primary transition-colors">
                            {mol.code}
                          </div>
                          <div className="text-[11px] text-slate-700 font-medium mt-0.5">
                            {mol.name}
                          </div>
                          {mol.trialId && (
                            <span className="inline-block mt-1 text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                              {mol.trialId}
                            </span>
                          )}
                        </td>

                        {/* Mechanism */}
                        <td className="py-4 px-6">
                          <div className="text-slate-800 font-semibold">{mol.mechanism}</div>
                          {mol.targetReceptor && (
                            <div className="text-[11px] text-slate-600 font-mono mt-0.5">
                              Target: {mol.targetReceptor}
                            </div>
                          )}
                        </td>

                        {/* Indication */}
                        <td className="py-4 px-6">
                          <div className="text-slate-800 font-semibold">{mol.indication}</div>
                          <span className="inline-block mt-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-brand-navy">
                            {mol.category}
                          </span>
                        </td>

                        {/* Phase Progress Visualizer */}
                        <td className="py-4 px-6">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="font-bold text-brand-navy flex items-center gap-1.5">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    mol.progress === 100
                                      ? 'bg-brand-green'
                                      : mol.progress >= 75
                                      ? 'bg-brand-primary'
                                      : 'bg-brand-cyan'
                                  }`}
                                  aria-hidden="true"
                                />
                                {mol.currentPhase}
                              </span>
                              <span className="text-slate-700 font-bold">{mol.progress}% Complete</span>
                            </div>

                            {/* Accessible Progress Bar */}
                            <div
                              role="progressbar"
                              aria-valuenow={mol.progress}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`Trial progress for ${mol.code}: ${mol.progress}% (${mol.currentPhase})`}
                              className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex"
                            >
                              <div
                                style={{ width: `${mol.progress}%` }}
                                className={`h-full transition-all duration-500 ${
                                  mol.progress === 100
                                    ? 'bg-[#35AB38]'
                                    : mol.progress >= 75
                                    ? 'bg-[#2878BC]'
                                    : 'bg-[#308995]'
                                }`}
                              />
                            </div>

                            {/* 4-Phase Stage Visualizer Labels */}
                            <div className="grid grid-cols-4 text-[9px] font-mono text-center pt-0.5 text-slate-600 font-semibold">
                              <span className={mol.progress >= 25 ? 'text-brand-navy font-bold' : ''}>Phase I</span>
                              <span className={mol.progress >= 50 ? 'text-brand-navy font-bold' : ''}>Phase II</span>
                              <span className={mol.progress >= 75 ? 'text-brand-navy font-bold' : ''}>Phase III</span>
                              <span className={mol.progress === 100 ? 'text-brand-green font-bold' : ''}>Launch</span>
                            </div>
                          </div>
                        </td>

                        {/* Regulatory Designation */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                            {mol.regulatory}
                          </span>
                        </td>

                        {/* Dossier Action Link */}
                        <td className="py-4 px-6 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDossier(mol);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-brand-navy group-hover:translate-x-1 transition-transform p-1 rounded outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                          >
                            <span>Dossier</span>
                            <ChevronRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-700">
                        <div className="max-w-md mx-auto space-y-2">
                          <p className="font-semibold text-brand-navy text-sm">
                            No clinical molecules found matching &ldquo;{searchQuery}&rdquo;.
                          </p>
                          <p className="text-xs text-slate-600">
                            Try adjusting your search criteria or resetting category filters.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSearchQuery('');
                              setActiveCategory('All');
                            }}
                          >
                            Reset Filters
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 8.3 — MOLECULE CLINICAL DOSSIER SLIDE-OVER DRAWER
      ========================================================================= */}
      {selectedMolecule && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-title"
          aria-describedby="dossier-desc"
          className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedMolecule(null)}
        >
          <div
            className="w-full max-w-xl bg-white h-full shadow-2xl p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Drawer Top Navigation & Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-blue-100 text-brand-navy">
                      CLINICAL DOSSIER • {selectedMolecule.category.toUpperCase()}
                    </span>
                    {selectedMolecule.trialId && (
                      <span className="text-[11px] font-mono text-slate-700 font-semibold">
                        {selectedMolecule.trialId}
                      </span>
                    )}
                  </div>
                  <h3 id="dossier-title" className="text-2xl font-bold text-brand-navy pt-2 font-heading">
                    {selectedMolecule.code} — {selectedMolecule.name}
                  </h3>
                  <p id="dossier-desc" className="text-xs text-slate-700 font-sans">
                    Comprehensive investigator monograph and clinical study telemetry.
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  onClick={() => setSelectedMolecule(null)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer transition-colors"
                  aria-label="Close dossier slide-over"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Status Header Progress Block */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-700 font-bold">ACTIVE CLINICAL STAGE</span>
                  <span className="font-extrabold text-brand-navy">{selectedMolecule.currentPhase}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    style={{ width: `${selectedMolecule.progress}%` }}
                    className="h-full bg-brand-primary"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-700 font-semibold">Regulatory Designation:</span>
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                    {selectedMolecule.regulatory}
                  </span>
                </div>
              </div>

              {/* Deep Clinical Study Information */}
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="font-mono text-slate-700 font-bold uppercase text-[10px]">
                    Target Indication
                  </span>
                  <p className="font-bold text-brand-navy text-sm">
                    {selectedMolecule.indication}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-slate-700 font-bold uppercase text-[10px]">
                    Mechanism of Action (MoA)
                  </span>
                  <p className="text-slate-800 leading-relaxed font-sans">
                    {selectedMolecule.mechanism}
                  </p>
                </div>

                {selectedMolecule.targetReceptor && (
                  <div className="space-y-1">
                    <span className="font-mono text-slate-700 font-bold uppercase text-[10px]">
                      Receptor Target / Binding Affinity
                    </span>
                    <p className="text-slate-800 font-mono">
                      {selectedMolecule.targetReceptor}
                    </p>
                  </div>
                )}

                <div className="space-y-1">
                  <span className="font-mono text-slate-700 font-bold uppercase text-[10px]">
                    Primary Clinical Endpoint
                  </span>
                  <p className="text-slate-800 leading-relaxed font-mono bg-blue-50/60 p-2.5 rounded-lg border border-blue-200">
                    {selectedMolecule.primaryEndpoint}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1">
                    <span className="font-mono text-slate-700 text-[10px] font-bold">COHORT ENROLLMENT</span>
                    <p className="font-bold text-brand-navy text-xs">{selectedMolecule.cohortSize}</p>
                  </div>
                  <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1">
                    <span className="font-mono text-slate-700 text-[10px] font-bold">LEAD INVESTIGATOR</span>
                    <p className="font-bold text-brand-navy text-xs">{selectedMolecule.leadInvestigator}</p>
                  </div>
                </div>
              </div>

              {/* Medical Notice & Regulatory Disclaimers (Strict Compliance) */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs leading-relaxed space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
                  <span>Investigational Medical Information Notice</span>
                </div>
                <p className="font-sans text-[11px] text-amber-900">
                  Information contained in this scientific dossier is intended solely for clinical investigators, accredited healthcare practitioners, and health authority review. Safety, pharmacokinetics, and efficacy endpoints remain under active evaluation and have not been approved as medical claims.
                </p>
              </div>

              {/* Download Feedback State */}
              {protocolDownloaded && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                  <span>Investigator Brochure for {selectedMolecule.code} downloaded successfully.</span>
                </div>
              )}
            </div>

            {/* Bottom Actions Suite */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedMolecule(null)}
                className="w-full sm:w-auto"
              >
                Close Dossier
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={handleSimulatedProtocolDownload}
                  className="flex items-center gap-1.5 text-xs w-full sm:w-auto"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  Protocol Brochure
                </Button>
                <Button variant="primary" size="sm" asChild className="w-full sm:w-auto">
                  <Link href="/hcp-portal" className="flex items-center gap-1.5 text-xs">
                    Investigator Access <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
