async function loadRegistry() {
  const res = await fetch("/assets/projects.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Registry missing");
  return res.json();
}

function esc(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

function pillCard(p) {
  const accent = p.accent || "#fff";
  return `
    <a href="${esc(p.route)}" class="pillar-card glass-elite rounded-[2rem] p-10 block" style="border-color: color-mix(in srgb, ${accent} 25%, rgba(255,255,255,0.08)); box-shadow: 0 0 0 1px color-mix(in srgb, ${accent} 22%, rgba(255,255,255,0.08)), 0 50px 120px rgba(0,0,0,0.7);">
      <div class="flex items-start justify-between gap-6">
        <div>
          <div class="text-[10px] font-mono uppercase tracking-[0.25em]" style="color: color-mix(in srgb, ${accent} 80%, white 20%);">
            ${esc(p.subtitle)}
          </div>
          <h3 class="mt-3 text-4xl font-display font-black tracking-tight">${esc(p.title)}</h3>
          <p class="mt-4 text-white/70 text-lg leading-relaxed">${esc(p.elevator)}</p>
        </div>
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-xl"
             style="background: color-mix(in srgb, ${accent} 16%, transparent); border:1px solid color-mix(in srgb, ${accent} 30%, rgba(255,255,255,0.10)); color:${accent}">
          ${esc(p.title.trim()[0])}
        </div>
      </div>
      <div class="mt-8 flex flex-wrap gap-2">
        ${p.features.slice(0,3).map(f => `<span class="px-4 py-1.5 rounded-full text-xs font-mono" style="border:1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); color:${accent}">${esc(f)}</span>`).join("")}
      </div>
    </a>
  `;
}

function renderHome(reg) {
  const grid = document.getElementById("pillarsGrid");
  grid.innerHTML = reg.pillars.map(pillCard).join("");
  const list = document.getElementById("jumpList");
  list.innerHTML = reg.pillars.map(p => `<a class="block px-4 py-3 rounded-xl hover:bg-white/5 transition" href="${esc(p.route)}"><div class="text-sm font-semibold">${esc(p.title)}</div><div class="text-xs text-white/55 font-mono">${esc(p.subtitle)}</div></a>`).join("");
}

function renderWork(reg, id) {
  const p = reg.pillars.find(x => x.id === id);
  if (!p) return;

  document.getElementById("workTitle").textContent = p.title;
  document.getElementById("workSubtitle").textContent = p.subtitle;
  document.getElementById("workStatus").textContent = p.status;

  document.getElementById("aliases").innerHTML = p.aliases.map(a => `<span class="px-3 py-1.5 rounded-full text-xs font-mono" style="border:1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); color:${p.accent}">${esc(a)}</span>`).join("");

  document.getElementById("features").innerHTML = p.features.map(f => `
    <div class="glass-elite rounded-2xl p-5">
      <div class="font-semibold">${esc(f)}</div>
      <div class="mt-2 text-sm text-white/65">Designed as part of the ${esc(p.title)} pillar inside the Suite.</div>
    </div>
  `).join("");

  // active suite nav
  const nav = document.getElementById("suiteNav");
  nav.innerHTML = reg.pillars.map(x => {
    const active = x.id === id;
    return `<a href="${esc(x.route)}" class="px-3 py-2 rounded-xl font-mono text-xs transition ${active ? "bg-white/10" : "hover:bg-white/5"}">${esc(x.id)}</a>`;
  }).join("");
}

function wireCmdK() {
  const modal = document.getElementById("cmdk");
  const open = () => modal.classList.remove("hidden");
  const close = () => modal.classList.add("hidden");
  document.getElementById("openCmdk")?.addEventListener("click", open);
  document.getElementById("closeCmdk")?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); }
    if (e.key === "Escape") close();
  });
}

async function main() {
  wireCmdK();
  const reg = await loadRegistry();
  const page = document.body.dataset.page;

  if (page === "home") renderHome(reg);
  if (page && page.startsWith("work:")) renderWork(reg, page.split(":")[1]);
}
main().catch(() => {});
