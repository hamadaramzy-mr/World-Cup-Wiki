/* balls.js - "like" voting saved in localStorage, plus filtering
   the ball grid by era. */

const voteButtons = document.querySelectorAll(".vote-btn");

// Load existing votes (or start at 0) for every ball on the page
voteButtons.forEach(button => {
    const ballId = button.getAttribute("data-ball");
    const countSpan = document.getElementById(`${ballId}-votes`);

    let savedVotes = parseInt(localStorage.getItem(`${ballId}-votes`), 10) || 0;
    countSpan.textContent = savedVotes;

    button.addEventListener("click", () => {
        savedVotes++;
        localStorage.setItem(`${ballId}-votes`, savedVotes);
        countSpan.textContent = savedVotes;

        // small pop animation for feedback
        button.classList.add("pulse");
        setTimeout(() => button.classList.remove("pulse"), 300);
    });
});

// ---- Filter balls by era ----
const eraButtons = document.querySelectorAll(".era-btn");
const ballCards = document.querySelectorAll(".ball-card");

eraButtons.forEach(button => {
    button.addEventListener("click", () => {
        eraButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const era = button.getAttribute("data-era");

        ballCards.forEach(card => {
            const cardEra = card.getAttribute("data-era");
            card.style.display = (era === "all" || cardEra === era) ? "block" : "none";
        });
    });
});
