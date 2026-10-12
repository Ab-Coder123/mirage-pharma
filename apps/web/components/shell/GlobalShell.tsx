import * as React from 'react';
import { TelemetryStrip } from './TelemetryStrip';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackgroundCanvas } from '../3d/BackgroundCanvas';

export interface GlobalShellProps {
  children: React.ReactNode;
}

export function GlobalShell({ children }: GlobalShellProps) {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative selection:bg-brand-primary/20 text-brand-navy">
      {/* WCAG 2.1 AAA Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-brand-primary focus:text-white focus:text-xs focus:font-semibold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-green"
      >
        Skip to main content
      </a>

      {/* 3D WebGL Canvas Layer (Fixed Background Viewport) */}
      <BackgroundCanvas />

      {/* Top Persistent Regulatory Telemetry Strip */}
      <TelemetryStrip />

      {/* Sticky Main Glassmorphic Navigation Bar */}
      <Navbar />

      {/* Dynamic Main Content Landmark */}
      <main id="main-content" tabIndex={-1} className="flex-1 relative z-10 flex flex-col outline-none">
        {children}
      </main>

      {/* Corporate Regulatory Footer */}
      <Footer />
    </div>
  );
}
