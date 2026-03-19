/**
 * cursor.js — Premium Magnetic Cursor with Particle Trail
 * Features: magnetic attraction, multi-ring spinner, color-shifting trail particles,
 *           hover morphing, click ripple, and smooth spring physics
 */

(function () {
  /* ---- Elements ---- */
  const cursor   = document.getElementById('cursor');
  const trail    = document.getElementById('cursor-trail');
  let dot        = document.getElementById('cursor-dot');

  /* Dynamically inject ring + dot if not in HTML */
  if (!dot) {
    dot = document.createElement('div');
    dot.id = 'cursor-dot';
    document.body.appendChild(dot);
  }

  /* ---- State ---- */
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let tx = mx, ty = my;   // trail pos (spring)
  let isHover = false;
  let isVisible = false;

  const TRAIL_EASE  = 0.13;

  /* Neon colour cycle for trail particles */
  const trailColors = [
    'rgba(0,212,255,VAL)',
    'rgba(124,58,237,VAL)',
    'rgba(247,37,133,VAL)',
  ];
  let colorIdx = 0;
  let particleTimer = 0;

  /* ---- Mouse tracking ---- */
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
      trail.style.opacity  = '1';
      dot.style.opacity    = '1';
    }

    // Position the cursor dot instantly
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    dot.style.left    = mx + 'px';
    dot.style.top     = my + 'px';
  });

  /* ---- RAF loop — spring physics ---- */
  let raf = 0;
  function loop(ts) {
    // Spring for trail ring
    tx += (mx - tx) * TRAIL_EASE;
    ty += (my - ty) * TRAIL_EASE;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';


    // Spawn trail particles every ~3 frames
    if (!isHover) {
      particleTimer++;
      if (particleTimer % 3 === 0) {
        spawnParticle(mx, my);
      }
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* ---- Trail particle spawner ---- */
  function spawnParticle(x, y) {
    const p   = document.createElement('div');
    const col = trailColors[colorIdx % trailColors.length];
    colorIdx++;

    const size = Math.random() * 5 + 3;
    const offsetX = (Math.random() - .5) * 10;
    const offsetY = (Math.random() - .5) * 10;

    p.className = 'cursor-particle';
    p.style.cssText = `
      left:${x + offsetX}px;
      top:${y + offsetY}px;
      width:${size}px;
      height:${size}px;
      background:${col.replace('VAL', (Math.random() * .4 + .4).toFixed(2))};
      box-shadow: 0 0 ${size * 2}px ${col.replace('VAL', '0.6')};
      border-radius:50%;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }

  /* ---- Ripple on click ---- */
  document.addEventListener('mousedown', (e) => {
    document.body.classList.add('cursor-click');

    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position:fixed; left:${e.clientX}px; top:${e.clientY}px;
      width:8px; height:8px; border-radius:50%;
      background:rgba(0,255,225,0.6);
      transform:translate(-50%,-50%);
      pointer-events:none; z-index:9994;
      animation:ripple 0.55s ease-out forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-click');
  });

  /* ---- Hover morphing on interactive elements ---- */
  const interactiveSelectors = 'a, button, .project-card, .skill-icon-card, .stat-card, input, textarea, .card-link, .social-link, .badge';

  function onEnter() {
    isHover = true;
    document.body.classList.add('cursor-hover');
    // Colour shift: neon pink on hover
    trail.style.borderColor = 'rgba(247,37,133,0.7)';
  }

  function onLeave() {
    isHover = false;
    document.body.classList.remove('cursor-hover');
    trail.style.borderColor = 'rgba(0,212,255,0.6)';
  }

  // Attach and watch for dynamically added elements
  function attachListeners() {
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = '1';
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
  }
  attachListeners();

  // Re-attach on DOM changes
  const observer = new MutationObserver(attachListeners);
  observer.observe(document.body, { childList: true, subtree: true });

  /* ---- Hide cursor when leaving window ---- */
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity  = '0';
    dot.style.opacity    = '0';
    isVisible = false;
  });
  document.addEventListener('mouseenter', () => {
    if (isVisible) {
      cursor.style.opacity = '1';
      trail.style.opacity  = '1';
      dot.style.opacity    = '1';
    }
  });

})();
