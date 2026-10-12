import * as React from 'react';
import Link from 'next/link';
import { StatusPip } from '@mirage/ui';

export function TelemetryStrip() {
  return (
    <aside
      role="region"
      aria-label="Regulatory Telemetry & Quick Portals"
      className="h-8 sm:h-9 bg-brand-navy text-white text-xs px-3 sm:px-4 border-b border-white/10 z-40 relative flex items-center select-none"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
        {/* Real-time Telemetry Metrics */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-[10px] sm:text-[11px] font-mono">
          <StatusPip
            status="optimal"
            label="GxP VALIDATED"
            className="text-emerald-400 font-semibold shrink-0"
          />
          <span className="text-white/30 shrink-0" aria-hidden="true">•</span>
          <span className="text-white/90 truncate">
            <strong className="text-white font-semibold">42 ACTIVE ASSETS</strong>
          </span>
          <span className="hidden md:inline text-white/30 shrink-0" aria-hidden="true">•</span>
          <span className="hidden md:inline text-white/80 truncate">
            FDA &amp; EMA HARMONIZED
          </span>
          <span className="hidden xl:inline text-white/30 shrink-0" aria-hidden="true">•</span>
          <span className="hidden xl:inline text-white/70 truncate">
            COLD-CHAIN IOT: 100% NOMINAL (-80°C to 8°C)
          </span>
        </div>

        {/* Quick Portal Access */}
        <nav
          aria-label="Professional Portals"
          className="flex items-center gap-2 sm:gap-3 text-[11px] text-white/80 shrink-0 font-sans"
        >
          <Link
            href="/hcp-portal"
            className="hover:text-emerald-400 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none rounded px-1 sm:px-1.5 py-0.5 text-[10px] sm:text-[11px] text-white/90"
          >
            <span className="hidden xs:inline">HCP Verification</span>
            <span className="xs:hidden font-mono text-emerald-400">HCP</span>
          </Link>
          <span className="hidden sm:inline text-white/20" aria-hidden="true">|</span>
          <Link
            href="/quality"
            className="hidden sm:inline hover:text-brand-primary transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none rounded px-1.5 py-0.5 text-[11px]"
          >
            ESG &amp; Quality
          </Link>
        </nav>
      </div>
    </aside>
  );
}
