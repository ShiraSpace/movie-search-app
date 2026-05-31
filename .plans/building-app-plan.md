# Movie Search App — Build Plan

Spec: `docs/superpowers/specs/2026-05-31-movie-search-app-design.md`

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
