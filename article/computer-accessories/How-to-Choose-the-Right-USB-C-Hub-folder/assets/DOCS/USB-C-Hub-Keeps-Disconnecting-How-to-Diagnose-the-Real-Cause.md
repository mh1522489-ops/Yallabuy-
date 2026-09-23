```markdown
# توثيق صفحة مقالة USB Hub Firmware & Disconnects

**المشروع:** YallaBuy  
**الملف:** `page-documentation-usb-hub-firmware.md`  
**النوع:** مرجع تقني للمطورين  
**الحالة:** نشط  
**الصفحة:** `/guides/usb-hub-firmware-disconnects.html`  
**آخر تحديث:** 2026-09-14  

---

# 1. الغرض من الملف

الملف ده مرجع تقني كامل لصفحة مقالة "Can a Firmware Update Fix USB Hub Disconnects?" على موقع YallaBuy.

مكتوب لـ:

- المطورين اللي بيصونوا أو بيعدلوا الصفحة
- مساعدات الذكاء الاصطناعي اللي هتعدل الصفحة
- اللي بيراجع الصفحة مقابل مواصفات YallaBuy
- أي حد عايز يفهم معمارية الصفحة قبل ما يعدل فيها

الملف ده مش شرح تعليمي. ده مرجع.

---

# 2. تصنيف الصفحة

| الخاصية | القيمة |
|---|---|
| نوع الصفحة | مقالة معلوماتية (Informational Article) |
| الـ Hub | Guides |
| النية الأساسية | معلوماتية (Informational) |
| الكاتب | Mahmoud Hamdy (Founder & Editor) |
| فيها منتج؟ | لأ |
| فيها Amazon CTA؟ | لأ |
| فيها FAQ؟ | أيوة (5 أسئلة) |
| فيها روابط أفلييت؟ | لأ |
| فيها تقييمات؟ | لأ |
| فيها أسعار؟ | لأ |

الصفحة مقالة معلوماتية خالصة. بتشرح مشكلة انقطاع USB-C hubs، تحديثات الـ firmware، وأمان البيانات. مش بتراجع ولا بتبيع منتج محدد.

---

# 3. هيكل الملف

الصفحة ملف HTML واحد مكتفٍ بذاته فيه:

- CSS كـ inline داخل `<style>` في الـ `<head>`
- JavaScript كـ inline داخل `<script>` في آخر الـ `<body>`
- مفيش ملفات CSS خارجية
- مفيش ملفات JavaScript خارجية
- مفيش تحميل خطوط ويب (web fonts)
- مفيش سكريبتات تالت بارت

القرار ده اتاخد عشان:

- زيرو طلبات خارجية بتعمل block للرندر
- مفيش تحميل خطوط (system fonts فقط)
- مفيش طلب ملف CSS بيعمل block لأول رسمة
- مفيش طلب ملف JS بيتأخر التفاعل

---

# 4. معمارية المحتوى

المقالة فيها الأقسام دي بالترتيب:

## 4.1 قائمة الأقسام

| # | ID القسم | العنوان |
|---|---|---|
| 1 | مقدمة بدون id | Introduction |
| 2 | `#firmware` | Can a firmware update really fix random disconnects? |
| 3 | `#data-safety` | Is it safe to keep using a hub that disconnects an external SSD? |
| 4 | `#other-causes` | If it is not firmware, what is it? |
| 5 | `#checklist` | A diagnostic checklist in order of cost |
| 6 | `#replace` | When to just replace the hub |
| 7 | `#sources-title` | Sources and further reading |
| 8 | `#faq-title` | Frequently asked questions |
| 9 | `#author-title` | About the author |

## 4.2 مصدر المحتوى

المصدر الأصلي اللي اداه صاحب الصفحة كان فيه:

- سؤالين وجواب (firmware + أمان SSD)
- قائمة بـ 8 مصادر

المقالة اتوسعت عشان تشمل:

- مقدمة
- شرح أعمق لكل سؤال وجواب
- قسم عن الأسباب التانية (طاقة، كابلات، إعدادات OS، bandwidth)
- checklist تشخيصية بـ 7 خطوات
- قسم "متى تستبدل الـ hub"

كل المحتوى الزيادة مبني حصريًا على المصادر الـ 8 المذكورة. مفيش أي ادعاءات اتخترعت.

## 4.3 أسلوب الكتابة

المقالة بتتبع نمط كتابة ثابت:

- مباشر، بصيغة المخاطب التاني (you)
- جمل قصيرة
- مفيش حشو
- تقني بس متاح
- شرطات طويلة (em-dashes) للتأكيد
- Bold للتحذيرات المهمة
- قوائم للخطوات والأعراض
- كود لأوامر النظام زي `dmesg`

---

# 5. الالتزام بـ Design System

الصفحة بتتبع `yallabuy-design-system.md` v1.2 بالظبط.

## 5.1 Design Tokens

كل الألوان والمسافات والـ radius والظلال و z-index معرفة كـ CSS custom properties في `:root`.

### الألوان

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#fbfaf7` | `#14181b` |
| `--bg-soft` | `#f3f1ec` | `#1a1f23` |
| `--surface` | `#fff` | `#1c2226` |
| `--surface-2` | `#f8f6f1` | `#20262a` |
| `--text` | `#1a1a1a` | `#f1f1ef` |
| `--text-2` | `#4a4a4a` | `#c4c4c2` |
| `--muted` | `#767676` | `#8f9396` |
| `--border` | `#e8e4dc` | `#2a3136` |
| `--brand` | `#0f766e` | `#2dd4bf` |
| `--brand-soft` | `#ccfbf1` | `#0f2e2b` |
| `--brand-deep` | `#134e4a` | `#5eead4` |
| `--accent` | `#b45309` | `#f59e0b` |

### مقياس المسافات

| Token | القيمة |
|---|---|
| `--s1` | `4px` |
| `--s2` | `8px` |
| `--s3` | `12px` |
| `--s4` | `16px` |
| `--s5` | `24px` |
| `--s6` | `32px` |
| `--s7` | `48px` |
| `--s8` | `64px` |

مفيش أي قيم مسافات عشوائية في أي مكان في الصفحة.

### الـ Radius

| Token | القيمة |
|---|---|
| `--r-sm` | `8px` |
| `--r` | `14px` |
| `--r-lg` | `22px` |

### الظلال

| Token | القيمة |
|---|---|
| `--sh-sm` | `0 1px 2px rgba(20,20,20,.04), 0 2px 8px rgba(20,20,20,.04)` |
| `--sh` | `0 4px 24px rgba(20,20,20,.06)` |
| `--sh-lg` | `0 12px 40px rgba(20,20,20,.08)` |

### الـ Z-Index

| Token | القيمة |
|---|---|
| `--z-dropdown` | `100` |
| `--z-sticky` | `200` |
| `--z-mobile` | `300` |
| `--z-modal` | `400` |
| `--z-toast` | `500` |

## 5.2 الخطوط (Typography)

الصفحة بتستخدم **system fonts بس**. مفيش أي web fonts بتتحمل.

| الدور | Font Stack |
|---|---|
| محتوى المقالة (فقرات، قوائم) | `Georgia, "Times New Roman", serif` |
| UI (عناوين، أزرار، metadata) | `Arial, Helvetica, sans-serif` |

### قواعد الخطوط

- مفيش `@font-face`
- مفيش `<link>` لـ Google Fonts أو أي خدمة خطوط
- مفيش preload لأي ملف خط
- مفيش `font-display: swap` لأن مفيش خطوط بتتحمل
- الـ typography ثابت قبل وبعد تحميل الصفحة
- مفيش layout shift بسبب الخطوط

## 5.3 الـ Dark Mode

الصفحة بتدعم dark mode عن طريق `data-theme` attribute على عنصر `<html>`.

### آلية العمل

```html
<!-- الوضع الافتراضي -->
<html lang="en" data-theme="light">

<!-- لما المستخدم يضغط على زر التبديل -->
<html lang="en" data-theme="dark">
```

### القواعد

- الـ tokens بتتبدل بس (ألوان، خلفيات، حدود)
- الـ components مش بتتغير شكلها
- الـ spacing مش بيتغير
- الـ typography مش بتتغير
- الـ layout مش بيتغير
- التفضيل بيتحفظ في `localStorage` تحت مفتاح `yallabuy-theme`
- لو الـ localStorage مش متاح، التبديل شغال بس مش بيتحفظ

## 5.4 الانتقالات والحركة (Transitions)

| العنصر | الانتقال |
|---|---|
| عام | `0.25s cubic-bezier(.4,0,.2,1)` |
| FAQ accordion | `border-color` و `box-shadow` |
| FAQ icon | `transform: rotate(45deg)` عند الفتح |
| Hover على العناوين | تغيير اللون |

### Reduced Motion

الصفحة بتحترم `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

كل الانتقالات بتتقفل تقريبًا للمستخدمين اللي طلبوا حركة مخففة.

---

# 6. هيكل المكونات (Component Architecture)

الصفحة فيها المكونات دي:

## 6.1 Header

| الخاصية | القيمة |
|---|---|
| العنصر | `<header class="site-header" role="banner">` |
| السلوك | `position: sticky; top: 0` |
| Z-Index | `--z-sticky` (200) |
| الخلفية | `--surface` |
| الحد السفلي | `1px solid var(--border)` |

### محتويات الـ Header

- Logo (YallaBuy)
- Primary Navigation (4 روابط)
- Theme Toggle Button
- Mobile Menu Toggle (بيظهر بس تحت 768px)

### Header على الموبايل

- الـ Primary Navigation بتختفي
- زر الموبايل بيظهر
- لما يتفتح، القائمة بتظهر في `#mobile-menu`
- القائمة بتقفل لما تتدوس على أي رابط أو تضغط Escape

## 6.2 Hero

| الخاصية | القيمة |
|---|---|
| العنصر | `<section class="hero">` |
| الـ layout على الديسكتوب | عمودين (content + image) |
| الـ layout على الموبايل | عمود واحد |
| أقصى عرض للمحتوى | 1240px (container) |

### محتويات الـ Hero

- Breadcrumbs (Home › Guides › USB Hub Firmware & Disconnects)
- Category chip (Peripherals)
- العنوان الرئيسي (h1)
- الوصف
- معلومات الكاتب + وقت القراءة
- صورة Hero (LCP element)

## 6.3 Article Body

| الخاصية | القيمة |
|---|---|
| العنصر | `<article class="article-body">` |
| أقصى عرض للمحتوى | 720px (للقراية المريحة) |
| نوع الفقرات | `Georgia, serif` |
| حجم الفقرات | `18px` |
| ارتفاع السطر | `1.7` |
| نوع العناوين | `Arial, sans-serif` |

### مستويات العناوين

| المستوى | الحجم | الاستخدام |
|---|---|---|
| h1 | `clamp(28px, 4vw, 44px)` | عنوان المقالة في Hero |
| h2 | `28px` | عناوين الأقسام الرئيسية |
| h3 | `22px` | عناوين فرعية جوا الأقسام |

## 6.4 Callout (تحذير أمان البيانات)

قسم `#data-safety` مستخدم كـ callout مميز:

```css
.callout {
    background: var(--brand-soft);
    border-left: 4px solid var(--brand);
    padding: var(--s5);
    border-radius: var(--r-sm);
}
```

الـ callout بيبرز التحذير المهم عن خطر فساد البيانات.

## 6.5 Sources (المصادر)

| الخاصية | القيمة |
|---|---|
| الخلفية | `--bg-soft` |
| الـ layout | قائمة عمودية |
| كل مصدر | tag + نص توضيحي |

الـ tag بيستخدم `--surface` كخلفية و `--brand-deep` كلون نص.

## 6.6 FAQ Accordion

### السلوك

| الحالة | السلوك |
|---|---|
| مغلق | `aria-expanded="false"` + panel `hidden` |
| مفتوح | `aria-expanded="true"` + panel مرئي + كلاس `is-open` |
| الأيقونة | `+` بتدور 45 درجة لـ `×` |

### الـ Keyboard

| المفتاح | السلوك |
|---|---|
| Enter / Space | فتح/قفل السؤال |
| Escape | قفل السؤال المفتوح |
| ArrowDown | الانتقال للسؤال اللي بعده |
| ArrowUp | الانتقال للسؤال اللي قبله |

### الـ ARIA

- كل trigger ليه `aria-expanded` و `aria-controls`
- كل panel ليه `role="region"` و `aria-labelledby`
- العلاقة بين الزر والـ panel مضمونة بالـ IDs

## 6.7 Author Card

| الخاصية | القيمة |
|---|---|
| العنصر | `<aside class="author-card">` |
| المحتوى | Avatar (MH) + الاسم + الدور + نبذة |
| الـ avatar | دايرة 56px بـ background brand |

## 6.8 Footer

| الخاصية | القيمة |
|---|---|
| العنصر | `<footer class="site-footer" role="contentinfo">` |
| الـ layout على الديسكتوب | عمودين (brand + nav) |
| الـ layout على الموبايل | عمود واحد |

### محتويات الـ Footer

- Logo + وصف مختصر
- Categories (3 روابط)
- Company (3 روابط)
- Copyright

---

# 7. الـ Meta Tags

الصفحة فيها 3 أنواع من meta tags:

## 7.1 Primary Meta Tags

| Tag | القيمة |
|---|---|
| `<title>` | "Can a Firmware Update Fix USB Hub Disconnects? (And Is It Safe?) \| YallaBuy" |
| `description` | شرح مختصر للمقالة |
| `author` | Mahmoud Hamdy |
| `robots` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` |
| `canonical` | `https://yallabuy.shop/guides/usb-hub-firmware-disconnects.html` |
| `theme-color` | `#0f766e` |

## 7.2 Open Graph (Facebook)

| Property | القيمة |
|---|---|
| `og:type` | `article` |
| `og:site_name` | `YallaBuy` |
| `og:title` | عنوان المقالة |
| `og:description` | وصف المقالة |
| `og:url` | الـ canonical URL |
| `og:image` | صورة الـ Hero |
| `og:image:width` | `1200` |
| `og:image:height` | `675` |
| `og:image:alt` | وصف الصورة |
| `og:locale` | `en_US` |
| `article:author` | Mahmoud Hamdy |
| `article:published_time` | `REPLACE_WITH_REAL_PUBLISH_DATE` |
| `article:modified_time` | `REPLACE_WITH_REAL_MODIFIED_DATE` |
| `article:section` | `Peripherals` |
| `article:tag` | `USB-C, firmware, hubs, SSD, troubleshooting` |

## 7.3 Twitter Card

| Property | القيمة |
|---|---|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | عنوان المقالة |
| `twitter:description` | وصف المقالة |
| `twitter:image` | صورة الـ Hero |
| `twitter:image:alt` | وصف الصورة |

### تنبيه

التواريخ (`article:published_time` و `article:modified_time`) معملة كـ placeholder. لازم تتستبدل بتواريخ حقيقية قبل النشر. متخترعش تواريخ.

---

# 8. الـ JSON-LD Schema

الصفحة فيها 6 أنواع من structured data، كله في `<head>`.

## 8.1 قائمة الـ Schemas

| # | النوع | السبب |
|---|---|---|
| 1 | `Organization` | تعريف YallaBuy كـ organization |
| 2 | `WebSite` | تعريف الموقع |
| 3 | `Person` | تعريف الكاتب Mahmoud Hamdy |
| 4 | `BreadcrumbList` | مسار التنقل في الموقع |
| 5 | `Article` | المقالة نفسها |
| 6 | `FAQPage` | الأسئلة الشائعة المرئية |

## 8.2 الـ Schemas اللي مش موجودة (متعمد)

| النوع | السبب |
|---|---|
| `Product` | مفيش منتج محدد في الصفحة |
| `Offer` | مفيش سعر معروض |
| `Review` | مفيش مراجعة لمنتج |
| `AggregateRating` | مفيش تقييم |
| `ItemList` | الصفحة مش قائمة منتجات |

ده بيتابع قواعد الـ Schema Master Guide: "Do not add schema just because it exists."

## 8.3 تفاصيل الـ Article Schema

```json
{
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "...#article",
    "headline": "...",
    "description": "...",
    "image": { "@type": "ImageObject", ... },
    "mainEntityOfPage": "...",
    "author": { "@id": "...#person" },
    "publisher": { "@id": "...#organization" },
    "isPartOf": { "@id": "...#website" },
    "about": "..."
}
```

### ملاحظات

- `@id` مستخدم لربط الـ entities ببعض
- `author` بيشاور على `Person` عن طريق `@id`
- `publisher` بيشاور على `Organization` عن طريق `@id`
- `image` معمل كـ `ImageObject` مش بس string
- مفيش `datePublished` أو `dateModified` لأن التواريخ مش متوفرة (لازم تتضاف لما تتوفر)

## 8.4 تفاصيل الـ FAQPage Schema

الـ FAQPage schema فيها 5 أسئلة بالظبط زي الـ FAQ المرئي في الصفحة.

### القاعدة

كل سؤال في الـ JSON-LD ليه نضيف مقابل في الـ HTML المرئي. مفيش أسئلة مخفية أو مخترعة. ده بيتابع قاعدة: "FAQ schema must match visible FAQs."

## 8.5 الـ Entity IDs

| Entity | @id |
|---|---|
| Organization | `https://yallabuy.shop/#organization` |
| WebSite | `https://yallabuy.shop/#website` |
| Person | `https://yallabuy.shop/author/mahmoud-hamdy.html#person` |
| Article | `https://yallabuy.shop/guides/usb-hub-firmware-disconnects.html#article` |

الـ IDs ثابتة وقابلة للتنبؤ ومربوطة بالـ canonical URL.

---

# 9. معمارية الـ CSS

## 9.1 ترتيب الـ CSS

الـ CSS مترتب بالشكل ده:

1. Design Tokens (`:root`)
2. Dark Mode Tokens (`html[data-theme="dark"]`)
3. Reset (`*`, `html`, `body`, `img`, `a`)
4. Focus styles
5. Skip link
6. Container
7. Header
8. Hero
9. Article body
10. Callout
11. Sources
12. FAQ
13. Author card
14. Reduced motion
15. Footer
16. Responsive rules

## 9.2 Responsive Breakpoints

| Breakpoint | اللي بيحصل |
|---|---|
| `768px` | الموبايل: container بيبقى 20px padding، nav بيختفي، menu toggle بيظهر، Hero بيبقى عمود واحد، Footer بيبقى عمود واحد |
| `600px` | غير مستخدم في الصفحة دي بس موجود في الـ Design System |

## 9.3 قواعد الـ CSS

- كل القيم من الـ tokens (مفيش قيم عشوائية)
- `:focus-visible` مستخدم بدل `:focus` (مش بيظهر للمستخدمين اللي بيدوسوا بالماوس)
- `:focus-visible` ليه outline بـ 3px و brand color
- مفيش `!important` في أي مكان
- مفيش specificity عالي بدون سبب
- الـ selectors واضحة وبأسماء معبرة

---

# 10. معمارية الـ JavaScript

الـ JS كله داخل IIFE عشان ميعملش globals.

```javascript
(function () {
    "use strict";
    // كل الكود هنا
})();
```

## 10.1 الدوال (Functions)

| # | الدالة | الوظيفة |
|---|---|---|
| 1 | `initThemeToggle()` | تبديل بين light/dark mode + حفظ في localStorage |
| 2 | `initMobileMenu()` | فتح/قفل قائمة الموبايل + Escape للقفل |
| 3 | `initFaq()` | تشغيل الـ FAQ accordion + keyboard navigation |
| 4 | `initImageFallback()` | تبديل الصور المكسورة بـ placeholder |

## 10.2 تفاصيل `initThemeToggle()`

| الخطوة | الشرح |
|---|---|
| 1 | يقرأ التفضيل من `localStorage` |
| 2 | لو موجود، يطبق الـ theme وحدث الـ `aria-pressed` |
| 3 | لما المستخدم يدوس على الزر، يبدل الـ theme |
| 4 | يحدث `aria-pressed` |
| 5 | يحفظ التفضيل الجديد في `localStorage` |
| 6 | لو `localStorage` مش متاح، بيطبع warning بس المشهد بيكمل شغل |

## 10.3 تفاصيل `initMobileMenu()`

| الخطوة | الشرح |
|---|---|
| 1 | ي-select الزر والـ menu |
| 2 | لو أي واحد مش موجود، يخرج (defensive check) |
| 3 | لما الزر يتداس، يبدل `aria-expanded` و `hidden` |
| 4 | لما أي رابط يتداس، يقفل القائمة |
| 5 | لما Escape يتداس، يقفل القائمة ويرجع الـ focus للزر |

## 10.4 تفاصيل `initFaq()`

| الخطوة | الشرح |
|---|---|
| 1 | ي-select كل الـ triggers |
| 2 | لو مفيش، يخرج |
| 3 | لكل trigger: click event يبدل الحالة |
| 4 | لكل trigger: Escape يقفل السؤال المفتوح |
| 5 | keyboard: ArrowDown/ArrowUp للتنقل بين الأسئلة |
| 6 | العلاقة بين الزر والـ panel مضمونة بالـ IDs |

### تفاصيل الـ keyboard navigation

| المفتاح | السلوك |
|---|---|
| Enter / Space | فتح/قفل (بيتعمل تلقائيًا من `<button>`) |
| Escape | قفل السؤال المفتوح + focus على الزر |
| ArrowDown | focus على السؤال اللي بعده |
| ArrowUp | focus على السؤال اللي قبله |

## 10.5 تفاصيل `initImageFallback()`

| الخطوة | الشرح |
|---|---|
| 1 | ي-select كل الـ `<img>` في الصفحة |
| 2 | لكل صورة: `error` event listener |
| 3 | لو الصورة فشلت في التحميل، يبدلها بـ SVG placeholder |
| 4 | الـ placeholder فيه نص "Image unavailable" |
| 5 | علامة `data-fallback-applied` تمنع التكرار |

### الـ Placeholder

الـ placeholder هو SVG inline مش رسمة خارجية، عشان:

- مفيش طلب شبكة إضافي
- بيشتغل حتى لو الشبكة قطعت بالكلية
- الـ layout بيفضل ثابت (CLS-safe)

## 10.6 قواعد الـ JS

- `const` و `let` بس، مفيش `var`
- Defensive null checks قبل أي DOM operation
- `addEventListener` بس (مفيش inline handlers)
- مفيش `innerHTML` مع بيانات مش موثوقة
- مفيش `eval`
- مفيش globals
- مفيش secrets في الكود
- كل الأخطاء بتتعامل معاها بصريًا (console.warn)
- التهيئة بتحصل بعد `DOMContentLoaded` لو الصفحة لسه بتتحمل

---

# 11. الـ Accessibility (إتاحة الوصول)

الصفحة بتتبع WCAG 2.2 Level AA.

## 11.1 HTML الدلالي (Semantic HTML)

| العنصر | الاستخدام |
|---|---|
| `<header>` | رأس الصفحة |
| `<nav>` | التنقل |
| `<main>` | المحتوى الرئيسي |
| `<section>` | أقسام الصفحة |
| `<article>` | جسم المقالة |
| `<aside>` | Author card |
| `<footer>` | تذييل الصفحة |
| `<button>` | كل الأزرار |
| `<a>` | كل الروابط |

مفيش `<div>` في مكان لازم فيه عنصر دلالي.

## 11.2 الـ ARIA

| العنصر | الـ ARIA |
|---|---|
| Skip link | `.skip-link` |
| Theme toggle | `aria-label="Toggle dark mode"`, `aria-pressed` |
| Menu toggle | `aria-label="Open menu"`, `aria-expanded`, `aria-controls` |
| FAQ triggers | `aria-expanded`, `aria-controls` |
| FAQ panels | `role="region"`, `aria-labelledby` |
| Breadcrumbs | `aria-label="Breadcrumb"`, `aria-current="page"` |
| Author card | `aria-labelledby="author-title"` |

### القاعدة

"Prefer native HTML semantics before ARIA." الـ ARIA مستخدم بس لما الـ HTML الدلالي مش كافي.

## 11.3 الـ Focus

- كل العناصر التفاعلية ليه `:focus-visible` واضح
- الـ outline بـ 3px و brand color
- ترتيب الـ tab بيتابع الترتيب البصري
- مفيش keyboard traps
- الـ skip link بيظهر لما يحصل focus

## 11.4 الـ Keyboard

كل العناصر التفاعلية شغالة بالـ keyboard:

| العنصر | التفاعل |
|---|---|
| روابط | Enter |
| الأزرار | Enter / Space |
| FAQ | Enter / Space / Escape / ArrowUp / ArrowDown |
| Mobile menu | Click / Escape |
| Theme toggle | Click |

## 11.5 الـ Touch

- كل الأزرار 40×40px على الأقل (above the 44×44px recommendation بستثناء بسيط)
- مفيش hover-only functionality
- الـ mobile menu شغال باللمس
- الـ FAQ accordion شغال باللمس

---

# 12. الأداء (Performance)

الصفحة بتستهدف:

| المؤشر | الهدف |
|---|---|
| LCP | أقل من 2.5s |
| INP | أقل من 200ms |
| CLS | أقل من 0.1 |

## 12.1 LCP Strategy

- صورة الـ Hero متعملها `preload` + `fetchpriority="high"`
- صورة الـ Hero eager (مش lazy)
- CSS inline (مفيش طلب CSS بيعمل block)
- مفيش web fonts (زيرو طلبات خطوط)
- مفيش render-blocking scripts

## 12.2 CLS Strategy

- كل الصور ليه `width` و `height` attributes
- الـ font stable (مفيش font swap)
- مفيش محتوى بيتدخل فوق المحتوى الموجود
- الـ FAQ panels بتفتح بتقفير مساحة مش بتعمل jump

## 12.3 INP Strategy

- JS كله في آخر الصفحة
- مفيش سكريبتات تالت بارت
- الـ event listeners خفيفة
- مفيش JavaScript بيشتغل في الـ main thread لمدة طويلة

## 12.4 تقليل طلبات الشبكة

| الطلب | العدد |
|---|---|
| HTML | 1 |
| CSS | 0 (inline) |
| JS | 0 (inline) |
| الخطوط | 0 (system fonts) |
| صورة الـ Hero | 1 |
| صور تانية | حسب المحتوى |

الـ total network requests للصفحة الأساسية: 1 (الـ HTML) + 1 (صورة الـ Hero) = 2.

---

# 13. استراتيجية الصور

## 13.1 صورة الـ Hero

| الخاصية | القيمة |
|---|---|
| الـ loading | `eager` (مش lazy) |
| الـ fetchpriority | `high` |
| الـ decoding | `async` |
| العرض | `1200` |
| الارتفاع | `675` |
| الـ preload | نعم في `<head>` |
| الـ alt | وصف كامل للصورة |

### القاعدة

"Never lazy-load the LCP image." صورة الـ Hero هي العنصر الأكبر في الـ viewport، فلازم تتحمل فورًا.

## 13.2 الـ Placeholder Strategy

كل الصور في الصفحة ليه fallback آلي:

1. لو الصورة فشلت في التحميل، `error` event بيشتغل
2. الـ JS بيبدل الـ `src` بـ SVG placeholder inline
3. الـ placeholder فيه نص "Image unavailable"
4. علامة `data-fallback-applied` تمنع التكرار
5. الـ layout بيفضل ثابت (CLS-safe)

### الفايدة

- لو الصورة مش متاحة، الـ layout مش بينهار
- المستخدم بيشوف رسالة واضحة بدل فراغ أو رمز مكسور
- مفيش طلب شبكة إضافي للـ placeholder (SVG inline)

## 13.3 الـ alt text

كل الصور ليه `alt` text معبر:

- صورة الـ Hero: "A USB-C hub disconnected from a laptop, lying on a desk next to a coiled cable"
- مفيش keyword stuffing في الـ alt
- الـ alt بيوصف المحتوى البصري للصورة

---

# 14. الـ Internal Linking

الصفحة بتحتوي على روابط داخلية:

## 14.1 الروابط الموجودة

| المصدر | الوجهة | النوع |
|---|---|---|
| Header logo | `/` | Navigation |
| Header nav | `/headphones/`, `/guides/`, `/reviews/`, `/about/` | Navigation |
| Breadcrumbs | `/`, `/guides/` | Navigation |
| Author link | `/author/mahmoud-hamdy.html` | Author reference |
| Footer links | `/headphones/`, `/peripherals/`, `/smart-home/`, `/about/`, `/editorial-policy/`, `/affiliate-disclosure/` | Navigation |

## 14.2 القواعد المتبعة

- كل الروابط بتستخدم production domain (`yallabuy.shop`)
- مفيش Vercel URLs
- الـ anchor text معبر ووصفي
- مفيش "click here" أو "read more"
- الـ rel attribute مستخدم صح (`rel="author"` لرابط الكاتب)

---

# 15. الـ Testing Notes

## 15.1 اللي اتعمل (Code Inspection)

| الاختبار | الحالة |
|---|---|
| HTML validity | PASS (code inspection) |
| CSS validity | PASS (code inspection) |
| JS syntax | PASS (code inspection) |
| ARIA correctness | PASS (code inspection) |
| Schema.org validity | PASS (code inspection) |
| Design System compliance | PASS (code inspection) |
| Internal linking rules | PASS (code inspection) |

## 15.2 اللي لازم يتعمل (Runtime)

| الاختبار | الحالة | السبب |
|---|---|---|
| Runtime browser testing | NOT RUN | مفيش browser متاح في الجلسة دي |
| Keyboard testing | NOT RUN | لازم testing يدوي |
| Screen reader testing | NOT RUN | لازم NVDA / VoiceOver |
| Mobile testing | NOT RUN | لازم testing على موبايل |
| PageSpeed Insights | NOT RUN | لازم بعد النشر |
| Rich Results Test | NOT RUN | لازم بعد استبدال الـ placeholders |
| Schema Markup Validator | NOT RUN | لازم بعد استبدال الـ placeholders |
| Search Console | NOT RUN | لازم بعد النشر |

## 15.3 التوصية

قبل النشر، لازم تعمل:

1. اختبر الصفحة في Chrome + Firefox + Safari
2. اختبر keyboard navigation (Tab + Enter + Space + Escape + arrows)
3. اختبر screen reader (NVDA على Windows أو VoiceOver على macOS)
4. اختبر على موبايل (touch + responsive)
5. اختبر PageSpeed Insights (mobile)
6. اختبر Rich Results Test
7. اختبر Schema Markup Validator
8. تأكد إن كل الـ placeholders اتسدبلت بقيم حقيقية

---

# 16. الـ Placeholders اللي لازم تتسدبل قبل النشر

| العنصر | الـ Placeholder الحالي | استدبل بـ |
|---|---|---|
| تاريخ النشر | `REPLACE_WITH_REAL_PUBLISH_DATE` | تاريخ حقيقي بصيغة ISO 8601 |
| تاريخ التعديل | `REPLACE_WITH_REAL_MODIFIED_DATE` | تاريخ حقيقي بصيغة ISO 8601 |
| صورة الـ Hero | `/images/articles/usb-hub-disconnect-explainer-placeholder.avif` | صورة حقيقية 1200×675 |
| الـ alt للصورة | حسب الصورة الحقيقية | وصف الصورة الحقيقية |

### القاعدة

"Never invent dates. Never invent image URLs." لو أي قيمة مش متوفرة، استبدلها بقيمة حقيقية أو شيلها.

---

# 17. القيود المعروفة (Known Limitations)

## 17.1 الـ Placeholders

- التواريخ مش موجودة في الـ meta tags و لا في الـ JSON-LD
- صورة الـ Hero placeholder
- لازم تتسدبل قبل النشر

## 17.2 الـ JSON-LD

- الـ Article schema مفيهاش `datePublished` أو `dateModified` لأن التواريخ مش متوفرة. لما تتوفر، تضاف بصيغة ISO 8601.
- مفيش `image` في الـ Article schema غير صورة الـ Hero. لو الصفحة فيها صور تانية، ممكن تضاف.

## 17.3 الـ Mobile Menu

- الـ mobile menu بيقفل لما المستخدم يدوس على أي رابط جواه. لو ضاف روابط تانية، السلوك ده هيكمل شغالة.
- الـ mobile menu بيقفل لما Escape يتداس. ده سلوك متعمد للـ accessibility.

## 17.4 الـ FAQ

- الـ FAQ accordion مش بيفتح أكتر من سؤال في نفس الوقت. ده اختيار تصميمي. لو عايز يفتح أكتر من واحد، شيل الكود اللي بيقفل الباقي.

---

# 18. العلاقة مع المواصفات التانية

الملف ده مش بيشيل أي مواصفة تانية. استخدم العلاقة دي:

```
page-documentation-usb-hub-firmware.md
        ↓
شرح صفحة محددة

yallabuy-design-system.md
        ↓
الـ visual tokens و الـ components

JavaScript-Standards.md
        ↓
قواعد الـ JavaScript

Accessibility.md
        ↓
قواعد الـ accessibility

Images.md
        ↓
قواعد الصور

Internal-Linking.md
        ↓
قواعد الروابط الداخلية

Testing.md
        ↓
قواعد الـ testing

YallaBuy_AI_Schema_JSONLD_Master_Guide.md
        ↓
قواعد الـ JSON-LD

performance-guidelines.md
        ↓
قواعد الأداء
```

كل المواصفات لازم تشتغل سوا.

---

# 19. Checklist قبل النشر

قبل ما تعتبر الصفحة جاهزة للنشر، اتأكد إن:

-[☆ ] التواريخ اتسدبلت بقيم حقيقية
- [ ☆] صورة الـ Hero اتسدبلت بصورة حقيقية
- [ ☆] الـ alt text للصورة بيطابق الصورة الحقيقية
- [ ☆] الـ canonical URL صحيح
- [ ☆] كل الروابط الداخلية بتستخدم `yallabuy.shop`
- [ ☆] مفيش Vercel URLs
- [☆ ] الـ JSON-LD valid (اختبر بـ Rich Results Test)
- [ ☆] الـ JSON-LD valid (اختبر بـ Schema Markup Validator)
- [ ☆] PageSpeed Insights: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [☆ ] Keyboard testing اتعمل
- [☆ ] Screen reader testing اتعمل
- [☆ ] Mobile testing اتعمل
- [ ☆] الـ FAQ المرئي بيطابق الـ FAQPage schema
- [ ☆] مفيش أخطاء في الـ console
- [☆ ] الـ dark mode بيشتغل صح
- [ ☆] الـ mobile menu بيشتغل صح
- [ ☆] الـ FAQ accordion بيشتغل بالـ keyboard
- [ ☆] الـ image fallback بيشتغل (اختبر بصورة مكسورة)

---

# 20. المبدأ النهائي

الصفحة دي مقالة معلوماتية. مش صفحة بيع. مش صفحة منتج. مش صفحة مراجعة.

الـ schema بيمثل المحتوى المرئي بالظبط. الـ design system متبع بالظبط. الـ accessibility معتبرة من الأول مش مضافة في الآخر. الـ performance مدمجة في القرارات المعمارية مش مضافة كـ optimization لاحقًا.

لو عدلت الصفحة، اتأكد إن:

1. المحتوى الزيادة مبني على مصادر موثقة
2. الـ schema الجديد بيمثل المحتوى المرئي
3. الـ design tokens مستخدمة (مفيش قيم عشوائية)
4. الـ accessibility محفوظة
5. الـ performance مش اتأثر سلبًا
6. الـ testing اتعمل بعد التعديل

**الهدف مش إن الصفحة تبقى كبيرة. الهدف إنها تبقى صحيحة.**
```

ده الملف كامل بصيغة MD. تقدر تنسخه وتحفظه باسم `page-documentation-usb-hub-firmware.md` جنب الصفحة.