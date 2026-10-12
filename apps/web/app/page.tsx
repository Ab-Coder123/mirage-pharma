import Image from 'next/image';
import Link from 'next/link';
import { Button, Badge, Card, StatusPip } from '@mirage/ui';
import {
  ArrowRight,
  Dna,
  Heart,
  Award,
  ShieldCheck,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { OperationalMetricsCounter } from '@/components/landing/OperationalMetricsCounter';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* =========================================================================
          TIER 7.1 — MONUMENTAL SPLIT HERO SECTION
      ========================================================================= */}
      <section
        aria-labelledby="hero-heading"
        className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden telemetry-grid border-b border-slate-200/80 bg-white/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Monumental Hero Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="glass" className="py-1 px-3">
                  <StatusPip status="optimal" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-brand-navy uppercase">
                    GxP Validated • Values-Led Biotechnology
                  </span>
                </Badge>
              </div>

              <h1
                id="hero-heading"
                className="text-display-2xl font-extrabold text-brand-navy font-heading tracking-tight leading-[1.06]"
              >
                Values-Led, <br />
                <span className="text-brand-primary">Performance-Driven</span> <br />
                Biotechnology.
              </h1>

              <p className="text-body-lg text-slate-700 max-w-xl font-sans leading-relaxed">
                Pioneering patient-centric healthcare and precision molecular innovation across 4 core therapeutic frontiers. Driven by unwavering scientific rigor, clinical excellence, and world-class cold-chain integrity.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/science" className="flex items-center gap-2">
                    Explore Clinical Pipeline <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <Link href="/about" className="flex items-center gap-2">
                    Our Culture &amp; Story <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              {/* Fast Proof Telemetry Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-border-subtle">
                <div>
                  <div className="text-telemetry-lg font-bold text-brand-navy font-mono tabular-numbers">
                    42+
                  </div>
                  <div className="text-caption text-slate-600 font-medium mt-0.5">
                    Clinical Assets
                  </div>
                </div>
                <div>
                  <div className="text-telemetry-lg font-bold text-brand-green font-mono tabular-numbers">
                    99.98%
                  </div>
                  <div className="text-caption text-slate-600 font-medium mt-0.5">
                    Batch Purity
                  </div>
                </div>
                <div>
                  <div className="text-telemetry-lg font-bold text-brand-primary font-mono tabular-numbers">
                    38
                  </div>
                  <div className="text-caption text-slate-600 font-medium mt-0.5">
                    Global Markets
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Luminous 3D DNA Double-Helix Specular Showcase */}
            <div className="lg:col-span-5 relative">
              <Card variant="interactive" className="p-4 overflow-hidden shadow-2xl bg-white/90">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary/10 via-white to-brand-cyan/15">
                  <Image
                    src="/3d/dna_3d_render.png"
                    alt="Luminous 3D medical-grade DNA double-helix surrounded by flowing biomedical translucent glass ribbons and cyan bioluminescence"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-[11px] font-mono font-bold rounded-full bg-white/95 text-brand-navy border border-white/80 shadow-sm backdrop-blur-md">
                      CRYSTALLOGRAPHY 1.8 Å
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-white/90 border border-brand-border-subtle flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-brand-primary/10 text-brand-primary">
                      <Dna className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold text-brand-navy font-heading">
                        MRG-701 Immuno-Oncology
                      </h2>
                      <p className="text-[11px] text-slate-600 font-sans">
                        Targeted Polypeptide Alpha
                      </p>
                    </div>
                  </div>
                  <Badge variant="vitality" size="sm">
                    Phase III Active
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 7.2 — THE 3 MONOLITHIC CULTURE COLUMNS (WITH 1PX HAIRLINES)
      ========================================================================= */}
      <section
        aria-labelledby="culture-heading"
        className="py-20 md:py-28 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
              Core Cultural Pillars
            </span>
            <h2
              id="culture-heading"
              className="text-display-lg font-bold text-brand-navy font-heading tracking-tight"
            >
              The Foundations of Our Commitment.
            </h2>
            <p className="text-body-md text-slate-700 leading-relaxed font-sans">
              Every breakthrough at Mirage Pharma is guided by three non-negotiable principles that align scientific discovery with human compassion.
            </p>
          </div>

          {/* 3 Columns separated by 1px Hairlines */}
          <div className="grid md:grid-cols-3 gap-0 border-t border-b border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-white/95 backdrop-blur-xs">
            {/* Column 01: Caring for People */}
            <article className="p-8 lg:p-10 space-y-6 relative group hover:bg-slate-50/70 transition-colors">
              <div className="h-1.5 w-16 bg-[#35AB38] rounded-full" aria-hidden="true" />
              <div className="p-3 w-fit rounded-xl bg-emerald-50 text-[#35AB38]">
                <Heart className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-2.5">
                <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
                  PILLAR 01
                </span>
                <h3 className="text-2xl font-bold text-brand-navy font-heading">
                  Caring for People
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Putting patients and healthcare practitioners at the epicenter of our therapeutic development. We engineer accessible, targeted therapies ensuring equitable healthcare across emerging and established populations.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                <span>1,200,000+ Lives Touched</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </article>

            {/* Column 02: Driving Excellence */}
            <article className="p-8 lg:p-10 space-y-6 relative group hover:bg-slate-50/70 transition-colors">
              <div className="h-1.5 w-16 bg-[#2878BC] rounded-full" aria-hidden="true" />
              <div className="p-3 w-fit rounded-xl bg-blue-50 text-[#2878BC]">
                <Award className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-2.5">
                <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
                  PILLAR 02
                </span>
                <h3 className="text-2xl font-bold text-brand-navy font-heading">
                  Driving Excellence
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Pushing the scientific envelope through rigorous clinical discovery, robotic automation, and advanced bioprocessing. We hold zero tolerance for mediocrity in drug formulation and analytical bioequivalence.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-blue-800">
                <span>14 Global Clinical Patents</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </article>

            {/* Column 03: Earning Trust */}
            <article className="p-8 lg:p-10 space-y-6 relative group hover:bg-slate-50/70 transition-colors">
              <div className="h-1.5 w-16 bg-[#023368] rounded-full" aria-hidden="true" />
              <div className="p-3 w-fit rounded-xl bg-slate-100 text-[#023368]">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-2.5">
                <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
                  PILLAR 03
                </span>
                <h3 className="text-2xl font-bold text-brand-navy font-heading">
                  Earning Trust
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Transparent clinical trials, uncompromising ethical governance, and 100% adherence to global GxP, FDA, and EMA regulatory standards. Trust is earned through open data and continuous compliance.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-brand-navy">
                <span>100% GxP Audit Fidelity</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 7.3 — ASYMMETRIC THERAPEUTIC AREAS BENTO SHOWCASE
      ========================================================================= */}
      <section
        aria-labelledby="portfolio-heading"
        className="py-20 md:py-28 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
                Therapeutic Portfolio
              </span>
              <h2
                id="portfolio-heading"
                className="text-display-lg font-bold text-brand-navy font-heading tracking-tight"
              >
                Focused Molecular Solutions.
              </h2>
              <p className="text-body-md text-slate-700 max-w-xl font-sans">
                Targeting disease mechanisms with biological precision across 4 vital medical verticals.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/therapeutics" className="flex items-center gap-1.5 font-medium">
                View Full Commercial Portfolio <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Asymmetric Bento Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tile 1: Precision Oncology (MRG-701) — Large Span */}
            <div className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl hud-glass hud-glass-interactive border border-white/90 shadow-hud-glass flex flex-col justify-between space-y-6">
              <div className="flex items-start justify-between">
                <span className="p-3 rounded-2xl bg-brand-primary/10 text-brand-primary">
                  <Dna className="w-6 h-6" aria-hidden="true" />
                </span>
                <Badge variant="primary" size="sm">Lead Oncology Vertical</Badge>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-brand-primary">
                    ASSET: MRG-701
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-mono text-slate-500">PHASE III</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy font-heading">
                  Precision Immuno-Oncology
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-sans max-w-md">
                  Targeted polypeptides and antibody-drug conjugates (ADCs) designed to selectively neutralize malignant tumor proliferation while preserving healthy somatic tissue.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono text-brand-navy font-semibold">
                <span>8 Active Pipeline Molecules</span>
                <Link
                  href="/science"
                  className="text-brand-primary hover:text-brand-navy transition-colors flex items-center gap-1 font-sans"
                >
                  Explore Pipeline <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Tile 2: Cardiovascular Resilience (MRG-310) */}
            <div className="p-8 rounded-3xl hud-glass hud-glass-interactive border border-white/90 shadow-hud-glass flex flex-col justify-between space-y-6">
              <div className="flex items-start justify-between">
                <span className="p-3 rounded-2xl bg-rose-50 text-rose-600">
                  <Heart className="w-6 h-6" aria-hidden="true" />
                </span>
                <Badge variant="outline" size="sm">Phase IIb</Badge>
              </div>
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-semibold text-rose-600">
                  ASSET: MRG-310
                </div>
                <h3 className="text-xl font-bold text-brand-navy font-heading">
                  Cardiovascular Resilience
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  Advanced vascular endothelial restoration and targeted lipid regulation agents protecting cardiac integrity.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/80 text-xs font-mono font-semibold text-slate-600">
                5 Commercial Products
              </div>
            </div>

            {/* Tile 3: Immunology & Autoimmune (MRG-450) */}
            <div className="p-8 rounded-3xl hud-glass hud-glass-interactive border border-white/90 shadow-hud-glass flex flex-col justify-between space-y-6">
              <div className="flex items-start justify-between">
                <span className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                </span>
                <Badge variant="vitality" size="sm">Phase II</Badge>
              </div>
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-semibold text-brand-green">
                  ASSET: MRG-450
                </div>
                <h3 className="text-xl font-bold text-brand-navy font-heading">
                  Immunology &amp; Autoimmune
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  Selective cytokine inhibitors restoring immune homeostasis across systemic autoimmune conditions.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/80 text-xs font-mono font-semibold text-slate-600">
                4 Active Trials
              </div>
            </div>

            {/* Tile 4: Metabolic & Daily Vitality (MRG-108) — Span Across 4 Columns with Cold-Chain Integration */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 p-8 rounded-3xl bg-brand-navy text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-xs font-semibold">
                    ASSET: MRG-108 • COMMERCIAL
                  </span>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    Cold-Chain Assured
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Metabolic &amp; Daily Vitality — Zero Temperature Excursion Guarantee
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  Targeted bio-molecular solutions for metabolic regulation and mitochondrial vitality. Every dose is protected by multi-sensor IoT telematics continuously logging -80°C, -20°C, and +2°C to +8°C parameters across international air freight and hospital corridors.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Button variant="vitality" size="md" asChild>
                  <Link href="/quality" className="flex items-center gap-2">
                    Inspect Cold-Chain Protocols <Zap className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="glass" size="md" asChild className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <Link href="/therapeutics">Explore Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 7.4 — GLOBAL OPERATIONAL METRICS & TRUST WALL
      ========================================================================= */}
      <section
        aria-labelledby="trust-heading"
        className="py-20 md:py-28 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
              Global Scale &amp; Verification
            </span>
            <h2
              id="trust-heading"
              className="text-display-lg font-bold text-brand-navy font-heading tracking-tight"
            >
              Enterprise Life Sciences at Scale.
            </h2>
            <p className="text-body-md text-slate-700 leading-relaxed font-sans">
              Serving healthcare providers, clinical researchers, and global health authorities worldwide with certified quality standards and GxP validation.
            </p>
          </div>

          {/* Interactive Numeric Telemetry Counter Grid & Regulatory Stamps */}
          <OperationalMetricsCounter />
        </div>
      </section>
    </div>
  );
}
