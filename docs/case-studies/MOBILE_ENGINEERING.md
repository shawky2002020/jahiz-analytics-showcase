# Case study: cross-platform mobile engineering and RTL/LTR

## Problem

Jahiz is one product across iOS and Android, but live scoring has stricter interaction constraints than a typical content screen. Device safe areas, keyboards, app lifecycle, network state and Arabic/English direction can all affect the same control surface.

## Constraints

- compact phones and larger mobile/tablet layouts;
- notches, gesture areas and safe-area insets;
- Arabic RTL and English LTR;
- mixed-direction athlete names and sports terminology;
- app background/foreground transitions;
- native feedback and network/device APIs where useful.

## Decision

### Cross-platform shell

Angular/Ionic provides the application UI and navigation model, while Capacitor bridges native runtime concerns. Native plugins are used selectively for capabilities such as device lifecycle/network state, haptics, keyboard/safe-area behavior or other platform integrations used by the product.

### Safe-area ownership

Safe-area padding is owned deliberately rather than being added independently by nested components. Live-match regions define which layer owns header, lateral and bottom insets so controls are less likely to be clipped or double-padded.

### RTL/LTR as layout architecture

Direction is treated as a layout input:

- CSS logical properties are preferred over duplicated left/right rules;
- directional icons and alignment respond to `dir`;
- mixed Arabic/Latin content is handled explicitly where needed;
- localized numeric/text formatting is applied at the presentation layer rather than mutating domain values.

### Regression across languages and geometry

Critical views are exercised in both directions and across representative viewport classes. The objective is behavioral parity: the same domain action should remain understandable and reachable even when layout direction changes.

## Tradeoffs

- hybrid mobile still requires platform-specific testing;
- logical CSS and direction-aware components need discipline across every feature;
- safe-area ownership and keyboard behavior can regress when layout responsibilities are unclear.

## Result

One application codebase can deliver the same match/domain workflows across iOS and Android while treating Arabic and English as first-class presentation modes rather than separate products.

Related: [Testing and quality](../TESTING_AND_QUALITY.md).
