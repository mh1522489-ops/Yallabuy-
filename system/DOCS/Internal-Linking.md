Internal Linking Specification

Project: YallaBuy
File: "Internal-Linking.md"
Purpose: Define how AI should plan, create, validate, and audit internal links across the YallaBuy website.

---

1. Purpose

The purpose of this specification is to ensure that internal links are:

- Contextually relevant.
- Useful to the reader.
- Connected to the current page's topic and intent.
- Helpful for navigating the website.
- Consistent with YallaBuy's content architecture.
- Useful for building Content Hubs and topic clusters.
- Natural within the surrounding content.
- Valid and intentional.
- Never added only for the purpose of increasing the number of links.

Core Principle

«Do not add an internal link because a link is available. Add an internal link because the destination provides a useful next step for the reader.»

The AI must prioritize:

User usefulness > Contextual relevance > Site architecture > SEO benefit

SEO is a consequence of a well-connected website, not the primary reason for forcing links.

---

2. What the AI Must Understand

The AI must understand that an internal link consists of more than:

Anchor Text → URL

A complete internal-link decision is:

Current Page
    ↓
Current Context
    ↓
User Intent
    ↓
Link Intent
    ↓
Target Page
    ↓
Target Relevance
    ↓
Anchor Text
    ↓
Placement
    ↓
CTA
    ↓
Validation

Every link should have a reason.

---

3. Page Types

The AI must identify the type of the current page before creating internal links.

Possible page types include:

Homepage
Category
Subcategory
Product
Product Review
Article
Content Hub
Comparison
Alternative
Buying Guide
Price Guide
Search
Find / Catalog
Trust Page
About
Contact
Editorial Policy
Research Methodology
Affiliate Disclosure
Privacy Policy
Terms
Author Page

The page type affects:

- Which pages it should link to.
- Which pages should link to it.
- The type of CTA that should be used.
- The expected link priority.
- The expected position of the link.

---

4. Link Intent

Every contextual internal link should have a defined intent.

Allowed link intents:

EDUCATION
DISCOVERY
NAVIGATION
COMMERCIAL
COMPARISON
ALTERNATIVE
DEEPER_READING
NEXT_STEP
HUB_CONNECTION
PRODUCT_REFERENCE
CATEGORY_REFERENCE

4.1 Education

Use when the reader needs to understand a concept.

Example:

«If you're unfamiliar with active noise cancellation, see our guide to how ANC works.»

Target:

Educational article

---

4.2 Discovery

Use when the reader may want to explore related content.

Example:

«Explore more headphone buying guides.»

Target:

Related article
Category
Content Hub

---

4.3 Navigation

Use when the reader needs to move to a broader or more specific part of the site.

Example:

«Browse all headphones.»

Target:

Headphones category

---

4.4 Commercial

Use when the reader is moving toward evaluating or purchasing a product.

Example:

«See our full Sony WH-1000XM6 review.»

Target:

Product page
Product review
Buying guide

Do not make every product mention a commercial link.

---

4.5 Comparison

Use when the reader needs to compare multiple options.

Example:

«If you're deciding between the two, see our Sony vs Bose comparison.»

Target:

Comparison page

---

4.6 Alternative

Use when the reader may need another option.

Example:

«Looking for something less expensive? Explore these alternatives.»

Target:

Alternative page
Budget alternative article
Related product

---

4.7 Deeper Reading

Use when the current content introduces a subject that another page explains in greater depth.

Example:

«For a deeper explanation, read our guide to headphone drivers.»

---

4.8 Next Step

Use when the reader has reached a natural decision point.

Example:

Learn
   ↓
Compare
   ↓
Evaluate
   ↓
Choose

The link should help the reader move naturally to the next stage.

---

4.9 Hub Connection

Use to connect a supporting article to its Content Hub or connect related cluster pages.

Example:

Headphones Hub
      ↓
ANC Guide
      ↓
Sony WH-1000XM6 Review
      ↓
Sony vs Bose Comparison

---

5. Target Page Selection

The AI must never select a target page based only on matching keywords.

The AI must evaluate:

Topic Relevance
+
Search Intent Relevance
+
User Need
+
Page Relationship
+
Content Depth
+
Site Architecture

A keyword match alone is insufficient.

---

6. Target Scoring System

Each candidate target page should be evaluated using this model:

Factor| Score
Topic relevance| 0–5
User usefulness| 0–5
Search intent match| 0–5
Relationship to current page| 0–5
Content depth/value| 0–5

Maximum:

25

Recommended interpretation:

21–25 = Excellent target
17–20 = Strong target
13–16 = Possible target
9–12  = Weak target
0–8   = Do not link

The AI should prefer fewer highly relevant links over many weak links.

---

7. Link Relationship Rules

The AI should understand the relationship between page types.

Article → Article

Use when the second article directly expands the topic.

Priority:

High

---

Article → Category

Use when the reader may want to explore products or broader category content.

Priority:

High

---

Article → Product

Use when the product is directly relevant to the discussion.

Priority:

Medium / High

Do not turn every product mention into a product link.

---

Article → Comparison

Use when comparison is a natural next step.

Priority:

Medium / High

---

Article → Alternative

Use when alternatives are genuinely useful.

Priority:

Medium

---

Article → Content Hub

Use when the current article belongs to the hub or when the hub provides useful broader navigation.

Priority:

High

---

Category → Product

Use for relevant products belonging to the category.

Priority:

Very High

---

Category → Article

Use to provide educational or buying information.

Priority:

High

---

Product → Comparison

Use when a relevant comparison exists.

Priority:

High

---

Product → Alternative

Use when meaningful alternatives exist.

Priority:

High

---

Product → Category

Use to allow the reader to explore the broader category.

Priority:

High

---

Content Hub → Cluster Articles

This is one of the most important relationships.

A Content Hub should provide clear pathways to its important supporting content.

Priority:

Very High

---

8. Content Hub Linking Model

YallaBuy should use a hub-and-cluster structure where appropriate.

Example:

                    Headphones Hub
                          |
          +---------------+---------------+
          |               |               |
      Buying Guide     ANC Guide      Budget Guide
          |               |               |
       Products        Reviews       Alternatives
          \               |              /
           \              |             /
             Comparison Pages

The AI should identify:

Pillar / Hub
Cluster Article
Supporting Article
Product
Comparison
Alternative

---

9. Hub Rules

A Content Hub should generally link to:

Important cluster articles
Important category pages
Relevant comparisons
Important buying guides
Relevant products where useful

Cluster articles should generally link back to:

Their parent Hub
Relevant sibling articles
Relevant products
Relevant comparisons
Relevant alternatives

Sibling articles should not link to each other simply because they belong to the same hub.

There must be a meaningful contextual reason.

---

10. Contextual Linking

Contextual links should appear naturally inside useful content.

Good:

«If you care about blocking airplane and office noise, our guide to the best noise-cancelling headphones explains which models perform best for those situations.»

Bad:

«Best headphones → Click here → Headphones → Buy headphones.»

The link must be integrated into the meaning of the sentence.

---

11. Anchor Text Rules

Anchor text should clearly describe the destination.

Preferred

best noise-cancelling headphones
Sony WH-1000XM6 review
headphone buying guide
Sony vs Bose comparison
best budget headphones
how active noise cancellation works

Avoid

click here
read more
learn more
this article
this page
here
check this out

These generic anchors should only be used when there is a specific UX reason.

---

12. Anchor Text Must Match the Destination

The AI must verify:

Anchor meaning
      ↓
Target page topic

If the anchor says:

«best wireless headphones»

the target page must actually provide information about the best wireless headphones.

Do not use misleading anchor text simply because it contains a valuable keyword.

---

13. Anchor Text Variation

Do not repeatedly use exactly the same anchor for the same destination when natural variation is possible.

Possible variations:

Sony WH-1000XM6 review
our WH-1000XM6 review
Sony's WH-1000XM6 review
full WH-1000XM6 analysis

Variation must remain accurate.

Do not create artificial variations merely to manipulate anchor text.

---

14. Link Placement

The AI should choose placement based on context.

Possible locations:

Introduction
Body paragraph
Definition
Explanation
Example
Comparison section
Buying advice
Pros / Cons discussion
Conclusion
FAQ
Related Content section

Introduction

Use sparingly.

Only add a link if it immediately helps the reader understand or navigate the subject.

---

Body

This is the primary location for contextual internal links.

Links should appear immediately after or near the concept they expand.

---

Comparison Section

Useful for:

Detailed comparison
Product review
Alternative
Buying guide

---

Conclusion

Use a natural next-step link.

Example:

If you're still deciding, compare the top models in our headphone buying guide.

---

FAQ

Links can be useful when the linked page provides a deeper answer.

Do not turn every FAQ answer into a link.

---

15. CTA System

CTA means the text that encourages the reader to follow the internal link.

The CTA must match the reader's intent.

---

Educational CTA

Pattern:

Want to understand X better?
→ Read our guide to X.

---

Comparison CTA

Pattern:

Not sure which option is better?
→ Compare X and Y.

---

Alternative CTA

Pattern:

Looking for another option?
→ Explore these alternatives.

---

Category CTA

Pattern:

Want to see more options?
→ Browse our [category].

---

Buying Guide CTA

Pattern:

Ready to compare your options?
→ See our [buying guide].

---

Hub CTA

Pattern:

Want to explore the topic further?
→ Explore our complete [topic] guide.

---

Product CTA

Pattern:

Want a closer look at this model?
→ Read our [product] review.

The AI should avoid repetitive CTA templates when a natural sentence works better.

---

16. CTA vs Contextual Anchor

Not every internal link needs a CTA.

Use a contextual anchor when the link naturally belongs inside the sentence.

Use a CTA when the reader has reached a meaningful decision point.

Example:

Contextual

«Active noise cancellation works by generating a signal that counteracts external sound. Our guide to how ANC works explains the process in more detail.»

CTA

«Still deciding which ANC headphones are right for you? Explore our best noise-cancelling headphones guide.»

Both are valid.

---

17. Do Not Force Links

The AI must NOT add a link when:

The relationship is weak.
The target only matches one keyword.
The target does not answer a likely user need.
The link interrupts the sentence.
The same target was already linked nearby.
The link adds no meaningful value.

No link is better than a bad link.

---

18. Link Density

There is no universal fixed number of links that every page must contain.

The AI should consider:

Page length
Topic complexity
Number of relevant destinations
Page type
Reader intent
Existing links
Content structure

Avoid:

Link every paragraph.
Link every product mention.
Link every keyword.
Multiple links to the same destination in a small section.
Long paragraphs containing many competing links.

---

19. Duplicate Link Prevention

Before adding a link, check:

Has this target already been linked?
Is another link to the same target nearby?
Does another target provide a better next step?
Would another link genuinely help?

Repeated links to the same target may be acceptable when:

The page is long.
The reader reaches multiple independent decision points.
Each occurrence serves a different useful context.

Otherwise, avoid repetition.

---

20. Multiple Links in One Sentence

Avoid placing several competing internal links in a single sentence unless the sentence genuinely requires them.

Bad:

«Check our headphones guide, headphone comparison, headphone category, and headphone alternatives.»

Better:

«If you're still comparing options, our headphone buying guide walks through the main choices. You can then explore specific models and comparisons from there.»

---

21. User Journey Model

Internal linking should help the reader move through a logical journey.

Example:

Learn
 ↓
Explore
 ↓
Compare
 ↓
Evaluate
 ↓
Choose

The AI should determine the current stage.

Example:

How ANC Works
        ↓
Best ANC Headphones
        ↓
Sony vs Bose
        ↓
Sony WH-1000XM6 Review
        ↓
Product / Purchase Decision

Links should help the user progress naturally.

---

22. Commercial vs Informational Balance

YallaBuy should not turn informational content into a collection of sales links.

For informational pages:

Education
+
Related content
+
Useful products when relevant

For commercial pages:

Products
+
Comparisons
+
Alternatives
+
Buying guidance

The AI must preserve editorial usefulness.

---

23. Product Mention Rules

When a product is mentioned, ask:

Does the reader need more information about this product?

If yes:

→ Product Review / Product Page

If no:

→ Do not automatically link it.

Product mentions are not automatic link opportunities.

---

24. Comparison Rules

If the article discusses:

A vs B
A or B
Which is better?
Differences between A and B

and a dedicated comparison page exists, it is a strong candidate.

Example:

Article
   ↓
Sony vs Bose Comparison

Do not create a comparison link if the destination does not actually cover the comparison implied by the anchor.

---

25. Alternative Rules

Use alternative links when:

Price is discussed.
Availability is discussed.
A product has important limitations.
The reader may need a different feature set.
The reader wants another option.

The alternative must be genuinely relevant.

Do not label an unrelated product as an "alternative."

---

26. Category Linking Rules

Category links are useful when the reader moves from a specific topic to broader exploration.

Example:

Article
   ↓
Headphones Category

Good CTA:

«Browse all headphones to explore more models.»

Avoid inserting category links repeatedly throughout the same article.

---

27. Trust Page Linking

Trust pages should be linked when contextually relevant.

Examples:

Review
   ↓
How We Research

Editorial claim
   ↓
Editorial Policy

Affiliate disclosure
   ↓
Affiliate Disclosure

Do not force trust-page links into every article.

---

28. URL Rules

The AI must use the site's canonical URL structure.

Never create a URL based on guesswork if the target page already has a known canonical URL.

Before inserting a URL, verify:

Target exists
Target URL is correct
Target uses the current domain
Target is canonical
Target is not an old Vercel URL
Target is not an obsolete path
Target is not a duplicate page

Never invent a target URL.

---

29. Domain Consistency

Internal links must use the current YallaBuy domain and canonical URL structure.

Do not output obsolete deployment URLs.

Do not mix:

Production domain
Old Vercel deployment
Temporary development URL

Internal links must point to the intended production destination.

---

30. External vs Internal Links

The AI must distinguish:

Internal Link

from:

External Link

Internal linking rules apply only to pages within YallaBuy.

Amazon links are external commercial links and must not be treated as internal links.

---

31. Link Candidate Discovery

When generating internal links, the AI should follow this process:

1. Identify current page type.
2. Identify primary topic.
3. Identify secondary topics.
4. Identify search intent.
5. Identify important concepts in the content.
6. Find relevant YallaBuy pages.
7. Classify each candidate.
8. Score each candidate.
9. Reject weak candidates.
10. Select the strongest targets.
11. Determine placement.
12. Generate anchor text.
13. Generate CTA if necessary.
14. Validate destination.
15. Check duplicate links.
16. Perform final audit.

---

32. Link Candidate Table

Before finalizing links, the AI should internally evaluate candidates using a structure similar to:

Candidate| Intent| Relevance| User Value| Priority| Decision
Target A| Education| 5| 5| High| Link
Target B| Commercial| 4| 4| High| Link
Target C| Discovery| 2| 2| Low| Reject
Target D| Comparison| 5| 5| Very High| Link

The AI should not expose internal reasoning unless explicitly requested.

---

33. Priority Levels

Use:

P0 = Essential
P1 = High Value
P2 = Useful
P3 = Optional

P0

Links essential to the page architecture or user journey.

Examples:

Hub → Core Cluster
Category → Important Subcategory

P1

Highly useful contextual links.

Examples:

Article → Related Article
Product → Comparison
Article → Buying Guide

P2

Useful but not essential.

Examples:

Article → Alternative
Article → Secondary Related Content

P3

Optional links that should only be added if they improve UX.

---

34. Orphan Page Prevention

The AI should help identify pages that receive little or no internal linking.

A page should not become isolated simply because it was published.

When creating or updating content, consider:

Who should link to this page?
Which existing pages should reference it?
Which hub should contain it?

A new important page should have a path from relevant existing content.

---

35. New Page Integration

When a new page is created:

New Page
   ↓
Identify Parent / Hub
   ↓
Identify Related Pages
   ↓
Add Incoming Links
   ↓
Add Outgoing Links
   ↓
Validate Network

The AI should not only add outgoing links from the new page.

It should also consider where the new page should receive links from.

---

36. Updating Existing Content

When adding a new page to an existing topic cluster, the AI should inspect relevant existing pages.

Example:

New Article:
"Best Budget Noise-Cancelling Headphones"

Existing:
Headphones Hub
Best Headphones
ANC Guide
Budget Headphones Guide
Sony WH-CH720N Review

Potential relationships:

Hub
 ↓
New Article

ANC Guide
 ↓
New Article

Budget Guide
 ↓
New Article

New Article
 ↓
Relevant Products
 ↓
Relevant Reviews

The AI should create the smallest useful network rather than linking everything to everything.

---

37. Anti-Patterns

The following are prohibited:

Keyword Linking

Adding links only because a keyword appears.

---

Link Stuffing

Adding many links to increase internal-link count.

---

Generic Anchors

Using:

click here
read more
here
this page

without a strong UX reason.

---

Forced CTA

Adding a CTA when the reader has no reason to continue.

---

Irrelevant Product Links

Linking unrelated products because they are available.

---

Repetitive Links

Linking the same destination repeatedly without a meaningful reason.

---

False Alternatives

Calling a product an alternative when it does not serve a similar use case.

---

Misleading Anchor

Using an anchor that does not accurately describe the destination.

---

Orphan Creation

Publishing important content without considering how users and crawlers will reach it.

---

Link Everything to the Homepage

The homepage should not become the default target for unrelated content.

---

38. Examples

Example 1 — Educational Article

Current page:

How Noise Cancellation Works

Possible links:

→ Best Noise-Cancelling Headphones
→ Headphones Category
→ Relevant Product Review

Reason:

The reader may understand ANC first,
then want to explore products.

---

Example 2 — Product Review

Current page:

Sony WH-1000XM6 Review

Possible links:

→ Sony vs Bose Comparison
→ Best Noise-Cancelling Headphones
→ Headphones Category
→ Relevant Alternatives

---

Example 3 — Buying Guide

Current page:

Best Headphones

Possible links:

→ Headphones Hub
→ Best ANC Headphones
→ Best Budget Headphones
→ Product Reviews
→ Comparisons

---

39. Good vs Bad Linking

Bad

«Sony makes great headphones. Click here to read our review.»

Problems:

Generic anchor
Weak integration
CTA feels forced

Better

«The Sony WH-1000XM6 is one of Sony's flagship noise-cancelling models. Read our Sony WH-1000XM6 review for a closer look at its strengths and limitations.»

---

40. Contextual Relevance Test

Before adding a link, ask:

1. What is the reader learning here?
2. What question might they have next?
3. Does the target page answer that next question?
4. Is this the best available target?
5. Would the reader benefit from clicking it?

If the answer to #3 or #4 is no:

Do not add the link.

---

41. Final Link Validation

Before outputting a page, the AI must perform this checklist:

[ ] Every link has a purpose.
[ ] Every target is relevant.
[ ] Anchor text accurately describes the target.
[ ] No misleading anchors.
[ ] No unnecessary generic anchors.
[ ] No forced links.
[ ] No excessive links.
[ ] No unnecessary duplicate links.
[ ] CTAs match user intent.
[ ] Links appear in natural locations.
[ ] Important hub relationships are preserved.
[ ] Product links are contextually justified.
[ ] Comparison links are genuinely comparative.
[ ] Alternative links are genuinely relevant.
[ ] Category links provide useful navigation.
[ ] Target URLs are valid.
[ ] Target URLs use the production domain.
[ ] No obsolete deployment URLs are used.
[ ] No important page is unintentionally orphaned.

---

42. Final Decision Rule

The AI must follow this rule above all others:

«A useful link is better than a high number of links.»

If adding a link improves:

Understanding
Navigation
Discovery
Comparison
Decision-making

then consider adding it.

If it exists only because:

"There is a page I can link to"

do not add it.

---

43. AI Output Requirements

When asked to create or update internal links, the AI should be able to produce a structured linking plan containing:

Current Page
Page Type
Primary Intent

Target Page
Target Type
Link Intent
Priority
Anchor Text
Placement
CTA
Reason

Example:

Current Page:
Best Noise-Cancelling Headphones

Target:
How Noise Cancellation Works

Target Type:
Article

Intent:
Education

Priority:
P1

Anchor:
how noise cancellation works

Placement:
Within the section explaining ANC

CTA:
None

Reason:
The reader needs additional context about how ANC functions.

---

44. Internal Linking Architecture

YallaBuy should aim for a meaningful network rather than a linear chain.

Example:

                    Homepage
                       |
                  Headphones Hub
                       |
        +--------------+--------------+
        |              |              |
   Buying Guides    Education     Comparisons
        |              |              |
        +-------+------+-------+------+
                |              |
             Products      Alternatives
                |
             Reviews

The AI should preserve logical relationships between these layers.

---

45. Core Rules Summary

The AI must remember:

1. Relevance comes first.
2. User usefulness comes before SEO.
3. Every link needs a reason.
4. Keywords alone are not a reason.
5. Anchor text must describe the destination.
6. CTAs must match user intent.
7. Links should appear where they are useful.
8. Do not force links.
9. Do not over-link.
10. Avoid unnecessary duplicate links.
11. Use Content Hubs to organize related content.
12. Connect cluster pages naturally.
13. Consider incoming links when publishing new content.
14. Never invent URLs.
15. Never use obsolete production/deployment URLs.
16. Validate every destination.
17. Prefer fewer strong links over many weak links.
18. Internal linking should improve the reader's journey.

---

46. Master Rule

BEFORE ADDING A LINK:

Is the destination genuinely useful to the reader
at this exact point in the page?

        |
       YES
        ↓
Does it match the user's likely next intent?

        |
       YES
        ↓
Is it the best relevant YallaBuy destination?

        |
       YES
        ↓
Can the link be introduced naturally?

        |
       YES
        ↓
Use an accurate anchor and appropriate CTA.

        |
       NO
        ↓
DO NOT ADD THE LINK.

End of Specification