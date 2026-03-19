// js/tilt.js — 3D perspective tilt on project cards
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=e.clientX-r.left, y=e.clientY-r.top;
    const cx=r.width/2, cy=r.height/2;
    card.style.transform=`perspective(800px) rotateX(${((y-cy)/cy)*10}deg) rotateY(${-((x-cx)/cx)*10}deg) scale(1.02)`;
    card.style.setProperty('--mx',(x/r.width*100)+'%');
    card.style.setProperty('--my',(y/r.height*100)+'%');
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});
