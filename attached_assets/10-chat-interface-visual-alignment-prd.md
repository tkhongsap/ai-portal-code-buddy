# Code Buddy — Chat Assistant **Visual Alignment PRD**
*Version 0.6 • 20 Apr 2025*

---

## 1. Overview
The functional Chat Assistant is live, but the **visual layer** diverges from the latest Figma reference (screens on p. 8–10 of the design system).  
This PRD defines **UI‑only deltas** required to harmonise the live build with design without altering underlying business logic, APIs, or state management.

---

## 2. Goals & Success Metrics

| # | Goal | Metric |
|---|------|--------|
| **G‑1** | Achieve pixel‑accurate layout parity with Figma (light & dark). | ≤ 4 px pixel‑diff in Percy/Chromatic snapshots. |
| **G‑2** | Replace hard‑coded values with design‑token variables. | Style‑lint rule `design‑token/no-raw-colors` passes. |
| **G‑3** | Maintain 100 % passing rate on existing e2e + unit suites. | CI pipeline green after merge. |

---

## 3. Scope

### 3.1 In‑scope
* Chat landing header, input card, developer‑tips carousel, sidebar highlight.
* New/updated design‑token variables.
* Responsive behaviour updates.

### 3.2 Out‑of‑scope
* Chat business logic, message sending, code‑block behaviour.
* Search‑bar feature revamp (future epic).
* Any back‑end or API change.

---

## 4. Visual Specifications

### 4.1 *Mini Header*

| Property | Spec |
|----------|------|
| Height | **48 px** |
| Left content | _None_ (remove search bar) |
| Right content | Theme toggle (🌙/☀️) `aria-label="Toggle theme"`, Profile avatar button |
| Background | `transparent` (inherits `--cb-canvas`) |

### 4.2 Title Block

| Element | Token | Light & Dark |
|---------|-------|--------------|
| Title | `--cb-chat-title-font-size` | 24 / 32 px, Inter 700 |
| Subtitle | N/A | 14 / 20 px, Inter 400, `--cb-text-low` |
| Position | – | Centered, max‑width **720 px**, margin‑top 64 px |

### 4.3 Message Input Card

| Attribute | Value |
|-----------|-------|
| Container width | `clamp(520px, 60vw, 840px)` |
| Bg token | `--cb-chat-card-bg` (`tint` 97 % / `shade` 92 %) |
| Border | 1 px solid `--cb-line`; radius **20 px** |
| Padding | 32 px (top/bottom) × 24 px (sides) |
| Send button | 40 × 40 px, radius 12 px, bg `--cb-primary-500`; inside card right edge |
| Pill buttons | 32 px height, radius 12 px, bg `--cb-secondary-400@20%`, text `--cb-primary-500` |

### 4.4 Sidebar

| Spec | Value |
|------|-------|
| Expanded width | **256 px** |
| Collapsed width | 56 px |
| Active bg | `--cb-sidebar-active-bg` = `rgba(3,63,147,.12/.24)` |
| Section label style | Inter 600, 0.75 rem, uppercase, letter‑spacing 0.05 em |

### 4.5 Developer Tips Carousel

| Parameter | Spec |
|-----------|------|
| Max‑width | 90 % of viewport |
| Card bg | `--cb-surface-100` |
| Radius | 16 px |
| Nav controls | centre bottom, icons ‹ ›, 40 px touch target |

---

## 5. Token Additions

```scss
/* tokens/_chat.scss */
$light-chat: (
  'chat-card-bg': rgba(3, 63, 147, .03),
  'chat-title-font-size': 24px,
);
$dark-chat: (
  'chat-card-bg': rgba(3, 63, 147, .08),
  'chat-title-font-size': 24px,
);
```
Import into `index.scss` and auto‑generate CSS custom properties.

---

## 6. Component Refactors

| Component | Required Change |
|-----------|-----------------|
| `ChatHeader.jsx` | Remove `<SearchBar>`; inject `<TitleBlock>`; adjust grid rows. |
| `MessageInput.jsx` | Wrap in `.input-card`; apply new bg/radius; reposition send btn. |
| `Sidebar.jsx` | Update width & active bg tokens; ensure collapsed tooltips. |
| `DeveloperTipsCarousel.jsx` | Constrain width, apply radius; adjust nav controls. |
| Global | Wrap landing body with `.chat-landing` BEM root; shift legacy margins to grid gaps. |

---

## 7. Responsive Rules

* \< 420 px → input card width 96 %, padding 20 / 16 px, pills wrap.  
* 768–1023 → sidebar collapsed by default, toggled via hamburger.  
* ≥ 1440 px → title block margin‑top 96 px.

---

## 8. Accessibility

* Tokens verified AA contrast.  
* Send button retains `aria-label`.  
* Sidebar toggle has `aria-expanded`.  
* Keyboard shortcut `Ctrl + \` maintained.

---

## 9. Acceptance Criteria

1. Landing layout ≤ 4 px diff versus Figma on light & dark.  
2. Send button inside card works; no errors.  
3. Sidebar highlight translucent, passes axe contrast.  
4. Search bar removed; header icons tabbable.  
5. All e2e, unit, Chromatic tests green.

---

## 10. Timeline

| Day | Deliverable |
|-----|-------------|
| D0 | Token PR merged |
| D1–2 | Header & title refactor |
| D3–4 | Input card styling |
| D5–6 | Sidebar CSS & tokens |
| D7 | Carousel polish & dark theme QA |
| D8 | Chromatic, axe, Lighthouse |
| D9 | Review & merge |
| D10 | QA & staging deploy |

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| CSS cascade issues | Namespace with `.chat-landing` |
| Theme mismatch | Jest‑axe contrast test in CI |
| Send btn focus loss | Add ref tests |

---

*Prepared by* **UI Guild – Code Buddy**  
*20 Apr 2025*
