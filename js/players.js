/* players.js - country filtering, name search, and click-to-flip
   (hover already flips on desktop; click makes it work on touch too). */

const filterButtons = document.querySelectorAll(".country-btn");
const playerCards = document.querySelectorAll(".player-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedCountry = button.getAttribute("data-country");

        playerCards.forEach(card => {
            const playerCountry = card.getAttribute("data-country");
            card.style.display = (selectedCountry === "all" || playerCountry === selectedCountry) ? "block" : "none";
        });
    });
});

// ---- Search players by name ----
const searchInput = document.getElementById("playerSearch");

if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
        const term = e.target.value.toLowerCase();

        playerCards.forEach(card => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = name.includes(term) ? "block" : "none";
        });
    });
}

// ---- Click-to-flip (so the achievement is reachable on touch screens too) ----
playerCards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
});
