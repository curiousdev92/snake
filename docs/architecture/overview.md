# Architecture Overview

## Product

This project is a production-grade real-time multiplayer Snake arena game.

The game targets:

- 120 FPS rendering on desktop where supported
- 60 FPS rendering on mobile
- server-authoritative multiplayer
- low memory usage
- low bandwidth usage
- scalable backend architecture
- premium responsive UI
- extensible game modes and progression systems

## Core Principle

The game is split into three main layers:

1. Game domain logic
2. Runtime infrastructure
3. Presentation and user interface

React does not own the game loop.

PixiJS owns rendering.

The game core owns deterministic simulation rules.

Colyseus owns authoritative multiplayer room state.

PostgreSQL owns durable data.

Redis owns fast temporary state, queues, matchmaking coordination, and cache.

## Main Applications

```txt
apps/web
```

The browser client.

Responsibilities:

- React app shell
- PixiJS canvas host
- HUD
- menus
- profile screens
- shop screens
- matchmaking UI
- settings
- authentication UI
- client networking
- client prediction and interpolation

```txt
apps/game-server
```

The authoritative real-time multiplayer server.

Responsibilities:

- Colyseus rooms
- server-side simulation
- player input validation
- match lifecycle
- room state synchronization
- anti-cheat boundaries
- match result publishing

## Shared Packages

```txt
packages/game-core
```

Pure deterministic game logic.

Must not import:

- React
- PixiJS
- Colyseus
- Prisma
- Redis
- browser APIs
- Node-specific APIs

```txt
packages/shared
```

Shared contracts, constants, DTOs, validation schemas, and protocol definitions.

```txt
packages/database
```

Prisma schema and database client.

```txt
packages/ui
```

Reusable React UI components.

```txt
packages/config
```

Shared TypeScript, ESLint, Tailwind, and build configuration.

## Clean Architecture

Each application and complex package follows this dependency direction:

```txt
domain -> application -> infrastructure -> presentation
```

Dependencies must point inward.

Domain code must not depend on infrastructure.

Infrastructure may implement interfaces defined by application or domain layers.

## Game Runtime Architecture

The browser game runtime is organized as:

```txt
core/
  engine/
  renderer/
  camera/
  input/
  scene/
  ticker/
  time/
```

The runtime must be modular and disposable.

The game must clean up listeners, textures, timers, and network subscriptions when leaving a match.

## Server Authority

The server is the source of truth for multiplayer matches.

Clients may predict local movement for responsiveness, but server reconciliation always wins.

The client must never be trusted for:

- final position
- kills
- score
- coin rewards
- XP rewards
- quest progress
- ranked result
- inventory changes

## Performance Strategy

The client renders frequently.

The server simulates at a fixed tick rate.

The network sends compact state updates.

The client interpolates remote entities.

The client predicts local input.

Object allocation inside hot loops is forbidden unless explicitly justified.

## Product Integrity

Coins only purchase cosmetics.

No gameplay advantage may be sold.

Progression systems must not become pay-to-win.

Economy changes must use auditable ledgers.
