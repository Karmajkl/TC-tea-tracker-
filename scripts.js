document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main');
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sections.forEach(section => section.style.display = 'none');
            document.querySelector(link.getAttribute('href')).style.display = 'block';
        });
    });

    // Load teas from localStorage
    loadTeas();

    // Handle rating form submission
    document.getElementById('rate-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const teaName = document.getElementById('tea-name').value;
        const teaType = document.getElementById('tea-type').value;
        const teaRating = document.getElementById('tea-rating').value;
        const teaReview = document.getElementById('tea-review').value;

        const tea = {
            name: teaName,
            type: teaType,
            rating: teaRating,
            review: teaReview
        };

        saveTea(tea);
        document.getElementById('rate-form').reset();
    });
});

function loadTeas() {
    const teaList = JSON.parse(localStorage.getItem('teas')) || [];
    const teaListContainer = document.getElementById('tea-list');
    teaListContainer.innerHTML = '';

    teaList.forEach(tea => {
        const teaItem = document.createElement('div');
        teaItem.className = 'tea-item';
        teaItem.innerHTML = `
            <h3>${tea.name}</h3>
            <p>Type: ${tea.type}</p>
            <p>Rating: ${tea.rating}</p>
            <p>Review: ${tea.review}</p>
            <button onclick="addToFavorites('${tea.name}')">Add to Favorites</button>
        `;
        teaListContainer.appendChild(teaItem);
    });

    loadFavorites();
}

function saveTea(tea) {
    const teaList = JSON.parse(localStorage.getItem('teas')) || [];
    teaList.push(tea);
    localStorage.setItem('teas', JSON.stringify(teaList));
    loadTeas();
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesListContainer = document.getElementById('favorites-list');
    favoritesListContainer.innerHTML = '';

    favorites.forEach(favorite => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <h3>${favorite.name}</h3>
            <p>Type: ${favorite.type}</p>
            <p>Rating: ${favorite.rating}</p>
            <p>Review: ${favorite.review}</p>
        `;
        favoritesListContainer.appendChild(favoriteItem);
    });
}

function addToFavorites(teaName) {
    const teaList = JSON.parse(localStorage.getItem('teas')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const tea = teaList.find(t => t.name === teaName);
    if (tea && !favorites.find(f => f.name === teaName)) {
        favorites.push(tea);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
    }
}
