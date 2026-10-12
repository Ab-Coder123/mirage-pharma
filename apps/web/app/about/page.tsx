import * as React from 'react';
import Link from 'next/link';
import { Badge, Button, Card, StatusPip } from '@mirage/ui';
import {
  Heart,
  Award,
  ShieldCheck,
  Globe2,
  Calendar,
  Building2,
  ArrowUpRight,
  Sparkles,
  Users,
  Compass,
  FileCheck2,
  ChevronRight,
  Quote,
} from 'lucide-react';

// ============================================================================
// DATA DEFINITIONS & STATIC METRICS
// ============================================================================

interface ExecutiveLeader {
  name: string;
  role: string;
  department: string;
  credentials: string[];
  bio: string;
  portrait: string;
  academicAffiliation: string;
}

interface MilestoneItem {
  year: string;
  quarter?: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  badge: string;
}

const CULTURE_PILLARS = [
  {
    id: 'caring-for-people',
    title: 'Caring for People',
    subtitle: 'Human-Centric Biology',
    lead: 'Every molecular innovation begins with an empathetic understanding of unmet human need.',
    description:
      'We dedicate our clinical pipelines to tackling aggressive pathologies and chronic conditions, ensuring patient affordability, transparent trial design, and compassionate access protocols worldwide.',
    metrics: '1.2M+ Patients Touched Annually',
    icon: Heart,
    colorVariant: 'text-brand-primary',
    bgBadge: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
  },
  {
    id: 'driving-excellence',
    title: 'Driving Excellence',
    subtitle: 'Relentless Scientific Rigor',
    lead: 'Zero-compromise pharmaceutical precision across synthesis, formulation, and cold-chain stability.',
    description:
      'Operating state-of-the-art bio-manufacturing suites conforming to stringent cGMP standards. We champion reproducibility, continuous in-line spectral monitoring, and double-blinded multi-center validations.',
    metrics: '99.98% Batch Analytical Purity',
    icon: Award,
    colorVariant: 'text-brand-green',
    bgBadge: 'bg-brand-green/10 text-brand-green border-brand-green/20',
  },
  {
    id: 'earning-trust',
    title: 'Earning Trust',
    subtitle: 'Uncompromising Governance',
    lead: 'Transparent regulatory governance, ethical clinical disclosure, and total stakeholder accountability.',
    description:
      'Trust is built through uncompromised audit trails (FDA 21 CFR Part 11 compliant), peer-reviewed data publication, and active community engagement across all 38 commercial distribution markets.',
    metrics: '100% GxP Audit Verification',
    icon: ShieldCheck,
    colorVariant: 'text-brand-cyan',
    bgBadge: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
  },
] as const;

const EXECUTIVE_ROSTER: ExecutiveLeader[] = [
  {
    name: 'Dr. Elena Rostova, Ph.D.',
    role: 'Chief Scientific Officer (CSO)',
    department: 'Discovery & Molecular Oncology',
    credentials: ['Ph.D. Molecular Genetics (ETH Zürich)', 'Postdoc Harvard Medical School'],
    bio: 'Oversees 42 pipeline assets spanning synthetic peptide scaffolds and mRNA oncology targets. Former principal investigator at the European Institute of Oncology with 20+ patents in targeted delivery.',
    portrait: '/images/leadership/cso.png',
    academicAffiliation: 'Fellow, International Society for Cellular Therapy',
  },
  {
    name: 'Dr. Marcus Vance, M.D., FACC',
    role: 'Chief Medical Officer (CMO)',
    department: 'Global Clinical Development',
    credentials: ['M.D. Johns Hopkins University', 'Board Certified Cardiologist & Immunologist'],
    bio: 'Directs Phase I–III multi-site global trials spanning North America, Europe, and MENA. Champion of adaptive trial designs that accelerate life-saving candidate delivery without compromising safety.',
    portrait: '/images/leadership/cmo.png',
    academicAffiliation: 'Clinical Faculty, Johns Hopkins Medicine',
  },
  {
    name: 'Marianne Chen, M.Sc., RAC',
    role: 'VP, Quality & Regulatory Affairs',
    department: 'Global GxP Compliance & Validation',
    credentials: ['M.Sc. Pharmaceutical Sciences (NUS)', 'Regulatory Affairs Certification (RAPS)'],
    bio: 'Architect of Mirage Pharma’s harmonized FDA 21 CFR Part 11 and EMA GxP compliance architecture. Manages international audit readiness and real-time electronic batch record governance.',
    portrait: '/images/leadership/regulatory.png',
    academicAffiliation: 'Executive Board, Global Biosafety Consortium',
  },
  {
    name: 'Kareem Mansoor, M.Eng.',
    role: 'VP, Global Supply Chain & Logistics',
    department: 'Cold-Chain Operations & Serialization',
    credentials: ['M.Eng. Industrial Systems (Imperial College)', 'Six Sigma Master Black Belt'],
    bio: 'Engineered our zero-excursion cold-chain network (-80°C Cryo, +2°C to +8°C, and +15°C to +25°C) across 38 distribution countries, operating automated IoT waypoints and RFID serialization.',
    portrait: '/images/leadership/supply.png',
    academicAffiliation: 'Member, Cold Chain Logistics Global Alliance',
  },
];

const CORPORATE_TIMELINE: MilestoneItem[] = [
  {
    year: '2012',
    title: 'Foundational Inception & Laboratory Genesis',
    description:
      'Mirage Pharma was founded with a singular conviction: combining European standard laboratory precision with agile regional biomanufacturing. Initial operations established in Cairo and Basel.',
    metric: '1 Core Lab',
    metricLabel: 'Initial Discovery Facility',
    badge: 'Genesis Phase',
  },
  {
    year: '2015',
    title: 'First Oncology Formulation & WHO GMP Certification',
    description:
      'Commissioned our flagship sterile injectable line. Received formal WHO Good Manufacturing Practice (GMP) accreditation, initiating commercial distribution in 6 regional territories.',
    metric: '6 Markets',
    metricLabel: 'Commercial Footprint',
    badge: 'Regulatory Milestone',
  },
  {
    year: '2018',
    title: 'R&D Expansion & Targeted Peptide Scaffolds',
    description:
      'Inaugurated the Advanced Formulation & Bio-Analytical Centre. Filed breakthrough patents for targeted peptide carriers, lowering off-target cytotoxicity by 34% in preclinical trials.',
    metric: '14 Patents',
    metricLabel: 'Proprietary IP Filings',
    badge: 'Scientific Acceleration',
  },
  {
    year: '2021',
    title: 'Multi-Continental Cold-Chain Telemetry Integration',
    description:
      'Deployed real-time IoT multi-sensor thermal telemetry across international freight corridors, achieving certified cold-chain monitoring across Europe, the Gulf, and North Africa.',
    metric: '99.99%',
    metricLabel: 'Thermal Integrity Rate',
    badge: 'Logistics Innovation',
  },
  {
    year: '2024',
    title: '38-Country Reach & FDA Part 11 Digital Validation',
    description:
      'Completed end-to-end digital transformation of quality systems conforming to FDA 21 CFR Part 11. Commercial presence expanded across 38 countries with 42 active clinical and commercial assets.',
    metric: '38 Countries',
    metricLabel: 'Global Distribution Network',
    badge: 'Global Scale',
  },
  {
    year: '2026+',
    title: 'Next-Gen Bio-Glass Manufacturing & ESG Net-Zero',
    description:
      'Commencing commissioning of automated robotic aseptic isolators and transitioning packaging to 100% biodegradable blister polymer matrixes. Targeted net-zero manufacturing by 2030.',
    metric: 'Net-Zero 2030',
    metricLabel: 'Decarbonization Roadmap',
    badge: 'Future Horizon',
  },
];

export const metadata = {
  title: 'About Us & Leadership | Mirage Pharma — Values-Led Biotechnology',
  description:
    'Discover Mirage Pharma’s founding mission, Tarek El Attar’s Chairman vision, our three corporate culture pillars, and our journey to 38-country global pharmaceutical distribution.',
};

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col w-full overflow-hidden">
      {/* =========================================================================
          TIER 10.1 — HERO: CORPORATE MISSION, VISION & PURPOSE NARRATIVE
      ========================================================================= */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-brand-border-subtle bg-gradient-to-b from-brand-surface via-white to-brand-surface/40 telemetry-grid"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="glass" className="py-1 px-3">
                <StatusPip status="optimal" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-wider text-brand-navy uppercase">
                  Corporate Identity • Section 04
                </span>
              </Badge>
              <Badge variant="vitality" size="sm">
                Established 2012
              </Badge>
            </div>

            <h1
              id="about-hero-heading"
              className="text-display-xl md:text-display-2xl font-extrabold text-brand-navy font-heading tracking-tight leading-[1.08]"
            >
              We Exist to Improve the Lives of the{' '}
              <span className="text-brand-primary">People We Touch</span>.
            </h1>

            <p className="text-body-lg text-slate-700 font-sans leading-relaxed">
              At Mirage Pharma, biotechnology is an ethical covenant. We pair rigorous European-standard
              biomolecular engineering with a deep moral dedication to therapeutic accessibility.
              Through science, empathy, and integrity, we transform chronic despair into measurable human vitality.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Button variant="primary" size="lg" asChild>
                <a href="#executive-leadership" className="flex items-center gap-2">
                  Meet Executive Leadership <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#corporate-milestones" className="flex items-center gap-2">
                  Explore Milestone History <Calendar className="w-4 h-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          {/* Core Philosophy Stat Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-brand-border-subtle">
            <div>
              <div className="text-telemetry-lg font-bold text-brand-navy font-mono">2012</div>
              <div className="text-caption text-slate-600 font-medium mt-1">Foundation Year</div>
            </div>
            <div>
              <div className="text-telemetry-lg font-bold text-brand-primary font-mono">38</div>
              <div className="text-caption text-slate-600 font-medium mt-1">Distribution Markets</div>
            </div>
            <div>
              <div className="text-telemetry-lg font-bold text-brand-green font-mono">42+</div>
              <div className="text-caption text-slate-600 font-medium mt-1">Active Pipeline Assets</div>
            </div>
            <div>
              <div className="text-telemetry-lg font-bold text-brand-cyan font-mono">100%</div>
              <div className="text-caption text-slate-600 font-medium mt-1">GxP Validated Batches</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 10.1 (CONT.) — THE 3 CULTURE PILLARS
      ========================================================================= */}
      <section
        aria-labelledby="culture-pillars-heading"
        className="py-20 md:py-28 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-primary" aria-hidden="true" />
              <span className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
                Ethical Bedrock & Operating Architecture
              </span>
            </div>
            <h2
              id="culture-pillars-heading"
              className="text-display-md md:text-display-lg font-bold text-brand-navy font-heading tracking-tight"
            >
              Values-Led, Performance-Driven Culture
            </h2>
            <p className="text-body-md text-slate-600">
              Our triple-pillar philosophy guides every clinical investigator, quality auditor,
              and manufacturing specialist across Mirage Pharma’s global operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CULTURE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.id}
                  variant="interactive"
                  className="p-8 flex flex-col justify-between border-slate-200/90 hover:border-brand-primary/40 bg-brand-surface/30"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl bg-white shadow-sm border border-slate-100 ${pillar.colorVariant}`}>
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <Badge variant="outline" size="sm" className={pillar.bgBadge}>
                        Pillar
                      </Badge>
                    </div>

                    <div>
                      <span className="text-caption uppercase tracking-wider font-mono font-semibold text-slate-500">
                        {pillar.subtitle}
                      </span>
                      <h3 className="text-title-lg font-bold text-brand-navy font-heading mt-1">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-body-sm font-semibold text-brand-navy/90 leading-snug">
                      {pillar.lead}
                    </p>

                    <p className="text-body-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-brand-border-subtle flex items-center justify-between">
                    <span className="text-caption text-slate-500 font-mono">Performance Metric</span>
                    <span className="text-caption font-bold text-brand-navy font-mono">
                      {pillar.metrics}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 10.2 — EXECUTIVE LEADERSHIP & CHAIRMAN'S DESK
      ========================================================================= */}
      <section
        id="executive-leadership"
        aria-labelledby="leadership-heading"
        className="py-20 md:py-28 bg-brand-surface/70 border-t border-b border-brand-border-subtle telemetry-grid"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Chairman's Desk Feature Card */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-primary" aria-hidden="true" />
              <span className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
                Executive Governance & Direction
              </span>
            </div>
            <h2
              id="leadership-heading"
              className="text-display-md md:text-display-lg font-bold text-brand-navy font-heading tracking-tight"
            >
              The Chairman’s Desk &amp; Scientific Directorate
            </h2>

            <Card
              variant="glass"
              className="p-8 md:p-12 border-slate-200/80 bg-white/95 shadow-xl relative overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                {/* Left Portrait & Credentials */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg border-2 border-brand-primary/20 bg-gradient-to-br from-brand-primary/10 to-brand-navy/10">
                    <div className="absolute inset-0 flex items-center justify-center text-brand-navy/30">
                      <Building2 className="w-16 h-16" aria-hidden="true" />
                    </div>
                    {/* Placeholder portrait fallback with clinical aesthetics */}
                    <div className="absolute inset-0 bg-brand-navy/5 flex flex-col items-center justify-center p-4">
                      <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-heading font-extrabold text-2xl">
                        TE
                      </div>
                      <span className="mt-3 text-caption font-mono uppercase tracking-widest text-brand-navy font-semibold">
                        Founder & Chairman
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-title-xl font-bold text-brand-navy font-heading">
                      Tarek El Attar
                    </h3>
                    <p className="text-body-sm font-semibold text-brand-primary">
                      Chairman &amp; Managing Director
                    </p>
                    <p className="text-caption text-slate-500 font-mono mt-1">
                      Pharmaceutical Executive • 28+ Years Leadership
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <Badge variant="outline" size="sm">
                      B.Pharm, Cairo Univ
                    </Badge>
                    <Badge variant="outline" size="sm">
                      GMP Compliance Advisory
                    </Badge>
                  </div>
                </div>

                {/* Right Keynote Message */}
                <div className="lg:col-span-8 space-y-6 lg:border-l lg:border-slate-200/80 lg:pl-10">
                  <div className="flex items-center gap-3 text-brand-primary">
                    <Quote className="w-8 h-8 opacity-40 rotate-180" aria-hidden="true" />
                    <span className="font-mono text-xs uppercase tracking-widest font-semibold text-slate-500">
                      Executive Keynote Memo • Basel / Cairo
                    </span>
                  </div>

                  <blockquote className="space-y-4 text-slate-800 font-sans text-body-lg leading-relaxed italic">
                    <p>
                      “When we established Mirage Pharma in 2012, the life sciences sector was characterized
                      by a widening divide: cutting-edge biological therapies were priced out of reach for
                      millions, while regional production suffered from inconsistent regulatory standards.”
                    </p>
                    <p>
                      “Our mandate was unequivocal: eliminate that disparity. By combining rigorous Swiss and
                      international GxP validation standards with agile, lean bio-manufacturing hubs, we have
                      proven that pharmaceutical excellence and compassionate affordability are not conflicting goals—they
                      are reciprocal imperatives.”
                    </p>
                  </blockquote>

                  <div className="pt-4 border-t border-brand-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-caption font-mono text-slate-600">
                      Corporate Headquarters: <span className="text-brand-navy font-semibold">Basel • Boston • Cairo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-caption text-slate-500 font-sans">Official Directive:</span>
                      <Badge variant="vitality" size="sm">
                        Patient First Mandate
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Executive Leadership Grid */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-title-xl font-bold text-brand-navy font-heading">
                  Executive Operations &amp; Scientific Directorate
                </h3>
                <p className="text-body-sm text-slate-600 mt-1">
                  Multidisciplinary leadership uniting discovery chemistry, clinical oversight, regulatory law, and cold-chain logistics.
                </p>
              </div>
              <Badge variant="glass" size="md">
                GxP Certified Executive Committee
              </Badge>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXECUTIVE_ROSTER.map((exec) => (
                <Card
                  key={exec.name}
                  variant="solid"
                  className="p-6 flex flex-col justify-between hover:border-brand-primary/40 hover:shadow-md transition-all group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-heading font-bold text-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      {exec.name
                        .split(' ')
                        .filter((p) => !p.startsWith('Dr.'))
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>

                    <div>
                      <h4 className="text-title-sm font-bold text-brand-navy font-heading leading-tight">
                        {exec.name}
                      </h4>
                      <p className="text-caption font-semibold text-brand-primary mt-0.5">
                        {exec.role}
                      </p>
                      <p className="text-caption text-slate-500 font-mono">{exec.department}</p>
                    </div>

                    <p className="text-caption text-slate-600 leading-relaxed">{exec.bio}</p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-mono text-slate-500 leading-snug">
                      {exec.credentials.join(' • ')}
                    </div>
                    <div className="text-[10px] text-brand-navy/70 font-sans italic">
                      {exec.academicAffiliation}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 10.3 — INTERACTIVE CORPORATE MILESTONE TIMELINE
      ========================================================================= */}
      <section
        id="corporate-milestones"
        aria-labelledby="milestones-heading"
        className="py-20 md:py-28 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <div className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-green" aria-hidden="true" />
              <span className="font-mono text-xs font-bold tracking-widest text-brand-green uppercase">
                Chronological Trajectory
              </span>
            </div>
            <h2
              id="milestones-heading"
              className="text-display-md md:text-display-lg font-bold text-brand-navy font-heading tracking-tight"
            >
              From Regional Pioneer to 38-Country Reach
            </h2>
            <p className="text-body-md text-slate-600">
              Tracing twelve years of relentless clinical expansion, international regulatory
              accreditation, and patient-first biomanufacturing.
            </p>
          </div>

          {/* Accessible Ordered List Semantic Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center Vertical Track */}
            <div
              className="absolute left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-brand-primary via-brand-green to-brand-cyan"
              aria-hidden="true"
            />

            <ol className="space-y-12 md:space-y-16 relative" aria-label="Corporate Milestones">
              {CORPORATE_TIMELINE.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <li
                    key={milestone.year}
                    className="relative flex flex-col md:flex-row items-start md:items-center group"
                  >
                    {/* Visual Center Marker Pip */}
                    <div
                      className="absolute left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-brand-primary shadow-md flex items-center justify-center z-10 group-hover:scale-125 transition-transform"
                      aria-hidden="true"
                    >
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    </div>

                    {/* Timeline Node Content Card */}
                    <div
                      className={`ml-14 md:ml-0 md:w-1/2 ${
                        isEven ? 'md:pr-14 md:text-right' : 'md:pl-14 md:ml-auto md:text-left'
                      }`}
                    >
                      <Card
                        variant="interactive"
                        className="p-6 md:p-8 bg-brand-surface/40 border-slate-200/80 hover:bg-white transition-all shadow-sm group-hover:shadow-lg"
                      >
                        <div
                          className={`flex items-center gap-3 mb-3 ${
                            isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <Badge variant="primary" size="sm" className="font-mono font-bold">
                            {milestone.year}
                          </Badge>
                          <Badge variant="outline" size="sm">
                            {milestone.badge}
                          </Badge>
                        </div>

                        <h3 className="text-title-md font-bold text-brand-navy font-heading leading-tight">
                          {milestone.title}
                        </h3>

                        <p className="text-body-sm text-slate-600 mt-2 leading-relaxed">
                          {milestone.description}
                        </p>

                        <div
                          className={`pt-4 mt-4 border-t border-brand-border-subtle flex items-center gap-4 ${
                            isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <div>
                            <span className="text-telemetry-sm font-bold text-brand-navy font-mono">
                              {milestone.metric}
                            </span>
                            <span className="text-caption text-slate-500 block">
                              {milestone.metricLabel}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 10.3 (CONT.) — GLOBAL HEADQUARTERS & CONTACT CTA
      ========================================================================= */}
      <section
        aria-labelledby="about-cta-heading"
        className="py-16 bg-brand-navy text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-brand-cyan">
                <Globe2 className="w-5 h-5" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  International Footprint
                </span>
              </div>
              <h2
                id="about-cta-heading"
                className="text-display-md font-bold font-heading text-white tracking-tight"
              >
                Connect with Mirage Pharma’s Directorate
              </h2>
              <p className="text-slate-300 text-body-md max-w-2xl">
                Whether exploring strategic licensing partnerships, compassionate patient access,
                or clinical co-development programs, our executive leadership welcomes dialogue.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <Button variant="vitality" size="lg" asChild className="w-full">
                <Link href="/quality" className="flex items-center justify-center gap-2">
                  Verify Quality Standards <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="glass" size="lg" asChild className="w-full text-brand-navy">
                <Link href="/pipeline" className="flex items-center justify-center gap-2">
                  View Clinical Pipeline <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
