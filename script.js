// Theme + Mermaid + Background with persistence
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const toggle = document.getElementById('themeToggle');

function getPreferredTheme(){
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme){
  const root = document.documentElement;
  if (theme === 'light'){ root.classList.add('light'); } else { root.classList.remove('light'); }
  if (toggle) toggle.textContent = theme === 'light' ? '☀️' : '🌙';

  if (window.mermaid){
    // Re-init Mermaid with theme
    window.mermaid.initialize({ startOnLoad: false, theme: theme === 'light' ? 'default' : 'dark' });
    // Re-run on all diagrams
    window.mermaid.run({ querySelector: '.mermaid' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const current = getPreferredTheme();
  applyTheme(current);

  if (toggle){
    toggle.addEventListener('click', () => {
      const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  // Background animation
  const canvas = document.getElementById('bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, t=0;
  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();
  (function loop(){
    t+=0.003;
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<60;i++){
      const x = w/2 + Math.cos(t+i)*w*0.25*Math.sin(t*1.5);
      const y = h/2 + Math.sin(t*1.2+i)*h*0.25*Math.cos(t*1.3);
      ctx.fillStyle = `hsla(${(i*8+ t*120)%360},70%,60%,0.06)`;
      ctx.beginPath(); ctx.arc(x,y,80,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(loop);
  })();
});
