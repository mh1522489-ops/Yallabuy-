YallaBuy SEO Guidelines

Companion document to design-system.md and performance-guidelines.md. This file governs technical/structural SEO — how every page is built so Google can crawl, understand, and rank it. It does not cover content writing style (see the AI content prompt) or performance (see performance-guidelines.md).

Market: United States (Amazon.com only). All conventions below assume US English, USD pricing, and Amazon.com product links.

---

1. Page Types Covered

YallaBuy has four structural page types. Each has its own title/schema/URL rules below:

- Product Review (single product, in-depth review)
- Article (educational/how-to, not tied to one product)
- Category (listing/hub page for a product type)
- Comparison (two or more products compared head-to-head)

Every new page must be built as one of these four types — do not invent a fifth structure without updating this document first.

---

2. Title Tags

General rules

- Length: 50–60 characters (Google truncates around 580px, roughly 60 characters for most titles).
- Brand name "YallaBuy" goes at the end, separated by " | ".
- Include the primary keyword as close to the front as possible.
- Every title on the site must be unique — no duplicates across pages.

Patterns by page type

Page Type| Pattern| Example
Product Review| "[Product Name] Review 2026: [Key Benefit/Verdict] \| YallaBuy"| "Dreame L40 Ultra Review 2026: Worth the Upgrade? \| YallaBuy"
Article| "[Topic/Question] \| YallaBuy"| "How Robot Vacuums Work \| YallaBuy"
Category| "Best [Category] in 2026: Top Picks \| YallaBuy"| "Best Robot Vacuums in 2026: Top Picks \| YallaBuy"
Comparison| "[Product A] vs [Product B]: Which Should You Buy? \| YallaBuy"| "Dreame L40 Ultra vs Roomba j7+: Which Should You Buy? \| YallaBuy"

Update the year in Review/Category titles annually — stale years signal outdated content to both users and Google.

---

3. Meta Descriptions

- Length: 150–160 characters.
- Every page must have a unique, hand-written meta description — never auto-generated from the first paragraph.
- Include the primary keyword naturally, plus one concrete detail (price range, verdict, or number of items compared) to improve click-through rate.
- Write it as a reason to click, not a summary of the page.

Example (Product Review): "We tested the Dreame L40 Ultra for 3 weeks. Real suction tests, mopping results, and whether it beats the Roomba j7+ at this price."

---

4. Heading Structure

- Exactly one H1 per page — the product name (Review), the article topic (Article), the category name (Category), or the comparison title (Comparison).
- Headings must nest in order: H1 → H2 → H3. Never skip a level (e.g. H2 straight to H4) for styling reasons — use CSS for visual size, not heading level.
- H2s should map to real sections a reader/Google would search for: "Design & Build," "Performance," "Battery Life," "Pros & Cons," "FAQ," "Verdict."
- FAQ questions (accordion) are H3s under an "FAQ" H2 — this also matches the FAQPage schema structure in section 6.

---

5. URL Structure

- Format: lowercase, hyphen-separated, no query strings, no dates in the URL.
- Pattern by page type:

Page Type| URL Pattern| Example
Product Review| /reviews/[product-slug]| /reviews/dreame-l40-ultra
Article| /guides/[topic-slug]| /guides/how-robot-vacuums-work
Category| /categories/[category-slug]| /categories/robot-vacuums
Comparison| /compare/[product-a]-vs-[product-b]| /compare/dreame-l40-ultra-vs-roomba-j7-plus

- Once a URL is published and indexed, do not change it. If a slug must change, set up a 301 redirect from the old URL to the new one — never let an indexed URL 404.
- Keep slugs short: 3–5 words max, drop stop words (a, the, for) where they don't hurt readability.

---

6. Schema Markup (Structured Data)

Required JSON-LD by page type

Page Type| Required Schema
Product Review| Product, Review, AggregateRating, BreadcrumbList
Article| Article (or TechArticle), FAQPage (if the page has an FAQ section), BreadcrumbList
Category| ItemList, BreadcrumbList
Comparison| Product (x2, one per item compared), BreadcrumbList

Site-wide (every page)

- Organization schema (once, typically in a shared layout/footer include)
- Person schema for the author, linked via `author` property on Article/Review schema

Rules

- Never mark up content that isn't visibly present on the page (e.g. a rating in schema that isn't shown to the reader) — this violates Google's structured data guidelines and risks a manual penalty.
- Validate every new page template with Google's Rich Results Test before publishing the first page of that type.
- AggregateRating requires a real rating count and value — do not fabricate placeholder numbers.

---

7. Internal Linking

- Every Product Review and Article must link to at least 2–3 related pages (e.g. a Review links to its Category page and to a relevant Comparison or Article).
- Category pages must link out to every Product Review and Comparison that belongs in that category — Category pages are the primary internal hub.
- Use descriptive anchor text that includes the target page's topic (e.g. "see our full Dreame L40 Ultra review") — never bare "click here" or "read more."
- Avoid orphan pages: before publishing, confirm the new page is linked from at least one existing page (its Category page, at minimum).

---

8. Image SEO

- File names must be descriptive and hyphenated: "dreame-l40-ultra-side-view.webp" — never "IMG_2341.webp" or "photo1.webp".
- Alt text describes what's in the image for someone who can't see it, and naturally includes context where relevant (e.g. "Dreame L40 Ultra robot vacuum docked at charging station" rather than just "vacuum").
- Do not keyword-stuff alt text — write it as a real description first.
- File format and lazy-loading rules are governed by performance-guidelines.md, not repeated here.

---

9. Canonical Tags

- Every page must have a self-referencing canonical tag: `<link rel="canonical" href="https://yallabuy.com/reviews/dreame-l40-ultra">`
- If the same product is ever referenced from two URLs (e.g. a legacy URL during a migration), the older/duplicate URL must canonical to the primary one — never leave two live URLs both indexable for the same content.
- Comparison pages that cover products already reviewed individually should NOT canonical to the review pages — they are distinct content and should be indexed separately.

---

10. Breadcrumbs

- Every page (except the homepage) shows a breadcrumb trail matching its URL hierarchy and matching the BreadcrumbList schema exactly.
- Pattern: Home > Category > Page Title
- Example: Home > Robot Vacuums > Dreame L40 Ultra Review

---

11. Monitoring — Google Search Console

Since GSC is the current tool in use, these are the checks to run on a recurring basis:

- **Weekly**: Check the Coverage report for new crawl errors (404s, redirect issues) on newly published pages.
- **Weekly**: Check Core Web Vitals report (field data) for regressions — cross-reference with performance-guidelines.md section 10.
- **Monthly**: Check the Performance report — look for pages with high impressions but low CTR (signals a weak title/meta, revisit section 2–3 rules for that page).
- **Monthly**: Check for duplicate/near-duplicate title or meta description warnings.
- **After every new page type or template change**: Submit the URL for indexing manually and verify it renders correctly in the URL Inspection tool (checks schema and mobile usability at once).

---

12. Pre-Publish SEO Checklist

Run through this before publishing any page:

- [ ] Title tag matches the pattern for its page type, 50–60 characters, unique site-wide
- [ ] Meta description is hand-written, 150–160 characters, unique
- [ ] Exactly one H1, headings nest in order (no skipped levels)
- [ ] URL follows the pattern for its page type, lowercase, hyphenated
- [ ] Correct JSON-LD schema present and validated in Rich Results Test
- [ ] Links to at least 2–3 related internal pages; linked FROM at least one existing page
- [ ] All images have descriptive file names and alt text
- [ ] Self-referencing canonical tag present
- [ ] Breadcrumb matches URL hierarchy and BreadcrumbList schema
- [ ] Submitted for indexing in Google Search Console after publish

---

Document Version

- Version: 1.0
- Last updated: 2026-08-16
- Market scope: United States (Amazon.com) only — revisit all patterns above if expanding to additional Amazon marketplaces (UK, Gulf, etc.), since pricing currency, language, and possibly domain structure would need separate rules.
- Companion to: design-system.md, performance-guidelines.md
