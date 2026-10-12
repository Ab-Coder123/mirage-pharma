'use client';

import * as React from 'react';
import { ShieldCheck, Award, Globe2, Sparkles } from 'lucide-react';

interface MetricItem {
  id: string;
  targetValue: number;
  suffix?: string;
  decimals?: number;
  label: string;
  detail: string;
  accentColor: string;
}

const METRICS: MetricItem[] = [
  {
    id: 'trials',
    targetValue: 42,
    label: 'Active Clinical Trials',
    detail: 'Across Phase I – III Pipelines',
    accentColor: 'text-brand-navy',
  },
  {
    id: 'countries',
    targetValue: 38,
    label: 'Countries Supplied',
    detail: 'Global Cold-Chain Network',
    accentColor: 'text-brand-primary',
  },
  {
    id: 'purity',
    targetValue: 99.98,
    suffix: '%',
    decimals: 2,
    label: 'Batch Purity Rating',
    detail: 'HPLC Analytical Verification',
    accentColor: 'text-brand-green',
  },
  {
    id: 'telemetry',
    targetValue: 24,
    suffix: '/7',
    label: 'Cold-Chain IoT Telemetry',
    detail: 'Live Multi-Sensor Satellite Tracking',
    accentColor: 'text-brand-navy',
  },
];

export function OperationalMetricsCounter() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [counts, setCounts] = React.useState<Record<string, number>>({
    trials: 0,
    countries: 0,
    purity: 0,
    telemetry: 0,
  });

  React.useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Immediate final values without animation
      setCounts({
        trials: 42,
        countries: 38,
        purity: 99.98,
        telemetry: 24,
      });
      setHasAnimated(true);
      return;
    }

    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const durationMs = 1800;
          const startTime = performance.now();

          const animateCounts = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / durationMs);
            // Cubic ease-out curve for physics-like deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              trials: Math.round(42 * easeOut),
              countries: Math.round(38 * easeOut),
              purity: parseFloat((99.98 * easeOut).toFixed(2)),
              telemetry: Math.round(24 * easeOut),
            });

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            } else {
              setCounts({
                trials: 42,
                countries: 38,
                purity: 99.98,
                telemetry: 24,
              });
            }
          };

          requestAnimationFrame(animateCounts);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(currentContainer);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className="w-full">
      {/* 4 Architectural Telemetry Metrics with tabular numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-slate-200">
        {METRICS.map((metric) => {
          const rawValue = counts[metric.id] ?? 0;
          const formatted =
            metric.decimals !== undefined
              ? rawValue.toFixed(metric.decimals)
              : rawValue.toString();

          return (
            <div
              key={metric.id}
              className="space-y-2.5 p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 transition-all hover:bg-white hover:shadow-sm hover:border-brand-primary/30"
            >
              <div
                className={`text-4xl lg:text-5xl font-extrabold font-mono tracking-tight tabular-numbers ${metric.accentColor}`}
                aria-label={`${metric.label}: ${metric.targetValue}${metric.suffix || ''}`}
              >
                <span>{formatted}</span>
                {metric.suffix && (
                  <span className="text-2xl lg:text-3xl font-semibold opacity-90">
                    {metric.suffix}
                  </span>
                )}
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 font-heading">
                {metric.label}
              </div>

              <div className="text-[11px] text-slate-600 font-sans">
                {metric.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Wall: Global Regulatory Accreditation Stamps */}
      <div
        className="pt-12 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-slate-700"
        aria-label="Regulatory Accreditation Stamps"
      >
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 border border-slate-200 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-brand-primary shrink-0" aria-hidden="true" />
          <span className="text-xs font-mono font-semibold tracking-wide">
            WHO GMP Certified
          </span>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 border border-slate-200 shadow-xs">
          <Award className="w-5 h-5 text-brand-green shrink-0" aria-hidden="true" />
          <span className="text-xs font-mono font-semibold tracking-wide">
            ISO 9001:2015 Accredited
          </span>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 border border-slate-200 shadow-xs">
          <Globe2 className="w-5 h-5 text-brand-navy shrink-0" aria-hidden="true" />
          <span className="text-xs font-mono font-semibold tracking-wide">
            FDA &amp; EMA Harmonized
          </span>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 border border-slate-200 shadow-xs">
          <Sparkles className="w-5 h-5 text-[#308995] shrink-0" aria-hidden="true" />
          <span className="text-xs font-mono font-semibold tracking-wide">
            21 CFR Part 11 Electronic Records
          </span>
        </div>
      </div>
    </div>
  );
}
