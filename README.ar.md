[English](./README.md) | [العربية](./README.ar.md)

<div dir="rtl">

<p align="center">
  <img src="./assets/brand/jahiz-logo.png" alt="شعار جاهز للتحليلات" width="150" />
</p>

<h1 align="center">Jahiz Analytics — جاهز</h1>

<p align="center">
  <strong>تحليلات أداء الكاراتيه تبدأ من المباراة نفسها.</strong><br />
  سجّل أحداث المباراة لحظياً، راجع ما حدث، وحوّل بيانات المنافسة إلى معلومات تساعد على تطوير الأداء.
</p>

<p align="center">
  <a href="https://apps.apple.com/us/app/jahiz-analytics/id6788289047">
    <img src="./assets/store/app-store.svg" alt="تحميل جاهز من App Store" width="172" />
  </a>
  &nbsp;&nbsp;
  <a href="https://play.google.com/store/apps/details?id=com.jahiz.analytics">
    <img src="./assets/store/google-play.svg" alt="تحميل جاهز من Google Play" width="190" />
  </a>
</p>

<p align="center">
  <strong>منتج فعلي متعدد المنصات</strong> · iOS وAndroid · العربية RTL والإنجليزية LTR
</p>

---

## ▶ شاهد إطلاق جاهز

<p align="center">
  <a href="https://lnkd.in/p/eqWueRtk">
    <img src="./assets/hero/jahiz-product-engineering-showcase.webp" alt="إطلاق تطبيق جاهز للتحليلات — فتح منشور الإطلاق الحقيقي على LinkedIn" width="100%" />
  </a>
</p>

<p align="center">
  <a href="https://lnkd.in/p/eqWueRtk"><strong>▶ شاهد إطلاق Jahiz على LinkedIn</strong></a>
</p>

الدليل الرئيسي على المنتج هنا هو **إطلاق التطبيق الحقيقي المنشور للعامة**، وليس فيديو Demo مصنوعاً داخل المستودع. نحتفظ داخل GitHub بلقطات حقيقية من التطبيق ووثائق هندسية آمنة للنشر حتى يستطيع المراجع فهم المنتج والقرارات التقنية من دون الوصول إلى الكود الإنتاجي الخاص.

---

## ملخص سريع لمسؤول التوظيف

**Jahiz Analytics** تطبيق للهواتف مخصص للاعبي ومدربي الكاراتيه. يدعم إدارة اللاعبين، وتسجيل المباريات الفردية لحظياً، ومراجعة المباراة وتحليلاتها، والبطولات الفردية، بالإضافة إلى تدفقات خاصة بالمدربين لإدارة الفرق وبطولات الفرق.

دوري هو **Software Engineer & Equity Partner — Jahiz Analytics**. امتدت مسؤوليتي الهندسية عبر تطبيق Angular/Ionic، وإدارة الحالة باستخدام NgRx، وواجهات Node.js البرمجية، وتصميم بيانات PostgreSQL، وتدفقات المباراة المباشرة، ومعالجة التحليلات، والاختبارات، وCI/CD، وتسليم نسخ الهاتف للمتاجر.

القيمة التقنية لا تأتي من أسماء التقنيات، بل من القيود التي كان علينا حلها:

- يجب أن تبقى تفاعلات المباراة سريعة بينما يظل الخادم هو مصدر الحقيقة النهائي؛
- المؤقت والنتيجة والعقوبات وUndo واستعادة الاتصال يجب ألا تؤدي إلى فساد حالة المباراة؛
- أعمال التحليلات الأثقل لا ينبغي أن تزيد تكلفة مسار كتابة أحداث المباراة؛
- صلاحيات المدرب واللاعب لها حدود ملكية مختلفة؛
- العربية RTL والإنجليزية LTR يجب أن تتصرفا كمنتج واحد على شاشات الهاتف؛
- تغييرات قاعدة البيانات وإصدارات التطبيق يجب أن تتطور بأمان من دون كسر العملاء الأقدم بلا ضرورة.

**التقنيات الأساسية:** Angular · Ionic · Capacitor · NgRx · RxJS · Node.js · TypeScript · Express · PostgreSQL

---

## ما المشكلة التي يحلها جاهز؟

تنتج مباراة الكاراتيه معلومات مهمة يسهل فقدها بمجرد انتهائها. يجعل Jahiz المباراة نفسها مصدر البيانات: النقاط، والعقوبات، والتقنيات، والتوقيت، وسياق المباراة، وسجل المراجعة يمكن تسجيلها أثناء المباراة وتحليلها لاحقاً.

يركز المنتج الحالي على:

- ملفات اللاعبين وقوائم اللاعبين التي يديرها المدرب؛
- تسجيل المباريات الفردية ومراجعتها؛
- تحليلات الأداء المبنية على بيانات المباراة المسجلة؛
- تدفقات البطولات الفردية؛
- فرق المدربين ومباريات الفرق وبطولات الفرق حيث تكون مدعومة؛
- تجربة هاتف ثنائية اللغة بالعربية والإنجليزية.

ميزات مثل AI Insights وتحليل الفيديو ودعوات Coach–Athlete وحسابات الأكاديميات/المؤسسات وتفعيل الفوترة التجارية **لا يتم عرضها هنا كميزات منشورة حالياً**. راجع [توثيق حدود ادعاءات المنتج](./docs/FEATURE_CLAIM_VERIFICATION.md).

---

## دوري الهندسي

### Shawky Elsayed
**Software Engineer & Equity Partner — Jahiz Analytics**

تشمل مسؤوليتي دورة تنفيذ المنتج وتسليمه:

| المجال | المسؤولية |
| --- | --- |
| **تطبيق الهاتف** | معمارية Angular/Ionic، واجهات Responsive، وربط Capacitor بالمنصة الأصلية |
| **حالة العميل** | NgRx Actions وReducers وEffects وSelectors لتدفقات المباراة طويلة العمر |
| **Backend** | APIs بـ Node.js/TypeScript، قواعد المجال، المصادقة، وتطبيق حدود الملكية |
| **البيانات** | تطور مخطط PostgreSQL، المعاملات، الفهارس، والحفاظ على التاريخ |
| **المباراة المباشرة** | التسجيل، دورة حياة المؤقت، العقوبات، Undo، التفاعل التفاؤلي والمصالحة مع الخادم |
| **التحليلات** | تدفقات التحليل المبنية على المباراة والمعالجة الخلفية |
| **الجودة** | اختبارات Unit/Integration/E2E، منع الانحدارات، واختبار حالات الفشل |
| **التسليم** | CI/CD، فحوصات المخطط، بناء تطبيقات الهاتف، وعمليات App Store وGoogle Play |

قرارات المنتج والأعمال والهوية والجوانب الرياضية تُطوّر مع شركاء Jahiz. يركز هذا المستودع على العمل الهندسي الذي يمكن عرضه بشكل علني وآمن.

---

## تجربة المنتج

هذه لقطات من التطبيق الحقيقي بعد تعقيم البيانات واستخدام بيانات غير إنتاجية. يعرض README مجموعة صغيرة فقط عمداً؛ المعرض الأوسع موجود في [`docs/PRODUCT_SCREEN_GALLERY.md`](./docs/PRODUCT_SCREEN_GALLERY.md).

<table>
  <tr>
    <td width="50%">
      <img src="./assets/screenshots/home/coach-home-en.webp" alt="واجهة المدرب الرئيسية في جاهز" /><br />
      <strong>مساحة عمل المدرب</strong><br />
      اللاعبون والمباريات والفرق والبطولات داخل سياق هاتف واحد.
    </td>
    <td width="50%">
      <img src="./assets/screenshots/live-match/live-match-running-timer.webp" alt="شاشة تسجيل مباراة كاراتيه مباشرة في جاهز مع المؤقت" /><br />
      <strong>تسجيل المباراة مباشرة</strong><br />
      النتيجة وحالة المباراة والمؤقت وإجراءات المنافسة مصممة للاستخدام السريع.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="./assets/screenshots/review/match-review-timeline-events.webp" alt="التسلسل الزمني لمراجعة المباراة في جاهز" /><br />
      <strong>مراجعة المباراة</strong><br />
      تظل الأحداث المسجلة قابلة للفحص بعد انتهاء المواجهة.
    </td>
    <td width="50%">
      <img src="./assets/screenshots/analytics/match-technique-radar.webp" alt="شاشة تحليلات أداء المباراة في جاهز" /><br />
      <strong>تحليلات الأداء</strong><br />
      تتحول بيانات المباراة إلى مشاهد تساعد على فهم التقنيات والأداء.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="./assets/screenshots/teams/team-management.webp" alt="شاشة إدارة فريق للمدرب في جاهز" /><br />
      <strong>تدفقات الفرق للمدرب</strong><br />
      إدارة الفرق صلاحية مرتبطة بنوع حساب المدرب وليست ترقية لخطة اللاعب.
    </td>
    <td width="50%">
      <img src="./assets/screenshots/tournaments/tournament-hub-individual.webp" alt="واجهة بطولة فردية في جاهز" /><br />
      <strong>تدفق البطولة</strong><br />
      يربط سياق المنافسة الفردية المباريات بمسار البطولة.
    </td>
  </tr>
</table>

---

## الهندسة في نظرة واحدة

| الجانب | القرار |
| --- | --- |
| **Client** | Angular + Ionic + Capacitor لقاعدة كود واحدة متعددة المنصات |
| **State** | NgRx لتمثيل انتقالات الحالة بوضوح في تدفقات المباراة |
| **API** | Node.js + TypeScript + Express مع حدود واضحة لخدمات المجال |
| **Database** | PostgreSQL كمصدر الحقيقة للبيانات المعاملاتية |
| **التفاعل المباشر** | تحديثات تفاؤلية في العميل مع مصالحة مع الخادم ومعالجة Idempotent للأحداث |
| **التحليلات** | Background worker حتى تبقى عمليات التجميع الأثقل خارج مسار الطلب الأساسي |
| **Queueing** | PostgreSQL مع `FOR UPDATE SKIP LOCKED` لحجز مهام العامل |
| **التعريب** | العربية RTL والإنجليزية LTR كجزء من معمارية التخطيط وليس مجرد ترجمة |
| **سلامة الإصدار** | تحقق مرحلي، وفحوصات Migration، وHealth/Readiness، وسياسة لإصدارات الهاتف |
| **حدود المصدر** | الكود الإنتاجي خاص؛ المستودع يحتوي فقط أدلة وشروحات آمنة للنشر |

---

## دراسات هندسية مختصرة

### 1. حالة المباراة مع شبكة غير مستقرة

**المشكلة:** لا ينبغي للمسجل انتظار رحلة كاملة إلى الخادم قبل رؤية النقطة أو العقوبة محلياً.

**القرار:** تحديث حالة NgRx محلياً بشكل تفاؤلي، وترتيب أوامر المباراة المعلقة، وإعطاء الأحداث معرفات Idempotency، ثم المصالحة مع حالة المباراة المعتمدة من الخادم.

**المقابل:** يصبح العميل أكثر تعقيداً لأنه يجب أن يمثل الحالات المعلقة والمقبولة والمرفوضة والمعاد التحقق منها بوضوح.

**الدليل:** [`LIVE_MATCH_ENGINE.md`](./docs/case-studies/LIVE_MATCH_ENGINE.md) · [`live-match-flow.svg`](./assets/diagrams/live-match-flow.svg)

### 2. التحليلات خارج مسار كتابة المباراة

**المشكلة:** التجميعات بعد المباراة لا ينبغي أن تنافس تسجيل الأحداث المباشرة على نفس مسار الطلب.

**القرار:** إضافة مهمة تحليل ثم ترك Background workers تحجز المهام عبر PostgreSQL باستخدام `FOR UPDATE SKIP LOCKED`.

**المقابل:** تصبح PostgreSQL أيضاً طبقة تنسيق للمهام، ولذلك يجب مراقبة استخدام الاتصالات وقدرة العمال.

**الدليل:** [`ANALYTICS_PIPELINE.md`](./docs/case-studies/ANALYTICS_PIPELINE.md) · [`match-to-analytics.svg`](./assets/diagrams/match-to-analytics.svg)

### 3. تجربة هاتف مستقرة ثنائية الاتجاه

**المشكلة:** شاشة التسجيل كثيفة الإجراءات، وقد تجمع أسماء إنجليزية داخل واجهة عربية، وتعمل على أجهزة ذات Safe Areas مختلفة واتجاهي RTL/LTR.

**القرار:** ملكية واضحة للمساحات، وCSS Logical Properties، وواجهات واعية بالاتجاه، وتنسيق محلي للأرقام والنصوص، ومعالجة دورة حياة الهاتف عبر Ionic/Capacitor.

**المقابل:** التعريب وهندسة الشاشة يصبحان جزءاً من معمارية التطبيق ويحتاجان اختبارات Regression حقيقية.

**الدليل:** [`MOBILE_ENGINEERING.md`](./docs/case-studies/MOBILE_ENGINEERING.md)

### 4. سلامة البيانات والإصدارات

**المشكلة:** المباريات والتحليلات والمخطط والمصادقة وإصدارات تطبيق الهاتف تتغير بسرعات مختلفة.

**القرار:** إبقاء قواعد Backend هي المرجع، واستخدام المعاملات وIdempotency في الكتابات المهمة، والحفاظ على التاريخ عندما يلزم، وتصنيف تغييرات المخطط، ومنع العملاء غير المتوافقين عند الضرورة.

**المقابل:** التطور الآمن يحتاج سياسات وهجرات وانضباط إصدار أكبر من تطبيق CRUD بسيط.

**الدليل:** [`RELIABILITY.md`](./docs/case-studies/RELIABILITY.md) · [`RELEASE_ENGINEERING.md`](./docs/RELEASE_ENGINEERING.md)

---

## المعمارية

<p align="center">
  <img src="./assets/diagrams/system-architecture.svg" alt="معمارية جاهز: تطبيق الهاتف وAPI والعامل الخلفي وPostgreSQL" width="100%" />
</p>

على المستوى الأعلى يرسل تطبيق الهاتف أوامر المجال إلى API؛ يتحقق الخادم من الملكية وقواعد المباراة قبل حفظ الحالة المعاملاتية في PostgreSQL. يمكن للعامل الخلفي معالجة مهام التحليلات بشكل غير متزامن، بينما يقرأ العميل الحالة المعتمدة والتحليلات المشتقة عبر API.

يفصل التصميم عمداً بين صلاحيات نوع الحساب وبين منطق الخطط التجارية. على سبيل المثال، لا يجب أن تتحول خطة لاعب مدفوعة إلى طريقة للوصول إلى تدفقات الفرق الخاصة بالمدرب.

للتفاصيل راجع [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) وسجل القرارات في [`docs/ENGINEERING_DECISIONS.md`](./docs/ENGINEERING_DECISIONS.md).

---

## الاعتمادية والاختبارات والتسليم

يحتوي مستودع الإنتاج الخاص على التنفيذ الفعلي ومجموعات الاختبارات الآلية. هذا المستودع العام **لا يستخدم أعداد ملفات الاختبار أو الهجرات أو الـ commits أو أرقام latency أو نسب coverage المتغيرة كمقاييس تسويقية**.

تشمل استراتيجية التحقق:

- اختبارات وحدات للـ reducers والخدمات وقواعد المجال؛
- اختبارات تكامل API وقاعدة البيانات للملكية والمعاملات والتزامن؛
- تدفقات E2E للمسارات الحرجة في المباراة؛
- اختبارات Regression للعربية/الإنجليزية والأحجام المختلفة؛
- فحوصات Migration وRelease preflight؛
- Health/Readiness ومراقبة الإنتاج؛
- التحقق من توافق إصدارات تطبيق الهاتف.

التفاصيل: [`TESTING_AND_QUALITY.md`](./docs/TESTING_AND_QUALITY.md) · [`RELEASE_ENGINEERING.md`](./docs/RELEASE_ENGINEERING.md)

---

## وثائق التعمق

| الوثيقة | لماذا تقرأها؟ |
| --- | --- |
| [Engineering overview](./docs/ENGINEERING_OVERVIEW.md) | مقدمة تقنية سريعة |
| [System architecture](./docs/ARCHITECTURE.md) | حدود الأنظمة وتدفق البيانات |
| [Engineering decisions](./docs/ENGINEERING_DECISIONS.md) | المشكلة → القيد → القرار → المقابل → النتيجة |
| [Live match engine](./docs/case-studies/LIVE_MATCH_ENGINE.md) | الحالة التفاؤلية والترتيب والمصالحة وUndo |
| [Analytics pipeline](./docs/case-studies/ANALYTICS_PIPELINE.md) | Queue العمال والتجميع غير المتزامن |
| [Mobile engineering](./docs/case-studies/MOBILE_ENGINEERING.md) | Capacitor وSafe Areas وRTL/LTR ودورة الحياة |
| [Reliability](./docs/case-studies/RELIABILITY.md) | Idempotency والجلسات والمعاملات والاستعادة |
| [Testing and quality](./docs/TESTING_AND_QUALITY.md) | استراتيجية تحقق متعددة الطبقات |
| [Release engineering](./docs/RELEASE_ENGINEERING.md) | سلامة التسليم والهجرات |
| [Feature claim verification](./docs/FEATURE_CLAIM_VERIFICATION.md) | الفصل بين الحالي والمستقبلي |
| [Product screen gallery](./docs/PRODUCT_SCREEN_GALLERY.md) | فحص بصري أوسع |
| [Asset manifest](./docs/ASSET_MANIFEST.md) | غرض الأصول وحدود أمان النشر |

---

## عن المهندس

### Shawky Elsayed
**Software Engineer & Equity Partner — Jahiz Analytics**

[LinkedIn](https://www.linkedin.com/in/shawky-elsayed/) · [GitHub](https://github.com/shawky2002020) · [Portfolio](https://www.shawkyelsayed.com/)

---

## تنبيه تجاري وحدود المصدر

Jahiz Analytics منتج تجاري. الكود المصدري للتطبيق الإنتاجي، وإعدادات البنية التحتية الخاصة، وبيانات الاعتماد، وبيانات العملاء، والأسرار التشغيلية **غير منشورة هنا**.

هذا المستودع دراسة حالة عامة للمنتج والهندسة، ويحتوي على لقطات معقمة، ورسومات آمنة للنشر، ووثائق تقنية عالية المستوى. راجع [`NOTICE.md`](./NOTICE.md) و[`SECURITY.md`](./SECURITY.md) و[`docs/PRIVACY_AND_DATA_SAFETY.md`](./docs/PRIVACY_AND_DATA_SAFETY.md).

</div>
