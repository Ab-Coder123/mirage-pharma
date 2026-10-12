'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Dna, FileText, Building2, ShieldCheck, CornerDownLeft } from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  category: 'Clinical Pipeline' | 'Therapeutics' | 'Quality & ESG' | 'Corporate' | 'Regulatory';
  title: string;
  subtitle: string;
  badge: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SEARCH_DATABASE: SearchItem[] = [
  {
    id: 'mrg-701',
    category: 'Clinical Pipeline',
    title: 'MRG-701 Immuno-Oncology Solid Tumors',
    subtitle: 'Phase III Multicenter Registration Trial (Fast-Track)',
    badge: 'Phase III',
    href: '/science',
    icon: Dna,
  },
  {
    id: 'mrg-520',
    category: 'Clinical Pipeline',
    title: 'MRG-520 Neurodegenerative Targeted Peptide',
    subtitle: 'Phase II Biomarker-Driven Clinical Protocol',
    badge: 'Phase II',
    href: '/science',
    icon: Dna,
  },
  {
    id: 'cardio-portfolio',
    category: 'Therapeutics',
    title: 'Precision Cardiology & Lipid Regulators',
    subtitle: 'Commercial Rx Portfolio & SmPC Prescribing Monographs',
    badge: 'Commercial Rx',
    href: '/therapeutics',
    icon: FileText,
  },
  {
    id: 'oncology-portfolio',
    category: 'Therapeutics',
    title: 'Precision Oncology Targeted Therapies',
    subtitle: 'Molecular Nanocarriers & Kinase Inhibitors',
    badge: 'Commercial Rx',
    href: '/therapeutics',
    icon: FileText,
  },
  {
    id: 'cold-chain-iot',
    category: 'Quality & ESG',
    title: 'Global Cold-Chain IoT Telemetry Standards',
    subtitle: '-80°C to 8°C Real-Time Validation & GxP Verification',
    badge: 'GxP / WHO',
    href: '/quality',
    icon: ShieldCheck,
  },
  {
    id: 'leadership',
    category: 'Corporate',
    title: 'Executive Leadership & Scientific Advisory Board',
    subtitle: 'Chairman Tarek El Attar & Executive Management',
    badge: 'About Us',
    href: '/about',
    icon: Building2,
  },
  {
    id: 'b2b-licensing',
    category: 'Corporate',
    title: 'Global Partnering & Strategic Out-Licensing',
    subtitle: '4-Step B2B Collaboration & Distribution Inquiry',
    badge: 'Partnering',
    href: '/b2b',
    icon: Building2,
  },
  {
    id: 'hcp-verification',
    category: 'Regulatory',
    title: 'Healthcare Professional (HCP) Gated Dossier Portal',
    subtitle: 'Adverse Event Pharmacovigilance & Monograph Access',
    badge: 'HCP Portal',
    href: '/hcp-portal',
    icon: ShieldCheck,
  },
];

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  // Sanitized filter
  const cleanQuery = React.useMemo(() => {
    return query.replace(/[^a-zA-Z0-9\s-_]/g, '').trim().toLowerCase();
  }, [query]);

  const filteredItems = React.useMemo(() => {
    if (!cleanQuery) return SEARCH_DATABASE;
    return SEARCH_DATABASE.filter(
      (item) =>
        item.title.toLowerCase().includes(cleanQuery) ||
        item.subtitle.toLowerCase().includes(cleanQuery) ||
        item.category.toLowerCase().includes(cleanQuery) ||
        item.badge.toLowerCase().includes(cleanQuery)
    );
  }, [cleanQuery]);

  // Reset active index when query changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [cleanQuery]);

  // Lock body scroll and autofocus
  React.useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setActiveIndex(0);
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 30);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const selectItem = React.useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [router, onClose]
  );

  // Keyboard navigation: Arrow keys, Enter, Escape, and Tab trapping
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length
        );
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredItems.length === 0
            ? 0
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[activeIndex];
        if (selected) {
          selectItem(selected.href);
        }
        return;
      }

      // Simple focus trap
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, activeIndex, selectItem, onClose]);

  // Ensure active element is scrolled into view
  React.useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(
      `#search-item-${activeIndex}`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Clinical & Corporate Quick Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-brand-navy/60 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3 bg-white">
          <Search className="w-5 h-5 text-brand-primary shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={filteredItems.length > 0}
            aria-controls="quick-search-results"
            aria-autocomplete="list"
            aria-activedescendant={
              filteredItems.length > 0 ? `search-item-${activeIndex}` : undefined
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clinical pipelines, therapeutic areas, GxP audits…"
            className="w-full bg-transparent text-sm text-brand-navy placeholder:text-slate-400 outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-brand-primary outline-none"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Results Listbox */}
        <div
          ref={listRef}
          id="quick-search-results"
          role="listbox"
          aria-label="Search suggestions"
          className="flex-1 overflow-y-auto p-2 space-y-1"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  id={`search-item-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectItem(item.href)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-primary/10 text-brand-navy shadow-sm'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-brand-primary text-white'
                          : 'bg-slate-100 text-brand-navy'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-brand-navy flex items-center gap-2">
                        <span className="truncate">{item.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ms-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {item.badge}
                    </span>
                    {isSelected ? (
                      <CornerDownLeft className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-sm text-slate-500">
              <p className="font-medium text-brand-navy">No clinical assets match &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for oncology, cold-chain, or Phase III molecules.
              </p>
            </div>
          )}
        </div>

        {/* Modal Keyboard Legend Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded">↑</kbd> <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded">↓</kbd> Navigate</span>
            <span><kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded">↵</kbd> Select</span>
          </div>
          <span><kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded">ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
