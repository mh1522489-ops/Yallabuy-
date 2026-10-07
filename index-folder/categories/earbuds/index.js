// === STATE ===
let allProducts = [];
let filteredProducts = [];
let compareList = [];
let visibleCount = 100;
let searchDebounceTimer = null;
let autocompleteItems = [];
let autocompleteIndex = -1;

const PICKS_CONFIG = [
    { tag: 'Noise Cancellation', eyebrow: 'Best ANC', id: 'sony-wh-1000xm6' },
    { tag: 'Battery Life', eyebrow: 'Longest Battery', id: 'sennheiser-momentum-4' },
    { tag: 'Audiophile', eyebrow: 'Audiophile Pick', id: 'focal-bathys' },
    { tag: 'Budget', eyebrow: 'Best Value', id: 'anker-soundcore-q30' }
];

// === LOAD PRODUCTS ===
async function loadProducts() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to load');
        allProducts = await response.json();
        // Normalize: ensure searchTerms exist
        allProducts = allProducts.map(p => ({
            ...p,
            searchTerms: p.searchTerms || generateSearchTerms(p)
        }));
        filteredProducts = [...allProducts];
        renderPicks();
        renderBrands();
        renderProducts();
        updateResultCount();
        document.getElementById('lastUpdated').textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch (error) {
        showError();
    }
}

function generateSearchTerms(product) {
    const terms = [
        product.name?.toLowerCase(),
        product.brand?.toLowerCase(),
        product.type?.toLowerCase(),
        product.wireless ? 'wireless' : 'wired',
        product.noiseCancelling ? 'noise cancelling' : '',
        product.noiseCancelling ? 'anc' : '',
        product.connectivity?.toLowerCase(),
        ...(product.tags || []).map(t => t.toLowerCase())
    ].filter(Boolean);
    return [...new Set(terms)];
}

// === RENDER PICKS ===
function renderPicks() {
    const grid = document.getElementById('picksGrid');
    grid.innerHTML = '';
    
    PICKS_CONFIG.forEach((config, idx) => {
        const product = allProducts.find(p => p.id === config.id);
        if (!product) return;
        
        const card = document.createElement('a');
        card.className = 'pick' + (idx === 0 ? ' wide' : '');
        card.href = product.detailsUrl || '#';
        card.innerHTML = `
            <div class="pick-image">
                <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
                <span class="pick-tag">${config.tag}</span>
            </div>
            <div class="pick-body">
                <div class="pick-eyebrow">${config.eyebrow}</div>
                <h3 class="pick-name">${product.name}</h3>
                <p class="pick-desc">${product.summary || 'A standout pick in its category.'}</p>
                <div class="pick-meta">
                    <span class="pick-price">${product.price ? '$' + product.price : 'Price N/A'}</span>
                    <span class="pick-link">View Details →</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// === RENDER BRANDS ===
function renderBrands() {
    const row = document.getElementById('brandsRow');
    const brandCounts = {};
    allProducts.forEach(p => {
        brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    });
    
    const brands = Object.keys(brandCounts).sort((a, b) => brandCounts[b] - brandCounts[a]);
    row.innerHTML = '';
    
    brands.forEach(brand => {
        const chip = document.createElement('button');
        chip.className = 'brand-chip';
        chip.innerHTML = `${brand} <span class="brand-chip-count">${brandCounts[brand]}</span>`;
        chip.addEventListener('click', () => {
            const search = document.getElementById('headphoneSearch');
            search.value = brand;
            searchProducts(brand);
            search.focus();
            window.scrollTo({ top: document.getElementById('catalog').offsetTop - 80, behavior: 'smooth' });
        });
        row.appendChild(chip);
    });
}

// === SEARCH ===
function initializeSearch() {
    const input = document.getElementById('headphoneSearch');
    const clearBtn = document.getElementById('searchClear');
    
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        clearBtn.classList.toggle('visible', value.length > 0);
        
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => {
            searchProducts(value);
            if (value.length > 0) {
                renderAutocomplete(value);
            } else {
                closeAutocomplete();
            }
        }, 200);
    });
    
    input.addEventListener('focus', () => {
        if (input.value.length > 0) {
            renderAutocomplete(input.value);
        }
    });
    
    input.addEventListener('keydown', handleSearchKeyboard);
    
    clearBtn.addEventListener('click', () => {
        clearSearch();
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            closeAutocomplete();
        }
    });
    
    // Escape key global
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAutocomplete();
            if (document.activeElement === input) input.blur();
        }
    });
}

function searchProducts(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(p => {
            return p.searchTerms.some(term => term.includes(q)) ||
                   p.name.toLowerCase().includes(q) ||
                   p.brand.toLowerCase().includes(q);
        });
    }
    visibleCount = 12;
    renderProducts();
    updateResultCount();
}

function renderAutocomplete(query) {
    const dropdown = document.getElementById('autocomplete');
    const input = document.getElementById('headphoneSearch');
    const q = query.trim().toLowerCase();
    
    if (!q) {
        closeAutocomplete();
        return;
    }
    
    // Find matches
    const matches = allProducts.filter(p => {
        return p.searchTerms.some(term => term.includes(q)) ||
               p.name.toLowerCase().includes(q) ||
               p.brand.toLowerCase().includes(q);
    }).slice(0, 7);
    
    // Group: show brand matches first if query matches a brand exactly
    const brandMatches = [...new Set(matches.map(m => m.brand))].filter(b => b.toLowerCase().includes(q));
    
    if (matches.length === 0) {
        dropdown.innerHTML = `<div class="autocomplete-empty">No headphones found for "${escapeHtml(query)}"</div>`;
        dropdown.classList.add('open');
        input.setAttribute('aria-expanded', 'true');
        autocompleteItems = [];
        autocompleteIndex = -1;
        return;
    }
    
    let html = `<div class="autocomplete-header">Products</div>`;
    
    // Add brand shortcut if applicable
    if (brandMatches.length > 0 && q.length >= 2) {
        brandMatches.slice(0, 1).forEach(brand => {
            html += `
                <div class="autocomplete-item" data-type="brand" data-value="${escapeHtml(brand)}" role="option">
                    <div class="autocomplete-item-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 7v14M21 7v14M6 21V10h12v11"/></svg>
                    </div>
                    <div class="autocomplete-item-content">
                        <div class="autocomplete-item-name">${highlightMatch(brand, q)}</div>
                        <div class="autocomplete-item-meta">Browse all ${brand} headphones</div>
                    </div>
                </div>
            `;
        });
    }
    
    matches.forEach(p => {
        const meta = [p.type, p.wireless ? 'Wireless' : 'Wired', p.noiseCancelling ? 'ANC' : ''].filter(Boolean).join(' · ');
        html += `
            <div class="autocomplete-item" data-type="product" data-value="${escapeHtml(p.name)}" role="option">
                <div class="autocomplete-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
                </div>
                <div class="autocomplete-item-content">
                    <div class="autocomplete-item-name">${highlightMatch(p.name, q)}</div>
                    <div class="autocomplete-item-meta">${p.brand} · ${meta}</div>
                </div>
            </div>
        `;
    });
    
    dropdown.innerHTML = html;
    dropdown.classList.add('open');
    input.setAttribute('aria-expanded', 'true');
    
    autocompleteItems = Array.from(dropdown.querySelectorAll('.autocomplete-item'));
    autocompleteIndex = -1;
    
    // Click handlers
    autocompleteItems.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.dataset.value;
            const input = document.getElementById('headphoneSearch');
            input.value = value;
            searchProducts(value);
            closeAutocomplete();
            input.blur();
            window.scrollTo({ top: document.getElementById('catalog').offsetTop - 80, behavior: 'smooth' });
        });
        item.addEventListener('mouseenter', () => {
            autocompleteItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            autocompleteIndex = autocompleteItems.indexOf(item);
        });
    });
}

function handleSearchKeyboard(e) {
    const input = document.getElementById('headphoneSearch');
    const dropdown = document.getElementById('autocomplete');
    
    if (!dropdown.classList.contains('open')) {
        if (e.key === 'ArrowDown' && input.value.length > 0) {
            renderAutocomplete(input.value);
        }
        return;
    }
    
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            autocompleteIndex = Math.min(autocompleteIndex + 1, autocompleteItems.length - 1);
            updateActiveItem();
            break;
        case 'ArrowUp':
            e.preventDefault();
            autocompleteIndex = Math.max(autocompleteIndex - 1, -1);
            updateActiveItem();
            break;
        case 'Enter':
            e.preventDefault();
            if (autocompleteIndex >= 0 && autocompleteItems[autocompleteIndex]) {
                const value = autocompleteItems[autocompleteIndex].dataset.value;
                input.value = value;
                searchProducts(value);
                closeAutocomplete();
                input.blur();
                window.scrollTo({ top: document.getElementById('catalog').offsetTop - 80, behavior: 'smooth' });
            } else {
                searchProducts(input.value);
                closeAutocomplete();
                input.blur();
                window.scrollTo({ top: document.getElementById('catalog').offsetTop - 80, behavior: 'smooth' });
            }
            break;
        case 'Escape':
            closeAutocomplete();
            break;
        case 'Tab':
            closeAutocomplete();
            break;
    }
}

function updateActiveItem() {
    autocompleteItems.forEach(item => item.classList.remove('active'));
    if (autocompleteIndex >= 0 && autocompleteItems[autocompleteIndex]) {
        autocompleteItems[autocompleteIndex].classList.add('active');
        autocompleteItems[autocompleteIndex].scrollIntoView({ block: 'nearest' });
    }
}

function closeAutocomplete() {
    const dropdown = document.getElementById('autocomplete');
    const input = document.getElementById('headphoneSearch');
    dropdown.classList.remove('open');
    input.setAttribute('aria-expanded', 'false');
    autocompleteIndex = -1;
}

function clearSearch() {
    const input = document.getElementById('headphoneSearch');
    input.value = '';
    document.getElementById('searchClear').classList.remove('visible');
    filteredProducts = [...allProducts];
    visibleCount = 12;
    renderProducts();
    updateResultCount();
    closeAutocomplete();
    input.focus();
}

function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// === RENDER PRODUCTS ===
function renderProducts() {
    const grid = document.getElementById('productGrid');
    const loadMoreWrap = document.getElementById('loadMoreWrap');
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <h3>No headphones found</h3>
                <p>Try searching for another brand, model, or feature.</p>
                <button class="btn btn-primary" style="display: inline-flex; padding: 12px 24px;" onclick="clearSearch()">Clear Search</button>
            </div>
        `;
        loadMoreWrap.classList.add('hidden');
        return;
    }
    
    const toShow = filteredProducts.slice(0, visibleCount);
    grid.innerHTML = '';
    toShow.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
    
    // Show/hide load more
    if (filteredProducts.length > visibleCount) {
        loadMoreWrap.classList.remove('hidden');
        const remaining = filteredProducts.length - visibleCount;
        document.getElementById('loadMoreBtn').textContent = `Load more (${remaining} remaining)`;
    } else {
        loadMoreWrap.classList.add('hidden');
    }
    
    // Re-attach compare checkbox handlers
    attachCompareHandlers();
}

function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    const isComparing = compareList.includes(product.id);
    
    const batteryText = product.batteryLife ? `Up to ${product.batteryLife} hours` : 'Wired';
    const wirelessText = product.wireless ? 'Wireless' : 'Wired';
    const ancText = product.noiseCancelling ? 'Yes' : 'No';
    const priceText = product.price ? `$${product.price}` : 'Price N/A';
    
    let actionsHtml = '<div class="product-actions">';
    if (product.amazonUrl) {
        actionsHtml += `<a href="${product.amazonUrl}" target="_blank" rel="nofollow sponsored noopener" class="btn btn-primary">Buy on Amazon</a>`;
    }
    if (product.detailsUrl) {
        actionsHtml += `<a href="${product.detailsUrl}" class="btn btn-secondary">View Details</a>`;
    }
    actionsHtml += '</div>';
    
    card.innerHTML = `
        <div class="product-image-wrapper">
            <img src="${product.imageUrl}" alt="${product.name}" loading="lazy" width="400" height="400">
            <span class="product-type-badge">${product.type}</span>
        </div>
        <div class="product-body">
            <div class="product-brand">${product.brand}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-meta">${product.type} · ${wirelessText}${product.noiseCancelling ? ' · Noise Cancelling' : ''}</p>
            <div class="product-specs">
                <div class="spec-row"><span class="spec-label">Battery</span><span class="spec-value">${batteryText}</span></div>
                <div class="spec-row"><span class="spec-label">ANC</span><span class="spec-value">${ancText}</span></div>
                <div class="spec-row"><span class="spec-label">Weight</span><span class="spec-value">${product.weight ? product.weight + 'g' : 'N/A'}</span></div>
            </div>
            <div class="product-footer">
                <div class="product-price">${priceText}</div>
                ${actionsHtml}
                <button class="btn-ghost ${isComparing ? 'checked' : ''}" data-compare-id="${product.id}" aria-pressed="${isComparing}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0H5a2 2 0 0 1-2-2v-4m6 6h10a2 2 0 0 0 2-2v-4"/></svg>
                    ${isComparing ? 'Added to Compare' : 'Compare'}
                </button>
            </div>
        </div>
    `;
    return card;
}

function updateResultCount() {
    const countEl = document.getElementById('resultCount');
    const titleEl = document.getElementById('catalogTitle');
    const total = filteredProducts.length;
    
    if (total === allProducts.length) {
        countEl.innerHTML = `<strong>${total}</strong> headphones`;
        titleEl.textContent = 'All Headphones';
    } else {
        countEl.innerHTML = `<strong>${total}</strong> ${total === 1 ? 'headphone' : 'headphones'} found`;
        titleEl.textContent = 'Search Results';
    }
}

function loadMoreProducts() {
    visibleCount += 12;
    renderProducts();
    // Scroll to first new item
    setTimeout(() => {
        const cards = document.querySelectorAll('.product-card');
        if (cards[visibleCount - 12]) {
            cards[visibleCount - 12].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

// === COMPARISON ===
function attachCompareHandlers() {
    document.querySelectorAll('[data-compare-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.dataset.compareId;
            toggleCompare(id);
        });
    });
}

function toggleCompare(id) {
    const idx = compareList.indexOf(id);
    if (idx >= 0) {
        compareList.splice(idx, 1);
        showToast('Removed from comparison');
    } else {
        if (compareList.length >= 4) {
            showToast('You can compare up to 4 products');
            return;
        }
        compareList.push(id);
        showToast('Added to comparison');
    }
    renderProducts();
    renderComparison();
    updateCompareFloating();
}

function renderComparison() {
    const container = document.getElementById('comparisonContainer');
    
    if (compareList.length < 1) {
        container.innerHTML = `
            <div class="comparison-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/><path d="M9 6v12M15 6v12"/></svg>
                <h3>No products selected yet</h3>
                <p>Pick 2–4 headphones from the catalog above to compare their specs side-by-side.</p>
            </div>
        `;
        return;
    }
    
    const products = compareList.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
    
    let html = '<div class="comparison-table-wrap"><table class="comparison-table"><thead><tr><th>Product</th>';
    products.forEach(p => {
        html += `<th><div class="compare-product">
            <img src="${p.imageUrl}" alt="${p.name}">
            <div class="compare-product-info">
                <div class="compare-product-name">${p.name}</div>
                <div class="compare-product-brand">${p.brand}</div>
            </div>
        </div><button class="compare-remove" data-remove-id="${p.id}" aria-label="Remove ${p.name}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></th>`;
    });
    html += '</tr></thead><tbody>';
    
    const rows = [
        { label: 'Price', key: 'price', format: (v) => v ? '$' + v : 'N/A', class: 'price' },
        { label: 'Type', key: 'type', format: (v) => v || 'N/A' },
        { label: 'Wireless', key: 'wireless', format: (v) => v === true ? 'Yes' : v === false ? 'No' : 'N/A' },
        { label: 'Noise Cancelling', key: 'noiseCancelling', format: (v) => v === true ? 'Yes' : v === false ? 'No' : 'N/A' },
        { label: 'Battery Life', key: 'batteryLife', format: (v) => v ? v + ' hours' : 'N/A (Wired)' },
        { label: 'Weight', key: 'weight', format: (v) => v ? v + 'g' : 'N/A' },
        { label: 'Connectivity', key: 'connectivity', format: (v) => v || 'N/A' },
        { label: 'Water Resistance', key: 'waterResistance', format: (v) => v && v !== 'None' ? v : 'None' },
        { label: 'Microphone', key: 'microphone', format: (v) => v === true ? 'Yes' : v === false ? 'No' : 'N/A' }
    ];
    
    rows.forEach(row => {
        html += `<tr><td>${row.label}</td>`;
        products.forEach(p => {
            const value = p[row.key];
            const display = row.format(value);
            const isNa = display === 'N/A' || display.includes('N/A');
            html += `<td><span class="compare-value ${row.class || ''} ${isNa ? 'na' : ''}">${display}</span></td>`;
        });
        html += '</tr>';
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
    
    // Remove handlers
    container.querySelectorAll('[data-remove-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleCompare(btn.dataset.removeId);
        });
    });
}

function updateCompareFloating() {
    const floating = document.getElementById('compareFloating');
    const count = document.getElementById('compareCount');
    count.textContent = compareList.length;
    floating.classList.toggle('visible', compareList.length > 0);
}

// === FAQ ===
function initializeFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            document.querySelectorAll('.faq-question').forEach(q => q.setAttribute('aria-expanded', 'false'));
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// === MOBILE MENU ===
function initializeMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('mobileMenu');
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });
}

// === TOAST ===
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// === ERROR ===
function showError() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            <h3>We couldn't load the headphone catalog</h3>
            <p>Please try again later. If the problem persists, contact us.</p>
            <button class="btn btn-primary" style="display: inline-flex; padding: 12px 24px;" onclick="location.reload()">Retry</button>
        </div>
    `;
    document.getElementById('resultCount').textContent = 'Unable to load products';
}

// === TOC SCROLL SPY ===
function initializeTOC() {
    const links = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.guide-section');
    
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.toc-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-100px 0px -70% 0px' });
    
    sections.forEach(s => observer.observe(s));
}

// === LOAD MORE BUTTON ===
document.getElementById('loadMoreBtn').addEventListener('click', loadMoreProducts);

// === COMPARE FLOATING ===
document.getElementById('compareFloating').addEventListener('click', () => {
    document.getElementById('comparison').scrollIntoView({ behavior: 'smooth' });
});

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initializeSearch();
    initializeFAQ();
    initializeMobileMenu();
    initializeTOC();
});
