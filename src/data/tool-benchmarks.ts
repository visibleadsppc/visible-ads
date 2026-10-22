// Shared planning data for the free tools under /tools.
//
// Two rules hold this file together, and both exist because a made-up number on a public
// calculator is worse than no calculator at all:
//
//   1. Anything presented as a benchmark carries its source and its date. The search rows
//      below are LocaliQ's published Google Ads averages, not ours, and the pages say so.
//   2. Anything that is our judgement rather than measured data is labelled as our opinion
//      in the UI, and every figure the maths touches is editable on screen. A visitor who
//      knows their own CPC should be able to overwrite ours and get their own answer.
//
// We do not publish Visible Ads account figures here. That needs Boh's sign-off first.

/** ECB reference rates, pinned so the pages can state the rate they converted at. */
export const FX = {
  date: '21 October 2026',
  source: 'European Central Bank reference rates',
  // Multiply a USD figure by these.
  usdTo: { GBP: 0.74617, EUR: 0.89015, USD: 1 },
} as const;

export type CurrencyCode = 'GBP' | 'USD' | 'EUR';

export const CURRENCIES: Record<CurrencyCode, { symbol: string; label: string }> = {
  GBP: { symbol: '£', label: 'GBP' },
  USD: { symbol: '$', label: 'USD' },
  EUR: { symbol: '€', label: 'EUR' },
};

/**
 * Search benchmarks, as published by LocaliQ (WordStream), in US dollars.
 * Source: https://localiq.com/blog/search-advertising-benchmarks/, updated June 2026,
 * 23 categories, Google Ads and Microsoft Ads accounts.
 *
 * These are averages across a mostly US account set. They are a starting point for a
 * forecast, not a UK benchmark, and every page using them says so and lets you edit them.
 */
export const SEARCH_BENCHMARKS = [
  { id: 'animals-pets', name: 'Animals & pets', ctr: 7.49, cpc: 4.06, cvr: 16.22 },
  { id: 'apparel', name: 'Apparel, fashion & jewellery', ctr: 6.64, cpc: 4.44, cvr: 4.5 },
  { id: 'arts-entertainment', name: 'Arts & entertainment', ctr: 12.75, cpc: 1.63, cvr: 5.91 },
  { id: 'legal', name: 'Attorneys & legal services', ctr: 5.87, cpc: 9.87, cvr: 5.55 },
  { id: 'automotive-sale', name: 'Automotive: for sale', ctr: 8.28, cpc: 2.27, cvr: 6.01 },
  { id: 'automotive-repair', name: 'Automotive: repair, service & parts', ctr: 5.56, cpc: 4.35, cvr: 15.51 },
  { id: 'beauty', name: 'Beauty & personal care', ctr: 6.75, cpc: 4.62, cvr: 10.35 },
  { id: 'business-services', name: 'Business services', ctr: 6.1, cpc: 5.87, cvr: 4.85 },
  { id: 'career', name: 'Career & employment', ctr: 5.88, cpc: 5.81, cvr: 3.05 },
  { id: 'dental', name: 'Dentists & dental services', ctr: 5.66, cpc: 8.0, cvr: 10.67 },
  { id: 'education', name: 'Education & instruction', ctr: 7.56, cpc: 4.81, cvr: 13.14 },
  { id: 'finance', name: 'Finance & insurance', ctr: 9.83, cpc: 3.39, cvr: 2.64 },
  { id: 'furniture', name: 'Furniture', ctr: 6.57, cpc: 3.97, cvr: 2.99 },
  { id: 'health-fitness', name: 'Health & fitness', ctr: 5.81, cpc: 6.17, cvr: 6.94 },
  { id: 'home-improvement', name: 'Home & home improvement', ctr: 6.47, cpc: 8.33, cvr: 8.05 },
  { id: 'industrial', name: 'Industrial & commercial', ctr: 6.57, cpc: 5.87, cvr: 8.2 },
  { id: 'personal-services', name: 'Personal services', ctr: 7.16, cpc: 7.17, cvr: 12.34 },
  { id: 'physicians', name: 'Physicians & surgeons', ctr: 6.61, cpc: 4.76, cvr: 12.43 },
  { id: 'real-estate', name: 'Real estate', ctr: 7.61, cpc: 3.22, cvr: 3.7 },
  { id: 'restaurants', name: 'Restaurants & food', ctr: 6.83, cpc: 2.05, cvr: 8.05 },
  { id: 'shopping-gifts', name: 'Shopping, collectibles & gifts', ctr: 8.28, cpc: 4.14, cvr: 4.01 },
  { id: 'sports-recreation', name: 'Sports & recreation', ctr: 8.75, cpc: 2.77, cvr: 7.69 },
  { id: 'travel', name: 'Travel', ctr: 9.32, cpc: 2.14, cvr: 5.83 },
] as const;

export const SEARCH_BENCHMARK_SOURCE = {
  name: 'LocaliQ Search Advertising Benchmarks',
  url: 'https://localiq.com/blog/search-advertising-benchmarks/',
  updated: 'June 2026',
  note: 'Averages across 23 categories, weighted towards US accounts.',
};

/**
 * Channel planning defaults for the media planner, in GBP.
 *
 * ⚠️ These are OUR planning starting points, not measured benchmarks. Published CPM figures
 * for these channels disagree wildly and most come from vendor blogs with no stated method,
 * so quoting one as fact would be dishonest. The planner shows every figure, lets you
 * replace it, and says plainly where it came from.
 *
 * `weights` is how much of each funnel stage's budget the channel competes for:
 * [awareness, engagement, direct response]. Zero means the channel does not do that job.
 */
export const PLANNER_CHANNELS = [
  { id: 'google-search', name: 'Google Search', group: 'Search', cpm: 38, ctr: 4.5, weights: [0, 0.6, 2.4], clicksMatter: true,
    role: 'Catches demand that already exists. The only channel where someone has typed what they want.' },
  { id: 'google-shopping', name: 'Google Shopping & PMax', group: 'Search', cpm: 22, ctr: 1.1, weights: [0.2, 0.8, 2.0], clicksMatter: true,
    role: 'Product-led capture across Search, Shopping and the rest of the Google estate.' },
  { id: 'meta', name: 'Meta (Facebook & Instagram)', group: 'Paid social', cpm: 8.5, ctr: 1.2, weights: [1.2, 1.6, 1.2], clicksMatter: true,
    role: 'The demand creation engine for most B2C and ecommerce plans, and the best place to test creative quickly.' },
  { id: 'tiktok', name: 'TikTok Ads', group: 'Paid social', cpm: 5.5, ctr: 0.9, weights: [1.4, 1.2, 0.6], clicksMatter: true,
    role: 'Cheap reach with a short creative half-life. Budget for new assets every few weeks or it stalls.' },
  { id: 'linkedin', name: 'LinkedIn Ads', group: 'Paid social', cpm: 26, ctr: 0.45, weights: [0.8, 1.2, 0.8], clicksMatter: true,
    role: 'The one place you can buy a job title. Expensive per impression, defensible when the deal is worth five figures.' },
  { id: 'reddit', name: 'Reddit Ads', group: 'Paid social', cpm: 6, ctr: 0.5, weights: [1.0, 0.8, 0.4], clicksMatter: true,
    role: 'Interest-led reach in communities that discuss the category. Needs copy that does not read like an ad.' },
  { id: 'youtube', name: 'YouTube', group: 'Video', cpm: 9, ctr: 0.35, weights: [2.0, 0.8, 0.2], clicksMatter: false,
    role: 'Upper-funnel storytelling where attention is high. Judged on reach and view rate, not clicks.' },
  { id: 'demand-gen', name: 'Google Demand Gen', group: 'Video', cpm: 7.5, ctr: 0.7, weights: [1.4, 1.2, 0.6], clicksMatter: true,
    role: 'Social-style creative against Google audience signals, across Discover, Gmail and YouTube feeds.' },
  { id: 'programmatic', name: 'Programmatic display', group: 'Display', cpm: 3.2, ctr: 0.08, weights: [1.6, 0.6, 0.4], clicksMatter: false,
    role: 'Scaled reach and retargeting. Worth it only with a hard exclusion list; most of the junk inventory lives here.' },
  { id: 'native', name: 'Native display (Outbrain, Taboola)', group: 'Display', cpm: 2.6, ctr: 0.25, weights: [1.2, 0.8, 0.3], clicksMatter: true,
    role: 'Content-led reach that reads as editorial. Good for a guide or a comparison page, poor for a direct sell.' },
  { id: 'ctv', name: 'Connected TV', group: 'Broadcast', cpm: 24, ctr: 0, weights: [2.2, 0.3, 0], clicksMatter: false,
    role: 'Television buying on a digital plan. Reach and completion rate are the measures; there is nothing to click.' },
  { id: 'audio', name: 'Streaming audio', group: 'Broadcast', cpm: 12, ctr: 0, weights: [1.8, 0.3, 0], clicksMatter: false,
    role: 'Background reach during commutes and workouts. Cheap frequency, no click, needs a memorable brand line.' },
  { id: 'dooh', name: 'Digital out-of-home', group: 'Broadcast', cpm: 7, ctr: 0, weights: [2.0, 0.2, 0], clicksMatter: false,
    role: 'Geographic brand presence. Pairs well with a search capture layer in the same postcodes.' },
] as const;

/** Audience type shifts the default funnel split. Our starting points, not measured data. */
export const PLANNER_AUDIENCES = {
  b2b: { label: 'B2B', split: [35, 30, 35], note: 'Long, considered cycles. More weight above the fold of the funnel.' },
  b2c: { label: 'B2C', split: [30, 25, 45], note: 'Shorter cycles, so more of the budget sits on the response end.' },
  ecommerce: { label: 'Ecommerce', split: [25, 20, 55], note: 'Catalogue-led. Capture first, then build demand with what is left.' },
} as const;

/**
 * Weather-sensitive categories for the bidding tool.
 *
 * Each profile says how demand in that category responds to the forecast. `tempIdeal` is the
 * temperature in Celsius where demand peaks, `tempSpread` how fast it falls away either side,
 * and the rain and wind coefficients are the demand change per unit. Positive means more
 * weather of that kind lifts demand.
 *
 * These are directional, not modelled from sales data. The tool says so on the page: it points
 * at the days worth watching, it does not tell you what tomorrow sells.
 */
export const WEATHER_CATEGORIES = [
  { id: 'garden', name: 'Garden & outdoor living', tempIdeal: 23, tempSpread: 9, rain: -0.55, wind: -0.2,
    note: 'Demand tracks the first warm dry weekend more than any single hot day.' },
  { id: 'cooling', name: 'Air conditioning, fans & cooling', tempIdeal: 32, tempSpread: 7, rain: -0.1, wind: 0,
    note: 'Almost nothing below 22C, then it goes vertical. Budget caps hurt more than bids here.' },
  { id: 'heating', name: 'Heating, boilers & insulation', tempIdeal: -2, tempSpread: 10, rain: 0.1, wind: 0.2,
    note: 'The first genuinely cold snap moves more volume than a long steady winter.' },
  { id: 'waterproof', name: 'Umbrellas, waterproofs & wellies', tempIdeal: 9, tempSpread: 14, rain: 0.9, wind: 0.3,
    note: 'Rain today sells today. Forecast rain three days out does very little.' },
  { id: 'roofing', name: 'Roofing, guttering & drainage', tempIdeal: 11, tempSpread: 16, rain: 0.8, wind: 0.6,
    note: 'Wind drives the emergency calls. Storms, not rainfall totals, are the signal.' },
  { id: 'coldfood', name: 'Ice cream, cold drinks & BBQ', tempIdeal: 27, tempSpread: 8, rain: -0.5, wind: -0.15,
    note: 'Weekend weather matters roughly twice as much as midweek weather.' },
  { id: 'hotfood', name: 'Hot drinks, comfort food & takeaway', tempIdeal: 4, tempSpread: 11, rain: 0.45, wind: 0.15,
    note: 'Cold and wet together is the peak, not cold alone.' },
  { id: 'carcare', name: 'Car washing, valeting & detailing', tempIdeal: 19, tempSpread: 10, rain: -0.8, wind: -0.2,
    note: 'Rain kills it outright. A dry Saturday is worth most of the week.' },
  { id: 'hospitality', name: 'Pubs, beer gardens & days out', tempIdeal: 24, tempSpread: 8, rain: -0.7, wind: -0.25,
    note: 'Peaks Thursday to Sunday. A wet bank holiday is the worst case in the whole calendar.' },
  { id: 'diy', name: 'DIY, decorating & home improvement', tempIdeal: 17, tempSpread: 12, rain: 0.2, wind: 0,
    note: 'Mildly counter-cyclical. A washout weekend pushes people indoors and onto indoor jobs.' },
] as const;

/** Bundled so the tool needs no third-party geocoder. Coordinates to 4dp, as MET Norway asks. */
export const UK_LOCATIONS = [
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Birmingham', lat: 52.4862, lon: -1.8904 },
  { name: 'Manchester', lat: 53.4808, lon: -2.2426 },
  { name: 'Leeds', lat: 53.8008, lon: -1.5491 },
  { name: 'Glasgow', lat: 55.8642, lon: -4.2518 },
  { name: 'Sheffield', lat: 53.3811, lon: -1.4701 },
  { name: 'Bradford', lat: 53.795, lon: -1.7594 },
  { name: 'Liverpool', lat: 53.4084, lon: -2.9916 },
  { name: 'Edinburgh', lat: 55.9533, lon: -3.1883 },
  { name: 'Bristol', lat: 51.4545, lon: -2.5879 },
  { name: 'Cardiff', lat: 51.4816, lon: -3.1791 },
  { name: 'Belfast', lat: 54.5973, lon: -5.9301 },
  { name: 'Leicester', lat: 52.6369, lon: -1.1398 },
  { name: 'Coventry', lat: 52.4068, lon: -1.5197 },
  { name: 'Nottingham', lat: 52.9548, lon: -1.1581 },
  { name: 'Newcastle upon Tyne', lat: 54.9783, lon: -1.6178 },
  { name: 'Southampton', lat: 50.9097, lon: -1.4044 },
  { name: 'Portsmouth', lat: 50.8198, lon: -1.088 },
  { name: 'Brighton', lat: 50.8225, lon: -0.1372 },
  { name: 'Plymouth', lat: 50.3755, lon: -4.1427 },
  { name: 'Reading', lat: 51.4543, lon: -0.9781 },
  { name: 'Luton', lat: 51.8787, lon: -0.4200 },
  { name: 'Norwich', lat: 52.6309, lon: 1.2974 },
  { name: 'Swansea', lat: 51.6214, lon: -3.9436 },
  { name: 'Aberdeen', lat: 57.1497, lon: -2.0943 },
  { name: 'Milton Keynes', lat: 52.0406, lon: -0.7594 },
  { name: 'Northampton', lat: 52.2405, lon: -0.9027 },
  { name: 'York', lat: 53.9600, lon: -1.0873 },
  { name: 'Oxford', lat: 51.752, lon: -1.2577 },
  { name: 'Cambridge', lat: 52.2053, lon: 0.1218 },
  { name: 'Exeter', lat: 50.7184, lon: -3.5339 },
  { name: 'Ipswich', lat: 52.0567, lon: 1.1482 },
  { name: 'Derby', lat: 52.9225, lon: -1.4746 },
  { name: 'Stoke-on-Trent', lat: 53.0027, lon: -2.1794 },
  { name: 'Hull', lat: 53.7676, lon: -0.3274 },
  { name: 'Preston', lat: 53.7632, lon: -2.7031 },
  { name: 'Middlesbrough', lat: 54.5742, lon: -1.2349 },
  { name: 'Sunderland', lat: 54.9069, lon: -1.3838 },
  { name: 'Bournemouth', lat: 50.7192, lon: -1.8808 },
  { name: 'Inverness', lat: 57.4778, lon: -4.2247 },
  { name: 'Kingston upon Thames', lat: 51.4123, lon: -0.3007 },
  { name: 'Richmond upon Thames', lat: 51.4613, lon: -0.3037 },
  { name: 'Guildford', lat: 51.2362, lon: -0.5704 },
  { name: 'Croydon', lat: 51.3762, lon: -0.0982 },
  { name: 'Watford', lat: 51.6565, lon: -0.3903 },
  { name: 'Chelmsford', lat: 51.7356, lon: 0.4685 },
  { name: 'Bath', lat: 51.3811, lon: -2.3590 },
  { name: 'Cheltenham', lat: 51.9000, lon: -2.0667 },
  { name: 'Lincoln', lat: 53.2307, lon: -0.5406 },
  { name: 'Carlisle', lat: 54.8925, lon: -2.9329 },
] as const;
