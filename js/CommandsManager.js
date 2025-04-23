document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const commandCards = document.querySelectorAll('.command-card');
    let currentFilter = 'all';

    // Fonction pour filtrer
    function filterCommands(searchTerm, category) {
        commandCards.forEach(card => {
            const name = card.querySelector('.command-name')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.command-description')?.textContent.toLowerCase() || '';
            const cardCategory = card.dataset.category;

            const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = category === 'all' || cardCategory === category;

            card.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
        });
    }

    // Gestion recherche
    searchInput?.addEventListener('input', () => {
        filterCommands(searchInput.value.toLowerCase(), currentFilter);
    });

    // Gestion des filtres
    filterButtons?.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            filterCommands(searchInput.value.toLowerCase(), currentFilter);
        });
    });

    // Mise à jour des compteurs
    const categoryCounts = {
        all: 0,
        admin: 0,
        moderation: 0,
        fun: 0,
        utility: 0
    };

    commandCards.forEach(card => {
        const cat = card.dataset.category;
        if (categoryCounts[cat] !== undefined) categoryCounts[cat]++;
        categoryCounts.all++;
    });

    filterButtons.forEach(btn => {
        const cat = btn.dataset.category;
        btn.innerHTML = `${btn.textContent.split('(')[0].trim()} (${categoryCounts[cat] || 0})`;
    });
});
