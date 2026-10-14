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
      this.angularVelocity = random(-0.05, 0.05);
      //angle
      this.angle = 0;
      this.angleV = 0;
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
      this.angle += this.angularVelocity;
      this.lifespan -= 2;
      this.acceleration.mult(0);
    }
  
    // Method to display
    show() {
      push();
      translate(0, this.position.y);
      rotate(this.angle);
      stroke(255, this.lifespan);
      rotate(this.angle);

      strokeWeight(1);
      fill(50, 75, 255, this.lifespan);
      rect(0, 0, 100);
      pop();
      pop();
    }
  
    // Is the particle still useful?
    isDead() {
      return this.lifespan < 0.0;
    }

    run(){
      this.update();
      this.show();

      let gravity = createVector(0, 0.05);
      this.applyForce(gravity);
    }
  }
  