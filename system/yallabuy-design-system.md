YallaBuy Design System

Complete design reference for building consistent YallaBuy pages with AI or manually.

---

1. Purpose

This document defines the visual language and reusable UI rules for YallaBuy. The goal is consistency: new pages and components should follow this system instead of inventing a new visual style.

The source implementation describes the article experience as elegant, minimal, blog-style, light/dark, and fully responsive.

---

2. Design Principles

- Keep the interface clean, readable, and content-focused.
- Reuse existing components before creating new ones.
- Use the established colors, typography, radius, shadows, spacing, and interaction patterns.
- Design desktop, tablet, and mobile as one responsive system.
- Affiliate elements such as price cards, Amazon CTAs, ratings, and sticky buy bars should feel integrated rather than visually disconnected.

---

3. Design Tokens

Colors

Token| Value| Usage
Background| "#fbfaf7"| Main website background
Soft Background| "#f3f1ec"| Secondary backgrounds
Surface| "#ffffff"| Cards and surfaces
Secondary Surface| "#f8f6f1"| Secondary surfaces
Primary Text| "#1a1a1a"| Main text
Secondary Text| "#4a4a4a"| Secondary text
Muted Text| "#767676"| Low-emphasis text
Border| "#e8e4dc"| Standard borders
Strong Border| "#d8d2c5"| Strong borders
Brand| "#0f766e"| Primary brand color
Brand Soft| "#ccfbf1"| Brand backgrounds
Brand Deep| "#134e4a"| Dark brand color
Accent| "#b45309"| Accent color

Border Radius

- Small radius: "8px"
- Default radius: "14px"
- Large radius: "22px"

Shadows

- Small shadow: "0 1px 2px rgba(20,20,20,.04), 0 2px 8px rgba(20,20,20,.04)"
- Default shadow: "0 4px 24px rgba(20,20,20,.06)"
- Large shadow: "0 12px 40px rgba(20,20,20,.08)"

Layout

- Maximum site width: "1240px"
- Maximum article content width: "720px"

Transitions

- Default transition: "0.25s cubic-bezier(.4,0,.2,1)"

Spacing Scale

All padding, margin, and gap values across the site must be pulled from this scale. Do not use arbitrary spacing values (e.g. "13px", "18px").

- space-1: "4px"
- space-2: "8px"
- space-3: "12px"
- space-4: "16px"
- space-5: "24px"
- space-6: "32px"
- space-7: "48px"
- space-8: "64px"

Usage guidance:

- Tight spacing inside components (icon-to-text, badge padding): space-1 to space-2
- Component internal padding (cards, buttons, inputs): space-3 to space-4
- Spacing between related elements (price + rating, question + answer): space-4 to space-5
- Spacing between major sections on a page: space-6 to space-8

Z-Index Scale

Stacking order must be pulled from this scale to prevent overlap conflicts between the Sticky Buy Bar, Mobile Menu, and Toast.

- z-dropdown: "100"
- z-sticky-bar: "200"
- z-mobile-menu: "300"
- z-modal: "400"
- z-toast: "500"

---

4. Typography

YallaBuy does not load any custom/web fonts.

The typography should use high-quality system fonts so there is no font download, no font preload, and no layout change caused by swapping from a fallback font to a downloaded font.

Primary Editorial Font

Georgia

Use for:

- Long-form article content
- Editorial-style reading areas
- Article paragraphs
- Article quotations
- Article lists

Recommended CSS stack:

font-family: Georgia, "Times New Roman", serif;

Georgia is the preferred first choice because it closely matches the elegant serif appearance used in the YallaBuy article screenshots while remaining available as a local/system font on supported platforms. "Times New Roman" and the generic serif family are fallbacks only.

UI / Controls

Use a system sans-serif stack for interface elements:

font-family: Arial, Helvetica, sans-serif;

Use for:

- Navigation
- Buttons
- Controls
- Metadata
- Chips
- Price labels
- General UI text

Headings

Headings may use the same system sans-serif stack as the UI:

font-family: Arial, Helvetica, sans-serif;

Use for:

- Main headings
- Section headings
- Product-focused display text
- Strong UI headings

Typography Rules

- Do not import or load Inter, Plus Jakarta Sans, Lora, Space Grotesk, Google Fonts, or any other web font.
- Do not use @font-face for the YallaBuy design system.
- Use Georgia, "Times New Roman", serif for article/editorial reading content.
- Use Arial, Helvetica, sans-serif for UI and headings.
- Keep typography consistent between pages.
- Prefer the locally available/system font over downloading a visually similar font.
- Typography must remain stable before and after page load.

Font Loading & Performance

YallaBuy intentionally uses system fonts only. Do not preload, download, or asynchronously load font files.

There should be no font-related network request required to render the page. This keeps the rendering path simple and helps avoid font-swap layout changes.

If performance-guidelines.md contains older rules that assume custom fonts are being loaded, this Design System takes precedence for YallaBuy typography: use system fonts and remove unnecessary font-loading code.

---

5. Layout

The main YallaBuy container uses a maximum width of "1240px".

Long-form article content uses a narrower maximum width of "720px" for readability.

Desktop Layout

The hero can use a two-column layout:

┌──────────────────────────────┬────────────────────┐
│                              │                    │
│      Hero Content            │    Hero Image      │
│                              │                    │
└──────────────────────────────┴────────────────────┘

Responsive Layout

On smaller screens:

Hero Content
     ↓
Hero Image

Spacing and alignment should remain consistent across sections instead of using arbitrary per-page values.

---

6. Header and Navigation

The header is designed as a clean, modern navigation area with a YallaBuy logo/mark and primary navigation.

Desktop

- Display the primary navigation.
- Keep the header visually lightweight.
- Do not allow navigation to compete with article content.

Mobile

- Hide the primary navigation.
- Display a mobile menu toggle.
- Keep the header compact and easy to use.

The header should maintain the same visual language as the rest of the website.

---

7. Hero

The Hero section can contain:

- Breadcrumbs
- Category context
- Title
- Description
- Author information
- Sharing controls
- Product/article image

Desktop

Use a two-column layout:

┌──────────────────────────┬─────────────────────┐
│                          │                     │
│      Hero Content        │     Hero Image      │
│                          │                     │
└──────────────────────────┴─────────────────────┘

Mobile

Use a single-column layout.

Hero Image

Hero images use:

- Large border radius
- Border
- Normal shadow
- Responsive width
- Automatic height

---

8. Buttons and CTAs

The primary affiliate CTA is the Amazon CTA.

Example:

[ Buy on Amazon → ]

Amazon CTA Characteristics

- Rounded pill shape
- Bold text
- Strong visual prominence
- Hover animation
- Active state
- Shadow
- Consistent spacing

Variants

The Amazon CTA supports:

- Normal
- Large
- Dark

Normal CTA

Uses a gold/yellow gradient and rounded pill styling.

Large CTA

Uses:

- Larger font size
- Larger padding

Dark CTA

Uses a dark Amazon-inspired treatment.

Interaction

On hover:

- Move slightly upward.
- Increase shadow.
- Slightly increase brightness.

On active:

- Return to normal position.

Rule

Do not invent a completely different purchase button for every page.

Reuse the existing CTA component.

---

9. Price Card

The Price Card is a reusable affiliate component.

Example:

┌─────────────────────────────────────┐
│ CURRENT PRICE                       │
│                                     │
│ $499                                │
│ Was $599                            │
│                                     │
│ Save 17%                  ★ 4.2     │
└─────────────────────────────────────┘

Style

The Price Card uses:

- Surface/secondary-surface gradient
- Border
- Default radius
- Small shadow
- Consistent padding

Price Label

The price label should be:

- Small
- Bold
- Uppercase
- Muted

Main Price

The main price uses:

- Plus Jakarta Sans
- "30px"
- Heavy font weight

Old Price

Old prices should be:

- Muted
- Struck through

Saving

Saving information can appear as a green pill.

Rating

Rating information can appear beside the price metadata.

---

10. Ratings

Ratings use the established brand system.

Stars

Stars use a warm amber/yellow treatment.

Rating Numbers

Numeric ratings can use the brand color for emphasis.

Rating Tables

The overall result can use:

- Brand color
- Soft brand background
- Deep brand text

Ratings should be presented clearly and consistently across product reviews.

---

11. Article Content

Article content is optimized for reading rather than dense UI presentation.

Article Images

Article images should:

- Use the available content width.
- Use the default border radius.
- Have a border.
- Use a small shadow.
- Remain responsive.

Image Captions

Captions should be:

- Small
- Muted
- Italic
- Easy to read

Article Typography

- Headings use the system sans-serif stack.
- Long-form article content uses the system serif stack.
- Paragraphs should have comfortable line height.
- Sections should have clear spacing.

The goal is a comfortable reading experience.

---

12. Tables

Use tables for:

- Product specifications
- Ratings
- Comparisons
- Structured product information

Table Rules

- Headers should be visually distinct.
- Important final/overall values can use the brand color.
- Avoid decorative styling that makes data harder to scan.
- Keep tables readable on mobile.

---

13. Pros and Cons

Pros and Cons are presented as two cards on wider screens.

┌─────────────────────┬─────────────────────┐
│ ✓ PROS              │ • CONS              │
│                     │                     │
│ Strong suction      │ Hair tangling       │
│ Great mopping       │ Average object      │
│ Good automation     │ avoidance           │
└─────────────────────┴─────────────────────┘

Desktop

Use two columns.

Mobile

Use one column:

PROS
↓
CONS

Typography

Pros and cons text should use:

- UI font
- Secondary/muted text
- Comfortable line height

Use clear positive/negative visual markers without overwhelming the content.

---

14. FAQ

FAQ uses an accordion pattern.

Example:

┌─────────────────────────────────────┐
│ Is it worth buying?              +  │
├─────────────────────────────────────┤
│ How good is the mopping?         +  │
├─────────────────────────────────────┤
│ How long does battery last?      +  │
└─────────────────────────────────────┘

Closed State

Each FAQ item uses:

- Surface background
- Border
- Default radius

Open State

When opened:

- Border changes to brand color.
- Small shadow appears.
- Plus icon changes state.

Question

Questions use:

- Display font
- Strong font weight

Answer

Answers use:

- Secondary text color
- Generous line height
- Comfortable spacing

---

15. Sticky Buy Bar

The article implementation includes a sticky purchase bar.

Example:

┌────────────────────────────────────────────┐
│ DREAME L40 Ultra Gen 2    $499   [Buy]  X │
└────────────────────────────────────────────┘

Behavior

The bar becomes visible after the reader passes the Hero section.

It should not remain visible near the Footer.

Dismissal

Users can dismiss the bar.

The implementation can remember the dismissal using "localStorage".

UX Rule

The Sticky Buy Bar should support conversion without covering important content or becoming annoying.

---

16. Author Card

The Author Card presents the author identity and role at the end of an article.

Example:

┌─────────────────────────────────────────┐
│  MH     ABOUT THE AUTHOR                │
│         Mahmoud Hamdy                   │
│         Founder & Editor at YallaBuy    │
└─────────────────────────────────────────┘

Components

- Avatar/initial mark
- Author heading
- Author name
- Role
- Short description

The Author Card should visually match the rest of the card system.

---

17. Footer

The Footer contains:

- YallaBuy branding
- Short description
- Category links
- Company links
- Copyright information

Example:

YallaBuy

Practical reviews and buying guides...

Categories
Company

----------------------------

© 2026 YallaBuy

Footer Rules

- Use the same container width as the rest of the site.
- Keep spacing consistent.
- Use the established color system.
- The Footer should feel like the final structural section of the website, not a separate visual theme.

---

18. Responsive Rules

YallaBuy uses three main responsive states:

Desktop
   ↓
Tablet
   ↓
Mobile

Desktop

Use:

- Full container
- Multi-column Hero
- Wider article layout
- Table of contents where appropriate

Tablet

The article layout can collapse to one main column.

The table of contents becomes part of the page flow.

Mobile

The source implementation uses a "768px" breakpoint.

Mobile rules include:

- "20px" horizontal container padding
- Desktop navigation becomes a menu toggle
- Hero becomes one column
- Pros/Cons becomes one column
- Typography is reduced carefully
- Content remains readable
- Spacing is reduced without becoming cramped

---

19. Dark Mode

The system supports a data-theme based dark mode.

Example:

<html data-theme="dark">

Dark Mode Rules

Dark mode should preserve:

- Same component hierarchy
- Same spacing
- Same typography
- Same layout
- Same component behavior

Only the design tokens should change where appropriate:

- Background
- Surface
- Text
- Border
- Brand colors

Do not redesign the components for dark mode.

Dark Mode Token Values

Token| Light| Dark
Background| "#fbfaf7"| "#14181b"
Soft Background| "#f3f1ec"| "#1a1f23"
Surface| "#ffffff"| "#1c2226"
Secondary Surface| "#f8f6f1"| "#20262a"
Primary Text| "#1a1a1a"| "#f1f1ef"
Secondary Text| "#4a4a4a"| "#c4c4c2"
Muted Text| "#767676"| "#8f9396"
Border| "#e8e4dc"| "#2a3136"
Strong Border| "#d8d2c5"| "#3a4247"
Brand| "#0f766e"| "#2dd4bf"
Brand Soft| "#ccfbf1"| "#0f2e2b"
Brand Deep| "#134e4a"| "#5eead4"
Accent| "#b45309"| "#f59e0b"

Note: dark-mode brand/accent colors are shifted lighter than their light-mode counterparts to maintain sufficient contrast against dark surfaces. Verify actual contrast ratios (see Accessibility, section 20) before shipping.

---

20. Accessibility (a11y)

Accessibility is a baseline requirement, not an optional pass. Apply the following across all components:

Color Contrast

- All text/background pairs must meet a minimum contrast ratio of 4.5:1 for body text and 3:1 for large text (18px+ bold or 24px+ regular).
- Verify Muted Text against Background/Surface tokens specifically — muted tones are the most likely to fail contrast checks.
- Re-verify contrast for every Dark Mode token pair independently; light-mode contrast passing does not guarantee dark-mode contrast passes.

Keyboard & Focus

- Every interactive element (links, buttons, accordion triggers, sticky bar dismiss) must have a visible focus state. Never use "outline: none" without a replacement focus style.
- Focus order must follow visual/logical order (Hero → content → FAQ → footer).

FAQ Accordion

- Trigger buttons must use "aria-expanded" (true/false) reflecting open/closed state.
- Each trigger must use "aria-controls" pointing to the id of its answer panel.
- Answer panels should be reachable by keyboard (Tab + Enter/Space to toggle).

Images

- Every image requires descriptive "alt" text. Decorative images only should use "alt=\"\"".
- Reserve width/height (or aspect-ratio) on all images to prevent layout shift (CLS) while loading.

Motion

- Respect "prefers-reduced-motion": hover-lift animations (Amazon CTA), sticky bar entrance, and accordion transitions should be disabled or reduced for users with this preference set.

Sticky Buy Bar

- The dismiss control must be a real, labeled button (e.g. "aria-label=\"Dismiss buy bar\"") — not a bare icon with no accessible name.

---

21. AI Implementation Rules

This section is especially important when using AI to build YallaBuy.

Rule 1 — Use the Design System

Treat this document as the visual baseline for YallaBuy.

Rule 2 — Reuse Components

Before creating a new component, check whether an existing component can be reused.

Rule 3 — Do Not Invent Styles

Do not invent new:

- Colors
- Fonts
- Border radii
- Shadows
- Button styles
- Spacing rules

unless the Design System is intentionally updated.

Rule 4 — New Components

If a new component is needed:

New Component
      ↓
Add it to Design System
      ↓
Review it
      ↓
Approve it
      ↓
Use it in production

Do not create an unapproved component directly inside a production page.

Rule 5 — Keep Pages Consistent

Do not make one article look like a completely different website from another.

All pages should feel like part of YallaBuy.

Rule 6 — Use Shared Styles

Production pages should consume shared tokens and components instead of duplicating arbitrary styles.

---

22. Component Inventory

The YallaBuy Design System contains the following major components:

Navigation

- Header
- Navigation
- Mobile Menu
- Logo Mark
- Breadcrumbs

Content

- Hero
- Hero Image
- Category/Chip
- Article Typography
- Article Image/Figure
- Callout
- Tables

Product / Affiliate

- Price Card
- Rating
- Amazon CTA
- CTA Link
- Specification Table
- Rating Table
- Pros Card
- Cons Card
- Sticky Buy Bar

Engagement

- FAQ Accordion
- Share Controls
- Table of Contents
- Back-to-top
- Utility controls
- Toast

Author

- Author Card

Footer

- Footer
- Category links
- Company links
- Copyright

---

23. Recommended Project Structure

The Design System should ideally be separated from individual production pages.

YallaBuy/
│
├── design-system/
│   ├── index.html
│   ├── design-system.css
│   └── README.md
│
├── css/
│   ├── variables.css
│   ├── components.css
│   └── responsive.css
│
├── products/
│
├── articles/
│
├── categories/
│
└── index.html

"README.md"

Contains the written Design System documentation.

"index.html"

Contains the visual Design System page.

"design-system.css"

Contains the actual styles/tokens/components used by the Design System.

---

24. Source Alignment

This Design System is derived from the supplied YallaBuy DREAME L40 Ultra article implementation.

The source explicitly defines:

- Design direction
- Design tokens
- Fonts
- Price Card
- Amazon CTA
- Responsive rules
- FAQ
- Sticky Buy Bar
- Author Card
- Footer

Where the source implementation did not expose a precise value or rule in the retrieved material, this document does not invent a replacement value.

---

Final Rule

YallaBuy should always look like one website.

Before creating a new page or component:

Check Design System
        ↓
Reuse existing component
        ↓
Follow existing tokens
        ↓
Build the page
        ↓
Review consistency

If a new visual pattern is required:

New Pattern
     ↓
Design System first
     ↓
Review
     ↓
Production

The Design System is the visual source of truth for YallaBuy.

---

Document Version

- Version: 1.2
- Last updated: 2026-08-30
- Changelog: Replaced all custom/web font recommendations with system font stacks. Georgia is used for editorial/article content and Arial/Helvetica for UI and headings. Removed custom font loading requirements to keep typography stable and avoid font download/swap overhead.
- Update this block every time the Design System changes so pages built at different times can be traced to the rules they followed.