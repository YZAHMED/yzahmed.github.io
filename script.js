// JS for theme + mermaid + background niceties
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme toggle
const toggle = document.getElementById('themeToggle');
let dark = true;
if (toggle){
  toggle.addEventListener('click', () => {
    dark = !dark;
    document.documentElement.classList.toggle('light', !dark);
    toggle.textContent = dark ? '🌙' : '☀️';
  });
}

// Init Mermaid
document.addEventListener('DOMContentLoaded', () => {
  if (window.mermaid){
    mermaid.initialize({ startOnLoad: true, theme: 'dark' });
  }
});

// (Optional) a subtle background animation
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w, h, t=0;
function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();
function loop(){
  t+=0.003;
  ctx.clearRect(0,0,w,h);
  for(let i=0;i<60;i++){
    const x = w/2 + Math.cos(t+i)*w*0.25*Math.sin(t*1.5);
    const y = h/2 + Math.sin(t*1.2+i)*h*0.25*Math.cos(t*1.3);
    ctx.fillStyle = `hsla(${(i*8+ t*120)%360},70%,60%,0.06)`;
    ctx.beginPath(); ctx.arc(x,y,80,0,Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(loop);
}
loop();
