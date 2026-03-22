# AboutBot Analytics Frontend

Frontend dashboard for monitoring Telegram bot analytics with a clean SaaS-style UI.

This app lets a user connect a bot by `username` or `token`, then view key analytics like users, messages, revenue, uptime, and recent activity in a responsive dashboard.

## About
AboutBot Analytics Frontend is the client-side interface for a Telegram bot analytics product. It is designed to help founders, operators, and product teams quickly understand bot performance through a simple and polished analytics workspace.

The current frontend focuses on fast onboarding, clean data presentation, responsive layouts, and a more premium product feel than a typical internal admin dashboard.

## Preview
- Clean analytics workspace with a premium dashboard layout
- Responsive navigation optimized for both desktop and mobile
- Guided onboarding flow for connecting a Telegram bot
- Dedicated analytics sections for users, messages, revenue, and health
- Light and dark theme support for a more polished product feel

## Why This UI
- Built to feel like a modern SaaS product, not a default admin panel
- Focused on readability, spacing, and mobile usability
- Designed for fast scanning of metrics and charts
- Structured so the frontend can keep growing as the startup evolves

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

## UI Highlights
- Premium glass-style dashboard panels with warm light theme styling
- Mobile-friendly activity feed and compact navigation
- Reusable metric cards and chart containers for consistent design
- Lazy-loaded pages and split bundles for a lighter initial load

## Notes
- The app expects a working backend API reachable through `VITE_API_BASE_URL`.
- `recentActivity` supports flexible event rendering through optional `eventCode` and `params`.
- ESLint is configured to ignore generated files like `dist`.

## Deployment
For production deployment:

1. Set `VITE_API_BASE_URL` to your production backend URL.
2. Run `npm install`.
3. Run `npm run build`.
4. Deploy the generated `dist/` folder to your hosting provider.

This project can be deployed to platforms like Vercel, Netlify, Cloudflare Pages, or any static hosting environment that serves the Vite build output.

## Contributing
Contributions are welcome if you want to improve UI quality, performance, accessibility, or frontend architecture.

Recommended flow:

1. Create a feature branch from `main`.
2. Make focused changes.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Open a pull request with a short explanation of what changed and why.

## Repository Scripts
- `npm run dev` starts the Vite dev server
- `npm run build` builds the app for production
- `npm run preview` previews the production build
- `npm run lint` runs ESLint
