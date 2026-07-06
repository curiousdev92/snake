# ADR 0001: Monorepo Stack

## Status

Accepted

## Context

The project needs a scalable architecture for a production-grade multiplayer Snake arena game.

The system includes:

- browser client
- real-time multiplayer server
- shared game logic
- shared protocol contracts
- database access
- reusable UI
- future background workers
- future admin tooling

A monorepo is preferred because shared contracts and game logic must remain synchronized across client and server.

## Decision

Use a TypeScript monorepo.

Initial workspace packages:

```txt
apps/web
apps/game-server
packages/game-core
packages/shared
packages/database
packages/ui
packages/config
```

Frontend stack:

- React
- TypeScript
- PixiJS
- Zustand
- TanStack Query
- TailwindCSS
- Framer Motion

Backend stack:

- Node.js
- Colyseus
- PostgreSQL
- Prisma
- Redis
- BullMQ
- WebSockets

Package manager:

- pnpm

## Reasons

### React

React is used for application UI, screens, menus, HUD, shop, profile, authentication, and matchmaking.

React is not used for high-frequency gameplay rendering.

Confidence: 100%.

### PixiJS

PixiJS is used for fast 2D WebGL rendering, sprite batching, texture atlas workflows, and canvas-based gameplay rendering.

Confidence: 95%.

### Zustand

Zustand is used for small, focused client-side UI and session state.

It should not become the authoritative game state store.

Confidence: 90%.

### TanStack Query

TanStack Query is used for server state such as profile, inventory, quests, battle pass, match history, and leaderboard data.

It is not used for real-time room state.

Confidence: 95%.

### Colyseus

Colyseus is used for authoritative multiplayer rooms, state synchronization, room lifecycle, and real-time WebSocket communication.

Confidence: 90%.

### PostgreSQL

PostgreSQL is used for durable relational data including users, profiles, economy ledger, inventory, match history, and progression.

Confidence: 95%.

### Prisma

Prisma is used for typed database access and migration management.

Confidence: 90%.

### Redis

Redis is used for caching, matchmaking coordination, distributed locks where needed, rate limits, and queue backing.

Confidence: 95%.

### BullMQ

BullMQ is used for background jobs such as progression processing, leaderboard updates, battle pass updates, daily quest refreshes, and async reward pipelines.

Confidence: 90%.

## Consequences

The architecture is heavier than a simple browser game.

The benefit is that multiplayer, progression, economy, and social systems can grow without rewriting the entire platform.

The risk is overengineering too early.

To reduce this risk:

- core gameplay will be built first
- platform systems will be added after multiplayer foundations
- abstractions must be justified by actual boundaries
- no placeholder systems are allowed
- no empty folders for imaginary future genius

## Non-Goals For Initial Milestones

The initial milestones will not implement:

- battle pass
- clans
- ranked seasons
- payment systems
- admin dashboard
- advanced cosmetics
- full matchmaking
- anti-cheat beyond server authority boundaries

These are planned later after the core game loop and multiplayer foundation are stable.
