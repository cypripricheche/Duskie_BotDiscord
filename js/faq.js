document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.getElementById('faqSearch');
    const categoryButtons = document.querySelectorAll('.category-btn');
    let currentCategory = 'all';

    // Toggle FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');

            // Add animation class
            if (!isActive) {
                item.querySelector('.faq-answer').style.display = 'block';
                requestAnimationFrame(() => {
                    item.classList.add('active');
                });
            } else {
                item.classList.remove('active');
                item.querySelector('.faq-answer').addEventListener('transitionend', function handler() {
                    if (!item.classList.contains('active')) {
                        item.querySelector('.faq-answer').style.display = 'none';
                    }
                    this.removeEventListener('transitionend', handler);
                });
            }
        });
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        filterItems(searchTerm, currentCategory);
    });

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            filterItems(searchInput.value.toLowerCase(), currentCategory);
        });
    });

    function filterItems(searchTerm, category) {
        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            const itemCategory = item.dataset.category;

            const matchesSearch = question.includes(searchTerm) || answer.includes(searchTerm);
            const matchesCategory = category === 'all' || itemCategory === category;

            item.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
        });

        const sectionDividers = document.querySelectorAll('.faq-subsection-divider');
        sectionDividers.forEach(divider => {
            const sectionText = divider.dataset.category;
            const currentCat = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            const shouldShowDivider =
                currentCat === 'all' || sectionText === currentCat;

            if (shouldShowDivider) {
                const relatedItems = Array.from(faqItems).filter(item =>
                    item.dataset.category === sectionText &&
                    item.style.display !== 'none'
                );
                divider.style.display = relatedItems.length > 0 ? 'flex' : 'none';
            } else {
                divider.style.display = 'none';
            }
        });
    }
});
