// js/particles.js — Color-themed particle network for new design palette
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

// Particle palette — cyan / purple / pink tones
const COLORS = [
  'rgba(0,212,255,',
  'rgba(124,58,237,',
  'rgba(247,37,133,',
];

const P = Array.from({ length: 85 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - .5) * .3,
  vy: (Math.random() - .5) * .3,
  r: Math.random() * 1.4 + .4,
  o: Math.random() * .5 + .08,
  c: COLORS[Math.floor(Math.random() * COLORS.length)]
}));

(function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  P.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    // Draw particle dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c + p.o + ')';
    ctx.fill();

    // Draw connections
    for (let j = i + 1; j < P.length; j++) {
      const dx = P[j].x - p.x, dy = P[j].y - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(P[j].x, P[j].y);
        ctx.strokeStyle = p.c + (.07 * (1 - d / 130)) + ')';
        ctx.lineWidth = .6;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(loop);
})();
