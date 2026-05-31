# Movie Search App — Design Spec

Date: 2026-05-31
Brief: Take-home interview, 2-hour time limit

---

## Goal

A minimal multi-page web app where a user can search for movies, view details, and manage a personal watchlist. Strictly scoped to the requirements — no extra features.

---

## Pages & Routing

| Route         | File                          | Purpose                                    |
| ------------- | ----------------------------- | ------------------------------------------ |
| `/`           | `src/app/page.tsx`            | Search bar + results grid                  |
| `/movie/[id]` | `src/app/movie/[id]/page.tsx` | Movie detail + add/remove watchlist button |
| `/watchlist`  | `src/app/watchlist/page.tsx`  | Saved movies list with remove buttons      |

A minimal header (site title link + Watchlist nav link) lives in `src/app/layout.tsx` and appears on every page.

---

## API Routes

| Route                 | Method | Purpose                                          |
| --------------------- | ------ | ------------------------------------------------ |
| `/api/search?q=`      | GET    | Proxies OMDB `?s=` search, returns results array |
| `/api/movie/[id]`     | GET    | Proxies OMDB `?i=` detail, returns single movie  |
| `/api/watchlist`      | GET    | Returns contents of `src/db/watchlist.json`      |
| `/api/watchlist`      | POST   | Appends a movie to the JSON file                 |
| `/api/watchlist/[id]` | DELETE | Removes a movie by IMDB ID from the JSON file    |

Routes are thin: validate input → call `src/lib` function → return JSON.

---

## Library & Data Layer

**`src/lib/omdb.ts`**

- `searchMovies(query: string)` — OMDB `?s=query`, returns array of results
- `getMovieById(id: string)` — OMDB `?i=id`, returns single movie object

**`src/lib/watchlist.ts`**

- `getWatchlist()` — reads and parses `src/db/watchlist.json`
- `addToWatchlist(movie)` — appends entry, writes file
- `removeFromWatchlist(id: string)` — filters out by IMDB ID, writes file

**`src/db/watchlist.json`** — starts as `[]`. Stores minimal shape: `{ imdbID, Title, Year, Poster }`.

**Environment**

- `OMDB_API_KEY` stored in `.env.local` (never committed)
- `.env.example` ships with the repo (key name, empty value)

---

## Components

| Component         | File                                 | Purpose                                      |
| ----------------- | ------------------------------------ | -------------------------------------------- |
| `Header`          | `src/components/Header.tsx`          | Site title + Watchlist nav link              |
| `SearchBar`       | `src/components/SearchBar.tsx`       | Controlled input + submit                    |
| `MovieCard`       | `src/components/MovieCard.tsx`       | Poster, title, year — links to `/movie/[id]` |
| `WatchlistButton` | `src/components/WatchlistButton.tsx` | Add/Remove toggle on detail page             |

---

## Build Order

### Phase 0 — Foundation (~15 min, sequential)

- Add `OMDB_API_KEY` to `.env.local`, create `.env.example`
- Seed `src/db/watchlist.json` as `[]`
- Layout + minimal Header in `src/app/layout.tsx`

### Phase 1 — Three parallel features (~90 min)

Each feature follows: **design → failing test → implement (lib → route → UI) → verify in browser → commit**

| Feature             | Failing test                              | Scope                                                      |
| ------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| **A: Movie Search** | `searchMovies()` returns array from OMDB  | `src/lib/omdb.ts` + `/api/search` + search page            |
| **B: Movie Detail** | `getMovieById()` returns single movie     | `src/lib/omdb.ts` + `/api/movie/[id]` + detail page        |
| **C: Watchlist**    | add/remove/get persists correctly to JSON | `src/lib/watchlist.ts` + `/api/watchlist` + watchlist page |

### Phase 2 — Wire & finish (~15 min)

- MovieCard links to detail page
- WatchlistButton on detail page calls watchlist API
- README: fill in assumptions + setup instructions
- Final browser check

---

## Assumptions

- Watchlist persists to a local JSON file (no external DB required)
- No authentication — single user assumed
- OMDB returns up to 10 results per search (`?s=` endpoint); no pagination needed for this scope
- Poster images may return `'N/A'` from OMDB — handle gracefully (show placeholder)
