let planets = [];
const NUM_PLANETS = 7;
let sunRadius;
let stars = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  
  noFill();
  strokeWeight(1);
  
  sunRadius = min(width, height) * 0.04;
  
  for (let i = 0; i < NUM_PLANETS; i++) {
    let distanceFactor = map(i, 0, NUM_PLANETS - 1, 0.15, 0.6);
    let distance = min(width, height) * distanceFactor;
    
    planets.push({
      distance: distance * random(0.8, 0.9) * 0.5 * sqrt(i+1),
      size: map(i, 0, NUM_PLANETS - 1, sunRadius * 0.15, sunRadius * 0.8),
      angle: random(TWO_PI),
      speed: map(i, 0, NUM_PLANETS - 1, 0.005, 0.002) * (random() > 0.3 ? 1 : -1),
      hasMoon: random() > 0.75
    });
  }
}

function draw() {
  background('#f4f1eb');
  
  translate(width * 0.5, height * 0.3);
  
  
  stroke(0);
  strokeWeight(2);
  ellipse(0, 0, sunRadius * 2);
  
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    
    stroke(0, 30);
    strokeWeight(0.5);
    ellipse(0, 0, planet.distance * 2);
    
    planet.angle += planet.speed;
    
    let planetX = cos(planet.angle) * planet.distance;
    let planetY = sin(planet.angle) * planet.distance;
    
    stroke(0);
    strokeWeight(2);
    ellipse(planetX, planetY, planet.size);
    
    if (planet.hasMoon) {
      let moonDistance = planet.size * 2;
      let moonSize = planet.size * 0.3;
      let moonAngle = frameCount * 0.02;
      
      stroke(0, 20);
      strokeWeight(1);
      ellipse(planetX, planetY, moonDistance * 2);
      
      let moonX = planetX + cos(moonAngle) * moonDistance;
      let moonY = planetY + sin(moonAngle) * moonDistance;
      
      stroke(0);
      strokeWeight(1);
      ellipse(moonX, moonY, moonSize);
    }
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sunRadius = min(width, height) * 0.04;
}