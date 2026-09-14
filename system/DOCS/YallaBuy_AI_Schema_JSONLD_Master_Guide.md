# YallaBuy --- AI Master Guide for Correct Schema.org & Google JSON-LD

**Document purpose:** This file is the permanent instruction/reference
document for any AI that creates, edits, audits, or explains Schema.org
structured data and JSON-LD for YallaBuy.

**Site:** YallaBuy\
**Canonical site URL:** `https://yallabuy-sg5c.vercel.app/`\
**Primary author:** Mahmoud Hamdy\
**Role:** Founder & Editor\
**Primary site model:** Affiliate product discovery, product pages,
editorial reviews, buying guides, comparisons, and informational
content.

------------------------------------------------------------------------

# 1. CRITICAL AI OPERATING RULES

These rules have the highest priority inside this document.

## Rule 1 --- Never invent structured-data facts

The AI MUST NOT invent:

-   prices
-   availability
-   ratings
-   rating counts
-   review counts
-   review text
-   dates
-   author identities
-   product identifiers
-   URLs
-   image URLs
-   brands
-   specifications
-   product variants
-   business information
-   organization information
-   FAQ questions or answers
-   article dates
-   publisher information

If the required value is unknown, the AI must either:

1.  ask the user for the value,
2.  omit the property when omission is valid,
3.  or explicitly say that the property cannot safely be generated.

Never fill an unknown field with a plausible-looking value.

## Rule 2 --- Structured data must represent the visible page

The AI MUST treat the visible page as the source of truth.

If information is not present on the page, do not add it to structured
data merely because the information is available somewhere else.

Examples:

-   If the page does not display a current price, do not add `price`.
-   If the page does not display availability, do not add
    `availability`.
-   If the page does not display a YallaBuy rating, do not add
    `aggregateRating`.
-   If the page does not contain the FAQ, do not create FAQ schema for
    it.
-   If the page does not contain a review by Mahmoud Hamdy, do not
    create a `Review` claiming that he reviewed the product.

Google explicitly requires structured data to represent the content
visible to users and warns against adding structured data for
information that is not visible on the page.

## Rule 3 --- Schema.org validity is not the same as Google rich-result eligibility

The AI MUST distinguish between:

1.  valid Schema.org vocabulary,
2.  valid JSON-LD syntax,
3.  Google-supported structured data,
4.  eligibility for a specific Google rich result,
5.  and the possibility that Google actually chooses to display the rich
    result.

A schema can be valid Schema.org and still provide no Google rich-result
enhancement.

Never tell the user that structured data guarantees a rich result.

## Rule 4 --- Do not add schema just because it exists

The AI MUST select structured-data types based on the actual page.

Do not create:

-   `Product` on an unrelated article,
-   `FAQPage` without visible FAQs,
-   `Review` without a real review,
-   `AggregateRating` without a genuine rating aggregation,
-   `Offer` without a real offer,
-   `Organization` information that is not true,
-   `Person` information that is not true,
-   `ItemList` merely because a page contains several links.

Less correct schema is worse than less schema.

## Rule 5 --- URLs must be exact

Never invent or alter YallaBuy URLs.

The AI MUST preserve the user's supplied URL exactly unless the user
explicitly asks to change it.

Do not:

-   add fake paths,
-   change `.html`,
-   change folder names,
-   remove path segments,
-   invent canonical URLs,
-   substitute a different image URL,
-   create a URL because it "looks right."

If a URL is unknown, use a placeholder only when the user explicitly
wants a template; otherwise ask for the correct URL.

## Rule 6 --- The AI must validate before returning code

Before producing final JSON-LD, perform an internal validation pass:

-   Is the JSON syntactically valid?
-   Are all braces and brackets balanced?
-   Are all strings quoted correctly?
-   Are commas correct?
-   Are there duplicate properties?
-   Does every URL look complete and intentional?
-   Does every property belong to the selected Schema.org type?
-   Does the data match the visible page?
-   Are Google-specific requirements satisfied where relevant?
-   Is the schema appropriate for this exact page type?
-   Did the AI accidentally invent a value?
-   Did the AI include an `Offer` without a valid price when the page
    does not support it?
-   Did the AI use an external rating as if it were YallaBuy's own
    rating?
-   Did the AI create FAQ entries that are not visible?
-   Is the image actually a product image when used as `Product.image`?

Only after this validation should the AI output the code.

------------------------------------------------------------------------

# 2. YALLABUY FIXED IDENTITY

These values are fixed unless the user explicitly changes them.

## Website

-   Name: `YallaBuy`
-   URL: `https://yallabuy-sg5c.vercel.app/`

## Author

-   Name: `Mahmoud Hamdy`
-   Job title: `Founder & Editor`
-   Author URL:
    `https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html`

The AI must use Mahmoud Hamdy as the author when the page is authored by
YallaBuy's standard author.

Do not create another author name unless the user explicitly introduces
another legitimate author.

## Organization

-   Name: `YallaBuy`
-   URL: `https://yallabuy-sg5c.vercel.app/`

If an Organization `@id` is used, the preferred stable ID is:

`https://yallabuy-sg5c.vercel.app/#organization`

## Important URL rule

The following are different URLs and must not be casually substituted:

`https://yallabuy-sg5c.vercel.app/`

`https://yallabuy-sg5c.vercel.app`

`https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html`

The AI may normalize a trailing slash only when it is explicitly
instructed to canonicalize URLs. Otherwise preserve supplied URLs.

------------------------------------------------------------------------

# 3. YALLABUY PAGE TYPES

The AI must first identify the page type.

Typical YallaBuy pages include:

## A. Main homepage

Example:

`https://yallabuy-sg5c.vercel.app/`

Possible structured data:

-   `Organization`
-   `WebSite`
-   `WebPage`

Only include properties supported by the actual page.

## B. Product page

Example:

`/products/product4.html`

This is a page centered around a specific product.

Possible structured data:

-   `Product`
-   `Review`
-   `AggregateRating`
-   `BreadcrumbList`
-   `WebPage`
-   `Organization`
-   `Person`

The exact combination depends on visible content.

## C. Product review / buying guide

Example:

`/products/product4-folder/guides/Is-Sony-WH-1000XM5-Worth-It.html`

This is an editorial page about a specific product.

Possible structured data:

-   `Product`
-   nested `Review`
-   `BreadcrumbList`
-   `Article` or `BlogPosting` when appropriate
-   `FAQPage` if visible FAQs exist
-   `Person`
-   `Organization`

Do not automatically treat every guide as both a Product page and
Article unless the page genuinely has both roles.

## D. Category/listing page

Examples:

-   headphones
-   earbuds
-   smart home
-   robot vacuums

Possible structured data:

-   `CollectionPage`
-   `ItemList`
-   `BreadcrumbList`

Do not place a single-product `Product` schema on a category page unless
the page is actually about one product.

## E. Informational article

Possible structured data:

-   `Article`
-   `BlogPosting`
-   `BreadcrumbList`
-   `Person`
-   `Organization`
-   `FAQPage` when appropriate

## F. FAQ content

`FAQPage` is only appropriate when the page visibly contains the
corresponding questions and answers.

------------------------------------------------------------------------

# 4. JSON-LD FUNDAMENTALS

YallaBuy should normally use JSON-LD.

Basic structure:

``` html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "PRODUCT NAME"
}
</script>
```

## JSON rules

The AI must ensure:

-   JSON uses double quotes.
-   Property names are quoted.
-   String values are quoted.
-   Numbers can be numeric values or strings where appropriate, but use
    a consistent style.
-   No comments appear inside JSON.
-   No trailing commas.
-   No JavaScript variables.
-   No HTML inside JSON unless the property specifically allows it.
-   No Markdown inside JSON values.
-   No `undefined`.
-   No `null` unless there is a deliberate reason and the vocabulary
    supports it.
-   No placeholder values in production code.

Incorrect:

``` json
{
  "name": "Sony WH-1000XM5",
}
```

Correct:

``` json
{
  "name": "Sony WH-1000XM5"
}
```

------------------------------------------------------------------------

# 5. PRODUCT SCHEMA --- MASTER RULES

`Product` is one of the most important structured-data types for
YallaBuy.

Google supports Product structured data for product pages, including
product reviews and pages where users cannot directly purchase the
product.

For YallaBuy's affiliate model, editorial product snippets are
particularly relevant.

## Minimum concept

A basic Product can contain:

-   `name`
-   `image`
-   `description`
-   `brand`
-   product identifiers when genuinely known
-   `review`
-   `aggregateRating`
-   `offers` when an actual offer is represented

## Required decision

Before creating Product schema, ask:

1.  Is this page actually about one product?
2.  Is the product name visible?
3.  Is the product image visible?
4.  Is the description accurate?
5.  Does the page contain a review or rating?
6.  Does the page display a current offer/price?
7.  Are product identifiers available?
8.  Are variants involved?

------------------------------------------------------------------------

# 6. PRODUCT IMAGE RULES

For `Product.image`, use the actual product image.

The user will update the image URL with the correct value, but the AI
must generate a structurally correct placeholder or clearly marked
replacement field when creating a template.

Preferred:

``` json
"image": [
  "https://yallabuy-sg5c.vercel.app/path/to/real-product-image.avif"
]
```

A single string is also valid Schema.org:

``` json
"image": "https://yallabuy-sg5c.vercel.app/path/to/real-product-image.avif"
```

For YallaBuy, arrays are preferred when multiple genuine product images
are available.

## Product image rule

The image used for `Product.image` should actually represent the
product.

Do not use:

-   an airplane scene that merely mentions the product,
-   a decorative article image,
-   a generic lifestyle image,
-   an unrelated banner,
-   a category illustration.

If an article image shows the XM5 in an airplane, but the product is not
clearly represented, it should not automatically become the primary
Product image.

## Image URL rules

The AI must not:

-   invent image filenames,
-   change `.avif` to `.jpg` without evidence,
-   assume the image exists,
-   use a relative URL when a full URL is required by the
    implementation,
-   use an image that is blocked or inaccessible when the user knows it
    is unavailable.

------------------------------------------------------------------------

# 7. PRODUCT DESCRIPTION RULES

`description` should accurately describe the product and should agree
with the visible page.

Do not copy manufacturer claims that are not present or supported by the
page merely to make the schema richer.

Example:

``` json
"description": "Premium over-ear wireless noise-canceling headphones with 30mm drivers, LDAC, multipoint Bluetooth, and up to 30 hours battery life."
```

This is acceptable only if the page's product content supports those
facts.

Do not add unsupported claims such as:

-   "best headphones in the world"
-   "number one"
-   "perfect"
-   "100% waterproof"

unless the page genuinely supports the statement.

------------------------------------------------------------------------

# 8. BRAND RULES

For Sony WH-1000XM5:

``` json
"brand": {
  "@type": "Brand",
  "name": "Sony"
}
```

The AI must use the actual manufacturer/brand.

Do not confuse:

-   manufacturer,
-   retailer,
-   affiliate website,
-   publisher,
-   organization.

For example:

`Sony` = product brand.

`YallaBuy` = publisher/site/organization.

`Mahmoud Hamdy` = author.

------------------------------------------------------------------------

# 9. PRICE / OFFER RULES --- EXTREMELY IMPORTANT

This is a permanent YallaBuy rule.

## If the price is visible on the page

If the page visibly displays a current product price and that price is
genuinely represented as an offer, the AI may include:

``` json
"offers": {
  "@type": "Offer",
  "price": "299.99",
  "priceCurrency": "USD"
}
```

Add other offer properties only when they are true and supported.

## If the price is NOT visible on the page

The AI MUST NOT create:

-   `price`
-   `lowPrice`
-   `highPrice`
-   an invented price
-   a stale price
-   a guessed price
-   an Offer merely to make Product schema richer

For YallaBuy pages that do not show a price, omit `offers` rather than
inventing offer data.

## Do not create incomplete offers

Avoid:

``` json
"offers": {
  "@type": "Offer",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock"
}
```

when the page does not actually represent a current offer/price.

The fact that the product may be available on Amazon does not
automatically mean YallaBuy should claim the product is `InStock`.

## Affiliate link rule

An Amazon affiliate button does not automatically mean YallaBuy should
create an `Offer`.

If the page simply says:

"Check price on Amazon"

and does not display a current price, do not invent a price or offer.

If the page visibly displays a current price, use the actual visible
value and make sure it is accurate at the time the page is
published/updated.

------------------------------------------------------------------------

# 10. AMAZON PRICE RULES

YallaBuy is an Amazon affiliate site.

The AI must not assume that Amazon's current price is the same as
YallaBuy's displayed price.

If the user says:

"Amazon price is \$299"

that does not automatically mean the page's `offers.price` should be
`$299`.

First determine whether `$299` is actually displayed on the YallaBuy
page.

If not, omit `offers`.

Do not add:

``` json
"price": "299"
```

just because the Amazon listing has that price.

------------------------------------------------------------------------

# 11. AMAZON RATING RULES

This is another permanent YallaBuy rule.

Do not automatically copy Amazon's rating into YallaBuy's
`aggregateRating`.

Example:

Amazon:

`4.5 stars`

`2,847 ratings`

This does NOT automatically become:

``` json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.5",
  "ratingCount": "2847"
}
```

The AI must determine what the rating represents and whether it is
genuinely the rating shown/represented by YallaBuy.

## YallaBuy rating

If YallaBuy independently rates a product:

`YallaBuy Rating: 4.5/5`

and that rating is visibly displayed on the page, the AI may use it as
appropriate.

Example:

``` json
"review": {
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Mahmoud Hamdy"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.5",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

Only use `aggregateRating` when the rating is genuinely an aggregate of
multiple ratings/reviews and the page supports that representation.

## Never mislabel external ratings

Never make Amazon's customer rating appear to be YallaBuy's own rating.

Never use a number of Amazon reviews as if Mahmoud Hamdy wrote that many
reviews.

------------------------------------------------------------------------

# 12. REVIEW SCHEMA

A `Review` represents a genuine review.

For YallaBuy, a review can represent an editorial product review by
Mahmoud Hamdy when the page actually contains that review.

Basic structure:

``` json
"review": {
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Mahmoud Hamdy"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.5",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

## Author

Default YallaBuy author:

``` json
"author": {
  "@type": "Person",
  "name": "Mahmoud Hamdy",
  "jobTitle": "Founder & Editor",
  "url": "https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html"
}
```

Use only the fields that are true and useful.

## Review body

If the page contains a genuine review body, the AI may use `reviewBody`
where appropriate.

Do not manufacture review text.

## Review rating

Only include a rating if the reviewer actually assigned it and it is
represented on the page.

------------------------------------------------------------------------

# 13. AGGREGATERATING RULES

`aggregateRating` means an overall rating based on multiple ratings or
reviews.

Example:

``` json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.5",
  "bestRating": "5",
  "worstRating": "1",
  "ratingCount": "120"
}
```

Only use this when:

-   the page genuinely presents an aggregate rating,
-   the number is accurate,
-   the rating scale is accurate,
-   the count is accurate,
-   the rating is not falsely attributed to YallaBuy,
-   and the page visibly supports it.

## Do not use aggregateRating for one editorial rating

If Mahmoud Hamdy gives one review score of `4.5/5`, that is normally a
review rating, not automatically an aggregate rating.

Use:

`Review.reviewRating`

rather than pretending it is an aggregate of many ratings.

------------------------------------------------------------------------

# 14. REVIEW VS AGGREGATERATING DECISION TREE

Use this decision tree.

### Case 1

One YallaBuy editor gives:

`4.5/5`

Use:

`Review` + `reviewRating`

Do not automatically use `aggregateRating`.

### Case 2

YallaBuy has 50 genuine user ratings averaging 4.5/5 and the page
visibly shows that.

Use:

`aggregateRating`

with the correct count.

### Case 3

Amazon has 2,847 ratings averaging 4.5/5 but YallaBuy does not have its
own aggregate rating.

Do not automatically copy the Amazon rating into YallaBuy's
aggregateRating.

### Case 4

The user provides a legitimate external rating and explicitly wants it
represented, and the page visibly identifies the source and context.

The AI must carefully model the source without misleading Google about
who owns the rating. If there is any ambiguity, ask the user rather than
guessing.

------------------------------------------------------------------------

# 15. PRODUCT REVIEW PAGE TEMPLATE

Recommended baseline for a genuine YallaBuy editorial product review
without a visible price:

``` html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Sony WH-1000XM5",
  "image": [
    "https://yallabuy-sg5c.vercel.app/REPLACE-WITH-REAL-PRODUCT-IMAGE.avif"
  ],
  "description": "Premium over-ear wireless noise-canceling headphones with 30mm drivers, LDAC, multipoint Bluetooth, and up to 30 hours battery life.",
  "brand": {
    "@type": "Brand",
    "name": "Sony"
  },
  "review": {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "Mahmoud Hamdy",
      "jobTitle": "Founder & Editor",
      "url": "https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.5",
      "bestRating": "5",
      "worstRating": "1"
    },
    "publisher": {
      "@type": "Organization",
      "name": "YallaBuy",
      "url": "https://yallabuy-sg5c.vercel.app/"
    }
  }
}
</script>
```

The AI must treat the image, description, and rating as
examples/placeholders unless verified from the user's page.

------------------------------------------------------------------------

# 16. PRODUCT PAGE WITH VISIBLE PRICE

If the page actually displays `$299.99`:

``` json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Sony WH-1000XM5",
  "image": [
    "https://yallabuy-sg5c.vercel.app/REAL-PRODUCT-IMAGE.avif"
  ],
  "description": "REAL DESCRIPTION FROM PAGE",
  "brand": {
    "@type": "Brand",
    "name": "Sony"
  },
  "offers": {
    "@type": "Offer",
    "price": "299.99",
    "priceCurrency": "USD"
  }
}
```

Only use this when the price is actually visible and current.

------------------------------------------------------------------------

# 17. PRODUCT IDENTIFIERS

When genuinely available, useful identifiers may include:

-   `sku`
-   `mpn`
-   `gtin8`
-   `gtin12`
-   `gtin13`
-   `gtin14`
-   `isbn` for books
-   `asin` where supported by Schema.org

Never invent identifiers.

If the user gives an ASIN, do not convert it into a GTIN.

If the user gives an MPN, do not call it a SKU.

Each identifier has a different meaning.

------------------------------------------------------------------------

# 18. PRODUCT VARIANTS

If a product has genuine variants, the AI should consider Google's
ProductGroup/Product variant guidance.

Examples of possible variant dimensions:

-   color
-   size
-   material
-   storage capacity
-   configuration

Do not create `ProductGroup` merely because two products are similar.

Only group true variants of the same parent product.

For electronics, examples might include:

-   same headphones in different colors,
-   same SSD in different capacities,
-   same phone model in different storage configurations.

------------------------------------------------------------------------

# 19. BREADCRUMBLIST

Breadcrumb schema describes the page's position in the site hierarchy.

Example:

``` html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yallabuy-sg5c.vercel.app/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Headphones",
      "item": "https://yallabuy-sg5c.vercel.app/products/product4.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Sony WH-1000XM5 Review",
      "item": "https://yallabuy-sg5c.vercel.app/products/product4-folder/guides/Is-Sony-WH-1000XM5-Worth-It.html"
    }
  ]
}
</script>
```

## Breadcrumb rules

-   Use the real hierarchy.
-   Use the actual page title/name.
-   Use exact URLs.
-   Positions start at 1.
-   Do not create fake categories.
-   Do not claim a page belongs to a category if the website navigation
    does not support it.

------------------------------------------------------------------------

# 20. FAQPAGE

`FAQPage` should only be used when the page visibly contains the FAQ
questions and their answers.

Example:

``` json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Sony WH-1000XM5 still worth buying in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The XM5 remains an excellent premium ANC headphone, especially when heavily discounted."
      }
    }
  ]
}
```

## FAQ rules

The AI MUST:

-   use only questions actually present on the page,
-   use the corresponding visible answers,
-   preserve the meaning of the answer,
-   not invent extra questions,
-   not add hidden FAQs,
-   not add questions solely for SEO,
-   not create a 20-question FAQ schema when the page visibly has only 5
    questions.

Google's structured-data guidelines emphasize that structured data
should match visible content.

------------------------------------------------------------------------

# 21. FAQ DOES NOT GUARANTEE FAQ RICH RESULTS

Do not tell the user:

"Adding FAQPage will make the FAQ appear in Google."

Structured data makes content understandable and may provide eligibility
where Google supports that feature, but Google controls the actual
display.

The AI must distinguish:

-   schema correctness,
-   eligibility,
-   actual appearance.

------------------------------------------------------------------------

# 22. ORGANIZATION

YallaBuy's organization can be represented as:

``` html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://yallabuy-sg5c.vercel.app/#organization",
  "name": "YallaBuy",
  "url": "https://yallabuy-sg5c.vercel.app/"
}
</script>
```

Add:

-   logo,
-   sameAs,
-   contact information,
-   social profiles,
-   other properties

only when they are accurate and supported.

## Logo

If the real logo URL is:

`https://yallabuy-sg5c.vercel.app/images/yallabuy-logo.png`

then it may be used if the file exists and represents the organization
logo.

Do not invent a logo URL.

------------------------------------------------------------------------

# 23. SAMEAS

`sameAs` should point to authoritative profiles/pages that clearly
represent YallaBuy.

Never add random social profiles or unrelated websites.

Do not add a URL merely because it mentions YallaBuy.

For example, a legitimate Wikidata entry can be used if it genuinely
represents YallaBuy.

------------------------------------------------------------------------

# 24. PERSON

YallaBuy's standard author:

``` html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mahmoud Hamdy",
  "jobTitle": "Founder & Editor",
  "url": "https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html",
  "worksFor": {
    "@type": "Organization",
    "name": "YallaBuy",
    "url": "https://yallabuy-sg5c.vercel.app/"
  }
}
</script>
```

Do not change the author name to an AI-generated name.

Do not claim credentials that the user has not supplied.

------------------------------------------------------------------------

# 25. ARTICLE / BLOGPOSTING

Use `Article` or `BlogPosting` only when the page is genuinely an
article.

Typical properties:

-   `headline`
-   `description`
-   `image`
-   `author`
-   `publisher`
-   `datePublished`
-   `dateModified`
-   `mainEntityOfPage`

Do not invent publication dates.

If the page has a real publication date and modification date, use them
accurately.

Example:

``` json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Is Sony WH-1000XM5 Worth It?",
  "description": "A detailed editorial review of the Sony WH-1000XM5.",
  "image": [
    "https://yallabuy-sg5c.vercel.app/REAL-ARTICLE-IMAGE.avif"
  ],
  "author": {
    "@type": "Person",
    "name": "Mahmoud Hamdy",
    "url": "https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html"
  },
  "publisher": {
    "@type": "Organization",
    "name": "YallaBuy",
    "url": "https://yallabuy-sg5c.vercel.app/"
  }
}
```

------------------------------------------------------------------------

# 26. DATE RULES

Never invent:

-   `datePublished`
-   `dateModified`

If the page was published on August 20, 2026, use the real date.

If it was updated on August 27, 2026, use the real modification date.

Use ISO 8601 date/time formatting where appropriate.

Example:

`2026-08-27`

or

`2026-08-27T12:00:00+03:00`

Do not fabricate a precise time if only the date is known.

------------------------------------------------------------------------

# 27. WEBPAGE

`WebPage` can be useful to describe the page itself.

Possible properties:

-   `@id`
-   `url`
-   `name`
-   `description`
-   `isPartOf`
-   `about`
-   `mainEntity`
-   `breadcrumb`
-   `primaryImageOfPage`

Do not create `WebPage` merely to make the JSON longer.

------------------------------------------------------------------------

# 28. WEBSITE

For the homepage, `WebSite` may describe YallaBuy as a website.

Example:

``` json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://yallabuy-sg5c.vercel.app/#website",
  "name": "YallaBuy",
  "url": "https://yallabuy-sg5c.vercel.app/"
}
```

Only add search-related actions if the website genuinely has the
required search functionality and the implementation is appropriate.

Do not add a fake `SearchAction`.

------------------------------------------------------------------------

# 29. ITEMLIST

`ItemList` can describe a genuine ordered list.

Example use:

-   a category page listing products,
-   a curated list of products,
-   a comparison list.

Do not assume that every list needs ItemList.

For Google-specific carousel eligibility, check Google's current
documentation because supported carousel types and requirements can
change.

------------------------------------------------------------------------

# 30. COLLECTIONPAGE

For category/listing pages, `CollectionPage` can describe a page that
collects items.

Example:

``` json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Best Headphones",
  "url": "https://yallabuy-sg5c.vercel.app/headphones.html"
}
```

Add only properties supported by the actual page.

------------------------------------------------------------------------

# 31. IMAGEOBJECT

Use `ImageObject` when there is a reason to provide structured metadata
about an image.

Possible properties:

-   `url`
-   `contentUrl`
-   `caption`
-   `width`
-   `height`
-   `representativeOfPage`

Do not use ImageObject just because the image is AVIF.

AVIF is a file format, not a Schema.org type.

------------------------------------------------------------------------

# 32. MULTIPLE SCHEMAS ON ONE PAGE

Multiple JSON-LD blocks are allowed.

Example:

1.  Product
2.  BreadcrumbList
3.  FAQPage
4.  Organization
5.  Person

However, the AI should avoid unnecessary duplication.

A more advanced approach is to use a single `@graph` where entities are
connected.

Example concept:

``` json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://yallabuy-sg5c.vercel.app/#organization",
      "name": "YallaBuy"
    },
    {
      "@type": "Person",
      "@id": "https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html#person",
      "name": "Mahmoud Hamdy",
      "worksFor": {
        "@id": "https://yallabuy-sg5c.vercel.app/#organization"
      }
    }
  ]
}
```

Use `@id` when it improves entity relationships.

Do not create arbitrary IDs that do not resolve conceptually to the
entity.

------------------------------------------------------------------------

# 33. WHEN TO USE @GRAPH

Use `@graph` when:

-   multiple related entities exist,
-   relationships need to be explicit,
-   the page has Organization + Person + Article + Product,
-   duplication can be reduced.

Separate JSON-LD blocks are also acceptable.

Do not force everything into one giant graph if it makes the markup
harder to audit.

------------------------------------------------------------------------

# 34. MAINENTITY AND ABOUT

Use:

-   `mainEntity`
-   `about`
-   `mainEntityOfPage`

only when the relationship is genuinely correct.

For an article reviewing Sony WH-1000XM5:

The article can be about the product.

Do not set unrelated entities as the main entity.

------------------------------------------------------------------------

# 35. PRODUCT REVIEW VS PRODUCT PAGE

This distinction is critical.

A page can be:

-   a product landing page,
-   an editorial review,
-   a buying guide,
-   a comparison,
-   an informational article.

The AI must identify the page's primary purpose before generating
schema.

For an editorial product review, `Product` + `Review` may be
appropriate.

For a general article about headphone technology, `Product` may not be
appropriate unless the article is actually about a specific product.

------------------------------------------------------------------------

# 36. COMPARISON ARTICLES

A comparison such as:

"Sony WH-1000XM5 vs XM6"

may discuss multiple products.

Do not automatically create one Product schema that combines both
products.

If using Product structured data, the entities must be represented
correctly and should correspond to the actual content.

The AI must be especially careful not to create misleading review
ratings or offers.

------------------------------------------------------------------------

# 37. PROS AND CONS

For editorial product reviews, Google supports structured-data treatment
for pros and cons in supported contexts.

If the page visibly has:

### Pros

-   Excellent ANC
-   Comfortable for long sessions

### Cons

-   No USB audio
-   No water resistance

The AI may consider the appropriate Google-supported properties for
editorial product reviews.

Never invent pros or cons solely for SEO.

Never add pros/cons that are absent from the actual review.

------------------------------------------------------------------------

# 38. AFFILIATE DISCLOSURE

Affiliate disclosure is page content, not a reason to create a special
arbitrary Schema.org type.

If the page says:

"This article contains affiliate links. We may earn a commission if you
purchase through our links."

do not invent an `AffiliateDisclosure` schema type unless an officially
supported vocabulary/type is actually appropriate.

Keep the disclosure visible in normal page content.

------------------------------------------------------------------------

# 39. AMAZON BUTTONS

A button such as:

"Check price on Amazon"

does not automatically mean:

``` json
"offers": {
  "@type": "Offer"
}
```

The AI must inspect whether a current offer and price are actually
represented on the page.

------------------------------------------------------------------------

# 40. AVIF IMAGES

YallaBuy may use AVIF.

Example:

`https://yallabuy-sg5c.vercel.app/images/product.avif`

The AI should not change AVIF to WebP/JPEG in structured data.

The extension should match the actual resource.

Structured data does not require JPG.

------------------------------------------------------------------------

# 41. IMAGE ACCESSIBILITY

A valid image URL should be accessible to Google.

The AI should remind the user to verify:

-   URL returns the image,
-   image is not blocked,
-   robots rules do not prevent access,
-   page is crawlable,
-   HTTPS works,
-   image is not broken.

Do not claim that an image is accessible unless it has been verified.

------------------------------------------------------------------------

# 42. SCHEMA AND SEO

Structured data is not a direct guarantee of higher rankings.

Its main role is to provide explicit information about page content and
can make pages eligible for certain richer search appearances.

The AI must never tell the user:

"Schema automatically improves ranking."

Prefer:

"Correct structured data can help Google understand the page and may
make it eligible for supported rich results."

------------------------------------------------------------------------

# 43. GOOGLE RICH RESULTS

Google can use structured data for richer search appearances.

Examples relevant to YallaBuy can include:

-   Product snippets
-   Breadcrumbs
-   Article-related features
-   Organization-related features
-   other currently supported features

Google's supported feature list changes over time.

Therefore:

**Never rely on an old list from memory.**

When current Google behavior matters, consult current Google Search
Central documentation.

------------------------------------------------------------------------

# 44. GOOGLE PRODUCT SNIPPETS

YallaBuy is generally closer to an editorial/affiliate product-review
use case than a merchant selling products directly.

Google distinguishes:

-   Product snippets: product pages where people can't directly purchase
    the product from the site.
-   Merchant listings: pages where customers can purchase products from
    the site.

The AI must not blindly generate merchant listing properties for an
affiliate editorial page.

------------------------------------------------------------------------

# 45. GOOGLE VALIDATION

After creating structured data, recommend testing.

Use Google's:

**Rich Results Test**

for Google-specific rich-result eligibility.

Also use the:

**Schema Markup Validator**

for general Schema.org validation.

These tools serve different purposes.

Rich Results Test: - Google-specific eligibility/testing.

Schema Markup Validator: - general Schema.org vocabulary/structure
validation.

------------------------------------------------------------------------

# 46. SEARCH CONSOLE

After deployment, Google Search Console can help monitor structured-data
reports and indexing.

The AI should recommend checking:

-   Product snippets report
-   Merchant listings report when relevant
-   Breadcrumb-related reports when available
-   enhancements/errors
-   URL Inspection

Do not assume a valid test immediately means Google has indexed or
displayed the result.

------------------------------------------------------------------------

# 47. GOOGLE DOES NOT GUARANTEE DISPLAY

Even if:

-   JSON-LD is valid,
-   Rich Results Test shows eligibility,
-   content is crawlable,

Google may still choose not to display the rich result.

Never promise:

"Google will show the image."

Instead:

"The markup makes the page eligible to be considered for supported
product/search appearances; Google decides the final presentation."

------------------------------------------------------------------------

# 48. IMAGE IN GOOGLE SEARCH

Important:

`Product.image` does NOT force Google to display that exact image in
normal search results.

The image helps Google understand the product.

Google may use product/image information in supported search
experiences, including product-related appearances and Google Images.

The AI must never say:

"Adding Product.image guarantees the product photo will appear next to
your result."

------------------------------------------------------------------------

# 49. FAQ DISPLAY

Likewise, `FAQPage` does not guarantee a visible FAQ rich result.

The AI should not promise FAQ expansion in Google Search.

------------------------------------------------------------------------

# 50. BREADCRUMB DISPLAY

Breadcrumb markup can help Google understand site hierarchy and may
support breadcrumb presentation.

Again, it is not a guarantee that Google will display it exactly as
marked up.

------------------------------------------------------------------------

# 51. COMMON YALLABUY ERROR --- INCOMPLETE OFFER

Bad:

``` json
"offers": {
  "@type": "Offer",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock"
}
```

when there is no visible price and no legitimate current offer
represented.

Better:

Omit `offers`.

Or, if the page genuinely displays a price:

``` json
"offers": {
  "@type": "Offer",
  "price": "299.99",
  "priceCurrency": "USD"
}
```

with additional accurate properties as appropriate.

------------------------------------------------------------------------

# 52. COMMON YALLABUY ERROR --- AMAZON RATING AS OWN RATING

Bad:

Page says:

"Amazon rating: 4.5 stars from 2,847 ratings."

Schema says:

``` json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.5",
  "ratingCount": "2847"
}
```

without clearly representing the rating source and context.

This can make it appear that YallaBuy is claiming an aggregate rating of
its own.

Do not do this automatically.

------------------------------------------------------------------------

# 53. COMMON ERROR --- FAKE FAQ

Bad:

The page has 5 visible FAQs, but schema contains 15 questions generated
by AI.

Do not do this.

The schema should represent the visible FAQ content.

------------------------------------------------------------------------

# 54. COMMON ERROR --- FAKE REVIEW

Bad:

The page is an affiliate listing with no editorial review, but the AI
creates:

``` json
"review": {
  "author": "Mahmoud Hamdy",
  "reviewRating": {
    "ratingValue": "4.5"
  }
}
```

Do not do this.

The AI must only mark up a real review.

------------------------------------------------------------------------

# 55. COMMON ERROR --- WRONG AUTHOR

Never use:

-   ChatGPT
-   OpenAI
-   AI Writer
-   YallaBuy AI
-   anonymous
-   invented editor

as the author when the actual YallaBuy author is Mahmoud Hamdy.

Default:

`Mahmoud Hamdy`

------------------------------------------------------------------------

# 56. COMMON ERROR --- WRONG URL

Never transform:

`/products/product4-folder/guides/Is-Sony-WH-1000XM5-Worth-It.html`

into:

`/products/product4-folder/guides/sony-wh-1000xm5.html`

unless the user explicitly confirms the new URL.

------------------------------------------------------------------------

# 57. COMMON ERROR --- WRONG IMAGE

If the user says:

"Use the product image"

the AI must not automatically use the first image in the article.

It should use the actual product image supplied by the user.

If the user will replace the placeholder later, use a clearly marked
placeholder in a template, not a fake production URL.

------------------------------------------------------------------------

# 58. COMMON ERROR --- DUPLICATE ORGANIZATION

Do not create five slightly different Organization entities on the same
page.

Prefer one stable Organization entity where appropriate.

Use:

`@id: https://yallabuy-sg5c.vercel.app/#organization`

when using an entity graph.

------------------------------------------------------------------------

# 59. COMMON ERROR --- DUPLICATE PERSON

Similarly, do not create multiple inconsistent Mahmoud Hamdy entities.

A stable Person `@id` can be used when appropriate:

`https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html#person`

Only use this if the implementation is consistent across the site.

------------------------------------------------------------------------

# 60. CONSISTENCY ACROSS THE SITE

The AI should keep these consistent:

-   YallaBuy name
-   YallaBuy URL
-   Organization ID
-   author name
-   author URL
-   logo URL
-   canonical page URL
-   product name
-   product image
-   brand
-   rating scale
-   review score

Consistency helps avoid conflicting entity information.

------------------------------------------------------------------------

# 61. @ID STRATEGY

Recommended:

Organization:

`https://yallabuy-sg5c.vercel.app/#organization`

Website:

`https://yallabuy-sg5c.vercel.app/#website`

Person:

`https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html#person`

WebPage:

`PAGE-CANONICAL-URL#webpage`

Product:

`PAGE-CANONICAL-URL#product`

Article:

`PAGE-CANONICAL-URL#article`

Use stable IDs that are logically tied to the entity.

------------------------------------------------------------------------

# 62. LINKING ENTITIES

Example:

``` json
{
  "@type": "Article",
  "@id": "https://yallabuy-sg5c.vercel.app/example.html#article",
  "author": {
    "@id": "https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html#person"
  },
  "publisher": {
    "@id": "https://yallabuy-sg5c.vercel.app/#organization"
  }
}
```

This is preferable to repeatedly writing slightly different
organization/person data when a graph is used.

------------------------------------------------------------------------

# 63. FULL YALLABUY REVIEW PAGE EXAMPLE

This example assumes:

-   the page is an editorial review,
-   the product image is visible,
-   Mahmoud Hamdy wrote the review,
-   YallaBuy gives the product 4.5/5,
-   no current price is displayed,
-   visible FAQs exist.

``` html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://yallabuy-sg5c.vercel.app/#organization",
      "name": "YallaBuy",
      "url": "https://yallabuy-sg5c.vercel.app/"
    },
    {
      "@type": "Person",
      "@id": "https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html#person",
      "name": "Mahmoud Hamdy",
      "jobTitle": "Founder & Editor",
      "url": "https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html",
      "worksFor": {
        "@id": "https://yallabuy-sg5c.vercel.app/#organization"
      }
    },
    {
      "@type": "Product",
      "@id": "https://yallabuy-sg5c.vercel.app/products/product4-folder/guides/Is-Sony-WH-1000XM5-Worth-It.html#product",
      "name": "Sony WH-1000XM5",
      "image": [
        "https://yallabuy-sg5c.vercel.app/REPLACE-WITH-ACTUAL-PRODUCT-IMAGE.avif"
      ],
      "description": "REPLACE WITH THE ACCURATE VISIBLE PRODUCT DESCRIPTION.",
      "brand": {
        "@type": "Brand",
        "name": "Sony"
      },
      "review": {
        "@type": "Review",
        "author": {
          "@id": "https://yallabuy-sg5c.vercel.app/author/mahmoud-hamdy.html#person"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4.5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "publisher": {
          "@id": "https://yallabuy-sg5c.vercel.app/#organization"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://yallabuy-sg5c.vercel.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Headphones",
          "item": "https://yallabuy-sg5c.vercel.app/products/product4.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Sony WH-1000XM5 Review",
          "item": "https://yallabuy-sg5c.vercel.app/products/product4-folder/guides/Is-Sony-WH-1000XM5-Worth-It.html"
        }
      ]
    }
  ]
}
</script>
```

This is a structural example, not a claim that the placeholder values
are true.

------------------------------------------------------------------------

# 64. FULL FAQ EXAMPLE

Only use if these questions and answers are visible on the page.

``` html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Sony WH-1000XM5 still worth buying in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VISIBLE ANSWER FROM THE PAGE."
      }
    },
    {
      "@type": "Question",
      "name": "Does the XM5 support LDAC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VISIBLE ANSWER FROM THE PAGE."
      }
    }
  ]
}
</script>
```

------------------------------------------------------------------------

# 65. ARTICLE + PRODUCT

If a page is both:

-   an editorial article,
-   and a detailed review of one product,

the AI may need both Article and Product entities.

But they must represent different concepts:

`Article` = the editorial content.

`Product` = the product being reviewed.

`Review` = the review relationship.

Do not confuse the article itself with the product.

------------------------------------------------------------------------

# 66. PRODUCT + REVIEW RELATIONSHIP

Conceptually:

`Article` → about → `Product`

`Review` → reviews → `Product`

`Review` → author → `Mahmoud Hamdy`

`Article` → author → `Mahmoud Hamdy`

`Article` → publisher → `YallaBuy`

The AI should maintain these relationships when using an `@graph`.

------------------------------------------------------------------------

# 67. PAGE CONTENT AUDIT BEFORE SCHEMA

Before generating schema, the AI should extract:

## Page identity

-   Page title
-   Canonical URL
-   Page type
-   Main entity

## Product data

-   Product name
-   Brand
-   Model
-   Image
-   Description
-   Identifiers
-   Variant

## Review data

-   Reviewer
-   Review score
-   Review body
-   Date

## Offer data

-   Visible price?
-   Currency?
-   Availability?
-   Offer URL?
-   Seller?

## FAQ data

-   Visible questions
-   Visible answers

## Organization

-   Site name
-   Site URL
-   Logo
-   sameAs

## Author

-   Name
-   URL
-   job title

Only then generate schema.

------------------------------------------------------------------------

# 68. PRE-GENERATION CHECKLIST

Before outputting code:

-   [ ] I identified the page type.
-   [ ] I identified the primary entity.
-   [ ] I know the canonical URL.
-   [ ] I know the real product name.
-   [ ] I know the real brand.
-   [ ] I know the real image URL or I clearly marked it as a
    placeholder.
-   [ ] I did not invent a price.
-   [ ] If price is absent from the page, I omitted `offers`.
-   [ ] I did not copy Amazon's rating as YallaBuy's rating without
    proper context.
-   [ ] I only used `aggregateRating` when it is genuinely aggregate.
-   [ ] I only used `Review` when a real review exists.
-   [ ] The author is Mahmoud Hamdy when this is a YallaBuy-authored
    page.
-   [ ] FAQ schema contains only visible FAQ content.
-   [ ] Breadcrumbs match the real site hierarchy.
-   [ ] URLs are exact.
-   [ ] JSON syntax is valid.
-   [ ] No invented facts exist.
-   [ ] Schema types are appropriate.
-   [ ] Google-specific requirements have been considered.
-   [ ] The code is ready for Rich Results Test.

------------------------------------------------------------------------

# 69. POST-GENERATION CHECKLIST

After creating the code:

1.  Validate JSON syntax.
2.  Validate Schema.org structure.
3.  Run Google Rich Results Test.
4.  Inspect warnings.
5.  Fix critical errors.
6.  Check page-source placement.
7.  Verify URLs.
8.  Verify image URLs.
9.  Verify visible content matches structured data.
10. Verify Search Console after deployment.
11. Do not expect immediate Google display.

------------------------------------------------------------------------

# 70. IF USER ASKS "IS THIS SCHEMA CORRECT?"

The AI must not answer only:

"Yes."

Instead perform an audit:

### 1. Syntax

Is the JSON valid?

### 2. Vocabulary

Are the properties valid for Schema.org?

### 3. Google

Is the type supported by Google for a relevant search feature?

### 4. Visibility

Does the page visibly contain the marked information?

### 5. Accuracy

Are the values true?

### 6. Relationships

Are author/product/publisher relationships correct?

### 7. Offer

Is the price actually visible and current?

### 8. Ratings

Is the rating genuinely owned/represented by YallaBuy?

### 9. FAQ

Does every marked FAQ exist visibly?

### 10. URLs/images

Are they real and correct?

Then provide:

-   What is correct
-   What is wrong
-   What should be changed
-   Corrected code
-   Validation checklist

------------------------------------------------------------------------

# 71. IF USER PROVIDES EXISTING JSON-LD

Do not rewrite everything automatically.

First audit it.

Identify:

-   syntax errors,
-   missing fields,
-   misleading fields,
-   incorrect URLs,
-   wrong schema type,
-   unsupported assumptions,
-   unnecessary properties,
-   incomplete offers,
-   rating problems,
-   FAQ mismatch,
-   author problems.

Then produce the corrected version.

------------------------------------------------------------------------

# 72. IF USER SAYS "MAKE IT SEO FRIENDLY"

Do not respond by adding every possible property.

"SEO friendly" means:

-   accurate,
-   relevant,
-   valid,
-   complete where appropriate,
-   consistent with visible content,
-   aligned with Google-supported features.

It does NOT mean:

-   maximum number of schemas,
-   maximum number of properties,
-   fake ratings,
-   fake offers,
-   hidden FAQ,
-   invented keywords.

------------------------------------------------------------------------

# 73. IF INFORMATION IS MISSING

Use this decision:

### Optional property

Omit it.

### Required for the desired Google feature

Ask the user for it or explain that the page may not qualify for that
feature.

### Unknown factual value

Never invent it.

### User says "I will edit it later"

Provide a clearly marked placeholder/template only if the user is asking
for a template.

Example:

`REPLACE_WITH_REAL_PRODUCT_IMAGE_URL`

Do not make a fake-looking production URL appear as if it is real.

------------------------------------------------------------------------

# 74. SCHEMA VERSIONING

When the user updates a page:

-   keep stable entity IDs where possible,
-   update changed factual properties,
-   update `dateModified` when appropriate,
-   update price only when the visible page price changes,
-   update rating only when the actual YallaBuy rating changes,
-   update image if the primary product image changes.

Do not unnecessarily replace the entire schema if only one field
changed.

------------------------------------------------------------------------

# 75. PRODUCT REVIEW SCORE SCALE

Default YallaBuy editorial rating scale:

`1–5`

If the page uses a different scale, use the actual page scale.

Do not assume every rating is out of 5.

For example:

`8.7/10`

must not be marked:

``` json
"bestRating": "5"
```

Correct:

``` json
"ratingValue": "8.7",
"bestRating": "10",
"worstRating": "1"
```

only if the page genuinely uses that scale.

------------------------------------------------------------------------

# 76. REVIEW DATE

If a review date is visible, it can be represented.

Do not invent a date.

If the page does not display a date and the property is optional, omit
it.

------------------------------------------------------------------------

# 77. PUBLISHER

For YallaBuy content:

``` json
"publisher": {
  "@type": "Organization",
  "name": "YallaBuy",
  "url": "https://yallabuy-sg5c.vercel.app/"
}
```

Prefer the stable Organization `@id` in a graph if one is being used.

------------------------------------------------------------------------

# 78. LOGO RULES

If Organization logo is included:

-   use the real YallaBuy logo,
-   use a real accessible URL,
-   do not invent dimensions,
-   do not use a product image as the logo.

------------------------------------------------------------------------

# 79. SAME PAGE ENTITY RULE

The schema should describe the page it is placed on.

Do not place:

-   Product schema for Product A
-   Review schema for Product B
-   Breadcrumbs for Category C

on a page about Product D.

Everything must correspond to the same page context.

------------------------------------------------------------------------

# 80. CANONICAL URL RULE

Structured data should correspond to the page's canonical identity.

If the page canonical URL is:

`https://yallabuy-sg5c.vercel.app/products/product4-folder/guides/Is-Sony-WH-1000XM5-Worth-It.html`

do not create a Product `@id` based on an unrelated URL.

Preferred:

`https://yallabuy-sg5c.vercel.app/products/product4-folder/guides/Is-Sony-WH-1000XM5-Worth-It.html#product`

when appropriate.

------------------------------------------------------------------------

# 81. JSON-LD PLACEMENT

Place JSON-LD in the HTML document, normally inside `<head>` or another
valid document location where the script is included.

Example:

``` html
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Sony WH-1000XM5"
  }
  </script>
</head>
```

The AI should not place JSON-LD inside an unrelated JSON object or
inside another `<script>`.

------------------------------------------------------------------------

# 82. DO NOT USE COMMENTS INSIDE JSON

Bad:

``` json
{
  "name": "Sony WH-1000XM5",
  // Product name
  "brand": {
    "name": "Sony"
  }
}
```

Correct JSON-LD contains no JavaScript comments.

If explanations are needed, put them outside the code block.

------------------------------------------------------------------------

# 83. DO NOT MIX MARKUP FORMATS UNNECESSARILY

YallaBuy should normally use JSON-LD.

Do not create:

-   JSON-LD,
-   Microdata,
-   RDFa

all describing the same entity unless there is a specific reason.

Duplicated markup can make maintenance harder.

------------------------------------------------------------------------

# 84. NO EMPTY PROPERTIES

Do not output:

``` json
"price": "",
"image": "",
"description": ""
```

If the value is unknown and optional, omit the property.

If it is essential, ask for the value.

------------------------------------------------------------------------

# 85. NO NULL PLACEHOLDERS IN PRODUCTION

Avoid:

``` json
"price": null
```

Instead omit it.

------------------------------------------------------------------------

# 86. NO FAKE AVAILABILITY

Do not add:

``` json
"availability": "https://schema.org/InStock"
```

just because a product exists on Amazon.

Only add availability when the page genuinely represents that
availability.

------------------------------------------------------------------------

# 87. NO FAKE SELLER

Do not mark YallaBuy as the seller if YallaBuy is only an affiliate
publisher.

Do not claim:

``` json
"seller": {
  "@type": "Organization",
  "name": "YallaBuy"
}
```

unless YallaBuy is actually the seller for that offer.

------------------------------------------------------------------------

# 88. NO FAKE BRAND

If the product is Sony, use Sony.

Do not use YallaBuy as `brand`.

YallaBuy is the publisher/site, not the headphone manufacturer.

------------------------------------------------------------------------

# 89. NO FAKE REVIEW COUNT

If Mahmoud wrote one review, do not set:

`reviewCount: 2847`

because Amazon has 2,847 reviews.

Counts must represent the correct review collection.

------------------------------------------------------------------------

# 90. NO FAKE RATING COUNT

If the YallaBuy rating is a single editorial score, do not add a rating
count unless the page actually has a collection of ratings represented
by that count.

------------------------------------------------------------------------

# 91. NO KEYWORD STUFFING IN SCHEMA

Structured data is not a keyword stuffing field.

Do not put:

"best cheap affordable premium headphones 2026 Amazon deal"

into product descriptions unless that is genuinely the page's content.

------------------------------------------------------------------------

# 92. DESCRIPTION QUALITY

Use a natural, accurate description.

Avoid:

-   keyword lists,
-   exaggerated marketing claims,
-   unrelated search terms,
-   hidden text,
-   repetitive phrases.

------------------------------------------------------------------------

# 93. AI MUST NOT GAME GOOGLE

The purpose of this document is accurate structured data, not
manipulation.

The AI must refuse to:

-   fabricate ratings,
-   fabricate prices,
-   fabricate reviews,
-   hide FAQ content,
-   fake availability,
-   fake seller identity,
-   create false product relationships,
-   create fake organization profiles.

------------------------------------------------------------------------

# 94. GOOGLE GUIDELINE PRIORITY

When there is a conflict between:

-   a generic Schema.org example,
-   an old blog post,
-   a random SEO website,
-   and current Google Search Central guidance,

prefer current Google Search Central guidance for Google Search
eligibility.

Schema.org remains the vocabulary reference.

------------------------------------------------------------------------

# 95. SOURCE PRIORITY

For current structured-data decisions, use this priority:

1.  Current Google Search Central documentation
2.  Current Schema.org documentation
3.  Official Google testing tools
4.  Official YallaBuy page content
5.  User-provided page data
6.  Other reputable technical sources
7.  Never rely on random SEO blogs when official documentation is
    available

------------------------------------------------------------------------

# 96. WHEN WEB SEARCH IS NECESSARY

If the user asks about:

-   current Google requirements,
-   current rich-result eligibility,
-   whether Google currently supports a schema feature,
-   recent changes to Product structured data,
-   current FAQ behavior,
-   current Search Console reports,

the AI should verify current Google documentation instead of relying on
memory.

------------------------------------------------------------------------

# 97. WHEN WEB SEARCH IS NOT NECESSARY

If the user simply asks:

"Fix this JSON syntax"

and provides all content, web search is usually unnecessary.

If the user asks:

"Does this property exist in Schema.org?"

current Schema.org documentation may be checked.

------------------------------------------------------------------------

# 98. FINAL RESPONSE FORMAT FOR AI

When the user asks for schema code, respond in this order:

## 1. Page assessment

State the page type and assumptions.

## 2. Schema selection

List the schema types being used and why.

## 3. Correct code

Provide the final JSON-LD.

## 4. Important edits

Tell the user which values they must replace or verify.

## 5. Validation checklist

Provide a short checklist.

Do not overwhelm the user with irrelevant schema types.

------------------------------------------------------------------------

# 99. FINAL AUDIT FORMAT

When auditing existing schema, use:

### Status

`VALID / NEEDS CHANGES / INVALID`

### Critical issues

List issues that can make the markup inaccurate or invalid.

### Accuracy issues

List data that does not match the page.

### Google eligibility issues

List issues relevant to Google Search.

### Corrected code

Provide complete corrected JSON-LD.

### Verification

Tell the user to test with:

-   Rich Results Test
-   Schema Markup Validator
-   Search Console after deployment

------------------------------------------------------------------------

# 100. MASTER DECISION TREE

Before generating ANY schema:

``` text
START
 |
 |-- What is the page?
 |     |-- Homepage
 |     |-- Product page
 |     |-- Product review
 |     |-- Article
 |     |-- Category
 |     |-- FAQ
 |     |-- Other
 |
 |-- What is the main entity?
 |
 |-- Is the information visible on the page?
 |     |-- NO -> Do not mark it up
 |     |-- YES -> Continue
 |
 |-- Is the information factual and verified?
 |     |-- NO -> Ask / omit
 |     |-- YES -> Continue
 |
 |-- Is the Schema.org type appropriate?
 |     |-- NO -> Do not use it
 |     |-- YES -> Continue
 |
 |-- Does Google support this type for a relevant search feature?
 |     |-- NO -> It may still be valid Schema.org, but do not promise a Google rich result
 |     |-- YES -> Continue
 |
 |-- Product?
 |     |-- Is price visible?
 |           |-- YES -> Offer may be included with accurate price
 |           |-- NO -> Omit Offer/price
 |
 |-- Rating?
 |     |-- Single editorial YallaBuy rating -> Review.reviewRating
 |     |-- Genuine aggregate -> aggregateRating
 |     |-- Amazon/external rating -> Do not misrepresent as YallaBuy rating
 |
 |-- FAQ?
 |     |-- Visible FAQ -> Can mark up matching FAQ
 |     |-- Not visible -> Do not create FAQ schema
 |
 |-- Author?
 |     |-- YallaBuy standard author -> Mahmoud Hamdy
 |
 |-- URLs?
 |     |-- Known -> preserve exactly
 |     |-- Unknown -> ask / placeholder only for template
 |
 |-- Images?
 |     |-- Real product image -> use it
 |     |-- Unknown -> ask / placeholder
 |
 |-- Validate JSON
 |
 |-- Validate Schema.org
 |
 |-- Check Google requirements
 |
END
```

------------------------------------------------------------------------

# 101. GOLDEN RULES --- SHORT VERSION FOR AI CONTEXT

If the AI has limited context, these rules are the minimum that MUST
remain:

1.  YallaBuy site: `https://yallabuy-sg5c.vercel.app/`
2.  Standard author: Mahmoud Hamdy, Founder & Editor.
3.  Never invent URLs.
4.  Never invent prices.
5.  If price is not visible on the page, omit `offers` and `price`.
6.  If price is visible, use the actual visible price.
7.  Never automatically use Amazon's rating as YallaBuy's
    `aggregateRating`.
8.  Use `Review.reviewRating` for a genuine single YallaBuy editorial
    rating.
9.  Use `aggregateRating` only for a genuine aggregate rating.
10. FAQ schema must match visible FAQs.
11. Product.image should be the real product image.
12. Never invent image URLs.
13. Structured data must match visible page content.
14. Valid Schema.org does not guarantee Google rich results.
15. Validate with Google's Rich Results Test and Schema Markup
    Validator.
16. Use current Google Search Central guidance when Google requirements
    matter.
17. Never add schema simply to make the markup bigger.
18. Never create fake offers, reviews, ratings, availability, sellers,
    or FAQs.
19. Keep Organization = YallaBuy.
20. Keep author = Mahmoud Hamdy.
21. Preserve exact YallaBuy URLs supplied by the user.
22. Validate JSON syntax before output.
23. Distinguish Product, Review, Article, WebPage, Organization, Person,
    BreadcrumbList, FAQPage, ItemList, and other types by page purpose.
24. Ask for missing required factual information rather than guessing.
25. Google decides whether and how a rich result appears.

------------------------------------------------------------------------

# 102. RECOMMENDED TOOLING

For every important production page:

### Tool 1 --- Google Rich Results Test

Use it to check Google-specific structured-data eligibility.

### Tool 2 --- Schema Markup Validator

Use it to check general Schema.org validity.

### Tool 3 --- Google Search Console

Use it after deployment to monitor detected structured data and
indexing.

The AI should not treat one successful validator result as proof that
Google will display a rich result.

------------------------------------------------------------------------

# 103. PRODUCTION QA CHECKLIST

Before publishing a YallaBuy page:

-   [ ] Page title is correct.
-   [ ] Canonical URL is correct.
-   [ ] Product name is correct.
-   [ ] Brand is correct.
-   [ ] Product image exists.
-   [ ] Image URL is correct.
-   [ ] Image actually shows the product.
-   [ ] Description matches page content.
-   [ ] Price is either correctly displayed and marked up, or completely
    omitted.
-   [ ] Availability is not fabricated.
-   [ ] Amazon rating is not falsely presented as YallaBuy's rating.
-   [ ] YallaBuy editorial rating matches the visible rating.
-   [ ] Review author is Mahmoud Hamdy where applicable.
-   [ ] Review score matches visible score.
-   [ ] FAQ schema exactly matches visible FAQs.
-   [ ] Breadcrumb URLs match site hierarchy.
-   [ ] Organization is YallaBuy.
-   [ ] Author URL is correct.
-   [ ] No invented dates.
-   [ ] No invented identifiers.
-   [ ] No fake seller information.
-   [ ] No duplicate/conflicting schema.
-   [ ] JSON-LD parses correctly.
-   [ ] Rich Results Test checked.
-   [ ] Schema Markup Validator checked.
-   [ ] Search Console monitored after deployment.

------------------------------------------------------------------------

# 104. EXAMPLE --- THE SONY XM5 CASE

Suppose the page contains:

-   Product: Sony WH-1000XM5
-   Brand: Sony
-   Real product image
-   YallaBuy editorial score: 4.5/5
-   Author: Mahmoud Hamdy
-   No price displayed
-   No Amazon rating presented as YallaBuy's rating
-   15 visible FAQs

Then the AI should consider:

`Product`

with:

-   name
-   image
-   description
-   brand
-   Review

and:

`BreadcrumbList`

and:

`FAQPage`

for the 15 visible FAQs.

It should NOT automatically include:

`Offer`

because there is no visible price.

It should NOT automatically include:

`aggregateRating` using Amazon's rating.

It should NOT create an Amazon seller/offer.

------------------------------------------------------------------------

# 105. EXAMPLE --- SAME XM5 PAGE WITH PRICE

If the same page visibly displays:

`$299.99`

and the page represents that as the current product price, then the AI
may include:

``` json
"offers": {
  "@type": "Offer",
  "price": "299.99",
  "priceCurrency": "USD"
}
```

The price must be updated when the visible page price changes.

Do not leave stale prices in structured data.

------------------------------------------------------------------------

# 106. EXAMPLE --- NO REVIEW SCORE

If the page is an informational buying guide and Mahmoud Hamdy did not
assign a score:

Do not create:

``` json
"review": {
  ...
  "reviewRating": {
    "ratingValue": "4.5"
  }
}
```

A review score should represent a real rating.

The AI can still use appropriate Product data if the page genuinely
qualifies as a product page/review page and the required Google/Schema
conditions are met.

------------------------------------------------------------------------

# 107. EXAMPLE --- CATEGORY PAGE

If the page is:

`Best Headphones`

and contains 20 products:

Do not create one Product schema pretending the page is about one
headphone.

Consider:

-   `CollectionPage`
-   `ItemList`
-   `BreadcrumbList`

and other appropriate types.

The actual Google feature eligibility must be checked against current
Google documentation.

------------------------------------------------------------------------

# 108. EXAMPLE --- ARTICLE ABOUT ANC

If the article is:

"How Active Noise Cancellation Works"

and does not focus on one specific product:

Use:

-   `Article` or `BlogPosting`
-   `Person`
-   `Organization`
-   `BreadcrumbList`

when appropriate.

Do not force `Product` schema into it.

------------------------------------------------------------------------

# 109. MAINTENANCE RULE

This document should be reviewed whenever:

-   Google changes structured-data requirements,
-   Google retires a rich-result feature,
-   Google introduces a new relevant feature,
-   Schema.org changes relevant vocabulary,
-   YallaBuy changes its URL structure,
-   YallaBuy changes its author,
-   YallaBuy begins displaying prices,
-   YallaBuy introduces user ratings,
-   YallaBuy changes its organization identity.

The AI should not assume that a rule written today is permanent if
Google documentation changes.

------------------------------------------------------------------------

# 110. OFFICIAL REFERENCES

Use these official sources when verifying current rules:

Google Search Central --- Introduction to structured data:
https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

Google Search Central --- General structured data guidelines:
https://developers.google.com/search/docs/appearance/structured-data/sd-policies

Google Search Central --- Product structured data:
https://developers.google.com/search/docs/appearance/structured-data/product

Google Search Central --- Product snippets:
https://developers.google.com/search/docs/appearance/structured-data/product-snippet

Google Search Central --- Review snippet:
https://developers.google.com/search/docs/appearance/structured-data/review-snippet

Google Search Central --- Breadcrumb:
https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

Google Search Central --- Organization:
https://developers.google.com/search/docs/appearance/structured-data/organization

Google Search Central --- Supported structured data features:
https://developers.google.com/search/docs/appearance/structured-data/search-gallery

Google Search Central --- Structured data testing:
https://developers.google.com/search/docs/appearance/structured-data

Schema.org --- Product: https://schema.org/Product

Schema.org --- Review: https://schema.org/Review

Schema.org --- AggregateRating: https://schema.org/AggregateRating

Schema.org --- Offer: https://schema.org/Offer

------------------------------------------------------------------------

# 111. FINAL INSTRUCTION TO ANY AI USING THIS FILE

You are generating structured data for YallaBuy.

Your job is NOT to maximize the number of Schema.org properties.

Your job is to produce **accurate, valid, relevant, maintainable
structured data that truthfully represents the page and follows current
Google guidance**.

Before writing code:

1.  Identify the page.
2.  Identify the main entity.
3.  Inspect the visible information.
4.  Select only appropriate schema types.
5.  Never invent missing facts.
6.  Apply YallaBuy's price rule.
7.  Apply YallaBuy's rating rule.
8.  Apply YallaBuy's FAQ rule.
9.  Apply YallaBuy's author rule.
10. Apply YallaBuy's URL rule.
11. Apply YallaBuy's image rule.
12. Validate the JSON.
13. Check current Google guidance when necessary.
14. Return the cleanest correct implementation.
15. Clearly identify anything the user must verify or replace.

**Accuracy always beats schema quantity.**

**Visible content always beats assumptions.**

**Current official Google guidance beats outdated SEO advice.**

**Never fabricate structured data to obtain a richer-looking search
result.**
