---
name: react-wcag-responsive-rubric
description: Use this skill when creating or modifying React UI so Codex follows WCAG accessibility and responsive design rules during implementation, without refactoring unrelated existing code.
---

# React WCAG + Responsive Design Guidelines

Use this skill as implementation guidance for React frontend work.

The goal is to make new or modified UI code accessible, responsive, keyboard-friendly, and visually consistent.

Important:

* Follow these rules when creating new components, pages, forms, layouts, navigation, cards, buttons, or interactions.
* Do not scan and refactor the whole project unless the user explicitly asks.
* Do not rewrite unrelated existing components only to improve style or accessibility.
* Apply these rules only to files and components touched by the current task.
* If existing code has issues outside the requested scope, mention them briefly as recommendations instead of fixing them automatically.
* Keep the app simple.
* Avoid adding features that were not requested.

---

# Preferred stack

Use the existing project stack if it is already configured.

If choices are needed, prefer:

* React
* TypeScript
* Vite
* React Router
* MUI
* React Hook Form
* Zod
* Zustand or Context API
* CSS transitions or Framer Motion

Do not add new dependencies unless they are useful for the requested task.

---

# Accessibility — WCAG

## 1. Semantic HTML, aria-labels, roles

Use semantic HTML whenever possible:

* `header`
* `nav`
* `main`
* `section`
* `article`
* `aside`
* `footer`
* `form`
* `button`

Rules:

* Page content should be inside one clear `<main>`.
* Navigation should use `<nav aria-label="Główna nawigacja">`.
* Use real `<button>` elements for actions.
* Use links or `NavLink` for navigation.
* Do not create clickable `div` or `span` elements.
* Icon-only buttons must have an `aria-label`.
* Inputs must have accessible labels.
* Error messages should be visible near the related field.
* Use `role="alert"` for validation and error messages.
* Use `aria-live="polite"` for success or async status messages.
* Do not add unnecessary ARIA when semantic HTML already solves the problem.

Examples:

```tsx
<nav aria-label="Główna nawigacja">
  ...
</nav>
```

```tsx
<button type="button" aria-label="Usuń zadanie">
  <DeleteIcon />
</button>
```

```tsx
<p role="alert">Tytuł jest wymagany</p>
```

---

## 2. Color contrast AA

Use colors that meet WCAG AA contrast.

Rules:

* Normal text should have at least 4.5:1 contrast.
* Do not use very light gray text on white.
* Do not use pale blue text on light blue background.
* Do not communicate status only by color.
* Statuses should use text labels together with color.
* Error messages must be readable.
* Focus indicators must be clearly visible.

Preferred ocean blue palette:

```ts
export const colors = {
  primary: "#0277BD",
  primaryDark: "#01579B",
  primaryLight: "#E1F5FE",
  accent: "#00838F",
  background: "#F5FBFF",
  surface: "#FFFFFF",
  textPrimary: "#0F172A",
  textSecondary: "#334155",
  border: "#B7D7EA",
  error: "#C62828",
  success: "#00695C",
  warning: "#8A5A00",
};
```

Avoid:

```txt
#B0BEC5 on white
#81D4FA on #E1F5FE
light gray text on white
pale blue text on white
```

---

## 3. Keyboard navigation and visible focus

The app must be usable with keyboard only.

Check:

* User can navigate with `Tab`.
* User can go backwards with `Shift + Tab`.
* Buttons, links, inputs, selects, checkboxes, dialogs, and menus are reachable.
* Focus order follows the visual order.
* Focus is visible on every interactive element.
* Forms can be submitted with keyboard.
* Dialogs can be closed with `Escape` if dialogs are used.

Do not remove `outline` unless replacing it with a visible focus style.

Recommended custom focus style:

```css
:focus-visible {
  outline: 3px solid #01579B;
  outline-offset: 3px;
}
```

For MUI components, preserve default focus behavior or add visible focus styling through theme overrides.

---

## 4. Lighthouse / AXE readiness

When adding or modifying UI, avoid common accessibility issues:

* missing input labels
* missing button names
* low contrast
* incorrect heading order
* empty links
* clickable non-interactive elements
* missing `alt` text for meaningful images
* forms without visible error messages
* hidden focus styles

If commands are available, run:

```bash
npm run build
npm run lint
```

If Lighthouse or AXE is available, the modified UI should not introduce critical accessibility errors.

---

# Responsive Design

## 1. Mobile and desktop support

The app must work on:

* mobile: 360px–430px
* tablet: around 768px
* desktop: 1024px+

Rules:

* No unwanted horizontal scroll.
* Content must fit the viewport.
* Forms must be readable on mobile.
* Buttons must be easy to tap.
* Cards and lists should stack naturally on mobile.
* Desktop can use sidebar or multi-column layout.
* Navigation must be usable on mobile and desktop.
* Kanban columns may scroll horizontally on mobile only if it is intentional and usable.

---

## 2. Breakpoints

Use at least 2 breakpoints when implementing layout.

For MUI, prefer responsive `sx` values:

```tsx
sx={{
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    md: "280px 1fr",
    lg: "300px 1fr",
  },
  gap: {
    xs: 2,
    md: 3,
  },
}}
```

Recommended responsive patterns:

Mobile:

* single-column layout
* top app bar or bottom navigation
* cards stacked vertically
* compact spacing

Tablet:

* wider cards
* optional two-column content
* medium spacing

Desktop:

* sidebar + main content
* Kanban columns side by side
* larger spacing

---

## 3. Layout quality and consistency

Keep layout clean and coherent.

Rules:

* Use consistent spacing.
* Use consistent border radius.
* Use consistent card styles.
* Use one visual language.
* Use readable font sizes.
* Avoid unnecessary UI elements.
* Keep headings clear.
* Make empty, loading, success, and error states visually clear.

Recommended spacing:

```txt
mobile page padding: 16px
desktop page padding: 24px–32px
card padding: 16px–24px
gap between cards: 12px–16px
border radius: 12px–16px
```

---

# React implementation rules

When creating or modifying React UI:

* Do not keep the whole app in `App.tsx`.
* Split UI into reusable components.
* Keep page components focused on composition and data flow.
* Avoid repeated JSX.
* Avoid prop drilling if global state already exists.
* Use clear component names.
* Keep code simple and readable.
* Do not add unrelated features.

Recommended components:

```txt
src/
  components/
    AppLayout.tsx
    Navigation.tsx
    PageHeader.tsx
    LoadingState.tsx
    ErrorState.tsx
    EmptyState.tsx

  features/
    tasks/
      components/
        TaskCard.tsx
        TaskForm.tsx
        BoardColumn.tsx
        TaskStatusBadge.tsx
      pages/
        TasksPage.tsx
        NewTaskPage.tsx
        TaskDetailsPage.tsx
```

---

# Forms

When creating forms:

* Use visible labels.
* Show validation errors near fields.
* Use readable error messages in Polish if the UI is Polish.
* Use React Hook Form and Zod if available.
* Disable submit button while saving.
* Show success or error feedback after submit.

Example validation messages:

```txt
Tytuł jest wymagany
Tytuł musi mieć co najmniej 3 znaki
Wybierz status zadania
Nie udało się zapisać zadania
```

---

# Loading, success, error, empty states

When implementing async UI:

* Show loading state while data is loading.
* Show error state when request fails.
* Show success message after successful create/update/delete.
* Show empty state when there is no data.
* Do not only log errors to console.

Recommended components:

```txt
LoadingState
ErrorState
EmptyState
```

Recommended messages:

```txt
Ładowanie zadań...
Nie udało się pobrać zadań.
Zadanie zostało zapisane.
Brak zadań do wyświetlenia.
```

---

# Microinteractions

Use subtle visual feedback.

Examples:

* button hover state
* card hover state
* visible focus state
* loading spinner
* success snackbar
* error alert
* simple page fade-in
* smooth card transition

Use:

* CSS transitions
* MUI transitions
* Framer Motion only if already installed or useful

Avoid distracting animations.

---

# Final implementation checklist

Before finishing a task, check only the new or modified code:

* Uses semantic HTML where possible.
* Has one clear `<main>` if page layout is touched.
* Navigation uses semantic `<nav>` if navigation is touched.
* Buttons have accessible names.
* Icon-only buttons have `aria-label`.
* Inputs have labels.
* Errors are visible to the user.
* Error messages use `role="alert"` where appropriate.
* Text contrast is likely WCAG AA.
* Focus is visible.
* Keyboard navigation is preserved.
* No new clickable divs are introduced.
* Layout works on mobile, tablet, and desktop.
* At least 2 breakpoints are used for new responsive layouts.
* There is no unwanted horizontal overflow.
* Spacing and layout are consistent.
* Loading, empty, success, and error states are visible when async behavior is added.
* Build and lint pass if commands are available.

If a problem is outside the requested scope, do not fix it automatically. Mention it briefly as a recommendation.

---

# Response style

When reporting completed work, keep the answer concise.

Use this structure:

1. What was added or changed
2. Which requirements are covered
3. How to run or test it
4. Any recommendations outside the requested scope

Do not provide long theoretical explanations unless the user asks for them.
