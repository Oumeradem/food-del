# Design Tokens Reference Guide

## Color Palette

### Primary Brand Colors
```css
--primary: #ff5c35;           /* Main orange */
--primary-dark: #e84a24;      /* Darker for hover/gradients */
--primary-soft: #fff1ec;      /* Light background */
```

### Text Colors
```css
--text: #2d2d2d;              /* Body text */
--text-strong: #1a1a1a;       /* Headings */
--text-muted: #6b7280;        /* Secondary text */
--text-faint: #9ca3af;        /* Subtle text */
```

### Neutral Colors
```css
--border: #e7e7e7;            /* Borders, dividers */
--surface: #ffffff;           /* Primary background */
--surface-alt: #fafafa;       /* Secondary background */
--success: #22c55e;           /* Success states */
--danger: #ef4444;            /* Error/delete states */
```

---

## Typography Scale

```css
--font-display: 2.6rem;       /* Hero titles */
--font-h1: 2rem;              /* Page titles */
--font-h2: 1.5rem;            /* Section headings */
--font-h3: 1.25rem;           /* Subheadings */
--font-base: 1rem;            /* Body text */
--font-small: 0.875rem;       /* Labels, captions */
```

---

## Spacing Scale

```css
--space-xs: 4px;              /* Micro spacing */
--space-sm: 8px;              /* Small spacing */
--space-md: 16px;             /* Standard spacing */
--space-lg: 24px;             /* Large spacing */
--space-xl: 40px;             /* Extra large spacing */
```

---

## Border Radius System

```css
--radius-sm: 8px;             /* Inputs, small buttons */
--radius-md: 14px;            /* Cards, components */
--radius-lg: 20px;            /* Hero, modals */
--radius-full: 999px;         /* Circular, pills */
```

---

## Shadow System

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
--shadow-md: 0 6px 20px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);
--shadow-primary: 0 8px 20px rgba(255, 92, 53, 0.28);
```

---

## Motion & Animation

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

1. **Replace hardcoded colors** with CSS variables
2. **Use typography scale** for all font-sizes
3. **Use spacing scale** for padding/margin/gap
4. **Add hover states** on all interactive elements
5. **Use gradients** for primary buttons
6. **Implement transitions** for state changes
7. **Add focus states** for accessibility
8. **Use shadows** for elevation/depth

---

Last Updated: September 6, 2026