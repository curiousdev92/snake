# Performance Rules

## Rendering Targets

Desktop target:

- up to 120 FPS rendering where hardware and browser allow it

Mobile target:

- stable 60 FPS rendering where hardware allows it

The simulation does not need to run at the same rate as rendering.

## Fixed Simulation

Game simulation must use a fixed timestep.

Rendering may use variable frame timing.

Server simulation should run at a fixed tick rate.

Initial target:

- server tick: 30 Hz
- client simulation prediction: 30 Hz
- client rendering: display refresh rate

This may be adjusted after profiling.

## Game Loop Rules

Do not allocate objects inside the hot game loop.

Avoid:

- array recreation
- object spreading
- closures inside tick loops
- JSON serialization inside tick loops
- unnecessary map/filter/reduce in hot paths

Prefer:

- object pools
- typed arrays where useful
- reusable vectors
- preallocated buffers
- stable references
- batch updates

## React Rules

React must not rerender every game tick.

React may render:

- menus
- HUD
- modals
- settings
- matchmaking states
- match summary
- profile
- shop

React may subscribe to low-frequency derived state.

Examples:

- score
- health/state
- latency
- match timer
- quest progress

PixiJS handles high-frequency visual updates.

## PixiJS Rules

Use texture atlases.

Use sprite batching.

Avoid expensive real-time GPU effects.

Fake glow using prerendered textures.

Avoid filters in gameplay unless measured and approved.

Reuse sprites.

Destroy textures only when their lifecycle truly ends.

## Network Rules

Use compact messages.

Avoid sending full world state every tick.

Use interest management.

Use delta compression where possible.

Separate reliable events from frequent state sync.

Do not send cosmetic-only effects in the critical simulation channel unless required.

## Memory Rules

Object pools are required for frequently created objects.

Examples:

- food particles
- death explosion sprites
- temporary vectors
- floating text
- impact effects

All runtime systems must support cleanup.

No abandoned event listeners.

No abandoned animation frames.

No abandoned WebSocket listeners.

No retained match state after leaving a room.

## Profiling Rule

Any optimization must be validated by measurement when possible.

Required tools:

- browser performance profiler
- memory profiler
- network inspector
- server tick timing logs
- room CPU usage metrics

Guessing performance is how software becomes folklore.
