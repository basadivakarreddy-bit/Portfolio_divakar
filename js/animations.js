// js/animations.js — Scroll reveal, glitch, role typer
/**
 * animations.js — Enhanced Scroll Reveal & Typing Effects
 * Supports: .reveal, .reveal-left, .reveal-right, .reveal-scale
 */

// ---- Enhanced Scroll Reveal ----
const revealItems = document.querySelectorAll('[class*="reveal"]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Small staggered delay based on appearance order or data-delay
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(el => revealObserver.observe(el));

// ---- Glitch Effect (Themed) ----
const glitchEl = document.getElementById('glitchText');
function triggerGlitch() {
  if (!glitchEl) return;
  const iterations = [0, 60, 120];
  iterations.forEach(d => {
    setTimeout(() => {
      const rx = (Math.random() - .5) * 12;
      const ry = (Math.random() - .5) * 4;
      // Using new theme colors: pink and purple
      glitchEl.style.textShadow = `${rx}px 0 var(--pink), ${-rx}px 0 var(--purple), 0 0 25px rgba(0,212,255,.3)`;
      glitchEl.style.transform = `translate(${(Math.random() - .5) * 6}px, ${ry}px)`;
    }, d);
  });
  
  setTimeout(() => {
    glitchEl.style.textShadow = '0 0 20px rgba(0,212,255,0.25)';
    glitchEl.style.transform = 'translate(0,0)';
  }, 220);
}

// Randomish interval for glitch
setInterval(() => {
  if (Math.random() > 0.3) triggerGlitch();
}, 3800);

// ---- Role Typer ----
const roles = [
  'Full Stack Developer',
  'AI Enthusiast',
  'React Enthusiast',
  'Problem Solver',
  'B.Tech CSE (AI) Student'
];
const typerEl = document.getElementById('roleTyper');
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  if (!typerEl) return;
  const current = roles[roleIdx];
  
  if (!deleting) {
    typerEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800); // Wait at end
      return;
    }
  } else {
    typerEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  
  const speed = deleting ? 45 : 85;
  setTimeout(type, speed);
}
type();

// ---- Scroll Reveal Stagger for Grid Children ----
document.querySelectorAll('.projects-grid, .skills-categories, .featured-projects-list').forEach(grid => {
  const children = grid.children;
  for (let i = 0; i < children.length; i++) {
    children[i].dataset.delay = i * 120;
  }
});
