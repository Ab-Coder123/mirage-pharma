import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, PhoneCall, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-brand-navy text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 text-xs z-30 relative select-none"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Section: Brand Identity & Regulatory Disclaimers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Pillar */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-block bg-white px-3.5 py-2 rounded-xl shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <Image
                src="/brand/mirage_pharma_logo.png"
                alt="Mirage Pharma — Healthy Life"
                width={150}
                height={65}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-white/70 max-w-sm leading-relaxed text-xs">
              Values-led, performance-driven pharmaceutical enterprise advancing clinical innovation, molecular biotechnology, and global cold-chain reliability for a healthier humanity.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                GxP Validated
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-emerald-400">
                21 CFR Part 11 Compliant
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-emerald-400">
                ISO 9001:2015 Certified
              </span>
            </div>
          </div>

          {/* Column 1: Science & Pipelines */}
          <div className="space-y-3">
            <h2 className="font-semibold text-white text-xs uppercase tracking-wider font-mono">
              Research &amp; Pipeline
            </h2>
            <ul className="space-y-2 text-white/70 font-sans">
              <li>
                <Link href="/science" className="hover:text-emerald-400 transition-colors">
                  Oncology Matrix (MRG-701)
                </Link>
              </li>
              <li>
                <Link href="/science" className="hover:text-emerald-400 transition-colors">
                  Neurodegenerative Research
                </Link>
              </li>
              <li>
                <Link href="/science" className="hover:text-emerald-400 transition-colors">
                  Immunology Bio-Nanocarriers
                </Link>
              </li>
              <li>
                <Link href="/science" className="hover:text-emerald-400 transition-colors">
                  Clinical Trial Dossier Registry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Operations, Cold-Chain & ESG */}
          <div className="space-y-3">
            <h2 className="font-semibold text-white text-xs uppercase tracking-wider font-mono">
              Operations &amp; ESG
            </h2>
            <ul className="space-y-2 text-white/70 font-sans">
              <li>
                <Link href="/quality" className="hover:text-emerald-400 transition-colors">
                  Cold-Chain IoT (-80°C to 8°C)
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-emerald-400 transition-colors">
                  Quality Assurance &amp; GxP Audits
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-emerald-400 transition-colors">
                  Net-Zero Sustainable Operations
                </Link>
              </li>
              <li>
                <Link href="/b2b" className="hover:text-emerald-400 transition-colors">
                  Global Supply &amp; B2B Distribution
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Regulatory & Safety */}
          <div className="space-y-3">
            <h2 className="font-semibold text-white text-xs uppercase tracking-wider font-mono">
              Safety &amp; Compliance
            </h2>
            <ul className="space-y-2 text-white/70 font-sans">
              <li>
                <Link href="/hcp-portal" className="hover:text-emerald-400 transition-colors">
                  Healthcare Professional Portal
                </Link>
              </li>
              <li>
                <Link href="/hcp-portal#pharmacovigilance" className="hover:text-emerald-400 transition-colors">
                  Pharmacovigilance Reporting
                </Link>
              </li>
              <li>
                <Link href="/quality#fda-ema" className="hover:text-emerald-400 transition-colors">
                  FDA &amp; EMA Harmonization
                </Link>
              </li>
              <li>
                <Link href="/about#governance" className="hover:text-emerald-400 transition-colors">
                  Corporate Governance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Headquarters & Pharmacovigilance Emergency Hotline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 text-white/80">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="text-xs font-semibold text-white">Global Headquarters</div>
              <div className="text-[11px] text-white/60">Basel, Switzerland • Boston, USA • Cairo, Egypt</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="text-xs font-semibold text-white">24/7 Pharmacovigilance Hotline</div>
              <div className="text-[11px] text-white/60 font-mono">+41 61 284 8111 (Adverse Events)</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="text-xs font-semibold text-white">Medical Affairs &amp; Safety</div>
              <div className="text-[11px] text-white/60 font-mono">safety.reporting@miragepharma.com</div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Legal Bottom Bar */}
        <div className="space-y-4 pt-4 text-white/50 text-[11px] leading-relaxed border-t border-white/10">
          <p>
            <strong>Regulatory Notice:</strong> Information on this digital platform is intended for informational and educational purposes in compliance with international pharmaceutical disclosure regulations. Investigational compounds depicted (e.g. MRG-701, MRG-520) are currently undergoing clinical trials and have not yet received final marketing authorization from the FDA or EMA. Healthcare professionals should refer to local approved product monographs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div>
              © {new Date().getFullYear()} Mirage Pharma Inc. All rights reserved. &ldquo;Healthy Life&rdquo; is a registered corporate trademark.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookie Preferences</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
