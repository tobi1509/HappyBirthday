let particles = [];
let microparticles = [];

const c1 = createCanvas({
  width: $(window).width(),
  height: $(window).height(),
});

const tela = c1.canvas;
const canvas = c1.context;
$("body").append(tela);
class Particle1 {
  constructor(canvas) {
    this.canvas = canvas;
    this.progress = 0;
    this.size = 80; // Size to match the image
    this.radius = this.size / 2;
    this.life = 2000 + Math.random() * 1000;

    // Set initial position to random location on the screen
    this.x = Math.random() * window.innerWidth;
    this.y = window.innerHeight;

    // Vertical speed
    this.dy = -1 - Math.random();

    // Colors to match the heart effect in the image
    let colors = [
      'rgba(255, 0, 0, 0.8)',       // Red
      'rgba(255, 105, 180, 0.8)',   // Pink
      'rgba(255, 20, 147, 0.8)',    // Deep Pink
      'rgba(255, 69, 0, 0.8)',      // Orange Red
      'rgba(255, 182, 193, 0.8)'    // Light Pink
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.glow = 15; // Stronger glow effect
    this.direction = 1;
  }

  render() {
    this.canvas.save();

    // Apply blur for glow effect
    this.canvas.shadowColor = this.color;
    this.canvas.shadowBlur = this.glow;

    this.canvas.beginPath();
    const x = this.x;
    const y = this.y;
    const r = this.radius;
    this.canvas.moveTo(x, y - r / 2);
    this.canvas.bezierCurveTo(x + r / 2, y - r, x + r, y, x, y + r / 2);
    this.canvas.bezierCurveTo(x - r, y, x - r / 2, y - r, x, y - r / 2);

    // Fill and stroke to create the desired heart effect
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.lineWidth = 1;
    this.canvas.strokeStyle = this.color;
    this.canvas.stroke();

    this.canvas.restore();
  }

  move() {
    this.y += this.dy; // Move upwards
    if (this.y < -this.size) return false; // Reset if heart goes off screen
    this.render();
    this.progress++;
    return true;
  }
}

class microParticle {
  constructor(canvas, options) {
    this.random = Math.random();
    this.random1 = Math.random();
    this.random2 = Math.random();
    this.progress = 0;
    this.canvas = canvas;

    this.x = options.x;
    this.y = options.y;
    this.s = 2 + Math.random() * 3;
    this.w = $(window).width();
    this.h = $(window).height();
    this.radius = 1 + this.random * 0.5;

    // Màu sắc ngẫu nhiên
    let colors = [
      'rgba(255, 105, 180, 0.5)', // Hồng đỏ
      'rgba(255, 0, 0, 0.5)', // Đỏ
      'rgba(255, 192, 203, 0.5)', // Trắng hồng
      'rgba(255, 165, 0, 0.5)', // Cam đỏ
      'rgba(238, 130, 238, 0.5)', // Tím hồng
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];

    // Phát sáng
    this.glow = Math.random() * 0.5 + 0.5;
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    this.x -=
      Math.sin(this.progress / (100 / (this.random1 - this.random2 * 10))) *
      this.s;
    this.y += Math.cos(this.progress / this.h) * this.s;

    if (this.x < 0 || this.x > this.w - this.radius) {
      return false;
    }

    if (this.y > this.h) {
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}

var random_life = 1000;

setInterval(
  function () {
    particles.push(new Particle1(canvas));
    random_life = 2000 * Math.random();
  }.bind(this),
  random_life
);

function clear() {
  let grd = canvas.createRadialGradient(
    tela.width / 2,
    tela.height / 2,
    0,
    tela.width / 2,
    tela.height / 2,
    tela.width
  );
  grd.addColorStop(0, "rgba(20,20,20,1)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  canvas.fillStyle = grd;
  canvas.fillRect(0, 0, tela.width, tela.height);
}

function blur(ctx, canvas, amt) {
  // ctx.filter = `blur(${amt}px)`
  // ctx.drawImage(canvas, 0, 0)
  // ctx.filter = 'none'
}

function update() {
  clear();
  particles = particles.filter(p => p.move());
  requestAnimationFrame(update);
}



function createCanvas(properties) {
  let canvas = document.createElement("canvas");
  canvas.width = properties.width;
  canvas.height = properties.height;
  let context = canvas.getContext("2d");
  return { canvas, context };
}

setInterval(function () {
  particles.push(new Particle1(canvas));
}, 500); // Add a new heart every 500ms

update();
