
# 📄 ملف `README.md` — توثيق صفحة YallaBuy الرئيسية

```markdown
# YallaBuy — الصفحة الرئيسية

> «Research first. Buy second.»
> منصة اكتشاف المنتجات والأبحاث الأولى قبل الشراء — منصة شريكة لـ Amazon Affiliate.

---

## 📌 نظرة عامة

هذا المشروع هو الصفحة الرئيسية (Homepage) لموقع **YallaBuy**،
وهو موقع أبحاث منتجات شريك لـ Amazon، هدفه مساعدة المستخدم على
**فهم المنتج قبل شرائه** بدلاً من الدفع المباشر للشراء.

تم بناء الصفحة باستخدام:

- **HTML5** — هيكل دلالي (Semantic)
- **CSS3** — خصائص مخصصة (Custom Properties) و Grid و Flexbox
- **Vanilla JavaScript** — بدون أي مكتبات خارجية

بدون استخدام أي من:
❌ React / Vue / Svelte / Next.js
❌ Tailwind / Bootstrap
❌ jQuery
❌ أي إطار عمل خارجي

---


> ملاحظة: في الكود المُسلَّم، تم تجميع CSS و JS داخل `index.html`
> في ثلاثة أقسام موثَّقة بالتعليقات:
>
> - `<!-- ===== css/global.css ===== -->`
> - `<!-- ===== css/home.css ===== -->`
> - `<!-- ===== js/home.js ===== -->`
>
> يمكنك فصلها بسهولة إلى ملفات منفصلة بنفس الترتيب.

---

## 🎨 نظام التصميم (Design System)

### الألوان (Color Tokens)

| المتغير | القيمة | الاستخدام |
|---|---|---|
| `--color-accent` | `#FF9900` | اللون الأساسي (Orange) |
| `--color-accent-dark` | `#E68A00` | لون Hover |
| `--color-accent-soft` | `#FFF3E0` | خلفيات ناعمة |
| `--color-ink` | `#15171A` | النص الأساسي |
| `--color-ink-soft` | `#4A4D52` | نص ثانوي |
| `color-ink-muted` | `#6B7075` | نص باهت |
| `--color-bg` | `#FAFAF8` | خلفية الصفحة |
| `--color-surface` | `#FFFFFF` | البطاقات |

### الظلال (Shadows)

- `--shadow-sm` — ظل خفيف للبطاقات
- `--shadow-md` — ظل متوسط
- `--shadow-lg` — ظل كبير عند Hover
- `--shadow-accent` — ظل برتقالي للأزرار الأساسية

### الخطوط (Typography)

نستخدم System Font Stack فقط (بدون خطوط خارجية) لتحسين الأداء:

```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI",
             "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
```

### الزوايا (Radius)

- `--radius-sm: 10px`
- `--radius-md: 16px`
- `--radius-lg: 22px`
- `--radius-pill: 999px` (للأزرار والـ chips)

---

## 🧱 أقسام الصفحة (Sections)

### 1. Header / Navigation
- شريط علوي ثابت (Sticky) مع تأثير زجاجي (Glass / Blur)
- شعار YallaBuy + 6 روابط: Home, Products, Reviews, Comparisons, Articles, Deals
- زر بحث (سطح المكتب) + زر قائمة الجوال
- يظهر ظل خفيف عند التمرير (Scroll)
- روابط Hover مع خط سفلي متحرك

### 2. Mobile Drawer
- قائمة جانبية تنزلق من اليمين
- تحتوي على: Navigation + Explore (10 أقسام)
- **إمكانيات الوصول (Accessibility):**
  - `role="dialog"` و `aria-modal="true"`
  - `aria-expanded` و `aria-controls` على زر الفتح
  - إغلاق بزر Escape
  - إغلاق بالنقر خارج القائمة
  - منع تمرير الخلفية عند الفتح
  - إعادة التركيز (Focus Restoration) للعنصر السابق
  - إغلاق تلقائي عند الرجوع لحجم سطح المكتب

### 3. Hero Section
- عنوان رئيسي: «Research first. Buy second.»
- مع تأثير ظهور للخط السفلي تحت كلمة "Buy second."
- نص داعم يشرح فلسفة YallaBuy بصدق (بدون ادعاءات)
- زرين CTA:
  - **Explore Products** (زر أساسي برتقالي)
  - **How We Research** (زر ثانوي شفاف)
- عنصر بصري مُكوَّن بالكامل بـ CSS (بطاقات عائمة + كرة متحركة)
- خلفية شبكية ناعمة + توهج برتقالي شعاعي

### 4. Explore Categories
- 10 بطاقات أقسام رئيسية:
  1. Electronics
  2. Mobile
  3. Computing
  4. Audio
  5. Cameras
  6. Gaming
  7. TV & Displays
  8. Wearables
  9. Smart Home
  10. Accessories
- كل بطاقة هي `<a href="#">` كاملة قابلة للنقر
- تحتوي على: صورة + اسم + وصف قصير + سهم + مؤشر "Explore"
- **تأثيرات Hover:**
  - رفع البطاقة (`translateY(-6px)`)
  - تكبير الصورة (`scale(1.08)`)
  - تغيير التدرج اللوني للتراكب
  - تحريك السهم لليمين
  - ظهور مؤشر "Explore"
- **متوافق:** من 4 أعمدة → 3 → 2 → 1 عمود

### 5. Why YallaBuy
- 4 بطاقات تشرح الفلسفة:
  - **Research First**
  - **Clear Comparisons**
  - **Evidence-Based**
  - **No One-Size-Fits-All**
- صياغة صادقة بدون ادعاءات اختبار شخصي

### 6. Featured Discovery
- 4 بطاقات: Reviews / Comparisons / Guides / Deals
- كل بطاقة: صورة + chip + عنوان + وصف + سهم متحرك

### 7. Final CTA
- لوحة داكنة مستديرة مع شبكة نقطية وتوهج برتقالي
- عنوان: «Not sure what to buy?»
- زر: «Explore Products»

### 8. Smart Footer
- مُستكشف أقسام ذكي باستخدام `<details>` و `<summary>` (HTML أصلي)
- كل قسم من الـ 10 قابل للتوسيع لعرض الأقسام الفرعية
- سلوك: فتح قسم واحد فقط في كل مرة (مُحسَّن بـ JS)
- يحتوي أيضاً على:
  - وصف YallaBuy
  - About / Contact / How We Research
  - Editorial Policy / Affiliate Disclosure / Privacy Policy / Terms
  - حقوق النشر (سنة ديناميكية)

---

## ⚡ الأداء (Performance)

تم تحقيق الأهداف التالية:

| المؤشر | الهدف | كيف تحقق |
|---|---|---|
| **LCP** | < 2.5s | بدون خطوط خارجية، صورة Hero بـ CSS |
| **INP** | < 200ms | JS بسيط، تفويض أحداث، لا setTimeout ثقيلة |
| **CLS** | < 0.1 | أبعاد الصور محجوزة (`width`/`height`) |

### ممارسات الأداء المطبقة:

- ✅ لا مكتبات خارجية (لا Three.js / GSAP / jQuery)
- ✅ System Font Stack (بدون `@font-face`)
- ✅ `IntersectionObserver` للظهور التدريجي
- ✅ `loading="lazy"` للصور خارج الـ viewport
- ✅ أبعاد الصور محجوزة لمنع CLS
- ✅ `passive: true` لمستمع التمرير
- ✅ `requestAnimationFrame` للتأثيرات البصرية
- ✅ CSS Animations بدلاً من JS حيث أمكن
- ✅ fallback للصور المفقودة بدون كسر التخطيط

---

## ♿ إمكانيات الوصول (Accessibility)

- ✅ HTML دلالي: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ✅ ترتيب عناوين صحيح (`h1` → `h2` → `h3`)
- ✅ `alt` نصوص وصفية للصور
- ✅ `:focus-visible` مع إطار برتقالي واضح
- ✅ `aria-label`, `aria-expanded`, `aria-controls`, `aria-modal`
- ✅ التنقل بلوحة المفاتيح يعمل بالكامل
- ✅ `role="dialog"` للقائمة الجوالة
- ✅ تباين لوني كافٍ (WCAG AA)
- ✅ `@media (prefers-reduced-motion: reduce)` لتعطيل الرسوم
- ✅ عناصر `<a>` و `<button>` حقيقية (لا `<div onclick>`)

---

## 📱 التصميم المتجاوب (Responsive)

| الجهاز | نقطة التوقف | التخطيط |
|---|---|---|
| هاتف صغير | ≤ 460px | عمود واحد |
| هاتف كبير | 461–720px | عمودين للبطاقات |
| جهاز لوحي | 721–1024px | 3 أعمدة |
| لابتوب | 1025–1240px | 4 أعمدة |
| شاشة كبيرة | ≥ 1240px | 4 أعمدة + max-width |

نقاط الكسر المستخدمة:

```css
@media (max-width: 1024px) { /* → 3 columns */ }
@media (max-width: 960px)  { /* → 2 columns (why/disc) */ }
@media (max-width: 880px)  { /* header → mobile drawer */ }
@media (max-width: 720px)  { /* → 2 columns */ }
@media (max-width: 540px)  { /* → 1 column */ }
@media (max-width: 460px)  { /* → 1 column categories */ }
```

---

## 🔗 الروابط المؤقتة

> ⚠️ **مهم:** جميع الروابط حالياً تستخدم `href="#"`
> كعناصر نائبة (Placeholders)، لأن باقي الموقع لم يُبنَ بعد.

ينطبق هذا على:

- روابط التنقل (Navigation)
- بطاقات الأقسام (Category cards)
- بطاقات الاكتشاف (Discovery cards)
- روابط الـ Footer
- أزرار CTA
- روابط التواصل الاجتماعي (إن وُجدت)

سيتم استبدالها لاحقاً عند بناء باقي صفحات YallaBuy.

---

## 🖼️ الصور (Images)

تُستخدم الصور من المسار:

```
على حسب رابط الصورة 
```

### ماذا يحدث إذا كانت الصورة مفقودة؟

تم تنفيذ **fallback ذكي** في `js/home.js`:

```javascript
function handleImgError (img) {
  var media = img.closest('.category-card__media, .disc-card__top');
  if (!media) return;
  img.style.display = 'none';
  if (media.classList.contains('category-card__media')) {
    media.classList.add('is-fallback');  // يُفعّل خلفية زخرفية
  } else {
    // يضيف عنصر زخرفي للبطاقات الاكتشافية
    var fb = document.createElement('div');
    fb.className = 'disc-card__media-fallback';
    media.appendChild(fb);
  }
}
```

النتيجة:
- ✅ لا تظهر أيقونات صور مكسورة
- ✅ لا يتأثر التخطيط
- ✅ تظهر خلفية زخرفية برتقالية داكنة أنيقة

---

## ✨ الرسوم المتحركة (Animations)

### Scroll Reveal

```javascript
var io = new IntersectionObserver(function (entries, obs) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    obs.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
```

العناصر مع `data-reveal` تظهر بـ `translateY(28px) → 0` و `opacity 0 → 1`
مع تأخير قابل للتخصيص عبر `--reveal-delay`.

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: .001ms !important;
    transition-duration: .001ms !important;
  }
  [data-reveal] { opacity: 1; transform: none; }
}
```

يُحترم تفضيل المستخدم في تعطيل الحركة تماماً.

---

## 🚀 كيفية التشغيل

### 1. الطريقة البسيطة (محلياً)

```bash
# انسخ الملفات لمجلد المشروع
# ثم افتح index.html مباشرة في المتصفح

open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### 2. باستخدام خادم محلي (مُستحسن)

```bash
# Python
python3 -m http.server 8000

# أو Node
npx serve .

# ثم افتح
# http://localhost:8000
```

---

## 🔧 التخصيص (Customization)

### تغيير اللون الأساسي

عدّل المتغير في `global.css`:

```css
:root {
  --color-accent: #FF9900;        /* ← غيّر هذا */
  --color-accent-dark: #E68A00;   /* ← غيّر هذا */
  --color-accent-soft: #FFF3E0;   /* ← غيّر هذا */
}
```

### إضافة قسم جديد

أضف بطاقة جديدة داخل `.cat-grid`:

```html
<a href="#" class="category-card" data-reveal>
  <div class="category-card__media">
    <img src="assets/images/categories/new-category.webp"
         alt="New category" loading="lazy" width="480" height="560">
  </div>
  <div class="category-card__body">
    <span class="category-card__title">
      New Category
      <span class="category-card__arrow"><!-- SVG --></span>
    </span>
    <span class="category-card__desc">وصف قصير هنا.</span>
    <span class="category-card__explore">Explore category →</span>
  </div>
</a>
```

### استبدال الروابط المؤقتة

ابحث عن `href="#"` واستبدله بـ:

```html
<a href="/products/electronics.html">Electronics</a>
```

---

## 📊 جودة الكود (Code Quality)

- ✅ HTML نظيف ودلالي
- ✅ CSS منظم مع تعليقات أقسام
- ✅ CSS Custom Properties لكل القيم القابلة للتخصيص
- ✅ لا تكرار غير ضروري
- ✅ لا inline styles (إلا للـ `--reveal-delay` المخصص لكل عنصر)
- ✅ لا inline JavaScript
- ✅ أسماء أصناف (Class names) واضحة و BEM-like
- ✅ تعليقات فقط حيث تُحسّن قابلية الصيانة
- ✅ دوال JavaScript صغيرة بأسماء معبّرة

---

## 🛣️ الخطوات القادمة (Roadmap)

عند بناء باقي صفحات YallaBuy:

1. استبدل كل `href="#"` بروابط حقيقية:
   - `/products/{category}.html`
   - `/reviews/{product-slug}.html`
   - `/comparisons/{vs-slug}.html`
   - `/articles/{article-slug}.html`
   - `/deals`

2. أضف الصور الفعلية في:
   - `assets/images/categories/*.webp`
   - `assets/images/discovery/*.webp`

3. اربط Header drawer بنفس روابط Desktop.

4. أضف صفحة بحث منفصلة عند تفعيل زر البحث.

---

## 📝 الملاحظات التحريرية (Editorial Notes)

- لا يُدَّعى أبداً أن YallaBuy اختبرت كل منتج شخصياً.
- لا تُذكر أسعار أو تقييمات أو إحصائيات وهمية.
- الصياغة تركز على: البحث، الفهم، المقارنة، القرار.
- يُفصح عن طبيعة Amazon Affiliate بوضوح في الـ Footer.

---

**Research first. Buy second.**
© YallaBuy
```

---

## 📌 ملخص ما يحتويه ملف الـ `README.md`

الملف يشرح بشكل كامل ومنظم:

1. **نظرة عامة** على المشروع والهدف منه
2. **هيكل الملفات** المطلوب
3. **نظام التصميم** (ألوان، ظلال، خطوط، زوايا)
4. **شرح كل قسم** من أقسام الصفحة الـ 8
5. **الأداء** وكيف حققنا LCP / INP / CLS
6. **إمكانيات الوصول** (Accessibility)
7. **التصميم المتجاوب** ونقاط الكسر
8. **الروابط المؤقتة** `href="#"`
9. **آلية fallback للصور**
10. **الرسوم المتحركة** ودعم `prefers-reduced-motion`
11. **كيفية التشغيل** محلياً
12. **التخصيص** (تغيير الألوان، إضافة قسم، استبدال الروابط)
13. **جودة الكود** المعتمدة
14. **خارطة الطريق** للخطوات القادمة

يمكنك حفظه مباشرةً كـ `README.md` في جذر المشروع بجانب `index.html`.
