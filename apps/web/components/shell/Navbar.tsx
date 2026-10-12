'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@mirage/ui';
import {
  Search,
  Menu,
  ArrowRight,
  Globe,
  ChevronDown,
  Building2,
  Newspaper,
  Stethoscope,
  ShieldCheck,
} from 'lucide-react';
import { QuickSearchModal } from './QuickSearchModal';
import { MobileDrawer } from './MobileDrawer';

export interface NavRoute {
  href: string;
  label: string;
  number: string;
  category?: 'primary' | 'secondary';
  description?: string;
  badge?: string;
}

export const NAV_ROUTES: NavRoute[] = [
  { href: '/', label: 'Home', number: '01', category: 'primary' },
  { href: '/science', label: 'Science & Pipeline', number: '02', category: 'primary' },
  { href: '/therapeutics', label: 'Therapeutics', number: '03', category: 'primary' },
  { href: '/quality', label: 'Quality & ESG', number: '04', category: 'primary' },
  { href: '/about', label: 'About Us', number: '05', category: 'primary' },
  {
    href: '/b2b',
    label: 'Global B2B & Licensing',
    number: '06',
    category: 'secondary',
    description: 'Commercial partnerships and out-licensing',
  },
  {
    href: '/newsroom',
    label: 'Newsroom & Media',
    number: '07',
    category: 'secondary',
    description: 'Press releases, clinical readouts, and publications',
  },
  {
    href: '/hcp-portal',
    label: 'HCP Medical Portal',
    number: '08',
    category: 'secondary',
    badge: 'Verified',
    description: 'Medical information & investigator resources',
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const searchButtonRef = React.useRef<HTMLButtonElement>(null);
  const mobileButtonRef = React.useRef<HTMLButtonElement>(null);
  const moreMenuRef = React.useRef<HTMLDivElement>(null);

  // Keyboard shortcut: ⌘K or Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener for "More" dropdown
  React.useEffect(() => {
    if (!isMoreMenuOpen) return undefined;

    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMoreMenuOpen]);

  // Passive, throttled scroll-direction listener for intelligent reveal/hide
  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Background elevation indicator
          setIsScrolled(currentScrollY > 12);

          // Scroll direction logic: hide on scroll down (after 90px), reveal on scroll up
          if (currentScrollY > 90 && currentScrollY > lastScrollY.current + 4) {
            setIsVisible(false);
            setIsMoreMenuOpen(false); // Close dropdown if scrolling down
          } else if (currentScrollY < lastScrollY.current - 4 || currentScrollY <= 20) {
            setIsVisible(true);
          }

          lastScrollY.current = Math.max(0, currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCloseSearch = React.useCallback(() => {
    setIsSearchOpen(false);
    searchButtonRef.current?.focus();
  }, []);

  const handleCloseMobile = React.useCallback(() => {
    setIsMobileOpen(false);
    mobileButtonRef.current?.focus();
  }, []);

  // Primary routes for desktop (01-05)
  const primaryRoutes = React.useMemo(() => NAV_ROUTES.filter((r) => r.category === 'primary'), []);
  // Secondary routes for "More" dropdown on laptops (06-08)
  const secondaryRoutes = React.useMemo(() => NAV_ROUTES.filter((r) => r.category === 'secondary'), []);

  // Check if any secondary route is currently active
  const isSecondaryActive = secondaryRoutes.some((route) =>
    route.href === '/' ? pathname === '/' : pathname.startsWith(route.href)
  );

  return (
    <>
      <header
        role="banner"
        className={`sticky top-0 z-40 transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${isScrolled
            ? 'shadow-sm border-b border-brand-border-subtle/90 bg-white/92 backdrop-blur-xl'
            : 'border-b border-white/60 bg-white/80 backdrop-blur-lg'
          }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 lg:gap-3">
          {/* ===================================================================
              BRAND IDENTITY (Responsive Logo Sizing)
          =================================================================== */}
          <Link
            href="/"
            className="flex items-center shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-primary p-0.5 transition-opacity hover:opacity-90"
            aria-label="Mirage Pharma — Return to Homepage"
          >
            <div className="relative h-8 sm:h-10 md:h-11 w-28 sm:w-32 md:w-36 flex items-center">
              <Image
                src="/brand/mirage_pharma_logo.png"
                alt="Mirage Pharma — Healthy Life"
                width={144}
                height={44}
                priority
                className="h-full w-auto object-contain object-left"
              />
            </div>
          </Link>

          {/* ===================================================================
              DESKTOP & LAPTOP NAVIGATION (Breakpoints: xl: & 2xl:)
          =================================================================== */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-1 2xl:gap-2 text-[13px] font-medium text-brand-navy whitespace-nowrap shrink-0"
          >
            {primaryRoutes.map((route) => {
              const isActive =
                route.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(route.href);

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`group relative py-2 px-2.5 xl:px-3 rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-primary whitespace-nowrap inline-flex items-center shrink-0 ${isActive
                    ? 'text-brand-primary font-semibold bg-brand-primary/5'
                    : 'text-slate-700 hover:text-brand-primary hover:bg-slate-50'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-[10px] font-mono text-slate-400 me-1.5 group-hover:text-brand-primary/70 transition-colors shrink-0">
                    {route.number}
                  </span>
                  <span className="whitespace-nowrap select-none">{route.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 inset-x-2.5 h-0.5 bg-brand-primary rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}

            {/* "More" Dropdown Menu on Laptops & Desktops */}
            <div className="relative shrink-0" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setIsMoreMenuOpen((prev) => !prev)}
                aria-expanded={isMoreMenuOpen}
                aria-haspopup="true"
                aria-controls="desktop-more-menu"
                className={`whitespace-nowrap inline-flex items-center shrink-0 gap-1 py-2 px-2.5 xl:px-3 rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer ${isSecondaryActive || isMoreMenuOpen
                  ? 'text-brand-primary font-semibold bg-brand-primary/5'
                  : 'text-slate-700 hover:text-brand-primary hover:bg-slate-50'
                  }`}
              >
                <span className="whitespace-nowrap">More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${isMoreMenuOpen ? 'rotate-180 text-brand-primary' : 'text-slate-400'
                    }`}
                  aria-hidden="true"
                />
                {isSecondaryActive && (
                  <span
                    className="absolute bottom-0 inset-x-2.5 h-0.5 bg-brand-primary rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>

              {/* Dropdown Panel */}
              {isMoreMenuOpen && (
                <div
                  id="desktop-more-menu"
                  role="menu"
                  aria-label="Additional Portals and Resources"
                  className="absolute end-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Enterprise Ecosystem
                  </div>
                  <div className="py-1 space-y-1">
                    {secondaryRoutes.map((route) => {
                      const isActive = pathname.startsWith(route.href);
                      const Icon =
                        route.href === '/b2b'
                          ? Building2
                          : route.href === '/newsroom'
                            ? Newspaper
                            : Stethoscope;

                      return (
                        <Link
                          key={route.href}
                          href={route.href}
                          role="menuitem"
                          onClick={() => setIsMoreMenuOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${isActive
                            ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                            : 'hover:bg-slate-50 text-slate-700 hover:text-brand-navy'
                            }`}
                        >
                          <div
                            className={`p-2 rounded-lg shrink-0 mt-0.5 ${isActive
                              ? 'bg-brand-primary text-white'
                              : 'bg-slate-100 text-slate-500'
                              }`}
                          >
                            <Icon className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 text-xs">
                              <span className="font-medium">{route.label}</span>
                              {route.badge && (
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                                  {route.badge}
                                </span>
                              )}
                            </div>
                            {route.description && (
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                                {route.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-1 pt-2 border-t border-slate-100 px-3 py-2 bg-slate-50/70 rounded-xl flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      GxP Compliant Access
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">21 CFR P11</span>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ===================================================================
              UTILITY TOOLS & CTAS (Responsive Ordering & Touch Targets)
          =================================================================== */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Quick Search Trigger (Accessible: Min 44px tap target on mobile) */}
            <button
              ref={searchButtonRef}
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center gap-2 h-10 min-w-[40px] sm:min-w-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white/80 text-xs text-slate-600 hover:bg-white hover:text-brand-navy hover:border-slate-300 transition-all focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none cursor-pointer shadow-2xs"
              aria-label="Open Quick Search modal (⌘K or Ctrl+K)"
              aria-keyshortcuts="Control+K Meta+K"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-primary" aria-hidden="true" />
              <span className="hidden md:inline font-normal text-slate-500">Quick Search…</span>
              <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher Pill (Desktop & Tablet) */}
            <button
              type="button"
              className="hidden sm:flex items-center gap-1.5 h-10 px-2.5 rounded-xl border border-slate-200/80 text-xs text-slate-600 hover:text-brand-primary hover:bg-white hover:border-slate-300 transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none"
              aria-label="Language selection"
              title="English (active) / العربية"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span className="font-semibold text-brand-navy">EN</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 hover:text-brand-primary">ع</span>
            </button>

            {/* Primary B2B Partner CTA (Visible on tablet & desktop) */}
            <Button
              variant="primary"
              size="sm"
              asChild
              className="hidden md:inline-flex h-10 px-4 text-xs shadow-sm shadow-brand-primary/20"
            >
              <Link href="/b2b" className="flex items-center gap-1.5 font-semibold">
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </Button>

            {/* Mobile Hamburger Toggle (Accessible 44x44px Touch Target) */}
            <button
              ref={mobileButtonRef}
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="xl:hidden flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-brand-navy bg-white/80 hover:bg-slate-100 border border-slate-200/80 transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none cursor-pointer"
              aria-label="Open mobile navigation menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <Menu className="w-5 h-5 text-brand-navy" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Global Modals & Drawers */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={handleCloseSearch} />
      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={handleCloseMobile}
        routes={NAV_ROUTES}
        onOpenSearch={() => {
          setIsMobileOpen(false);
          setIsSearchOpen(true);
        }}
      />
    </>
  );
}
