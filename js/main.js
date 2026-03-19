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
        l.style.color = l.getAttribute('href') === '#' + e.target.id ? 'var(--cyan)' : '';
      });
    }
  });
},{threshold:.45});
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
