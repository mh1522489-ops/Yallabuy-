
# JavaScript Standards

**Project:** YallaBuy  
**File:** `JavaScript-Standards.md`  
**Type:** JavaScript Specification + AI Skill  
**Language:** English  
**Status:** Active  
**Applies To:** All JavaScript code in the YallaBuy project

---

# 1. Purpose

This document defines the JavaScript standards, architecture rules, coding conventions, performance requirements, security rules, accessibility requirements, testing expectations, and AI coding behavior for the YallaBuy project.

The purpose is not only to make JavaScript code look clean.

The purpose is to make JavaScript:

- predictable
- maintainable
- testable
- accessible
- performant
- secure
- scalable
- understandable
- compatible with the existing YallaBuy architecture

JavaScript must support the website architecture rather than work against it.

---

# 2. Core Principles

The following principles have the highest priority.

## 2.1 Correctness Before Convenience

Code must behave correctly before it is optimized or simplified.

---

## 2.2 Simplicity Before Complexity

Prefer the simplest solution that correctly solves the problem.

Do not introduce:

- unnecessary abstractions
- unnecessary classes
- unnecessary libraries
- unnecessary state systems
- unnecessary dependencies
- unnecessary build tools

---

## 2.3 HTML First

Use HTML for structure.

Use CSS for presentation.

Use JavaScript for behavior and dynamic functionality.

Do not use JavaScript to solve a problem that HTML or CSS can solve better.

### Example

Bad:

```javascript
element.style.display = "none";

when the behavior can simply be controlled through CSS.

Good:

.hidden {
    display: none;
}

element.classList.add("hidden");


---

3. JavaScript Version

Use modern JavaScript (ES6+).

Prefer modern language features when they improve readability and maintainability.

Examples:

const

let

arrow functions

template literals

destructuring

spread syntax

rest parameters

optional chaining

nullish coalescing

modules

classes when appropriate

async/await

Promise

Set

Map


Do not use outdated syntax when a modern and compatible alternative exists.


---

4. Variable Declarations

4.1 Use const by Default

Use const when the variable reference does not need to change.

const products = [];
const searchInput = document.querySelector("#search");
const PAGE_SIZE = 12;


---

4.2 Use let When Reassignment Is Required

let currentPage = 1;
let searchQuery = "";


---

4.3 Never Use var in New Code

Do not write:

var products = [];

Use:

const products = [];

or:

let products = [];

depending on whether reassignment is required.


---

5. Naming Conventions

Names must describe the purpose of the value.

5.1 Variables

Use camelCase.

const productList = [];
const searchQuery = "";
const selectedProducts = new Set();


---

5.2 Functions

Use camelCase.

Function names should describe an action.

loadProducts();
renderProducts();
filterProducts();
validateProduct();
handleSearch();

Prefer verbs.

Bad:

products();
data();
search();

Good:

loadProducts();
filterProducts();
performSearch();


---

5.3 Classes

Use PascalCase.

class ProductManager {}
class SearchController {}
class User {}


---

5.4 Boolean Variables

Boolean names should communicate a yes/no state.

Prefer:

isLoading
isVisible
isActive
hasResults
hasError
canCompare
shouldRender

Avoid:

loading
visible
active
results

when the boolean meaning is unclear.


---

5.5 Constants

Constants that represent fixed configuration values may use uppercase names.

const PAGE_SIZE = 12;
const MAX_COMPARE_ITEMS = 4;
const API_TIMEOUT = 5000;

Do not use uppercase for every variable.


---

6. Naming Quality

Avoid vague names.

Bad:

const data = [];
const thing = {};
const x = 10;
const temp = [];

Better:

const products = [];
const productData = {};
const displayedCount = 10;
const filteredProducts = [];

Short names are acceptable inside very small scopes when their meaning is obvious.

Example:

products.map(product => product.name);


---

7. Formatting

Use consistent formatting throughout the project.

Recommended style:

function renderProduct(product) {
    const card = document.createElement("article");

    card.className = "product-card";

    return card;
}

Use:

consistent indentation

consistent braces

readable spacing

one logical statement per line

clear line breaks


Do not create unnecessarily compressed code.

Bad:

function x(a){return a.filter(b=>b.active).map(b=>b.name)}

Good:

function getActiveProductNames(products) {
    return products
        .filter(product => product.active)
        .map(product => product.name);
}


---

8. Semicolons

Use semicolons consistently.

const products = [];
const searchQuery = "";

Do not randomly mix styles.


---

9. Strings

Prefer template literals when interpolation is required.

const title = `Best ${category} in 2026`;

For simple strings:

const title = "Headphones";

Do not create unnecessarily complex template literals.


---

10. Functions

Functions should have a clear responsibility.

Bad:

function processEverything() {
    // fetch data
    // validate data
    // filter data
    // render UI
    // update URL
    // handle analytics
    // update localStorage
}

Prefer separate responsibilities:

async function loadProducts() {}

function validateProducts() {}

function filterProducts() {}

function renderProducts() {}

function updateUrl() {}


---

11. Function Size

There is no mandatory line limit.

However, a function should be split when:

it has multiple unrelated responsibilities

it becomes difficult to understand

it contains deeply nested logic

it is difficult to test

the same logic is repeated elsewhere


Do not split functions merely to make them shorter.

Avoid unnecessary fragmentation.


---

12. Function Inputs and Outputs

Functions should have clear inputs and outputs.

Prefer:

function filterProducts(products, query) {
    return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
}

Avoid hidden dependencies when possible.

Bad:

function filterProducts() {
    return allProducts.filter(...);
}

when the function can easily receive the data explicitly.


---

13. Side Effects

Be aware of side effects.

A function that calculates a value should preferably not unexpectedly modify unrelated application state.

Example:

function getFilteredProducts(products, query) {
    return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
}

This is preferable to unexpectedly modifying the original array.


---

14. Arrow Functions

Use arrow functions when appropriate.

Good:

const activeProducts = products.filter(
    product => product.active
);

Arrow functions are useful for:

callbacks

array methods

short functions

functions that do not require their own this


Do not use arrow functions automatically when a normal function provides clearer behavior.


---

15. Scope

Avoid unnecessary global variables.

Bad:

let products;
let filteredProducts;
let searchQuery;
let selectedProducts;

in the global scope without architectural reason.

Prefer module scope or encapsulated state.


---

16. Global State

Global state should be minimized.

If multiple parts of the page require the same state, define one clear source of truth.

Avoid maintaining duplicate versions of the same information.

Bad:

let products = [];
let allProducts = [];
let productData = [];

when all three contain the same information.

Prefer:

let allProducts = [];

and derive other values when needed.


---

17. State Management

Application state should be explicit.

Example:

const state = {
    searchQuery: "",
    displayedCount: 12,
    selectedForComparison: new Set(),
    isLoading: false
};

Do not create state variables without a reason.

Every state value should have a clear purpose.


---

18. Source of Truth

For data-driven YallaBuy pages:

data.json is the primary source of product data.

JavaScript must render data.

JavaScript must not invent product information.

Do not hardcode large product catalogs directly inside JavaScript.

Bad:

const products = [
    {
        name: "Sony WH-1000XM6",
        price: 399,
        rating: 4.8
    }
];

when the project architecture already stores products in:

data.json

Instead:

const response = await fetch("./data.json");
const products = await response.json();


---

19. Data Integrity

JavaScript must not silently assume that external data is valid.

Validate important data before rendering.

Example:

function isValidProduct(product) {
    return (
        product &&
        typeof product.name === "string" &&
        typeof product.id === "string"
    );
}


---

20. DOM Selection

Use clear selectors.

const searchInput = document.querySelector("#search-input");
const productGrid = document.querySelector("#product-grid");

Avoid repeatedly querying the same stable element.

Bad:

document.querySelector("#product-grid").appendChild(card);
document.querySelector("#product-grid").appendChild(card2);
document.querySelector("#product-grid").appendChild(card3);

Prefer:

const productGrid = document.querySelector("#product-grid");

productGrid.appendChild(card);
productGrid.appendChild(card2);
productGrid.appendChild(card3);


---

21. Missing DOM Elements

Never blindly assume an element exists.

Bad:

searchInput.addEventListener("input", handleSearch);

if the element may not exist.

Safer:

if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
}

If the element is required for the page to function, fail clearly instead of silently continuing.


---

22. textContent vs innerHTML

Prefer textContent when inserting plain text.

title.textContent = product.name;

Do not use innerHTML when plain text is sufficient.


---

23. innerHTML Security

Never insert untrusted user or external data into innerHTML without proper sanitization.

Bad:

container.innerHTML = userInput;

This can create XSS vulnerabilities.

Prefer:

const element = document.createElement("p");
element.textContent = userInput;

container.appendChild(element);


---

24. Dynamic HTML

When complex HTML must be generated dynamically, prefer safe DOM APIs where practical.

Example:

const card = document.createElement("article");

const title = document.createElement("h2");
title.textContent = product.name;

card.appendChild(title);

If innerHTML is intentionally used for static trusted markup, ensure that all dynamic values are safely handled.


---

25. DOM Rendering

Rendering should be predictable.

A rendering function should receive the required data and update the intended UI.

Example:

function renderProducts(products) {
    productGrid.replaceChildren();

    const fragment = document.createDocumentFragment();

    products.forEach(product => {
        fragment.appendChild(createProductCard(product));
    });

    productGrid.appendChild(fragment);
}


---

26. Avoid Unnecessary Full Re-Renders

Do not rerender the entire page when only a small UI section changes.

Bad:

renderEntirePage();

every time a comparison checkbox changes.

Prefer updating only the affected section.


---

27. Document Fragments

Use DocumentFragment when adding many elements.

const fragment = document.createDocumentFragment();

products.forEach(product => {
    fragment.appendChild(createProductCard(product));
});

productGrid.appendChild(fragment);

This can reduce unnecessary DOM updates.


---

28. Events

Use addEventListener().

Good:

button.addEventListener("click", handleClick);

Avoid inline HTML event handlers.

Bad:

<button onclick="handleClick()">Click</button>


---

29. Event Handlers

Event handlers should have clear names.

function handleSearchInput(event) {}

function handleCompareClick(event) {}

function handleLoadMoreClick(event) {}

Avoid anonymous complex event handlers when the logic is large.

Bad:

button.addEventListener("click", event => {
    // 50 lines
});

Prefer:

button.addEventListener("click", handleButtonClick);

function handleButtonClick(event) {
    // logic
}


---

30. Event Delegation

Use event delegation when many similar or dynamically generated elements require the same event.

Example:

productGrid.addEventListener("click", handleProductGridClick);

Then:

function handleProductGridClick(event) {
    const button = event.target.closest("[data-action]");

    if (!button) {
        return;
    }

    // Handle action
}

This is especially useful for:

product cards

dynamically generated buttons

comparison controls

search results

lists



---

31. Duplicate Event Listeners

Do not accidentally register the same listener multiple times.

Bad:

function initialize() {
    button.addEventListener("click", handleClick);
}

initialize();
initialize();

This can cause duplicate behavior.

Initialization must be controlled.


---

32. Event Cleanup

When components or dynamic systems are removed, event listeners should be cleaned up when necessary.

Use:

element.removeEventListener("click", handleClick);

or use an appropriate lifecycle strategy.

For modern event systems, AbortController may be used when appropriate.


---

33. Search

Search functionality must handle:

uppercase

lowercase

partial matches

whitespace

empty queries

no results

special characters

rapid typing


Normalize input when appropriate.

Example:

function normalizeSearchQuery(query) {
    return query.trim().toLowerCase();
}


---

34. Search Filtering

Do not mutate the original product dataset unless intentional.

Prefer:

const filteredProducts = allProducts.filter(product => {
    return product.name
        .toLowerCase()
        .includes(searchQuery);
});

instead of modifying allProducts.


---

35. Debouncing

Use debouncing for expensive operations triggered by frequent input events.

Especially:

search

autocomplete

resize

expensive filtering

API requests


Example:

let searchDebounceTimer;

function handleSearchInput(event) {
    clearTimeout(searchDebounceTimer);

    searchDebounceTimer = setTimeout(() => {
        performSearch(event.target.value);
    }, 200);
}

Do not debounce every event automatically.


---

36. Async JavaScript

Prefer async/await for readable asynchronous workflows.

Example:

async function loadProducts() {
    const response = await fetch("./data.json");

    if (!response.ok) {
        throw new Error("Failed to load product data");
    }

    return await response.json();
}


---

37. Fetch

Never assume fetch() succeeded just because no network exception occurred.

Always check:

if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
}


---

38. Fetch Error Handling

Handle failures visibly when appropriate.

Example:

try {
    const products = await loadProducts();
    renderProducts(products);
} catch (error) {
    console.error(error);
    showErrorState();
}

Never silently swallow important errors.

Bad:

try {
    await loadProducts();
} catch (error) {}


---

39. JSON Parsing

External JSON must be treated as potentially invalid.

Handle:

network failure

HTTP failure

invalid JSON

missing fields

incorrect data types

empty datasets



---

40. Parallel Async Operations

When independent operations can run in parallel, use Promise.all() when appropriate.

Example:

const [products, articles] = await Promise.all([
    loadProducts(),
    loadArticles()
]);

Do not serialize independent requests unnecessarily.


---

41. Race Conditions

Search and autocomplete systems must protect against stale asynchronous results.

Example scenario:

User types:
head
then:
headp
then:
headph

An older request must not overwrite a newer result.

Possible solutions:

AbortController

request IDs

state comparison

cancellation



---

42. AbortController

Use AbortController when cancelling outdated requests improves correctness or performance.

Example:

let searchController = null;

async function searchProducts(query) {
    if (searchController) {
        searchController.abort();
    }

    searchController = new AbortController();

    const response = await fetch(
        `/search?q=${encodeURIComponent(query)}`,
        {
            signal: searchController.signal
        }
    );

    return response.json();
}

Handle abort errors intentionally.


---

43. Null and Undefined Safety

Use optional chaining when appropriate.

const name = product?.name;

Use nullish coalescing when a fallback is appropriate.

const title = product?.name ?? "Unknown Product";

Do not use fallbacks to hide required data errors.

Bad:

const productId = product?.id ?? "unknown";

if a missing ID should actually invalidate the product.


---

44. Arrays

Use array methods when they improve clarity.

Common methods:

map()
filter()
find()
some()
every()
reduce()
forEach()
includes()
sort()

Do not use reduce() merely because it is shorter.

Use the method that best communicates the intent.


---

45. Array Mutation

Be aware of methods that mutate arrays.

Mutating:

sort()
reverse()
splice()

Non-mutating alternatives may be preferable when original state must remain unchanged.

Example:

const sortedProducts = [...products].sort(compareProducts);


---

46. Objects

Use objects to group related data.

const product = {
    id: "sony-wh-1000xm6",
    name: "Sony WH-1000XM6",
    brand: "Sony"
};

Do not create deeply nested objects without a clear reason.


---

47. Destructuring

Use destructuring when it improves readability.

const {
    id,
    name,
    brand
} = product;

Do not destructure excessively when it makes code harder to understand.


---

48. Spread Syntax

Use spread syntax when appropriate.

const updatedState = {
    ...state,
    searchQuery: "sony"
};

For arrays:

const updatedProducts = [...products];


---

49. Set

Use Set when uniqueness is required.

Example:

const selectedForComparison = new Set();

Useful for:

selected product IDs

unique values

membership checks



---

50. Map

Use Map when key-value relationships require behavior beyond ordinary object usage.

Example:

const productMap = new Map();

Do not use Map automatically when a simple object is clearer.


---

51. Classes

Classes should be used when an object genuinely represents a reusable entity with state and behavior.

Example:

class ProductManager {
    constructor(products) {
        this.products = products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
}

Do not create classes merely to make simple functions look more sophisticated.


---

52. Encapsulation

When sensitive internal state should not be directly modified, use private class fields when appropriate.

Example:

class User {
    #password;

    constructor(password) {
        this.#password = password;
    }

    checkPassword(password) {
        return password === this.#password;
    }
}

Private fields are preferred over fake privacy conventions when supported by the project browser targets.


---

53. Inheritance

Use inheritance only when there is a genuine "is-a" relationship.

Avoid unnecessary inheritance hierarchies.

Prefer composition when it provides a simpler design.

Bad architecture:

BaseComponent
    ↓
ProductComponent
    ↓
SpecialProductComponent
    ↓
PremiumProductComponent

if simple composition can solve the problem.


---

54. Modules

Prefer ES modules for larger JavaScript architecture.

Example:

export function filterProducts() {}

Import:

import { filterProducts } from "./filter.js";

Keep modules focused.


---

55. Module Responsibilities

A module should have a clear purpose.

Possible architecture:

assets/js/
├── main.js
├── data.js
├── search.js
├── filters.js
├── rendering.js
├── comparison.js
├── utils.js
└── accessibility.js

Do not create modules simply because a file has a few lines.


---

56. Circular Dependencies

Avoid circular dependencies.

Bad:

A → B → C → A

Refactor shared logic into an appropriate lower-level module when needed.


---

57. Utility Functions

Utility functions should be genuinely reusable.

Good:

function normalizeSearchQuery(query) {}

Bad:

function doSomethingForProductCardOnHeadphonesPage() {}

which has no meaningful reuse.

Avoid creating a giant utils.js containing unrelated functions.


---

58. URL Handling

Use safe URL construction.

When user-controlled values are placed into URLs:

const url = `/search?q=${encodeURIComponent(query)}`;

Do not concatenate raw user input into URLs without encoding.


---

59. Amazon Links

Amazon links must use the intended affiliate URLs.

JavaScript must not:

invent Amazon links

modify affiliate tags incorrectly

generate fake product URLs

replace valid links with unrelated links


Product data should contain the correct destination.


---

60. Product Data

JavaScript must never fabricate:

prices

ratings

reviews

specifications

testing results

ownership experiences

availability

product claims


If information is missing:

display an appropriate fallback

omit the field

or show a clear unavailable state


Do not invent a value.


---

61. Rendering Product Cards

Product rendering should be data-driven.

Example:

function createProductCard(product) {
    const card = document.createElement("article");

    card.className = "product-card";
    card.dataset.productId = product.id;

    const title = document.createElement("h2");
    title.textContent = product.name;

    card.appendChild(title);

    return card;
}


---

62. Product IDs

Product IDs must be stable and unique.

Do not generate random IDs every time a product is rendered.

Use the canonical product ID from the dataset.


---

63. Loading States

Dynamic pages should provide a clear loading state when appropriate.

Example states:

Loading
Success
Empty
Error

Do not leave users with a blank page while JavaScript waits for data.


---

64. Empty States

Handle empty datasets.

Example:

if (products.length === 0) {
    showEmptyState();
    return;
}

The empty state should explain what happened.


---

65. Error States

Errors should be understandable to users.

Avoid exposing raw technical errors as the primary user message.

Bad:

TypeError: Cannot read properties of undefined

Better:

We couldn't load the products right now. Please try again.

Technical details may still be logged for debugging.


---

66. Performance

JavaScript must not unnecessarily slow down the page.

Avoid:

excessive DOM operations

large synchronous loops during page load

unnecessary rerenders

unnecessary event listeners

unnecessary timers

excessive third-party scripts

repeated layout calculations

unnecessary network requests



---

67. Layout Thrashing

Avoid repeatedly mixing DOM reads and writes that force layout recalculation.

Risky pattern:

element.style.height = element.offsetHeight + "px";
element.style.width = element.offsetWidth + "px";

repeated in large loops.

Prefer batching reads first, then writes.


---

68. DOM Read/Write Separation

Prefer:

const height = element.offsetHeight;
const width = element.offsetWidth;

element.style.height = `${height}px`;
element.style.width = `${width}px`;

when measurements are actually necessary.

Do not repeatedly call:

offsetHeight
offsetWidth
getBoundingClientRect()

inside expensive loops without reason.


---

69. Event Frequency

Be careful with:

scroll

resize

mousemove

input


Use:

debounce

throttle

requestAnimationFrame


when appropriate.

Do not automatically add these mechanisms when they provide no benefit.


---

70. requestAnimationFrame

Use requestAnimationFrame() for visual updates that should synchronize with browser rendering.

Example:

requestAnimationFrame(() => {
    element.style.transform = "translateY(10px)";
});


---

71. Timers

Avoid unnecessary intervals.

Bad:

setInterval(() => {
    checkSomething();
}, 100);

when an event-driven approach exists.

Prefer event-driven behavior whenever possible.


---

72. Memory Management

Avoid retaining references to objects that are no longer needed.

Be careful with:

event listeners

timers

subscriptions

observers

large arrays

cached DOM nodes


Clean up resources when the related feature is destroyed.


---

73. MutationObserver

Use MutationObserver only when observing DOM mutations is genuinely required.

Do not use it as a substitute for proper application state management.


---

74. IntersectionObserver

Use IntersectionObserver when appropriate for:

lazy behavior

visibility detection

progressive loading

scroll-based activation


Avoid expensive manual scroll calculations when an observer can solve the problem.


---

75. Accessibility

JavaScript must preserve accessibility.

Do not create interactions that only work with a mouse.

Every interactive feature should consider:

keyboard access

focus

semantic HTML

screen readers

visible state changes

reduced motion



---

76. Keyboard Interaction

Interactive components must be keyboard usable.

Do not create a clickable <div> when a <button> is appropriate.

Bad:

<div class="button">Compare</div>

Better:

<button type="button">Compare</button>


---

77. Focus Management

When JavaScript opens:

dialogs

menus

autocomplete

modals


focus behavior must be considered.

Do not unexpectedly remove keyboard focus.


---

78. ARIA

Use semantic HTML first.

ARIA should enhance semantics when necessary.

Do not add unnecessary ARIA attributes.

Bad:

<div role="button" aria-label="button">

when a real button can be used.

Good:

<button type="button">
    Compare
</button>


---

79. Reduced Motion

JavaScript-driven animations should respect reduced-motion preferences when appropriate.

Example:

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

Do not force complex animations on users who request reduced motion.


---

80. Security

Client-side JavaScript must never contain secrets.

Never put:

private API keys

passwords

database credentials

private tokens

secret server credentials


inside frontend JavaScript.

Anything shipped to the browser should be considered visible to users.


---

81. XSS Prevention

Avoid inserting untrusted content into:

innerHTML
outerHTML
insertAdjacentHTML()

unless the content is properly trusted or sanitized.

Prefer:

textContent

and DOM APIs.


---

82. eval

Do not use:

eval()

unless there is an exceptional, documented, security-reviewed reason.

Normal YallaBuy code must not use eval().


---

83. Dynamic Script Injection

Do not dynamically load arbitrary scripts from user-controlled URLs.

External scripts must be intentional, trusted, and documented.


---

84. Browser Compatibility

JavaScript must support the browsers targeted by YallaBuy.

Before using a newer feature, consider browser support when it materially affects users.

Do not add polyfills blindly.


---

85. Progressive Enhancement

The site should remain understandable and usable where possible without JavaScript.

JavaScript should enhance the experience rather than unnecessarily make basic content inaccessible.

For important content:

HTML → content
CSS → presentation
JavaScript → enhancement / behavior


---

86. Console Usage

Use console methods for development and debugging.

Examples:

console.log();
console.warn();
console.error();

Remove unnecessary debug logs before production.

Do not leave large amounts of debugging output in production.


---

87. Error Logging

Errors should provide useful debugging information.

Bad:

console.error("Error");

Better:

console.error("Failed to load product data:", error);

Do not expose sensitive information.


---

88. Comments

Comments should explain:

why something is done

important constraints

non-obvious decisions

browser workarounds

performance reasons

security considerations


Avoid comments that simply repeat the code.

Bad:

// Set search query
searchQuery = query;

Good:

// Debouncing prevents expensive filtering during rapid typing.


---

89. TODO Comments

TODOs should be specific.

Bad:

// TODO fix this

Better:

// TODO: Replace temporary fallback after the product API is finalized.

Do not leave permanent TODOs for unfinished core functionality.


---

90. Magic Numbers

Avoid unexplained numbers.

Bad:

if (selectedProducts.size >= 4) {}

Better:

const MAX_COMPARE_ITEMS = 4;

if (selectedProducts.size >= MAX_COMPARE_ITEMS) {}

However, do not create constants for every trivial number.


---

91. Error Handling

Errors must be handled at the appropriate level.

Do not catch an error just to ignore it.

Bad:

try {
    doSomething();
} catch (error) {
}

Either:

recover

display an error

log it

rethrow it

intentionally ignore it with a documented reason



---

92. Input Validation

Treat external input as untrusted.

Possible external sources:

URL parameters

search input

form input

JSON files

API responses

localStorage

external data


Validate before using.


---

93. LocalStorage

Do not assume localStorage contains valid data.

Bad:

const products = JSON.parse(localStorage.getItem("products"));

without handling:

missing values

invalid JSON

outdated structures


Use defensive parsing.


---

94. URL Parameters

Validate URL parameters before using them.

Example:

const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

Do not assume productId exists or is valid.


---

95. State and URL Synchronization

When URL state is used for:

search

filters

selected category

product

comparison


keep the relationship between URL and application state explicit.

Avoid creating infinite update loops between:

URL → state → URL → state


---

96. Accessibility and Dynamic Content

When JavaScript updates content dynamically, consider:

focus

screen-reader announcements

keyboard navigation

live regions

visible state changes


Do not assume visual changes are automatically accessible.


---

97. File Organization

JavaScript files should have clear responsibilities.

Example:

assets/
└── js/
    ├── main.js
    ├── data.js
    ├── search.js
    ├── filters.js
    ├── rendering.js
    ├── comparison.js
    ├── accessibility.js
    └── utils.js

The exact structure may change according to page complexity.

Do not create dozens of tiny files without architectural value.


---

98. Page-Specific JavaScript

Page-specific JavaScript should not unnecessarily affect unrelated pages.

If a script is loaded globally, it must safely handle pages where its expected DOM elements do not exist.

Prefer feature initialization:

if (document.querySelector("#product-grid")) {
    initializeProductCatalog();
}


---

99. Initialization

Initialization should be predictable.

Example:

document.addEventListener("DOMContentLoaded", () => {
    initializePage();
});

If modules are loaded with appropriate script behavior, DOMContentLoaded may not always be necessary.

Choose the simplest correct initialization strategy.


---

100. Initialization Order

When multiple systems depend on each other, define their order explicitly.

Example:

1. Load configuration
2. Load data
3. Validate data
4. Initialize state
5. Render UI
6. Attach interactions
7. Enable optional features

Do not create hidden initialization dependencies.


---

101. Product Catalog Architecture

For YallaBuy product catalog pages, prefer this general flow:

DATA
 ↓
VALIDATION
 ↓
STATE
 ↓
FILTER / SEARCH
 ↓
RENDER
 ↓
USER INTERACTION
 ↓
STATE UPDATE
 ↓
TARGETED RERENDER

Avoid:

USER CLICK
 ↓
RELOAD EVERYTHING
 ↓
REBUILD EVERYTHING

unless the page genuinely requires it.


---

102. Comparison Feature

Comparison functionality should:

use stable product IDs

enforce the maximum number of products

prevent duplicates

update UI state predictably

handle missing products

remain keyboard accessible


Example:

if (
    !selectedForComparison.has(product.id) &&
    selectedForComparison.size < MAX_COMPARE_ITEMS
) {
    selectedForComparison.add(product.id);
}


---

103. Load More

For "Load More" interfaces:

track displayed count

avoid duplicating products

disable or hide the button when no more products exist

preserve search/filter state

avoid re-rendering unrelated UI



---

104. Pagination

Pagination state should be explicit.

Example:

const state = {
    currentPage: 1,
    pageSize: 12
};

Do not allow page numbers outside valid bounds.


---

105. Skeleton Loading

Skeleton UI should represent loading state only.

Do not leave skeleton elements active after successful rendering.

The lifecycle should be:

START
 ↓
SKELETON
 ↓
DATA LOADED
 ↓
REAL CONTENT

or:

START
 ↓
SKELETON
 ↓
ERROR
 ↓
ERROR STATE


---

106. Image-Related JavaScript

JavaScript must not interfere with image performance unnecessarily.

Avoid:

lazy-loading above-the-fold LCP images through unnecessary JavaScript

delaying critical images unnecessarily

replacing image sources after page load without reason

causing layout shifts through missing dimensions


Follow the image rules defined in:

Images.md


---

107. Performance Integration

JavaScript must respect the project performance targets:

LCP < 2.5s
INP < 200ms
CLS < 0.1

JavaScript changes must be evaluated for their potential effect on:

LCP

INP

CLS

Total Blocking Time

network requests

memory usage



---

108. Third-Party JavaScript

Third-party JavaScript must have a clear reason to exist.

Before adding a third-party script, evaluate:

necessity

performance

privacy

security

accessibility

dependency risk

failure behavior


Do not add third-party scripts merely because they are popular.


---

109. Third-Party Failure

The site should remain functional when a non-critical third-party script fails.

Third-party functionality must not unnecessarily block core content.


---

110. Code Duplication

Avoid repeated logic.

Bad:

const query1 = input.value.trim().toLowerCase();
const query2 = search.value.trim().toLowerCase();
const query3 = keyword.value.trim().toLowerCase();

when the same normalization rule is required everywhere.

Use:

function normalizeSearchQuery(query) {
    return query.trim().toLowerCase();
}

Do not abstract one-off code unnecessarily.


---

111. Refactoring

Refactoring must preserve behavior unless behavior changes are explicitly requested.

Before refactoring:

Understand
 ↓
Identify dependencies
 ↓
Identify expected behavior
 ↓
Make small change
 ↓
Test
 ↓
Compare behavior

Do not rewrite entire JavaScript systems merely to make them "cleaner."


---

112. Minimal Change Principle

When fixing a bug, modify the smallest reasonable area.

Avoid unrelated changes.

Example:

If the bug is in autocomplete:

Do not simultaneously rewrite:

product rendering

comparison

CSS

URL routing

unrelated utilities


unless required.


---

113. Breaking Changes

Before changing a public function, DOM selector, data field, or module API, identify dependencies.

Examples:

product.id
#product-grid
createProductCard()
filterProducts()

Changing them may affect:

HTML

CSS

other JavaScript

tests

SEO

links

analytics

deployment



---

114. DOM Contracts

Important selectors are contracts between HTML and JavaScript.

Example:

document.querySelector("#product-grid");

means the HTML must provide:

<div id="product-grid"></div>

Do not change selectors without checking dependencies.


---

115. Data Contracts

If JavaScript expects:

product.id
product.name
product.image
product.amazonUrl

the data source must provide these fields according to the project schema.

If the schema changes, update dependent code intentionally.


---

116. Testing Integration

JavaScript changes must follow:

Testing.md

At minimum, determine:

what changed

what depends on it

what can break

which tests are affected

whether tests were actually run


Never claim a test passed without evidence.


---

117. JavaScript Test Status

Use the project's testing statuses:

PASS
FAIL
BLOCKED
NOT RUN

Example:

Search functionality: PASS
Autocomplete: NOT RUN
Mobile keyboard behavior: BLOCKED


---

118. Runtime Testing

Code inspection is not runtime testing.

The following:

"The code looks correct."

does not mean:

"The feature works."

Runtime behavior must be tested in an actual browser when required.


---

119. Console Errors

A JavaScript change is not considered production-ready if it introduces unexplained runtime errors.

Check:

Console

Network

DOM behavior

event behavior

error states



---

120. Deployment Integration

Production JavaScript changes must follow:

Deployment.md

The workflow is:

IMPLEMENT
 ↓
TEST
 ↓
READY
 ↓
DEPLOY
 ↓
VERIFY PRODUCTION

Deployment success alone does not prove JavaScript functionality works.


---

121. Production Verification

After deployment, verify the changed JavaScript feature on:

https://yallbuy.shop/

when relevant.

Check:

JavaScript loading

console errors

network requests

data loading

user interactions

responsive behavior

affected pages



---

122. AI Coding Rules

When AI writes or modifies JavaScript for YallaBuy, it MUST follow these rules.


---

Rule 1 — Inspect Before Editing

AI must understand:

existing files

HTML structure

CSS classes

JavaScript architecture

data structure

dependencies


before making significant changes.


---

Rule 2 — Do Not Invent Architecture

AI must not introduce:

React

Vue

Angular

libraries

build systems

APIs

backend systems


unless explicitly requested or already part of the project architecture.


---

Rule 3 — Preserve Existing Behavior

Do not remove existing functionality unless explicitly requested.


---

Rule 4 — Do Not Invent Data

AI must never fabricate:

products

prices

ratings

specifications

reviews

testing claims

Amazon links



---

Rule 5 — Respect data.json

If the page is data-driven, use the existing data source.

Do not duplicate large datasets inside JavaScript.


---

Rule 6 — Respect Existing Selectors

Before changing:

IDs
classes
data attributes
function names
data fields

check their dependencies.


---

Rule 7 — Avoid Unnecessary Rewrites

If one function is broken, fix the function.

Do not rewrite the entire file unless necessary.


---

Rule 8 — Explain Assumptions

If the architecture is unclear, AI must state the assumption instead of pretending certainty.


---

Rule 9 — No Fake Testing

AI must never say:

Tested and working.

unless the test was actually performed.


---

Rule 10 — No Fake Performance Claims

AI must never claim:

This makes the page 50% faster.

without evidence.

Use:

This change is intended to reduce unnecessary DOM work.

when no measurement exists.


---

123. AI Decision Rules

AI should apply the following decisions.

If a value never changes:

Use const

If a value changes:

Use let

If old code uses var:

Do not automatically rewrite the entire file.

Only change it when relevant to the requested work or refactor.

If DOM element may not exist:

Handle the missing element.

If logic is repeated:

Consider a reusable function.

If abstraction makes the code harder:

Do not abstract it.

If HTML/CSS can solve the problem:

Prefer HTML/CSS over JavaScript.

If data already exists in JSON:

Read the JSON instead of duplicating data.

If an operation can fail:

Handle the failure.

If code changes the DOM repeatedly:

Check whether rendering can be batched.


---

124. AI Change Protocol

For every meaningful JavaScript change:

1. Identify the requested behavior.
2. Inspect the existing implementation.
3. Identify dependencies.
4. Identify affected HTML/CSS/data.
5. Choose the smallest correct change.
6. Implement the change.
7. Check syntax.
8. Check logic.
9. Check accessibility.
10. Check performance impact.
11. Check security implications.
12. Run relevant tests.
13. Record actual test status.
14. Prepare deployment only if ready.
15. Verify production after deployment.


---

125. JavaScript Change Impact

Every JavaScript change should be evaluated against:

HTML
CSS
Data
DOM
Events
State
Accessibility
Performance
SEO
Security
Testing
Deployment

A small JavaScript change can affect more than JavaScript.


---

126. Anti-Patterns

Avoid the following.

126.1 Global Variables

window.products = [];

unless intentionally required.


---

126.2 Inline Event Handlers

onclick="..."


---

126.3 var

var x = 1;

in new code.


---

126.4 eval()

eval(code);


---

126.5 Empty Catch Blocks

catch (error) {}


---

126.6 Huge Functions

Functions that perform many unrelated responsibilities.


---

126.7 Huge Files

One JavaScript file containing every feature.


---

126.8 Excessive Abstraction

Creating complicated architecture for simple functionality.


---

126.9 Premature Optimization

Optimizing code before identifying a real performance problem.


---

126.10 Excessive DOM Re-rendering

Rebuilding large sections unnecessarily.


---

126.11 Duplicate State

Maintaining multiple conflicting copies of the same information.


---

126.12 Magic Numbers

Unexplained configuration values.


---

126.13 Fake Error Handling

Catching errors and doing nothing.


---

126.14 Hardcoded Product Catalogs

Putting dozens or hundreds of products directly inside JavaScript when the architecture uses JSON.


---

126.15 Fabricated Product Information

Never create information that does not exist in the source data.


---

127. Code Quality Checklist

Before considering JavaScript complete, verify:

[ ] Uses modern JavaScript
[ ] No unnecessary var
[ ] Naming is clear
[ ] Functions have clear responsibilities
[ ] No unnecessary global state
[ ] DOM elements are handled safely
[ ] Events are attached correctly
[ ] Duplicate listeners are avoided
[ ] Async operations handle errors
[ ] Fetch checks response.ok
[ ] External data is validated
[ ] No fabricated data
[ ] No unnecessary innerHTML
[ ] No XSS risks
[ ] No secrets in frontend code
[ ] Accessibility is preserved
[ ] Keyboard interaction works
[ ] Performance impact considered
[ ] No unnecessary DOM work
[ ] No unexplained console errors
[ ] Comments explain important decisions
[ ] Related tests identified
[ ] Deployment impact considered


---

128. YallaBuy JavaScript Architecture Principle

The preferred architecture is:

HTML
  ↓
Structure

CSS
  ↓
Presentation

JavaScript
  ↓
Behavior + State + Dynamic Rendering

JSON / Data
  ↓
Source of Product Information

Testing.md
  ↓
Verification

Deployment.md
  ↓
Production Release

Each layer should have a clear responsibility.


---

129. Master Rules

The following rules override convenience.

1. Do not invent data.
2. Do not invent test results.
3. Do not hide errors.
4. Do not introduce unnecessary complexity.
5. Do not duplicate the source of truth.
6. Do not unnecessarily manipulate the DOM.
7. Do not sacrifice accessibility for visual behavior.
8. Do not sacrifice performance for unnecessary functionality.
9. Do not expose secrets in client-side JavaScript.
10. Do not rewrite unrelated code.
11. Prefer clear code over clever code.
12. Prefer simple architecture over impressive architecture.
13. Test behavior, not just syntax.
14. Verify production after deployment.
15. Preserve existing functionality unless a change is intentional.


---

130. Final JavaScript Standard

The final goal is not:

"Write modern JavaScript."

The final goal is:

Write JavaScript that is correct,
clear,
maintainable,
accessible,
secure,
performant,
testable,
and consistent with the YallaBuy architecture.

JavaScript should make the website better.

It should never become unnecessary complexity that the website must carry.


---

131. Relationship With Other Specifications

This file does not replace other project specifications.

Use the following relationship:

JavaScript-Standards.md
        ↓
How JavaScript should be written

Testing.md
        ↓
How JavaScript should be tested

Deployment.md
        ↓
How JavaScript changes reach production

Images.md
        ↓
How image behavior and performance should be handled

Internal-Linking.md
        ↓
How JavaScript-generated links must respect internal linking rules

All specifications should work together.


---

132. Final AI Release Gate

Before declaring a JavaScript change complete:

Requirement understood
        ↓
Architecture inspected
        ↓
Dependencies identified
        ↓
Implementation completed
        ↓
Code quality checked
        ↓
Security checked
        ↓
Accessibility checked
        ↓
Performance impact checked
        ↓
Testing performed
        ↓
Actual test status recorded
        ↓
Deployment readiness checked
        ↓
Production deployment
        ↓
Production verification
        ↓
CHANGE COMPLETE

A JavaScript change is not fully complete merely because the code has been written.

The complete lifecycle is:

WRITE
 ↓
TEST
 ↓
DEPLOY
 ↓
VERIFY


---

END OF JAVASCRIPT-STANDARDS.md

