'use client';

import * as React from 'react';
import { Badge, Button, Card, Input } from '@mirage/ui';
import {
  Calendar,
  Download,
  Search,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: 'Press Release' | 'Clinical Readout' | 'Corporate' | 'ESG & Sustainability';
  date: string;
  readTime: string;
  summary: string;
  keyStats?: string;
  tags: string[];
}

interface WhitepaperItem {
  id: string;
  title: string;
  fileSize: string;
  publishedDate: string;
  type: string;
  description: string;
}

const ARTICLES: ArticleItem[] = [
  {
    id: 'art-01',
    title: 'Mirage Pharma Reports Positive Phase III Readout for Targeted Oncology Candidate MRG-701 in NSCLC',
    slug: 'mrg-701-phase-3-positive-readout',
    category: 'Clinical Readout',
    date: 'OCT 10, 2026',
    readTime: '4 MIN READ',
    summary:
      'Pivotal international Phase III trial demonstrates statistically significant improvement in Progression-Free Survival (PFS) and overall objective response rate across 840 metastatic lung cancer patients.',
    keyStats: 'HR: 0.62 (p < 0.001) • 42 Global Clinical Centers',
    tags: ['Oncology', 'Phase III', 'MRG-701', 'FDA Fast Track'],
  },
  {
    id: 'art-02',
    title: 'Mirage Pharma Completes Expansion of Basel Bio-Manufacturing Facility with 100% Net-Zero Accreditation',
    slug: 'basel-biomanufacturing-netzero-expansion',
    category: 'Corporate',
    date: 'SEP 28, 2026',
    readTime: '3 MIN READ',
    summary:
      'State-of-the-art continuous perfusion bioreactor suites commissioned in Basel, Switzerland, quadrupling clinical cold-chain biologics production with renewable hydroelectric power.',
    keyStats: '4x Capacity • Net-Zero Energy • ISO 14001:2015',
    tags: ['Manufacturing', 'Basel Hub', 'Capacity', 'Cleanroom'],
  },
  {
    id: 'art-03',
    title: 'New Clinical Whitepaper: Multi-Sensor IoT Telematics and Cold-Chain Cryopreservation at -80°C',
    slug: 'cold-chain-iot-telematics-whitepaper',
    category: 'ESG & Sustainability',
    date: 'SEP 14, 2026',
    readTime: '6 MIN READ',
    summary:
      'Technical treatise detailing zero-excursion protocol architectures, real-time satellite telemetry, and vacuum-insulated secondary shippers across international pharma freight routes.',
    keyStats: '99.998% Thermal Fidelity • 38 Countries Supplied',
    tags: ['Cold-Chain', 'IoT Telematics', 'Logistics', 'Quality'],
  },
  {
    id: 'art-04',
    title: 'Mirage Pharma to Present 6 Clinical Pipeline Updates at the 2026 European Society for Medical Oncology (ESMO)',
    slug: 'mirage-pharma-esmo-2026-presentations',
    category: 'Press Release',
    date: 'AUG 30, 2026',
    readTime: '2 MIN READ',
    summary:
      'Scientific leadership to deliver oral presentations on CD47/SIRPα checkpoint modulation, PCSK9 targeted peptides, and long-term immunogenicity biomarkers.',
    keyStats: '2 Oral Plenaries • 4 Poster Sessions',
    tags: ['ESMO', 'Clinical Trials', 'R&D', 'Presentations'],
  },
  {
    id: 'art-05',
    title: 'Compassionate Patient Access Program Reaches Milestone of 100,000 Doses Donated Across 14 Underserved Nations',
    slug: 'compassionate-access-100k-milestone',
    category: 'ESG & Sustainability',
    date: 'AUG 12, 2026',
    readTime: '5 MIN READ',
    summary:
      'Through collaborative public-health partnerships and philanthropic distribution channels, essential cardiovascular and oncologic therapies delivered at zero patient cost.',
    keyStats: '100,000+ Doses • 14 Emerging Nations • Zero Cost',
    tags: ['Patient Access', 'ESG', 'Global Health', 'Philanthropy'],
  },
  {
    id: 'art-06',
    title: 'FDA Grants Fast Track Designation to MRG-310 for Resistant Atherosclerotic Cardiovascular Disease',
    slug: 'fda-fast-track-mrg-310-cardiovascular',
    category: 'Clinical Readout',
    date: 'JUL 22, 2026',
    readTime: '3 MIN READ',
    summary:
      'Health authority recognizes the potential of once-quarterly PCSK9 targeted bio-conjugate to address unmet clinical need in high-risk patients refractory to standard statin therapy.',
    keyStats: 'FDA Fast Track • Phase IIb Active • 620 Patients',
    tags: ['Cardiology', 'MRG-310', 'FDA Fast Track', 'Lipidomics'],
  },
];

const WHITEPAPERS: WhitepaperItem[] = [
  {
    id: 'wp-01',
    title: 'Cold-Chain Cryogenic Integrity & IoT Telemetry Architecture (2026 Technical Report)',
    fileSize: '4.8 MB PDF',
    publishedDate: 'September 2026',
    type: 'Engineering Standard',
    description:
      'Complete validation report detailing multi-frequency RF sensors, -80°C dry-ice stability curves, and automated emergency re-icing contingency protocols.',
  },
  {
    id: 'wp-02',
    title: 'Targeted Polypeptide Chemistry & SIRPα Microenvironment Modulation Monograph',
    fileSize: '6.2 MB PDF',
    publishedDate: 'August 2026',
    type: 'Clinical Monograph',
    description:
      'Peer-reviewed mechanistic analysis of MRG-701 binding kinetics, macrophage phagocytosis activation, and clinical toxicology profile.',
  },
  {
    id: 'wp-03',
    title: 'Annual Audited Corporate Sustainability & ESG Disclosure Dossier 2025/2026',
    fileSize: '8.4 MB PDF',
    publishedDate: 'June 2026',
    type: 'ESG Annual Report',
    description:
      'Independent third-party assurance of Scope 1, 2, and 3 emissions, patient access initiatives, and GxP regulatory compliance statistics.',
  },
];

export default function NewsroomPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = React.useState<string>('');
  const [isSubscribed, setIsSubscribed] = React.useState<boolean>(false);
  const [visibleCount, setVisibleCount] = React.useState<number>(4);

  const categories = ['All', 'Press Release', 'Clinical Readout', 'Corporate', 'ESG & Sustainability'];

  const filteredArticles = React.useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* =========================================================================
          TIER 12.1.1 — HERO SECTION & LIVE CLINICAL TICKER
      ========================================================================= */}
      <section
        aria-labelledby="newsroom-hero"
        className="relative pt-14 pb-20 md:pt-18 md:pb-28 overflow-hidden telemetry-grid border-b border-slate-200/90 bg-white/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          {/* Breaking Clinical Ticker */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-mono text-brand-navy">
            <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-ping" />
            <span className="font-semibold text-brand-primary uppercase tracking-wider">
              LIVE NEWSROOM FEED
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 truncate max-w-xs sm:max-w-md">
              MRG-701 Phase III positive overall survival milestone confirmed
            </span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1
              id="newsroom-hero"
              className="text-display-xl font-extrabold text-brand-navy font-heading tracking-tight leading-[1.08]"
            >
              Newsroom, Media &amp;{' '}
              <span className="text-brand-primary">Clinical Publications.</span>
            </h1>
            <p className="text-body-lg text-slate-700 leading-relaxed font-sans">
              Authoritative corporate disclosures, peer-reviewed clinical trial readouts, media assets, and technical scientific monographs from Mirage Pharma global research institutes.
            </p>
          </div>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-2xl font-bold font-mono text-brand-navy">42+</div>
              <div className="text-xs text-slate-600 mt-0.5">Clinical Publications</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-2xl font-bold font-mono text-brand-green">14</div>
              <div className="text-xs text-slate-600 mt-0.5">Active Press Releases</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-2xl font-bold font-mono text-brand-primary">100%</div>
              <div className="text-xs text-slate-600 mt-0.5">Open Science Access</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-2xl font-bold font-mono text-brand-navy">3</div>
              <div className="text-xs text-slate-600 mt-0.5">Global Media Centers</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 12.1.2 — FILTERABLE CLINICAL UPDATES FEED
      ========================================================================= */}
      <section
        aria-labelledby="feed-heading"
        className="py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
                Regulatory &amp; Scientific Feed
              </span>
              <h2
                id="feed-heading"
                className="text-display-md font-bold text-brand-navy font-heading tracking-tight"
              >
                Latest Announcements &amp; Disclosures
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search headlines, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 text-xs bg-white border-slate-300"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedArticles.map((article) => (
              <Card
                key={article.id}
                variant="interactive"
                className="p-6 bg-white border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-brand-primary/40 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <Badge
                      variant="outline"
                      className={`text-[11px] font-mono font-semibold ${
                        article.category === 'Clinical Readout'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : article.category === 'Corporate'
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-brand-navy font-heading group-hover:text-brand-primary transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {article.summary}
                  </p>

                  {article.keyStats && (
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-700 flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span>{article.keyStats}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {article.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400">{article.readTime}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredArticles.length && (
            <div className="text-center pt-6">
              <Button
                variant="glass"
                size="md"
                onClick={() => setVisibleCount((prev) => prev + 2)}
                className="px-6 text-xs font-semibold"
              >
                Load More Articles ({filteredArticles.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          TIER 12.1.3 — DOWNLOADABLE WHITEPAPERS LIBRARY
      ========================================================================= */}
      <section
        aria-labelledby="whitepapers-heading"
        className="py-16 md:py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
              Scientific &amp; Technical Library
            </span>
            <h2
              id="whitepapers-heading"
              className="text-display-md font-bold text-brand-navy font-heading tracking-tight"
            >
              Peer-Reviewed Whitepapers &amp; Monographs
            </h2>
            <p className="text-body-md text-slate-700 leading-relaxed font-sans">
              Download complete PDF documentation, regulatory filings, clinical protocols, and cold-chain standards published by Mirage Pharma researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHITEPAPERS.map((wp) => (
              <Card
                key={wp.id}
                className="p-6 bg-slate-50/70 border-slate-200/80 rounded-2xl flex flex-col justify-between hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="glass" className="text-[10px] font-mono text-brand-navy">
                      {wp.type}
                    </Badge>
                    <span className="text-slate-500 font-mono text-[11px]">{wp.fileSize}</span>
                  </div>

                  <h3 className="text-base font-bold text-brand-navy font-heading leading-snug">
                    {wp.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {wp.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    Published: {wp.publishedDate}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center gap-1.5 text-xs h-9 px-3"
                    onClick={() => {
                      alert(`Downloading: ${wp.title}`);
                    }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 12.1.4 — NEWSLETTER SUBSCRIPTION & MEDIA DESK
      ========================================================================= */}
      <section className="py-16 md:py-20 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              Media Inquiries &amp; Alerts
            </span>
            <h2 className="text-3xl font-bold font-heading text-white">
              Stay Informed on Clinical Readouts &amp; Corporate Disclosures.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Subscribe to the Mirage Pharma Media Digest. Receive verified regulatory filings, press statements, and investor presentations delivered directly to your inbox.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Spam Policy
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Disclosures
              </span>
            </div>
          </div>

          <div className="bg-white/10 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-md">
            {isSubscribed ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white font-heading">
                  Subscription Confirmed
                </h3>
                <p className="text-xs text-slate-200">
                  Thank you for subscribing to Mirage Pharma Newsroom alerts. You will receive authenticated disclosures directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="newsletter-email" className="text-xs font-mono text-slate-200">
                    Institutional / Corporate Email
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder="name@institution.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-white/20 border-white/20 text-white placeholder:text-white/60 h-11 text-xs"
                    />
                    <Button
                      type="submit"
                      variant="vitality"
                      size="md"
                      className="h-11 px-5 text-xs font-semibold shrink-0"
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  By subscribing, you agree to our privacy policy and communications terms. Unsubscribe at any time.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
