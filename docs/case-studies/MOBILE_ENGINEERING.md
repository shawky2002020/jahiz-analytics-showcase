# Case Study: Cross-Platform Mobile Engineering & RTL Localization

## 1. Cross-Platform Native Architecture

Jahiz Analytics is delivered as a production cross-platform application on both **iOS** and **Android** using **Ionic 8** and **Capacitor 7** on top of **Angular 20**.

Rather than treating the mobile client as a wrapped website, the application is engineered to operate as a first-class mobile citizen:
- **Native Capacitor Plugins**: Direct integration with device hardware APIs:
  - `@capacitor/haptics`: Tactile feedback confirming point and penalty button presses without requiring the operator to look away from the mat.
  - `@capacitor/screen-orientation`: Locks appropriate orientation during active scoring.
  - `@capacitor/keyboard`: Adaptive viewport resizing during athlete profile creation and search.
  - `@capacitor/network`: Real-time connection status monitoring for optimistic state coordination.
  - `@capacitor/status-bar` & `@capacitor/splash-screen`: Seamless native launch and system bar theming.

---

## 2. Safe-Area & Viewport Geometry

Handheld mobile devices feature diverse physical constraints: notches, dynamic islands, rounded display corners, bottom gesture indicators, and camera cutouts.

### Explicit Safe-Area Inset Ownership
A common defect in hybrid mobile apps is double-padded safe areas (where both parent container and child component add safe insets) or clipped action buttons on compact screens.

Jahiz enforces strict single-point safe-area ownership:
- **Header Budget**: Top safe inset is owned exclusively by the header track.
- **Action Surface**: Lateral safe insets are owned by the root scorer shell.
- **Bottom Navigation**: Bottom safe inset is reserved for gesture pill clearance.
- **Scroll Ownership**: On constrained screen heights (e.g. 320×568 or 375×667), only the action grid scrolls; header, timer controls, and footer action buttons remain permanently pinned.

All touch targets strictly adhere to the **44×44 CSS pixel minimum requirement**, verified across viewport matrices from 320 px to 1024 px tablet devices.

---

## 3. Bilingual Internationalization & True RTL Layouts

Karate has a massive international footprint across both the Middle East and globally. Jahiz was built from day one with **first-class Arabic and English parity**.

```
LTR Layout (English)                 RTL Layout (Arabic)
┌──────────────────────────┐         ┌──────────────────────────┐
│ [Score: AKA] [Timer] [AO]│         │ [AO] [Timer] [Score: AKA]│
│                          │         │                          │
│ [Actions]        [Points]│         │ [Points]        [Actions]│
│                          │         │                          │
│ [End Match]        [Undo]│         │ [Undo]        [End Match]│
└──────────────────────────┘         └──────────────────────────┘
```

### True Bidirectional Layout Engine
Internationalization in Jahiz is an architectural concern, not simple string replacement:
- **Directional Flex & Grid Alignment**: Layouts invert dynamically based on document direction (`dir="rtl"` vs `dir="ltr"`).
- **Icon Mirroring**: Directional icons (arrows, chevrons, progression markers) invert automatically in RTL mode, while universal sports symbols retain their semantic orientation.
- **Mixed-Direction Content**: Athlete names frequently appear in Latin script while interface labels are in Arabic. Dedicated bidirectional CSS rules prevent punctuation jumping and text overlap.
- **Localized Numbers**: Numerical displays on scoreboards and statistics leverage a custom `ArabicNumbersPipe` to render Eastern Arabic numerals (`٠١٢٣٤٥٦٧٨٩`) consistently where culturally preferred.
- **Pre-Build Translation Audits**: Build scripts (`npm run i18n:check`) parse all templates to ensure zero hardcoded strings and 100% key parity between English and Arabic dictionaries.
