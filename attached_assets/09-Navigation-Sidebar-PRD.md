# Code Buddy — Navigation & Sidebar Refinement PRD  
*Version 1.0 • April 2025*

---

## 1 . Background  
The current layout raises two UX issues:

| Issue | Impact |
|-------|--------|
| “AI Portal Home” wording implies a multi‑app hub, confusing users who are already inside Code Buddy. | Perception/UX friction |
| Fixed‑width sidebar + opaque active highlight hides link text and wastes space on small screens. | Usability & accessibility |

The Figma design (Design System pp. 3 – 6) provides clear guidance: a dedicated **Code Buddy Home** landing and a collapsible sidebar with translucent active state. citeturn0file0

---

## 2 . Objectives  

1. Rename the landing view to **“Code Buddy Home.”**  
2. Implement **expandable / collapsible sidebar** that matches design specs.  
3. Apply **semi‑transparent active highlight** so text remains legible in light & dark.  
4. Maintain full **theme parity** using approved design tokens.

---

## 3 . Scope  

| In‑scope | Out‑of‑scope |
|----------|--------------|
| Landing‑page label, breadcrumb and `<title>` updates. | UI copy outside Code Buddy scope |
| Sidebar refactor (state mgmt, CSS, tokens). | Core feature logic (Chat, Optimize, Score) |
| Accessibility & responsive adjustments. | Backend or API changes |

---

## 4 . User Stories  

| ID | Story | Priority |
|----|-------|----------|
| **H‑01** | As a user, I want to see **“Code Buddy Home”** so it’s clear I’m still in one product. | P0 |
| **S‑02** | As a user, I can **collapse the sidebar** to icons only and expand it on demand. | P0 |
| **S‑03** | As a user, I can still read the active menu item text even when highlighted. | P0 |
| **A‑04** | As a keyboard user, I can toggle the sidebar and navigate with visible focus. | P1 |

---

## 5 . Functional Requirements  

### 5.1 Landing‑Page Label  

| Ref | Requirement |
|-----|-------------|
| **FR‑1.1** | Heading text, breadcrumb, and document `<title>` become **“Code Buddy Home.”** |
| **FR‑1.2** | Sidebar top item remains highlighted (Chat) when a user navigates there; Home is accessible via `/home`. |
| **FR‑1.3** | All previous “AI Portal Home” literals are removed from the codebase. |

### 5.2 Sidebar Expand / Collapse  

* **FR‑2.1** Expanded width 240 px; collapsed width 56 px.  
* **FR‑2.2** Toggle button in sidebar header rotates (`.25 s`) and stores state in `localStorage.sidebarState`.  
* **FR‑2.3** Hover (≥ 600 ms) or `Ctrl + \` triggers expansion.  
* **FR‑2.4** Collapsed icons show tooltips (`aria-label`) on hover/focus.

### 5.3 Active‑State Styling  

| Token | Light value | Dark value | Usage |
|-------|-------------|------------|-------|
| `--cb-sidebar-active-bg` | `rgba(3, 63, 147, 0.12)` | `rgba(3, 63, 147, 0.24)` | Active item background |
| Text/icon | `--cb-text-high` | identical | Maintains ≥ 4.5 : 1 contrast |

* **FR‑3.1** Text never changes opacity; highlight is background‑only.  
* **FR‑3.2** Focus outline: `2 px` `--cb-primary-500`, offset 2 px.  
* **FR‑3.3** Hover state = active‑bg ×1.25 opacity (max 24 %).  

---

## 6 . Non‑Functional Requirements  

| Category | Requirement |
|----------|-------------|
| **Performance** | Sidebar toggle repaint ≤ 50 ms; added code < 3 KB gzip |
| **Accessibility** | All colour pairs AA; `aria-expanded` on toggle; tooltips for icon‑only view |
| **Responsiveness** | Sidebar auto‑collapses below 768 px but may re‑expand as overlay |
| **Browser** | Latest +1 versions of Chrome, Edge, Firefox, Safari |

---

## 7 . Design Guidelines  

```scss
:root {
  --cb-sidebar-width: 240px;
  --cb-sidebar-width-collapsed: 56px;
  --cb-sidebar-active-bg: rgba(3, 63, 147, 0.12); /* light */
}
[data-theme='dark'] {
  --cb-sidebar-active-bg: rgba(3, 63, 147, 0.24); /* dark */
}

.sidebar {
  width: var(--cb-sidebar-width);
  &--collapsed { width: var(--cb-sidebar-width-collapsed); }
}

.sidebar__item--active {
  background: var(--cb-sidebar-active-bg);
  color: var(--cb-text-high);
}
```

**Toggle button**

```jsx
<button
  className="sidebar__toggle"
  aria-label="Collapse sidebar"
  aria-expanded={!collapsed}
  onClick={toggleSidebar}
>
  {collapsed ? '»' : '«'}
</button>
```

---

## 8 . Acceptance Criteria  

1. **Label update** — “Code Buddy Home” appears in heading, breadcrumb, and `<title>` in both themes.  
2. Sidebar collapses/expands via click, hover, and `Ctrl + \`; state persists after refresh.  
3. Active sidebar item highlight is translucent; text/icon colour meets AA contrast.  
4. Keyboard focus visible on toggle and menu items; axe‑core → 0 critical issues.  
5. Visual diff against Figma ≤ 2 px for expanded & collapsed sidebars.  

---

## 9 . Implementation Plan  

| Sprint | Task | Owner |
|--------|------|-------|
| **S‑1** | Replace label strings, update breadcrumb logic, set `/home` route. | FE Team A |
| **S‑1** | Build sidebar state context, localStorage hook. | FE Team A |
| **S‑2** | Implement CSS for collapsed/expanded modes; motion & hover. | FE Team B |
| **S‑2** | Add `--cb-sidebar-active-bg` tokens to both themes. | Design Systems |
| **S‑3** | Keyboard shortcut & ARIA; axe‑core & Lighthouse audits. | FE Team A / QA |
| **S‑4** | Stakeholder review, UAT, prod deploy. | PM |

---

## 10 . Risks & Mitigations  

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Hard‑coded colours re‑emerge in legacy components. | Inconsistent highlight | ESLint/stylelint rule blocking non‑token colours |
| Shortcut conflicts with IDE shortcuts. | Frustration | Allow remap in **Preferences → Keyboard** |

---

## 11 . References  

* **Code Buddy Design System** – colour & sidebar spec pp. 3 – 6 citeturn0file0  
* **Styling & Theming PRD** – token catalogue (April 2025)

---

*Prepared by:* Product / UX • **Digital Product Experience**  
*Last updated:* 18 Apr 2025
