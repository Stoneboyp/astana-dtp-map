# Astana DTP Map

A simple dashboard to visualize road accidents in Astana.

**[Live Demo](https://astana-dtp-map.vercel.app/)**

## Features

- **Map**: Uses MapLibre GL for rendering.
- **Data**: Managed by React Query.
  - Caching: City area (Infinity), DTP points (5 min).
  - Manual refresh button included.
- **State**: MobX for UI toggles (layers, clusters, popups).
- **Config**: Strict `.env` validation.

## Tech Stack

- React + TS + Vite
- TanStack Query (React Query)
- MobX
- MapLibre GL

## Setup

1. Fill `.env` (check `.env.example`).
2. `npm install`
3. `npm run dev`
