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

// Mot de passe de sécurité (changez-le selon vos préférences)
const correctPassword = "Dramane123456@";

// Fonction pour vérifier le mot de passe avant de réinitialiser
function verifyPassword() {
    const password = prompt("Entrez le mot de passe pour réinitialiser les clics :");
    if (password === correctPassword) {
        resetClicks(); // Réinitialiser les clics si le mot de passe est correct
    } else {
        alert("Mot de passe incorrect.");
    }
}

// Fonction pour réinitialiser les clics
function resetClicks() {
    localStorage.removeItem('clickCounts');
    renderProducts(); // Recharge les produits après réinitialisation
}

// Fonction pour générer le contenu HTML pour chaque produit en fonction du nombre de clics
function renderProducts() {
    const productsList = document.getElementById('products-list');
    const clickCounts = JSON.parse(localStorage.getItem('clickCounts')) || {};

    // Trier les produits en fonction du nombre de clics en ordre décroissant (du plus cliqué au moins cliqué)
    const sortedProducts = products.slice().sort((a, b) => {
        const clicksA = clickCounts[a.id] || 0;
        const clicksB = clickCounts[b.id] || 0;
        return clicksB - clicksA; // Tri décroissant
    });

    // Effacer le contenu avant de le recréer
    productsList.innerHTML = '';

    sortedProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p class="click-count"><strong>Nombre d'achat</strong>: ${clickCounts[product.id] || 0}</p>
        `;
        productsList.appendChild(productDiv);
    });
}

// Appel initial pour générer les produits triés par nombre de clics décroissant
window.onload = function() {
    renderProducts();

    // Ajout de l'événement au bouton réinitialiser
    document.getElementById('reset-btn').addEventListener('click', verifyPassword);
};
