YallaBuy Performance Guidelines

Companion document to design-system.md. This file governs technical performance rules — Core Web Vitals, asset loading, and caching. It changes independently of the visual Design System.

---

1. Purpose

Google uses Core Web Vitals as a ranking signal, and page speed directly affects bounce rate and affiliate conversion. This document defines concrete, measurable performance targets and the implementation rules to hit them, so every new page on YallaBuy starts fast instead of being optimized after the fact.

---

2. Core Web Vitals Targets

Metric| Target| What it measures
LCP (Largest Contentful Paint)| < 2.5s| How fast the biggest visible element (usually the Hero Image) renders
INP (Interaction to Next Paint)| < 200ms| How fast the page responds to a tap/click
CLS (Cumulative Layout Shift)| < 0.1| How much the layout jumps around while loading

These are the "good" thresholds Google uses in Search Console and PageSpeed Insights. Anything above these pushes the page into "Needs Improvement" or "Poor," which can affect ranking.

---

3. LCP — Fastest Possible Hero Render

Rules

- Preload the Hero Image explicitly in the document head:
  `<link rel="preload" as="image" href="hero.webp" fetchpriority="high">`
- Convert all images to WebP or AVIF. Typical savings vs JPG/PNG: 30–50% file size.
- Apply `loading="lazy"` to every image EXCEPT the first visible image on the page (Hero Image must load eagerly, never lazy).
- Inline critical above-the-fold CSS directly in `<head>`; load the rest of the stylesheet asynchronously.
- On Vercel: serve responsive image sizes per breakpoint (srcset/sizes, or an image CDN like Cloudinary) instead of one large image scaled down by CSS.
- Avoid render-blocking third-party scripts (ad tags, widgets) above the fold.

Verification

Run the URL through PageSpeed Insights (https://pagespeed.web.dev) and check the "LCP element" callout — it tells you exactly which element is slow.

---

4. INP — Fast Interaction Response

Rules

- Add `defer` or `async` to every `<script>` tag that isn't required for first paint.
- Minimize JavaScript that runs on page load, especially analytics/ad scripts — load them after the main content, not before.
- Keep event listeners (FAQ accordion, mobile menu toggle, sticky bar dismiss) lightweight — avoid triggering layout reflow inside click handlers.
- Break up any long-running JavaScript task into smaller chunks (avoid single functions that block the main thread for 50ms+).

Verification

Use Chrome DevTools → Performance panel → record a real interaction (tap the FAQ, open the mobile menu) and check the time to next paint.

---

5. CLS — Zero Layout Jumps

Rules

- Every image must have explicit `width` and `height` attributes, or a CSS `aspect-ratio`, so the browser reserves space before the image loads.
- All web fonts must use `font-display: swap` with an explicit fallback stack (see section 6) so text doesn't invisibly wait or visibly jump when the font swaps in.
- The Sticky Buy Bar must have its space reserved/animated in a way that does not push page content when it appears.
- Ads or embeds (if any) must have a fixed-size container reserved before the content loads.
- Never insert content above existing content dynamically (e.g. a banner that pushes the page down after load).

Verification

PageSpeed Insights flags every element contributing to CLS by name — fix the highest-contributing element first.

---

6. Font Loading Strategy

YallaBuy loads three font families (Inter, Plus Jakarta Sans, Lora). Uncontrolled font loading is one of the most common causes of both slow LCP and CLS.

- Apply `font-display: swap` on every `@font-face` declaration.
- Load only the weights actually used in production (e.g. 400/600/700) — not the full family.
- Preload the primary UI/body font (Inter) since it's used site-wide:
  `<link rel="preload" as="font" type="font/woff2" href="inter-var.woff2" crossorigin>`
- Define fallback stacks for every font role so layout stays close to final even before the webfont loads:
  - UI/Body: `Inter, -apple-system, BlinkMacSystemFont, sans-serif`
  - Display: `Plus Jakarta Sans, -apple-system, sans-serif`
  - Editorial: `Lora, Georgia, serif`

---

7. Vercel-Specific Rules

- Static assets (images, fonts, CSS, JS) placed in `/public` are served from Vercel's edge CDN automatically — keep all static assets there rather than fetching them from external origins where avoidable.
- Set explicit `Cache-Control` headers in `vercel.json` for assets that rarely change:

```json
{
  "headers": [
    {
      "source": "/(.*).(woff2|webp|avif|jpg|png)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

- Avoid unnecessary redirects (each redirect adds latency before the page can start loading).

---

8. Mobile-First Testing

Google indexes and ranks primarily using the mobile version of a page (mobile-first indexing). Performance must be tested and passed on mobile conditions, not just desktop:

- Test with Chrome DevTools' network throttling set to "Slow 4G" or "Fast 3G."
- Test on a mid-range Android device profile in Lighthouse (Mobile tab), not just desktop.
- A page that passes Core Web Vitals on desktop but fails on mobile still counts as failing for ranking purposes.

---

9. Pre-Launch Performance Checklist

Run through this before publishing any new page:

- [ ] Hero Image preloaded and served as WebP/AVIF
- [ ] All non-hero images use `loading="lazy"`
- [ ] All images have explicit width/height or aspect-ratio
- [ ] Fonts use `font-display: swap` with fallback stacks defined
- [ ] Non-critical JS uses `defer`/`async`
- [ ] Sticky Buy Bar doesn't cause layout shift on appearance
- [ ] Cache-Control headers set for static assets
- [ ] Tested in PageSpeed Insights (mobile) — LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Tested on throttled mobile network in DevTools

---

10. Measurement Tools

- PageSpeed Insights (https://pagespeed.web.dev) — field + lab data, per-URL, free
- Chrome DevTools → Lighthouse tab — lab data, local testing before deploy
- Google Search Console → Core Web Vitals report — real user field data across the whole site over time (the actual data Google uses for ranking)

Lab data (Lighthouse/PageSpeed on-demand) can look good while field data (Search Console, real users) still fails — always confirm against Search Console field data before considering a page fully optimized.

---

Document Version

- Version: 1.0
- Last updated: 2026-08-16
- Companion to: design-system.md
- Note: this document owns all performance-related guidance. If design-system.md contains overlapping performance content (e.g. font-loading), treat this file as the source of truth and keep design-system.md focused on visual tokens/components only.
