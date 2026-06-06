# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm**. Build tool: **Vite 6** (replaced CRA 4).

- `pnpm dev` (or `pnpm start`) — Vite dev server on http://localhost:3000.
- `pnpm build` — type-checks (`tsc --noEmit`) then produces a production build to `build/`.
- `pnpm preview` — serve the built output locally.
- `pnpm test` — Vitest (jsdom env). Run a single file: `pnpm test src/path/to/File.test.tsx`. Run once: `pnpm test --run`.
- `pnpm typecheck` — `tsc --noEmit`.
- `pnpm codegen` — regenerates `src/openapi/` from the Flask backend's OpenAPI schema at `http://localhost:8000/api/v1/openapi.json` using `openapi-typescript-codegen`. The backend must be running locally. Do not hand-edit anything under `src/openapi/`.

## Environment

Copy `.env-example` to `.env`. Required vars (all `VITE_*` so Vite exposes them via `import.meta.env`):

- `VITE_API_URL` — base for the Flask REST API; set on `OpenAPI.BASE` in `src/App.tsx`.
- `VITE_SOCKET_URL` — base WebSocket URL; the client connects to `${VITE_SOCKET_URL}/ws/${clientId}`.
- `VITE_DISCORD_OWNER`, `VITE_DISCORD_DISPLAY_AS` — used for chat rendering.

## Architecture

This is a CRA 4 + TypeScript SPA serving as a personal website / playground that talks to a separate Flask backend.

### Top-level wiring (`src/index.tsx` → `src/App.tsx`)

`BrowserRouter` wraps `<App/>`, which composes providers in this order: `RecoilRoot` → `SocketProvider` → layout (`Menu` + `Routes`) → `ToastContainer`. Any new global state needs to live inside `RecoilRoot`; any feature that consumes the websocket needs to live inside `SocketProvider`.

### Routing

All routes are declared centrally in `src/components/nav/Routes.tsx` against containers in `src/containers/`. Containers are thin route handlers; the meaningful UI lives in `src/components/` (`charts`, `chat`, `dashboard`, `data-views`, `interface`, `nav`, `util`).

### Backend API layer (`src/openapi/`)

Generated client (services, models, schemas) produced by `yarn codegen`. Consumers should:

1. Import the service (e.g. `RecipesService`, `StocksService`) from `src/openapi`.
2. Wrap the call in `useApiMethod` (`src/hooks/useApiMethod.ts`), which manages `inProgress`/`error`/`success` state and suppresses state updates after a route change (so unmounted-component warnings don't fire when the user navigates mid-request). The hook reads `e.status` / `e.body.detail` off thrown `ApiError`s.
3. Render `<Spinner/>` / `<Error/>` from `src/components/interface` against that state.

`OpenAPI.BASE` is set once at app startup from `REACT_APP_API_URL`.

### WebSocket (`src/context/SocketContext.tsx`)

`SocketProvider` opens a single shared `react-use-websocket` connection at mount, generates a `visitor<rand>` clientId by default, and exposes `useSocket()` returning `{ clientId, setClientId, sendMsg, sendMsgObj, addMessageHandler, removeMessageHandler, msgs }`. Incoming messages auto-toast (with `discord-markdown` rendering) unless the user is on the `/contact` page. Subscribers register message callbacks via `addMessageHandler` / `removeMessageHandler` — remember to remove on unmount.

### Dashboard system (`src/components/dashboard/`, `src/context/DashboardContext.tsx`)

A user-configurable split-panel layout. The data model is a recursive tree of `DashNode` (container with `orientation: 'row'|'column'` and child `nodes`) and `DashLeaf` (terminal panel with a `component` string key, `name`, and `arguments` bag). Sizes are flex-basis strings (e.g. `'50%'`).

- `DashboardProvider` owns the tree in `useState` and exposes `useDashboard(): [DashNode, DashReplace]`. `DashReplace(old, [new...])` does a recursive search-and-splice on the tree, then replaces the root reference (`setDashboard({...d})`) to trigger re-render. Mutation is in-place before the root swap — be deliberate about that pattern when extending.
- `Content.tsx` maps a leaf's `component` string to a React view (`recipe-search`, `recipe`, `stock`, `publicChat`, `privateChat`, `random`). To add a new panel type: add a case to that switch and an `AddListing` entry in the default selector.
- Split / delete / resize all work by computing a new subtree and calling `setDashNode`. The resize handler (`startResize`) walks up via `findParent` to locate the nearest ancestor whose `orientation` matches the drag axis, then redistributes sibling sizes. This logic is known-broken (see `containers/interface/Dashboard.tsx` copy and the recent commit history around resize) — tread carefully when modifying.

### State (`src/state/`)

Recoil atoms. Currently just `recipesState` (an id-keyed `Recipe` index). New cross-component state should land here as atoms/selectors rather than additional Contexts.

### Styles (`src/styles/`)

SCSS, single entry point `style.scss` imported in `App.tsx`. Partials are split by feature (`_dashboard.scss`, `_chat.scss`, `_interface.scss`, etc.). Built with `node-sass` 6.

## TypeScript

`strict: true`, `target: es5`, `jsx: react-jsx`. Path imports are all relative — no path aliases configured.
