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

- **Constants**: every component gets a co-located `constants.ts` — test IDs and content strings live there; both the
  component and its test import from it
- **Tailwind CSS**: utility classes only, no inline `style={{}}` props; CSS variables via `bg-(--token)` shorthand;
  prefer scale values (`h-15`) over arbitrary values (`h-[60px]`)

## Phase 0 — Foundation

- [ ] Add ESLint + eslint-plugin-prettier, create `.eslintrc`
- [ ] Add `OMDB_API_KEY` to `.env.local`, create `.env.example`
- [ ] Create `src/db/watchlist.json` seeded as `[]`
- [ ] Add minimal Header + nav to `src/app/layout.tsx`

## Phase 1 — Features (parallel)

### A: Movie Search

- [ ] Write failing test: `searchMovies()` returns results array
- [ ] Implement `src/lib/omdb-client.ts` + `src/lib/movie-fetcher.ts`
- [ ] Implement `src/app/api/search/route.ts`
- [ ] Implement search page (`src/app/page.tsx`) + `SearchBar` + `MovieCard`
- [ ] Verify in browser, commit

### B: Movie Detail

- [ ] Write failing test: `getMovieById()` returns single movie
- [ ] Implement `src/app/api/movie/[id]/route.ts`
- [ ] Implement `src/app/movie/[id]/page.tsx` + `WatchlistButton`
- [ ] Verify in browser, commit

### C: Watchlist

- [ ] Write failing test: add/remove/get persists correctly to JSON
- [ ] Implement `src/lib/watchlist.ts`
- [ ] Implement `src/app/api/watchlist/route.ts` + `src/app/api/watchlist/[id]/route.ts`
- [ ] Implement `src/app/watchlist/page.tsx`
- [ ] Verify in browser, commit

## Phase 2 — Wire & Finish

- [ ] MovieCard links to `/movie/[id]`
- [ ] WatchlistButton calls watchlist API
- [ ] Fill in README (assumptions + setup)
- [ ] Final browser check
