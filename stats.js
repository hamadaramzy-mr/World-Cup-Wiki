

// ---- Tab switching ----
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabPanels.forEach(panel => panel.classList.remove("active"));

        button.classList.add("active");
        const targetId = button.getAttribute("data-tab");
        document.getElementById(targetId).classList.add("active");
    });
});

// ---- Live search filter (applies to whichever table is currently shown) ----
const searchInput = document.getElementById("statsSearch");

searchInput.addEventListener("keyup", (e) => {
    const term = e.target.value.toLowerCase();
    const activePanel = document.querySelector(".tab-panel.active");
    const rows = activePanel.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const textContent = row.textContent.toLowerCase();
        row.style.display = textContent.includes(term) ? "" : "none";
    });
});

// ---- Click-to-sort table columns ----
document.querySelectorAll("table").forEach(table => {
    const headers = table.querySelectorAll("th");

    headers.forEach((header, columnIndex) => {
        header.addEventListener("click", () => {
            const tbody = table.querySelector("tbody");
            const rows = Array.from(tbody.querySelectorAll("tr"));
            const firstCellValue = rows[0].children[columnIndex].textContent.trim();
            const isNumeric = firstCellValue !== "" && !isNaN(firstCellValue);
            const sortingAscending = !header.classList.contains("sort-asc");

            rows.sort((rowA, rowB) => {
                const cellA = rowA.children[columnIndex].textContent.trim();
                const cellB = rowB.children[columnIndex].textContent.trim();

                if (isNumeric) {
                    return sortingAscending ? cellA - cellB : cellB - cellA;
                }
                return sortingAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
            });

            headers.forEach(h => h.classList.remove("sort-asc", "sort-desc"));
            header.classList.add(sortingAscending ? "sort-asc" : "sort-desc");

            rows.forEach(row => tbody.appendChild(row));
        });
    });
});
