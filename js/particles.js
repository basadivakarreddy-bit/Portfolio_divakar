// js/particles.js — Advanced 3D Parallax Particle Network (Brilliant Edition)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let dpr = window.devicePixelRatio || 1;
let width, height;
const mouse = { x: -1000, y: -1000, active: false };

function resize() {
  dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.scale(dpr, dpr);
}

resize();
window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
window.addEventListener('mouseleave', () => { mouse.active = false; });

const COLORS = [
  { r: 0, g: 195, b: 255 },   // Cyan
  { r: 125, g: 42, b: 232 },  // Purple
  { r: 255, g: 33, b: 188 },  // Pink
];

// Increased particle length for higher density
const P = Array.from({ length: 200 }, () => {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const z = Math.random() * 0.8 + 0.2; // Depth factor (0.2 to 1.0)
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    z: z,
    vx: (Math.random() - .5) * 0.18 * z,
    vy: (Math.random() - .5) * 0.18 * z,
    r: (Math.random() * 1.8 + 0.7) * z,
    o: (Math.random() * 0.4 + 0.2) * z, // Increased base opacity
    rgb: `${color.r},${color.g},${color.b}`,
    phase: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.02 + 0.005
  };
});

function draw(time) {
  ctx.clearRect(0, 0, width, height);
  
  P.forEach((p, i) => {
    // Basic Movement with Depth (Parallax)
    p.x += p.vx;
    p.y += p.vy;

    // Mouse Interaction: Depth-Aware Repulsion
    if (mouse.active) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const limit = 160 * p.z;
      if (dist < limit) {
        const angle = Math.atan2(dy, dx);
        const force = (limit - dist) / limit;
        p.x -= Math.cos(angle) * force * 2.0 * p.z;
        p.y -= Math.sin(angle) * force * 2.0 * p.z;
      }
    }

    // Wrap around
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    // Twinkle/Shimmer Pulse
    const twinkle = Math.sin(time * p.pulseSpeed + p.phase) * 0.15 + 0.85;

    // Spotlight effect for opacity - More dramatic
    let currentOpacity = p.o * twinkle;
    if (mouse.active) {
      const mdx = mouse.x - p.x;
      const mdy = mouse.y - p.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      const mLimit = 240 * p.z;
      if (mdist < mLimit) currentOpacity = Math.min(1.0, currentOpacity + (1 - mdist / mLimit) * 0.6);
    }

    // Draw Particle with Glow
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.shadowBlur = 4 * p.z; // Subtle glow based on depth
    ctx.shadowColor = `rgba(${p.rgb},${currentOpacity})`;
    ctx.fillStyle = `rgba(${p.rgb},${currentOpacity})`;
    ctx.fill();
    ctx.shadowBlur = 0; // Reset for lines

    // Draw Connections - Increased maxDist for more connections in dense field
    for (let j = i + 1; j < P.length; j++) {
      const p2 = P[j];
      const dx = p2.x - p.x;
      const dy = p2.y - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 135 * ((p.z + p2.z) / 2);
      
      if (d < maxDist) {
        let lineOpacity = (0.15 * (1 - d / maxDist)) * p.z * p2.z; // Slightly brighter lines
        
        // Highlight connections near mouse
        if (mouse.active) {
          const mdx = mouse.x - (p.x + p2.x) / 2;
          const mdy = mouse.y - (p.y + p2.y) / 2;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150) lineOpacity *= 3.0; // Stronger highlight
        }

        const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
        grad.addColorStop(0, `rgba(${p.rgb},${lineOpacity})`);
        grad.addColorStop(1, `rgba(${p2.rgb},${lineOpacity})`);

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.5 * p.z;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame((t) => draw(t));
}

draw(0);
