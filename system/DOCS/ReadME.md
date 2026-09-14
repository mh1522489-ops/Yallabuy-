📚 Docs — نظام توثيق وقواعد المشروع

ما هو هذا المجلد؟

مجلد "docs" يحتوي على المواصفات والقواعد والمعايير التي تحكم تطوير مشروع YallaBuy.

الهدف منه هو أن يكون مرجعًا مركزيًا للمشروع يوضح:

- كيف يجب كتابة الكود.
- كيف يجب بناء الصفحات والمكونات.
- كيف يتم التعامل مع البيانات.
- كيف يتم تحسين SEO.
- كيف يتم التعامل مع الصور.
- كيف يتم بناء الروابط الداخلية.
- كيف يتم التأكد من Accessibility.
- كيف يتم اختبار الموقع.
- كيف يتم نشر التغييرات.
- كيف يجب أن يتصرف الذكاء الاصطناعي عند تعديل المشروع.
- وما القواعد التي يجب الالتزام بها للحفاظ على جودة المشروع مع نموه.

«مبدأ أساسي:
هذا المجلد لا يحتوي على كود الموقع نفسه، بل يحتوي على القواعد التي يجب أن يتبعها الكود والمشروع أثناء التطوير.»

---

🎯 الهدف من "docs"

تم إنشاء هذا المجلد حتى لا تعتمد قرارات المشروع على الذاكرة أو الاجتهاد في كل مرة.

بدلًا من أن يسأل المطور أو الذكاء الاصطناعي:

«"كيف يجب أن أعمل هذا؟"»

يبحث أولًا في المواصفة المناسبة.

وبذلك يصبح المشروع:

أكثر تنظيمًا + أسهل في الصيانة + أكثر قابلية للتوسع + أقل عرضة للأخطاء.

---

🗂️ أنواع الملفات الموجودة هنا

الملفات الموجودة في "docs" يمكن تقسيمها إلى عدة مجموعات.

---

🤖 1. قواعد الذكاء الاصطناعي والتطوير

هذه الملفات تحدد كيف يجب أن يتعامل AI مع المشروع أثناء البرمجة.

"AI-Coding-Rules.md"

يحدد طريقة تعامل الذكاء الاصطناعي مع الكود.

يشمل مثلًا:

- فحص الكود الموجود قبل تعديله.
- فهم بنية المشروع قبل التنفيذ.
- عدم إعادة كتابة ملفات كاملة بدون سبب.
- عدم تعديل أجزاء غير مرتبطة بالمهمة.
- عدم اختراع بيانات المنتجات.
- عدم اختراع نتائج الاختبارات.
- الحفاظ على البنية الحالية عند الإمكان.
- إجراء أقل تغيير ضروري لتحقيق المطلوب.

---

🏗️ 2. قواعد بنية المشروع والكود

هذه الملفات تحدد كيف يتم تنظيم المشروع وكتابة الكود داخله.

"Code-Style.md"

يحدد أسلوب كتابة وتنظيم الكود.

يشمل:

- طريقة تسمية المتغيرات والدوال.
- تنسيق الملفات.
- المسافات والمسافات البادئة.
- تنظيم CSS.
- تنظيم HTML.
- تنظيم JavaScript.
- تنظيم JSON وYAML وMarkdown.
- أسماء الملفات والمجلدات.
- قواعد التعليقات.

---

"JavaScript-Standards.md"

يحدد معايير كتابة JavaScript في المشروع.

يشمل:

- المتغيرات والدوال.
- Classes وOOP.
- DOM.
- Events.
- Fetch وJSON.
- Async/Await.
- Error Handling.
- Rendering.
- Search وFiltering.
- Performance.
- Accessibility.
- Security.
- تنظيم JavaScript.
- التعامل مع "data.json".

---

🗃️ 3. البيانات ومصدر الحقيقة

هذه المجموعة مسؤولة عن كيفية التعامل مع البيانات داخل المشروع.

"Single-Source-of-Truth.md"

يحدد المصدر الرسمي لكل نوع من المعلومات.

الهدف الأساسي:

«لا يجب أن تكون نفس المعلومة موجودة في أكثر من مكان بدون سبب.»

مثال:

بيانات المنتجات يجب أن يكون لها مصدر أساسي واضح بدل تكرارها يدويًا في:

- HTML
- JavaScript
- JSON
- صفحات متعددة

---

"Data-Standards.md"

يحدد القواعد العامة الخاصة بالبيانات، مثل:

- أسماء الحقول.
- شكل البيانات.
- تنظيم البيانات.
- أنواع القيم.
- الاتساق بين الملفات.

---

🔎 4. SEO

هذه الملفات تحدد قواعد تحسين الموقع لمحركات البحث.

"SEO-Standards.md"

يضع القواعد العامة لـ SEO داخل المشروع.

يشمل:

- Title.
- Meta Description.
- Headings.
- Internal Links.
- URLs.
- Canonical.
- Indexing.
- Sitemap.
- صفحات المنتجات.
- صفحات التصنيفات.
- المحتوى.
- Structured Data.

---

"Structured-Data.md"

يحدد قواعد استخدام Schema / JSON-LD.

الهدف هو التأكد من أن البيانات المنظمة:

- صحيحة.
- متوافقة مع الصفحة.
- لا تحتوي على معلومات غير حقيقية.
- تستخدم النوع المناسب لكل صفحة.

---

"URL-Standards.md"

يحدد طريقة إنشاء وتنظيم روابط الموقع.

يشمل:

- شكل URL.
- الأحرف المستخدمة.
- بنية المسارات.
- الروابط الثابتة.
- تجنب الروابط غير الضرورية.
- الحفاظ على استقرار الروابط.

---

🔗 5. الروابط الداخلية

"Internal-Linking.md"

يحدد كيفية بناء شبكة الروابط الداخلية للموقع.

يساعد في تحديد:

- الصفحات التي يجب ربطها.
- مكان وضع الرابط.
- Anchor Text.
- علاقة الصفحات ببعضها.
- Content Hubs.
- Supporting Content.
- Product Pages.
- Category Pages.
- Alternative Pages.
- منع Orphan Pages.

الهدف ليس إضافة أكبر عدد ممكن من الروابط، وإنما:

«إضافة الروابط التي تساعد المستخدم ومحركات البحث على فهم علاقة الصفحات ببعضها.»

---

📝 6. المحتوى

هذه المجموعة تحدد طريقة إنشاء وتنظيم محتوى YallaBuy.

"Content-Standards.md"

يحدد المعايير العامة للمحتوى.

يشمل:

- جودة المحتوى.
- وضوح الكتابة.
- تنظيم المقالات.
- تجربة القارئ.
- الدقة.
- عدم اختراع المعلومات.

---

"Content-Hub.md"

يحدد طريقة بناء Content Hubs وربط المحتوى ببعضه.

مثال:

Headphones Hub
│
├── Headphones Category
│
├── Best Headphones
├── Best Wireless Headphones
├── Best Noise Cancelling Headphones
├── Sony Headphones Guide
├── Bose Headphones Guide
│
└── Individual Product Pages

الهدف هو بناء مجموعة محتوى مترابطة بدل إنشاء مقالات منفصلة بدون علاقة واضحة.

---

"Fact-Checking.md"

يحدد كيفية التحقق من المعلومات قبل نشرها.

خصوصًا:

- المواصفات.
- الأسعار.
- التقييمات.
- المراجعات.
- التجارب.
- معلومات الشركات.
- معلومات المنتجات.

ويمنع نشر معلومات غير مؤكدة أو تقديمها على أنها حقيقة.

---

🖼️ 7. الصور

"Images.md"

يحدد قواعد استخدام الصور داخل الموقع.

يشمل:

- متى نحتاج صورة.
- متى لا نحتاج صورة.
- الصور الأساسية.
- صور المنتجات.
- Hero Images.
- LCP Images.
- Lazy Loading.
- WebP / AVIF.
- أبعاد الصور.
- "width" و"height".
- "srcset".
- "sizes".
- Alt Text.
- Performance.
- CLS.
- تنظيم ملفات الصور.

المبدأ الأساسي:

«الصورة يجب أن تضيف قيمة حقيقية، وليس مجرد ملء مساحة.»

---

♿ 8. Accessibility

"Accessibility.md"

يحدد قواعد جعل الموقع قابلًا للاستخدام لأكبر عدد ممكن من المستخدمين.

يشمل:

- Semantic HTML.
- Keyboard Navigation.
- Focus.
- Screen Readers.
- Alt Text.
- Forms.
- Buttons.
- Links.
- Color Contrast.
- ARIA عند الحاجة.
- Responsive Accessibility.

---

🧪 9. الاختبارات

"Testing.md"

يحدد كيفية اختبار الموقع قبل اعتبار التغيير ناجحًا.

يشمل:

- Functional Testing.
- Component Testing.
- Page Testing.
- Feature Testing.
- Search Testing.
- JSON/Data Testing.
- JavaScript Testing.
- Responsive Testing.
- Accessibility Testing.
- SEO Testing.
- Performance Testing.
- Regression Testing.
- Smoke Testing.

كما يحدد حالات الاختبار:

PASS
FAIL
BLOCKED
NOT RUN

ويمنع الادعاء بأن اختبارًا نجح إذا لم يتم تشغيله فعليًا.

---

🚀 10. النشر

"Deployment.md"

يحدد كيفية نقل التغييرات إلى Production.

يشمل:

- Pre-deployment checks.
- Deployment.
- Production Verification.
- SEO verification.
- Domain verification.
- Cache.
- Service Worker.
- Performance.
- Smoke Testing.
- Rollback.
- Release Verification.

المبدأ الأساسي:

Implementation
      ↓
Testing
      ↓
Deployment
      ↓
Production Verification
      ↓
Release Complete

---

⚡ 11. الأداء

ملفات الأداء تهدف إلى الحفاظ على سرعة الموقع مع نموه.

ومن أهم الأشياء التي يتم الاهتمام بها:

- LCP.
- INP.
- CLS.
- JavaScript Performance.
- Image Performance.
- Network Performance.
- Third-party Scripts.
- Loading Strategy.
- Caching.

الأهداف الأساسية للمشروع:

LCP < 2.5s
INP < 200ms
CLS < 0.1

---

🧠 كيف أستخدم هذا المجلد؟

عند العمل على أي جزء من المشروع، لا تحتاج إلى قراءة جميع الملفات.

ابحث عن الملف المرتبط بالمهمة.

إذا كنت تعدل JavaScript:

ابدأ بـ:

AI-Coding-Rules.md
JavaScript-Standards.md
Code-Style.md
Testing.md

إذا كنت تضيف صفحة جديدة:

ابدأ بـ:

AI-Coding-Rules.md
Code-Style.md
SEO-Standards.md
URL-Standards.md
Internal-Linking.md
Accessibility.md
Testing.md

إذا كنت تضيف منتجًا:

ابدأ بـ:

Single-Source-of-Truth.md
Data-Standards.md
Content-Standards.md
Fact-Checking.md
Images.md
SEO-Standards.md
Internal-Linking.md
Testing.md

إذا كنت تضيف مقالًا:

ابدأ بـ:

Content-Standards.md
Content-Hub.md
Fact-Checking.md
Internal-Linking.md
SEO-Standards.md
Images.md
Accessibility.md
Testing.md

إذا كنت تستعد للنشر:

ابدأ بـ:

Testing.md
Deployment.md
Performance
SEO

---

🤖 طريقة استخدام AI مع "docs"

عند إعطاء AI مهمة داخل YallaBuy، يجب ألا يبدأ بتعديل الكود مباشرة.

يفضل أن يتبع التسلسل:

1. Understand the Request
        ↓
2. Inspect the Existing Project
        ↓
3. Identify Relevant Documentation
        ↓
4. Read Applicable Rules
        ↓
5. Understand Dependencies
        ↓
6. Plan the Minimal Change
        ↓
7. Implement
        ↓
8. Review
        ↓
9. Test
        ↓
10. Report Actual Results

---

⚠️ قواعد مهمة

لا تعتبر ملفات "docs" مجرد Documentation

هذه الملفات ليست للشرح فقط.

هي قواعد تشغيل للمشروع.

عند وجود قاعدة واضحة في أحد الملفات، يجب اتباعها أثناء التطوير.

---

لا تقرأ جميع الملفات بدون حاجة

ليس الهدف أن يقرأ AI كل ملفات "docs" مع كل مهمة.

يجب تحديد الملفات المرتبطة بالمهمة فقط.

مثال:

«تعديل صورة Product Card»

لا يحتاج إلى قراءة كل النظام.

الأولوية تكون:

Images.md
Code-Style.md
AI-Coding-Rules.md
Testing.md

---

🔄 عند إضافة ملف جديد

أي ملف جديد داخل "docs" يجب أن تكون له مسؤولية واضحة.

قبل إنشاء ملف جديد اسأل:

1. هل هذه القاعدة موجودة بالفعل في ملف آخر؟
2. هل الملف الجديد يحل مشكلة حقيقية؟
3. هل له مسؤولية مختلفة بوضوح؟
4. هل سيجعل النظام أسهل في الاستخدام؟
5. هل يمكن وضع هذه القاعدة داخل ملف موجود بدل إنشاء ملف جديد؟

«لا يتم إنشاء ملفات جديدة لمجرد زيادة عدد ملفات النظام.»

---

🧩 العلاقة بين الملفات

يمكن النظر إلى النظام كالتالي:

AI-Coding-Rules
        │
        ↓
Architecture / Project Structure
        │
        ↓
Code Style + JavaScript Standards
        │
        ├── Accessibility
        ├── Images
        ├── Data
        ├── SEO
        ├── Internal Linking
        └── Content
                │
                ↓
             Testing
                │
                ↓
            Deployment

كل مجموعة تكمل الأخرى.

---

📌 القاعدة الأساسية للمجلد

«"docs" هو العقل التنظيمي للمشروع.»

الكود يخبر الموقع كيف يعمل.

أما "docs" فيحدد كيف يجب أن يتم بناء هذا الكود والمحافظة عليه.

لذلك، قبل إجراء تغيير مهم في المشروع:

افهم القاعدة → افهم التأثير → نفذ التغيير → اختبره → وثق النتيجة.

---

🔮 قابلية التوسع

مع نمو YallaBuy يمكن إضافة مواصفات جديدة عند الحاجة، مثل:

Architecture.md
AI-Task-Workflow.md
AI-Change-Impact.md
AI-Debugging.md
AI-Code-Review.md
Data-Schema.md
Data-Validation.md
Technical-SEO.md
SEO-Audit.md
Performance-Budget.md
Security-Standards.md
Third-Party-Security.md
Content-Research.md
Content-Update.md

لكن لا تتم إضافة أي ملف إلا عندما تكون هناك حاجة حقيقية له.

---

✅ الخلاصة

مجلد "docs" موجود لكي يجعل تطوير YallaBuy منظمًا وقابلًا للتوسع وقابلًا للتكرار.

بدل أن تكون قواعد المشروع موجودة في الذاكرة أو موزعة بين المحادثات، يتم وضعها هنا كمصدر واضح يمكن الرجوع إليه في أي وقت.

عند الشك في كيفية تنفيذ شيء داخل المشروع، ابحث أولًا في "docs".
