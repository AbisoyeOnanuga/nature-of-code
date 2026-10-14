# Particle sketch

A p5.js particle fountain from the Nature of Code template: one emitter, constructor classes, and particles that fall, fade, and rotate.

Update the **Current result** section whenever the look or structure changes. The rest of this file is the record of how the template was read and what was changed to get that result.

## Current result

Checked in the browser at `http://127.0.0.1:8765/` on 2026-10-13, after the manual edits and the debug fixes below.

- The canvas fills the browser window. The page does not scroll.
- The background is mid purple, `rgb(128, 0, 128)` (`#800080`).
- Particles are 24px squares with a white border at stroke weight 1 and a blue fill, `rgb(50, 75, 255)`. Fill and stroke fade with lifespan.
- Squares spin from `angle`, `angleV`, and `angleA` on each particle.
- New particles spawn at the horizontal center, 50px from the top, then fall under a small gravity force.

## Preview

The server is working when the terminal sits there and prints a line like this:

```text
Serving HTTP on :: port 8765 (http://[::]:8765/) ...
```

That line means it is waiting for the browser. The prompt does not come back. Leave that terminal alone and open [http://127.0.0.1:8765/](http://127.0.0.1:8765/) in another window. Ctrl+C stops the server and returns the prompt. Closing the terminal also stops it.

From this folder, with a network connection so the p5 script can load from jsDelivr:

```bash
cd /d/Documents/vscode/nature-of-code
python -m http.server 8765
```

If Python says the address is already in use (`WinError 10048`), a server is already running on port 8765. Open the URL above, or stop the old one and start again. On Windows, find it and stop it:

```bash
netstat -ano | findstr :8765
taskkill /PID <pid> /F
```

Use the PID from the `LISTENING` row. After you change a script, hard-refresh the page (Ctrl+F5). A normal refresh can keep the old `particle.js` and the sketch will look unchanged.

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

### Manual edits and the debug pass

The next edits were made by hand in `particle.js`, then the page was loaded to see what they did.

The server command itself was fine. The terminal showed `Serving HTTP on :: port 8765` and then `Keyboard interrupt received, exiting.` Ctrl+C had stopped a server that was already waiting. Two leftover `python.exe` processes were still listening on 8765, so another start could not bind that port. Stopping those processes and starting one server from this folder made [http://127.0.0.1:8765/](http://127.0.0.1:8765/) load.

The sketch loaded with these problems in `particle.js`:

- `translate(0, this.position.y)` ignored `position.x`, so every square drew on the left edge while the real x values were near the center.
- `show()` called `rotate()` twice and `pop()` twice. One `push()` needs one `pop()`.
- The class had two `run()` methods. JavaScript keeps the second one, so the first gravity-then-update version never ran. The second applied gravity after `update()`, which means it affects the next frame.
- `angle` was assigned twice. `angleV` and `angleA` stayed at 0, and spin still came from a separate `angularVelocity`.

Those were folded into one path: one `run()` that applies gravity, then updates, then draws; `translate(this.position.x, this.position.y)`; one `rotate` and one `pop`. Spin now uses the fields you added: `angleV` starts at `random(-0.05, 0.05)`, `angleA` stays 0, and `update()` does `angleV += angleA` then `angle += angleV`. The blue fill stayed. The square size went from the trial value `rect(0, 0, 100)` to `square(0, 0, 24)` so the fountain stays readable. Put `100` back in `square` if you want the larger trial size.

## Where to edit next

| If you want to change… | Edit |
| --- | --- |
| Background color, canvas size, spawn point | `sketch.js` |
| Square size, border, fill, spin speed | `Particle.show()`, and `angleV` / `angleA` in `particle.js` |
| How many particles spawn, or how they are removed | `Emitter` in `emitter.js` |
| Scrollbars or page margin | `style.css` |

## Keeping this guide current

When the sketch changes, rewrite **Current result** to match what you see in the browser, and add a short note under **What changed** if a new file or behavior is involved. Leave the template section as the baseline unless the starting files themselves change.
