import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TelemetryStrip } from '../components/shell/TelemetryStrip';
import { Navbar, NAV_ROUTES } from '../components/shell/Navbar';
import { QuickSearchModal } from '../components/shell/QuickSearchModal';
import { MobileDrawer } from '../components/shell/MobileDrawer';
import { Footer } from '../components/shell/Footer';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Phase 4: Global Shell & Navigation Engine', () => {
  describe('Tier 4.1: TelemetryStrip', () => {
    it('renders persistent GxP telemetry and clinical asset metrics', () => {
      render(<TelemetryStrip />);
      expect(screen.getByText(/GxP VALIDATED/i)).toBeInTheDocument();
      expect(screen.getByText(/42 ACTIVE ASSETS/i)).toBeInTheDocument();
      expect(screen.getByText(/FDA & EMA HARMONIZED/i)).toBeInTheDocument();
    });

    it('provides quick links to HCP Verification and Investors portals', () => {
      render(<TelemetryStrip />);
      const hcpLink = screen.getByRole('link', { name: /HCP Verification Portal/i });
      const investorLink = screen.getByRole('link', { name: /Investors & ESG/i });
      expect(hcpLink).toHaveAttribute('href', '/hcp-portal');
      expect(investorLink).toHaveAttribute('href', '/investors');
    });

    it('enforces semantic region landmark and fixed height', () => {
      const { container } = render(<TelemetryStrip />);
      const aside = container.querySelector('aside');
      expect(aside).toHaveAttribute('role', 'region');
      expect(aside?.className).toContain('h-9');
    });
  });

  describe('Tier 4.2: Navbar & QuickSearch Trigger', () => {
    it('renders all numbered routes and branding', () => {
      render(<Navbar />);
      expect(screen.getByLabelText(/Mirage Pharma Homepage/i)).toBeInTheDocument();
      expect(screen.getByText(/01\//i)).toBeInTheDocument();
      expect(screen.getByText(/Science & Pipeline/i)).toBeInTheDocument();
    });

    it('renders Quick Search button with ⌘K badge', () => {
      render(<Navbar />);
      const searchBtn = screen.getByLabelText(/Open Quick Search modal/i);
      expect(searchBtn).toBeInTheDocument();
      expect(screen.getByText('⌘K')).toBeInTheDocument();
    });
  });

  describe('Tier 4.2: QuickSearchModal Keyboard & Interaction', () => {
    it('filters items correctly and escapes dangerous characters', () => {
      render(<QuickSearchModal isOpen={true} onClose={vi.fn()} />);
      const input = screen.getByRole('combobox');

      fireEvent.change(input, { target: { value: 'MRG-701' } });
      expect(screen.getByText(/MRG-701 Immuno-Oncology/i)).toBeInTheDocument();

      // Test sanitization: dangerous script tags should be stripped
      fireEvent.change(input, { target: { value: '<script>alert(1)</script>' } });
      expect(screen.queryByText(/alert\(1\)/i)).not.toBeInTheDocument();
    });

    it('closes on Escape key press', () => {
      const handleClose = vi.fn();
      render(<QuickSearchModal isOpen={true} onClose={handleClose} />);
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe('Tier 4.3: MobileDrawer', () => {
    it('renders accessible mobile navigation list and closes on Escape', () => {
      const handleClose = vi.fn();
      render(<MobileDrawer isOpen={true} onClose={handleClose} routes={NAV_ROUTES} />);
      expect(screen.getByLabelText('Mobile Navigation Drawer')).toBeInTheDocument();
      expect(screen.getByText('Corporate Culture')).toBeInTheDocument();

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe('Tier 4.4: Regulatory Footer', () => {
    it('renders 24/7 pharmacovigilance hotline and global headquarters', () => {
      render(<Footer />);
      expect(screen.getByText(/\+41 61 284 8111/i)).toBeInTheDocument();
      expect(screen.getByText(/safety\.reporting@miragepharma\.com/i)).toBeInTheDocument();
      expect(screen.getByText(/Basel, Switzerland • Boston, USA • Cairo, Egypt/i)).toBeInTheDocument();
    });

    it('displays mandatory GxP and FDA/EMA disclosures', () => {
      render(<Footer />);
      expect(screen.getByText(/GxP Validated/i)).toBeInTheDocument();
      expect(screen.getByText(/21 CFR Part 11 Compliant/i)).toBeInTheDocument();
      expect(screen.getByText(/Regulatory Notice:/i)).toBeInTheDocument();
    });
  });
});
