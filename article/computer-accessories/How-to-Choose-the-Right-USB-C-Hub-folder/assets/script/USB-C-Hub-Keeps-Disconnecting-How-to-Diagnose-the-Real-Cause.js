(function () {
    "use strict";

    var STORAGE_KEYS = {
        theme: "yallabuy-theme"
    };

    function initThemeToggle() {
        var toggle = document.querySelector("#theme-toggle");
        if (!toggle) return;

        try {
            var saved = localStorage.getItem(STORAGE_KEYS.theme);
            if (saved === "dark" || saved === "light") {
                document.documentElement.setAttribute("data-theme", saved);
                toggle.setAttribute("aria-pressed", String(saved === "dark"));
            }
        } catch (e) {
            console.warn("Theme read failed:", e);
        }

        toggle.addEventListener("click", function () {
            var current = document.documentElement.getAttribute("data-theme") || "light";
            var next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            toggle.setAttribute("aria-pressed", String(next === "dark"));
            try {
                localStorage.setItem(STORAGE_KEYS.theme, next);
            } catch (e) {
                console.warn("Theme save failed:", e);
            }
        });
    }

    function initMobileMenu() {
        var toggle = document.querySelector("#menu-toggle");
        var menu = document.querySelector("#mobile-menu");
        if (!toggle || !menu) return;

        toggle.addEventListener("click", function () {
            var isOpen = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!isOpen));
            menu.hidden = isOpen;
        });

        menu.addEventListener("click", function (e) {
            if (e.target.tagName === "A") {
                toggle.setAttribute("aria-expanded", "false");
                menu.hidden = true;
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key !== "Escape") return;
            if (toggle.getAttribute("aria-expanded") !== "true") return;
            toggle.setAttribute("aria-expanded", "false");
            menu.hidden = true;
            toggle.focus();
        });
    }

    function initFaq() {
        var triggers = document.querySelectorAll(".faq-trigger");
        if (triggers.length === 0) return;

        var triggerArray = Array.prototype.slice.call(triggers);

        triggers.forEach(function (trigger) {
            trigger.addEventListener("click", function () {
                var panelId = trigger.getAttribute("aria-controls");
                var panel = document.getElementById(panelId);
                if (!panel) return;
                var isOpen = trigger.getAttribute("aria-expanded") === "true";
                var item = trigger.closest(".faq-item");

                trigger.setAttribute("aria-expanded", String(!isOpen));
                panel.hidden = isOpen;
                if (item) item.classList.toggle("is-open", !isOpen);
            });

            trigger.addEventListener("keydown", function (e) {
                if (e.key !== "Escape") return;
                var isOpen = trigger.getAttribute("aria-expanded") === "true";
                if (!isOpen) return;
                var panelId = trigger.getAttribute("aria-controls");
                var panel = document.getElementById(panelId);
                var item = trigger.closest(".faq-item");
                trigger.setAttribute("aria-expanded", "false");
                if (panel) panel.hidden = true;
                if (item) item.classList.remove("is-open");
                trigger.focus();
            });
        });

        document.addEventListener("keydown", function (e) {
            var active = document.activeElement;
            if (!active || !active.classList.contains("faq-trigger")) return;
            var index = triggerArray.indexOf(active);
            if (index === -1) return;
            var target = -1;
            if (e.key === "ArrowDown") {
                target = (index + 1) % triggerArray.length;
            } else if (e.key === "ArrowUp") {
                target = (index - 1 + triggerArray.length) % triggerArray.length;
            }
            if (target >= 0) {
                e.preventDefault();
                triggerArray[target].focus();
            }
        });
    }

    function initImageFallback() {
        var placeholder =
            "data:image/svg+xml;utf8," +
            encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
                '<rect width="800" height="600" fill="#f3f1ec"/>' +
                '<rect x="320" y="240" width="160" height="120" rx="8" fill="#d8d2c5"/>' +
                '<circle cx="400" cy="300" r="40" fill="#767676"/>' +
                '<path d="M380 290 L420 310 L380 330 Z" fill="#fff"/>' +
                '<text x="400" y="400" font-family="Arial" font-size="16" fill="#767676" text-anchor="middle">Image unavailable</text>' +
                "</svg>"
            );

        document.querySelectorAll("img").forEach(function (img) {
            img.addEventListener("error", function () {
                if (img.dataset.fallbackApplied === "1") return;
                img.dataset.fallbackApplied = "1";
                img.src = placeholder;
            });
        });
    }

    function init() {
        initThemeToggle();
        initMobileMenu();
        initFaq();
        initImageFallback();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
