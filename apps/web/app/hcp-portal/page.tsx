'use client';

import * as React from 'react';
import { Badge, Button, Card, StatusPip, Input } from '@mirage/ui';
import {
  Calculator,
  Download,
  Search,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Mail,
  ArrowRight,
  UserCheck,
  RefreshCw,
  Clock,
} from 'lucide-react';

interface MonographItem {
  id: string;
  drugName: string;
  inn: string;
  category: string;
  indication: string;
  dosingSummary: string;
  fileSize: string;
}

const MONOGRAPHS: MonographItem[] = [
  {
    id: 'mrg-01',
    drugName: 'Zulatinib®',
    inn: 'Zulatinib Besylate 150mg',
    category: 'Oncology',
    indication: 'Locally advanced or metastatic EGFR T790M-positive NSCLC',
    dosingSummary: '150mg once daily taken orally with or without food. Dose reduce to 100mg in Grade 3 toxicity.',
    fileSize: '3.4 MB SmPC',
  },
  {
    id: 'mrg-02',
    drugName: 'Cardiovance®',
    inn: 'Cardiovance Polypeptide 300mg',
    category: 'Cardiology',
    indication: 'Primary hypercholesterolemia refractory to maximum tolerated statins',
    dosingSummary: '300mg subcutaneous auto-injector once every 4 weeks. No renal dose adjustment required for CrCl > 30 mL/min.',
    fileSize: '2.8 MB SmPC',
  },
  {
    id: 'mrg-03',
    drugName: 'Immunovex®',
    inn: 'Immunovex Biologic 200mg/mL',
    category: 'Immunology',
    indication: 'Active psoriatic arthritis and refractory axial spondyloarthritis',
    dosingSummary: 'Initial 400mg loading dose at Weeks 0 and 2, followed by 200mg maintenance every 4 weeks.',
    fileSize: '4.1 MB SmPC',
  },
  {
    id: 'mrg-04',
    drugName: 'Neurovance®',
    inn: 'Neurovance Peptidomimetic 50mg',
    category: 'Neurology (Investigational)',
    indication: 'Early-stage neurocognitive mild impairment and synaptic stress',
    dosingSummary: '50mg BID administered with meals under Protocol NCT05423811 clinical trial guidelines.',
    fileSize: '5.2 MB Protocol',
  },
];

export default function HcpPortalPage() {
  // HCP Self-Verification state
  const [isHcpVerified, setIsHcpVerified] = React.useState<boolean>(false);
  const [profession, setProfession] = React.useState<string>('Oncology Specialist');
  const [licenseNumber, setLicenseNumber] = React.useState<string>('');

  // Clinical Calculator state
  const [selectedDrug, setSelectedDrug] = React.useState<'zulatinib' | 'cardiovance'>('zulatinib');
  const [weightKg, setWeightKg] = React.useState<number>(70);
  const [heightCm, setHeightCm] = React.useState<number>(175);
  const [ageYears, setAgeYears] = React.useState<number>(58);
  const [serumCreatinine, setSerumCreatinine] = React.useState<number>(1.1);
  const [gender, setGender] = React.useState<'male' | 'female'>('male');

  // Search filter
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Medical inquiry form state
  const [inquirySubject, setInquirySubject] = React.useState<string>('');
  const [inquiryText, setInquiryText] = React.useState<string>('');
  const [inquirySent, setInquirySent] = React.useState<boolean>(false);

  // Pharmacovigilance report modal state
  const [adverseReportSubmitted, setAdverseReportSubmitted] = React.useState<boolean>(false);

  // Cockcroft-Gault CrCl Formula
  const crClResult = React.useMemo(() => {
    if (serumCreatinine <= 0 || weightKg <= 0 || ageYears <= 0) return 0;
    // CrCl = [(140 - Age) * Weight] / (72 * Scr) * (0.85 if female)
    let crCl = ((140 - ageYears) * weightKg) / (72 * serumCreatinine);
    if (gender === 'female') crCl *= 0.85;
    return Math.max(5, Math.round(crCl));
  }, [ageYears, weightKg, serumCreatinine, gender]);

  // Body Surface Area (Mosteller Formula)
  const bsaResult = React.useMemo(() => {
    if (weightKg <= 0 || heightCm <= 0) return 0;
    const bsa = Math.sqrt((heightCm * weightKg) / 3600);
    return parseFloat(bsa.toFixed(2));
  }, [weightKg, heightCm]);

  // Dosing recommendation logic
  const dosingAdvice = React.useMemo(() => {
    if (selectedDrug === 'zulatinib') {
      if (crClResult < 30) {
        return {
          dose: '100mg Once Daily',
          badge: 'Renal Dose Reduction',
          note: 'Severe renal impairment (CrCl < 30 mL/min). Monitor QTc interval and hepatic transaminases weekly during first month.',
          color: 'text-amber-700 bg-amber-50 border-amber-200',
        };
      }
      return {
        dose: '150mg Once Daily',
        badge: 'Standard Clinical Dose',
        note: 'Normal or mild-to-moderate clearance (CrCl >= 30 mL/min). Take orally at approximately the same time daily.',
        color: 'text-brand-navy bg-blue-50 border-blue-200',
      };
    } else {
      if (crClResult < 15) {
        return {
          dose: 'Clinical Discretion / Dialysis Protocol',
          badge: 'ESRD Precaution',
          note: 'End-stage renal disease (CrCl < 15 mL/min). Insufficient pharmacokinetic data; monitor lipid fractions bi-weekly.',
          color: 'text-amber-700 bg-amber-50 border-amber-200',
        };
      }
      return {
        dose: '300mg Subcutaneous Every 4 Weeks',
        badge: 'Standard Protocol',
        note: 'Administer via single-dose pre-filled autoinjector into abdomen, thigh, or upper arm.',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      };
    }
  }, [selectedDrug, crClResult]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (licenseNumber.trim()) {
      setIsHcpVerified(true);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquirySubject.trim() && inquiryText.trim()) {
      setInquirySent(true);
      setInquirySubject('');
      setInquiryText('');
    }
  };

  const filteredMonographs = React.useMemo(() => {
    return MONOGRAPHS.filter(
      (m) =>
        m.drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.inn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.indication.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col">
      {/* =========================================================================
          TIER 12.3.1 — HCP VERIFICATION BANNER & HERO
      ========================================================================= */}
      <section
        aria-labelledby="hcp-hero"
        className="relative pt-14 pb-20 md:pt-18 md:pb-28 overflow-hidden telemetry-grid border-b border-slate-200/90 bg-white/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800">
            <StatusPip status="optimal" />
            <span className="font-semibold uppercase tracking-wider">
              HEALTHCARE PROFESSIONAL (HCP) SECURE GATEWAY
            </span>
            <span className="text-emerald-300">•</span>
            <span className="text-emerald-700">GxP &amp; 21 CFR Part 11 Harmonized</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1
              id="hcp-hero"
              className="text-display-xl font-extrabold text-brand-navy font-heading tracking-tight leading-[1.08]"
            >
              Medical Affairs, Monograph Library &amp;{' '}
              <span className="text-brand-primary">Clinical Decision Support.</span>
            </h1>
            <p className="text-body-lg text-slate-700 leading-relaxed font-sans">
              Authoritative prescribing summaries, renal clearance dosing algorithms, drug monographs, and direct scientific inquiries for accredited healthcare practitioners and clinical trial investigators.
            </p>
          </div>

          {/* HCP Verification Modal / Self-Attestation Card */}
          {!isHcpVerified ? (
            <Card className="p-6 md:p-8 bg-blue-50/70 border-blue-200 rounded-3xl max-w-2xl space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-primary text-white">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold font-heading text-brand-navy">
                    HCP Accreditation Verification Required
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Regulatory health authorities restrict detailed clinical prescribing algorithms and investigational brochures to verified medical professionals.
                  </p>
                </div>
              </div>

              <form onSubmit={handleVerify} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label htmlFor="profession" className="text-[11px] font-mono text-slate-700 block mb-1">
                    Medical Discipline
                  </label>
                  <select
                    id="profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  >
                    <option>Oncology Specialist</option>
                    <option>Cardiologist / Lipidologist</option>
                    <option>Clinical Investigator (GCP)</option>
                    <option>Hospital Pharmacist</option>
                    <option>Regulatory Affairs Officer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="license" className="text-[11px] font-mono text-slate-700 block mb-1">
                    License / Registration ID *
                  </label>
                  <Input
                    id="license"
                    required
                    placeholder="e.g. GMC / FMH / NPI #"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="h-10 text-xs bg-white"
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full h-10 text-xs font-semibold"
                  >
                    Self-Certify &amp; Unlock
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between max-w-2xl">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-emerald-900">Accreditation Verified: </span>
                  <span className="text-emerald-800 font-mono">
                    {profession} • Ref #{licenseNumber}
                  </span>
                </div>
              </div>
              <Button
                variant="glass"
                size="sm"
                onClick={() => setIsHcpVerified(false)}
                className="text-xs h-8"
              >
                Reset Gate
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          TIER 12.3.2 — INTERACTIVE CLINICAL DOSING & RENAL CALCULATOR
      ========================================================================= */}
      <section
        aria-labelledby="calc-heading"
        className="py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
              Clinical Pharmacology Tool
            </span>
            <h2
              id="calc-heading"
              className="text-display-md font-bold text-brand-navy font-heading tracking-tight"
            >
              Cockcroft-Gault Renal Clearance &amp; Dosing Engine
            </h2>
            <p className="text-body-md text-slate-700 leading-relaxed font-sans">
              Instantaneous client-side pharmacokinetic estimation. Calculates estimated Creatinine Clearance (CrCl) and provides protocol-aligned starting dose adjustments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Calculator Inputs */}
            <Card className="lg:col-span-7 p-6 sm:p-8 bg-white border-slate-200/90 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-primary" />
                  <span className="font-bold text-brand-navy text-sm font-heading">
                    Patient Parameters
                  </span>
                </div>
                <div className="flex rounded-lg bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setSelectedDrug('zulatinib')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      selectedDrug === 'zulatinib'
                        ? 'bg-white text-brand-navy shadow-xs'
                        : 'text-slate-600 hover:text-brand-navy'
                    }`}
                  >
                    Zulatinib® (MRG-701)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDrug('cardiovance')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      selectedDrug === 'cardiovance'
                        ? 'bg-white text-brand-navy shadow-xs'
                        : 'text-slate-600 hover:text-brand-navy'
                    }`}
                  >
                    Cardiovance® (MRG-310)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Weight */}
                <div className="space-y-1.5">
                  <label htmlFor="weight" className="font-mono text-slate-700 flex justify-between">
                    <span>Patient Weight:</span>
                    <strong className="text-brand-navy">{weightKg} kg</strong>
                  </label>
                  <input
                    id="weight"
                    type="range"
                    min={40}
                    max={140}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>

                {/* Height */}
                <div className="space-y-1.5">
                  <label htmlFor="height" className="font-mono text-slate-700 flex justify-between">
                    <span>Patient Height:</span>
                    <strong className="text-brand-navy">{heightCm} cm</strong>
                  </label>
                  <input
                    id="height"
                    type="range"
                    min={140}
                    max={210}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label htmlFor="age" className="font-mono text-slate-700 flex justify-between">
                    <span>Patient Age:</span>
                    <strong className="text-brand-navy">{ageYears} yrs</strong>
                  </label>
                  <input
                    id="age"
                    type="range"
                    min={18}
                    max={95}
                    value={ageYears}
                    onChange={(e) => setAgeYears(Number(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>

                {/* Serum Creatinine */}
                <div className="space-y-1.5">
                  <label htmlFor="scr" className="font-mono text-slate-700 flex justify-between">
                    <span>Serum Creatinine:</span>
                    <strong className="text-brand-navy">{serumCreatinine} mg/dL</strong>
                  </label>
                  <input
                    id="scr"
                    type="range"
                    min={0.4}
                    max={4.0}
                    step={0.1}
                    value={serumCreatinine}
                    onChange={(e) => setSerumCreatinine(Number(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Biological Sex Toggle */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-600">Biological Sex Factor:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                      gender === 'male'
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    Male (1.00)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                      gender === 'female'
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    Female (0.85)
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 font-sans flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Clinical Notice:</strong> This calculator is an adjuvant tool. Dosage decisions must be confirmed against full prescribing information and individualized laboratory assessment.
                </span>
              </div>
            </Card>

            {/* Right Column: Calculated Results Card */}
            <div className="lg:col-span-5 space-y-4">
              <Card className="p-6 sm:p-8 bg-brand-navy text-white rounded-3xl shadow-lg space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    Pharmacokinetic Metrics
                  </span>
                  <StatusPip status="optimal" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                    <div className="text-xs text-slate-300 font-mono">Estimated CrCl</div>
                    <div className="text-3xl font-extrabold font-mono text-white mt-1">
                      {crClResult}
                      <span className="text-xs font-normal text-slate-400 ms-1">mL/min</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                    <div className="text-xs text-slate-300 font-mono">Body Surface Area</div>
                    <div className="text-3xl font-extrabold font-mono text-emerald-300 mt-1">
                      {bsaResult}
                      <span className="text-xs font-normal text-slate-400 ms-1">m²</span>
                    </div>
                  </div>
                </div>

                {/* Dosage Recommendation Output */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300">Recommended Protocol:</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-emerald-300 border border-white/10">
                      {dosingAdvice.badge}
                    </span>
                  </div>
                  <div className="text-2xl font-bold font-heading text-white">
                    {dosingAdvice.dose}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {dosingAdvice.note}
                  </p>
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <Button
                  variant="glass"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    setWeightKg(70);
                    setHeightCm(175);
                    setAgeYears(58);
                    setSerumCreatinine(1.1);
                  }}
                >
                  <RefreshCw className="w-3.5 h-3.5 me-1.5" /> Reset Defaults
                </Button>
                <Button variant="primary" size="sm" className="w-full text-xs" asChild>
                  <a href="#monographs">
                    View Full SmPC <ArrowRight className="w-3.5 h-3.5 ms-1.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 12.3.3 — DRUG MONOGRAPHS & SMPC LIBRARY
      ========================================================================= */}
      <section
        id="monographs"
        aria-labelledby="mono-heading"
        className="py-16 md:py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
                Regulatory Compendium
              </span>
              <h2
                id="mono-heading"
                className="text-display-md font-bold text-brand-navy font-heading tracking-tight"
              >
                Official Prescribing Summaries &amp; Monographs
              </h2>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search INN, brand, indication..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 text-xs bg-white border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMonographs.map((mono) => (
              <Card
                key={mono.id}
                className="p-6 bg-slate-50/70 border-slate-200/90 rounded-2xl flex flex-col justify-between hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline" className="text-[10px] font-mono bg-blue-50 text-brand-navy border-blue-200">
                      {mono.category}
                    </Badge>
                    <span className="font-mono text-slate-500 text-[11px]">{mono.fileSize}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-brand-navy">
                      {mono.drugName}
                    </h3>
                    <div className="text-xs font-mono text-brand-primary">{mono.inn}</div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    <strong>Approved Indication:</strong> {mono.indication}
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 font-sans">
                    <strong>Standard Dosing:</strong> {mono.dosingSummary}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">FDA • EMA • SFDA</span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center gap-1.5 text-xs h-9 px-3"
                    onClick={() => {
                      alert(`Downloading Prescribing SmPC for: ${mono.drugName}`);
                    }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Monograph</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 12.3.4 — MEDICAL AFFAIRS INQUIRY & PHARMACOVIGILANCE DESK
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-start">
          {/* Medical Affairs Inquiry Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Direct Medical Affairs Communication
              </span>
              <h2 className="text-3xl font-bold font-heading text-white">
                Submit an Investigator or Clinical Inquiry
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Our doctoral medical liaisons respond to verified HCP queries concerning drug-drug interactions, clinical trials inclusion, and off-label scientific evidence within 4 hours.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white font-heading">
                  Inquiry Transmitted to Medical Affairs
                </h3>
                <p className="text-xs text-slate-200">
                  Your request has been routed to the Medical Liaison On-Duty. A doctoral response will be delivered to your registered institutional email.
                </p>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setInquirySent(false)}
                  className="mt-2 text-xs"
                >
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                <div className="space-y-1.5">
                  <label htmlFor="inquirySubject" className="text-xs font-mono text-slate-200">
                    Clinical Subject / Molecule *
                  </label>
                  <Input
                    id="inquirySubject"
                    required
                    placeholder="e.g. Zulatinib interaction with CYP3A4 inhibitors"
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/60 h-10 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="inquiryText" className="text-xs font-mono text-slate-200">
                    Medical Question &amp; Patient Context *
                  </label>
                  <textarea
                    id="inquiryText"
                    required
                    rows={4}
                    placeholder="Please specify relevant clinical questions, dosing considerations, or trial protocol queries (avoid including patient personal identifying information)..."
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder:text-white/60 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 4-Hour Response SLA
                  </span>
                  <Button
                    type="submit"
                    variant="vitality"
                    size="md"
                    className="text-xs font-semibold px-5"
                  >
                    Transmit Inquiry
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* 24/7 Pharmacovigilance Safety Hotline */}
          <div className="space-y-6 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Patient Safety &amp; GxP Vigilance
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">
                24/7 Pharmacovigilance &amp; Adverse Event Reporting
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                In compliance with FDA 21 CFR 314.80, EMA Directive 2001/83/EC, and global GxP safety reporting mandates, healthcare professionals are encouraged to report any suspected adverse reactions immediately.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-slate-400 text-[10px]">GLOBAL 24/7 TOLL-FREE SAFETY HOTLINE</div>
                    <div className="text-base font-bold text-white">+41 61 284 9000</div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]">
                  LIVE 24/7
                </Badge>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/10 flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px]">DEDICATED SAFETY EMAIL</div>
                  <div className="text-sm font-bold text-white">pharmacovigilance@miragepharma.com</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs space-y-1.5 font-sans">
              <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                <AlertTriangle className="w-4 h-4" /> Mandatory Reporting Information:
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-100/80">
                <li>Patient initials, age, and biological sex</li>
                <li>Suspected medicinal product and batch/lot number</li>
                <li>Adverse event description and clinical outcome</li>
                <li>Reporting healthcare provider contact details</li>
              </ul>
            </div>

            <div className="pt-2">
              {adverseReportSubmitted ? (
                <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 text-center text-xs">
                  Expedited Safety Form Packet Downloaded. Please fax or email immediately.
                </div>
              ) : (
                <Button
                  variant="glass"
                  size="md"
                  onClick={() => {
                    setAdverseReportSubmitted(true);
                  }}
                  className="w-full text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download CIOMS / MedWatch Expedited Reporting Form
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
