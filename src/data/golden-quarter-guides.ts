// The four Golden Quarter guides Boh wrote, shared by the Tools hub, the landing page and the
// download page so the three can never drift apart.
//
// The slugs MUST stay in step with the GUIDES registry in the visible-ads-forms worker. A slug
// travels inside the signed confirmation token and again as the `g` parameter on
// /api/download, so renaming one here without mirroring it there rejects links that are
// already sitting in people's inboxes.
//
// The tactic and page counts are the real ones from each PDF, which is why they differ: Boh
// wrote five for Google and Amazon, four for Meta and three for SEO.
export interface GoldenQuarterGuide {
  slug: string;
  channel: string;
  /** The title as it appears on the PDF's own cover. */
  title: string;
  tactics: number;
  pages: number;
  cover: string;
  /** One line for a card. */
  summary: string;
  /** The guide's actual contents list, one entry per tactic. */
  inside: string[];
}

export const GOLDEN_QUARTER_GUIDES: GoldenQuarterGuide[] = [
  {
    slug: 'q4-playbook',
    channel: 'Google Ads',
    title: '5 Golden Quarter Google Ads Tactics for Q4',
    tactics: 5,
    pages: 14,
    cover: '/images/guides/q4-playbook-cover.png',
    summary:
      'Stop rising click costs eating the margin on every Q4 sale, by structuring Performance Max and the feed around what each product actually earns.',
    inside: [
      'Restructure Performance Max and segment the feed with custom labels',
      'Optimise the feed for festive and gifting intent',
      'Use seasonality adjustments and bid loosening deliberately, not reactively',
      'Capture high-intent non-brand queries with exact and phrase frameworks',
      'Run Demand Gen to build consideration before click costs spike',
    ],
  },
  {
    slug: 'q4-amazon',
    channel: 'Amazon',
    title: '5 Golden Quarter Amazon Tactics for Q4',
    tactics: 5,
    pages: 14,
    cover: '/images/guides/q4-amazon-cover.png',
    summary:
      'Peak storage rates and fulfilment surcharges take the margin that rising click costs leave behind. This is how to hold onto it.',
    inside: [
      'Protect margin against peak inventory and fulfilment fees',
      'Lock in the FBA deadlines and the high-margin promotions worth running',
      'Cut waste with exact match and budget rules',
      'Lift basket value with bundles and tiered offers',
      'Keep mobile listings and pricing agile through peak',
    ],
  },
  {
    slug: 'q4-meta',
    channel: 'Meta Ads',
    title: '4 Golden Quarter Meta Ads Tactics for Q4',
    tactics: 4,
    pages: 13,
    cover: '/images/guides/q4-meta-cover.png',
    summary:
      'Meta rewards work done early. Build the retargeting pool while CPMs are still cheap and Cyber Week costs a fraction of what it otherwise would.',
    inside: [
      'Seed audiences and test creative before costs climb',
      'The pre-Black Friday ramp and warming the list',
      'Scaling through peak Cyber Week without losing delivery',
      'Last-minute gifting and post-holiday clearance',
    ],
  },
  {
    slug: 'q4-seo',
    channel: 'SEO and GEO',
    title: '3 Golden Quarter SEO and GEO Tactics for Q4',
    tactics: 3,
    pages: 10,
    cover: '/images/guides/q4-seo-cover.png',
    summary:
      'The organic traffic that carries peak season is won months earlier. Three builds that keep paying every Q4, not just this one.',
    inside: [
      'Build evergreen Black Friday category hubs that keep their authority',
      'Give product pages the depth and schema to earn rich results',
      'Take the informational searches with gift guides and FAQ clusters',
    ],
  },
];

/** The default the email form leads with when nobody has picked a specific guide. */
export const DEFAULT_GUIDE_SLUG = 'q4-playbook';
