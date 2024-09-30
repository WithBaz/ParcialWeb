let allProducts = [];
let categories = [];

// Fetch all products
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        displayProducts(allProducts);
    });

// Fetch categories and create category buttons
fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(data => {
        categories = data;
        const categoryButtons = document.getElementById('categoryButtons');
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.addEventListener('click', () => filterByCategory(category));
            categoryButtons.appendChild(button);
        });
    });

function displayProducts(products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-button">Add</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function filterByCategory(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        });
}

document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});