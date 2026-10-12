import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Button } from '../src/Button';
import { Badge } from '../src/Badge';
import { StatusPip } from '../src/StatusPip';
import { Card } from '../src/Card';
import { Input } from '../src/Input';

describe('Phase 3 — Atomic UI Primitives & Web Interface Guidelines Verification', () => {
  it('renders Button with semantic button tag, variants, and accessible focus ring classes', () => {
    const html = renderToString(React.createElement(Button, { variant: 'primary' }, 'Submit Protocol'));
    expect(html).toContain('Submit Protocol');
    expect(html).toContain('focus-visible:ring-2');
    expect(html).toContain('<button');
  });

  it('renders Badge with high contrast semantic color classes', () => {
    const html = renderToString(React.createElement(Badge, { variant: 'vitality' }, 'Phase III Recruiting'));
    expect(html).toContain('Phase III Recruiting');
    expect(html).toContain('bg-[#35AB38]/10');
  });

  it('renders StatusPip with role="status" and distinct telemetry pulsing classes', () => {
    const html = renderToString(
      React.createElement(StatusPip, { status: 'nominal', label: '100% NOMINAL' })
    );
    expect(html).toContain('role="status"');
    expect(html).toContain('100% NOMINAL');
    expect(html).toContain('bg-emerald-500');
  });

  it('renders Card with specular hud-glass styling and hover transition states', () => {
    const html = renderToString(
      React.createElement(Card, { variant: 'interactive' }, 'Clinical Trial Dossier')
    );
    expect(html).toContain('Clinical Trial Dossier');
    expect(html).toContain('hud-glass');
    expect(html).toContain('hover:shadow-hud-glow');
  });

  it('renders Input with semantic label association, error alert, and aria-invalid attributes', () => {
    const html = renderToString(
      React.createElement(Input, {
        label: 'Clinical Investigator ID',
        id: 'investigator-id',
        error: 'Invalid NPI number format',
      })
    );
    expect(html).toContain('for="investigator-id"');
    expect(html).toContain('id="investigator-id"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('role="alert"');
    expect(html).toContain('Invalid NPI number format');
  });
});
