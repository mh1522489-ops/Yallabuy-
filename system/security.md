# Security Rules for AI

**Version:** 1.0  
**Project Type:** Static Web Application  
**Technologies:** HTML, CSS, JavaScript  
**Security Priority:** High  
**Primary Threat:** Cross-Site Scripting (XSS)

---

## 1. Purpose

This document defines mandatory security rules that every AI assistant MUST follow when creating, modifying, reviewing, or refactoring code in this project.

The AI MUST treat this document as a security policy.

The AI MUST NOT prioritize convenience, shorter code, or visual results over security.

These rules apply to:

- HTML
- CSS
- JavaScript
- URLs
- Forms
- User input
- External resources
- Third-party libraries
- Product links
- DOM manipulation
- Dynamic content
- Generated components
- New pages
- Existing pages
- Refactoring

---

## 2. Mandatory AI Behavior

Before creating or modifying code, the AI MUST:

1. Consider security implications.
2. Treat all externally controlled data as untrusted.
3. Avoid dangerous APIs whenever a safer alternative exists.
4. Never introduce secrets into client-side code.
5. Never disable a security mechanism just to make code work.
6. Never recommend insecure code without clearly identifying the security risk.
7. Prefer secure-by-default implementations.
8. Preserve existing security protections when modifying code.
9. Review generated code for common XSS vulnerabilities.
10. Tell the developer when a requested implementation creates a security risk.

The AI MUST NOT assume that data is safe simply because it comes from:

- HTML
- JavaScript
- URL parameters
- localStorage
- sessionStorage
- external APIs
- third-party websites
- product data
- query strings
- form fields

---

## 3. Threat Model

The primary security threats for this project are:

### High Priority

- Cross-Site Scripting (XSS)
- DOM-based XSS
- Malicious URL injection
- Unsafe DOM manipulation
- Malicious third-party JavaScript
- Compromised dependencies
- Exposed API keys or secrets

### Medium Priority

- Clickjacking
- Malicious external resources
- Unsafe redirects
- Manipulation of URL parameters
- Unsafe localStorage usage
- Supply-chain attacks

### Future Threats

If a backend, authentication system, database, payments, or user accounts are added, this security policy MUST be expanded to cover:

- SQL Injection
- Authentication attacks
- Authorization vulnerabilities
- CSRF
- Session attacks
- Password security
- API security
- Server-side request forgery
- Database security

---

## 4. XSS Protection

XSS is the primary security concern for this project.

The AI MUST actively check for XSS whenever JavaScript handles dynamic data.

### 4.1 Avoid innerHTML

The AI MUST NOT use `innerHTML` with untrusted or externally controlled data.

Unsafe:

```js
element.innerHTML = userInput;
```

Safe:

```js
element.textContent = userInput;
```

When HTML markup is actually required, the AI SHOULD construct DOM elements using safe DOM APIs such as:

```js
document.createElement()
```

and:

```js
element.appendChild()
```

---

## 5. Dangerous JavaScript APIs

The AI MUST NOT use:

```js
eval()
```

or:

```js
new Function()
```

unless there is an exceptional, documented reason and the developer explicitly approves it.

The AI MUST NOT use:

```js
document.write()
```

for dynamic untrusted content.

The AI MUST NOT dynamically execute strings as JavaScript.

Avoid:

```js
setTimeout("someFunction()", 1000);
```

Prefer:

```js
setTimeout(someFunction, 1000);
```

---

## 6. DOM Manipulation

When inserting text into the DOM, the AI SHOULD prefer:

```js
textContent
```

instead of:

```js
innerHTML
```

For attributes, the AI MUST validate the value before assigning it when the value can be influenced externally.

---

## 7. URLs

URLs MUST be treated as untrusted input.

The AI MUST NOT blindly insert user-controlled URLs into:

- `href`
- `src`
- `action`

or JavaScript navigation functions.

The AI MUST be especially careful with dangerous schemes such as:

```text
javascript:
data:
vbscript:
```

When accepting a URL, the AI SHOULD allow only expected protocols such as:

```text
https:
http:
```

Example:

```js
function isSafeUrl(value) {
    try {
        const url = new URL(value, window.location.origin);

        return url.protocol === "https:" ||
               url.protocol === "http:";
    } catch {
        return false;
    }
}
```

For external product links, HTTPS SHOULD be preferred.

---

## 8. External Links

When creating links that open a new tab, the AI SHOULD use:

```html
<a
    href="https://example.com"
    target="_blank"
    rel="noopener noreferrer"
>
    Visit website
</a>
```

The AI MUST NOT create unsafe external redirects.

The AI MUST NOT hide the actual destination of a link.

Product and affiliate links MUST remain clearly identifiable as external links where appropriate.

---

## 9. JavaScript URLs

The AI MUST NEVER generate user-controlled links like:

```html
<a href="javascript:...">
```

The AI MUST reject this pattern whenever the URL is influenced by external data.

---

## 10. External Scripts

Third-party JavaScript introduces supply-chain risk.

The AI SHOULD minimize external JavaScript dependencies.

Before adding a third-party script, the AI SHOULD consider:

- Why is it needed?
- Is there a native browser solution?
- Is the source trustworthy?
- Is the dependency actively maintained?
- Can the script be removed?
- Does it collect user data?
- Does it introduce unnecessary permissions?

The AI MUST NOT add unknown scripts simply because they provide convenient functionality.

---

## 11. CDN Resources

When using external scripts or stylesheets, prefer reputable sources.

The AI SHOULD use Subresource Integrity (SRI) when a reliable integrity hash is available and appropriate.

Example:

```html
<script
    src="https://example.com/script.js"
    integrity="..."
    crossorigin="anonymous">
</script>
```

The AI MUST NOT invent an SRI hash.

If the integrity hash cannot be verified, the AI MUST clearly state that the hash needs to be obtained from the trusted source.

---

## 12. API Keys and Secrets

The AI MUST NEVER place secrets inside frontend code.

This includes:

- API keys
- Private keys
- Access tokens
- Passwords
- Database credentials
- Secret tokens
- Authentication credentials

The AI MUST assume that everything inside:

- HTML
- CSS
- JavaScript
- localStorage
- sessionStorage

can be viewed by the user.

Therefore:

```js
const SECRET_API_KEY = "secret-value";
```

is NOT allowed.

Frontend JavaScript MUST NOT contain private credentials.

If a future API requires secret credentials, the project SHOULD use a secure backend or server-side environment.

---

## 13. localStorage

The AI MUST NOT store sensitive information in:

```js
localStorage
```

Examples of data that MUST NOT be stored there:

- Passwords
- Authentication tokens
- Private credentials
- Sensitive personal information

The AI SHOULD remember that localStorage can be accessed by JavaScript running on the same origin.

Therefore, an XSS vulnerability can expose localStorage data.

---

## 14. sessionStorage

The same security principles apply to:

```js
sessionStorage
```

The AI MUST NOT treat sessionStorage as a secure secret store.

---

## 15. Cookies

If cookies are introduced in the future, the AI SHOULD recommend secure cookie attributes such as:

- `Secure`
- `HttpOnly`
- `SameSite`

Sensitive authentication cookies SHOULD be HttpOnly so client-side JavaScript cannot directly access them.

---

## 16. User Input

All user-controlled data MUST be treated as untrusted.

Potential sources include:

- input
- textarea
- select
- URL parameters
- query strings
- hash fragments
- localStorage
- sessionStorage
- external APIs
- third-party content

The AI MUST validate and safely handle these values before displaying or using them.

Safe example:

```js
const name = input.value;
element.textContent = name;
```

NOT:

```js
element.innerHTML = name;
```

---

## 17. URL Parameters

The AI MUST assume URL parameters can be manipulated by attackers.

The AI MUST NOT directly inject URL parameters into HTML.

Unsafe:

```js
element.innerHTML = new URLSearchParams(location.search).get("page");
```

Safer:

```js
const page = new URLSearchParams(location.search).get("page");
element.textContent = page;
```

---

## 18. JSON and API Data

Data received from an API MUST be treated as untrusted.

The AI MUST NOT assume that API responses are safe.

Unsafe:

```js
element.innerHTML = apiData.name;
```

Prefer:

```js
element.textContent = apiData.name;
```

If HTML from an external source is absolutely required, it MUST be sanitized using a trusted sanitizer.

---

## 19. HTML Sanitization

If the project must render HTML originating from an untrusted source, the AI SHOULD recommend a well-maintained sanitization library such as DOMPurify.

The AI MUST NOT implement an incomplete custom HTML sanitizer unless there is a strong technical reason and proper security review.

The AI MUST NOT claim that simple string replacement is sufficient XSS protection.

Inadequate:

```js
value.replace("<script>", "");
```

This is NOT considered a secure sanitizer.

---

## 20. Content Security Policy

The AI SHOULD recommend a strong Content Security Policy where the hosting environment allows it.

A CSP can reduce the impact of XSS vulnerabilities.

The AI SHOULD prefer restrictive policies over:

```text
'unsafe-inline'
'unsafe-eval'
```

The AI MUST NOT add:

```text
'unsafe-eval'
```

without a documented reason.

The AI SHOULD avoid:

```text
'unsafe-inline'
```

when the application architecture allows it.

If CSP is implemented, the AI MUST ensure that the policy does not unnecessarily break legitimate site functionality.

---

## 21. Security Headers

When server or hosting configuration is available, the AI SHOULD recommend appropriate security headers, including where applicable:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

The AI MUST NOT blindly copy a security header configuration without considering the actual application.

HSTS SHOULD only be enabled when HTTPS is correctly configured for the domain and its subdomains as appropriate.

---

## 22. HTTPS

The production website MUST use HTTPS.

The AI MUST NOT recommend sending sensitive information over plain HTTP.

External resources SHOULD preferably use HTTPS.

Mixed content SHOULD be avoided.

---

## 23. Third-Party Content

The AI MUST consider third-party content a potential security and privacy risk.

Before adding:

- Analytics
- Advertising scripts
- Widgets
- Chat systems
- Social media embeds
- External JavaScript
- External CSS
- Tracking systems

the AI SHOULD evaluate:

- Source
- Purpose
- Permissions
- Data collection
- Security implications
- Performance impact

Unnecessary third-party code SHOULD NOT be added.

---

## 24. Images

Images from external sources MUST use trusted URLs.

The AI MUST NOT assume that an image URL is safe merely because it ends in:

- `.jpg`
- `.png`
- `.webp`
- `.avif`

The URL itself must be considered untrusted.

---

## 25. SVG Security

SVG files can contain active content.

The AI MUST be careful when handling externally supplied SVG files.

The AI SHOULD avoid injecting untrusted SVG directly into the DOM.

The AI MUST NOT insert untrusted SVG using:

```js
innerHTML
```

without appropriate sanitization.

---

## 26. Forms

For forms, the AI MUST:

- Validate expected input types.
- Use appropriate HTML input types.
- Avoid inserting submitted values using innerHTML.
- Avoid exposing sensitive information.
- Clearly identify external destinations.

Client-side validation MUST NOT be considered a complete security mechanism.

If a backend is introduced later, server-side validation MUST also be implemented.

---

## 27. Error Handling

The AI MUST NOT expose:

- API keys
- Internal paths
- Authentication secrets
- Stack traces containing sensitive information
- Internal infrastructure details

to normal website users.

Errors shown to users SHOULD be simple and non-sensitive.

---

## 28. Debugging

Before production, the AI SHOULD remove unnecessary:

```js
console.log()
console.debug()
console.error()
```

especially when logs could reveal:

- Tokens
- User information
- API responses
- Internal data
- Sensitive configuration

Debugging information MUST NOT expose secrets.

---

## 29. Dependencies

Third-party dependencies MUST be kept to a minimum.

Before recommending a dependency, the AI SHOULD consider:

- Is it necessary?
- Is it maintained?
- Is it widely trusted?
- Does it have known vulnerabilities?
- Can native browser APIs replace it?

Dependencies SHOULD be updated regularly.

The AI MUST NOT recommend downloading random JavaScript files from unknown websites.

---

## 30. Supply-Chain Security

The AI MUST consider third-party packages and scripts a possible attack vector.

The AI SHOULD recommend:

- Keeping dependencies updated.
- Removing unused dependencies.
- Reviewing package sources.
- Checking known vulnerabilities.
- Locking dependency versions where appropriate.
- Avoiding unnecessary third-party code.

---

## 31. Affiliate and Product Links

Product links are an important part of this project.

The AI MUST NOT modify affiliate links in a way that:

- Redirects users to malicious websites.
- Hides suspicious destinations.
- Injects JavaScript.
- Creates arbitrary redirects.

Product URLs SHOULD use HTTPS when available.

The AI MUST NOT generate fake product URLs.

The AI MUST NOT invent affiliate IDs, tracking IDs, or credentials.

---

## 32. Amazon and External Marketplace Links

When creating links to external marketplaces, the AI MUST treat the destination as external content.

The AI SHOULD:

- Use HTTPS.
- Use safe target attributes when opening new tabs.
- Avoid unnecessary redirect chains.
- Never insert JavaScript into the URL.
- Never expose private credentials.

The AI MUST NOT claim that a product link is safe if its actual destination has not been verified.

---

## 33. CSS Security

CSS generally has a smaller attack surface than JavaScript, but the AI MUST still be careful with dynamically generated CSS.

The AI MUST NOT insert untrusted values into CSS without appropriate validation.

The AI SHOULD avoid unnecessary dynamic CSS generation from user-controlled values.

---

## 34. iframe Security

The AI MUST treat iframes as a security boundary.

When using external iframes, the AI SHOULD consider:

```html
sandbox
```

where appropriate.

The AI SHOULD NOT embed unknown websites.

If an iframe does not need permissions, unnecessary permissions MUST NOT be granted.

---

## 35. postMessage

If:

```js
window.postMessage()
```

is used, the AI MUST validate the message origin.

The AI MUST NOT blindly trust:

```js
event.data
```

or:

```js
event.origin
```

The receiving code SHOULD explicitly verify the expected origin.

---

## 36. Open Redirect Protection

The AI MUST NOT create arbitrary redirects based on user-controlled parameters.

If redirects are required, destinations SHOULD be restricted to an allowlist of trusted destinations.

---

## 37. Clickjacking

The AI SHOULD recommend protection against clickjacking through appropriate security headers when hosting configuration allows it.

Modern protection SHOULD use an appropriate:

```text
Content-Security-Policy: frame-ancestors ...
```

configuration.

---

## 38. Third-Party Fonts

External fonts SHOULD be loaded only from trusted providers.

The AI SHOULD consider:

- Privacy
- Performance
- Availability
- Supply-chain risk

Self-hosting fonts may be preferable when practical.

---

## 39. Comments

The AI MUST NOT put secrets inside code comments.

Unsafe:

```js
// API key: abc123...
```

Comments SHOULD NOT contain:

- Passwords
- API keys
- Tokens
- Private URLs
- Credentials

---

## 40. Environment Variables

If a backend is introduced later, secrets SHOULD be stored in server-side environment variables or a dedicated secrets manager.

The AI MUST distinguish between:

```text
PUBLIC configuration
```

and:

```text
PRIVATE secrets
```

Anything shipped to browser JavaScript MUST be considered public.

---

## 41. Authentication

Authentication is currently outside the scope of this static frontend project.

If authentication is added later, the AI MUST NOT implement it casually.

The security policy MUST then be expanded to include:

- Password hashing
- Secure sessions
- MFA
- Account recovery
- Brute-force protection
- Rate limiting
- Authorization
- Secure cookies
- Session expiration
- Login monitoring

---

## 42. Database Security

There is currently no database.

If a database is introduced, the AI MUST expand this policy to include:

- SQL Injection prevention
- Parameterized queries
- Access control
- Database credentials
- Encryption
- Backups
- Least privilege
- Database auditing

---

## 43. API Security

There is currently no backend API.

If an API is introduced, the AI MUST consider:

- Authentication
- Authorization
- Input validation
- Rate limiting
- CORS
- CSRF where applicable
- API key management
- Error handling
- Logging
- Request size limits
- Abuse prevention

---

## 44. CORS

If APIs are introduced, the AI MUST NOT use:

```text
Access-Control-Allow-Origin: *
```

automatically.

CORS SHOULD be restricted to trusted origins when credentials or sensitive resources are involved.

The AI MUST explain the security implications before recommending permissive CORS.

---

## 45. Security Review Before Completion

Before declaring a page complete, the AI MUST perform a security review.

### XSS

- [ ] Is untrusted data inserted using innerHTML?
- [ ] Is eval() used?
- [ ] Is new Function() used?
- [ ] Is document.write() used?
- [ ] Is user-controlled HTML rendered?
- [ ] Are URL parameters safely handled?

### URLs

- [ ] Are external URLs trusted?
- [ ] Are dangerous URL schemes blocked?
- [ ] Are external new-tab links using noopener?
- [ ] Are redirects restricted?

### Secrets

- [ ] Are API keys exposed?
- [ ] Are passwords present?
- [ ] Are tokens present?
- [ ] Are private credentials present?

### Dependencies

- [ ] Are external scripts necessary?
- [ ] Are dependencies trusted?
- [ ] Are unnecessary libraries avoided?

### Browser Security

- [ ] Is HTTPS used?
- [ ] Are security headers considered?
- [ ] Is CSP considered?
- [ ] Is mixed content avoided?

### Storage

- [ ] Is sensitive data stored in localStorage?
- [ ] Is sensitive data stored in sessionStorage?

---

## 46. AI Security Response Rule

If the developer requests code that introduces a security vulnerability, the AI MUST:

1. Identify the vulnerability.
2. Explain why it is dangerous.
3. Provide a secure alternative.
4. Avoid silently implementing the insecure approach.
5. If the insecure approach is absolutely required for compatibility, clearly label the security trade-off.

---

## 47. Never Assume Security

The AI MUST NOT say:

> "This code is completely secure."

The AI SHOULD use precise language such as:

> "This implementation reduces the risk of XSS."

Security is a continuous process and no static code review can guarantee that a website is completely secure.

---

## 48. Security vs Functionality

When there is a conflict between functionality and security, the AI MUST NOT silently sacrifice security.

The AI SHOULD explain the trade-off and ask the developer to make an informed decision when necessary.

---

## 49. Security Changes

When modifying existing code, the AI MUST preserve existing security controls unless there is a documented reason to change them.

The AI MUST NOT remove:

- CSP
- Security headers
- Input validation
- URL validation
- Sanitization
- HTTPS
- Security-related attributes

simply to make functionality easier.

---

## 50. Production Checklist

Before publishing a new page:

- [ ] HTTPS enabled.
- [ ] No API keys in frontend code.
- [ ] No passwords or tokens in source code.
- [ ] No eval().
- [ ] No unnecessary document.write().
- [ ] No unsafe innerHTML usage.
- [ ] URL parameters safely handled.
- [ ] External URLs reviewed.
- [ ] External scripts reviewed.
- [ ] New-tab links use appropriate rel attributes.
- [ ] No unnecessary third-party scripts.
- [ ] Sensitive data is not stored in localStorage.
- [ ] CSP considered.
- [ ] Security headers considered.
- [ ] Mixed content removed.
- [ ] Debug information reviewed.
- [ ] Dependencies reviewed.
- [ ] XSS risks reviewed.

---

## 51. Future Security Requirements

This file MUST be updated when the project gains:

- Backend
- Database
- User accounts
- Authentication
- Payments
- Personal data
- API endpoints
- User-generated content
- File uploads
- Administrative dashboards

The security policy MUST evolve with the architecture.

---

## 52. Security Principles

The AI SHOULD follow these principles:

### Least Privilege

Only provide the permissions that are actually required.

### Defense in Depth

Do not rely on a single security mechanism.

### Secure by Default

The safest reasonable configuration should be the default.

### Minimize Attack Surface

Do not add unnecessary functionality, dependencies, permissions, or scripts.

### Never Trust External Input

All external input is potentially malicious until properly validated and safely handled.

### Fail Securely

When something goes wrong, the application should fail without exposing sensitive information.

---

## 53. Final AI Instruction

Before generating or modifying ANY project code:

1. Read this security policy.
2. Identify security-sensitive parts of the requested change.
3. Apply the relevant security rules.
4. Generate secure code.
5. Review the generated code for XSS and other applicable risks.
6. Never expose secrets.
7. Never knowingly introduce a security vulnerability.
8. Inform the developer about important security decisions or limitations.

**Security is a mandatory requirement, not an optional feature.**
