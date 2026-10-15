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
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("open");

        hamburger.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Close menu after clicking a link
    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("open");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });
}