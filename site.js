
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
});

// ---- Mobile hamburger menu ----
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        hamburger.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Close the menu automatically once a link is picked
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            hamburger.classList.remove("active");
        });
    });
}

// ---- Dark mode toggle (preference saved in localStorage) ----
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("wc-theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";

        if (isDark) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("wc-theme", "light");
            themeToggle.textContent = "🌙";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("wc-theme", "dark");
            themeToggle.textContent = "☀️";
        }
    });
}


// ---- Reveal elements as they scroll into view ----
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
} else {
    // No IntersectionObserver support (or nothing to reveal) - just show it
    revealElements.forEach(el => el.classList.add("visible"));
}
