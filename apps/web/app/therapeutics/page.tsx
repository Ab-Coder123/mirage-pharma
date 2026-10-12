'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, Badge, Card, StatusPip } from '@mirage/ui';
import type { CommercialProduct } from '@mirage/types';
import {
  Search,
  Dna,
  Heart,
  ShieldCheck,
  Sparkles,
  Download,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  FileText,
  ThermometerSnowflake,
  QrCode,
  X,
  Clock,
  MapPin,
  BatteryCharging,
} from 'lucide-react';

const PRODUCTS_DATA: CommercialProduct[] = [
  {
    id: 'prod-01',
    name: 'Zulatinib®',
    genericName: 'Zulatinib Besylate Oral Capsules',
    category: 'Oncology',
    atcCode: 'L01EX22',
    type: 'Rx',
    dosage: '100mg / 150mg Hard Capsules',
    storageCondition: 'Controlled Room Temp',
    description: 'Third-generation targeted tyrosine kinase inhibitor indicated for advanced EGFR-mutated non-small cell lung cancer with proven central nervous system penetrance.',
    smpcFileName: 'Zulatinib_SmPC_Summary_2026.pdf',
    packSize: '30 Hard Capsules (Blister)',
    gtin: '07640182390142',
  },
  {
    id: 'prod-02',
    name: 'Miravex® ADC',
    genericName: 'Miravex Emtansine for Injection',
    category: 'Oncology',
    atcCode: 'L01FD05',
    type: 'Rx',
    dosage: '160mg Lyophilized Powder for IV Infusion',
    storageCondition: '+2°C to +8°C Cold-Chain',
    description: 'Humanized monoclonal antibody-drug conjugate delivering high-potency antineoplastic payload directly into HER2-positive metastatic breast carcinomas.',
    smpcFileName: 'Miravex_Prescribing_Information.pdf',
    packSize: '1 Single-Dose Vial (Type I Glass)',
    gtin: '07640182390210',
  },
  {
    id: 'prod-03',
    name: 'CardioStab® Dual',
    genericName: 'Evolocumab / Atorvastatin Fixed Combination',
    category: 'Cardiology',
    atcCode: 'C10BA08',
    type: 'Rx',
    dosage: '140mg/10mg Prefilled Auto-Injector',
    storageCondition: '+2°C to +8°C Cold-Chain',
    description: 'Monoclonal antibody and statin fixed-dose combination providing sustained LDL-C reduction for high-risk atherosclerotic cardiovascular patients.',
    smpcFileName: 'CardioStab_SmPC_Leaflet.pdf',
    packSize: '2 Prefilled Auto-Injectors (1mL each)',
    gtin: '07640182390357',
  },
  {
    id: 'prod-04',
    name: 'VasoTens® Pro',
    genericName: 'Telmisartan / Amlodipine Triple Matrix',
    category: 'Cardiology',
    atcCode: 'C09DB04',
    type: 'Rx',
    dosage: '80mg / 5mg / 12.5mg Film-Coated Tablets',
    storageCondition: 'Controlled Room Temp',
    description: 'Triple-action antihypertensive formulation providing 24-hour sustained hemodynamic stabilization and endothelial cardioprotection.',
    smpcFileName: 'VasoTens_Package_Insert.pdf',
    packSize: '28 Film-Coated Tablets',
    gtin: '07640182390487',
  },
  {
    id: 'prod-05',
    name: 'ImmunoShield®',
    genericName: 'Miratuzumab Concentrated Solution',
    category: 'Immunology',
    atcCode: 'L04AC18',
    type: 'Rx',
    dosage: '120mg/mL Solution for Subcutaneous Injection',
    storageCondition: '+2°C to +8°C Cold-Chain',
    description: 'Interleukin-23 receptor antagonist restoring immune balance and mucosal integrity in severe plaque psoriasis and active Crohn’s disease.',
    smpcFileName: 'ImmunoShield_Clinician_SmPC.pdf',
    packSize: '1 Prefilled Syringe with Needle Guard',
    gtin: '07640182390593',
  },
  {
    id: 'prod-06',
    name: 'VitalCell® Longevity',
    genericName: 'Cellular CoEnzyme Q10 + NAD+ Precursor Complex',
    category: 'Preventative Longevity',
    atcCode: 'A11JC01',
    type: 'OTC',
    dosage: '300mg Sustained-Release Softgels',
    storageCondition: 'Controlled Room Temp',
    description: 'Bio-optimized mitochondrial cofactor formulation stimulating cellular ATP synthesis, telomere resilience, and oxidative homeostasis.',
    smpcFileName: 'VitalCell_Consumer_Information.pdf',
    packSize: '60 Sustained-Release Softgels',
    gtin: '07640182390623',
  },
  {
    id: 'prod-07',
    name: 'Glucorid® XR',
    genericName: 'Metformin / Sitagliptin Extended Release',
    category: 'Preventative Longevity',
    atcCode: 'A10BD07',
    type: 'Rx',
    dosage: '1000mg / 50mg Dual-Layer Tablets',
    storageCondition: 'Controlled Room Temp',
    description: 'Extended-release metabolic regulator providing dual glycemic control without risk of hypoglycemic excursion or gastrointestinal intolerance.',
    smpcFileName: 'Glucorid_XR_Physician_Dossier.pdf',
    packSize: '56 Dual-Layer Extended-Release Tablets',
    gtin: '07640182390739',
  },
  {
    id: 'prod-08',
    name: 'NeuroVance® Cryo',
    genericName: 'Alglucosidase Recombinant Injectable',
    category: 'Preventative Longevity',
    atcCode: 'A16AB07',
    type: 'Rx',
    dosage: '50mg Lyophilized Bio-Reagent',
    storageCondition: '-80°C Cryo',
    description: 'Enzyme replacement biologic maintaining continuous cellular glycogen clearance in lysosomal storage disorders under deep cryo preservation.',
    smpcFileName: 'NeuroVance_SmPC_Documentation.pdf',
    packSize: '1 Lyophilized Cryo-Vial',
    gtin: '07640182390883',
  },
];

const CATEGORIES = [
  'All',
  'Oncology',
  'Cardiology',
  'Immunology',
  'Preventative Longevity',
] as const;

export default function TherapeuticsPage() {
  const [activeCategory, setActiveCategory] = React.useState<string>('All');
  const [activeType, setActiveType] = React.useState<'All' | 'Rx' | 'OTC'>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // SmPC Modal state
  const [activeSmPcProduct, setActiveSmPcProduct] = React.useState<CommercialProduct | null>(null);
  const [downloadSuccess, setDownloadSuccess] = React.useState<boolean>(false);

  // Serialization interactive state
  const [selectedSerializedProduct, setSelectedSerializedProduct] = React.useState<CommercialProduct>(
    PRODUCTS_DATA[0]!
  );

  // Telemetry tracker interactive state
  const [activeTempTier, setActiveTempTier] = React.useState<'-80' | '2-8' | '15-25'>('2-8');

  // Close SmPC modal with Escape and trap focus
  const closeSmPcButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const lastTriggerButtonRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!activeSmPcProduct) {
      return undefined;
    }

    lastTriggerButtonRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      closeSmPcButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSmPcProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      if (lastTriggerButtonRef.current) {
        lastTriggerButtonRef.current.focus();
      }
    };
  }, [activeSmPcProduct]);

  // Filtered products list
  const filteredProducts = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PRODUCTS_DATA.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesType = activeType === 'All' || p.type === activeType;
      if (!matchesCategory || !matchesType) return false;

      if (!query) return true;
      return (
        p.name.toLowerCase().includes(query) ||
        p.genericName.toLowerCase().includes(query) ||
        p.atcCode.toLowerCase().includes(query) ||
        p.dosage.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    });
  }, [activeCategory, activeType, searchQuery]);

  const handleOpenSmPc = (prod: CommercialProduct) => {
    setDownloadSuccess(false);
    setActiveSmPcProduct(prod);
  };

  const handleTriggerDownload = () => {
    setDownloadSuccess(true);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* =========================================================================
          TIER 9.1 — 4 CORE THERAPEUTIC FRONTIERS ARCHITECTURAL PANELS
      ========================================================================= */}
      <section
        aria-labelledby="therapeutics-hero"
        className="relative pt-14 pb-20 md:pt-18 md:pb-28 overflow-hidden telemetry-grid border-b border-slate-200/90 bg-white/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="glass" className="py-1 px-3">
                <StatusPip status="optimal" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-wider text-brand-navy uppercase">
                  Commercial Portfolio • 38 Validated Markets
                </span>
              </Badge>
            </div>

            <h1
              id="therapeutics-hero"
              className="text-display-2xl font-extrabold text-brand-navy font-heading tracking-tight leading-[1.06]"
            >
              Targeting Human Health <br />
              <span className="text-brand-primary">Across Four Core Frontiers.</span>
            </h1>

            <p className="text-body-lg text-slate-700 font-sans leading-relaxed">
              From hospital-administered immuno-oncology biologics to cardiovascular chronic therapies and daily preventative cellular longevity, Mirage Pharma delivers verified clinical value, strict Rx/OTC boundary compliance, and zero-compromise manufacturing quality.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button variant="primary" size="lg" asChild>
                <a href="#product-catalog" className="flex items-center gap-2">
                  Browse Product Catalog <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="#cold-chain-showcase" className="flex items-center gap-2">
                  Inspect Serialization &amp; Cold-Chain <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          {/* 4 Core Therapeutic Frontiers Architectural Panels */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {/* Panel 1: Precision Oncology */}
            <Card variant="interactive" className="p-7 space-y-4 bg-white/95 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-blue-50 text-brand-primary">
                  <Dna className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-brand-primary uppercase">
                    Frontier 01
                  </span>
                  <h2 className="text-xl font-bold text-brand-navy font-heading">
                    Precision Oncology
                  </h2>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  Targeted tyrosine kinase inhibitors and antibody-drug conjugates (ADCs) engineering selective tumor apoptosis while sparing systemic tissue.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-brand-primary">
                <span>12 Products &amp; Molecules</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </Card>

            {/* Panel 2: Cardiovascular Health */}
            <Card variant="interactive" className="p-7 space-y-4 bg-white/95 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-rose-50 text-rose-600">
                  <Heart className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-rose-700 uppercase">
                    Frontier 02
                  </span>
                  <h2 className="text-xl font-bold text-brand-navy font-heading">
                    Cardiovascular Health
                  </h2>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  Endothelial lipid-clearing injectables, PCSK9 dual inhibitors, and hemodynamic multi-layer tablets safeguarding sustained cardiac output.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-rose-700">
                <span>8 Commercial Products</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </Card>

            {/* Panel 3: Immunology & Autoimmune */}
            <Card variant="interactive" className="p-7 space-y-4 bg-white/95 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-emerald-50 text-brand-green">
                  <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-brand-green uppercase">
                    Frontier 03
                  </span>
                  <h2 className="text-xl font-bold text-brand-navy font-heading">
                    Immunology &amp; Autoimmune
                  </h2>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  Selective cytokine neutralization (IL-23 / IL-17) and allosteric kinase blockers restoring immune tolerance in severe systemic inflammatory disease.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                <span>6 Active Formulations</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </Card>

            {/* Panel 4: Preventative Longevity */}
            <Card variant="interactive" className="p-7 space-y-4 bg-white/95 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-amber-50 text-amber-600">
                  <Sparkles className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-amber-700 uppercase">
                    Frontier 04
                  </span>
                  <h2 className="text-xl font-bold text-brand-navy font-heading">
                    Preventative Longevity
                  </h2>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  Cellular NAD+ enhancers, recombinant enzyme replacement biologics, and extended-release glycemic modulators promoting metabolic resilience.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-amber-800">
                <span>9 Approved Therapies</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 9.2 — FILTERABLE COMMERCIAL DRUG CATALOG & SMPC LIBRARY
      ========================================================================= */}
      <section
        id="product-catalog"
        aria-labelledby="catalog-heading"
        className="py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200/90"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header & Catalog Search */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
                  Commercial Product Directory
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900">
                  Global Harmonized
                </span>
              </div>
              <h2
                id="catalog-heading"
                className="text-display-lg font-bold text-brand-navy font-heading tracking-tight"
              >
                Medicines &amp; SmPC Library.
              </h2>
              <p className="text-sm text-slate-700 max-w-xl font-sans">
                Access official Prescribing Information, Summary of Product Characteristics (SmPC), dosage guidelines, and storage parameters.
              </p>
            </div>

            {/* Catalog Search Input */}
            <div className="w-full lg:w-80 relative">
              <label htmlFor="catalog-search-input" className="sr-only">
                Search product catalog by brand name, active substance, or ATC code
              </label>
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              <input
                id="catalog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand, INN, or ATC code…"
                className="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs bg-white border border-slate-300 text-brand-navy placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-transparent outline-none shadow-xs font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-800"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Dual Filtering Controls: Category Tabs & Prescription Status */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Therapeutic categories">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                      isSelected
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-brand-navy'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Prescription (Rx) vs OTC Filter Pill Toggle */}
            <div
              role="radiogroup"
              aria-label="Prescription classification filter"
              className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-semibold shadow-xs self-start md:self-auto"
            >
              {(['All', 'Rx', 'OTC'] as const).map((type) => {
                const isChecked = activeType === type;
                return (
                  <button
                    key={type}
                    role="radio"
                    aria-checked={isChecked}
                    onClick={() => setActiveType(type)}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                      isChecked
                        ? 'bg-brand-primary text-white shadow-xs font-bold'
                        : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                    }`}
                  >
                    {type === 'Rx' ? 'Rx Prescription' : type === 'OTC' ? 'OTC Wellness' : 'All Classes'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Badge Row */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          prod.type === 'Rx'
                            ? 'bg-red-50 text-red-800 border border-red-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {prod.type === 'Rx' ? 'Prescription Only (Rx)' : 'OTC Health'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-700 font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                        ATC: {prod.atcCode}
                      </span>
                    </div>

                    {/* Drug Title */}
                    <div>
                      <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-primary transition-colors font-heading">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-700 font-medium mt-0.5 font-sans">
                        {prod.genericName}
                      </p>
                    </div>

                    {/* Dosage & Storage Specs */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-mono space-y-1.5">
                      <div className="text-slate-800 font-bold">{prod.dosage}</div>
                      <div className="flex items-center gap-1.5 text-slate-700 text-[10px] font-semibold">
                        <ThermometerSnowflake className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                        <span>Storage: {prod.storageCondition}</span>
                      </div>
                      {prod.packSize && (
                        <div className="text-[10px] text-slate-600 font-sans">
                          Packaging: {prod.packSize}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-sans line-clamp-3">
                      {prod.description}
                    </p>
                  </div>

                  {/* SmPC / Leaflet Action Button */}
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenSmPc(prod)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-brand-primary hover:text-white text-xs font-bold text-slate-800 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-primary shadow-2xs"
                      aria-label={`View and download Prescribing Information for ${prod.name}`}
                    >
                      <FileText className="w-4 h-4" aria-hidden="true" />
                      <span>SmPC &amp; Leaflet</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-700">
                <div className="max-w-md mx-auto space-y-2">
                  <p className="font-bold text-brand-navy text-sm">
                    No commercial therapies match your current filters.
                  </p>
                  <p className="text-xs text-slate-600">
                    Try adjusting your search query or prescription classification.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                      setActiveType('All');
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 9.3 — SERIALIZATION & COLD-CHAIN SUPPLY INTEGRITY SHOWCASE
      ========================================================================= */}
      <section
        id="cold-chain-showcase"
        aria-labelledby="cold-chain-heading"
        className="py-16 md:py-24 bg-white border-b border-slate-200/90"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider text-brand-green uppercase">
              Packaging Integrity &amp; Global Tracking
            </span>
            <h2
              id="cold-chain-heading"
              className="text-display-lg font-bold text-brand-navy font-heading tracking-tight"
            >
              2D Serialization &amp; IoT Cold-Chain Integrity.
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Every pharmaceutical unit produced across our Swiss and Cairo facilities is authenticated by GS1 2D DataMatrix serialization and monitored continuously through our validated -80°C to +8°C wireless telemetry network.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 Columns: Interactive 2D DataMatrix Serialization Inspector */}
            <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-slate-50 border border-slate-200 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-100 text-brand-primary">
                    <QrCode className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-navy font-heading">
                      GS1 2D DataMatrix Serialization
                    </h3>
                    <p className="text-[11px] text-slate-600 font-sans">
                      FDA DSCSA &amp; EU FMD Anti-Counterfeit Verification
                    </p>
                  </div>
                </div>
                <Badge variant="vitality" size="sm">
                  100% Traceable
                </Badge>
              </div>

              {/* Product Selector for Serialization Simulation */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-700">
                  Select Commercial Batch Sample:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRODUCTS_DATA.slice(0, 3).map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setSelectedSerializedProduct(prod)}
                      className={`p-2.5 rounded-xl text-left border transition-all text-xs outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                        selectedSerializedProduct.id === prod.id
                          ? 'bg-brand-navy text-white border-brand-navy shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold truncate">{prod.name}</div>
                      <div className="text-[10px] opacity-80 truncate">{prod.dosage}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Decoded Telemetry Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs font-mono">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                  <span className="text-slate-500 font-bold">SERIAL SCANNER DECODE:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> AUTHENTICATED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">GLOBAL TRADE ITEM (GTIN)</span>
                    <span className="font-bold text-brand-navy">{selectedSerializedProduct.gtin || '07640182390142'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">SERIAL NUMBER (SN)</span>
                    <span className="font-bold text-brand-navy">SN9841-89302-CH</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">LOT / BATCH NUMBER</span>
                    <span className="font-bold text-brand-navy">LOT: MP-2026-08A</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">EXPIRATION DATE (EXP)</span>
                    <span className="font-bold text-brand-navy">2028-11-30</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-sans">
                  <span>Cryptographic Checksum: SHA-256</span>
                  <span className="font-mono text-emerald-800 font-bold">VERIFIED GAMP-5</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span>Tamper-evident seals on 100% of finished commercial packages.</span>
              </div>
            </div>

            {/* Right 6 Columns: Interactive IoT Cold-Chain Telemetry Visualizer */}
            <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-brand-navy text-white space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 text-emerald-400">
                    <ThermometerSnowflake className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading text-white">
                      IoT Cold-Chain Telemetry Tracker
                    </h3>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Active In-Transit Sensor Telematics (-80°C to +8°C)
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  LIVE SENSOR FEED
                </span>
              </div>

              {/* Thermal Tier Selector */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-300 font-semibold">
                  Select Calibrated Thermal Regime:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTempTier('-80')}
                    className={`p-2.5 rounded-xl text-center border transition-all text-xs font-mono font-bold outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      activeTempTier === '-80'
                        ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    -80°C Cryo
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTempTier('2-8')}
                    className={`p-2.5 rounded-xl text-center border transition-all text-xs font-mono font-bold outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      activeTempTier === '2-8'
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    +2°C to +8°C
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTempTier('15-25')}
                    className={`p-2.5 rounded-xl text-center border transition-all text-xs font-mono font-bold outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      activeTempTier === '15-25'
                        ? 'bg-amber-600 text-white border-amber-400 shadow-sm'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    +15°C to +25°C
                  </button>
                </div>
              </div>

              {/* Dynamic Telemetry Display */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 font-mono">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">Current Probe Reading</span>
                    <span className="text-3xl font-extrabold text-white tracking-tight">
                      {activeTempTier === '-80' ? '-78.4°C' : activeTempTier === '2-8' ? '+4.6°C' : '+20.8°C'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] block uppercase">Variance Tolerance</span>
                    <span className="text-sm font-bold text-emerald-400">±0.2°C (Optimal)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">EXCURSION RATE</span>
                      <span className="font-bold text-emerald-300">0.00% (Zero Excursion)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BatteryCharging className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">PROBE BATTERY</span>
                      <span className="font-bold text-slate-200">98% (5-Year Cell)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 pt-1">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">ACTIVE WAYPOINT</span>
                      <span className="font-bold text-white font-sans text-xs">
                        Basel (BSL) → Boston (BOS) Air Cargo FL-891
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-300 font-sans">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>WHO GDP &amp; IATA CEIV Pharma Certified</span>
                </div>
                <Link
                  href="/quality"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 flex items-center gap-1"
                >
                  Inspect Audit Logs <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SMPC & PRESCRIBING INFORMATION MODAL (ACCESSIBLE & SECURE)
      ========================================================================= */}
      {activeSmPcProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="smpc-modal-title"
          aria-describedby="smpc-modal-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveSmPcProduct(null)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-blue-100 text-brand-navy">
                  OFFICIAL PRESCRIBING INFORMATION (SmPC)
                </span>
                <h3 id="smpc-modal-title" className="text-xl font-bold text-brand-navy pt-2 font-heading">
                  {activeSmPcProduct.name} — {activeSmPcProduct.genericName}
                </h3>
                <p id="smpc-modal-desc" className="text-xs text-slate-600 font-sans">
                  Summary of Product Characteristics verified by global health authorities.
                </p>
              </div>
              <button
                ref={closeSmPcButtonRef}
                onClick={() => setActiveSmPcProduct(null)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer transition-colors"
                aria-label="Close SmPC document window"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Document Telemetry & Specs */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 text-[10px] block">ATC CODE</span>
                  <span className="font-bold text-brand-navy">{activeSmPcProduct.atcCode}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">PRESCRIPTION CLASS</span>
                  <span className="font-bold text-brand-navy">
                    {activeSmPcProduct.type === 'Rx' ? 'Prescription Only (Rx)' : 'Over-The-Counter (OTC)'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">STORAGE CONDITION</span>
                  <span className="font-bold text-brand-navy">{activeSmPcProduct.storageCondition}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">FILE SPECIFICATION</span>
                  <span className="font-bold text-brand-navy">PDF (1.84 MB) • Rev. 2026.1</span>
                </div>
              </div>
            </div>

            {/* Clinical Overview Snippet */}
            <div className="space-y-2 text-xs">
              <span className="font-mono text-slate-700 font-bold uppercase text-[10px]">
                Indication &amp; Dosing Summary
              </span>
              <p className="text-slate-700 leading-relaxed font-sans bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                {activeSmPcProduct.description} Recommended formulation: {activeSmPcProduct.dosage}.
              </p>
            </div>

            {/* Pharmacovigilance Disclaimer */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs leading-relaxed space-y-1">
              <span className="font-bold block">Pharmacovigilance Adverse Event Notice:</span>
              <p className="text-[11px] text-amber-900 font-sans">
                Healthcare providers and patients should report suspected adverse reactions immediately to the national health authority or the Mirage Pharma 24/7 Safety Hotline: +41 61 284 9000.
              </p>
            </div>

            {/* Download Status Toast */}
            {downloadSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span>Document {activeSmPcProduct.smpcFileName} generated and downloaded securely.</span>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveSmPcProduct(null)}
                className="w-full sm:w-auto"
              >
                Close Preview
              </Button>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleTriggerDownload}
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download SmPC PDF</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
