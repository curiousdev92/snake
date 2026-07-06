# Folder Structure

## Root

```txt
.
├── apps/
│   ├── web/
│   └── game-server/
├── packages/
│   ├── config/
│   ├── database/
│   ├── game-core/
│   ├── shared/
│   └── ui/
├── docs/
│   ├── adr/
│   └── architecture/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── README.md
```

## Web App

```txt
apps/web/src/
├── app/
├── assets/
├── core/
│   ├── engine/
│   ├── renderer/
│   ├── camera/
│   ├── input/
│   ├── scene/
│   ├── ticker/
│   └── time/
├── features/
│   ├── auth/
│   ├── matchmaking/
│   ├── match/
│   ├── profile/
│   ├── shop/
│   └── social/
├── shared/
│   ├── api/
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   └── types/
└── main.tsx
```

## Game Server

```txt
apps/game-server/src/
├── app/
├── rooms/
├── features/
│   ├── auth/
│   ├── matchmaking/
│   ├── match-results/
│   ├── progression/
│   ├── economy/
│   ├── leaderboard/
│   └── social/
├── infrastructure/
│   ├── colyseus/
│   ├── database/
│   ├── redis/
│   ├── queues/
│   └── http/
├── shared/
│   ├── config/
│   ├── errors/
│   ├── logger/
│   └── validation/
└── main.ts
```

## Game Core Package

```txt
packages/game-core/src/
├── domain/
│   ├── arena/
│   ├── snake/
│   ├── food/
│   ├── hazards/
│   ├── match/
│   └── spatial/
├── application/
│   ├── simulation/
│   ├── commands/
│   └── services/
├── infrastructure/
│   └── random/
├── testing/
└── index.ts
```

## Shared Package

```txt
packages/shared/src/
├── constants/
├── protocol/
├── schemas/
├── types/
└── index.ts
```

## UI Package

```txt
packages/ui/src/
├── components/
├── motion/
├── primitives/
├── theme/
└── index.ts
```

## Database Package

```txt
packages/database/
├── prisma/
│   └── schema.prisma
└── src/
    ├── client.ts
    └── index.ts
```

## Rule

Feature folders may contain their own:

```txt
domain/
application/
infrastructure/
presentation/
```

Only create these layers when they are useful.

Do not create empty architecture folders just to impress a diagram.
