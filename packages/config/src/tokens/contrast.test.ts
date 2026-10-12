import { describe, it, expect } from 'vitest';
import { brandColors } from './colors';
import {
  calculateContrastRatio,
  evaluateWcagCompliance,
  calculateLuminance,
} from './contrast';

describe('Phase 2 - Brand Palette & WCAG AAA Contrast Verification Engine', () => {
  describe('Relative Luminance Calculation', () => {
    it('calculates 1.0 for pure white #FFFFFF', () => {
      expect(calculateLuminance('#FFFFFF')).toBeCloseTo(1.0, 2);
    });

    it('calculates 0.0 for pure black #000000', () => {
      expect(calculateLuminance('#000000')).toBeCloseTo(0.0, 2);
    });
  });

  describe('WCAG 2.1 AAA Contrast Compliance (Tier 2.1)', () => {
    it('enforces Deep Pharma Navy on white meets WCAG AAA (>= 7.0:1) for body text', () => {
      const result = evaluateWcagCompliance(brandColors.navy.DEFAULT, '#FFFFFF');
      // Navy #023368 on #FFFFFF yields ~11.8:1
      expect(result.ratio).toBeGreaterThanOrEqual(11.0);
      expect(result.meetsNormalAAA).toBe(true);
      expect(result.meetsNormalAA).toBe(true);
    });

    it('enforces Deep Pharma Navy on Clinical Surface Neutral (#F8FAFC) meets WCAG AAA', () => {
      const result = evaluateWcagCompliance(brandColors.navy.DEFAULT, brandColors.surface.DEFAULT);
      expect(result.ratio).toBeGreaterThanOrEqual(10.5);
      expect(result.meetsNormalAAA).toBe(true);
    });

    it('enforces Dark Obsidian surface contrast against pure white text meets WCAG AAA (>= 7.0:1)', () => {
      const result = evaluateWcagCompliance('#FFFFFF', brandColors.surface.obsidian);
      // White on #020F24 yields ~18.5:1
      expect(result.ratio).toBeGreaterThanOrEqual(16.0);
      expect(result.meetsNormalAAA).toBe(true);
    });

    it('enforces Medical Blue Primary on light surface meets WCAG AA for large display titles (>= 3.0:1)', () => {
      const result = evaluateWcagCompliance(brandColors.primary.DEFAULT, '#FFFFFF');
      // Medical Blue #2878BC on white yields ~4.5:1
      expect(result.ratio).toBeGreaterThanOrEqual(4.0);
      expect(result.meetsLargeAA).toBe(true);
    });

    it('enforces Dark Obsidian against Bio-Glass Cyan Light meets WCAG AAA for headings', () => {
      const result = evaluateWcagCompliance(brandColors.cyan.light, brandColors.surface.obsidian);
      // #61C0E4 on #020F24 yields ~9.8:1
      expect(result.ratio).toBeGreaterThanOrEqual(7.0);
      expect(result.meetsNormalAAA).toBe(true);
    });

    it('enforces Vitality Green high-contrast dark shade meets WCAG AA against white', () => {
      const result = evaluateWcagCompliance(brandColors.green.dark, '#FFFFFF');
      // Vitality green dark #258327 on white meets AA (>= 4.5:1)
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
      expect(result.meetsNormalAA).toBe(true);
    });
  });
});
