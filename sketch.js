// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let emitter;

function setup() {
  createCanvas(windowWidth, windowHeight);
  emitter = new Emitter(width / 2, 50);
}

function draw() {
  background(128, 0, 128);
  emitter.addParticle();
  emitter.run();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  emitter.origin.set(width / 2, 50);
}