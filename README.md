# AboutBot Analytics Frontend

Frontend dashboard for monitoring Telegram bot analytics with a clean SaaS-style UI.

This app lets a user connect a bot by `username` or `token`, then view key analytics like users, messages, revenue, uptime, and recent activity in a responsive dashboard.

## Features
- Responsive dashboard optimized for desktop and mobile
- Light and dark theme toggle
- Bot connection flow with guided onboarding
- Overview, users, messages, revenue, and health views
- Metric cards, charts, loading states, and error handling
- Recent activity history with mobile-friendly card layout
- Bundle splitting for faster initial loading

## Tech Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts
- Axios

## Project Structure
- `src/components` reusable UI, charts, tables, and bot setup blocks
- `src/layouts` main dashboard shell
- `src/pages` route-level screens
- `src/hooks` frontend state and data hooks
- `src/services` API client logic
- `src/styles` global styles
- `src/types` shared frontend types
- `src/i18n` localization setup

## Environment
Create a local `.env` file from `.env.example`.

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Local Development
Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Product Flow
1. User opens the app and connects a Telegram bot.
2. Frontend stores the selected bot identity locally.
3. Frontend sends the bot identity to the backend API.
4. Dashboard renders analytics returned by the backend.
5. User can switch between overview, user, message, revenue, and health views.

## Notes
- The app expects a working backend API reachable through `VITE_API_BASE_URL`.
- `recentActivity` supports flexible event rendering through optional `eventCode` and `params`.
- ESLint is configured to ignore generated files like `dist`.

## Repository Scripts
- `npm run dev` starts the Vite dev server
- `npm run build` builds the app for production
- `npm run preview` previews the production build
- `npm run lint` runs ESLint
