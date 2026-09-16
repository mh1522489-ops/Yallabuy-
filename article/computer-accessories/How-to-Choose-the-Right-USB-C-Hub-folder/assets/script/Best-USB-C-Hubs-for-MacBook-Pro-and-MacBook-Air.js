document.addEventListener("DOMContentLoaded", () => {
            // Initialize FAQ Accordion
            const faqItems = document.querySelectorAll(".faq-item");
            
            faqItems.forEach(item => {
                const button = item.querySelector(".faq-question");
                
                button.addEventListener("click", () => {
                    const isOpen = item.classList.contains("is-open");
                    
                    if (isOpen) {
                        item.classList.remove("is-open");
                        button.setAttribute("aria-expanded", "false");
                    } else {
                        item.classList.add("is-open");
                        button.setAttribute("aria-expanded", "true");
                    }
                });
            });

            // Initialize Mobile Menu Toggle
            const menuToggle = document.getElementById("menu-toggle");
            const primaryNav = document.getElementById("primary-nav");
            
            if (menuToggle && primaryNav) {
                menuToggle.addEventListener("click", () => {
                    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
                    primaryNav.classList.toggle("is-open");
                    menuToggle.setAttribute("aria-expanded", !isExpanded);
                    menuToggle.textContent = isExpanded ? "☰" : "✕";
                });
            }

            // Initialize Theme Toggle
            const themeToggle = document.getElementById("theme-toggle");
            const htmlElement = document.documentElement;
            
            const savedTheme = localStorage.getItem("yallbuy-theme");
            if (savedTheme) {
                htmlElement.dataset.theme = savedTheme;
                themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
            }

            if (themeToggle) {
                themeToggle.addEventListener("click", () => {
                    const currentTheme = htmlElement.dataset.theme;
                    const newTheme = currentTheme === "dark" ? "light" : "dark";
                    
                    htmlElement.dataset.theme = newTheme;
                    localStorage.setItem("yallbuy-theme", newTheme);
                    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
                });
            }

            // Initialize Sticky Buy Bar
            const stickyBar = document.getElementById("sticky-bar");
            const dismissSticky = document.getElementById("dismiss-sticky");
            const heroSection = document.querySelector(".hero-section");
            
            if (localStorage.getItem("yallbuy-sticky-dismissed") === "true") {
                stickyBar.style.display = "none";
            } else {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                            stickyBar.classList.add("is-visible");
                        } else {
                            stickyBar.classList.remove("is-visible");
                        }
                    });
                }, { threshold: 0 });

                if (heroSection) {
                    observer.observe(heroSection);
                }
            }

            if (dismissSticky) {
                dismissSticky.addEventListener("click", () => {
                    stickyBar.classList.remove("is-visible");
                    localStorage.setItem("yallbuy-sticky-dismissed", "true");
                    setTimeout(() => {
                        stickyBar.style.display = "none";
                    }, 300);
                });
            }
        });
