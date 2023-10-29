let particles = [];
let cnv; // holds the canvas
let img; // holds the showerhead
let missle; // hold missle image
let drop; // hold drop image
let waters; // hold water sound
let wars; // hold warsound
let state = 0; // hold the state of the shower
let lasttouch = 0; // for debouncing touch
let first = true; // boolean for first touch

function preload() {
  img = loadImage("showerh.png");
  missle = loadImage("missle.png");
  drop = loadImage("drop.png");
  waters = loadSound("water.mp3");
  wars = loadSound("war.mp3");
}
function setup() {
  cnv = createCanvas(600, 800);
  let cx = floor((windowWidth - cnv.width) / 2);
  let cy = floor((windowHeight - cnv.height) / 2);
  cnv.position(cx, cy);
  imageMode(CENTER);
  angleMode(DEGREES);
}

function touchStarted() {
  // for Ios
  // calculate time since last touch
  const currenttime = millis();
  const timesincelasttouch = currenttime - lasttouch;

  if (timesincelasttouch > 500) {
    if (first) {
      first = false;
      print("first time");
      waters.play();
    }
    state++;
    state = state % 3;

    if (state === 0) {
      // .isPlaying() returns a boolean

      waters.stop();
      wars.stop();
    } else if (state === 1) {
      wars.stop();
      waters.play();
      waters.loop();
    } else if (state === 2) {
      waters.stop();
      wars.play();
      wars.loop();
    }
    // update
    lasttouch = currenttime;
  }
}


function mousePressed(){
  touchStarted();
  // for firefox computer browsers
}
function draw() {
  if (frameCount < 2) {
  }
  //waters.loop()
  if (state === 2) {
    background(200);
    //wars.play()
  } else {
    background(255);
  }

  image(img, 300, 40, 100, 120);
  if (state > 0) {
    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(300, 70));
    }

    for (let particle of particles) {
      let gravity = createVector(0, 0.2);
      particle.applyForce(gravity);
      particle.update();
      particle.show();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].finished()) {
        particles.splice(i, 1);
      }
    }
  }
}
