// Liste des produits avec leurs informations et catégories
const products = [
    // catégorie chaussures
    {
        image: './images/sportive.webp',
        title: 'Chaussures Sportives',
        description: 'Des chaussures confortables pour le sport.',
        price: '1$',
        link: 'https://www.amazon.com/lien-affiliation-produit1',
        id: 'clickProduct1',
        category: 'chaussures'
    },
    {
        image: './images/danse.jpg',
        title: 'Chaussures dance',
        description: 'Des chaussures confortables pour le sport.',
        price: '2$',
        link: 'https://www.amazon.com/lien-affiliation-produit1',
        id: 'clickProduct11',
        category: 'chaussures'
    },
    // catégorie bracelets
    {
        image: './images/braceletcuire.jpeg',
        title: 'Bracelet en Cuir',
        description: 'Un bracelet élégant en cuir véritable.',
        price: '3$',
        link: 'https://www.amazon.com/lien-affiliation-produit2',
        id: 'clickProduct2',
        category: 'bracelets'
    },
    // catégorie sacs
    {
        image: './images/sac_main.jpeg',
        title: 'Sac à Main',
        description: 'Un sac à main chic pour toutes les occasions.',
        price: '4$',
        link: 'https://www.amazon.com/lien-affiliation-produit3',
        id: 'clickProduct3',
        category: 'sacs'
    },
    // catégorie accessoires
    {
        image: './images/casquette.jpg',
        title: 'Casquette Sport',
        description: 'Casquette légère et respirante pour les sports.',
        price: '5$',
        link: 'https://www.amazon.com/lien-affiliation-produit4',
        id: 'clickProduct4',
        category: 'accessoires'
    }
];

// Fonction pour augmenter le compteur de clics et rediriger vers le lien du produit
function incrementClickCount(event, productId, productLink) {
    event.preventDefault(); // Prévenir le comportement par défaut du lien

    const clickCounts = JSON.parse(localStorage.getItem('clickCounts')) || {};
    clickCounts[productId] = (clickCounts[productId] || 0) + 1;
    localStorage.setItem('clickCounts', JSON.stringify(clickCounts));

    // Rediriger vers le lien du produit
    window.location.href = productLink;
}

// Fonction pour générer le contenu HTML pour chaque produit
function renderProductsByCategory(category) {
    const productsList = document.getElementById('products-list');
    const clickCounts = JSON.parse(localStorage.getItem('clickCounts')) || {};

    // Filtrer les produits par catégorie, ou afficher tous les produits si la catégorie est "all"
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

    // Trier les produits par nombre de clics en ordre décroissant
    const sortedProducts = filteredProducts.slice().sort((a, b) => {
        const clicksA = clickCounts[a.id] || 0;
        const clicksB = clickCounts[b.id] || 0;
        return clicksB - clicksA; // Tri décroissant
    });

    // Effacer le conteneur avant de ré-afficher les produits
    productsList.innerHTML = '';

    sortedProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p><strong style="color: red;">${product.price}</strong></p>
            <a href="${product.link}" class="buy-btn" onclick="incrementClickCount(event, '${product.id}', '${product.link}')">Acheter maintenant</a>
        `;
        productsList.appendChild(productDiv);
    });
}

// Fonction pour afficher les produits de la catégorie sélectionnée
function filterByCategory(category) {
    renderProductsByCategory(category);
}

// Fonction de recherche des produits
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const productDivs = document.querySelectorAll('.product');
    productDivs.forEach(div => {
        const title = div.querySelector('h2').textContent.toLowerCase();
        const description = div.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchInput) || description.includes(searchInput)) {
            div.style.display = '';
        } else {
            div.style.display = 'none';
        }
    });
}

// Appel initial pour générer les produits pour la catégorie par défaut (par exemple 'chaussures')
window.onload = function() {
    filterByCategory('chaussures'); // Affiche les produits de la catégorie 'chaussures' au chargement
};
