document.addEventListener('DOMContentLoaded', ()=>{
// Parallax simple
const hero = document.querySelector('.usb-hero');
if(hero){
window.addEventListener('scroll', ()=>{
const y = window.scrollY;
hero.style.backgroundPosition = center ${y * 0.3}px;
});
}

// Contadores
document.querySelectorAll('[data-counter]').forEach(el=>{
const target = parseInt(el.getAttribute('data-counter'),10);
let started = false;
const obs = new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting && !started){
started = true;
let cur=0;
const step = Math.ceil(target/60);
const tick = ()=>{
cur += step;
if(cur >= target){ cur = target; }
el.textContent = cur;
if(cur < target) requestAnimationFrame(tick);
};
tick();
obs.unobserve(el);
}
});
}, {threshold:.4});
obs.observe(el);
});

// Scroll progress / CTA
const prog = document.createElement('button');
prog.className='usb-scroll-cta';
prog.innerHTML='<span class="bar"></span><span class="label">Cotizar</span>';
prog.addEventListener('click', ()=> {
document.querySelector('#usb-form')?.scrollIntoView({behavior:'smooth'});
});
document.body.appendChild(prog);

window.addEventListener('scroll', ()=>{
const h = document.documentElement;
const p = (h.scrollTop/(h.scrollHeight-h.clientHeight))*100;
prog.querySelector('.bar').style.setProperty('--progress', p+'%');
prog.classList.toggle('is-active', h.scrollTop > 320);
});
});

document.querySelectorAll('.usb-btn').forEach(btn=>{
btn.addEventListener('click', ()=>{
window.dataLayer = window.dataLayer || [];
dataLayer.push({event:'usb_cta_click', label: btn.textContent.trim()});
});
});