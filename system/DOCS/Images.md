
# Images Skill

## YallaBuy Image Decision, Optimization & Implementation Skill

**Skill Name:** Images  
**Version:** 1.0  
**Status:** Active  
**Scope:** All YallaBuy pages, components, products, articles, categories, guides, comparisons, and UI elements.

---

# 1. Skill Purpose

This skill teaches AI how to make correct decisions about images across the YallaBuy website.

The goal is NOT to add more images.

The goal is to determine:

- Whether an image is actually needed.
- Why the image is needed.
- What type of image should be used.
- Where it should appear.
- How important it is.
- Whether it can become the LCP element.
- Whether it should be preloaded.
- Whether it should use high fetch priority.
- Whether it should be lazy-loaded.
- Which dimensions it needs.
- Which responsive sources it needs.
- Which image format is appropriate.
- How it should be compressed.
- How it should behave on mobile and desktop.
- How it should satisfy accessibility requirements.
- How it should avoid CLS.
- Whether it is factually accurate.
- Whether it could misrepresent a product.
- Whether CSS or HTML would be better than an image.

The AI MUST prioritize:

```text
User Value
    >
Accuracy
    >
Accessibility
    >
Performance
    >
Maintainability
    >
Visual Decoration


---

2. Core Philosophy

Master Principle

> Every image must earn its place.



An image should only be added when it provides meaningful value.

Meaningful value may include:

Explaining a concept.

Showing a product.

Identifying a category.

Supporting a comparison.

Demonstrating a feature.

Showing a real interface.

Explaining a process.

Helping navigation.

Providing useful context.

Supporting branding.

Improving understanding.


An image MUST NOT be added simply because:

The page looks empty.

The AI wants more visual content.

Another website has more images.

The article needs a certain number of images.

The design "looks better" with another image.

The AI believes Google prefers more images.

The page has too much whitespace.



---

3. Golden Rule

Useful Images > More Images

Never use:

More Images = Better Page

Instead use:

More Useful Information = Better Page


---

4. Skill Activation

Use this skill whenever AI is:

Creating a new page.

Editing an existing page.

Adding a product card.

Adding a product page.

Creating an article.

Creating a category page.

Creating a comparison page.

Creating a buying guide.

Creating a content hub.

Adding a hero section.

Adding a gallery.

Adding screenshots.

Adding diagrams.

Adding illustrations.

Optimizing page performance.

Fixing LCP.

Fixing CLS.

Improving accessibility.

Reviewing image implementation.

Refactoring image architecture.

Generating image metadata.

Selecting image loading behavior.



---

5. Required AI Behavior

Whenever AI encounters an image opportunity, it MUST NOT immediately add the image.

It MUST first determine:

1. Is an image needed?
2. Why is it needed?
3. What information does it provide?
4. What type of image is it?
5. Where will it appear?
6. Is it above or below the fold?
7. Is it likely to become LCP?
8. What priority should it have?
9. Should it be lazy-loaded?
10. Should it be preloaded?
11. Should fetchpriority be high?
12. What dimensions should it use?
13. Does it need responsive sources?
14. What format should be used?
15. What alt text is required?
16. Could CSS/HTML replace it?
17. Is the image accurate?
18. Could it mislead the user?
19. Is the network cost justified?


---

6. Image Decision Pipeline

The AI MUST follow this pipeline:

Understand Page
      ↓
Understand User Intent
      ↓
Identify Visual Need
      ↓
Decide Whether Image Is Necessary
      ↓
Define Image Purpose
      ↓
Choose Image Type
      ↓
Choose Placement
      ↓
Assign Priority
      ↓
Determine LCP Potential
      ↓
Determine Loading Strategy
      ↓
Determine Dimensions
      ↓
Determine Responsive Strategy
      ↓
Determine Format
      ↓
Determine Compression
      ↓
Determine Accessibility
      ↓
Verify Accuracy
      ↓
Audit Performance
      ↓
Implement


---

7. Image Purpose Classification

Every image MUST have a defined purpose.

Allowed purposes include:

product_identification
product_presentation
product_comparison
feature_explanation
education
concept_explanation
navigation
category_identification
process_explanation
visual_reference
diagram
infographic
screenshot
branding
author_identification
social_sharing
decoration

The AI SHOULD avoid vague purposes such as:

looks_good
fills_space
makes_page_prettier
adds_visuals


---

8. Image Types

The AI MUST classify images.

Supported types:

1. Hero Image


2. LCP Image


3. Product Image


4. Article Illustration


5. Comparison Image


6. Diagram


7. Infographic


8. Screenshot


9. Category Image


10. Logo


11. Icon


12. Author Image


13. Open Graph Image


14. Decorative Image


15. Background Image




---

9. Hero Image

A hero image represents the main subject of a page.

Examples:

Headphone category hero.

Buying guide hero.

Product review hero.

Educational article hero.


The AI MUST NOT assume that every hero image is an LCP image.

It must determine whether the image is:

Visible immediately.

Large.

Important.

Likely to become the LCP element.



---

10. LCP Image

An LCP image is an image that may become the Largest Contentful Paint element.

Typical candidates:

Large hero image.

Main product image.

Large category image.

Major above-the-fold visual.


If an image is likely to be LCP:

Do not lazy-load it.

The AI SHOULD consider:

fetchpriority="high"

and MAY consider preload when discovery timing justifies it.


---

11. Product Images

Product images are high-trust assets.

The AI MUST ensure:

Correct product.

Correct model.

Correct generation/version.

Correct appearance.

No misleading modifications.

No fake accessories.

No fake colors.

No invented features.


Never use a visually similar product as a substitute without clearly indicating that it is illustrative.


---

12. Article Images

Article images must support the article.

Examples:

Article:
How Does Active Noise Cancellation Work?

Useful images:
- ANC diagram
- Microphone/speaker explanation
- Signal cancellation illustration

Do NOT automatically insert an image after every section.

The correct number of images depends on the information.


---

13. Comparison Images

Comparison images may be useful when visual differences matter.

Examples:

Sony WH-1000XM6
vs
Bose QuietComfort Ultra

Useful visual comparison may include:

Design.

Size.

Ear cup shape.

Controls.

Ports.

Folding mechanism.


Do not create a comparison image when a simple HTML table communicates the information better.


---

14. Diagram Images

Use diagrams when relationships or processes are easier to understand visually.

Example:

External Sound
      ↓
Microphones
      ↓
Processing
      ↓
Inverse Signal
      ↓
Reduced Noise

Simple diagrams should preferably use:

SVG.

HTML/CSS.

Accessible structured content.



---

15. Infographics

Infographics can organize complex information.

However:

Important information MUST NOT exist only inside an infographic.

If the infographic contains important facts, the page SHOULD also expose those facts as normal text or accessible structured content.


---

16. Screenshots

Screenshots should be used when they help users understand:

Software.

Websites.

Settings.

Features.

UI.

Processes.


The screenshot MUST represent the actual interface being discussed.

AI MUST NOT create a fake screenshot and present it as an authentic interface.


---

17. Category Images

Category images should:

Clearly represent the category.

Use consistent dimensions.

Use consistent visual treatment.

Avoid unnecessary visual complexity.

Load efficiently.


For example:

Headphones
Laptops
Smartphones
Cameras
Smartwatches

should feel like one visual system.


---

18. Decorative Images

Decorative images provide no meaningful information.

The AI SHOULD ask:

> Can CSS, SVG, HTML, or a pseudo-element create this visual more efficiently?



If yes, prefer the lighter solution when practical.

Examples that often do NOT require raster images:

Gradients.

Circles.

Lines.

Borders.

Shadows.

Basic geometric shapes.

Decorative blobs.

Simple backgrounds.



---

19. CSS vs Image Decision

Prefer CSS when the visual is:

simple shape
gradient
border
shadow
background effect
basic geometric decoration
loading skeleton

Prefer images when the visual is:

real product
photograph
complex illustration
detailed diagram
real screenshot
important visual reference


---

20. Image Priority System

Each image MUST receive a priority.

Critical

Use for:

LCP image.

Critical hero.

Essential above-the-fold visual.


High

Use for:

Important above-the-fold image.

Important product image.


Normal

Use for:

Normal content images.

Product cards.

Article illustrations.


Low

Use for:

Secondary visual content.

Non-essential images.


Decorative

Use for:

Pure decoration.



---

21. Priority Decision

The AI should consider:

Visibility
+
Importance
+
User Intent
+
LCP Potential
+
Content Dependency

Do not assign high priority merely because an image is large.


---

22. Loading Strategy

General rule:

Image	Loading

LCP	eager
Critical hero	eager
Important above fold	eager
Below fold	lazy
Product cards below fold	lazy
Article images below fold	lazy
Gallery images	lazy
Decorative	lazy or CSS



---

23. Lazy Loading

Below-the-fold images SHOULD normally use:

loading="lazy"

Example:

<img
  src="/images/product.webp"
  width="800"
  height="800"
  loading="lazy"
  decoding="async"
  alt="Wireless headphones"
>


---

24. Never Lazy-Load LCP

If an image is likely to be the LCP element:

loading="lazy"

MUST NOT be used.

Bad:

<img
  src="/images/hero.webp"
  loading="lazy"
>

Better:

<img
  src="/images/hero.webp"
  fetchpriority="high"
  decoding="async"
  width="1200"
  height="675"
  alt="Wireless headphones"
>


---

25. Preload Strategy

Preload is an optimization for genuinely critical resources.

AI MAY preload an image when:

It is likely LCP.

It is visible immediately.

It is important.

The browser may discover it too late.

The network cost is justified.


Do NOT preload:

Every image
Every product card
Every article image
Every category image
Every gallery image


---

26. Preload Example

<link
  rel="preload"
  as="image"
  href="/images/headphones-hero.webp"
  fetchpriority="high"
>

Only use this when justified.


---

27. Fetch Priority

Use:

fetchpriority="high"

only for genuinely important images.

Typical candidate:

LCP image

Do NOT assign high priority to 20 images on the same page.


---

28. Responsive Images

The AI SHOULD use responsive image sources when beneficial.

Use:

srcset

and:

sizes

Example:

<img
  src="/images/headphones-800.webp"
  srcset="
    /images/headphones-400.webp 400w,
    /images/headphones-800.webp 800w,
    /images/headphones-1200.webp 1200w
  "
  sizes="
    (max-width: 600px) 100vw,
    (max-width: 1000px) 50vw,
    33vw
  "
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
  alt="Wireless over-ear headphones"
>


---

29. srcset Rules

Every srcset source MUST:

Actually exist.

Represent the same image.

Have the correct width descriptor.

Maintain the intended aspect ratio.

Be appropriately optimized.


Never create:

srcset="fake-400.webp 400w"

if the file does not exist.


---

30. sizes Rules

sizes MUST reflect the actual CSS layout.

Do not blindly use:

sizes="100vw"

for every image.

Example for a three-column grid:

sizes="
  (max-width: 700px) 100vw,
  (max-width: 1100px) 50vw,
  33vw
"

The exact value must match the actual layout.


---

31. Image Dimensions

Meaningful images SHOULD have explicit:

width
height

Example:

<img
  src="/images/product.webp"
  width="800"
  height="800"
  alt="Wireless headphones"
>

This allows the browser to reserve space.


---

32. CLS Prevention

Images MUST NOT unexpectedly shift surrounding content.

Use:

Width.

Height.

Stable aspect ratio.

Reserved containers.


Example:

.image-container {
  aspect-ratio: 1 / 1;
}


---

33. Product Card Image Container

Recommended pattern:

.product-image {
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

This is particularly useful for products with different source dimensions.


---

34. object-fit

Use:

object-fit: contain;

when the entire product should remain visible.

Use:

object-fit: cover;

when cropping is intentional.

Do not crop important product details.


---

35. Aspect Ratios

Use consistent aspect ratios when multiple images appear in a grid.

Common ratios:

1:1
4:3
16:9
3:2

Choose based on content.

Do not force every image into the same ratio if doing so damages important information.


---

36. Image Formats

Use the most appropriate efficient format.

Preferred options:

AVIF
WebP
SVG
PNG
JPEG

General guidance:

AVIF/WebP for many photographic/raster images.

SVG for logos, icons, and vector graphics.

PNG when lossless quality or transparency is actually needed.

JPEG where appropriate for photographic content.


Do not convert blindly.


---

37. Compression

The goal is:

Lowest practical file size
+
Acceptable visual quality

Do not over-compress images until:

Product details become unclear.

Text becomes unreadable.

Important visual information disappears.

Artifacts become distracting.



---

38. Right-Sizing

Never serve an unnecessarily huge image.

Example:

If a product card renders at approximately 300px:

Do not automatically download a 5000px image.

Instead provide an appropriately sized source.


---

39. Mobile Optimization

Mobile users are especially sensitive to unnecessary image downloads.

AI MUST consider:

Mobile rendered width.

Mobile bandwidth.

Mobile LCP.

Number of initial images.

Image file sizes.

Responsive source selection.


Do not make mobile users download desktop-sized assets unnecessarily.


---

40. Image Quantity

There is NO fixed rule such as:

One image every 300 words.

There is NO fixed rule such as:

Every article must contain 10 images.

Instead:

Image Quantity = Useful Visual Opportunities

A page may legitimately contain:

1 image

or:

3 images

or:

15 images

depending on the content.


---

41. Alt Text

Informational images MUST have meaningful alt text.

Good:

alt="Sony WH-1000XM6 wireless noise-cancelling headphones"

Bad:

alt="image"

Bad:

alt="photo"

Bad:

alt="best headphones wireless headphones cheap headphones 2026"

Never keyword-stuff alt text.


---

42. Alt Text Principle

Alt text should answer:

> What does this image communicate that matters here?



It should be:

Concise.

Accurate.

Contextual.

Natural.


Do not describe irrelevant visual details.


---

43. Decorative Alt Text

For genuinely decorative images:

alt=""

may be appropriate.

Do not force screen readers to announce meaningless decorative imagery.


---

44. Accessibility

Images must support accessibility.

AI MUST consider:

Meaningful alt text.

Decorative handling.

Text alternatives.

Important information outside the image.

Contrast.

Interactive image accessibility.

Screen-reader behavior.



---

45. Important Text Inside Images

Do not put critical information only inside an image.

Bad:

Image:
"Battery Life: 40 Hours"

with no equivalent HTML text.

Better:

<img
  src="/images/headphones.webp"
  alt="Wireless headphones"
>

<p>Battery life: up to 40 hours.</p>


---

46. Image SEO

Images should support the page naturally.

Use:

Descriptive filenames.

Relevant surrounding text.

Meaningful alt text.

Correct dimensions.

Appropriate formats.

Proper structured data where applicable.


Do NOT use:

Keyword-stuffed filenames.

Keyword-stuffed alt text.

Irrelevant images.

Images added only to manipulate SEO.



---

47. Filename Rules

Use descriptive filenames.

Good:

sony-wh-1000xm6.webp

Good:

noise-cancelling-headphones-diagram.webp

Good:

wireless-headphones-category.webp

Bad:

IMG_8392.webp

Bad:

best-headphones-best-wireless-headphones-cheap-headphones-2026.webp


---

48. Filename Pattern

Recommended:

subject-purpose.ext

Examples:

sony-wh-1000xm6.webp
sony-wh-1000xm6-side-view.webp
anc-explanation-diagram.webp
wireless-headphones-category.webp

Keep filenames:

Short.

Descriptive.

Predictable.

Lowercase.

Free of unnecessary special characters.



---

49. Folder Architecture

Recommended:

/images/
    /products/
    /categories/
    /articles/
    /authors/
    /logos/
    /icons/
    /diagrams/
    /og/

Example:

/images/products/sony/sony-wh-1000xm6.webp
/images/categories/headphones.webp
/images/articles/anc-explained.webp
/images/diagrams/noise-cancellation.webp
/images/logos/yallbuy-logo.svg

The architecture may evolve, but it must remain predictable.


---

50. Image Reuse

Reuse the same image when the same visual genuinely serves multiple pages.

For example:

Product Page
Category Page
Comparison Page
Buying Guide

may all use the same product image.

Do not duplicate the physical file unnecessarily.


---

51. Image Variants

When useful, create optimized variants:

product-400.webp
product-800.webp
product-1200.webp

Use the appropriate source for the actual rendered size.


---

52. Product Image Trust Rules

YallaBuy is an editorial/affiliate website.

Therefore:

AI MUST NOT:

Invent product appearance.

Add accessories that do not come with the product.

Change the product color while presenting it as authentic.

Change the product design.

Add fake ports.

Add fake buttons.

Add fake features.

Use another model as if it were the reviewed model.

Present AI-generated product imagery as an official product photo.


Accuracy is more important than visual quality.


---

53. Manufacturer Images

If manufacturer imagery is used:

Verify the model.

Preserve the actual appearance.

Do not imply YallaBuy personally photographed it.

Do not imply personal testing.

Do not use the image as proof of a claim it cannot prove.



---

54. AI-Generated Images

AI-generated images may be appropriate for:

Educational illustrations.

Concept diagrams.

Abstract explanations.

Decorative visuals.

General conceptual content.


They MUST NOT be presented as:

Authentic product photographs.

Official manufacturer images.

Real screenshots.

Real test evidence.

Real owner photographs.



---

55. Screenshots and Evidence

If a screenshot is used as evidence, it must be authentic.

AI MUST NOT create a fake UI screenshot and present it as a real website/app interface.

If a mockup is used:

It must be treated as a mockup or illustration.


---

56. Image Selection Matrix

Use this matrix:

Situation	Type	Priority	Lazy	Preload	High Fetch

LCP hero	Hero/LCP	Critical	No	Consider	Yes
Main product above fold	Product	Critical/High	Usually No	Consider	If LCP
Above-fold article image	Article	High	Usually No	Rare	Only if critical
Below-fold product card	Product	Normal	Yes	No	No
Below-fold article image	Article	Normal	Yes	No	No
Gallery image	Product	Normal	Yes	No	No
Decorative image	Decorative	Low	Yes	No	No
CSS decoration	CSS	N/A	N/A	No	N/A



---

57. AI Image Planning Schema

Before implementation, AI SHOULD be able to describe each important image using:

images:
  - id: hero-headphones
    type: hero
    purpose: category_identification
    location: above_fold
    priority: critical
    likely_lcp: true
    loading: eager
    fetchpriority: high
    preload: true
    lazy: false
    responsive: true
    width: 1200
    height: 675
    format: webp
    alt: "Wireless over-ear headphones"
    reason: "Represents the main category immediately visible to users"


---

58. Image Decision Matrix

AI SHOULD make decisions using:

Is the image useful?
        |
       NO
        ↓
    Do not add it.

       YES
        ↓
What is its purpose?
        ↓
What type is it?
        ↓
Where is it displayed?
        ↓
Is it above the fold?
        ↓
Could it be LCP?
        ↓
How important is it?
        ↓
Choose loading strategy.
        ↓
Choose responsive strategy.
        ↓
Choose format.
        ↓
Choose dimensions.
        ↓
Choose alt text.
        ↓
Validate accuracy.
        ↓
Validate performance.


---

59. Example: Headphone Category Page

Suppose YallaBuy has:

Headphones Category

with:

Hero.

Search.

Product cards.

Educational articles.

Content hub links.


The AI should NOT automatically load 60 large product images immediately.

Instead:

Hero:
Critical
Potential LCP
Optimized
Eager
Possibly high priority

First visible product cards:
Normal/High
Depending on viewport
Optimized
Appropriate loading

Products far below:
Normal
Lazy

Article cards below:
Normal
Lazy

Decorative backgrounds:
CSS where possible


---

60. Example: Product Page

For a product page:

Main product image
    ↓
Potential LCP
    ↓
Optimize aggressively
    ↓
Do not lazy-load if LCP

Gallery images:

Not immediately visible
    ↓
Lazy-load

Additional product visuals:

Only load when useful


---

61. Example: Educational Article

Article:

How Does Active Noise Cancellation Work?

Potential visuals:

Hero image
ANC diagram
Microphone illustration
Signal cancellation diagram

But AI should only include visuals that improve comprehension.

Possible final result:

Hero image
+
ANC diagram
+
One explanatory illustration

No arbitrary image count is required.


---

62. Example: Buying Guide

For:

Best Headphones for Travel

Useful images may include:

Category hero.

Product images.

Comparison visual.

ANC explanation.

Travel-related illustration.


But the AI must prioritize the user journey over visual quantity.


---

63. Performance Rules

Image performance MUST be evaluated as part of overall page performance.

Target principles:

LCP < 2.5s
INP < 200ms
CLS < 0.1

Images can affect all three indirectly or directly.

The AI must be especially careful about:

LCP.

Network requests.

Main-thread work caused by image-related JavaScript.

Layout shift.

Large image decoding.

Excessive initial image loading.



---

64. Performance Anti-Patterns

Never automatically:

Preload all images

Never:

Use fetchpriority="high" everywhere

Never:

Lazy-load LCP

Never:

Serve 4000px images to 300px cards

Never:

Load every product image on initial render

when only a subset is visible.

Never:

Use huge PNG photographs

when a more efficient format is appropriate.

Never:

Add 20 decorative images to improve visual richness

without meaningful value.


---

65. JavaScript Image Rendering

When images are rendered dynamically with JavaScript:

AI MUST ensure:

Image paths are correct.

Alt text is generated correctly.

Width/height are available.

Lazy loading is applied where appropriate.

Responsive sources are supported when useful.

LCP images are not unnecessarily delayed by JavaScript.

The initial critical image does not depend on unnecessary asynchronous rendering.



---

66. Data-Driven Product Images

If products are rendered from data.json, image metadata SHOULD be structured.

Example:

{
  "id": "sony-wh-1000xm6",
  "name": "Sony WH-1000XM6",
  "image": "/images/products/sony/sony-wh-1000xm6.webp",
  "imageAlt": "Sony WH-1000XM6 wireless noise-cancelling headphones",
  "imageWidth": 800,
  "imageHeight": 800
}

If responsive sources are used:

{
  "image": {
    "src": "/images/products/sony/sony-wh-1000xm6-800.webp",
    "srcset": [
      {
        "src": "/images/products/sony/sony-wh-1000xm6-400.webp",
        "width": 400
      },
      {
        "src": "/images/products/sony/sony-wh-1000xm6-800.webp",
        "width": 800
      },
      {
        "src": "/images/products/sony/sony-wh-1000xm6-1200.webp",
        "width": 1200
      }
    ],
    "alt": "Sony WH-1000XM6 wireless noise-cancelling headphones"
  }
}


---

67. Missing Image Handling

If an image is missing:

AI MUST NOT silently replace it with a random unrelated image.

Preferred options:

1. Use the correct available image.


2. Use a controlled placeholder.


3. Omit the image if it is not necessary.


4. Report the missing asset if required.



Never misrepresent another product as the missing product.


---

68. Image Placeholder

If a placeholder is needed:

It should clearly function as a placeholder.

It should NOT look like an authentic product photograph.

Prefer lightweight placeholders.


---

69. Image Error Handling

If an image fails to load:

The page should remain usable.

Avoid layouts that collapse or create severe visual problems when an image fails.

Use:

Stable dimensions.

Background/container.

Fallback state where appropriate.



---

70. Image Accessibility Audit

Check:

[ ] Informational images have useful alt
[ ] Decorative images have appropriate empty alt
[ ] Important image information exists as text
[ ] Image-based controls are accessible
[ ] Text over images has sufficient contrast
[ ] Images do not prevent keyboard navigation


---

71. Image Performance Audit

Check:

[ ] LCP image identified
[ ] LCP image not lazy
[ ] Preload justified
[ ] High priority justified
[ ] Below-fold images lazy
[ ] Images correctly sized
[ ] Responsive sources available where useful
[ ] srcset valid
[ ] sizes valid
[ ] width/height defined
[ ] CLS controlled
[ ] Compression acceptable
[ ] No oversized downloads
[ ] No unnecessary image requests


---

72. Image Accuracy Audit

Check:

[ ] Correct product
[ ] Correct model
[ ] Correct version
[ ] Correct appearance
[ ] No misleading modification
[ ] No fake product imagery
[ ] No fake screenshot
[ ] No false visual evidence


---

73. Image Architecture Audit

Check:

[ ] Predictable folder
[ ] Descriptive filename
[ ] Correct extension
[ ] Correct path
[ ] No duplicate unnecessary files
[ ] Responsive variants organized
[ ] Product images grouped correctly
[ ] Category images grouped correctly


---

74. Final Image Audit

Before declaring a page complete, AI MUST ask:

1. Does every image have a reason?
2. Can any image be removed without reducing usefulness?
3. Is the main image optimized?
4. Is the LCP image handled correctly?
5. Are unnecessary images lazy-loaded?
6. Are images correctly sized?
7. Is CLS controlled?
8. Are responsive images used where useful?
9. Are formats appropriate?
10. Is alt text correct?
11. Are decorative images handled correctly?
12. Are product images accurate?
13. Are filenames descriptive?
14. Are paths correct?
15. Is the mobile experience optimized?
16. Is the network cost justified?


---

75. Master Rules

The following rules are mandatory.

Rule 1

Do not add an image without a purpose.

Rule 2

Useful images are more important than image quantity.

Rule 3

Never lazy-load the LCP image.

Rule 4

Never preload every image.

Rule 5

Never use high fetch priority on every image.

Rule 6

Prevent image-induced CLS.

Rule 7

Use responsive images when they provide meaningful performance benefits.

Rule 8

Do not serve oversized images.

Rule 9

Use modern formats when appropriate.

Rule 10

Use CSS instead of raster images when CSS can accomplish the same simple visual efficiently.

Rule 11

Use meaningful alt text.

Rule 12

Do not keyword-stuff alt text.

Rule 13

Important information must not exist only inside an image.

Rule 14

Never fabricate product imagery.

Rule 15

Never present generated imagery as authentic product evidence.

Rule 16

Do not use arbitrary image-count rules.

Rule 17

Mobile performance must always be considered.

Rule 18

Visual quality must be appropriate to the purpose.

Rule 19

Accuracy is more important than visual appearance.

Rule 20

Performance is more important than unnecessary decoration.


---

76. AI Final Decision

Before adding any image, AI MUST be able to answer:

WHY?

If the answer is unclear:

Do not add the image.

If the image is useful:

Choose the correct type.
Choose the correct priority.
Choose the correct loading strategy.
Choose the correct dimensions.
Choose the correct responsive strategy.
Choose the correct format.
Choose the correct alt text.
Verify accuracy.
Audit performance.


---

77. Ultimate Principle

Every image on YallaBuy must earn its place.

Useful
+
Accurate
+
Accessible
+
Responsive
+
Optimized
+
Performance-conscious

>

More images
+
More decoration
+
More requests

The AI must always prefer:

> The smallest number of images that provides the greatest useful visual value without sacrificing accessibility, accuracy, UX, or performance.