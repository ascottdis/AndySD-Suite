export type PillarId = 'flip' | 'gig' | 'art' | 'aperture' | 'studio' | 'transit';
export type Phase = 'idea' | 'spec' | 'mvp' | 'v1' | 'v2';

export interface AppProject {
  slug: string;
  name: string;
  pillar: PillarId;
  phase: Phase;
  priorityRank: number;
  oneLiner: string;
  vibe: string;
  specPath: string;
}

export const pillars = {
  flip: { name: 'Flip', color: 'flip-blue', oneLiner: 'AI resale OS' },
  gig: { name: 'Gig', color: 'gig-green', oneLiner: 'Gig command center' },
  art: { name: 'Art', color: 'art-purple', oneLiner: 'Art context engine' },
  aperture: { name: 'Aperture', color: 'aperture-pink', oneLiner: 'Realms & presence' },
  studio: { name: 'Studio', color: 'studio-gold', oneLiner: 'Mission control' },
  transit: { name: 'Transit', color: 'transit-teal', oneLiner: 'Route optimizer' },
} as Record<PillarId, { name: string; color: string; oneLiner: string }>;

export const projects: AppProject[] = [
  {
    slug: 'flippin',
    name: 'FlipOS',
    pillar: 'flip',
    phase: 'mvp',
    priorityRank: 1,
    oneLiner: 'AI sourcing → listings → profit',
    vibe: 'Bloomberg for resellers',
    specPath: 'docs/FLIPOS_MASTER_SPEC.md',
  },
  {
    slug: 'gigos',
    name: 'GigOS',
    pillar: 'gig',
    phase: 'spec',
    priorityRank: 2,
    oneLiner: 'Gig queue, scoring, execution',
    vibe: 'Command center for multi‑apping',
    specPath: 'docs/GIGOS_MASTER_SPEC.md',
  },
  {
    slug: 'artperiod',
    name: 'ArtPeriod',
    pillar: 'art',
    phase: 'spec',
    priorityRank: 3,
    oneLiner: 'Art context and curation',
    vibe: 'Gallery wall text for every piece',
    specPath: 'docs/ARTPERIOD_MASTER_SPEC.md',
  },
  {
    slug: 'aperture',
    name: 'Aperture',
    pillar: 'aperture',
    phase: 'spec',
    priorityRank: 4,
    oneLiner: 'Realms, presence, SceneHim + Cruizr',
    vibe: "Control how you are seen",
    specPath: 'docs/APERTURE_MASTER_SPEC.md',
  },
  {
    slug: 'suite',
    name: 'Studio Suite',
    pillar: 'studio',
    phase: 'v1',
    priorityRank: 5,
    oneLiner: 'This mission control',
    vibe: 'Income OS front door',
    specPath: 'docs/STUDIO_MASTER_SPEC.md',
  },
  {
    slug: 'transit-hub',
    name: 'Transit Hub',
    pillar: 'transit',
    phase: 'spec',
    priorityRank: 6,
    oneLiner: 'Routes → money',
    vibe: 'Turn movement into profit',
    specPath: 'docs/TRANSIT_HUB_MASTER_SPEC.md',
  },
];




