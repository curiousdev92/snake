# Networking Model

## Authority

The multiplayer server is authoritative.

The client sends input commands.

The server validates commands and advances the simulation.

The server publishes state updates.

The client renders predicted and interpolated state.

## Input Command

A player input command represents intent, not final movement.

Example fields:

```txt
sequence
clientTime
direction
boostPressed
```

The client may predict the local result immediately.

The server validates the command against the authoritative game state.

## Client Prediction

The local player should feel responsive.

The client applies local input immediately.

Each input command receives a sequence number.

The client stores pending inputs until the server confirms them.

When authoritative state arrives:

1. client accepts server state
2. removes acknowledged inputs
3. reapplies pending inputs
4. smooths visual correction where possible

## Interpolation

Remote players are not predicted by the local client.

Remote players are interpolated between server snapshots.

The client keeps a small interpolation buffer.

Initial target:

```txt
100ms interpolation delay
```

This value must be tuned after testing.

## Reconciliation

Server state always wins.

If prediction error is small, visually smooth the correction.

If prediction error is large, snap or fast-correct.

Large correction may indicate:

- packet loss
- high latency
- cheating attempt
- server overload
- client bug

## Tick Rates

Initial values:

```txt
server simulation: 30 Hz
client prediction: 30 Hz
client rendering: 60/120 FPS
network snapshot: 10-20 Hz
```

These are starting values, not permanent religious commandments.

## Interest Management

The server should avoid sending irrelevant world data.

A player should receive:

- own full state
- nearby visible players
- nearby food
- nearby hazards
- match-level state
- relevant events

A player should not receive every object in the arena if the arena becomes large.

## Anti-Cheat Boundaries

The server must validate:

- movement direction
- boost usage
- collision
- kills
- food collection
- score
- quest progress
- match result
- rewards

The client may request.

The server decides.

## Match Result Flow

At match end:

1. room finalizes match result
2. room emits result event
3. backend stores match result
4. progression jobs are queued
5. economy rewards are written through ledger
6. leaderboard updates are queued
7. client receives match summary

Rewards must not depend only on a client message.
