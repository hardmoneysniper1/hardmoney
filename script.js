(() => {
  const toast = document.getElementById('toast');
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 1500);
  };

  const favKey = 'gd-code-favorites-v1';
  const getFavs = () => {
    try { return new Set(JSON.parse(localStorage.getItem(favKey) || '[]')); }
    catch { return new Set(); }
  };
  const saveFavs = (set) => localStorage.setItem(favKey, JSON.stringify([...set]));
  let favs = getFavs();

  document.querySelectorAll('.code-card').forEach(card => {
    const code = (card.querySelector('h3')?.textContent || '').trim();
    const fav = card.querySelector('.fav-btn');
    if (fav && favs.has(code)) {
      fav.classList.add('is-fav');
      fav.textContent = '★';
    }
    fav?.addEventListener('click', () => {
      if (favs.has(code)) favs.delete(code); else favs.add(code);
      saveFavs(favs);
      fav.classList.toggle('is-fav', favs.has(code));
      fav.textContent = favs.has(code) ? '★' : '☆';
      applyFilters();
    });
  });

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.dataset.code || '';
      try {
        await navigator.clipboard.writeText(code);
        const old = btn.textContent;
        btn.textContent = '✓ Copiado';
        showToast(`Copiado: ${code}`);
        setTimeout(() => btn.textContent = old, 1200);
      } catch {
        showToast(`Código: ${code}`);
      }
    });
  });

  const input = document.getElementById('searchInput');
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const cards = [...document.querySelectorAll('.all-codes .code-card')];
  const blocks = [...document.querySelectorAll('.vault-block')];
  const count = document.getElementById('resultCount');
  const empty = document.getElementById('emptyState');
  let filter = 'all';

  function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function applyFilters() {
    if (!cards.length) return;
    const q = normalize(input?.value || '');
    let visible = 0;

    cards.forEach(card => {
      const vault = card.dataset.vault || '';
      const hay = normalize(card.dataset.search || card.textContent);
      const code = (card.querySelector('h3')?.textContent || '').trim();
      const vaultOK = filter === 'all' || vault === filter || (filter === 'favorites' && favs.has(code));
      const searchOK = !q || hay.includes(q);
      const show = vaultOK && searchOK;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    blocks.forEach(block => {
      const shown = [...block.querySelectorAll('.code-card')].some(c => !c.classList.contains('hidden'));
      block.classList.toggle('hidden', !shown);
    });

    if (count) count.textContent = `${visible} ${visible === 1 ? 'resultado' : 'resultados'}`;
    if (empty) empty.hidden = visible !== 0;
  }

  input?.addEventListener('input', applyFilters);
  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter || 'all';
    applyFilters();
  }));

  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.main-nav');
  menuBtn?.addEventListener('click', () => nav?.classList.toggle('open'));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
})();