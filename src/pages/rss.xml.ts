import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const posts = [
    { title: 'Multi-Channel Attribution for Budget Decisions', slug: 'multi-channel-attribution', date: '2026-10-04' },
    { title: 'Sephra Europe: 1149% ROAS Through Google & Amazon Ads', slug: 'sephra-europe-case-study', date: '2026-03-14' },
    { title: 'F&B eCommerce Brand: 1118% ROAS Case Study', slug: 'food-beverage-case-study', date: '2026-02-18' },
    { title: 'Luxury Architecture: £255 to £16 Cost Per Lead', slug: 'luxury-architecture-case-study', date: '2026-02-18' },
    { title: 'ChatGPT Ads in the UK: Availability and Test Guide', slug: 'chatgpt-ads', date: '2025-07-17' },
    { title: 'Ads in the Age of AI Summaries', slug: 'ads-in-the-age-of-ai-summaries', date: '2025-07-17' },
    { title: 'Meta Ads vs Google Ads for eCommerce', slug: 'meta-ads-vs-google-ads-ecommerce', date: '2025-05-08' },
    { title: 'Google Ads vs Bing Ads: Which Platform Delivers Better ROI?', slug: 'google-ads-vs-bing-ads', date: '2025-05-08' },
    { title: 'Why Amazon Advertising Is Non-Negotiable', slug: 'strategic-amazon-presence', date: '2025-05-08' },
    { title: 'What Is eCRO? How CRO Multiplies Your Ad Spend', slug: 'what-is-ecro', date: '2025-04-16' },
    { title: 'Google Ads + CRO: The Indispensable Duo', slug: 'google-ads-and-cro', date: '2025-04-16' },
    { title: 'Google Ads Strategy for Business Growth', slug: 'google-ads-strategy-business-growth', date: '2025-03-07' },
    { title: 'iWholesales: 450% Sales Growth Case Study', slug: 'iwholesales-case-study', date: '2025-02-25' },
    { title: 'Why CRO Is Crucial for Google Ads', slug: 'cro-crucial-for-google-ads', date: '2025-02-21' },
    { title: 'Performance Max for Lead Gen: A Guide', slug: 'performance-max-lead-generation', date: '2025-02-07' },
    { title: 'DeepSeek: AI Disruptor Reshaping Marketing', slug: 'deepseek-ai-digital-marketing', date: '2025-01-28' },
    { title: 'Click Fraud: 13 Strategies to Combat It', slug: 'click-fraud-strategies', date: '2024-12-30' },
    { title: 'How Much Do Google Ads Cost in the UK?', slug: 'how-much-google-ads-cost-uk', date: '2024-11-15' },
    { title: 'How Much Do Amazon Ads Cost in the UK?', slug: 'amazon-ads-cost-uk', date: '2024-11-05' },
    { title: 'PPC vs SEO: Why the Best Strategy Uses Both', slug: 'ppc-vs-seo', date: '2024-10-28' },
    { title: 'CFW: Amazon & Google Ads Case Study', slug: 'cfw-case-study', date: '2024-10-17' },
    { title: 'UK eCommerce Awards Nomination', slug: 'uk-ecommerce-awards-nomination', date: '2024-09-03' },
    { title: '7 Ways Paid Search Achieves Business Goals', slug: '7-ways-paid-search-business-goals', date: '2024-06-03' },
    { title: '7 Insider Tips to Boost Amazon Sales', slug: '7-tips-boost-amazon-sales', date: '2024-05-02' },
    { title: '24 Expert Google Ads Strategies', slug: '24-google-ads-strategies', date: '2024-04-03' },
  ];

  const items = posts.map(p => `
    <item>
      <title>${p.title}</title>
      <link>https://visible-ads.com/blog/${p.slug}</link>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${p.title}</description>
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Visible Ads Blog</title>
    <link>https://visible-ads.com/blog</link>
    <description>PPC, SEO, and digital advertising insights from Visible Ads</description>
    <language>en-gb</language>
    <atom:link href="https://visible-ads.com/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' }
  });
};
