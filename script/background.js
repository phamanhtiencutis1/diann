const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let numFlakes = 100;
let flakes = [];

function createFlakes() {
  for (let i = 0; i < numFlakes; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 4 + 1,
      d: Math.random() * numFlakes
    });
  }
}

function drawFlakes() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < numFlakes; i++) {
    let f = flakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveFlakes();
}

let angle = 0;

function moveFlakes() {
  angle += 0.01;
  for (let i = 0; i < numFlakes; i++) {
    let f = flakes[i];
    f.y += Math.cos(angle + f.d) + 1 + f.r / 2;
    f.x += Math.sin(angle) * 2;

    if (f.y > height) {
      flakes[i] = { x: Math.random() * width, y: 0, r: f.r, d: f.d };
    }
  }
}

createFlakes();
setInterval(drawFlakes, 33);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
