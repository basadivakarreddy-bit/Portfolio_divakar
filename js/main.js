// js/main.js — Nav scroll effect, mobile menu, active links

function smoothScroll(id){
  document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
}

// Nav shrink
const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const secObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(l => {
        const href = l.getAttribute('href');
        if (href === '#' + e.target.id) {
          l.classList.add('active');
          l.style.color = 'var(--cyan)';
        } else {
          l.classList.remove('active');
          l.style.color = '';
        }
      });
    }
  });
},{threshold:0.22}); // Lower threshold for better sensitivity on long sections
sections.forEach(s=>secObs.observe(s));

// Mobile menu
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn?.addEventListener('click',()=>{
  mobileMenu.classList.toggle('open');
  menuBtn.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
});
mobileMenu?.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>{ mobileMenu.classList.remove('open'); menuBtn.textContent='☰'; });
});
