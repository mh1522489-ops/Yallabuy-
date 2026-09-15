Content Hub Skill

1. Purpose

This skill defines how AI must plan, build, analyze, maintain, and expand Content Hubs for YallaBuy.

A Content Hub is a structured group of related pages that collectively cover a main topic from multiple useful search intents and user needs.

The goal is not to create many pages.

The goal is to create a useful, logically connected, non-duplicated content system.

AI must treat a Content Hub as a connected information structure rather than a collection of independent articles.

---

2. Core Principle

«A content relationship must exist because one page provides meaningful value to another page, not simply because both pages contain similar keywords.»

Keyword similarity alone is not enough to justify:

- Creating a new page
- Linking two pages
- Grouping two pages into the same hub
- Creating a subtopic

Every relationship must have a clear reason.

---

3. Scope

This skill applies when AI is asked to:

- Create a new Content Hub
- Expand an existing Content Hub
- Add a new article to a Hub
- Add a product to a Hub
- Create comparisons
- Create alternatives
- Organize related articles
- Find content gaps
- Find duplicate or overlapping content
- Map relationships between pages
- Plan internal relationships
- Review the structure of an existing Hub
- Reorganize content
- Determine which pages should be related
- Determine which pages should link to each other

This skill works together with other YallaBuy documentation.

---

4. Relationship With Other Specifications

This skill does not replace other project specifications.

Use the appropriate specification for each responsibility.

Content Hub

Defines:

«Which pages belong together and why they are related.»

Internal Linking

Defines:

«How relationships should be implemented as actual internal links.»

Content Standards

Defines:

«How content should be written.»

Fact Checking

Defines:

«How factual information should be verified.»

SEO Standards

Defines:

«How pages should be optimized for search engines.»

Images

Defines:

«How images should be selected and implemented.»

Testing

Defines:

«How the resulting implementation should be tested.»

The Content Hub skill should identify relationships first and then defer link implementation details to "Internal-Linking.md".

---

5. Content Hub Model

AI should understand a Content Hub as a hierarchy and network.

A typical structure may look like:

Main Topic
│
├── Subtopics
│
├── Buying Guides
│
├── Best-Of Content
│
├── Educational Content
│
├── Brand Content
│
├── Product Pages
│
├── Comparison Pages
│
└── Alternative Pages

Not every Hub needs every page type.

AI must only create page types that provide real user value.

---

6. Hub Identification

Before creating or modifying a Hub, AI must identify:

1. The main topic
2. The primary user need
3. Important subtopics
4. Search intents
5. Existing pages
6. Product relationships
7. Comparison opportunities
8. Alternative opportunities
9. Missing useful topics
10. Duplicate or overlapping pages

Example:

Main Topic:
Headphones

Subtopics:
- Wireless
- Noise Cancelling
- Travel
- Gaming
- Brands
- Buying Guides
- Products
- Comparisons
- Alternatives

---

7. Page Classification

AI should classify pages before determining relationships.

Possible page types include:

HUB
SUBTOPIC
BUYING_GUIDE
BEST_OF
EDUCATIONAL
BRAND
PRODUCT
COMPARISON
ALTERNATIVE
FAQ
REFERENCE

A page may have more than one characteristic, but AI should identify its primary purpose.

Example:

"Best Noise Cancelling Headphones"

Primary Type:
BEST_OF

Topic:
Noise Cancelling Headphones

Intent:
Commercial Investigation

---

8. Search Intent

AI must consider search intent when organizing a Hub.

Common intents include:

Informational

The user wants to learn something.

Examples:

How does noise cancellation work?
What is ANC?
How to clean headphones

Commercial Investigation

The user is comparing options before buying.

Examples:

Best noise cancelling headphones
Best headphones for travel
Best wireless headphones

Product Intent

The user is researching a specific product.

Examples:

Sony WH-1000XM5
Bose 700 review
AirPods Max

Comparison Intent

The user wants to compare specific options.

Examples:

XM5 vs XM4
Bose 700 vs XM5

Alternative Intent

The user wants alternatives to a specific product.

Examples:

XM5 alternatives
Bose 700 alternatives

AI should use intent to determine whether two pages genuinely support the same user journey.

---

9. Relationship Rules

AI must identify the reason for every meaningful relationship.

Valid relationship reasons include:

Supporting Relationship

One page expands on a topic mentioned by another.

Headphone Buying Guide
        ↓
Best Wireless Headphones

Educational Relationship

An educational page explains something needed to understand another page.

What Is ANC?
      ↓
Best Noise Cancelling Headphones

Product Relationship

An article recommends or discusses a specific product.

Best Headphones
      ↓
Sony WH-1000XM5

Comparison Relationship

A product page leads to a relevant comparison.

Sony WH-1000XM5
      ↓
XM5 vs XM4

Alternative Relationship

A product leads to relevant alternatives.

Sony WH-1000XM5
      ↓
Best XM5 Alternatives

Topic Relationship

Two pages cover closely related subtopics.

Wireless Headphones
        ↕
Bluetooth Headphones

Only use this relationship when the pages have sufficiently distinct purposes.

---

10. Do Not Link Based Only on Keywords

AI must not assume:

Same keyword
=
Must link

This is incorrect.

Instead ask:

«Would the user reasonably benefit from visiting the other page at this point?»

If the answer is no, the relationship should not be created merely for SEO.

---

11. Content Mapping

Before adding significant new content, AI should create or mentally construct a Content Map.

Example:

Headphones Hub
│
├── Headphone Buying Guide
│
├── Best Headphones
│
├── Best Wireless Headphones
│
├── Best Noise Cancelling Headphones
│
├── Best Headphones for Travel
│
├── Sony Headphones Guide
│
├── Bose Headphones Guide
│
├── Sony WH-1000XM5
│
├── Sony WH-1000XM4
│
├── Bose 700
│
├── XM5 vs XM4
│
└── XM5 Alternatives

AI should understand the purpose of every page.

---

12. Parent and Supporting Pages

For every page, AI should determine whether it has:

- A parent topic
- Supporting pages
- Related products
- Related comparisons
- Related alternatives
- Educational resources

Example:

Best Noise Cancelling Headphones
│
├── Parent:
│   Headphones
│
├── Supporting:
│   Headphone Buying Guide
│
├── Products:
│   Sony WH-1000XM5
│   Bose 700
│
└── Comparison:
    XM5 vs Bose 700

The relationship must be meaningful, not artificial.

---

13. Content Gaps

AI should look for useful missing content.

A Content Gap exists when:

- An important user need is not covered.
- A major subtopic is missing.
- Users need information to make a decision.
- Existing pages do not adequately answer an important intent.
- A product relationship lacks supporting information.

Example:

Headphones Hub
│
├── Best Headphones
├── Wireless
├── ANC
└── Sony

AI may identify:

Missing:
Headphone Buying Guide

However, AI must not create a page merely because a category looks incomplete.

The proposed page must have:

- A clear purpose
- Real user value
- Distinct search intent
- Sufficient unique information
- A meaningful relationship to the existing Hub

---

14. Duplicate Content Prevention

Before proposing a new page, AI must check whether an existing page already serves the same purpose.

Use this process:

New Page Idea
      ↓
Does a similar page exist?
      ↓
Yes ──→ Is its intent different?
             ↓
          No → Update existing page
             ↓
          Yes → Consider new page

AI should prefer improving an existing page when a new page would create unnecessary overlap.

Do not create multiple pages simply by changing:

- Word order
- Year
- Minor keyword variations
- Similar product terms
- Nearly identical search queries

unless there is a legitimate distinct intent and useful content difference.

---

15. New Page Integration

Whenever a new page is created, AI must not treat it as an isolated page.

The AI should determine:

1. Which Hub it belongs to
2. Which parent topic it belongs to
3. Which existing pages support it
4. Which existing pages should reference it
5. Which products are relevant
6. Which comparisons are relevant
7. Which alternatives are relevant
8. Whether the page creates new content opportunities

Example:

New Page:
Best Headphones for Travel

Hub:
Headphones

Parent Topic:
Buying Guides

Related Pages:
Best Headphones
Best Wireless Headphones
Noise Cancelling Headphones

Related Products:
Relevant travel-friendly products

After identifying these relationships, apply "Internal-Linking.md" to determine the actual link implementation.

---

16. Product Integration

YallaBuy is a product-focused affiliate and editorial website.

Products are therefore an important part of Content Hubs.

AI should connect products to relevant editorial content when useful.

Example:

Headphones Hub
│
├── Buying Guides
│
├── Reviews / Product Pages
│
├── Comparisons
│
└── Alternatives

A product should not be inserted into an article simply because it is an Amazon product.

The product must be relevant to the page's purpose.

AI must never invent product specifications, prices, ratings, reviews, testing results, or user experiences.

Follow YallaBuy's fact-checking and content standards.

---

17. Comparison Integration

Comparisons should be connected to products that users may realistically compare.

Example:

Sony WH-1000XM5
        ↕
Sony WH-1000XM4
        ↓
XM5 vs XM4

AI should consider creating or connecting a comparison when:

- Products target similar users.
- Users are likely to choose between them.
- The comparison answers a meaningful decision.
- Sufficient factual information exists.

Do not create comparisons simply because two products are in the same category.

---

18. Alternative Integration

Alternative pages should exist when users may reasonably want another option.

Example:

Sony WH-1000XM5
        ↓
XM5 Alternatives

The alternative relationship should have a meaningful reason, such as:

- Lower price
- Different feature priorities
- Different use case
- Different comfort preference
- Different ecosystem
- Different design or form factor

AI must not claim superiority without evidence.

---

19. Internal Linking Integration

The Content Hub skill determines:

«"These pages are meaningfully related."»

"Internal-Linking.md" determines:

«"How should that relationship become an actual link?"»

AI must follow this separation.

Example:

Content Hub:
Article A supports Product B.

Internal Linking:
Place a contextual link from Article A to Product B
using an accurate and natural anchor.

Do not use excessive links simply because two pages are related.

---

20. User Journey

AI should consider how users move through the Hub.

A useful journey might be:

Informational Content
        ↓
Buying Guide
        ↓
Best-Of Content
        ↓
Product
        ↓
Comparison
        ↓
Alternative
        ↓
Purchase Decision

This does not mean every user must follow this exact path.

The goal is to provide useful next steps.

---

21. Orphan Prevention

When a new page is added, AI should check whether it will become an orphan page.

An orphan page is a page with no meaningful internal connections to the rest of the site.

Every important Content Hub page should have appropriate relationships with relevant pages.

However, do not create meaningless links solely to avoid orphan status.

---

22. Hub Scalability

A Content Hub should be able to grow without becoming confusing.

AI should prefer:

- Clear topic boundaries
- Clear page purposes
- Logical categories
- Reusable structures
- Stable relationships
- Minimal duplication

Avoid creating extremely deep or complicated hierarchies when a simpler structure works.

---

23. AI Decision Process

When deciding whether two pages belong in the same Hub, ask:

1. Do they cover the same broad topic?
2. Do they serve related user needs?
3. Are their search intents compatible?
4. Does one page meaningfully support the other?
5. Would users benefit from moving between them?
6. Are their purposes sufficiently distinct?
7. Would the relationship remain useful without considering SEO?

If the answer is mostly no, do not force the relationship.

---

24. AI Workflow

When creating or reviewing a Content Hub, follow this process:

Understand the Main Topic
        ↓
Inspect Existing Content
        ↓
Identify Existing Hub
        ↓
Classify Pages
        ↓
Analyze Search Intent
        ↓
Map Existing Relationships
        ↓
Identify Content Gaps
        ↓
Identify Duplicate/Overlapping Pages
        ↓
Plan New Content
        ↓
Integrate New Pages
        ↓
Identify Meaningful Relationships
        ↓
Apply Internal Linking Rules
        ↓
Validate Hub Structure
        ↓
Report Results

---

25. Existing Hub Review

When reviewing an existing Hub, AI should check:

Structure

- Is the main topic clear?
- Are subtopics logical?
- Are page types clearly defined?

Coverage

- Are important user intents covered?
- Are important subtopics missing?

Relationships

- Are pages meaningfully connected?
- Are important pages isolated?

Duplication

- Are multiple pages targeting nearly the same purpose?
- Could some pages be merged or improved?

User Journey

- Can users naturally move from learning to evaluation to decision-making?

Scalability

- Can new content be added without making the Hub confusing?

---

26. Output Format

When AI analyzes or creates a Content Hub, it should provide a structured result.

Example:

Hub:
Headphones

Main Topic:
Headphones

Pages:

1. Headphone Buying Guide
Type:
BUYING_GUIDE

Intent:
Informational

Purpose:
Helps users understand what to consider before buying.

Related Pages:
- Best Headphones
- Best Wireless Headphones
- Product Pages


2. Best Noise Cancelling Headphones
Type:
BEST_OF

Intent:
Commercial Investigation

Purpose:
Helps users compare recommended ANC headphones.

Related Pages:
- What Is ANC?
- Sony WH-1000XM5
- Bose 700
- Headphone Buying Guide


3. Sony WH-1000XM5
Type:
PRODUCT

Intent:
Product

Related Pages:
- Best Noise Cancelling Headphones
- XM5 vs XM4
- XM5 Alternatives

---

27. When Creating a New Page

AI should provide:

Page:
[Page Name]

Hub:
[Hub Name]

Primary Type:
[Page Type]

Primary Intent:
[Search Intent]

Purpose:
[Why the page exists]

Parent:
[Parent Page]

Related Pages:
[Relevant Pages]

Products:
[Relevant Products]

Comparisons:
[Relevant Comparisons]

Alternatives:
[Relevant Alternatives]

Reason for Relationships:
[Why these pages are related]

Duplicate Check:
[Result]

Content Gap:
[Result]

---

28. AI Rules

AI MUST:

- Understand the Hub before adding content.
- Inspect existing pages before proposing new pages.
- Identify search intent.
- Identify meaningful relationships.
- Check for duplicate or overlapping content.
- Consider user journeys.
- Consider content gaps.
- Integrate new pages into the existing Hub.
- Use "Internal-Linking.md" for actual link implementation.
- Preserve existing architecture.
- Respect YallaBuy content and fact-checking rules.
- Clearly distinguish recommendations from verified facts.

---

29. AI Must Not

AI MUST NOT:

- Create content simply to increase page count.
- Create pages only because keywords are similar.
- Create duplicate articles with minor wording changes.
- Add meaningless internal links.
- Force unrelated pages into the same Hub.
- Create unnecessary category depth.
- Invent product information.
- Invent search data.
- Claim a content gap exists without analysis.
- Claim two pages are related without a clear reason.
- Modify unrelated content while integrating a new page.
- Replace existing useful pages unnecessarily.

---

30. Quality Principles

A strong Content Hub should be:

Useful

It should help users accomplish something.

Coherent

Pages should have logical relationships.

Distinct

Each page should have a clear purpose.

Evidence-Based

Product and factual claims must follow YallaBuy's verification standards.

Navigable

Users should be able to discover relevant next steps.

Scalable

The structure should support future growth.

Non-Manipulative

The structure must not exist solely to manipulate search engines.

---

31. Final Validation Checklist

Before considering a Content Hub complete, verify:

[ ] Main topic is clearly defined
[ ] Hub purpose is clear
[ ] Pages have clear purposes
[ ] Page types are identified
[ ] Search intents are understood
[ ] Relationships have meaningful reasons
[ ] No unnecessary duplicate pages exist
[ ] Important content gaps were considered
[ ] New pages are integrated into the Hub
[ ] Products are connected where useful
[ ] Comparisons are connected where useful
[ ] Alternatives are connected where useful
[ ] No meaningless links were created
[ ] Internal linking rules were followed
[ ] Orphan pages were considered
[ ] User journeys are logical
[ ] Structure can scale
[ ] Content accuracy rules are respected
[ ] No unsupported claims were invented

---

32. Core Rule

«Build Content Hubs around user needs and meaningful topical relationships, not around keywords or page count.»

A successful YallaBuy Content Hub should make the website easier to understand for:

- Users
- Search engines
- Developers
- Editors
- AI coding assistants

The goal is not:

More Pages

The goal is:

Better Connected Content