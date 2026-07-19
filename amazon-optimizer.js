/**
 * Amazon Affiliate Link Optimizer - SAFE VERSION
 * لا يضيع العمولة - آمن 100%
 */

(function() {
    'use strict';

    const CONFIG = {
        amazonDomains: {
            shortLinks: ['amzn.to'],
            fullDomains: ['amazon.com', 'amazon.co.uk', 'amazon.de', 'amazon.fr'],
            imageDomains: [
                'images-na.ssl-images-amazon.com',
                'm.media-amazon.com'
            ],
            adDomains: [
                'ws-na.amazon-adsystem.com',
                'fls-na.amazon.com'
            ]
        }
    };

    // ============================================
    // ✅ آمن - DNS Prefetch (مبيغيرش حاجة)
    // ============================================
    function addDnsPrefetch() {
        const head = document.head;
        const domains = [
            '//amzn.to',
            '//images-na.ssl-images-amazon.com',
            '//m.media-amazon.com'
        ];
        
        domains.forEach(domain => {
            const exists = head.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`);
            if (exists) return;
            
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            head.appendChild(link);
        });
    }

    // ============================================
    // ✅ آمن - Preconnect (مبيغيرش حاجة)
    // ============================================
    function addPreconnect() {
        const head = document.head;
        const domains = [
            'https://images-na.ssl-images-amazon.com',
            'https://m.media-amazon.com'
        ];
        
        domains.forEach(domain => {
            const exists = head.querySelector(`link[rel="preconnect"][href="${domain}"]`);
            if (exists) return;
            
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            head.appendChild(link);
        });
    }

    // ============================================
    // ✅ آمن - Optimize Links (مبيغيرش الـ href)
    // ============================================
    function optimizeAmazonLinks() {
        const links = document.querySelectorAll('a[href*="amzn.to"], a[href*="amazon."]');
        
        links.forEach(link => {
            if (link.dataset.amazonOptimized) return;
            
            const href = link.getAttribute('href');
            
            // ✅ rel="noopener noreferrer" = أمان فقط
            // ✅ rel="nofollow sponsored" = SEO فقط
            // ❌ مفيش أي تعديل على href!
            link.rel = 'noopener noreferrer nofollow sponsored';
            link.target = '_blank';
            
            link.dataset.amazonOptimized = 'true';
        });
    }

    // ============================================
    // ✅ آمن - Optimize Images (مبيغيرش روابط)
    // ============================================
    function optimizeAmazonImages() {
        const images = document.querySelectorAll('img[src*="amazon"], img[src*="amzn"]');
        
        images.forEach(img => {
            if (img.dataset.amazonImageOptimized) return;
            
            img.loading = 'lazy';
            img.decoding = 'async';
            
            img.dataset.amazonImageOptimized = 'true';
        });
    }

    // ============================================
    // ❌ محذوف - Prefetch on hover (ممكن يضيع عمولة)
    // ============================================
    // ما تضيفش prefetch لروابط amzn.to!
    
    // ============================================
    // ✅ آمن - Track clicks (للتحليل بس)
    // ============================================
    function trackClick(e) {
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        // Google Analytics (لو موجود)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'amazon_click', {
                event_category: 'affiliate',
                event_label: href
            });
        }
        
        // Data Layer
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'amazon_affiliate_click',
                amazon_url: href
            });
        }
    }

    function init() {
        addDnsPrefetch();
        addPreconnect();
        optimizeAmazonLinks();
        optimizeAmazonImages();
        
        // Track clicks (مش هيأثر على الرابط)
        document.querySelectorAll('a[data-amazon-optimized="true"]').forEach(link => {
            link.addEventListener('click', trackClick);
        });
        
        console.log('[Amazon Optimizer] Initialized (Safe Mode)');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
