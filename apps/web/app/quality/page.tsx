'use client';

import * as React from 'react';
import Link from 'next/link';
import { Badge, Button, Card, StatusPip } from '@mirage/ui';
import {
  ShieldCheck,
  Thermometer,
  Leaf,
  FileCheck2,
  CheckCircle2,
  Download,
  AlertCircle,
  ChevronRight,
  Activity,
  Layers,
  Recycle,
  HeartHandshake,
  Radio,
  Sparkles,
} from 'lucide-react';

// ============================================================================
// DATA STRUCTURES & ACCREDITATIONS DATA
// ============================================================================

interface Accreditation {
  id: string;
  name: string;
  title: string;
  issuer: string;
  certificateId: string;
  scope: string;
  status: 'active' | 'verified';
  auditCycle: string;
}

const REGULATORY_MATRIX: Accreditation[] = [
  {
    id: 'who-gmp',
    name: 'WHO GMP',
    title: 'Good Manufacturing Practices for Pharmaceutical Products',
    issuer: 'World Health Organization (WHO Prequalification Team)',
    certificateId: 'WHO-GMP-EGY-2023-8819',
    scope: 'Sterile Injectables, Lyophilized Vials, Biologicals & Oral Solids',
    status: 'verified',
    auditCycle: 'Annual Re-inspection (Valid thru Q4 2027)',
  },
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015',
    title: 'Quality Management Systems (QMS)',
    issuer: 'TÜV Rheinland Group / UKAS Accredited',
    certificateId: '01 100 2198044 / TR',
    scope: 'Pharmaceutical Formulation, Packaging, Batch Release & Distribution',
    status: 'active',
    auditCycle: 'Triennial Certification (Valid thru Q2 2026)',
  },
  {
    id: 'iso-13485',
    name: 'ISO 13485:2016',
    title: 'Medical Devices — Quality Management Systems for Regulatory Purposes',
    issuer: 'BSI Assurance Services Ltd.',
    certificateId: 'MD 741029-BSI-EU',
    scope: 'Prefilled Syringe Delivery Systems & Combination Biological Drug Delivery',
    status: 'verified',
    auditCycle: 'Surveillance Audit Complete (Valid thru Q1 2027)',
  },
  {
    id: 'fda-part-11',
    name: 'FDA 21 CFR Part 11',
    title: 'Electronic Records & Electronic Signatures Compliance',
    issuer: 'US FDA Guidance Harmonized / Independent Third-Party Validation',
    certificateId: 'FDA-CFR11-VAL-2024-004',
    scope: 'Enterprise LIMS, Electronic Batch Records (EBR), and Telemetry Logging',
    status: 'verified',
    auditCycle: 'Continuous Automated Audit Trail Integrity',
  },
  {
    id: 'ema-gxp',
    name: 'EMA GxP Harmonized',
    title: 'European Medicines Agency Good Practice Guidelines (GMP / GDP / GLP)',
    issuer: 'EU Qualified Person (QP) Declaration & Swissmedic Mutual Recognition',
    certificateId: 'EMA-EudraGMDP-90812-CH',
    scope: 'Sterile Biomanufacturing, Cold-Chain Distribution & Toxicological Testing',
    status: 'active',
    auditCycle: 'Harmonized QP Declaration on File',
  },
];

// Thermal Regimes for Cold-Chain Telemetry Simulator
interface ThermalRegime {
  id: string;
  name: string;
  range: string;
  minTemp: number;
  maxTemp: number;
  currentSimulated: number;
  idealTemp: number;
  unit: string;
  category: string;
  assetsProtected: string[];
  monitoringStatus: 'optimal' | 'nominal';
  sensorWaypoints: { name: string; location: string; status: string; temp: string }[];
}

const THERMAL_REGIMES: ThermalRegime[] = [
  {
    id: 'cryo',
    name: 'Deep Cryogenic Storage',
    range: '-80°C to -20°C',
    minTemp: -85,
    maxTemp: -20,
    idealTemp: -78.4,
    currentSimulated: -78.2,
    unit: '°C',
    category: 'mRNA Platforms & Cellular Biologicals',
    assetsProtected: ['MP-101 mRNA Oncology', 'MP-204 Viral Vectors', 'Cell Master Banks'],
    monitoringStatus: 'optimal',
    sensorWaypoints: [
      { name: 'Ultra-Low Cryo Suite Alpha', location: 'Basel Bio-Hub (CH)', status: 'Optimal', temp: '-78.2°C' },
      { name: 'LN2 Mobile Cryo-Shipper #04', location: 'Trans-Alpine Corridor', status: 'Optimal', temp: '-79.1°C' },
      { name: 'Cryo Storage Node 2', location: 'Boston Clinical Depot', status: 'Optimal', temp: '-77.8°C' },
    ],
  },
  {
    id: 'cold-chain',
    name: 'Standard Cold-Chain Regime',
    range: '+2°C to +8°C',
    minTemp: 2,
    maxTemp: 8,
    idealTemp: 4.8,
    currentSimulated: 4.6,
    unit: '°C',
    category: 'Monoclonal Antibodies & Synthetic Peptides',
    assetsProtected: ['MP-302 GLP-1 Analogues', 'MP-411 Oncology mAbs', 'Sterile Vaccines'],
    monitoringStatus: 'optimal',
    sensorWaypoints: [
      { name: 'Aseptic Cold-Vault B3', location: 'Cairo Sterile Plant', status: 'Optimal', temp: '+4.6°C' },
      { name: 'IoT Freight Pod #881', location: 'Frankfurt Air Freight', status: 'Optimal', temp: '+4.8°C' },
      { name: 'Regional Hub Refrigerator 1', location: 'Dubai Logistics Hub', status: 'Optimal', temp: '+4.2°C' },
    ],
  },
  {
    id: 'ambient',
    name: 'Controlled Ambient Storage',
    range: '+15°C to +25°C',
    minTemp: 15,
    maxTemp: 25,
    idealTemp: 21.0,
    currentSimulated: 20.8,
    unit: '°C',
    category: 'Targeted Small Molecules & Lyophilized Finished Doses',
    assetsProtected: ['MP-501 Solid Oral Kinase Inhibitors', 'MP-602 Inhalation Powders'],
    monitoringStatus: 'optimal',
    sensorWaypoints: [
      { name: 'Automated High-Bay Warehouse', location: 'Cairo Central Depot', status: 'Optimal', temp: '+20.8°C' },
      { name: 'Climate-Controlled Van #12', location: 'Munich Distribution', status: 'Optimal', temp: '+21.2°C' },
      { name: 'Quarantine Staging Area', location: 'Basel Transit Point', status: 'Optimal', temp: '+20.4°C' },
    ],
  },
];

const ESG_PANELS = [
  {
    id: 'packaging',
    title: 'Biodegradable Clinical Packaging',
    metric: '84%',
    metricLabel: 'Reduction in Virgin Plastic by 2026',
    description:
      'Replacing single-use PVC blisters and non-recyclable foil laminates with biodegradable polylactic acid (PLA) matrixes and FSC-certified unbleached medical board.',
    icon: Recycle,
    initiatives: [
      'Phase-out of fluoropolymer thermoform films',
      'Water-based solvent-free vegetable inks for 100% of cartons',
      'Tamper-evident fiber locks eliminating micro-plastic security seals',
    ],
  },
  {
    id: 'manufacturing',
    title: 'Net-Zero Bio-Manufacturing Suites',
    metric: '100%',
    metricLabel: 'Renewable Power Across Primary Cleanrooms',
    description:
      'Our primary manufacturing campus integrates rooftop solar PV arrays, geothermal cooling loops, and high-efficiency water-for-injection (WFI) vapor compression recovery systems.',
    icon: Leaf,
    initiatives: [
      'ISO 14001 Environmental Management Systems verified',
      '92% closed-loop process water recycling within production cycles',
      'Zero-landfill waste diverted through certified bio-digestion partners',
    ],
  },
  {
    id: 'patient-access',
    title: 'Global Compassionate Patient Access',
    metric: '14,200+',
    metricLabel: 'Patients Supported via Compassionate Care',
    description:
      'Through non-profit clinical partnerships and tiered regional pricing, we guarantee that life-preserving therapies reach vulnerable patient demographics regardless of geographic or financial barriers.',
    icon: HeartHandshake,
    initiatives: [
      'Named Patient Program (NPP) across 18 underserved nations',
      'Subsidized oncology medication access in partnership with regional NGOs',
      'Zero-cost humanitarian clinical trial compassionate extensions',
    ],
  },
] as const;

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function QualityPage() {
  const [selectedRegimeId, setSelectedRegimeId] = React.useState<string>('cold-chain');
  const [simulatedAdjustment, setSimulatedAdjustment] = React.useState<number>(0);

  const activeRegime =
    THERMAL_REGIMES.find((r) => r.id === selectedRegimeId) ?? THERMAL_REGIMES[1]!;

  const displayTemperature = (activeRegime.currentSimulated + simulatedAdjustment).toFixed(1);

  const isExcursion =
    Number(displayTemperature) < activeRegime.minTemp ||
    Number(displayTemperature) > activeRegime.maxTemp;

  return (
    <div className="flex-1 flex flex-col w-full overflow-hidden">
      {/* =========================================================================
          TIER 11.1 — HERO & REGULATORY MATRIX HEADER
      ========================================================================= */}
      <section
        aria-labelledby="quality-hero-heading"
        className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-brand-border-subtle bg-gradient-to-b from-brand-surface via-white to-brand-surface/40 telemetry-grid"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="glass" className="py-1 px-3">
                <StatusPip status="optimal" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-wider text-brand-navy uppercase">
                  Quality Assurance • Section 05
                </span>
              </Badge>
              <Badge variant="vitality" size="sm">
                WHO GMP &amp; FDA 21 CFR 11
              </Badge>
            </div>

            <h1
              id="quality-hero-heading"
              className="text-display-xl md:text-display-2xl font-extrabold text-brand-navy font-heading tracking-tight leading-[1.08]"
            >
              Uncompromising Quality, <br />
              <span className="text-brand-primary">Cold-Chain Telemetry</span> &amp; ESG.
            </h1>

            <p className="text-body-lg text-slate-700 font-sans leading-relaxed">
              Every vial, ampoule, and blister leaving Mirage Pharma facilities embodies strict
              analytical compliance. From automated cleanroom robotics to real-time IoT thermal
              telemetry and net-zero biomanufacturing, we redefine pharmaceutical integrity.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Button variant="primary" size="lg" asChild>
                <a href="#cold-chain-simulator" className="flex items-center gap-2">
                  Launch Telemetry Simulator <Thermometer className="w-4 h-4" aria-hidden="true" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#regulatory-accreditations" className="flex items-center gap-2">
                  View Accreditations Matrix <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-brand-border-subtle">
            <div>
              <div className="text-telemetry-lg font-bold text-brand-navy font-mono">0.00%</div>
              <div className="text-caption text-slate-600 font-medium mt-1">Thermal Excursion Rate</div>
            </div>
            <div>
              <div className="text-telemetry-lg font-bold text-brand-green font-mono">100%</div>
              <div className="text-caption text-slate-600 font-medium mt-1">Batch Traceability (2D Matrix)</div>
            </div>
            <div>
              <div className="text-telemetry-lg font-bold text-brand-primary font-mono">5 Major</div>
              <div className="text-caption text-slate-600 font-medium mt-1">Global Accreditations</div>
            </div>
            <div>
              <div className="text-telemetry-lg font-bold text-brand-cyan font-mono">ISO 14001</div>
              <div className="text-caption text-slate-600 font-medium mt-1">Environmental Certification</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 11.1 (CONT.) — REGULATORY ACCREDITATIONS MATRIX
      ========================================================================= */}
      <section
        id="regulatory-accreditations"
        aria-labelledby="accreditations-heading"
        className="py-20 md:py-28 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-primary" aria-hidden="true" />
              <span className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
                Audited &amp; Harmonized Standards
              </span>
            </div>
            <h2
              id="accreditations-heading"
              className="text-display-md md:text-display-lg font-bold text-brand-navy font-heading tracking-tight"
            >
              Quality Standards &amp; Regulatory Accreditations Matrix
            </h2>
            <p className="text-body-md text-slate-600">
              Mirage Pharma adheres to the most stringent international regulatory authorities,
              ensuring every batch meets reproducible analytical benchmarks and global safety criteria.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGULATORY_MATRIX.map((item) => (
              <Card
                key={item.id}
                variant="solid"
                className="p-6 md:p-8 flex flex-col justify-between border-slate-200 hover:border-brand-primary/50 hover:shadow-lg transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-caption font-mono uppercase tracking-widest font-bold text-brand-primary">
                      {item.name}
                    </span>
                    <Badge variant="vitality" size="sm" className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                      {item.status === 'verified' ? 'Audited & Validated' : 'Active Compliance'}
                    </Badge>
                  </div>

                  <h3 className="text-title-md font-bold text-brand-navy font-heading leading-tight">
                    {item.title}
                  </h3>

                  <div className="space-y-2 text-caption">
                    <div>
                      <span className="text-slate-500 block font-mono">Issuing Authority:</span>
                      <span className="text-slate-800 font-semibold">{item.issuer}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-mono">Certificate Identifier:</span>
                      <span className="text-brand-navy font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-xs">
                        {item.certificateId}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-mono">Validated Scope:</span>
                      <span className="text-slate-700 leading-snug">{item.scope}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Audit Cycle:</span>
                  <span className="font-medium text-brand-green">{item.auditCycle}</span>
                </div>
              </Card>
            ))}

            {/* Extra High-Tech Assurance Summary Card */}
            <Card
              variant="obsidian"
              className="p-6 md:p-8 flex flex-col justify-between border-white/10"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-cyan">
                  <Layers className="w-5 h-5" aria-hidden="true" />
                  <span className="text-caption font-mono uppercase tracking-widest font-bold">
                    Electronic Batch Records
                  </span>
                </div>

                <h3 className="text-title-md font-bold text-white font-heading">
                  100% Digitized GxP Audit Trails
                </h3>

                <p className="text-body-sm text-slate-300 leading-relaxed">
                  Every formulation, cleanroom pressure differential, autoclave sterilization cycle,
                  and QC spectral test is cryptographically locked in our FDA 21 CFR Part 11 compliant system.
                </p>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Cryptographic Hash:</span>
                    <span className="text-brand-cyan">SHA-256 Validated</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Audit Trail Log:</span>
                    <span className="text-brand-green">Zero-Alteration Enforced</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 text-[11px] font-mono text-slate-400">
                Independent QP Release Authorization
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 11.2 — REAL-TIME COLD-CHAIN TELEMETRY VISUALIZER
      ========================================================================= */}
      <section
        id="cold-chain-simulator"
        aria-labelledby="cold-chain-heading"
        className="py-20 md:py-28 bg-brand-surface/60 border-t border-b border-brand-border-subtle telemetry-grid"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-brand-primary animate-pulse" aria-hidden="true" />
                <span className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
                  Interactive Telemetry Demonstration
                </span>
              </div>
              <h2
                id="cold-chain-heading"
                className="text-display-md md:text-display-lg font-bold text-brand-navy font-heading tracking-tight"
              >
                Real-Time Cold-Chain Telemetry Simulator
              </h2>
              <p className="text-body-md text-slate-600">
                Explore our three biological storage regimes. Adjust simulated temperature variables to
                witness multi-sensor waypoint tracking, IoT excursion prevention, and continuous telemetry.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="glass" size="md">
                <StatusPip status="optimal" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold text-brand-navy">
                  Telemetry Engine Active
                </span>
              </Badge>
            </div>
          </div>

          {/* Thermal Regime Selector Tabs */}
          <div className="flex flex-wrap gap-3">
            {THERMAL_REGIMES.map((regime) => {
              const isSelected = regime.id === selectedRegimeId;
              return (
                <button
                  key={regime.id}
                  onClick={() => {
                    setSelectedRegimeId(regime.id);
                    setSimulatedAdjustment(0);
                  }}
                  className={`px-5 py-3 rounded-xl font-mono text-sm font-semibold transition-all flex items-center gap-3 border ${
                    isSelected
                      ? 'bg-brand-navy text-white border-brand-navy shadow-md ring-2 ring-brand-primary/20'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <Thermometer className="w-4 h-4" aria-hidden="true" />
                  <span>{regime.name}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      isSelected ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {regime.range}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Simulator Cockpit */}
          <Card
            variant="glass"
            className="p-8 md:p-10 border-slate-200/90 bg-white/90 shadow-xl space-y-8"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Telemetry Gauge Display */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-inner">
                <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-xs text-slate-400">
                  <Activity className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>LIVE SENSOR FEED</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      isExcursion ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {isExcursion ? 'Excursion Alert' : 'Nominal Safe Zone'}
                  </span>
                </div>

                <div className="my-6 text-center">
                  <div
                    className={`text-6xl md:text-7xl font-extrabold font-mono tracking-tight tabular-numbers ${
                      isExcursion ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
                    }`}
                  >
                    {displayTemperature}
                    <span className="text-3xl text-slate-400 ml-1">{activeRegime.unit}</span>
                  </div>
                  <div className="text-caption font-mono text-slate-400 mt-2">
                    Target Setpoint: {activeRegime.idealTemp}
                    {activeRegime.unit} • Threshold Range: {activeRegime.range}
                  </div>
                </div>

                <div className="w-full pt-4 border-t border-slate-800 text-center">
                  <div className="text-[11px] font-mono text-slate-400">
                    Category: <span className="text-white font-medium">{activeRegime.category}</span>
                  </div>
                </div>
              </div>

              {/* Controls & Waypoint Tracking */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-title-lg font-bold text-brand-navy font-heading">
                    {activeRegime.name} Management
                  </h3>
                  <p className="text-body-sm text-slate-600 mt-1">
                    Continuous monitoring verified every 15 seconds across automated GPS-tagged transit nodes.
                  </p>
                </div>

                {/* Simulated Temperature Variance Slider */}
                <div className="p-4 rounded-xl bg-brand-surface border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center text-caption font-mono font-semibold text-slate-700">
                    <label htmlFor="temp-slider">Simulate Temperature Variance (Stress Test):</label>
                    <span className="text-brand-primary">
                      {simulatedAdjustment > 0 ? `+${simulatedAdjustment}` : simulatedAdjustment}°C
                    </span>
                  </div>
                  <input
                    id="temp-slider"
                    type="range"
                    min="-10"
                    max="10"
                    step="0.5"
                    value={simulatedAdjustment}
                    onChange={(e) => setSimulatedAdjustment(parseFloat(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>-10°C Simulated Deficit</span>
                    <button
                      onClick={() => setSimulatedAdjustment(0)}
                      className="text-brand-primary hover:underline font-bold"
                    >
                      Reset to Calibrated
                    </button>
                    <span>+10°C Simulated Surge</span>
                  </div>
                </div>

                {/* Excursion Warning Notification if out of bounds */}
                {isExcursion && (
                  <div
                    className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-body-sm"
                    role="alert"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="font-semibold">Thermal Excursion Triggered:</strong> Immediate
                      fail-safe active. Secondary liquid nitrogen / thermoelectric cooling pumps initiated;
                      telemetry dispatched to Global Quality Assurance and QP on call.
                    </div>
                  </div>
                )}

                {/* Multi-Sensor Waypoints */}
                <div className="space-y-3">
                  <h4 className="text-caption uppercase tracking-wider font-mono font-bold text-slate-500">
                    Live Active Telemetry Waypoints
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {activeRegime.sensorWaypoints.map((wp) => (
                      <div
                        key={wp.name}
                        className="p-3 rounded-lg bg-white border border-slate-200 shadow-sm space-y-1"
                      >
                        <div className="text-[11px] font-bold text-brand-navy truncate">
                          {wp.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{wp.location}</div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] font-mono text-emerald-600 font-semibold">
                            {wp.status}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-brand-navy">
                            {wp.temp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Protected Assets List */}
                <div className="pt-2">
                  <div className="text-caption font-mono text-slate-500 mb-1.5">
                    Protected Clinical Assets:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeRegime.assetsProtected.map((asset) => (
                      <Badge key={asset} variant="outline" size="sm" className="font-mono">
                        {asset}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================================
          TIER 11.3 — ESG SUSTAINABILITY & PATIENT ACCESS
      ========================================================================= */}
      <section
        aria-labelledby="esg-heading"
        className="py-20 md:py-28 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2">
              <Leaf className="w-4 h-4 text-brand-green" aria-hidden="true" />
              <span className="font-mono text-xs font-bold tracking-widest text-brand-green uppercase">
                Environmental, Social &amp; Governance
              </span>
            </div>
            <h2
              id="esg-heading"
              className="text-display-md md:text-display-lg font-bold text-brand-navy font-heading tracking-tight"
            >
              ESG Sustainability &amp; Compassionate Patient Access
            </h2>
            <p className="text-body-md text-slate-600">
              True pharmaceutical leadership requires stewardship of our planet and universal empathy
              for the vulnerable. Discover our triple-pillar sustainability roadmap.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ESG_PANELS.map((panel) => {
              const Icon = panel.icon;
              return (
                <Card
                  key={panel.id}
                  variant="solid"
                  className="p-8 flex flex-col justify-between border-slate-200 hover:border-brand-green/40 hover:shadow-lg transition-all"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-brand-green/10 text-brand-green">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <Badge variant="vitality" size="sm">
                        ESG Pillar
                      </Badge>
                    </div>

                    <div>
                      <div className="text-telemetry-xl font-extrabold text-brand-navy font-mono">
                        {panel.metric}
                      </div>
                      <div className="text-caption font-mono text-slate-500 font-semibold mt-0.5">
                        {panel.metricLabel}
                      </div>
                      <h3 className="text-title-lg font-bold text-brand-navy font-heading mt-3">
                        {panel.title}
                      </h3>
                    </div>

                    <p className="text-body-sm text-slate-600 leading-relaxed">
                      {panel.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-[11px] uppercase tracking-wider font-mono font-bold text-slate-400">
                        Operational Commitments:
                      </h4>
                      <ul className="space-y-1.5 text-body-sm text-slate-700">
                        {panel.initiatives.map((init, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2
                              className="w-4 h-4 text-brand-green shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span className="text-caption">{init}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">Governance Scope</span>
                    <span className="text-caption font-bold text-brand-navy font-mono">
                      UN SDG Aligned
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Downloadable ESG Dossier Banner */}
          <Card
            variant="glass"
            className="p-8 md:p-12 border-slate-200/90 bg-gradient-to-r from-brand-surface via-white to-brand-green/5 shadow-md"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-brand-green font-mono text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>Annual Transparency Disclosure</span>
                </div>
                <h3 className="text-title-xl font-bold text-brand-navy font-heading">
                  Mirage Pharma 2025/2026 ESG &amp; Sustainability Dossier
                </h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">
                  Download our complete 78-page audited sustainability report detailing Scope 1–3 emissions,
                  cold-chain lifecycle analysis, bio-waste diversion indices, and our compassionate access ledger.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <Button variant="vitality" size="lg" asChild>
                  <a
                    href="#download-dossier"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Mirage Pharma ESG Dossier 2025/2026 — Verified PDF download initiated.');
                    }}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Download ESG Dossier (PDF • 4.8 MB)
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about" className="flex items-center gap-2">
                    Learn About Our Mission <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
