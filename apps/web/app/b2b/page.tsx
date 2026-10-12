'use client';

import * as React from 'react';
import { Badge, Button, Card, StatusPip, Input } from '@mirage/ui';
import {
  Building2,
  Globe2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mail,
  MapPin,
  FileCheck2,
  Briefcase,
  Layers,
  PhoneCall,
  Lock,
} from 'lucide-react';

interface PartnerFormState {
  collaborationType: string;
  therapeuticArea: string;
  targetRegion: string;
  companyName: string;
  contactName: string;
  corporateEmail: string;
  roleTitle: string;
  ndaRequired: boolean;
  notes: string;
}

const INITIAL_FORM: PartnerFormState = {
  collaborationType: 'Out-Licensing & Distribution',
  therapeuticArea: 'Precision Oncology',
  targetRegion: 'Europe (EU / EEA / UK)',
  companyName: '',
  contactName: '',
  corporateEmail: '',
  roleTitle: '',
  ndaRequired: true,
  notes: '',
};

const COLLABORATION_TYPES = [
  {
    id: 'out-licensing',
    title: 'Out-Licensing & Distribution',
    desc: 'Commercial distribution rights for approved products and late-stage clinical assets.',
    icon: Globe2,
  },
  {
    id: 'co-dev',
    title: 'Co-Development & Clinical R&D',
    desc: 'Joint clinical trial sponsorship, biomarker validation, and co-funding programs.',
    icon: Layers,
  },
  {
    id: 'cdmo',
    title: 'CDMO & Aseptic Manufacturing',
    desc: 'Sterile fill-finish, biologic bulk processing, and international cold-chain packaging.',
    icon: Building2,
  },
  {
    id: 'in-licensing',
    title: 'In-Licensing & Asset Acquisition',
    desc: 'Evaluating novel early-stage molecules fitting our 4 core therapeutic frontiers.',
    icon: Briefcase,
  },
];

const THERAPEUTIC_AREAS = [
  'Precision Oncology',
  'Cardiovascular Health',
  'Immunology & Autoimmune',
  'Preventative Longevity & OTC',
  'Cross-Therapeutic Technology Platforms',
];

const REGIONS = [
  'Europe (EU / EEA / UK)',
  'North America (USA & Canada)',
  'Middle East & North Africa (MENA)',
  'Gulf Cooperation Council (GCC)',
  'Asia-Pacific & Japan (APAC)',
  'Latin America (LATAM)',
];

const REGIONAL_HUBS = [
  {
    city: 'Basel, Switzerland',
    title: 'Global Headquarters & Scientific Leadership',
    address: 'Grenzacherstrasse 124, 4058 Basel',
    phone: '+41 61 284 9000',
    email: 'partnerships.ch@miragepharma.com',
    lead: 'Dr. Evelyn Vance, Head of Global Licensing',
    status: 'Primary Licensing Hub',
  },
  {
    city: 'Boston, Massachusetts',
    title: 'North America Clinical & BD Operations',
    address: 'Kendall Square Innovation Tower, Cambridge, MA 02142',
    phone: '+1 617 555 0192',
    email: 'partnerships.us@miragepharma.com',
    lead: 'Marcus Sterling, VP Americas Partnering',
    status: 'FDA & Alliance Management',
  },
  {
    city: 'Cairo, Egypt',
    title: 'MENA Regional Gateway & Manufacturing Hub',
    address: 'Sector 2, Fifth Settlement, New Cairo, Cairo',
    phone: '+20 2 2813 4000',
    email: 'partnerships.mena@miragepharma.com',
    lead: 'Kareem Mansoor, VP Regional Commercial',
    status: 'Commercial Distribution & GxP Logistics',
  },
];

export default function B2BPartneringPage() {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [formData, setFormData] = React.useState<PartnerFormState>(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [referenceId, setReferenceId] = React.useState<string>('');

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `MRG-B2B-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(generatedId);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setCurrentStep(1);
    setIsSubmitted(false);
    setReferenceId('');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* =========================================================================
          TIER 12.2.1 — HERO SECTION
      ========================================================================= */}
      <section
        aria-labelledby="b2b-hero"
        className="relative pt-14 pb-20 md:pt-18 md:pb-28 overflow-hidden telemetry-grid border-b border-slate-200/90 bg-white/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-brand-navy/5 border border-brand-navy/15 text-xs font-mono text-brand-navy">
            <StatusPip status="optimal" />
            <span className="font-semibold uppercase tracking-wider">
              GLOBAL PARTNERING &amp; ALLIANCE MANAGEMENT
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">38 Sovereign Markets Connected</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1
              id="b2b-hero"
              className="text-display-xl font-extrabold text-brand-navy font-heading tracking-tight leading-[1.08]"
            >
              Catalyzing Healthcare Breakthroughs Through{' '}
              <span className="text-brand-primary">Strategic Alliances.</span>
            </h1>
            <p className="text-body-lg text-slate-700 leading-relaxed font-sans">
              Accelerate clinical translation and market expansion. Mirage Pharma collaborates with sovereign distributors, biotechs, healthcare institutions, and academic centers through transparent GxP-governed alliance structures.
            </p>
          </div>

          {/* Core Credentials Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-2xl font-bold font-mono text-brand-navy">38</div>
              <div className="text-xs text-slate-600 mt-0.5">Commercial Territories</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-2xl font-bold font-mono text-brand-green">100%</div>
              <div className="text-xs text-slate-600 mt-0.5">GxP &amp; Audit Fidelity</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-2xl font-bold font-mono text-brand-primary">24h</div>
              <div className="text-xs text-slate-600 mt-0.5">Rapid BD Response SLA</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-2xl font-bold font-mono text-brand-navy">-80°C</div>
              <div className="text-xs text-slate-600 mt-0.5">End-to-End Cold-Chain</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 12.2.2 — PARTNERSHIP ARCHETYPES
      ========================================================================= */}
      <section
        aria-labelledby="archetypes-heading"
        className="py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
              Collaboration Frameworks
            </span>
            <h2
              id="archetypes-heading"
              className="text-display-md font-bold text-brand-navy font-heading tracking-tight"
            >
              Four Tailored Partnership Archetypes
            </h2>
            <p className="text-body-md text-slate-700 leading-relaxed font-sans">
              Our business development office structures flexible licensing agreements and joint ventures engineered around mutual value creation and regulatory alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLABORATION_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <Card
                  key={type.id}
                  className="p-6 bg-white border-slate-200/90 rounded-2xl flex flex-col justify-between hover:border-brand-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy font-heading leading-snug">
                      {type.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {type.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-brand-primary font-semibold">
                    <span>Explore Structure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 12.2.3 — INTERACTIVE 4-STEP B2B INQUIRY WIZARD
      ========================================================================= */}
      <section
        aria-labelledby="wizard-heading"
        className="py-16 md:py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
              Business Development Office
            </span>
            <h2
              id="wizard-heading"
              className="text-display-md font-bold text-brand-navy font-heading tracking-tight"
            >
              Initiate a Confidential Partnership Inquiry
            </h2>
            <p className="text-body-md text-slate-700 leading-relaxed font-sans max-w-2xl mx-auto">
              Structured 4-step consultation intake. All disclosures are protected under strict international pharmaceutical non-disclosure protocols.
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              {['Collaboration Model', 'Therapeutic Scope', 'Target Geography', 'Corporate Profile'].map(
                (stepLabel, idx) => {
                  const stepNum = idx + 1;
                  const isDone = currentStep > stepNum;
                  const isCurrent = currentStep === stepNum;
                  return (
                    <div key={stepLabel} className="flex flex-col items-center flex-1 text-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-brand-green text-white'
                            : isCurrent
                            ? 'bg-brand-navy text-white ring-4 ring-brand-navy/15'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : `0${stepNum}`}
                      </div>
                      <span
                        className={`text-[11px] mt-2 hidden sm:block font-medium ${
                          isCurrent ? 'text-brand-navy font-bold' : 'text-slate-500'
                        }`}
                      >
                        {stepLabel}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-primary transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Wizard Card Body */}
          <Card className="p-6 sm:p-10 bg-slate-50/70 border-slate-200/90 rounded-3xl shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-heading text-brand-navy">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto">
                    Your institutional inquiry has been received by the Global Business Development Office. A senior alliance manager will contact you within 24 business hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 max-w-md mx-auto space-y-1 font-mono text-xs">
                  <div className="text-slate-500">CONFIDENTIAL TRACKING DOSSIER ID</div>
                  <div className="text-lg font-bold text-brand-navy">{referenceId}</div>
                  <div className="text-[11px] text-emerald-600 flex items-center justify-center gap-1 pt-1">
                    <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Payload
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="primary" size="md" onClick={handleReset}>
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* STEP 1: Collaboration Model */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-brand-navy font-heading">
                        Step 1: Select Collaboration Model
                      </h3>
                      <p className="text-xs text-slate-600">
                        Choose the primary archetype under which your organization seeks to partner.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {COLLABORATION_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, collaborationType: type.title })}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            formData.collaborationType === type.title
                              ? 'border-brand-primary bg-brand-primary/5 shadow-xs ring-2 ring-brand-primary/20'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="font-bold text-sm text-brand-navy">{type.title}</div>
                          <div className="text-xs text-slate-500 mt-1 leading-relaxed">{type.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Therapeutic Scope */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-brand-navy font-heading">
                        Step 2: Define Therapeutic Area of Interest
                      </h3>
                      <p className="text-xs text-slate-600">
                        Target scientific frontier aligning with your operational portfolio.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {THERAPEUTIC_AREAS.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setFormData({ ...formData, therapeuticArea: area })}
                          className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            formData.therapeuticArea === area
                              ? 'border-brand-primary bg-brand-primary/5 shadow-xs font-bold text-brand-navy ring-1 ring-brand-primary/20'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="text-sm">{area}</span>
                          {formData.therapeuticArea === area && (
                            <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Geographic Target */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-brand-navy font-heading">
                        Step 3: Commercial Geographic Target
                      </h3>
                      <p className="text-xs text-slate-600">
                        Select the primary territory targeted for distribution, trial execution, or MAH transfer.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {REGIONS.map((region) => (
                        <button
                          key={region}
                          type="button"
                          onClick={() => setFormData({ ...formData, targetRegion: region })}
                          className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            formData.targetRegion === region
                              ? 'border-brand-primary bg-brand-primary/5 font-semibold text-brand-navy shadow-xs ring-1 ring-brand-primary/20'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs'
                          }`}
                        >
                          <span className="text-xs">{region}</span>
                          {formData.targetRegion === region && (
                            <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: Institutional Profile */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-brand-navy font-heading">
                        Step 4: Corporate Profile &amp; Contact Credentials
                      </h3>
                      <p className="text-xs text-slate-600">
                        Provide official organizational details to authenticate institutional credentials.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="companyName" className="text-xs font-mono text-slate-700">
                          Company / Institution Name *
                        </label>
                        <Input
                          id="companyName"
                          required
                          placeholder="e.g. BioVance Pharma AG"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="bg-white text-xs h-10"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contactName" className="text-xs font-mono text-slate-700">
                          Authorized Representative Name *
                        </label>
                        <Input
                          id="contactName"
                          required
                          placeholder="e.g. Dr. Thomas Mueller"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="bg-white text-xs h-10"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="corporateEmail" className="text-xs font-mono text-slate-700">
                          Institutional Email Address *
                        </label>
                        <Input
                          id="corporateEmail"
                          type="email"
                          required
                          placeholder="t.mueller@biovance.com"
                          value={formData.corporateEmail}
                          onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                          className="bg-white text-xs h-10"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="roleTitle" className="text-xs font-mono text-slate-700">
                          Corporate Position / Title *
                        </label>
                        <Input
                          id="roleTitle"
                          required
                          placeholder="e.g. VP Commercial Strategy"
                          value={formData.roleTitle}
                          onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                          className="bg-white text-xs h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="notes" className="text-xs font-mono text-slate-700">
                        Executive Overview &amp; Collaboration Scope
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="Provide preliminary non-confidential context regarding targeted therapeutic indications, annual distribution capacity, or trial objectives..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="ndaRequired"
                        checked={formData.ndaRequired}
                        onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                      />
                      <label htmlFor="ndaRequired" className="text-xs text-slate-700">
                        <strong className="text-brand-navy block">Mutual Non-Disclosure Agreement (mNDA) Requested</strong>
                        Send our standard bilateral pharmaceutical confidentiality agreement prior to technical data exchange.
                      </label>
                    </div>
                  </div>
                )}

                {/* Wizard Controls */}
                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="glass"
                      size="md"
                      onClick={handlePrev}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Previous
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={handleNext}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      Continue <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="vitality"
                      size="md"
                      className="flex items-center gap-2 text-xs font-bold px-6 shadow-sm shadow-emerald-600/20"
                    >
                      <FileCheck2 className="w-4 h-4" /> Transmit Dossier
                    </Button>
                  )}
                </div>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* =========================================================================
          TIER 12.2.4 — REGIONAL HEADQUARTERS CONTACT CARDS
      ========================================================================= */}
      <section
        aria-labelledby="hubs-heading"
        className="py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
              Global Presence
            </span>
            <h2
              id="hubs-heading"
              className="text-display-md font-bold text-brand-navy font-heading tracking-tight"
            >
              Regional Headquarters &amp; BD Desks
            </h2>
            <p className="text-body-md text-slate-700 leading-relaxed font-sans">
              Direct physical access to our regulatory, supply-chain, and commercial officers in Europe, North America, and MENA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REGIONAL_HUBS.map((hub) => (
              <Card
                key={hub.city}
                className="p-6 bg-white border-slate-200/90 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] font-mono bg-blue-50 text-brand-navy border-blue-200">
                      {hub.status}
                    </Badge>
                    <Building2 className="w-4 h-4 text-brand-primary" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-brand-navy">
                      {hub.city}
                    </h3>
                    <p className="text-xs font-semibold text-brand-primary mt-0.5">
                      {hub.title}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 text-xs text-slate-600 font-sans border-t border-slate-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{hub.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-mono">{hub.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{hub.email}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                  <span className="text-slate-400 block">Lead Officer:</span>
                  <span className="font-semibold text-brand-navy">{hub.lead}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
