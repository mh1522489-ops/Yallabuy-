

# Testing Specification
## YallaBuy Testing System

**Version:** 1.0  
**Status:** Active  
**File:** `Testing.md`  
**Scope:** HTML, CSS, JavaScript, JSON, UI, Accessibility, Performance, SEO, Links, Affiliate Features, Cross-Page Behavior, Regression, Production

---

# 1. Purpose

This document defines the testing system for YallaBuy.

Testing is not limited to checking whether code contains errors.

The purpose of testing is to verify that:

- the website works correctly
- users can complete important actions
- pages render correctly
- JavaScript behaves correctly at runtime
- data is valid
- links work
- Amazon affiliate functionality works
- layouts work across screen sizes
- accessibility requirements are respected
- performance remains acceptable
- SEO-critical elements remain valid
- changes do not unintentionally break existing functionality
- production pages behave as expected

The testing system must detect problems before they reach users whenever reasonably possible.

---

# 2. Core Testing Philosophy

## 2.1 Testing Is Evidence-Based

A feature is not considered working simply because:

- the code looks correct
- the function exists
- an event listener exists
- the HTML looks correct
- the AI believes it should work

Testing requires evidence.

### Core rule

> Code inspection is not runtime testing.

For example:

```js
button.addEventListener("click", handleClick);

This proves that an event listener was registered in the code.

It does NOT prove that:

the button exists at runtime

the event fires

handleClick() works

the DOM changes correctly

errors are handled

the feature works on mobile


Therefore:

Code inspection ≠ Runtime testing


---

3. Truthfulness Rule

AI MUST NEVER claim that a test was performed when it was not actually performed.

Allowed statuses:

PASS

FAIL

BLOCKED

NOT RUN


PASS

Use only when the test was actually performed and the expected result was confirmed.

FAIL

Use when the test was performed and the actual result differs from the expected result.

BLOCKED

Use when the test cannot currently be performed because something prevents execution.

Examples:

required environment unavailable

external service unavailable

required account unavailable

browser/runtime unavailable


NOT RUN

Use when the test could be performed but has not yet been executed.


---

4. Definition of Done

A change is not considered complete until:

1. The changed functionality has been tested.


2. Important dependent functionality has been checked.


3. No known P0 issue remains.


4. No known P1 issue remains unless explicitly accepted.


5. Relevant regression tests have been performed.


6. Accessibility has been considered.


7. Performance impact has been considered.


8. SEO impact has been considered when applicable.


9. Production behavior has been verified when the change affects production.


10. Test results are honestly recorded.




---

5. Testing Levels

YallaBuy uses multiple testing levels.

Code
 ↓
Component / Function
 ↓
Page
 ↓
Feature
 ↓
Cross-Page
 ↓
Full Site
 ↓
Production


---

6. Level 1 — Code Inspection

Code inspection checks the implementation without executing it.

Inspect:

syntax

missing brackets

incorrect selectors

incorrect paths

undefined variables

incorrect function calls

incorrect imports

incorrect JSON structure

duplicated IDs

missing attributes

suspicious logic

unreachable code

obvious null/undefined risks


Code inspection is useful but is not a replacement for runtime testing.


---

7. Level 2 — Function Testing

Individual JavaScript functions should be tested when practical.

For each important function determine:

expected input

valid input

invalid input

empty input

boundary input

expected output

error behavior


Example:

function filterProducts(products, query) {
    // ...
}

Test:

Normal query
Empty query
No matching products
One matching product
Multiple matching products
Uppercase query
Lowercase query
Whitespace
Invalid data
Empty products array


---

8. Level 3 — Component Testing

Test individual UI components.

Examples:

product card

search box

autocomplete

comparison card

navigation menu

mobile menu

modal

button

pagination

load-more control

article card

category card


Verify:

rendering

interaction

states

accessibility

responsive behavior

error states



---

9. Level 4 — Page Testing

Every important page should be tested as a complete unit.

Verify:

page loads

HTML renders

CSS loads

JavaScript loads

data loads

images load

internal links work

external links work

interactive features work

mobile layout works

accessibility works

metadata exists

canonical is correct

structured data is valid when applicable



---

10. Level 5 — Feature Testing

A feature may involve multiple components.

Examples:

Product Search

Input
 ↓
Query processing
 ↓
Filtering
 ↓
Autocomplete
 ↓
Results rendering
 ↓
Product details

All parts must be tested together.

Product Comparison

Select product
 ↓
Add to comparison
 ↓
Comparison state updates
 ↓
Comparison UI updates
 ↓
Remove product
 ↓
Comparison state updates again


---

11. Level 6 — Cross-Page Testing

Test interactions between pages.

Examples:

Category
 → Product

Category
 → Article

Article
 → Product

Product
 → Alternative

Product
 → Comparison

Search
 → Product

Homepage
 → Category

Verify:

correct URL

correct destination

correct product/category/article

no broken paths

no accidental redirects

no incorrect canonical

no old domain references



---

12. Level 7 — Full-Site Testing

Full-site testing checks the website as a complete system.

Verify:

navigation

categories

product pages

articles

search

comparisons

alternatives

internal links

external links

trust pages

affiliate links

sitemap

robots.txt

canonical URLs

structured data

responsive behavior

accessibility

performance



---

13. Functional Testing

Functional testing verifies that features behave according to their intended purpose.

Test:

buttons

links

menus

search

autocomplete

filters

sorting

comparison

load more

pagination

forms

navigation

modals

accordions

tabs

copy buttons

Amazon buttons


For every interactive element test:

Default state
 ↓
User interaction
 ↓
Expected state
 ↓
Repeated interaction
 ↓
Invalid/unexpected interaction


---

14. Button Testing

Every important button must be tested.

Check:

visible

clickable

correct label

correct action

correct destination

keyboard accessible

focusable

works on mobile

does not trigger duplicate actions


Examples:

Buy on Amazon
View Details
Compare
Remove
Search
Load More
Open Menu
Close Menu


---

15. Link Testing

Every important link must be verified.

Check:

URL exists

URL is correct

destination is correct

HTTPS is used where appropriate

no accidental old-domain URL

no Vercel URL when the canonical domain should be yallbuy.shop

no 404

no incorrect redirect

anchor text is meaningful


Important YallaBuy domain rule:

https://yallbuy.shop/

must remain the primary site domain.

Avoid accidental references to:

*.vercel.app

when the production URL should be:

https://yallbuy.shop/


---

16. Amazon Affiliate Link Testing

Amazon links are business-critical.

Every important Amazon CTA must be tested.

Verify:

link exists

URL is valid

clicking the link reaches Amazon

correct product is targeted

affiliate parameters are preserved when applicable

no broken redirect

button label is accurate


Examples:

Buy on Amazon
Check Price on Amazon
View on Amazon

Do not claim an Amazon link is working unless it has actually been verified.


---

17. Search Testing

Search is tested using multiple input types.

Normal input

Sony WH-1000XM5

Case variation

sony wh-1000xm5
SONY WH-1000XM5

Partial query

sony

Empty query



Whitespace

sony

No results

product-that-does-not-exist

Special characters

sony & bose

Verify:

results update correctly

no JavaScript errors

autocomplete behaves correctly

no duplicate results

no stale results

empty state works

no-result state works

keyboard navigation works when implemented

mobile input works



---

18. Autocomplete Testing

Test:

typing

suggestions appearing

suggestions disappearing

keyboard navigation

Enter

Escape

mouse/touch selection

empty input

no results

rapid typing

repeated searches


Also test:

User types
 → suggestions appear
 → user changes query
 → old suggestions disappear
 → new suggestions appear

Old asynchronous results must not overwrite newer results.


---

19. Product Catalog Testing

For product catalog pages verify:

products load

correct number of products appears

product cards render

images load

product names are correct

brand data is correct

product URLs are correct

Amazon URLs are correct

missing fields are handled

duplicate products are detected

invalid products do not silently break the page



---

20. Product Data Testing

For every product dataset verify:

Required fields

Depending on the page:

id
name
brand
image
detailsUrl
amazonUrl

Additional fields may include:

type
wireless
noiseCancelling
battery
features
searchTerms
price

The exact required fields must be defined by the page's data specification.


---

21. JSON Testing

Test JSON for:

valid syntax

valid structure

duplicate IDs

missing required fields

invalid URLs

invalid image paths

empty strings

incorrect data types

unexpected null values

duplicated products

malformed records


Example:

{
    "id": "sony-wh-1000xm5",
    "name": "Sony WH-1000XM5"
}

must not be assumed valid for a page requiring:

image
amazonUrl
detailsUrl
brand

Missing required data must be detected.


---

22. Missing Data Testing

The UI must not catastrophically fail when optional data is missing.

Test:

Missing image
Missing description
Missing feature list
Missing price
Missing optional metadata

Expected behavior should be intentional.

Examples:

Hide unavailable optional information
Show fallback text
Use fallback image only when appropriate

Never display fabricated information.


---

23. Error State Testing

Every important dynamic feature should have an error state.

Examples:

Data loading failed
Image failed
Search failed
Invalid JSON
No products
No search results
Network unavailable

The user should receive a useful state instead of:

Blank page
Broken layout
Infinite loading
Unexplained error


---

24. Loading State Testing

Dynamic pages should be tested during loading.

Check:

skeleton appears when appropriate

skeleton disappears

content replaces skeleton

no duplicate content

no infinite loading

layout does not jump excessively

loading state works on slow connections



---

25. Empty State Testing

Test empty states deliberately.

Examples:

No products
No search results
No comparison items
No articles
No matching category

An empty state should explain what happened and, when useful, suggest the next action.


---

26. JavaScript Runtime Testing

JavaScript must be tested in an actual browser/runtime whenever possible.

Check for:

console errors

uncaught exceptions

failed promises

failed network requests

undefined variables

null references

duplicate event listeners

incorrect DOM selectors

race conditions

infinite loops

unexpected state changes



---

27. DOM Testing

Verify that JavaScript manipulates the intended elements.

Check:

element exists

selector is correct

element is available at execution time

created elements are valid

removed elements are handled

event targets are correct


Special attention should be given to dynamic content.


---

28. Event Testing

For every important event verify:

Event registered
 ↓
Event triggered
 ↓
Correct handler executes
 ↓
Correct state changes
 ↓
Correct UI updates

Test events such as:

click

input

change

submit

keydown

keyup

focus

blur

resize

scroll


Do not attach events unnecessarily.


---

29. Duplicate Event Testing

A feature must not trigger multiple times because the same event listener was accidentally registered repeatedly.

Example problem:

One click
 ↓
Action executes 3 times

Test important buttons after:

page initialization

dynamic rendering

re-rendering

filtering

navigation

reopening components



---

30. CSS Testing

Check:

selectors work

styles are applied

no unexpected inheritance

no specificity conflicts

no missing CSS files

no broken relative paths

no overflow

no accidental horizontal scrolling

no hidden important content



---

31. Responsive Testing

Test important pages at:

Small mobile
Large mobile
Tablet
Laptop
Desktop
Large desktop

Check:

layout

navigation

typography

cards

buttons

images

tables

comparison sections

menus

horizontal scrolling

content overflow


Mobile is especially important for YallaBuy.


---

32. Touch Testing

On mobile verify:

buttons are easy to tap

links are easy to tap

menus open correctly

menus close correctly

autocomplete works

scrolling works

no accidental horizontal scrolling

no hover-only functionality is required



---

33. Hover Testing

Hover effects must never be the only way to access important information or functionality.

Test:

Hover
Focus
Touch
Keyboard

If a feature exists only on hover, determine whether an accessible alternative is required.


---

34. Keyboard Testing

Important interactive elements must be reachable using the keyboard.

Test:

Tab
Shift + Tab
Enter
Space
Escape
Arrow keys

when relevant.

Verify:

logical focus order

visible focus

no keyboard traps

buttons work

links work

menus work

dialogs can be closed



---

35. Accessibility Testing

Accessibility testing must include:

semantic HTML

heading hierarchy

alt text

form labels

button names

link names

keyboard navigation

focus visibility

color contrast

accessible states

error messages

meaningful page structure


Do not add ARIA automatically.

Use native HTML semantics whenever possible.


---

36. Image Testing

Verify:

image exists

correct image is displayed

correct aspect ratio

width and height are defined when appropriate

no unnecessary oversized image

correct loading behavior

appropriate alt text

no misleading image


For important above-the-fold images:

avoid unnecessary lazy loading

consider appropriate fetch priority

optimize file size


For below-the-fold images:

lazy loading should be considered


Testing must verify that image optimization does not damage visual quality.


---

37. Layout Shift Testing

Check for unexpected movement during loading.

Potential causes:

images without dimensions

fonts changing layout

late-loading content

ads or widgets

dynamic components

injected banners


Important pages should be checked for CLS problems.


---

38. Performance Testing

Performance testing must consider:

LCP
INP
CLS
FCP
TBT
Page weight
JavaScript execution
CSS size
Image size
Font loading
Network requests
Third-party scripts
Caching

YallaBuy performance targets:

LCP < 2.5s
INP < 200ms
CLS < 0.1

These are targets, not permission to ignore other UX problems.


---

39. Performance Regression Testing

A feature that works but makes the page significantly slower may still be considered a failed change.

After performance-sensitive changes check:

page load

image loading

JavaScript execution

layout stability

network requests

third-party scripts


Especially test after changes involving:

Images
Fonts
JavaScript
CSS
Tracking
Analytics
Widgets
Mail systems
External libraries


---

40. Third-Party Script Testing

Third-party scripts must be tested for:

functionality

performance

failure behavior

console errors

network requests

layout impact


A third-party script must not silently become a single point of failure for the page.

If a third-party script is non-essential, the site should remain usable if that script fails.


---

41. SEO Testing

When a change can affect SEO, test:

<title>

meta description

canonical

robots directives

headings

internal links

sitemap

robots.txt

structured data

image alt text

URL structure

redirects

404 behavior



---

42. Canonical Testing

Every indexable page should have an intentional canonical URL when applicable.

Verify:

Canonical exists
Canonical is absolute
Canonical uses yallbuy.shop
Canonical matches intended URL
Canonical does not point to old Vercel domain
Canonical does not point to unrelated page


---

43. Domain Consistency Testing

Search the project for accidental references to:

yallabuy
yallbuy
vercel.app
old production URLs

The production domain is:

https://yallbuy.shop/

Any domain mismatch must be reviewed.

Do not blindly replace text without checking context.


---

44. Structured Data Testing

When JSON-LD is used, verify:

valid JSON

correct schema type

required properties

correct URLs

correct organization information

correct author information

correct canonical/domain

no outdated URLs

no fabricated ratings/reviews


Structured data must describe what actually exists on the page.


---

45. Sitemap Testing

Verify:

sitemap exists

sitemap URL is correct

URLs are valid

URLs use production domain

no old Vercel URLs

no broken URLs

no unintended pages

no duplicate URLs



---

46. Robots.txt Testing

Verify:

file exists

syntax is valid

important pages are not accidentally blocked

sitemap reference is correct when used

production domain is correct



---

47. 404 Testing

Test invalid URLs.

Example:

/non-existent-page

Verify:

proper 404 status when appropriate

useful 404 page

navigation remains available

user can recover

no misleading 200 response for nonexistent pages



---

48. Navigation Testing

Test:

Header
Footer
Breadcrumbs
Category links
Product links
Article links
Alternative links
Comparison links

Verify that navigation remains consistent across the site.


---

49. Internal Linking Testing

Internal links should be tested for:

valid destination

correct URL

relevant destination

correct anchor text

no orphan pages

no excessive repetition

no broken links


Important new pages should be checked for integration into the existing content network.


---

50. Content Hub Testing

For content hubs verify:

Hub
 ↓
Supporting articles
 ↓
Category pages
 ↓
Product pages
 ↓
Alternatives / comparisons

Important pages should not become isolated after publication.


---

51. Browser Testing

Important functionality should be checked in multiple browsers when practical.

Prioritize:

Chrome

Firefox

Safari

Edge


Mobile browser testing is especially important for YallaBuy.

Do not assume:

Works in Chrome desktop
=
Works everywhere


---

52. Network Testing

Test important pages under different network conditions when practical:

Fast connection
Normal mobile connection
Slow connection
Intermittent connection
Offline/failure state

Check:

loading state

errors

timeouts

images

JSON

external scripts

recovery



---

53. Cache Testing

After changes verify that cached assets do not cause old code to remain active unexpectedly.

Test:

Fresh load
Hard refresh
Cached load
New deployment

When service workers are used, test:

cache version

update behavior

old assets

new assets

offline behavior when supported



---

54. Regression Testing

Regression testing answers:

> What could this change have broken?



Every meaningful change must trigger impact analysis.

Example:

Change:
Product card JavaScript

Potential impact:
Search
Load More
Comparison
Product rendering
Images
Amazon buttons
Accessibility

Therefore all affected areas should be retested.


---

55. Change Impact Analysis

Before testing a change:

CHANGE MADE
     ↓
What changed?
     ↓
What depends on it?
     ↓
What could break?
     ↓
Select affected tests
     ↓
Run tests
     ↓
Regression test
     ↓
Record result

Do not test only the exact line that changed.

Test the functionality that depends on it.


---

56. Smoke Testing

Smoke testing is a fast test used to determine whether the site is fundamentally usable.

Minimum smoke test:

Homepage loads
Navigation works
Important category loads
Important product page loads
Search works
Important JavaScript works
Images load
Amazon CTA works
No critical console error

If smoke testing fails, deeper testing may be postponed until the critical failure is fixed.


---

57. Sanity Testing

Sanity testing is a focused check after a small change.

Example:

A CSS change affects product cards.

Sanity test:

Product cards render
Product card links work
Images render
Mobile card layout works

If the change is broader, perform regression testing instead of relying only on sanity testing.


---

58. Bug Severity

P0 — Critical

The issue blocks a critical business or user function.

Examples:

website does not load

product pages fail completely

Amazon CTA is broken site-wide

major JavaScript crash

navigation completely broken

production deployment unusable


Immediate attention required.


---

P1 — High

Major functionality is broken but the entire site is not unusable.

Examples:

search completely broken

mobile navigation broken

product catalog fails

comparison feature broken

major layout broken on mobile


Fix before normal release whenever possible.


---

P2 — Medium

Important issue with a workaround.

Examples:

autocomplete partially broken

minor data rendering issue

some browser-specific problem

non-critical accessibility problem


Should be fixed.


---

P3 — Low

Minor issue that does not significantly affect functionality.

Examples:

small spacing issue

minor visual inconsistency

tiny animation problem

non-critical text alignment


Can be scheduled later.


---

59. Bug Report Format

Every meaningful bug should contain:

Bug ID:
Title:
Severity:
Page:
URL:
Environment:
Steps to Reproduce:
Expected Result:
Actual Result:
Evidence:
Possible Cause:
Status:

Example:

Bug ID: BUG-001

Title:
Search results disappear after second query

Severity:
P1

Page:
/category/headphones/

Steps to Reproduce:
1. Open page
2. Search for Sony
3. Search for Bose

Expected Result:
Bose products appear

Actual Result:
Results remain from Sony

Status:
FAIL


---

60. Retesting

After a bug is fixed:

Fix
 ↓
Retest original bug
 ↓
Confirm expected result
 ↓
Run regression tests
 ↓
Close bug

Never close a bug merely because code was changed.

The original failure must be retested.


---

61. Regression Matrix

For important features maintain a mental or documented dependency map.

Example:

Changed Area	Test

Product Card	Rendering
Product Card	Links
Product Card	Images
Product Card	Comparison
Product Card	Search
Product Card	Mobile
Search JS	Search
Search JS	Autocomplete
Search JS	Product rendering
JSON structure	Catalog
JSON structure	Search
JSON structure	Comparison



---

62. Testing Dynamic Data Pages

For pages rendered from data.json or similar data sources:

Test both:

Data
+
Rendering system

A valid JSON file does not guarantee correct UI rendering.

A correct renderer does not guarantee valid data.

Both must be tested.


---

63. Testing Static Pages

Static pages must still be tested for:

HTML validity

CSS

links

images

accessibility

responsive behavior

SEO

metadata

canonical

structured data where applicable


Static does not mean untestable.


---

64. Testing Article Pages

Verify:

title

introduction

headings

paragraphs

images

image alt text

internal links

external sources

author information

metadata

canonical

mobile layout

readability

FAQ when present

structured data when applicable


Do not claim firsthand testing unless it actually occurred.


---

65. Trust and Accuracy Testing

YallaBuy must not publish fabricated:

testing results

prices

ratings

reviews

specifications

ownership experiences

performance measurements


When content references external information, the source type should be clear when required.

Examples:

Manufacturer specification
Independent review
Owner feedback
YallaBuy analysis

Testing must also verify that UI labels do not accidentally imply firsthand testing.


---

66. Security and Robustness Testing

Basic robustness checks should include:

unexpected user input

malformed URLs

invalid query strings

unexpected JSON values

missing DOM elements

failed network requests

oversized input where relevant

unexpected characters


The goal is to ensure the site fails safely rather than catastrophically.


---

67. Form Testing

If forms exist, test:

Empty input
Valid input
Invalid input
Long input
Special characters
Submit
Reset
Error state
Success state
Keyboard interaction
Mobile interaction

Do not assume a form works because the browser accepts submission.


---

68. State Testing

Interactive components may have multiple states.

Example:

Search

Empty
 ↓
Typing
 ↓
Suggestions
 ↓
Results
 ↓
No Results
 ↓
Error

Every important state should be intentionally tested.


---

69. Boundary Testing

Test values near boundaries.

Examples:

0 products
1 product
12 products
13 products
Maximum comparison items
One above maximum
Empty search
Very long search

Boundary bugs are common in pagination, comparison, and load-more systems.


---

70. Repeated Action Testing

Users often repeat actions.

Test:

Click twice
Search twice
Open/close repeatedly
Add/remove repeatedly
Navigate back/forward
Refresh after interaction

Verify that state does not become corrupted.


---

71. Refresh Testing

After using an interactive feature:

Perform action
 ↓
Refresh page

Verify whether state should:

persist

reset

recover

intentionally disappear


The result must match the feature's specification.


---

72. Back/Forward Navigation Testing

Test browser:

Back
Forward
Reload
Open in new tab

Especially for:

search

product pages

category pages

comparison

articles



---

73. Production Testing

After deployment perform production verification.

Minimum:

Production URL loads
HTTPS works
Homepage works
Important pages work
Critical JS works
Images work
Internal links work
Amazon CTA works
Canonical is correct
No critical console errors

Production testing should be performed after significant deployments.


---

74. Release Gate

A release should not be considered ready when:

P0 = Open

A release should normally not be considered ready when:

P1 = Open

unless the issue is explicitly accepted and documented.

Before release:

Smoke Test       PASS
Changed Feature  PASS
Regression       PASS
Accessibility    PASS / acceptable
Performance      PASS / acceptable
SEO              PASS / N/A
Production       PASS when applicable


---

75. Test Case Format

Use the following structure for important test cases:

Test ID:
Title:
Category:
Priority:
Preconditions:
Steps:
Expected Result:
Actual Result:
Status:
Evidence:

Example:

Test ID:
SEARCH-001

Title:
Search returns matching products

Category:
Functional

Priority:
P1

Preconditions:
Product data is available

Steps:
1. Open headphones category
2. Enter "Sony"
3. Submit/search

Expected Result:
Sony products are displayed

Actual Result:
Sony products displayed

Status:
PASS


---

76. Evidence

Whenever possible, testing should produce evidence.

Evidence may include:

screenshot

console output

browser result

URL

test output

performance report

validation result

reproduction steps


Evidence is especially important for:

P0

P1

production failures

SEO issues

performance regressions

accessibility issues



---

77. AI Testing Protocol

When AI is working on YallaBuy, it must follow this process.

Step 1 — Understand the Change

Determine:

What changed?
Why was it changed?
Which files changed?
Which pages use those files?
Which features depend on them?

Step 2 — Predict Risk

Ask:

What can this change break?

Step 3 — Select Tests

Do not run every possible test blindly.

Select tests based on:

Changed code
Dependencies
User impact
Business importance
Historical failure risk

Step 4 — Execute

Run actual tests when tools/runtime are available.

Step 5 — Record

Use:

PASS
FAIL
BLOCKED
NOT RUN

Step 6 — Regression Test

Test affected dependencies.

Step 7 — Report

Clearly state:

What was tested
What passed
What failed
What was not tested
What is blocked


---

78. AI Must Not Pretend

The following statements are forbidden unless supported by actual testing:

"Everything works."
"Tested successfully."
"No bugs found."
"Production is fine."
"All links work."
"Performance is good."

Instead use precise statements:

"I inspected the code but did not run the page."

"The search logic was tested manually and passed."

"The production URL was not tested."

"The test is blocked because the required runtime is unavailable."

"HTML structure was inspected; runtime behavior remains unverified."


---

79. Test Selection by Change Type

HTML Change

Test:

Rendering
Layout
Accessibility
Links
SEO
Responsive behavior

CSS Change

Test:

Visual layout
Responsive behavior
Overflow
Focus states
Mobile
Desktop

JavaScript Change

Test:

Feature behavior
Console
DOM
Events
States
Error handling
Regression

JSON/Data Change

Test:

JSON validity
Required fields
Rendering
Search
Filtering
Product links
Images

Image Change

Test:

Image loading
Aspect ratio
CLS
File size
Alt text
Mobile
LCP if applicable

SEO Change

Test:

Metadata
Canonical
Structured data
Sitemap
Robots
Internal links
URLs

Performance Change

Test:

LCP
INP
CLS
Network
Page weight
Images
JavaScript
Third-party scripts


---

80. Testing Priority

Not every feature has equal risk.

Prioritize:

1. Business-critical functionality
2. User-critical functionality
3. Recently changed functionality
4. Shared components
5. Dynamic JavaScript
6. Data loading
7. Mobile layout
8. Accessibility
9. SEO-critical elements
10. Minor visual details

For YallaBuy, special priority should be given to:

Amazon CTAs
Product rendering
Search
Category pages
Product pages
Internal navigation
Mobile experience
Data loading
Performance


---

81. Shared Code Risk

Changes to shared files require broader regression testing.

Examples:

assets/js/main.js
assets/js/search.js
shared CSS
global header
global footer
data loading utilities
common product card

A small change in shared code may affect many pages.

Therefore:

Shared file change
=
Expanded regression testing


---

82. New Page Testing

Every new page should be tested before publication.

Minimum:

Page loads
HTML works
CSS works
JS works
Images work
Links work
Mobile works
Accessibility checked
Metadata checked
Canonical checked
Internal links checked
No critical console errors


---

83. New Product Testing

Before adding a product verify:

Unique ID
Correct name
Correct brand
Correct image
Valid details URL
Valid Amazon URL
Correct category
Required fields present
No duplicate product

Never add fabricated information to complete missing fields.


---

84. New Article Testing

Before publishing:

Content accuracy checked
Sources checked
Links checked
Images checked
Alt text checked
Author information checked
Metadata checked
Canonical checked
Internal links checked
Mobile layout checked


---

85. Test After Refactoring

Refactoring may not intentionally change behavior.

It can still break behavior.

Therefore:

Refactor
 ↓
Run original feature tests
 ↓
Run regression tests
 ↓
Compare behavior

Never assume:

No intended behavior change
=
No testing required


---

86. Test After Dependency Changes

When changing:

external library

CDN

font

analytics

third-party script

build configuration

hosting configuration


test:

Loading
Runtime
Performance
Compatibility
Failure behavior


---

87. Test After Deployment Configuration Changes

If changing:

Vercel configuration

headers

redirects

caching

service worker

domain configuration

security headers


test production behavior.

Especially:

HTTPS
Redirects
Canonical
Caching
Assets
JavaScript
Images
Robots
Sitemap


---

88. Testing Workflow

The standard workflow is:

PLAN
 ↓
IMPLEMENT
 ↓
INSPECT
 ↓
TEST
 ↓
FIND BUGS
 ↓
FIX
 ↓
RETEST
 ↓
REGRESSION TEST
 ↓
RELEASE
 ↓
PRODUCTION VERIFY


---

89. Bug Lifecycle

DISCOVERED
    ↓
REPORTED
    ↓
TRIAGED
    ↓
FIXED
    ↓
RETESTED
    ↓
REGRESSION TESTED
    ↓
CLOSED

A bug must not skip retesting.


---

90. Test Results Summary

For significant changes, provide a summary:

Change:
Files:
Pages Affected:

Functional:
PASS / FAIL / BLOCKED / NOT RUN

Accessibility:
PASS / FAIL / BLOCKED / NOT RUN

Performance:
PASS / FAIL / BLOCKED / NOT RUN

SEO:
PASS / FAIL / BLOCKED / NOT RUN

Regression:
PASS / FAIL / BLOCKED / NOT RUN

Production:
PASS / FAIL / BLOCKED / NOT RUN

Known Issues:
- ...

Release Recommendation:
READY / NOT READY / BLOCKED


---

91. Practical Testing on Mobile

Because development may be performed from a mobile device, testing should not depend entirely on advanced desktop tooling.

Manual browser testing can still verify:

navigation

buttons

search

product rendering

links

responsive layout

touch behavior

accessibility basics

images

Amazon CTAs

loading states

error states


When advanced testing tools are unavailable:

Do not claim the test passed.

Use:

NOT RUN

or:

BLOCKED

depending on the reason.


---

92. Testing Checklist — Quick Version

Before Release

[ ] Page loads

[ ] HTML works

[ ] CSS works

[ ] JavaScript works

[ ] No critical console errors

[ ] Images work

[ ] Links work

[ ] Amazon links work

[ ] Search works

[ ] Navigation works

[ ] Mobile works

[ ] Desktop works

[ ] Keyboard interaction checked

[ ] Accessibility checked

[ ] Loading states checked

[ ] Empty states checked

[ ] Error states checked

[ ] Performance checked

[ ] SEO checked

[ ] Canonical checked

[ ] Structured data checked

[ ] Sitemap checked when relevant

[ ] Robots checked when relevant

[ ] Regression testing completed

[ ] Production verified when applicable



---

93. Master Testing Rule

The most important rule in this document is:

> Never confuse code that looks correct with functionality that has been proven to work.



Testing must be:

Evidence-based
Risk-based
Change-aware
User-focused
Honest
Repeatable

The objective is not to claim that YallaBuy has no bugs.

The objective is to systematically reduce the probability that important bugs reach users.


---

94. Final AI Rule

Before declaring a YallaBuy change complete, AI must ask:

1. What changed?

2. What depends on it?

3. What could this change break?

4. Which tests are required?

5. Which tests were actually executed?

6. What passed?

7. What failed?

8. What is blocked?

9. What was not tested?

10. Did I perform regression testing?

11. Is the change safe to release?

If any required test was not performed, AI must say so.

If a test cannot be performed, AI must say so.

If a test fails, AI must not hide the failure.

If evidence does not exist, AI must not invent evidence.


---

95. Master Principle

TEST WHAT CHANGED.
TEST WHAT DEPENDS ON IT.
TEST WHAT MATTERS TO USERS.
TEST WHAT MATTERS TO THE BUSINESS.
TEST AGAIN AFTER FIXES.
NEVER CLAIM A TEST WAS RUN WHEN IT WAS NOT.

Testing is part of development, not a final step added after development.

