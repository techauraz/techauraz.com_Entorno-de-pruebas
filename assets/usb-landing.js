document.addEventListener('DOMContentLoaded', ()=>{
const obs = new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){
e.target.classList.add('is-visible');
obs.unobserve(e.target);
}
});
}, { threshold: .2 });
document.querySelectorAll('.usb-landing [data-animate]').forEach(el=>obs.observe(el));
});

En tu theme.liquid (antes de </head>):
{{ 'usb-landing.css' | asset_url | stylesheet_tag }}
Opcional en footer o antes de </body>:
{{ 'usb-landing.js' | asset_url | script_tag }}