# Particle sketch

A p5.js particle fountain from the Nature of Code template: one emitter, constructor classes, and particles that fall, fade, and rotate.

Update the **Current result** section whenever the look or structure changes. The rest of this file is the record of how the template was read and what was changed to get that result.

## Current result

Checked in the browser at `http://127.0.0.1:8765/` on 2026-10-13.

- The canvas fills the browser window. The page does not scroll.
- The background is mid purple, `rgb(128, 0, 128)` (`#800080`).
- Particles are 10px squares with a white border at stroke weight 1. The gray fill from the template is still there, and both fill and stroke fade with lifespan.
- Squares spin. Each particle gets its own angular velocity in the constructor.
- New particles spawn at the horizontal center, 50px from the top, then fall under a small gravity force.

## Preview

From this folder, with a network connection so the p5 script can load from jsDelivr:

```bash
python -m http.server 8765
```

Open [http://127.0.0.1:8765/](http://127.0.0.1:8765/). Refresh the tab after you edit a script. Stop the server with Ctrl+C.

`index.html` loads three scripts in order: `particle.js`, `emitter.js`, then `sketch.js`. That order matters, because `sketch.js` constructs an `Emitter`, and `Emitter` constructs `Particle` objects.

## What the template already did

Read before editing:

| File | What it contained |
| --- | --- |
| `sketch.js` | A 640×240 canvas, white `background(255)`, and one `Emitter` at `(width / 2, 50)`. `draw()` adds one particle per frame and runs the system. |
| `particle.js` | A `Particle` constructor with position, acceleration, velocity, and lifespan. `run()` applies gravity, then updates and draws. `show()` drew an 8px circle with a black stroke of weight 2 and a gray fill. `isDead()` returns true when lifespan drops below 0. |
| `emitter.js` | Empty. `index.html` already included it, so the emitter class was the missing piece. |
| `index.html` | p5 2.2.3 from jsDelivr, plus the three local scripts. |
| `style.css` | Body margin and padding set to 0, canvas set to `display: block`. |

Motion was already in the particle constructor and `update()`: a random upward velocity, gravity of `(0, 0.05)`, and lifespan reduced by 2 each frame. Those values were left as they were.

## What changed

**`emitter.js`.** Added an `Emitter` class. The constructor stores an origin vector and an empty particle list. `addParticle()` pushes a new `Particle` at that origin. `run()` walks the list backward, calls `particle.run()`, and splices dead particles so the list does not grow forever.

**`particle.js`.** The constructor now stores `angle` at 0 and a random `angularVelocity`. `update()` adds that velocity to the angle. `show()` uses `push()`, `translate()`, and `rotate()` so the square spins around its own center, then `pop()` so the next particle is not affected. `circle(...)` became `square(0, 0, 10)` with `rectMode(CENTER)`. The stroke is white (`255`) at weight 1, which is also p5’s default stroke weight. The gray fill and the lifespan alpha were kept so squares still fade out.

**`sketch.js`.** `createCanvas(windowWidth, windowHeight)` replaces the 640×240 canvas. `background(128, 0, 128)` replaces white. `windowResized()` resizes the canvas and moves the emitter back to the horizontal center so a window resize does not leave the fountain on the old x position.

**`style.css`.** Added `overflow: hidden` on `html` and `body`. A full-window canvas otherwise leaves a scrollbar, which shrinks the viewport and shows a gap.

## Where to edit next

| If you want to change… | Edit |
| --- | --- |
| Background color, canvas size, spawn point | `sketch.js` |
| Square size, border, fill, spin speed | `Particle.show()` and the constructor in `particle.js` |
| How many particles spawn, or how they are removed | `Emitter` in `emitter.js` |
| Scrollbars or page margin | `style.css` |

## Keeping this guide current

When the sketch changes, rewrite **Current result** to match what you see in the browser, and add a short note under **What changed** if a new file or behavior is involved. Leave the template section as the baseline unless the starting files themselves change.
