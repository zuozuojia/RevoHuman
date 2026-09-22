const C = window.SITE_CONTENT;

// Populate simple content keys.
document.querySelectorAll('[data-content]').forEach(el => {
  const key = el.dataset.content;
  if (key in C) el.innerHTML = C[key];
});

document.getElementById('heroSpecs').innerHTML = C.heroSpecs.map(s => `
  <div class="hero-spec"><strong>${s.value}</strong><span>${s.label}</span><small>${s.note}</small></div>
`).join('');

document.getElementById('principles').innerHTML = C.principles.map(x => `
  <article class="principle reveal"><div class="n mono">${x.n}</div><h3>${x.title}</h3><p>${x.body}</p></article>
`).join('');

document.getElementById('hardwareCards').innerHTML = C.hardwareCards.map(x => `
  <article class="bento-card ${x.cls || ''} reveal">
    <div class="card-tag mono">${x.tag}</div><h3>${x.title}</h3><p>${x.body}</p>
    <div class="card-stat"><strong>${x.stat}</strong><small>${x.statLabel}</small></div>
  </article>
`).join('');

document.getElementById('dataPanels').innerHTML = C.dataPanels.map(x => `
  <article class="data-panel">
    <div class="data-panel-top mono"><span>${x.index}</span><span>${x.tag}</span></div>
    <div class="data-viz ${x.visual} reveal"><div class="orb"></div></div>
    <div class="data-panel-bottom reveal"><h3>${x.title}</h3><div><p>${x.body}</p><div class="data-metric mono">${x.metric}</div></div></div>
  </article>
`).join('');

document.getElementById('pipeline').innerHTML = C.pipeline.map(x => `
  <article class="pipe-step reveal"><div class="n mono">${x.n}</div><h3>${x.title}</h3><p>${x.body}</p></article>
`).join('');

document.getElementById('evalGrid').innerHTML = C.evaluations.map(x => `
  <article class="eval-card reveal"><div class="eval-card-top"><span class="tag mono">${x.tag}</span><span class="metric">${x.metric}</span></div><h3>${x.title}</h3><p>${x.body}</p></article>
`).join('');

document.getElementById('stackTable').innerHTML = `
  <div class="stack-head mono"><span>Data source</span><span>Scale</span><span>Physical semantics</span><span>Embodiment</span><span>Primary role</span></div>
  ${C.stackRows.map(x => `<div class="stack-row"><strong>${x.source}</strong><span data-label="Scale">${x.scale}</span><span data-label="Physics">${x.physics}</span><span data-label="Embodiment">${x.embodiment}</span><span data-label="Role">${x.role}</span></div>`).join('')}
`;

document.getElementById('citation').textContent = C.citation;
document.getElementById('year').textContent = new Date().getFullYear();

// Draw kinematic joints dynamically.
const svgNS = 'http://www.w3.org/2000/svg';
const jointGroup = document.querySelector('.joints');
[[455,585],[456,474],[440,388],[407,300],[380,213],[506,374],[527,260],[532,168],[571,400],[624,307],[646,228],[610,449],[688,389],[731,329],[338,430],[267,376],[221,323],[337,488],[251,485],[190,470],[555,596],[628,575]].forEach(([cx,cy],i)=>{
  const c = document.createElementNS(svgNS,'circle'); c.setAttribute('cx',cx); c.setAttribute('cy',cy); c.setAttribute('r',i===1?9:6); jointGroup.appendChild(c);
});

// Reveal on scroll.
const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Scroll progress and nav glass.
const nav = document.getElementById('nav');
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  const h = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
}, {passive:true});

// Theme.
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('revohuman-theme');
if (saved) document.documentElement.dataset.theme = saved;
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('revohuman-theme', next);
});

// Citation copy.
const toast = document.getElementById('toast');
document.getElementById('copyCitation').addEventListener('click', async () => {
  await navigator.clipboard.writeText(C.citation);
  toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), 1400);
});

// Hide optional local asset links if the asset is not present when served over HTTP.
// On file:// this check is skipped so the editable link remains visible.
if (location.protocol.startsWith('http')) {
  document.querySelectorAll('[data-optional-link]').forEach(async a => {
    try { const r = await fetch(a.getAttribute('href'), {method:'HEAD'}); if (!r.ok) a.style.display='none'; } catch { a.style.display='none'; }
  });
}
