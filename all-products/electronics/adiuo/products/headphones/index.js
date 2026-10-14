/* =========================================================
   YallaBuy — Headphones Category Page
   Vanilla JS, no dependencies. Loads data.json, renders
   categories, subcategories, prices, products, articles,
   filters, search, sort, mobile menu, and animations.
   ========================================================= */

(function () {
  'use strict';

  // ---------- Tiny helpers ----------
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'dataset') Object.assign(node.dataset, v);
      else if (k.startsWith('aria') || k === 'role') node.setAttribute(k, v);
      else if (k === 'html') node.innerHTML = v;
      else node[k] = v;
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  };

  const DATA_PATH = 'data.json';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- State ----------
  const state = {
    data: null,
    filters: {
      search: '',
      brand: new Set(),
      price: new Set(),
      type: new Set(),
      connectivity: new Set(),
      anc: new Set(),
      backType: new Set(),
      microphone: new Set(),
      bluetooth: new Set()
    },
    sort: 'featured'
  };

  // ---------- Bootstrap ----------
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    setupYear();
    setupMobileMenu();
    setupHeaderScroll();
    setupBackToTop();
    setupReveal();

    try {
      const res = await fetch(DATA_PATH);
      if (!res.ok) throw new Error('Failed to load data.json (' + res.status + ')');
      state.data = await res.json();
    } catch (err) {
      console.error('[YallaBuy] Could not load data:', err);
      renderDataError();
      return;
    }

    renderQuickNav();
    renderMainCategories();
    renderSubcategories();
    renderPriceCategories();
    renderFilterControls();
    renderProducts();
    renderArticles();
    observeCards();
  }

  // ---------- Year ----------
  function setupYear() {
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  }

  // ---------- Mobile menu ----------
  function setupMobileMenu() {
    const toggle = $('#menuToggle');
    const menu = $('#mobileMenu');
    if (!toggle || !menu) return;

    // Ensure hidden state behavior is correct
    menu.hidden = false;
menu.classList.remove('is-open');

toggle.setAttribute('aria-expanded', 'false');
toggle.setAttribute('aria-label', 'Open menu');

document.body.classList.remove('menu-open');

    const openMenu = () => {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('menu-open');
    };
    const closeMenu = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('menu-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    $$('.mobile-link', menu).forEach(a => a.addEventListener('click', closeMenu));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', e => {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
  }

  // ---------- Sticky header subtle shadow ----------
  function setupHeaderScroll() {
    const header = $('#siteHeader');
    if (!header) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle('is-scrolled', window.scrollY > 4);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Back to top ----------
  function setupBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  // ---------- Reveal on scroll ----------
  function setupReveal() {
    if (prefersReducedMotion) {
      $$('.reveal').forEach(n => n.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(n => io.observe(n));
  }

  function observeCards() {
    if (prefersReducedMotion) {
      $$('.stagger-card').forEach(n => n.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    $$('.stagger-card').forEach(n => io.observe(n));
  }

  // ---------- Data error UI ----------
  function renderDataError() {
    const grid = $('#mainCategoryGrid');
    if (grid) grid.innerHTML = '<p class="empty-state">Unable to load category data. Please check that <code>data/headphones/data.json</code> is reachable.</p>';
  }

  // ---------- Quick nav ----------
  function renderQuickNav() {
    const list = $('#quickNavList');
    if (!list) return;
    list.innerHTML = '';
    state.data.mainCategories.forEach(cat => {
      const li = el('li', {},
        el('a', { href: '#' + cat.id, textContent: cat.name })
      );
      list.appendChild(li);
    });
  }

  // ---------- Main categories ----------
  function renderMainCategories() {
    const grid = $('#mainCategoryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    state.data.mainCategories.forEach((cat, i) => {
      const subcount = state.data.subcategories.filter(s => s.parent === cat.id).length;
      const card = el('article', {
        class: 'main-cat-card stagger-card',
        dataset: { delay: i * 80 },
        style: `--delay: ${i * 80}ms;`
      }, [
        el('a', {
          class: 'main-cat-image',
          href: '#subcategories',
          ariaLabel: `Browse ${cat.name} subcategories`,
          tabindex: '-1'
        }, el('img', {
          src: cat.image,
          alt: cat.alt || cat.name,
          loading: 'lazy',
          width: 480, height: 300
        })),
        el('div', { class: 'main-cat-body' }, [
          el('h3', { class: 'main-cat-title', textContent: cat.name }),
          el('p', { class: 'main-cat-desc', textContent: cat.description }),
          el('a', {
            class: 'main-cat-link',
            href: '#subcategories',
            textContent: `View ${subcount} subcategories`
          })
        ])
      ]);
      grid.appendChild(card);
    });
  }

  // ---------- Subcategories ----------
  function renderSubcategories() {
    const acc = $('#subcategoryAccordion');
    if (!acc) return;
    acc.innerHTML = '';

    state.data.mainCategories.forEach((mainCat, i) => {
      const subs = state.data.subcategories.filter(s => s.parent === mainCat.id);
      if (!subs.length) return;

      const item = el('div', { class: 'acc-item', dataset: { id: mainCat.id } });
      const header = el('button', {
        class: 'acc-header',
        type: 'button',
        'aria-expanded': i === 0 ? 'true' : 'false',
        'aria-controls': `panel-${mainCat.id}`
      }, [
        el('span', { class: 'acc-title-wrap' }, [
          el('span', { textContent: mainCat.name }),
          el('span', { class: 'acc-count', textContent: String(subs.length) })
        ]),
        el('span', { class: 'acc-chevron', 'ariaHidden': 'true' })
      ]);

      const panel = el('div', { class: 'acc-panel', id: `panel-${mainCat.id}` });
      const inner = el('div', { class: 'acc-panel-inner' });
      const grid = el('div', { class: 'subcat-grid' });

      subs.forEach(s => {
        const card = el('a', {
          class: 'subcat-card',
          href: s.url || '#',
          dataset: { name: s.name.toLowerCase(), id: s.id }
        }, [
          el('h4', { class: 'subcat-title', textContent: s.name }),
          el('p', { class: 'subcat-desc', textContent: s.description }),
          el('span', { class: 'subcat-link', textContent: 'Browse' })
        ]);
        grid.appendChild(card);
      });

      inner.appendChild(grid);
      panel.appendChild(inner);
      item.appendChild(header);
      item.appendChild(panel);
      acc.appendChild(item);

      // Open the first by default
      if (i === 0) {
        item.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }

      header.addEventListener('click', () => toggleAccItem(item, header, panel));
    });

    // After layout, fix max-heights for the open item
    requestAnimationFrame(() => {
      $$('.acc-item.is-open .acc-panel').forEach(p => {
        p.style.maxHeight = p.scrollHeight + 'px';
      });
    });

    // Search
    const search = $('#subcatSearch');
    if (search) {
      search.addEventListener('input', e => filterSubcategories(e.target.value.trim().toLowerCase()));
    }

    // Expand/collapse all
    $('#expandAllBtn')?.addEventListener('click', () => {
      $$('.acc-item').forEach(item => {
        const header = $('.acc-header', item);
        const panel = $('.acc-panel', item);
        item.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      });
      updateSubcatCount();
    });
    $('#collapseAllBtn')?.addEventListener('click', () => {
      $$('.acc-item').forEach(item => {
        const header = $('.acc-header', item);
        const panel = $('.acc-panel', item);
        item.classList.remove('is-open');
        header.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = '0px';
      });
      updateSubcatCount();
    });

    updateSubcatCount();
  }

  function toggleAccItem(item, header, panel) {
    const isOpen = item.classList.contains('is-open');
    if (isOpen) {
      item.classList.remove('is-open');
      header.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0px';
    } else {
      item.classList.add('is-open');
      header.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  function filterSubcategories(query) {
    const cards = $$('.subcat-card');
    let visibleTotal = 0;
    cards.forEach(card => {
      const match = !query || card.dataset.name.includes(query);
      card.classList.toggle('is-hidden', !match);
      if (match) visibleTotal++;
    });

    // Open accordions that have visible matches when searching
    if (query) {
      $$('.acc-item').forEach(item => {
        const visibleCards = $$('.subcat-card:not(.is-hidden)', item);
        const hasMatches = visibleCards.length > 0;
        const header = $('.acc-header', item);
        const panel = $('.acc-panel', item);
        if (hasMatches) {
          item.classList.add('is-open');
          header.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
          item.classList.remove('is-open');
          header.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = '0px';
        }
      });
    }

    updateSubcatCount(visibleTotal, query);
  }

  function updateSubcatCount(visible, query) {
    const node = $('#subcatCount');
    if (!node) return;
    if (typeof visible !== 'number') {
      visible = $$('.subcat-card:not(.is-hidden)').length;
    }
    if (query) {
      node.textContent = `Showing ${visible} of ${state.data.subcategories.length} subcategories matching “${query}”.`;
    } else {
      node.textContent = `${state.data.subcategories.length} subcategories across ${state.data.mainCategories.length} main categories.`;
    }
  }

  // ---------- Price categories ----------
  function renderPriceCategories() {
    const grid = $('#priceGrid');
    if (!grid) return;
    grid.innerHTML = '';
    state.data.priceCategories.forEach((p, i) => {
      const card = el('a', {
        class: 'price-card stagger-card',
        href: '#products',
        dataset: { filter: p.filterValue },
        style: `--delay: ${i * 60}ms;`,
        onclick: (e) => {
          e.preventDefault();
          applyPriceFilter(p);
        }
      }, [
        el('h3', { class: 'price-label', textContent: p.label }),
        el('p', { class: 'price-desc', textContent: p.description }),
        el('span', { class: 'price-link', textContent: 'Filter products' })
      ]);
      grid.appendChild(card);
    });
  }

  function applyPriceFilter(priceCat) {
    // Clear existing price filter and set this one
    state.filters.price.clear();
    state.filters.price.add(priceCat.filterValue);
    // Update chips UI
    syncPriceChips();
    // Scroll to products
    document.getElementById('products')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    renderProducts();
  }

  function syncPriceChips() {
    $$('#filterPrice .filter-chip').forEach(chip => {
      const val = chip.dataset.value;
      chip.classList.toggle('is-active', state.filters.price.has(val));
    });
  }

  // ---------- Filters ----------
  function renderFilterControls() {
    const f = state.data.filters;

    // Brands
    const brandWrap = $('#filterBrands');
    f.brands.forEach(b => brandWrap.appendChild(makeChip('brand', b, b)));

    // Price
    const priceWrap = $('#filterPrice');
    state.data.priceCategories.forEach(p => {
      priceWrap.appendChild(makeChip('price', p.filterValue, p.label));
    });

    // Types
    const typeWrap = $('#filterType');
    f.types.forEach(t => typeWrap.appendChild(makeChip('type', t, t)));

    // Connectivity
    const connWrap = $('#filterConnectivity');
    f.connectivity.forEach(c => connWrap.appendChild(makeChip('connectivity', c, c)));

    // Features (ANC, Bluetooth) — combined
    const featWrap = $('#filterFeatures');
    f.features.anc.forEach(v => featWrap.appendChild(makeChip('anc', v, v)));
    f.features.bluetooth.forEach(v => featWrap.appendChild(makeChip('bluetooth', v, v)));

    // Back type
    const backWrap = $('#filterBackType');
    f.features.backType.forEach(v => backWrap.appendChild(makeChip('backType', v, v)));

    // Microphone
    const micWrap = $('#filterMic');
    f.features.microphone.forEach(v => micWrap.appendChild(makeChip('microphone', v, v)));

    // Product search
    const search = $('#productSearch');
    if (search) {
      search.addEventListener('input', e => {
        state.filters.search = e.target.value.trim().toLowerCase();
        renderProducts();
      });
    }

    // Sort
    const sort = $('#sortSelect');
    if (sort) {
      sort.addEventListener('change', e => {
        state.sort = e.target.value;
        renderProducts();
      });
    }

    // Reset
    $('#resetFiltersBtn')?.addEventListener('click', resetFilters);
    $('#emptyResetBtn')?.addEventListener('click', resetFilters);
  }

  function makeChip(group, value, label) {
    const id = `chip-${group}-${value.replace(/[^a-z0-9]+/gi, '-')}`.toLowerCase();
    const chip = el('label', { class: 'filter-chip', dataset: { value, group } }, [
      el('input', { type: 'checkbox', id, value, name: `filter-${group}` }),
      el('span', { textContent: label })
    ]);
    const input = $('input', chip);
    input.addEventListener('change', () => {
      const set = state.filters[group];
      if (input.checked) set.add(value); else set.delete(value);
      chip.classList.toggle('is-active', input.checked);
      renderProducts();
    });
    return chip;
  }

  function resetFilters() {
    Object.keys(state.filters).forEach(k => {
      if (state.filters[k] instanceof Set) state.filters[k].clear();
    });
    state.filters.search = '';
    state.sort = 'featured';
    $$('.filter-chip').forEach(c => {
      c.classList.remove('is-active');
      const input = $('input', c);
      if (input) input.checked = false;
    });
    const search = $('#productSearch');
    if (search) search.value = '';
    const sort = $('#sortSelect');
    if (sort) sort.value = 'featured';
    renderProducts();
  }

  // ---------- Product rendering + filtering ----------
  function priceInRange(price, filterValue) {
    const pc = state.data.priceCategories.find(p => p.filterValue === filterValue);
    if (!pc) return false;
    if (typeof price !== 'number') return false;
    const aboveMin = price >= pc.min;
    const belowMax = pc.max === null ? true : price <= pc.max;
    return aboveMin && belowMax;
  }

  function filterProducts() {
    let list = state.data.products.slice();

    const { search, brand, price, type, connectivity, anc, backType, microphone, bluetooth } = state.filters;

    if (search) {
      list = list.filter(p =>
        (p.name + ' ' + p.brand + ' ' + (p.description || '')).toLowerCase().includes(search)
      );
    }
    if (brand.size)        list = list.filter(p => brand.has(p.brand));
    if (price.size)        list = list.filter(p => {
      return Array.from(price).some(v => priceInRange(p.price, v));
    });
    if (type.size)         list = list.filter(p => type.has(p.specifications?.type));
    if (connectivity.size) list = list.filter(p => connectivity.has(p.specifications?.connectivity));
    if (anc.size) {
      list = list.filter(p => {
        const has = !!p.specifications?.anc;
        const wantsWith = anc.has('With ANC');
        const wantsWithout = anc.has('Without ANC');
        return (wantsWith && has) || (wantsWithout && !has);
      });
    }
    if (backType.size)     list = list.filter(p => backType.has(p.specifications?.backType));
    if (microphone.size) {
      list = list.filter(p => {
        const has = !!p.specifications?.microphone;
        const wantsWith = microphone.has('With Microphone');
        const wantsWithout = microphone.has('Without Microphone');
        return (wantsWith && has) || (wantsWithout && !has);
      });
    }
    if (bluetooth.size) {
      list = list.filter(p => {
        const has = !!p.specifications?.bluetooth;
        const wantsWith = bluetooth.has('Bluetooth');
        const wantsWithout = bluetooth.has('Non-Bluetooth');
        return (wantsWith && has) || (wantsWithout && !has);
      });
    }

    // Sort
    switch (state.sort) {
      case 'price-asc':  list.sort((a,b) => (a.price ?? Infinity) - (b.price ?? Infinity)); break;
      case 'price-desc': list.sort((a,b) => (b.price ?? -Infinity) - (a.price ?? -Infinity)); break;
      case 'name-asc':   list.sort((a,b) => a.name.localeCompare(b.name)); break;
      case 'name-desc':  list.sort((a,b) => b.name.localeCompare(a.name)); break;
      default: /* featured — keep original order */ break;
    }

    return list;
  }

  function renderProducts() {
    const grid = $('#productGrid');
    const empty = $('#emptyState');
    const count = $('#resultCount');
    if (!grid) return;

    const list = filterProducts();
    grid.innerHTML = '';

    if (!list.length) {
      empty.hidden = false;
      count.textContent = '0 products match your filters';
      return;
    }
    empty.hidden = true;
    count.textContent = `${list.length} product${list.length === 1 ? '' : 's'} match your filters`;

    list.forEach((p, i) => grid.appendChild(productCard(p, i)));
    observeCards();
  }

  function productCard(p, i) {
    const spec = p.specifications || {};
    const card = el('article', {
      class: 'product-card stagger-card',
      style: `--delay: ${Math.min(i, 8) * 60}ms;`,
      dataset: { id: p.id }
    });

    // Image
    const imgWrap = el('div', { class: 'product-image' });
    if (p.images?.primary) {
      imgWrap.appendChild(el('img', {
        src: p.images.primary,
        alt: `${p.brand} ${p.name}`,
        loading: 'lazy',
        width: 400, height: 400,
        onerror: 'this.style.display="none"'
      }));
    }
    imgWrap.appendChild(el('span', { class: 'product-brand', textContent: p.brand }));
    card.appendChild(imgWrap);

    // Body
    const body = el('div', { class: 'product-body' });

    body.appendChild(el('h3', { class: 'product-name', textContent: p.name }));
    if (p.description) body.appendChild(el('p', { class: 'product-desc', textContent: p.description }));

    // Spec pills
    const pills = el('div', { class: 'product-specs' });
    [spec.type, spec.connectivity, spec.backType, spec.anc ? 'ANC' : null]
      .filter(Boolean)
      .forEach(s => pills.appendChild(el('span', { class: 'spec-pill', textContent: s })));
    body.appendChild(pills);

    // Price
    if (typeof p.price === 'number') {
      body.appendChild(el('div', { class: 'product-price', textContent: `$${p.price.toFixed(2)}` }));
      if (p.priceNote) {
        body.appendChild(el('p', { class: 'product-price-note', textContent: p.priceNote }));
      }
    } else {
      body.appendChild(el('div', { class: 'product-price', textContent: 'See price on Amazon' }));
      body.appendChild(el('p', { class: 'product-price-note', textContent: 'Amazon displays the current price.' }));
    }

    // Actions
    const actions = el('div', { class: 'product-actions' });
    if (p.amazonUrl) {
      actions.appendChild(el('a', {
        class: 'product-cta',
        href: p.amazonUrl,
        target: '_blank',
        rel: 'nofollow sponsored noopener',
        textContent: 'Check price on Amazon'
      }));
    }
    if (p.reviewUrl) {
      actions.appendChild(el('a', {
        class: 'product-review-link',
        href: p.reviewUrl,
        textContent: 'Read our review →'
      }));
    }
    body.appendChild(actions);
    card.appendChild(body);
    return card;
  }

  // ---------- Articles ----------
  function renderArticles() {
    const grid = $('#articleGrid');
    if (!grid) return;
    grid.innerHTML = '';
    state.data.articles.forEach((a, i) => {
      const card = el('article', {
        class: 'article-card stagger-card',
        style: `--delay: ${Math.min(i, 6) * 70}ms;`
      });
      const imgWrap = el('a', { class: 'article-image', href: a.url || '#', 'ariaHidden': 'true', tabindex: '-1' });
      imgWrap.appendChild(el('img', {
        src: a.image,
        alt: a.alt || a.title,
        loading: 'lazy',
        width: 600, height: 340,
        onerror: 'this.style.display="none"'
      }));
      card.appendChild(imgWrap);

      const body = el('div', { class: 'article-body' }, [
        el('p', { class: 'article-category', textContent: a.category }),
        el('h3', { class: 'article-title' }, [
          el('a', { href: a.url || '#', textContent: a.title })
        ]),
        el('p', { class: 'article-summary', textContent: a.summary }),
        el('a', { class: 'article-link', href: a.url || '#', textContent: 'Read the guide' })
      ]);
      if (a.date) body.appendChild(el('p', { class: 'article-date', textContent: formatDate(a.date) }));
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  function formatDate(d) {
    try {
      return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return d; }
  }

  // Recompute accordion heights on resize (grids reflow)
  let resizeT;
  window.addEventListener('resize', () => {
    if (resizeT) cancelAnimationFrame(resizeT);
    resizeT = requestAnimationFrame(() => {
      $$('.acc-item.is-open .acc-panel').forEach(p => {
        p.style.maxHeight = 'none';
        const h = p.scrollHeight;
        p.style.maxHeight = h + 'px';
      });
    });
  });

})();
