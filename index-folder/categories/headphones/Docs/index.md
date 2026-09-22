YallaBuy Headphones Page — Documentation

File Information

Property| Value
File Name| "index.html"
Page Title| Headphones – Research, Compare & Buy | YallaBuy
Creation Date| 2024-05-20
Last Updated| 2024-05-20
Author| YallaBuy Development Team
Version| 1.0.0
Status| Production Ready

---

1. Overview

هذا الملف هو الواجهة الرئيسية لتصنيف Headphones في موقع YallaBuy.

يمثل الملف صفحة أبحاث وتحرير Editorial احترافية، مصممة لمساعدة المستخدمين على:

- البحث عن السماعات.
- اكتشاف المنتجات المناسبة.
- مقارنة المنتجات.
- فهم أهم العوامل التي يجب النظر إليها.
- اتخاذ قرارات شراء مدروسة.

الصفحة مصممة لتكون مختلفة عن صفحات متاجر التجزئة التقليدية، بحيث يكون التركيز الأساسي على البحث والمعلومات أولًا، ثم الشراء.

Design Philosophy

«Research first. Buy second.»

ابحث أولًا، اشترِ ثانيًا.

Page Type

الصفحة عبارة عن:

- Single-page application.
- Vanilla JavaScript.
- بدون React.
- بدون Vue.
- بدون jQuery.
- تعتمد على HTML وCSS وJavaScript مباشرة.

---

2. Data Source

Data File

مصدر بيانات المنتجات الرئيسي هو:

data.json

تحتوي هذه البيانات على معلومات السماعات التي يتم عرضها داخل الكتالوج.

---

Data Fetching

يتم تحميل بيانات المنتجات بشكل ديناميكي عند تحميل الصفحة باستخدام Fetch API في JavaScript.

الدالة الرئيسية المسؤولة عن ذلك هي:

loadProducts()

وتقوم بجلب الملف:

fetch('data.json')

التدفق الأساسي هو:

index.html
    ↓
JavaScript
    ↓
loadProducts()
    ↓
fetch('data.json')
    ↓
Product Data
    ↓
Render Products

---

Error Handling

إذا فشل تحميل ملف JSON بسبب مشكلة في الشبكة أو الخادم، لا يتم ترك الصفحة في حالة فارغة.

بدلًا من ذلك، يتم عرض رسالة خطأ للمستخدم:

«We couldn't load the headphone catalog right now. Please try again later.»

مع توفير زر:

Retry

حتى يستطيع المستخدم محاولة تحميل البيانات مرة أخرى.

---

Data Integrity

الصفحة لا تقوم بإنشاء بيانات وهمية.

لا يتم اختلاق:

- الأسعار.
- التقييمات.
- روابط المنتجات.
- المواصفات.
- بيانات الشراء.

إذا كان رابط الشراء "amazonUrl" غير موجود في بيانات المنتج، يتم إخفاء زر الشراء.

وإذا كان رابط التفاصيل "detailsUrl" غير موجود، يتم إخفاء زر التفاصيل.

---

Search Terms

إذا لم يكن الحقل:

searchTerms

موجودًا في بيانات المنتج، يتم إنشاؤه تلقائيًا بناءً على معلومات المنتج، مثل:

- الاسم.
- العلامة التجارية.
- النوع.
- المميزات.

يساعد ذلك نظام البحث والـAutocomplete على اكتشاف المنتج من خلال أكثر من كلمة أو خاصية.

---

3. Technology Stack

HTML

تستخدم الصفحة:

HTML5 Semantic HTML

ومن أهم العناصر المستخدمة:

<header>
<nav>
<section>
<article>
<aside>
<footer>

استخدام العناصر الدلالية يساعد على:

- تنظيم الصفحة.
- تحسين Accessibility.
- تحسين فهم محركات البحث لبنية المحتوى.

---

CSS

تعتمد الصفحة على CSS بدون Framework خارجي.

تستخدم:

- CSS Custom Properties.
- CSS Grid.
- Flexbox.
- Media Queries.
- Responsive Design.
- Animations / Transitions عند الحاجة.

---

JavaScript

تعتمد الصفحة على:

Vanilla JavaScript — ES6+

ولا تستخدم:

- React.
- Vue.
- jQuery.
- أي Framework JavaScript خارجي.

---

Fonts

تستخدم الصفحة:

Google Fonts — Manrope

مع استخدام "preconnect" لتحسين تحميل الخطوط وتقليل وقت الاتصال بالمصدر الخارجي.

---

Images

يتم تحميل صور المنتجات باستخدام:

loading="lazy"

كما يتم حجز مساحة الصور مسبقًا باستخدام أبعاد أو "aspect-ratio" مناسبة.

الهدف هو تقليل:

Cumulative Layout Shift — CLS

ومنع تحرك محتوى الصفحة أثناء تحميل الصور.

---

4. Page Structure

4.1 Header

الترويسة الرئيسية للصفحة.

تحتوي على:

- شعار YallaBuy.
- قائمة التنقل الرئيسية.
- زر وصول سريع للبحث.
- قائمة Hamburger للجوال.

الترويسة Sticky بحيث تظل متاحة أثناء التصفح.

---

4.2 Breadcrumb

مسار التنقل:

Home / Categories / Headphones

يتم استخدامه لتوضيح مكان المستخدم داخل الموقع.

كما يتم كتابته بطريقة دلالية للمساعدة في تحسين SEO.

---

4.3 Hero Section

الواجهة الرئيسية للصفحة.

تحتوي على عنوان:

Headphones

والجملة الرئيسية:

«Find the right pair for the way you listen.»

كما تحتوي على نص داعم يوضح هدف الصفحة.

تم تصميم الـHero ليكون واضحًا ومختصرًا بدلًا من استخدام مساحة ضخمة، وذلك لإعطاء الأولوية لأداة البحث.

---

5. Search System

Search & Autocomplete

البحث هو Primary Discovery Mechanism في الصفحة.

أي أن البحث هو الوسيلة الأساسية التي يعتمد عليها المستخدم لاكتشاف المنتجات.

لا تعتمد الصفحة على نظام Filters معقد.

---

Search Fields

يقوم البحث بالبحث داخل عدة أجزاء من بيانات المنتج:

- Product Name.
- Brand.
- Type.
- Features.
- Search Terms.

---

Autocomplete

يحتوي نظام البحث على Autocomplete مخصص.

عند كتابة المستخدم، تظهر له اقتراحات مناسبة.

---

Keyboard Navigation

يدعم الـAutocomplete التنقل باستخدام لوحة المفاتيح:

Arrow Up
Arrow Down
Enter
Escape

وذلك يسمح للمستخدم باستخدام البحث بدون الحاجة إلى الماوس.

---

Highlighting

عند ظهور اقتراحات البحث، يتم إبراز الكلمات المطابقة لما كتبه المستخدم.

---

Debouncing

يستخدم البحث:

Debounce: 200ms

وذلك لمنع تنفيذ عمليات بحث متكررة مع كل ضغطة زر.

الهدف:

- تقليل العمليات غير الضرورية.
- تحسين الأداء.
- تقليل الضغط على المعالج.

---

Clear Search

يوجد زر لمسح البحث.

عند استخدامه:

Search Query
    ↓
Clear
    ↓
Full Product Catalog

ويتم إعادة عرض الكتالوج الكامل.

---

Results Count

يتم تحديث عدد النتائج بشكل ديناميكي حسب نتيجة البحث الحالية.

---

Empty State

إذا لم يجد البحث أي منتجات، يتم عرض حالة فارغة Empty State للمستخدم بدلًا من ترك الصفحة فارغة.

---

6. Recommended Picks

قسم:

Recommended Picks

يعرض مجموعة من المنتجات المختارة بطريقة تحريرية ومرئية.

يستخدم Grid مكونًا من 12 عمودًا، مع بطاقات ذات أحجام مختلفة لإنشاء عرض بصري أكثر تميزًا.

يتم تقسيم الاختيارات إلى أربع فئات:

1. Noise Cancellation
2. Battery Life
3. Audiophile
4. Budget

---

7. Browse by Brand

يسمح هذا القسم للمستخدم باستكشاف المنتجات حسب العلامة التجارية.

أمثلة:

- Sony.
- Bose.
- Apple.
- وغيرها.

Behavior

عند الضغط على علامة تجارية، لا يتم فتح Filter منفصل.

بدلًا من ذلك:

Brand Button
    ↓
Search Input
    ↓
Insert Brand Name
    ↓
Execute Search

مثال:

Sony

يتم وضعها داخل حقل البحث وتشغيل البحث.

هذا يحافظ على مبدأ أن البحث هو أداة الاكتشاف الرئيسية الوحيدة بدلًا من إضافة نظام Filters منفصل.

---

8. What Matters?

قسم تعليمي وليس قسمًا لعرض المنتجات.

يشرح أهم العوامل التي يجب على المستخدم التفكير فيها عند اختيار السماعات.

المحاور الستة هي:

1. جودة الصوت.
2. عزل الضوضاء.
3. عمر البطارية.
4. الراحة.
5. الاتصال.
6. الميكروفون.

الهدف من هذا القسم هو مساعدة المستخدم على فهم ما الذي يجب أن يهتم به عند شراء السماعات، وليس مجرد عرض منتجات للبيع.

---

9. Product Catalog

هذا هو القسم الأساسي في الصفحة.

يعرض مجموعة المنتجات الموجودة في ملف البيانات.

---

Product Grid

يستخدم الكتالوج Responsive Grid.

Desktop

4 Columns

Tablet

2 Columns

Mobile

1 Column

---

Load More

لا تستخدم الصفحة Infinite Scroll.

بدلًا من ذلك تستخدم:

Load More

في البداية يتم عرض:

12 Products

وعند الضغط على Load More تتم إضافة:

+12 Products

في كل مرة.

---

Product Card

تحتوي بطاقة المنتج على:

- صورة المنتج.
- العلامة التجارية.
- اسم المنتج.
- المواصفات الأساسية.
- السعر.
- زر الشراء إذا كان الرابط متوفرًا.
- زر التفاصيل إذا كان الرابط متوفرًا.

---

Amazon Price Disclaimer

يوجد تنبيه ثابت واحد أعلى الكتالوج يوضح أن:

أسعار Amazon قد تتغير.

والهدف هو منع إعطاء انطباع بأن السعر المعروض ثابت دائمًا.

---

Skeleton Loading

أثناء تحميل البيانات يتم عرض:

Skeleton Loaders

بدلًا من ترك مساحة المنتجات فارغة.

يساعد ذلك على:

- تحسين تجربة المستخدم.
- تقليل الإحساس ببطء الصفحة.
- منع القفز المفاجئ في التخطيط.
- تحسين CLS.

---

Accessibility

بطاقات المنتجات مصممة مع مراعاة إمكانية الوصول.

---

10. Quick Comparison

يسمح نظام المقارنة للمستخدم باختيار من:

2 → 4 Products

وذلك باستخدام Checkbox داخل بطاقة المنتج.

---

Comparison Table

بعد اختيار المنتجات يتم عرض جدول مقارنة.

يحتوي على معلومات مثل:

- السعر.
- البطارية.
- ANC.
- الوزن.
- الاتصال.

على الجوال، يكون جدول المقارنة قابلًا للتمرير أفقيًا.

---

Floating Comparison Button

يظهر زر عائم عندما يبدأ المستخدم في اختيار المنتجات.

يعرض الزر عدد المنتجات المحددة.

مثال:

Compare (3)

---

11. How We Evaluate

قسم يشرح منهجية YallaBuy في تقييم المنتجات.

يحتوي على شبكة مكونة من أربع بطاقات.

تشرح المنهجية، مثل:

- تأكيد الأرقام.
- تقييم القيمة.
- استقلالية التحرير.
- طريقة التعامل مع معلومات المنتجات.

الهدف هو توضيح للمستخدم كيف يتم التعامل مع المعلومات والتقييمات بدلًا من عرض المنتجات فقط.

---

12. Headphones Guides

قسم خاص بأدلة شراء السماعات.

يتكون من:

- 6 بطاقات لأدلة مميزة.
- شريط جانبي داكن.
- روابط إضافية لأدلة ومحتوى متعلق بالسماعات.

---

13. Buying Guide

دليل شراء تفصيلي يساعد المستخدم على فهم كيفية اختيار السماعة المناسبة.

يحتوي على:

- محتوى تحريري.
- أقسام متعددة.
- Table of Contents.

يتم تثبيت جدول المحتويات باستخدام:

Sticky TOC

بحيث يستطيع المستخدم التنقل بين أجزاء الدليل أثناء القراءة.

---

14. FAQ

قسم الأسئلة الشائعة.

يستخدم تصميم:

Accordion

بحيث يستطيع المستخدم فتح السؤال وإظهار الإجابة.

يدعم القسم أيضًا إمكانية الوصول باستخدام عناصر وتحكمات مناسبة.

---

15. Footer

التذييل الرئيسي للصفحة.

يحتوي على:

- روابط الموقع.
- Privacy Policy.
- المعلومات القانونية.
- Amazon Affiliate Disclosure.

التذييل يستخدم تصميمًا داكنًا لتمييزه بصريًا عن محتوى الصفحة.

---

16. SEO

الصفحة تحتوي على عناصر SEO الأساسية.

Meta Tags

تشمل:

- Title.
- Description.
- Canonical URL.
- Open Graph.
- Twitter Card.

---

17. Structured Data

تستخدم الصفحة Structured Data مناسبة للمحتوى.

تشمل:

BreadcrumbList

تستخدم لوصف مسار التنقل داخل الموقع.

FAQPage

تستخدم لوصف قسم الأسئلة الشائعة.

---

No Fake Structured Data

لا تستخدم الصفحة بيانات مزيفة أو غير حقيقية بهدف تحسين ظهورها في محركات البحث.

خصوصًا:

AggregateRating
Review

لا يتم إنشاء تقييمات أو مراجعات وهمية.

---

18. Accessibility

Keyboard Support

نظام البحث والـAutocomplete يدعم استخدام لوحة المفاتيح.

يتم التعامل مع:

Arrow Up
Arrow Down
Enter
Escape

---

ARIA

يتم استخدام ARIA Labels للعناصر التي تحتاج إلى وصف إضافي.

خصوصًا:

- Buttons.
- Search controls.
- Autocomplete controls.

ويستخدم البحث بنية مناسبة لـ:

ARIA Combobox

---

Color Contrast

يتم الاهتمام بتباين الألوان بما يتوافق مع متطلبات Accessibility ومعايير WCAG المستهدفة.

---

Semantic HTML

تستخدم الصفحة عناصر HTML دلالية مثل:

<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>

وذلك لتحسين بنية الصفحة وإمكانية الوصول وفهم المحتوى.

---

19. Performance

Lazy Loading

يتم استخدام Lazy Loading لصور المنتجات.

---

Reserved Image Space

يتم حجز مساحة الصور مسبقًا باستخدام الأبعاد أو:

aspect-ratio

لتقليل:

CLS — Cumulative Layout Shift

---

Search Debouncing

يستخدم البحث:

200ms Debounce

لتقليل العمليات المتكررة وتحسين الأداء.

---

Zero Dependencies

لا تعتمد الصفحة على مكتبات JavaScript خارجية.

No jQuery
No React
No Vue
No JavaScript Framework

---

Reduced Motion

تحترم الصفحة تفضيلات المستخدم المتعلقة بالحركة باستخدام:

prefers-reduced-motion

وبذلك يمكن تقليل أو إيقاف الحركات للمستخدمين الذين يفضلون تقليل الحركة.

---

20. JavaScript Core Functions

"loadProducts()"

مسؤولة عن:

- تحميل ملف JSON.
- معالجة البيانات.
- التعامل مع أخطاء التحميل.

المصدر:

./data/data.json

---

"initializeSearch()"

مسؤولة عن إعداد نظام البحث.

تشمل:

- Event Listeners.
- Search Input.
- Autocomplete.
- Clear Search.
- Keyboard Interaction.

---

"searchProducts(query)"

مسؤولة عن البحث داخل المنتجات باستخدام النص الذي أدخله المستخدم.

تقوم بتصفية المنتجات وعرض النتائج المطابقة.

---

"renderAutocomplete(query)"

مسؤولة عن بناء قائمة الاقتراحات التي تظهر أسفل حقل البحث.

---

"handleSearchKeyboard(e)"

مسؤولة عن التعامل مع أحداث لوحة المفاتيح داخل نظام الـAutocomplete.

تدعم:

Arrow Up
Arrow Down
Enter
Escape

---

"clearSearch()"

مسؤولة عن:

- مسح النص الموجود في Search Input.
- إعادة الكتالوج الكامل.
- إعادة حالة البحث إلى الوضع الافتراضي.

---

"renderProducts()"

مسؤولة عن:

- بناء شبكة المنتجات.
- عرض Product Cards.
- إدارة عدد المنتجات الظاهرة.
- التعامل مع حالة الـSkeleton أثناء تحميل البيانات.

---

"createProductCard(product)"

تستقبل بيانات منتج واحد وتقوم بإنشاء HTML الخاص ببطاقة المنتج.

تتعامل مع:

- صورة المنتج.
- الاسم.
- العلامة التجارية.
- المواصفات.
- السعر.
- رابط الشراء.
- رابط التفاصيل.

إذا لم يكن رابط الشراء أو التفاصيل موجودًا، يتم إخفاء الزر المقابل.

---

"initializeComparison()"

مسؤولة عن تشغيل نظام المقارنة.

تتعامل مع:

- اختيار المنتجات.
- إزالة المنتجات من المقارنة.
- تحديث عدد المنتجات المحددة.
- تحديث جدول المقارنة.

يسمح النظام باختيار:

2–4 Products

---

"loadMoreProducts()"

مسؤولة عن زيادة عدد المنتجات الظاهرة.

النظام يعمل بهذا الشكل:

Initial
↓
12 Products

Load More
↓
24 Products

Load More
↓
36 Products

وهكذا.

---

"showError()"

مسؤولة عن عرض رسالة الخطأ للمستخدم عندما يفشل تحميل بيانات المنتجات.

تظهر رسالة توضح أن كتالوج السماعات غير متاح حاليًا، مع إمكانية إعادة المحاولة.

---

21. Main Page Flow

التدفق العام للصفحة:

User Opens Page
        ↓
HTML Loads
        ↓
JavaScript Initializes
        ↓
loadProducts()
        ↓
Fetch data.json
        ↓
Validate / Prepare Data
        ↓
Render Products
        ↓
Initialize Search
        ↓
Initialize Comparison
        ↓
User Searches / Browses / Compares

---

22. Main Dependencies

العلاقة الأساسية بين ملفات الصفحة:

index.html
    │
    ├── CSS
    │
    └── JavaScript
            │
            └── ./data/data.json

ويعتمد JavaScript على بيانات "data.json" لبناء كتالوج المنتجات بشكل ديناميكي.

---

23. Documentation Notes

هذه الصفحة مصممة حول مبدأ:

«Research first. Buy second.»

أي أن الهدف الأساسي ليس مجرد إرسال المستخدم إلى متجر، وإنما مساعدته أولًا على فهم المنتجات والاختيار بينها، ثم توفير خيار الشراء عندما تكون بيانات الشراء متوفرة.

كما أن الصفحة تتجنب إنشاء بيانات غير موجودة في المصدر، ولا تعتمد على تقييمات أو مراجعات وهمية لتحسين مظهر المنتجات أو SEO.