document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("weekSearch");
    const results = document.getElementById("weekSearchResults");
    const menu = document.getElementById("weekDropdownMenu");

    if (!input || !results || !menu) {
        return;
    }

    const items = Array.from(menu.querySelectorAll(".dropdown-item")).map((item) => ({
        text: item.textContent.trim(),
        href: item.getAttribute("href")
    }));

    const normalize = (value) => value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const renderResults = (matches) => {
        results.innerHTML = "";

        if (matches.length === 0) {
            const empty = document.createElement("div");
            empty.className = "list-group-item disabled";
            empty.textContent = "Sin resultados";
            results.appendChild(empty);
            results.style.display = "block";
            return;
        }

        matches.forEach((match) => {
            const link = document.createElement("a");
            link.className = "list-group-item list-group-item-action";
            link.href = match.href;
            link.textContent = match.text;
            results.appendChild(link);
        });

        results.style.display = "block";
    };

    input.addEventListener("input", () => {
        const query = normalize(input.value.trim());

        if (!query) {
            results.style.display = "none";
            results.innerHTML = "";
            return;
        }

        const matches = items.filter((item) => normalize(item.text).includes(query));
        renderResults(matches);
    });

    input.addEventListener("focus", () => {
        if (results.children.length > 0) {
            results.style.display = "block";
        }
    });

    input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") {
            return;
        }

        const firstLink = results.querySelector("a");
        if (firstLink) {
            event.preventDefault();
            window.location.href = firstLink.href;
        }
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".nav-search")) {
            results.style.display = "none";
        }
    });
});