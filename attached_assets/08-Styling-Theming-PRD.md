# Code Buddy — Styling & Theming PRD  
*Version 1.0 • Scope: **CSS / SCSS**, **light & dark mode**, **design tokens***  

---

## 1. Purpose
Provide a **single, authoritative specification** for colours, typography, spacing, elevation and theme‑switching so that every Code Buddy screen renders **consistently** in both light and dark modes.

---

## 2. Scope
* Front‑end only (React @ `src/styles/`).
* Covers global tokens, component‑level rules and runtime theme switching.
* Excludes animation of application data (handled in feature PRDs).

---

## 3. Design Principles
| Principle | Implementation |
|-----------|----------------|
| **Token‑first** | All colours, sizes and motion values live as CSS custom properties. |
| **Mode‑agnostic components** | Components never hard‑code colours—only tokens that change across themes. |
| **AA accessibility** | Minimum 4.5 : 1 contrast for text; 3 : 1 for large text & icons. |
| **Progressive enhancement** | Uses Flex/Grid; graceful degradation through `@supports`. |
| **Reduced motion** | Disables transitions when users enable *Reduced Motion* in OS settings. |

---

## 4. Design Tokens

### 4.1 Colour Tokens  

| Token | Light value | Dark value | Usage |
|-------|-------------|------------|-------|
| `--cb-primary-500` | `#033F93` | `#033F93` | Brand/CTAs citeturn0file0 |
| `--cb-secondary-400` | `#B3D7F3` | `#044AAC` | Hovers, secondary buttons citeturn0file0 |
| `--cb-surface-100` | `#FFFFFF` | `#1E1E1E` | Card backgrounds citeturn0file0 |
| `--cb-canvas` | `#F7FCFF` | `#121212` | Page background citeturn0file0 |
| `--cb-line` | `#E5E5E5` | `#263544` | Dividers & borders |
| `--cb-text-high` | `#333333` | `#FFFFFF` | Headlines |
| `--cb-text-low` | `#647989` | `#808080` | Body copy |

> **Contrast audits**  
> *Primary on surface* → 7 : 1  
> *Text‑high on canvas* → 12 : 1  

### 4.2 Typography Tokens  

| Token | Font | Weight | Size / lh |
|-------|------|--------|-----------|
| `--cb-h1` | Inter | 700 | 32 / 40 px |
| `--cb-body` | Inter | 400 | 16 / 24 px |
| `--cb-code` | Fira Code | 400 | 14 / 22 px |
| `--cb-caption` | Inter | 400 | 12 / 18 px |

*Thaibev Sans New* is used in marketing headers as per design file but not in the app runtime citeturn0file0.

### 4.3 Spacing & Layout Tokens  

| Token | Value |
|-------|-------|
| `--cb-space-0` | 0 px |
| `--cb-space-1` | 4 px |
| `--cb-space-2` | 8 px |
| `--cb-space-3` | 16 px |
| `--cb-space-4` | 24 px |
| `--cb-space-5` | 32 px |
| `--cb-space-6` | 48 px |
| `--cb-space-7` | 64 px |

**Grid**:  
* Desktop ≥ 1440 px → 12‑col, 32 px margin, 24 px gutter citeturn0file0  
* Tablet (768–1023) → 8‑col, 24 px margin  
* Mobile (320–767) → 4‑col, 16 px margin  

### 4.4 Elevation & Shadow Tokens  

| Level | Shadow |
|-------|--------|
| `--cb-elev-1` | 0 1px 2px rgba(0,0,0,.05) |
| `--cb-elev-2` | 0 2px 4px rgba(0,0,0,.08) |
| `--cb-elev-3` | 0 4px 12px rgba(0,0,0,.12) |

---

## 5. Theme Specification

### 5.1 CSS Variable Maps

```scss
/* tokens/_colors.scss */
$light: (
  'primary-500': #033F93,
  'secondary-400': #B3D7F3,
  'surface-100': #FFFFFF,
  'canvas': #F7FCFF,
  'line': #E5E5E5,
  'text-high': #333333,
  'text-low': #647989,
);

$dark: (
  'primary-500': #033F93,
  'secondary-400': #044AAC,
  'surface-100': #1E1E1E,
  'canvas': #121212,
  'line': #263544,
  'text-high': #FFFFFF,
  'text-low': #808080,
);
```

### 5.2 DOM Injection

```scss
:root {
  --cb-mode: light;

  @each $k, $v in $light {
    --cb-#{$k}: #{$v};
  }
}

[data-theme='dark'] {
  --cb-mode: dark;

  @each $k, $v in $dark {
    --cb-#{$k}: #{$v};
  }
}
```

Theme toggle changes `data-theme` on `<body>` via `ThemeContext`.

### 5.3 Transition Rules
```css
body {
  background: var(--cb-canvas);
  color: var(--cb-text-high);
  transition: background-color .25s, color .25s;
}

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}
```

### 5.4 Persistence & Auto‑detect  
1. On first visit, set theme = `matchMedia('(prefers-color-scheme: dark)')`.  
2. Subsequent visits use `localStorage.theme`.  
3. Toggle action updates both `localStorage` and `<body data-theme>`.

---

## 6. Component Styling Guidelines

| Component | Key Tokens | Notes |
|-----------|------------|-------|
| **Button** | bg = `primary-500`; hover = shade(8 %); focus ring `2px primary-500` | Disabled → opacity .4, `cursor:not-allowed`. |
| **Sidebar** | width 56 px collapsed / 240 px expanded. Surface = `surface-100`; border‑right = `line`. Icons invert via `filter: invert(100%)` in dark mode. |
| **ChatMessage** | User bubble → `secondary-400`; AI bubble → `surface-100`; code block uses `vs2015` for dark, `github` for light. |
| **Card / Dashboard** | `border-radius: 16px; box-shadow: var(--cb-elev-2);`. |
| **Tag / Chip** | `background: tint(primary-500, 90%)` (light) or `shade(primary-500, 60%)` (dark). |

*(UI anatomy on pp. 5–6 of the design file) citeturn0file0*

---

## 7. Accessibility Requirements

1. **Contrast audit**: axe‑core passes on both modes.  
2. **Focus states**: visible on keyboard navigation (`:focus-visible`).  
3. **Theme toggle**: labelled “Toggle dark mode” (`aria-pressed`).  
4. **Reduced motion**: no transforms; opacity fades capped at 150 ms.

---

## 8. Testing & QA

| Layer | Tool | Coverage |
|-------|------|----------|
| Unit | Jest | Token functions (shade/tint). |
| Visual | Chromatic | Storybook snapshots in both themes. |
| E2E | Cypress | Toggle persists after reload; colour variables change. |
| Performance | Lighthouse | ≥ 90 score light & dark. |
| Accessibility | axe-core | 0 critical issues. |

---

## 9. Deliverables & Timeline

| Sprint | Deliverable |
|--------|-------------|
| S‑1 | Token SCSS files, global reset, typography. |
| S‑2 | Button, Card, Sidebar (light) → Storybook. |
| S‑3 | Dark‑theme map, toggle logic, visual regression baseline. |
| S‑4 | Remaining components + accessibility & performance audit. |

---

## 10. Appendix

### 10.1 File Structure  
```
src/
└─ styles/
   ├─ tokens/
   │  ├─ _colors.scss
   │  ├─ _spacing.scss
   │  └─ _typography.scss
   ├─ base/
   │  ├─ _reset.scss
   │  └─ _globals.scss
   ├─ components/
   │  ├─ Button.module.scss
   │  └─ ...
   └─ index.scss
```

### 10.2 Helper Functions (SCSS)
```scss
@function shade($color, $percent)   { @return mix(black, $color, $percent); }
@function tint($color, $percent)    { @return mix(white, $color, $percent); }
```

---

*End of document.*