

# Code Style

**Project:** YallaBuy  
**File:** `Code-Style.md`  
**Type:** Code Style Specification + AI Skill  
**Status:** Active  
**Applies To:** HTML, CSS, JavaScript, JSON, YAML, Markdown, filenames, folders, and project structure

---

# 1. Purpose

This document defines the visual, structural, naming, formatting, and organization standards for code and project files in YallaBuy.

The purpose of this document is to ensure that code written by:

- the project owner
- contributors
- AI tools
- future developers

looks and behaves consistently.

This document focuses primarily on:

- formatting
- naming
- spacing
- indentation
- ordering
- file naming
- folder naming
- comments
- readability
- consistency
- source-code organization

It does not replace technology-specific standards.

For example:

```text
Code-Style.md
        ↓
How code should look

JavaScript-Standards.md
        ↓
How JavaScript should behave and be architected

Testing.md
        ↓
How code should be tested

Deployment.md
        ↓
How changes should reach production


---

2. Core Philosophy

The primary goal is:

> Write code that another developer can understand quickly without needing to decode the author's personal style.



Code should be:

readable

predictable

consistent

simple

maintainable

easy to review

easy to debug

easy for AI to understand

easy to modify safely



---

3. Consistency Over Personal Preference

Once a project convention is established, follow it consistently.

Do not change formatting simply because another style is personally preferred.

For example, if the project uses:

4 spaces

do not introduce:

2 spaces

in a new file.

Consistency is more important than personal preference.


---

4. Formatting Rules

Use formatting that makes the structure of the code immediately visible.

Avoid unnecessarily compressed code.

Bad:

if(condition){doSomething();}

Good:

if (condition) {
    doSomething();
}


---

5. Indentation

Use:

4 spaces

for indentation.

Do not use tabs for project indentation unless an existing file explicitly requires them and changing it would create unnecessary churn.

Example:

function renderProducts(products) {
    if (products.length === 0) {
        showEmptyState();
    }
}


---

6. Line Breaks

Use line breaks to separate logical sections.

Bad:

const products = []; const filteredProducts = []; function renderProducts() {}

Good:

const products = [];
const filteredProducts = [];

function renderProducts() {}


---

7. Blank Lines

Use blank lines to separate logical units.

Example:

const products = [];
const searchQuery = "";

function filterProducts() {
    // ...
}

function renderProducts() {
    // ...
}

Do not add excessive blank lines.

Avoid:

const products = [];



const searchQuery = "";



function renderProducts() {}


---

8. Trailing Whitespace

Do not leave unnecessary spaces at the end of lines.

Bad:

const products = [];

Good:

const products = [];


---

9. End of File

Text-based source files should end with a newline.

This includes:

.html

.css

.js

.json

.yml

.yaml

.md



---

10. Naming Conventions

Naming must communicate purpose.

Avoid vague names such as:

thing
stuff
temp
data
test
foo
bar
x
abc
newThing

unless their meaning is genuinely obvious from a very small local scope.

Prefer:

products
filteredProducts
searchQuery
productCard
comparisonState


---

11. Variable Naming

Variables should use:

camelCase

Example:

const productList = [];
const searchQuery = "";
const selectedProducts = new Set();


---

12. Function Naming

Functions should use:

camelCase

and normally begin with a verb.

Examples:

loadProducts();
renderProducts();
filterProducts();
validateProduct();
handleSearch();
createProductCard();

Avoid:

products();
data();
thing();

when the purpose is unclear.


---

13. Class Naming

Classes should use:

PascalCase

Example:

class ProductManager {}
class SearchController {}
class ComparisonManager {}


---

14. Boolean Naming

Boolean values should communicate their meaning.

Prefer:

isLoading
isVisible
isActive
hasResults
hasError
canCompare
shouldRender

Avoid ambiguous names:

loading
active
result
status

when their boolean meaning is unclear.


---

15. Constants

Fixed configuration values may use:

UPPER_SNAKE_CASE

Example:

const PAGE_SIZE = 12;
const MAX_COMPARE_ITEMS = 4;
const MAX_RETRIES = 3;

Do not use uppercase for every variable.


---

16. HTML Naming

HTML IDs should use clear, descriptive names.

Preferred:

<input id="search-input">

<div id="product-grid"></div>

<button id="load-more-button">

Avoid:

<div id="x"></div>
<div id="box1"></div>
<div id="thing"></div>


---

17. CSS Class Naming

CSS classes should communicate purpose.

Preferred:

product-card
product-title
product-price
search-input
comparison-panel
loading-skeleton

Avoid:

red-box
thing
box1
style2
big

unless the class truly represents a visual utility and the architecture intentionally uses utility naming.


---

18. HTML IDs vs Classes

Use IDs primarily for:

unique page elements

JavaScript hooks when appropriate

accessibility relationships

unique anchors


Use classes primarily for:

styling

reusable components

groups of elements

reusable JavaScript hooks when appropriate


Do not create unnecessary IDs for every element.


---

19. Data Attributes

Use data-* attributes when an element needs structured metadata.

Example:

<article
    class="product-card"
    data-product-id="sony-wh-1000xm6"
>

Prefer meaningful names:

data-product-id
data-action
data-category

Avoid:

data-x
data-temp
data-thing


---

20. HTML Formatting

Prefer readable multiline HTML when an element contains meaningful structure.

Example:

<article class="product-card">
    <img
        src="/images/sony-wh-1000xm6.webp"
        alt="Sony WH-1000XM6 headphones"
        width="400"
        height="400"
    >

    <h2 class="product-title">
        Sony WH-1000XM6
    </h2>
</article>

Do not compress complex HTML into one line.


---

21. HTML Attribute Ordering

When practical, use a consistent attribute order.

Recommended general order:

id
class
data-*
src / href
alt / title
width / height
role
aria-*
other attributes

Example:

<img
    id="product-image"
    class="product-image"
    data-product-id="123"
    src="/images/product.webp"
    alt="Product name"
    width="400"
    height="400"
>

This is a convention, not a reason to rewrite stable legacy HTML unnecessarily.


---

22. HTML Semantics

Prefer semantic HTML.

Use:

<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
<button>
<form>
<label>

instead of generic <div> elements when semantic elements provide a better meaning.


---

23. Buttons

Use real buttons for actions.

Good:

<button type="button">
    Compare
</button>

Avoid:

<div onclick="compareProduct()">
    Compare
</div>


---

24. Links

Use <a> for navigation.

Good:

<a href="/reviews/sony-wh-1000xm6.html">
    View Review
</a>

Use <button> for actions.

Do not use a button when the user is actually navigating to another URL.


---

25. CSS Naming

CSS selectors should describe the component or purpose.

Good:

.product-card {}
.product-card__title {}
.product-card__price {}

A BEM-style structure may be used when useful:

block
block__element
block--modifier

Example:

.product-card {}
.product-card__title {}
.product-card--featured {}

Do not force BEM on every tiny component if it makes the stylesheet harder to read.


---

26. CSS Organization

Organize CSS logically.

A recommended order is:

1. Base/reset
2. Variables
3. Global elements
4. Layout
5. Components
6. States
7. Utilities
8. Responsive rules

Example:

:root {
    /* variables */
}

/* Base */
body {
}

/* Layout */
.site-header {
}

/* Components */
.product-card {
}

/* States */
.product-card.is-selected {
}

/* Responsive */
@media (...) {
}


---

27. CSS Custom Properties

Use CSS variables for repeated project-level values.

Example:

:root {
    --color-primary: #ff9900;
    --color-text: #222;
    --color-background: #fff;
    --radius-medium: 8px;
}

Do not create variables for values that are used only once unless there is a meaningful reason.


---

28. CSS Colors

Use the project's established design system.

For YallaBuy:

Primary Orange:
#FF9900

Do not randomly introduce additional brand colors without a design reason.


---

29. CSS Specificity

Prefer low and predictable specificity.

Avoid unnecessary selectors such as:

body main section div article div span {}

Prefer:

.product-card__title {}

Avoid excessive use of:

!important

Use it only when there is a documented reason.


---

30. CSS Nesting

If CSS nesting is used, keep nesting shallow.

Avoid deeply nested structures.

Bad:

.header {
    .nav {
        .menu {
            .item {
                .link {
                }
            }
        }
    }
}

Prefer clear component selectors.


---

31. CSS Shorthand

Use shorthand when it improves readability.

Example:

margin: 0 auto;
padding: 1rem 1.5rem;

Do not use shorthand when it makes a property unclear.


---

32. CSS Ordering

Within a component, group related properties.

Recommended general order:

display / positioning
box model
dimensions
typography
visual styles
effects
transitions / animations

Example:

.product-card {
    display: flex;
    position: relative;

    width: 100%;
    padding: 1rem;

    font-size: 1rem;

    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;

    transition: transform 0.2s ease;
}

Exact ordering may vary, but consistency is required.


---

33. JavaScript Formatting

JavaScript follows the conventions defined here and the deeper rules in:

JavaScript-Standards.md

Example:

function renderProduct(product) {
    const card = document.createElement("article");

    card.className = "product-card";

    return card;
}


---

34. JavaScript Braces

Use braces for control structures.

Preferred:

if (isLoading) {
    showLoading();
}

Avoid:

if (isLoading)
    showLoading();

Braces reduce ambiguity and make future edits safer.


---

35. JavaScript Comparisons

Prefer strict comparisons:

if (value === expected) {
}

and:

if (value !== expected) {
}

Avoid loose equality unless there is a specific, documented reason.


---

36. JavaScript Quotes

Use one consistent quote style throughout a project.

Recommended:

const title = "Headphones";

Use template literals when interpolation is needed:

const title = `Best ${category}`;

Do not randomly mix quote styles.


---

37. Object Formatting

For small objects:

const product = {
    id: "123",
    name: "Headphones"
};

For larger objects:

const product = {
    id: "123",
    name: "Headphones",
    brand: "Sony",
    category: "headphones",
    wireless: true
};

Use one property per line when the object becomes difficult to scan.


---

38. Arrays

Small arrays may remain on one line:

const categories = ["audio", "phones", "laptops"];

Long arrays should be formatted vertically:

const categories = [
    "audio",
    "phones",
    "laptops",
    "cameras",
    "monitors"
];


---

39. JSON Formatting

JSON must be valid JSON.

Use:

double quotes

no comments

no trailing commas

consistent indentation


Example:

{
    "id": "sony-wh-1000xm6",
    "name": "Sony WH-1000XM6",
    "brand": "Sony",
    "wireless": true
}

Do not use JavaScript syntax inside JSON.

Bad:

{
    id: "123",
    name: "Product",
}


---

40. JSON Source of Truth

When a project dataset exists in JSON, formatting changes must not alter the meaning of the data.

Never reformat JSON while accidentally:

removing fields

changing IDs

changing values

changing URLs

changing data types


Formatting and data modification are separate operations.


---

41. YAML Formatting

YAML should use consistent indentation.

Recommended:

page:
    type: category
    title: Headphones

content:
    status: draft

Avoid tabs.

Use spaces.


---

42. YAML Naming

Use descriptive lowercase names where appropriate.

Example:

page_type: category
last_updated: 2026-09-14
content_status: draft

Do not use random abbreviations.


---

43. Markdown Formatting

Markdown files should prioritize readability.

Use:

# Main Heading

## Section

### Subsection

Do not skip heading levels unnecessarily.

Bad:

# Main Heading

#### Small Heading

Prefer:

# Main Heading

## Section

### Small Heading


---

44. Markdown Lists

Use consistent list formatting.

Example:

- First item
- Second item
- Third item

For ordered steps:

1. Inspect
2. Implement
3. Test
4. Deploy


---

45. Markdown Code Blocks

Always specify the language when possible.

Good:

```javascript
const products = [];
```

Instead of:

```
const products = [];
```


---

46. Markdown Tables

Use tables when structured comparison improves readability.

Example:

| File | Purpose |
|---|---|
| Testing.md | Testing rules |
| Deployment.md | Deployment rules |
| Code-Style.md | Formatting rules |

Do not use tables for large blocks of prose.


---

47. Comments

Comments should explain intent, reasoning, or important constraints.

Good:

// Debounce search to avoid filtering on every keystroke.

Bad:

// Set query
searchQuery = query;

Do not use comments to compensate for unclear code.

Prefer clearer names and structure.


---

48. Comment Formatting

Use consistent comment formatting.

JavaScript:

// Single-line explanation

CSS:

/* Component styles */

HTML:

<!-- Product card -->

Markdown:

<!-- Internal documentation note -->


---

49. TODO Comments

Use TODO comments only when there is a real future task.

Good:

// TODO: Replace temporary fallback when the new product schema is finalized.

Bad:

// TODO fix


---

50. File Naming

Use descriptive filenames.

Recommended:

JavaScript-Standards.md
Code-Style.md
Testing.md
Deployment.md
Internal-Linking.md
Images.md
Accessibility.md

Avoid:

file1.md
new.md
final.md
new-final.md
test2.md
stuff.md


---

51. HTML File Naming

Use lowercase, descriptive names.

Recommended:

index.html
headphones.html
category.html
compare.html

Avoid inconsistent capitalization:

HeadPhones.html
HEADPHONES.html
HeadphonesPage.html

unless an existing URL architecture requires a specific name.


---

52. CSS File Naming

Use descriptive names.

Examples:

main.css
catalog.css
components.css
responsive.css

Avoid:

style1.css
newstyle.css
final.css
test.css


---

53. JavaScript File Naming

Use descriptive lowercase or project-consistent filenames.

Examples:

main.js
search.js
rendering.js
comparison.js
data.js

Do not create meaningless names.


---

54. Folder Naming

Folder names should communicate their purpose.

Recommended:

assets/
data/
images/
js/
css/
docs/
skills/

Avoid:

misc/
stuff/
new/
temp/
random/

unless their purpose is genuinely temporary and clearly documented.


---

55. URL Naming

URLs should be:

lowercase

descriptive

stable

readable

consistent


Prefer:

/headphones/
/reviews/sony-wh-1000xm6/

Avoid:

/HeadPhones/
/page123/
/abc/
/new-page-final/

Do not change established production URLs without considering SEO and redirects.


---

56. Case Consistency

Do not mix casing styles randomly.

Bad:

ProductCard
product-card
product_card
PRODUCTCARD

within the same naming system.

Use the convention appropriate to the technology.


---

57. File Organization

Files should be grouped by responsibility.

Example:

assets/
├── css/
├── js/
└── images/

data/
├── products/
└── categories/

docs/
├── Code-Style.md
├── Testing.md
└── Deployment.md

The exact structure may evolve as the project grows.


---

58. Imports

When JavaScript modules use imports, organize them consistently.

Recommended general order:

1. External dependencies
2. Project modules
3. Local utilities

Example:

import { loadProducts } from "./data.js";
import { renderProducts } from "./rendering.js";
import { normalizeSearchQuery } from "./utils.js";

Do not create unnecessary import reordering changes in unrelated files.


---

59. Ordering Functions

Within a JavaScript file, a reasonable structure is:

1. Imports
2. Constants
3. State
4. DOM references
5. Utility functions
6. Data functions
7. Rendering functions
8. Event handlers
9. Initialization

The exact order may change if another structure is clearer.

The important rule is predictability.


---

60. CSS Responsive Rules

Keep responsive rules organized.

Example:

.product-grid {
    display: grid;
}

@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: 1fr;
    }
}

Avoid scattering the same breakpoint logic randomly throughout the file.


---

61. Breakpoints

Use a small, intentional set of breakpoints.

Do not create a breakpoint for every device model.

Design around layout needs rather than device names.

Bad:

iPhone breakpoint
Samsung breakpoint
iPad breakpoint
Pixel breakpoint

Better:

small
medium
large

based on actual layout behavior.


---

62. Responsive Naming

Do not create classes named after a specific device.

Bad:

.mobile-only
.iphone-card
.tablet-box

unless the behavior genuinely represents a product/device category.


---

63. Accessibility Naming

Accessible names must describe the purpose of controls.

Bad:

<button aria-label="button">

Good:

<button aria-label="Open product comparison">

Prefer visible text when it already provides the accessible name.


---

64. Images and Alt Text

Image-related code must follow:

Images.md

Alt text should describe meaningful image content.

Do not use keyword-stuffed alt text.

Bad:

"best headphones cheap headphones wireless headphones Amazon"

Good:

"Sony WH-1000XM6 wireless headphones"


---

65. Accessibility Attributes

Use semantic HTML first.

Do not add ARIA attributes unnecessarily.

Prefer:

<button>

over:

<div role="button">

when a button is appropriate.


---

66. Performance-Friendly Style

Code style must not encourage bad performance patterns.

Avoid writing code that:

repeatedly queries the DOM

repeatedly forces layout

unnecessarily recreates large objects

unnecessarily rebuilds large DOM trees

loads unnecessary assets


Readable code should also make expensive operations easy to identify.


---

67. Avoid Clever Code

Code should be understandable.

Bad:

const result = a?.b?.c?.d ?? x ? y : z;

when the logic is difficult to understand.

Prefer:

const value = a?.b?.c?.d;

const result = value ?? x
    ? y
    : z;

If the logic is still unclear, use named intermediate variables.


---

68. Avoid Over-Compression

Do not sacrifice readability to reduce lines of code.

Bad:

const x=p.filter(a=>a.active).map(a=>a.name).join(",");

Good:

const activeNames = products
    .filter(product => product.active)
    .map(product => product.name)
    .join(",");


---

69. Readability Over Line Count

The shortest code is not automatically the best code.

Prefer:

Readable

over:

Shortest

when there is a meaningful tradeoff.


---

70. Long Lines

Avoid unnecessarily long lines.

When a line becomes difficult to read, break it into logical pieces.

Example:

const isEligibleForComparison =
    product &&
    product.id &&
    selectedProducts.size < MAX_COMPARE_ITEMS;

Do not break every short expression merely to satisfy an arbitrary line limit.


---

71. Function Calls

Short calls can remain on one line:

renderProducts(products);

Long calls may be formatted vertically:

createProductCard(
    product,
    options,
    state
);


---

72. Conditional Formatting

For simple conditions:

if (isLoading) {
    showLoading();
}

For complex conditions, use named variables.

Instead of:

if (a && b && c && !d && e > 10) {
}

prefer:

const canLoadMore =
    hasResults &&
    !isLoading &&
    displayedCount < totalProducts;

if (canLoadMore) {
    loadMore();
}


---

73. Ternary Operators

Use ternaries for simple expressions.

Good:

const label = isLoading ? "Loading..." : "Load More";

Avoid deeply nested ternaries.

Bad:

const label = a ? b : c ? d : e ? f : g;

Use if statements or named logic instead.


---

74. Boolean Logic

Complex boolean expressions should be formatted clearly.

Good:

const canCompare =
    product &&
    product.id &&
    !selectedProducts.has(product.id) &&
    selectedProducts.size < MAX_COMPARE_ITEMS;


---

75. Object Property Order

When objects represent structured project data, keep important fields in a consistent order.

For product data, for example:

id
name
brand
category
type
image
description
features
specifications
amazonUrl
detailsUrl

Do not randomly reorder fields between records.


---

76. Data File Consistency

Records in data.json should use the same field structure where possible.

Bad:

{
    "id": "1",
    "name": "Product"
}

and:

{
    "productId": "2",
    "title": "Product"
}

if both represent the same entity type.

Use one schema.


---

77. Metadata Files

YML metadata files should remain synchronized with their corresponding pages.

If a page changes significantly:

HTML change
    ↓
Check YML metadata
    ↓
Update if necessary

Do not let metadata become misleading.


---

78. Markdown Specifications

Specification files should have a consistent structure.

Recommended:

Title
Project metadata
Purpose
Scope
Principles
Rules
Examples
AI instructions
Checklists
Integration
Final rules

This makes them easier for humans and AI systems to interpret.


---

79. Specification Language

Rules should use clear words.

Use:

MUST
MUST NOT
SHOULD
SHOULD NOT
MAY

when the strength of a rule matters.

Example:

JavaScript MUST NOT contain private API keys.

Developers SHOULD use semantic HTML.

AI MUST NOT claim that a test passed unless it was actually run.


---

80. AI Formatting Rules

When AI generates code for YallaBuy:

1. Follow this file.


2. Follow the technology-specific specification.


3. Preserve existing conventions when they are intentional.


4. Do not introduce a new formatting style without reason.


5. Do not reformat unrelated code unnecessarily.


6. Keep diffs focused.


7. Do not rewrite an entire file merely for formatting.


8. Preserve data meaning.


9. Preserve public interfaces.


10. Explain meaningful style deviations.




---

81. AI Must Inspect Existing Style

Before editing an existing file, AI should inspect nearby code.

If an existing file consistently uses:

4 spaces
camelCase
specific class naming
specific ordering

AI should follow it unless the project specification explicitly requires migration.


---

82. Avoid Formatting Churn

Do not combine:

feature change
+
entire file formatting rewrite

unless explicitly requested.

Bad:

User asks:
"Fix search bug."

AI:
"Reformatted 900 lines and changed every naming convention."

Good:

Fix search bug
+
minimal necessary formatting


---

83. Legacy Code

Existing legacy code does not need to be rewritten automatically.

If a file contains inconsistent old code:

Existing legacy style
        ↓
Do not rewrite everything automatically
        ↓
Apply current style to new or modified code

A full style migration should be an explicit task.


---

84. Generated Code

If code is generated automatically, it should still respect project conventions where practical.

Generated files may have different formatting requirements if an external tool owns their format.

Do not manually fight an automated formatter.


---

85. Third-Party Files

Do not reformat vendor or third-party source files unless the project explicitly owns them.

Avoid modifying external libraries simply to match YallaBuy style.


---

86. Minified Files

Minified production assets may not follow normal human-readable style rules.

Source files should remain readable.

Do not manually write minified source code.


---

87. Git-Friendly Code

Formatting should make changes easy to review.

Prefer small, focused modifications.

Avoid unnecessary changes such as:

Changing every quote
Changing every indentation
Reordering unrelated code
Renaming unrelated variables

in a feature commit.


---

88. Diff Quality

A good change should make it easy to answer:

What changed?
Why did it change?
What could it affect?

Avoid noisy diffs.


---

89. Code Review

Before considering a code change complete, review:

Naming
Formatting
Structure
Readability
Unnecessary changes
Duplicated logic
Potential bugs
Accessibility
Performance
Security


---

90. Formatting vs Architecture

Do not confuse formatting with architecture.

For example:

"Move this function into another module"

is an architectural decision.

While:

"Indent this function with 4 spaces"

is a style decision.

Use the correct specification for each decision.


---

91. Code Style and JavaScript Standards

The relationship is:

Code-Style.md
        ↓
Formatting + Naming + Organization

JavaScript-Standards.md
        ↓
JavaScript Logic + Architecture + Behavior

If a JavaScript rule is specific to JavaScript behavior, follow:

JavaScript-Standards.md

If it is purely formatting or naming, follow:

Code-Style.md

If both apply, both rules should be respected.


---

92. Code Style and Accessibility

Code formatting must never make accessibility worse.

For example:

Do not simplify semantic HTML into generic elements merely because it looks shorter.

Correctness and accessibility take priority over visual code brevity.


---

93. Code Style and Performance

Code formatting must never encourage performance regressions.

Readable code is valuable, but readability does not justify:

unnecessary DOM queries

unnecessary renders

unnecessary requests

unnecessary event listeners


Performance rules remain governed by the relevant technical specifications.


---

94. Code Style and Security

Formatting conventions never override security requirements.

For example:

Even if innerHTML looks shorter:

element.innerHTML = userInput;

it must not be used when it introduces an XSS risk.

Security takes priority.


---

95. Code Style and Data Accuracy

Formatting changes must never alter the meaning of project data.

This is especially important for:

data.json
YML metadata
configuration files
URLs
Amazon links
product IDs


---

96. Final Code Style Checklist

Before completing a code change:

[ ] Indentation is consistent
[ ] Naming is descriptive
[ ] File naming is correct
[ ] Folder naming is correct
[ ] Spacing is consistent
[ ] Blank lines improve readability
[ ] No unnecessary trailing whitespace
[ ] Code is not unnecessarily compressed
[ ] Long expressions are readable
[ ] Comments explain why when needed
[ ] No unnecessary comments
[ ] HTML uses semantic elements
[ ] CSS selectors are meaningful
[ ] JavaScript follows JavaScript-Standards.md
[ ] JSON remains valid
[ ] YAML remains valid
[ ] Markdown headings are structured correctly
[ ] No unrelated formatting churn
[ ] Existing conventions were respected
[ ] No data was accidentally changed


---

97. AI Final Style Gate

Before AI returns a completed code change, it should ask:

1. Is the code readable?
2. Are names meaningful?
3. Is formatting consistent?
4. Does the code follow the existing project style?
5. Did I unnecessarily reformat unrelated code?
6. Did I change data accidentally?
7. Did I introduce a new naming convention?
8. Does the code still follow the technology-specific standards?
9. Is the change easy for another developer to review?
10. Is there any style decision that needs to be explained?


---

98. Master Principle

The purpose of code style is not to make code "pretty."

The purpose is to make code:

Predictable
Readable
Consistent
Reviewable
Maintainable
Understandable

A good code style allows a developer or AI to look at unfamiliar code and quickly understand:

What is this?
What does it do?
Where does it belong?
What depends on it?
How should I modify it?


---

99. Final Rule

When choosing between two valid formatting styles:

Consistency
    >
Readability
    >
Simplicity
    >
Personal Preference

When choosing between style and correctness:

Correctness
    >
Security
    >
Accessibility
    >
Performance
    >
Maintainability
    >
Style

Code style is important.

But code style must never override correctness, security, accessibility, performance, or project architecture.


---

END OF CODE-STYLE.MD

### كده عندك فصل واضح جدًا بين الملفات

```text
Code-Style.md
    ↓
شكل الكود + التسمية + التنسيق + تنظيم الملفات

JavaScript-Standards.md
    ↓
قواعد JavaScript + DOM + State + Async + Security + Performance

Accessibility.md
    ↓
Accessibility

Images.md
    ↓
Images + Performance + Accessibility

Internal-Linking.md
    ↓
Internal Links + Content Architecture

Testing.md
    ↓
Testing

Deployment.md
    ↓
Production Deployment

