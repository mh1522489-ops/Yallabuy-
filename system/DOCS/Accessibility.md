Create a comprehensive and deeply detailed `Accessibility.md` specification for the YallaBuy website.

The file must be written as a professional project-level Accessibility Standard, not as a short educational article or simple checklist.

PROJECT:
- Website: YallaBuy
- Language: English
- Target standard: WCAG 2.2 Level AA
- Technologies: HTML, CSS, vanilla JavaScript
- The site contains product pages, category pages, product cards, search, autocomplete, comparison features, filters, navigation, responsive layouts, animations, forms, tables, and dynamic JavaScript components.
- The document will be used as a permanent development specification and reference for future YallaBuy pages and components.

IMPORTANT:
Do not start writing random accessibility tips.
First structure the document as a complete engineering standard.
The final document must be practical enough that a developer can use it while building and reviewing YallaBuy.

Use normative language consistently:
- MUST = mandatory requirement
- MUST NOT = prohibited
- SHOULD = strong recommendation
- SHOULD NOT = strong recommendation against
- MAY = optional

The document must include the following major sections:

1. Purpose & Scope
2. Accessibility Goals
3. WCAG 2.2 Level AA
4. Core Accessibility Principles
5. Perceivable
6. Operable
7. Understandable
8. Robust
9. Semantic HTML
10. Page Structure & Landmarks
11. Headings & Document Structure
12. Paragraphs, Lists & Content Structure
13. Links
14. Buttons
15. Images
16. Alternative Text
17. Decorative Images
18. SVG Accessibility
19. Icon Buttons
20. Color
21. Color Contrast
22. Focus Indicators
23. Keyboard Accessibility
24. Keyboard Navigation
25. Focus Management
26. Focus Traps
27. Skip Links
28. Forms
29. Form Labels
30. Required Fields
31. Form Errors
32. Validation
33. Error Prevention
34. Search
35. Search Autocomplete
36. Product Cards
37. Product Grids
38. Category Cards
39. Filters
40. Product Comparison
41. Dropdowns
42. Menus
43. Mobile Navigation
44. Modals & Dialogs
45. Accordions
46. Tabs
47. Tables
48. Product Specification Tables
49. Loading States
50. Skeleton Loading
51. Notifications
52. Live Regions
53. Dynamic JavaScript Content
54. ARIA
55. Correct ARIA Usage
56. aria-label
57. aria-labelledby
58. aria-describedby
59. aria-expanded
60. aria-controls
61. aria-selected
62. aria-pressed
63. aria-current
64. aria-hidden
65. aria-live
66. Screen Readers
67. Screen Reader Testing
68. Mobile Accessibility
69. Responsive Accessibility
70. Touch Accessibility
71. Pointer Accessibility
72. Hover
73. Animation
74. Transitions
75. prefers-reduced-motion
76. Flashing Content
77. Typography
78. Text Readability
79. Zoom
80. Reflow
81. Responsive Layout
82. Video
83. Audio
84. Multimedia
85. Language Attributes
86. Page Titles
87. Content Accessibility
88. Cognitive Accessibility
89. Predictable Behavior
90. Consistent Navigation
91. Progressive Enhancement
92. Accessibility with JavaScript
93. Accessibility with CSS
94. Third-Party Widgets
95. Accessibility and Performance
96. Accessibility and SEO
97. AI-Generated Code Accessibility Rules
98. Accessibility Testing
99. Automated Testing
100. Manual Testing
101. Keyboard Testing
102. Browser Testing
103. Screen Reader Testing
104. Mobile Testing
105. Zoom Testing
106. Accessibility Audit
107. Common Accessibility Mistakes
108. Critical Accessibility Failures
109. Accessibility Priority Levels
110. YallaBuy Component Accessibility Standards
111. Accessibility Development Workflow
112. Accessibility Definition of Done
113. Pre-Publication Accessibility Checklist
114. Continuous Accessibility Maintenance
115. External Standards & References

FOR EVERY IMPORTANT RULE:

Explain:
1. What the rule means.
2. Why it matters.
3. When it applies.
4. What developers MUST do.
5. What developers MUST NOT do.
6. A bad example.
7. A correct example.
8. Exceptions when applicable.
9. How to test it.

Do not simply say:
"Images need alt text."

Instead explain the different cases:

- informative images
- decorative images
- functional images
- linked images
- product images
- images containing text
- charts
- icons
- SVGs
- logos
- background images

Provide appropriate HTML examples.

For interactive components, explain both HTML and JavaScript accessibility.

Examples must include realistic YallaBuy components such as:

- Header
- Navigation
- Mobile menu
- Search
- Search autocomplete
- Product card
- Product grid
- Category card
- Product comparison
- Filters
- Sort controls
- Price cards
- Product specifications
- FAQ
- Modal
- Dropdown
- Accordion
- Loading state
- Toast notification
- Footer

For JavaScript components explain:

- keyboard interaction
- focus behavior
- focus management
- state communication
- dynamic content
- screen reader behavior
- ARIA requirements
- Escape behavior
- Enter/Space behavior
- Arrow key behavior when applicable
- mobile behavior
- reduced motion
- error handling

SEARCH AUTOCOMPLETE MUST RECEIVE SPECIAL ATTENTION.

Define requirements for:
- input labeling
- opening suggestions
- closing suggestions
- keyboard navigation
- ArrowUp
- ArrowDown
- Enter
- Escape
- highlighted suggestion
- selected suggestion
- screen reader announcements
- aria-expanded
- aria-controls
- aria-activedescendant when appropriate
- mouse/touch interaction
- empty results
- loading results
- error state

PRODUCT COMPARISON MUST RECEIVE SPECIAL ATTENTION.

Define:
- add/remove controls
- selected state
- keyboard access
- screen reader announcements
- comparison count
- dynamic updates
- buttons
- focus behavior

FILTERS MUST RECEIVE SPECIAL ATTENTION.

Cover:
- checkbox filters
- radio filters
- select controls
- filter groups
- expanded/collapsed filter sections
- applied filters
- clearing filters
- dynamically updated results
- keyboard behavior
- mobile filters

FORMS MUST RECEIVE SPECIAL ATTENTION.

Cover:
- labels
- placeholders
- required fields
- instructions
- errors
- validation
- invalid fields
- error announcements
- preserving user input
- autocomplete attributes
- accessible names
- accessible descriptions

KEYBOARD ACCESSIBILITY MUST BE A MAJOR SECTION.

Explain:
- Tab
- Shift+Tab
- Enter
- Space
- Escape
- Arrow keys
- logical tab order
- focus visibility
- focus management
- keyboard traps
- tabindex
- why positive tabindex values should normally be avoided

ARIA MUST BE EXPLAINED DEEPLY.

For each important ARIA attribute explain:
- purpose
- when to use it
- when NOT to use it
- native HTML alternative
- example
- common mistake

Do not encourage unnecessary ARIA.

The document must clearly state:

"Prefer native HTML semantics before ARIA."

ACCESSIBILITY AND CSS MUST INCLUDE:

- focus styles
- :focus-visible
- contrast
- color
- text sizing
- responsive layouts
- zoom
- reflow
- overflow
- visual order
- CSS hiding
- display:none
- visibility:hidden
- opacity
- visually hidden content
- animation
- transitions
- reduced motion

ACCESSIBILITY AND JAVASCRIPT MUST INCLUDE:

- DOM updates
- dynamically inserted elements
- focus management
- keyboard events
- custom controls
- dialogs
- menus
- autocomplete
- live regions
- loading states
- notifications
- validation
- state synchronization

Do not recommend using JavaScript where native HTML is sufficient.

MOBILE ACCESSIBILITY MUST INCLUDE:

- touch target size
- spacing
- mobile menus
- responsive navigation
- orientation
- zoom
- screen readers
- touch interaction
- fixed headers
- sticky elements
- bottom sheets
- dialogs
- mobile search

COGNITIVE ACCESSIBILITY MUST INCLUDE:

- clear language
- predictable behavior
- consistent navigation
- avoiding unnecessary complexity
- understandable errors
- avoiding excessive animation
- clear instructions
- readable content
- meaningful headings

ACCESSIBILITY TESTING MUST BE VERY DETAILED.

Create separate testing procedures for:

1. Automated testing
2. Keyboard testing
3. Screen reader testing
4. Mobile testing
5. Zoom testing
6. Contrast testing
7. Responsive testing
8. Focus testing
9. Form testing
10. Dynamic component testing

Mention tools such as:
- Lighthouse
- axe
- WAVE
- browser DevTools
- NVDA
- VoiceOver
- TalkBack

But explicitly state that automated tools cannot detect every accessibility problem.

Create a detailed YallaBuy accessibility checklist.

The checklist must cover:

HTML
Images
Links
Buttons
Forms
Keyboard
Focus
Contrast
Typography
Mobile
Screen readers
ARIA
JavaScript
Search
Autocomplete
Product cards
Comparison
Filters
Dialogs
Menus
Animation
Reduced motion
Loading states
Notifications
Tables
Testing

Create a "Definition of Done" section that establishes when a YallaBuy page or component can be considered accessibility-ready.

Create an "Accessibility Severity / Priority" system:

- Critical
- High
- Medium
- Low

Explain examples of each.

Create a section called:

"AI-Generated Code Accessibility Rules"

Explain that AI-generated code must be manually reviewed and must not automatically be considered accessible.

Include checks for:
- semantic HTML
- keyboard accessibility
- focus
- ARIA
- forms
- images
- contrast
- dynamic content
- screen readers
- reduced motion
- responsive behavior

The final document should be:

- comprehensive
- technically accurate
- practical
- developer-oriented
- structured
- consistent
- easy to search
- suitable as a permanent YallaBuy project specification

Do NOT make it a short article.

Do NOT omit advanced accessibility topics simply to keep the document short.

Do NOT invent WCAG requirements.

When a WCAG requirement is specific, describe it accurately and distinguish between:
- WCAG requirement
- YallaBuy project rule
- recommended best practice

Use Markdown headings, tables, bullet lists, code blocks, checklists, examples, and clear explanations.

At the end include:

"Final Accessibility Principle"

with a concise principle explaining that accessibility is part of YallaBuy's definition of a finished, production-ready feature.

Output ONLY the complete contents of `Accessibility.md`.