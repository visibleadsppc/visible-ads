# visible-ads — Project Brain

Per-repo brain, migrated from central claude-memory 2026-06-20. Canonical project memory now lives here. (Folds visible-ads-boh-proposal-jun9 + visible-ads-facts.)

## Aug 5-6 — reports.visible-ads.com LIVE + full infra handover proposed (email SENT 6 Aug)

Joe Short emailed asking Sunny for a CF Account ID + a scoped API token so he could stand up a reports host, replacing claude.ai artifact links for client deliverables. Boh confirmed to Joe that Sunny holds the account.

**Built and verified live: https://reports.visible-ads.com** (200, valid SSL, confirmed by headless screenshot). Repo `sunnyp81/visible-ads-reports` (private), local `C:\Users\sunny\repos\visible-ads-reports`. Publish = drop self-contained HTML at `site/reports/<slug>/index.html`, `npx wrangler deploy`. Placeholder is `noindex`, robots disallow-all, 404 wired. Main site re-verified unaffected: apex 200, www 301; DNS diff 11 → 12 records, only addition the proxied `reports` AAAA, all 5 Workspace MX + SPF/DMARC untouched.

🔴 **Built as a Worker with static assets, NOT a Pages project** — Sunny's CF account is at the Pages cap, exactly 100/100 (`wrangler pages project create` → code 8000027). See [[reference_cf-pages-cap-use-workers]].

**The requested token was never sent, and should not be.** `Account | Cloudflare Pages | Edit` is account-level; the "Specific zone: visible-ads.com" restriction only constrains the DNS half. It would have granted edit/delete over every project in an account holding 97 zones, stored in a workspace Joe administers.

### Infra handover (email sent 6 Aug, awaiting reply)
Sunny's position: he wants **least possible responsibility**, Joe owns it end to end. Proposed migrating the zone, site, workers and repos to a Visible Ads-owned CF account. Joe does nearly all of it (creates account, verifies Boh's address, adds zone, deploys from transferred repos, switches NS at GoDaddy, mints his own token). Sunny only transfers the two GitHub repos, deletes the zone at cutover, and removes the old projects (which returns a Pages slot).

Audit of everything attached to the zone (CF API, 6 Aug):

| Thing | Detail |
|---|---|
| Zone `visible-ads.com` | Free plan, full setup, NS `meg`/`sergi`, 12 records, zone id `ca95e768c9eb26377879edf9ffb82ffb`, account `aba0a6722a4510842ca473315a8ba13e` |
| Pages project `visible-ads` | Direct upload — no git source, no build command, no env vars. Domains: `visible-ads.pages.dev`, `visible-ads.com`, `visible-ads.optimisedwebsite.com` |
| Worker `visible-ads-forms` | Route `visible-ads.com/api/*`, `send_email` binding |
| Worker `visible-ads-www-redirect` | Route `www.visible-ads.com/*` |
| Worker `visible-ads-reports` | `reports.visible-ads.com` |

No KV, D1, R2, queues, durable objects, cron triggers or Pages Functions. CF Email Routing is OFF on the zone, so the 5 MX records are pure Google Workspace.

🔴 **Highest migration risk:** `visible-ads-forms` sends enquiries to `boh@visible-ads.com` via a `send_email` binding, and that address is verified at **account level in Sunny's account**. It must be re-verified in the new account (Boh clicks a Cloudflare email) BEFORE cutover. If skipped, the form still returns its success page while leads silently vanish. Only human-gated step, so it goes first.

⚠️ `visible-ads.optimisedwebsite.com` is attached to their Pages project and is Sunny's domain — post-move it becomes a cross-account custom domain and breaks (Error 1014). Drop or re-point it.

⚠️ Page Rules and Rulesets were **not readable** (wrangler OAuth session lacks scope, 9109/10000). Probably none given the dedicated www-redirect Worker, but needs a dashboard glance, not an assumption.

**Open:** Access rules on the reports host still undecided (Sunny's recommendation to Boh: Access across the whole host, not public+noindex with Access only on revenue pages). Joe can't self-publish yet — needs his GitHub username or the CF dashboard git connection; the committed Actions workflow needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` and the master-builds token is stale. Yo-Yo Desk audit is the intended first report but it is Joe's artifact, so he must send it.

**Say it out loud when the handover lands: once it's theirs, changes are theirs.** Otherwise the account moves and the phone calls don't.

## Jul 19 — NDMedia038 revised, still unsent; GA4 flag fixed
Acted on the Jul 18 reconciliation's recommendation. Regenerated `NDMedia038 - Boh Tjarks - Visible Ads Pilot.{html,pdf}` (source `G:\My Drive\clients\_invoices\ndmedia038-visible-ads.json`), dated 19 Jul:
- **Total stays £250** (Sunny's explicit call — not billing the overage). The 6-18 Jul "cycle 2" work (homepage repositioning, Multi-Channel Services hub, Yo-Yo Desk case study, ROAS-vs-Profit expansion, GA4 install, privacy page) is listed as a new line, shown **Included at no charge**, with note copy that frames it as proof of the £250/mo retainer's value ("this alone is a full retainer month, included so you can see what the retainer gets you") rather than silently absorbed.
- Added a flag: FMCG hero copy + Yo-Yo Desk case study shipped live 18 Jul without Boh's written sign-off (zero FMCG GSC queries, no named FMCG client, ROAS figure is Boh's word only from a calendar invite) — do not let Boh read these as pre-approved.
- **Fixed a stale flag:** "GA4 access needed" read as if the tag wasn't installed, but it's been live since 7 Jul (`d01fd94`). Confirmed via `mcp__ga4__get_account_summaries` — no Visible Ads property in Sunny's connected GA4 accounts, so the real gap is *login access to the GA4 property* (to configure key events), not the tag. Reworded to "GA4 account access needed" and asked Boh to add `hello@sunnypatel.co.uk` as a GA4 user.
- `invoice-register.csv` NDMedia038 row updated to match: date 2026-07-19, amount 250.00, status still **"To send"** — nothing has gone to Boh yet, only PDFs to Sunny for review.
- **Next:** Sunny sends NDMedia038 + chases (a) GA4 account access, (b) written sign-off on FMCG/Yo-Yo Desk wording. See [[disk-full-incident-jun11]]-adjacent note: C: hit 100% full mid-session during this work (same Drive-cache-on-C: failure mode as 11 Jun), `npm cache clean --force` freed ~3GB as a stopgap only — still needs a real fix.

## Jul 18 — Proposal-vs-delivery reconciliation (Fable 5)
Full report: `G:\My Drive\clients\visible-ads\Visible-Ads-Delivered-vs-Proposed-2026-07-18.md`. Headline: the £250 pilot (`Boh-AI-Visibility-Proposal-2026-06-09.md`) is ~3.5/4 delivered plus a large amount of unpriced over-delivery (roughly 8 extra pages, 2 major rewrites, 3 branded reports, GA4, a full GSC strategy plan, and today's whole punch-list sprint). **NDMedia038 (£250, the pilot invoice) may still not have been sent** — invoice register shows "To send" as of 9 Jul with no payment record found anywhere. Adjacent invoices (Huntsman/iWholesales/Kingston CoWork, £1,250 total) are separate engagements, not part of this pilot. Retainer never formally agreed/invoiced. **Action: confirm NDMedia038 actually went out and get paid before shipping more free scope.**

## Jul 18 — Messaging + multi-channel refresh, LIVE (`b37e9a4`..`c80ba0b`, pushed)
Sunny's punch list, built via superpowers brainstorm → plan → subagent-driven execution (7 tasks, each with an independent task-review pass, all clean). Build verified (62 pages). Shipped:
- Homepage hero rewrite: H1 → "Making Ecom Ads Profitable", subheadline → full-funnel/multi-channel/FMCG/POAS-over-ROAS positioning (`index.astro:82-87`)
- Homepage "Growth Services" subhead tied to profit/multi-channel (`index.astro:181`)
- Nav restructure: new top-level "Multi-Channel Services" link, channel dropdown relabeled "Services" → "By Channel" (`Nav.astro`)
- New `/multi-channel-services` hub page: journey map, 8-channel grid, POAS tie-in, Sephra proof
- Yo-Yo Desk case study added (`case-studies.astro` + `case-studies/yo-yo-desk.astro`) — **metric-only, only the 2.5x→5x ROAS figure is used, no channels/spend/timeframe invented**
- `/roas-vs-profit` expanded: Signs-your-ROAS-is-lying-to-you section, a labeled-hypothetical worked example, 4-step ROAS→POAS methodology, FAQ 4→7 questions (array + JSON-LD schema kept in sync)

⚠️ **FMCG hero copy and the Yo-Yo Desk case study shipped without Boh's written sign-off.** A GSC-driven tracker built in an earlier session (Google Sheet, "Visible Ads" merged-tabs tracker, dated 16 Jul 2026 — Action Plan tab items 0.5 and 0.8, For Boh tab items #2 and #4) flagged both as unverified: zero FMCG queries in 6mo of GSC and no named FMCG client, and the Yo-Yo Desk ROAS figure is Boh's word only, same class of issue as the fabricated local-page stats corrected 6 Jul. Sunny made the informed call to ship now and chase sign-off after. **Next session: confirm with Sunny whether Boh has since signed off; if not, this is still open risk on a live client site.**

Design spec: `docs/superpowers/specs/2026-07-18-messaging-multichannel-refresh-design.md`. Plan: `docs/superpowers/plans/2026-07-18-messaging-multichannel-refresh.md`.

## Jul 7 — GA4 tag installed (`d01fd94`, pushed)
Boh supplied GA4 measurement ID G-ZZ6RF754RW. Installed in `src/layouts/Layout.astro` head. Site uses `<ClientRouter />` (Astro view transitions), so a static gtag config alone would only fire page_view on the very first pageload of a session; set `send_page_view: false` on config and manually fire `gtag('event','page_view',...)` inside the existing `astro:page-load` listener so every client-side navigation is tracked. Build verified (57 pages), tag confirmed in dist output. Closes the "GA4 access" open flag from the Jul 6 QA sweep — conversion tracking (contact form etc.) can now be wired up in GA4 once data starts flowing.

## Current state
- Client site visible-ads.com (Boh Tjarks + Joe). Boh = referral partner who sends Sunny clients. Engagement: AI-visibility + content pilot AGREED Jun 14 2026; Option C Full Programme (£150/mo, 6mo min) approved 2026-08-27.
- Stack: Astro 6 + Tailwind 4, tokens navy/electric/cta, Plus Jakarta + Inter. Forms → `/api/submit`.
- 🔴 **Repo `origin` changed, discovered 2026-09-12: now `visibleadsppc/visible-ads`, NOT `sunnyp81/visible-ads`.** Someone on Boh's side has commit/push access and is actively shipping (7 commits landed mid-session, unannounced) — likely the Aug 5-6 infra-handover completing. **Always `git fetch` and check for divergence before pushing here from now on**, don't assume this is a Sunny-only repo anymore. Local: `C:\Users\sunny\repos\visible-ads`.
- ✅ Cloudflare Turnstile is DONE (shipped by Boh's side ~Sep 2026, not "drafted" as earlier entries below say): `src/components/Turnstile.astro`, full token-refresh + replay-protection logic, wired into all 5 site forms. Superseded an earlier half-finished Sunny-side Turnstile attempt.
- New feature (Boh's side, live): exit-intent popup (`GuidePopup.astro`) gating a Q4 playbook PDF behind an emailed confirmation link, routes `/playbook/` and `/guide-sent/`.
- Deploy: 🔴 NOT git-connected (`wrangler pages project list` shows Git Provider: No, confirmed 2026-08-27). Manual deploy required after every push: `npm install` (if fresh clone) → `npm run build` → `npx wrangler pages deploy dist --project-name visible-ads --commit-dirty=true` (wrangler OAuth login, sunnypat81 CF account `aba0a6722a4510842ca473315a8ba13e` — no valid API token needed, `cfut_143a...` is dead).

## Sep 19 2026 — all open "For Boh" blockers closed, one plan reversal

Boh answered all outstanding questions on the tracker's "For Boh" tab; closed every row:
- **KPI fork: BOTH.** Boh wants UK leads AND AI visibility, not one over the other (earlier internal read was "UK leads primary, AI-visibility supporting" - that was never actually relayed to him; his real answer is both, treat as co-equal, not one subordinate to the other).
- Yo-Yo Desk ROAS (2.5-5x) and logos: use as-is, no further sign-off needed.
- POAS vs ROAS wording: keep the existing copy as-is.
- **London/Surrey: REVERSED.** Boh wants to keep investing there for leads, not stop. Cancelled the M2 plan's `/ppc-london` noindex and Kingston/Richmond/Surrey consolidation (Action plan 4.1/4.2, sheet-cancelled) - do NOT build that if it resurfaces from an old plan doc.
- Local-page pricing figures, UK Search Awards 2022 claim: skipped, not chasing further - leave the content as it currently stands either way.
- Tracker editor email access: no change requested, closed as-is.
- FMCG names and ChatGPT-ads material: already moot (FMCG claim removed 12 Sep instead of naming clients; ChatGPT pages built from verified OpenAI docs instead of waiting on his email).

**Standing instruction from Sunny:** close open questions to Boh unless he comes back with an answer first - don't leave them open-ended waiting on him indefinitely.

## Next month's content plan — AI price-intent white-label queries (added Sep 19, not started)

Trigger: a ChatGPT-sourced lead searched "UK white label digital agencies" and quoted £300/mo, below Boh's stated £250/mo partner floor but clearly anchored low — signal that AI answer engines are surfacing Visible Ads for white-label queries and searchers are price-shopping before contact. Plan: spread the net for this query shape, filtered so only right-fit leads reach Boh.

1. Add a real minimum-engagement line to `/ppc-for-professional-services/`'s "What are the white-label fees and reporting arrangements?" FAQ (currently dodges price entirely, line 25-27) and to `public/llms.txt`, using the documented £250/mo partner floor (line 91 below) so AI citations pre-qualify budget instead of forwarding sub-floor enquiries.
2. Build 1-2 new AI-citable pages targeting the exact query shape ("white label PPC/SEO agency pricing UK", "how much does white-label digital marketing cost UK") — FAQPage schema, real numbers, same build pattern as `/chatgpt-ads-ecommerce/` and `/meta-ads-ga4-revenue-mismatch/` (shipped `5b539ef`).
3. Every page: build → Codex adversarial cross-check → fix pass, before commit (per [[feedback_codex-second-pass-full-file-required]] / [[feedback_codex-proofing-required]]). No exceptions.

✅ DONE 19 Sep: Boh confirmed the real floor is £500/mo (not £250, that Jul/Sep pricing-ladder note was stale). Shipped: FAQ line on `/ppc-for-professional-services`, `llms.txt` White-Label section, and new page `/white-label-ppc-seo-pricing-uk` (Service+FAQPage+Breadcrumb schema) - commit `38e166d`, live, 200 verified. Still open: item 2's second page ("how much does white-label digital marketing cost UK" as a distinct page) was folded into the one page above instead of built separately, to avoid thin/cannibalising content - revisit only if the single page doesn't get cited.

## Sep 12 2026 — content architecture audit, two-phase safe-fix ship, tracker cleanup (LIVE)

⭐ **Key deliverables this month (site changes, not just this session's work):**
1. `/ppc-for-professional-services/` — NEW, built and shipped this session (commit `29b1bce`). The missing 5th Option-C cluster: direct professional-services buyers + agency white-label partners.
2. `/playbook/` — NEW, Boh's side, 7 Sep (commit `5cd3015`). Gated Q4 playbook PDF download, part of an exit-intent email opt-in flow.
3. `/guide-sent/` — NEW, Boh's side, 7 Sep (commit `8301128`). Confirmation page for the gated playbook download.

Full audit: `CONTENT-AUDIT-2026-09-12.md` at repo root (not committed, internal working doc) — semantic SEO methodology (topical-map, fan-out, ai-seo skills), topical-map fit vs Option C's 5 clusters 42/100, AI-SEO readiness 44/100, 12-item ranked action plan.

**Phase 1 (commit `7158835`, LIVE):** the 6 safe items needing no Boh input — retargeted `/free-ads-audit/` (buyer/channel qualification, fixed a 24hr-vs-5-day response time contradiction), 5 contextual internal links, fixed a fee-model contradiction (some pages claimed "never % of spend" while Platinum tier IS %-based) using only the pre-cleared pricing ladder, added the same ladder as FAQ answers on bing-ads/amazon, fixed 2 stale PPC claims (deprecated Enhanced CPC, wrong Quality Score/auction-cost causality), standardised founder name to "Boh Tjarks". Mid-task discovered the `origin` remote had diverged (see "Current state" above) — rebased cleanly onto Boh's side's newer work, no losses either direction.

**Phase 2 (commit `29b1bce`, LIVE):** Sunny authorised proceeding on the rest of the 12-item plan WITHOUT waiting for Boh's sign-off first ("just do, if he has issues, he will come back"), on condition nothing is invented — removed unsupported FMCG positioning, reconciled profit-vs-ROAS messaging, fixed a homepage founder/team caption inconsistency, reconciled CFW/Sephra/iWholesales case-study figures to one verified number each (stripping several inflated figures found along the way), built the new professional-services page above. **Explicitly left untouched, still pending Boh:** Yo-Yo Desk case study (ROAS figure + logo rights) and both luxury-architecture pages (possibly two different businesses, don't merge). GA4 and GSC access: turned out to already exist under Sunny's `2012.infinite@gmail.com` account, not a Boh blocker after all — needs routing on our side, not asked of Boh.

Both phases: build → independent adversarial Codex cross-check → narrow fix-pass for whatever the cross-check caught (found real issues both times — worth repeating this pattern, don't skip the cross-check step even under time pressure). Full before/after in `BUILD-LOG-2026-09-12.md` and `PHASE2-JUDGMENT-LOG-2026-09-12.md` (repo root, not committed).

**Tracker cleanup:** the Google Sheet tracker (`https://docs.google.com/spreadsheets/d/1dg-827ZRhE_VIL8VkD86zcWCVn4QIDSqPHHwiMEfFNM/edit`) had several stale rows dating back to 16 Jul that were never corrected despite being flagged wrong on 22 Aug (`/free-bing-ads-audit/` and `/display-advertising/` shown as "Built, not live" when both have been live since 17 Jul; 3 Action Plan items shown "Not started" when done; 3 Published Content H1s stale after today's fixes; Growth Clusters still said the professional-services page needed building). All corrected 12 Sep. **Lesson: this tracker drifts from reality and isn't self-correcting — spot-check it against the live site periodically, don't trust it at face value.**
- Pricing (de-salesed): pilot £350 standard / £250 partner; retainer £400 direct. 🔴 White-label partner floor CORRECTED 19 Sep: £500/mo per client account (was recorded here as £250, confirmed stale - see the Sep 19 white-label pricing entry below for the fix that shipped against the real number).

## Pilot scope (agenda)
4 AEO pages + homepage sections (team-values block, "Find your path" role selector). Framework name = **PCF™ (Profit Contribution Framework)** = entity anchor (mirrors judeluxe's BOI®). About + gated Pricing Guide = retainer/add-on, NOT pilot.

## Pilot pages — now LIVE (was "not pushed", superseded Jul 4)
✅ The 3 pilot pages are committed, pushed and LIVE (verified 200 Jul 4): `/how-we-audit/` (PCF™), `/roas-vs-profit/` (+ProfitCalculator POAS hook), `/high-sku-advertising/`. Working tree clean, in sync with origin before the Jul 4 SEO commit below.
Remaining pilot work: page 4 (challenger/results block, Avis "We Try Harder" copy) + homepage sections (team-values, "Find your path" role selector).

## Jul 4 SEO pass — PUSHED + LIVE (`14f0a7f`, in sync with origin)
The SEO commit is live on Boh's site (master in sync, verified this session). Contents:
1. Homepage `<title>` → "Google Ads Agency London | Profit-First PPC | Visible Ads" (was "Digital Advertising Agency | Visible Ads, Ads That Convert"; site ranks pos ~1.8 for "google ads agency" but title omitted it).
2. `/free-ads-audit` sitelink renamed to "Book a Profit Audit" (Boh request) across title, H1 ("Book Your Free Profit Audit"), nav CTAs desktop+mobile, WebPage+breadcrumb schema. URL unchanged.
3. Stripped all 316 em-dashes site-wide (house rule).
NOTE: `visible-ads-optimization-tracker.md` in `G:\My Drive\clients\visible-ads\` is STALE; the site now has ~25 blog posts + service/case-study pages. Trust this brain + live site over that tracker.

## Jul 6 (pm) — Full QA sweep + stat corrections (`a65286b`, LIVE)
Full delivery verification then fixes. 🔴 Sweep agent found FABRICATED stats on all 4 local pages (ppc-london/kingston/richmond/surrey), now FIXED + verified live: 340% CFW → **1,165%** (real case study, card relabelled "Google Ads"); Sephra £2.1M → **£2.31M**; "£10M advertising revenue" → **"£3M annual ad spend managed"** (incl ppc-london FAQ JSON-LD + meta desc); Bing "20-35% lower CPCs" → non-quantified. `CountUp.astro` decimals now dynamic (was toFixed(1)). Report section 5 fixed (was stale 51 pages/planned items) → 56 live + real pipeline, PDF re-rasterised. Invoice NDMedia038 regenerated with "Flagged for your review" block (5 items; generator now supports `flags`/`flagsLabel`); old Jun 27 NDMedia038 pair archived to `_invoices\_archive\`. Tracker: new **"For Boh" tab** (index 1, sheetId 149260665) mirroring the 5 flags. Sweep otherwise clean (25 pages: 200s, metas, H1s, 0 dashes, schema parses, cluster interlinks, no ASA wording).
OPEN flags for Boh: GA4 access, confirm pricing public on local pages (£1,500-£5,000/mo + £2k min shown), confirm UK Search Awards 2022 win ("award-winning" in footer/About), tracker editor email. LATER: Kingston/Richmond/Surrey near-duplicate copy (doorway risk, differentiation pass).

## Jul 6 — Local pages + delivery audit + invoice (`77ac16a`)
Richmond + Surrey local landing pages live (`/richmond-upon-thames/`, `/surrey/`, cloned Kingston, LocalBusiness schema); footer "Areas We Serve" links all 4 local pages. Homepage H1 → "Get More Sales from the Same Ad Spend" (`05b8793`). 57 pages. Delivery audit fixed tracker+report: removed "prepared by Sunny Patel" attribution, de-dashed, reconciled headline GSC to authoritative 90d **37 clicks / 2,598 impr / 1.42% CTR / pos 9.6**. 🔴 FIXED a repeat error: had claimed "ranks pos 1-2 for advertising agency" from GSC positions on 1-9 impressions (artifacts, NOT rankings) — corrected to impressions/clicks framing, see [[feedback_no-unverified-site-claims]]. Report section 4 = "What has been delivered" (5 done + GA4 needs Boh access; no GA4 measurement ID on site). Invoice **NDMedia038** £250 issued (itemised, tracker cell links + deliverables box). OPEN deliverable: GA4 conversion tracking (needs Boh's GA4).

## Jul 5 — Profit-first content CLUSTER live (`e4b0042`) + full SEO report + meta CTR rewrite
Growth push for Boh/VA. Full branded SEO report (HTML+PDF) in `G:\My Drive\clients\visible-ads\Visible-Ads-SEO-Report-2026-07-05.*`. Deliverable #1 shipped: /blog/meta-ads-vs-google-ads-ecommerce CTR rewrite (question-hook title, links to profit-first cluster) `b62f3fa`. Deliverable #3 shipped: 3 definitive-guide spokes (3 parallel subagents, QA'd) — `/blog/target-roas-by-margin/`, `/blog/value-based-bidding/`, `/blog/break-even-roas/`, each Article+FAQPage+Breadcrumb schema, branded OG card (`public/images/og/`, gen `scratchpad/gen_og.py`), 0 dashes, safe facts. Hub profit-first-ppc now links all 3 (cluster closed). 55 pages. Content Plan tracker updated. Still planned: lead-gen guide, local pages (Kingston/Richmond/Surrey pos 1-2), GA4 key events. Site ranks but is brand-heavy on clicks; lever = CTR + cluster authority, not more traffic.

## Jul 4-5 — GSC pull + full meta spot-check + SEO meta pass (`97a4361`, live)
Pulled live GSC (gsc-sunnypat81, sc-domain:visible-ads.com, 28d): 24 clicks / 2,040 impr / pos 9.6; impressions RISING (early Jun ~50/day → early Jul ~150-190/day); still brand-heavy ("visible ads" 13/24 clicks), non-brand commercial terms rank but 0 clicks (advertising agency pos 1, amazon ads agency near me pos 1, ads agencies pos 2). Biggest content opp = /blog/meta-ads-vs-google-ads-ecommerce (~768 impr/28d pos 7, 0 clicks). www→apex 301 + /post→new 301s all healthy (GSC www/post entries = index lag, not bugs). NO £ mojibake (verified live bytes = c2a3).
Meta spot-check of all 52 pages: structure clean (no missing title/desc/H1). Fixed: 12 titles >60ch trimmed to <=60, 10 descriptions >160ch trimmed to <=160 (keyword-led, 0 dashes); added exact 301 for indexed /post/...supercharged-iwholesales slug (was hitting generic /blog). Re-audit = 0 issues. Meta-fix script: scratchpad/meta_fix.py + meta_audit.py.
Tracker sheet: "Content Pages" tab REBUILT as "Content Plan" (Date | Title | Header(H1) | URL | Status): 51 live pages (real dates) + 7 planned pipeline rows, titles+URLs hyperlinked. Builder `~/.gsc-mcp/sheets-push/build-content-plan.js`.

## Jul 4 — Branded graphics on profit-first-ppc post (`5ef06d4`, live)
Added 2 inline branded SVG content visuals (POAS "4x ROAS still loses money" bars + break-even ROAS by margin), a per-post 1200x630 OG/featured card `public/images/og/profit-first-ppc.png`, and FIXED the missing site-wide default `public/images/visible-ads-og.png` (every page + all Article schema had referenced a 404). Layout.astro now takes an optional `image` prop for per-page OG (default = the brand card). OG cards built from HTML via headless Chrome (`chrome --headless --screenshot --window-size=1200,630`); source HTML in scratchpad. `.content-visual` figure styling in global.css. Reusable pattern for future posts.

## Jul 4 — NEW definitive-guide blog post (pilot item 2) — build verified, pushing
`/blog/profit-first-ppc/` — "Profit-First PPC: Run Google Ads for Profit, Not Revenue" (Strategy). Methodology HUB that reinforces + hub-links all 3 pilot pages: /roas-vs-profit/ (POAS calc), /how-we-audit/ (PCF), /high-sku-advertising/ (margin segmentation), plus /blog/what-is-ecro/. Sections: revenue trap, POAS vs ROAS, four numbers (contribution margin / break-even ROAS / target POAS / CAC:LTV), map profit first, margin-adjusted bidding, the weekly scaling rulebook (VA's substantiated ROAS-threshold rulebook, safe facts only), structure by margin, profit leaks, 5-FAQ. Article+FAQPage+Breadcrumb schema. Distinct intent from /roas-vs-profit/ (no cannibalisation). 0 em/en dashes, semantic-audit ~88 (>=85). Registered top of `blog.astro` posts array. Build = 52 pages OK.
Still open for VA content push: deeper on-page pass (a few overlong titles: google-ads-vs-bing-ads 81ch, what-is-ecro 85ch, how-much-google-ads-cost-uk 75ch), internal linking; homepage sections (team-values, "Find your path"); early-Aug re-measure baseline for pilot delta.

## Already DEPLOYED
- robots.txt two-lane fix (`7034379`, pushed): ALLOW citation bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot/User), BLOCK training bots (GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Amazonbot, Applebot-Extended, meta-externalagent, cohere-ai, Diffbot), keep `Content-Signal: search=yes,ai-train=no`. (CF managed layer had been injecting Disallow; Sunny removed the override — origin file is now source of truth.)
- Homepage title rewrite DRAFTED, not deployed (fastest proof: ranks 1.8 for "google ads agency"; GSC lift expected 2-3wk).

## Key facts & warnings
- 🔴 Do NOT publish VA performance figures / case-study numbers until Boh supplies/signs them off (no-unverified-site-claims). VA-supplied facts below ARE safe to publish.
- 🔴 ASA risk: avoid "never lose money" wording. Use the real weekly ROAS-threshold rulebook instead (see below) or "cap spend below break-even ROAS, scale down not off".
- Don't write negatively about Cloudflare / the existing build — Sunny's team built the site.
- GSC baseline (sc-domain:visible-ads.com, gsc-sunnypat81): ranks but doesn't convert clicks. "google ads agency" pos 1.8 / 93 impr / 0 clicks; near-me + local Kingston/Richmond terms pos ~1 / 0 clicks; ~93% of clicks are brand. Cause = homepage title lacks "Google Ads agency". Bing healthy (~60 pages indexed, 0 blocks, 0 5xx). Agency based Kingston-upon-Thames.
- Deliverables: `G:\My Drive\clients\visible-ads\` — `Boh-AI-Visibility-Proposal-2026-06-09.{html,md,pdf}` + `Visible-Ads-Progress-Snapshot-2026-06-09.html` + robots.txt.

### Verified VA company facts (from Boh's May 2026 deck — safe to publish)
- Positioning: "Profit-First Search & Social Ecom Ads". London-based, founder-led. Tagline "Get MORE sales with the SAME ad spend". Clients D2C & B2B, UK/US/EU, £1-20M revenue.
- Trust stats: managing **£3M annual ad spend**. Certs: Google Partner, Microsoft Advertising Partner, Amazon Ads Verified Partner, Meta Business Partner. Awards: UK Search Awards 2022 WINNER; 2024 Finalist; UK eCommerce Awards 2024 Finalist; National Digital Awards 2026 Finalist.
- Client logos incl. Japan Centre, CFW.co.uk, Sephra, Huntsman Air Sports (= the £200 audit client), OnlyBBGuns, plus others.
- "How We Scale Ad Spend" rulebook (the substantiated, non-ASA-risky claim, weekly, ROAS-threshold based): >1,200% ROAS → +20% budget/wk; 900-1,100% → +10%/wk; 600-800% → hold; 300-500% → reduce 20%; <300% → switch off.
- Case studies (real): CFW Google 1,165% all-time ROAS / £4.14M sales on £380K over 3yr; Japan Centre relaunch 11 ROAS / £32K on £2.9K in 3wk; Kitchen & Worktops leadgen leads 6→107 in 4mo (CPL -75%); CFW Amazon 8.5 ROAS, £769K sales.
- Pricing (per channel, +VAT/mo, excl. creatives + one-off £1k tracking setup, 3mo min then rolling): SILVER £1k (≤£3k budget, 10h); GOLD £1.5k (≤£20k, 20h); PLATINUM £2k +5% (£20k+, 35h, click-fraud protection); PERFORMANCE = reduced/zero retainer, rev-share, by application.
- 🔴 TENSION: VA's proof is ROAS-forward but Boh wants profit/POAS OVER ROAS. Reconcile — profit = the goal, ROAS = the lever they manage (the weekly rulebook). Soften PCF page's anti-ROAS tone so it doesn't fight VA's award-winning ROAS story.

## History
- 2026-06-09 — Proposal + baseline built; robots two-lane fix deployed (`7034379`); title/meta rewrites drafted.
- 2026-06-14 — Boh agreed pilot; judeluxe-modelled brief; 3 of 4 pilot pages + ProfitCalculator built + verified (NOT pushed); 3 open Qs sent to Boh (trust stats / pricing / claim wording).
- 2026-06-19 — Boh pivoting VA messaging to POAS (already the spine of built pages). Wants the 7 judeluxe problem-hub topics covered (JS-rendered, need browser extract; current scope = 4 pages) and `/free-ads-audit/` renamed to "BOOK A PROFIT AUDIT" (sitelinks are algorithmic — fix = rename title/H1/nav at `src/pages/free-ads-audit.astro`, keep URL or 301 to /profit-audit/). Boh invited an invoice (Huntsman £200 + iwholesales audit). 3 pilot pages still unpushed. Decisions pending from Sunny: push-now-vs-hold, Huntsman access type, 7-topic extraction.
