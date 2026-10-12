'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  X,
  ArrowRight,
  Shield,
  Globe,
  Search,
  PhoneCall,
  FileCheck,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@mirage/ui';
import type { NavRoute } from './Navbar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  routes: NavRoute[];
  onOpenSearch?: () => void;
}

export function MobileDrawer({ isOpen, onClose, routes, onOpenSearch }: MobileDrawerProps) {
  const pathname = usePathname();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  // Body scroll lock & focus management
  React.useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation & Escape key dismiss
  React.useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 xl:hidden flex justify-end"
    >
      {/* Dark backdrop overlay with blur */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md h-full bg-[#021832] text-white flex flex-col shadow-2xl z-10 border-s border-white/10 animate-in slide-in-from-end duration-300"
      >
        {/* ===================================================================
            DRAWER HEADER
        =================================================================== */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0 bg-brand-navy/80">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-28 relative">
              <Image
                src="/brand/mirage_pharma_logo.png"
                alt="Mirage Pharma"
                width={120}
                height={32}
                className="h-full w-auto object-contain brightness-0 invert"
              />
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* ===================================================================
            DRAWER SEARCH TRIGGER (Mobile UX)
        =================================================================== */}
        <div className="px-5 pt-4 pb-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs text-white/80 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none cursor-pointer"
            aria-label="Search clinical trials, molecules, or products"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="text-white/70">Search clinical trials, SmPC...</span>
            </div>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-emerald-300 border border-white/10">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* ===================================================================
            SCROLLABLE NAVIGATION ROUTES
        =================================================================== */}
        <nav
          aria-label="Mobile Primary Routes"
          className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 scrollbar-thin scrollbar-thumb-white/20"
        >
          <div className="px-2 py-1 text-[10px] font-mono tracking-wider uppercase text-white/40">
            Navigation Matrix
          </div>

          {routes.map((route) => {
            const isActive =
              route.href === '/'
                ? pathname === '/'
                : pathname.startsWith(route.href);

            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={onClose}
                className={`flex items-center justify-between min-h-[48px] py-2.5 px-3 rounded-xl border transition-all group outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive
                    ? 'bg-brand-primary/25 border-brand-primary/40 text-white font-semibold'
                    : 'border-transparent text-white/80 hover:bg-white/5 hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-mono font-semibold ${
                      isActive ? 'text-emerald-400' : 'text-white/40 group-hover:text-emerald-400/80'
                    }`}
                  >
                    {route.number}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm tracking-tight">{route.label}</span>
                    {route.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        {route.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  <ArrowRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                      isActive ? 'text-emerald-400' : 'text-white/30 group-hover:text-white/80'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}

          {/* Rapid Medical & Investigator Quick Links */}
          <div className="pt-4 mt-2 border-t border-white/10 space-y-2">
            <div className="px-2 text-[10px] font-mono tracking-wider uppercase text-white/40">
              Direct Portals
            </div>

            <Link
              href="/hcp-portal"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white/90 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-medium text-white">HCP Verification Portal</div>
                  <div className="text-[10px] text-white/50">SmPC &amp; Medical Inquiries</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/40" />
            </Link>

            <Link
              href="/b2b"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white/90 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-sky-400" />
                <div>
                  <div className="font-medium text-white">B2B Partnering &amp; Licensing</div>
                  <div className="text-[10px] text-white/50">Supply Chain &amp; Contracts</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/40" />
            </Link>
          </div>

          {/* Language Switcher Section */}
          <div className="pt-4 border-t border-white/10 px-2 py-2 flex items-center justify-between text-xs text-white/70">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Language:</span>
            </div>
            <div className="flex items-center gap-2 font-medium bg-white/10 px-2.5 py-1 rounded-lg">
              <span className="text-emerald-400 font-semibold underline">English</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80 hover:text-white cursor-pointer">العربية (RTL)</span>
            </div>
          </div>
        </nav>

        {/* ===================================================================
            DRAWER FOOTER & CALL-TO-ACTION
        =================================================================== */}
        <div className="p-4 border-t border-white/10 space-y-2.5 shrink-0 bg-brand-navy/95">
          <Button variant="vitality" size="md" className="w-full h-11 text-xs font-semibold shadow-lg shadow-emerald-500/20" asChild>
            <Link href="/b2b" onClick={onClose} className="flex items-center justify-center gap-2">
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-white/60 font-mono">
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span>24/7 Hotline: +41 61 284 9000</span>
          </div>

          <div className="text-center text-[10px] text-white/40 font-mono tracking-tight pt-1">
            <Shield className="w-3 h-3 inline-block me-1 text-emerald-400/80" />
            GxP • FDA 21 CFR • ISO 9001:2015
          </div>
        </div>
      </div>
    </div>
  );
}
