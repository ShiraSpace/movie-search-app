# Movie Search App — Build Plan

Spec: `docs/superpowers/specs/2026-05-31-movie-search-app-design.md`
Mockup: `docs/mockup.html` ← **source of truth for all UI**

---

## Design System (strict — do not deviate)

All UI components must match the mockup exactly. Use CSS custom properties defined below; never hardcode raw color values.

### Color tokens (define in `globals.css`)

```css
:root {
  --bg: #0f0f13; /* page background */
  --surface: #18181f; /* cards, header, inputs */
  --surface-hover: #21212b; /* hover state for surface elements */
  --border: #2a2a36; /* all borders and dividers */
  --accent: #e2b04a; /* primary CTA, logo highlight, star rating */
  --accent-dim: rgba(226, 176, 74, 0.12); /* accent background tint */
  --text: #f0f0f5; /* primary text */
  --text-muted: #8888aa; /* secondary/placeholder text */
  --danger: #e05555; /* remove / destructive actions */
  --danger-dim: rgba(224, 85, 85, 0.12); /* danger background tint */
  --radius: 10px; /* standard border-radius */
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}
```

### Typography

- Font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- No custom font imports

### Component rules

| Element           | Rule                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| Header            | `background: var(--surface)`, `border-bottom: 1px solid var(--border)`, `height: 60px`, sticky         |
| Movie cards       | `background: var(--surface)`, hover lifts `translateY(-3px)` + `border-color: var(--accent)`           |
| Buttons — primary | `background: var(--accent)`, `color: #111`, `border-radius: var(--radius)`                             |
| Buttons — ghost   | `background: var(--surface)`, `border: 1px solid var(--border)`                                        |
| Buttons — danger  | `background: var(--danger-dim)`, `color: var(--danger)`, hover fills solid                             |
| Inputs            | `background: var(--surface)`, `border: 1px solid var(--border)`, focus → `border-color: var(--accent)` |
| Badges            | `background: var(--border)`, muted text; accent variant uses `var(--accent-dim)` + `var(--accent)`     |
| Loading skeleton  | shimmer gradient between `var(--border)` and `var(--surface-hover)`                                    |
| Empty state       | centered, icon at 40% opacity, muted subtext                                                           |

---

## Coding Standards (enforced throughout)

- **Constants**: every component gets a co-located `constants.ts` — test IDs and content strings live there; both the component and its test import from it
- **Tailwind CSS**: utility classes only, no inline `style={{}}` props; CSS variables via `bg-(--token)` shorthand; prefer scale values (`h-15`) over arbitrary values (`h-[60px]`)

---

## Phase 0 — Foundation ✅

- [x] Add ESLint + eslint-plugin-prettier, `eslint.config.mjs`
- [x] Add `OMDB_API_KEY` to `.env.local`, create `.env.example`
- [x] Create `src/db/watchlist.json` seeded as `[]`
- [x] Add Header + nav to `src/app/layout.tsx`
- [x] Set up testing library (`@testing-library/react`, `jest-dom`)
- [x] Header component with constants, tests, and Tailwind-only styling

## Phase 1 — Features (parallel)

### A: Movie Search ✅

- [x] Write failing test: `searchMovies()` returns results array
- [x] Implement `src/lib/omdb-client.ts` + `src/lib/movie-fetcher.ts`
- [x] Implement `src/app/api/search/route.ts`
- [x] Implement search page (`src/app/page.tsx`) + `SearchBar` + `MovieCard` + `SearchHero` + `SearchResults` + `useMovieSearch`
- [x] Run code review
- [x] Verify tests pass and actually check the flow
- [x] Verify in browser
- [x] Update plan
- [x] Commit, merge, push

### B: Movie Detail ✅

- [x] Write failing test: `getMovieById()` returns single movie
- [x] Run `npm test` — confirm it fails
- [x] Implement `src/lib/movie-detail.ts`
- [x] Run `npm test` — confirm it passes
- [x] Implement `src/app/api/movie/[id]/route.ts`
- [x] Implement `src/app/movie/[id]/page.tsx` composed of `MoviePoster`, `MovieBadges`, `MoviePlot`, `MovieCredits`
- [x] Verify tests pass and actually check the flow
- [x] Verify in browser
- [x] Update plan
- [ ] Commit, merge, push

### C: Watchlist

- [ ] Write failing test: add/remove/get persists correctly to JSON
- [ ] Run `npm test` — confirm it fails
- [ ] Implement `src/lib/watchlist.ts`
- [ ] Run `npm test` — confirm it passes
- [ ] Implement `src/app/api/watchlist/route.ts` + `src/app/api/watchlist/[id]/route.ts`
- [ ] Implement `src/app/watchlist/page.tsx`
- [ ] Add `WatchlistButton` to movie detail page (depends on C being complete)
- [ ] Run code review
- [ ] Verify tests pass and actually check the flow
- [ ] Verify in browser
- [ ] Update plan
- [ ] Commit, merge, push

## Phase 2 — Wire & Finish

- [ ] MovieCard links to `/movie/[id]`
- [ ] WatchlistButton calls watchlist API
- [ ] Fill in README (assumptions + setup)
- [ ] Final browser check
