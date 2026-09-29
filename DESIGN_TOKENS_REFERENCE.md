# Design Tokens Reference

This document defines the design tokens used across the Tomato food delivery app — the single source of truth for colors, typography, spacing, radii, shadows, and motion.

---

## Color Palette

### Primary Brand Colors

```css
--primary: #ff5c35;        /* Main orange */
--primary-dark: #e84a24;   /* Hover and gradients */
--primary-soft: #fff1ec;   /* Light background */
```

### Text Colors

```css
--text: #2d2d2d;           /* Body text */
--text-strong: #1a1a1a;    /* Headings */
--text-muted: #6b7280;     /* Secondary text */
--text-faint: #9ca3af;     /* Subtle text */
```

### Neutral Colors

```css
--border: #e7e7e7;         /* Borders and dividers */
--surface: #ffffff;        /* Primary background */
--surface-alt: #fafafa;    /* Secondary background */
--success: #22c55e;        /* Success states */
--danger: #ef4444;         /* Error and delete states */
```

---

## Typography Scale

```css
--font-display: 2.6rem;    /* Hero titles */
--font-h1: 2rem;           /* Page titles */
--font-h2: 1.5rem;         /* Section headings */
--font-h3: 1.25rem;        /* Subheadings */
--font-base: 1rem;         /* Body text */
--font-small: 0.875rem;    /* Labels and captions */
```

---

## Spacing Scale

```css
--space-xs: 4px;           /* Micro spacing */
--space-sm: 8px;           /* Small spacing */
--space-md: 16px;          /* Standard spacing */
--space-lg: 24px;          /* Large spacing */
--space-xl: 40px;          /* Extra large spacing */
```

---

## Border Radius

```css
--radius-sm: 8px;          /* Inputs and small buttons */
--radius-md: 14px;         /* Cards and components */
--radius-lg: 20px;         /* Hero and modals */
--radius-full: 999px;      /* Circular and pills */
```

---

## Shadows

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
--shadow-md: 0 6px 20px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);
--shadow-primary: 0 8px 20px rgba(255, 92, 53, 0.28);
```

---

## Motion and Animation

```css
--ease: cubic-bezier(0.4, 0, 0.2, 1);
--speed: 0.25s;
```

### Keyframes

```css
@keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes fadeUp { 0% { opacity: 0; transform: translateY(16px); } }
@keyframes scaleIn { 0% { opacity: 0; transform: scale(0.96); } }
```

---

## Best Practices

1. Replace hardcoded colors with CSS variables.
2. Use the typography scale for all font sizes.
3. Use the spacing scale for padding, margins, and gaps.
4. Add hover states to all interactive elements.
5. Use gradients for primary buttons.
6. Implement transitions for state changes.
7. Add focus states for accessibility.
8. Use shadows to convey elevation and depth.

---

_Last updated: September 6, 2026_
