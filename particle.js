// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(random(-1, 1), random(-1, 0));
      this.lifespan = 255.0;
      this.angle = 0;
      this.angleV = random(-0.05, 0.05);
      this.angleA = 0;
    }

    run() {
      let gravity = createVector(0, 0.05);
      this.applyForce(gravity);
      this.update();
      this.show();
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    // Method to update position
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.angleV += this.angleA;
      this.angle += this.angleV;
      this.lifespan -= 2;
      this.acceleration.mult(0);
    }
  
    // Method to display
    show() {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      stroke(255, this.lifespan);
      strokeWeight(1);
      fill(50, 75, 255, this.lifespan);
      rectMode(CENTER);
      rect(0, 0, 100);
      pop();
    }

    // Is the particle still useful?
    isDead() {
      return this.lifespan < 0.0;
    }
  }
  