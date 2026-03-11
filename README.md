# AboutBot Analytics Frontend

React + TypeScript + Vite dashboard for Telegram bot analytics monitoring.

## Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Recharts

## Structure
- `src/components` reusable cards/charts/tables
- `src/pages` top-level pages
- `src/services` API clients
- `src/hooks` data hooks
- `src/types` shared frontend types
- `src/layouts` dashboard layout

## Environment
Copy `.env.example` to `.env`.

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Run
```bash
npm install
npm run dev
```

## Current frontend flow
- User first enters a bot username or bot token.
- Frontend stores that bot identity locally and opens a bot-specific dashboard view.
- Frontend sends that bot identity to the backend API and renders the real dashboard response.
- `recentActivity` supports future localized events via optional `eventCode` and `params` fields.

## Build
```bash
npm run build
```

The UI includes:
- responsive sidebar + header
- metrics cards
- growth/messages/revenue charts
- loading and error states
- recent activity table
