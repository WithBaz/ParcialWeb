document.addEventListener('DOMContentLoaded', () => {
    let allProducts = [];
    let categories = [];
    let currentUser = null;

    // Fetch user data
    fetch('https://fakestoreapi.com/users/1')
        .then(res => res.json())
        .then(user => {
            currentUser = user;
            document.getElementById('userInfo').textContent = `Bienvenido: ${user.name.firstname} ${user.name.lastname}`;
            // Fetch categories after user data is loaded
            return fetch('https://fakestoreapi.com/products/categories');
        })
        .then(response => response.json())
        .then(data => {
            categories = data;
            const categoryButtons = document.getElementById('categoryButtons');
            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = category;
                button.className = 'btn btn-outline-primary me-2';
                button.addEventListener('click', () => filterByCategory(category));
                categoryButtons.appendChild(button);
            });
            
            // Fetch all products after categories are loaded
            return fetch('https://fakestoreapi.com/products');
        })
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function displayProducts(products) {
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-sm-6 col-md-4 col-lg-3 mb-4';
            productCard.innerHTML = `
                <div class="card product-card">
                    <img src="${product.image}" class="card-img-top p-3" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title product-title">${product.title}</h5>
                        <p class="card-text text-muted">${product.category}</p>
                        <p class="card-text fw-bold">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary mt-auto add-to-cart" data-product-id="${product.id}">Añadir al Carrito</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    function filterByCategory(category) {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(response => response.json())
            .then(data => {
                displayProducts(data);
            });
    }

    function addToCart(event) {
        const productId = event.target.getAttribute('data-product-id');
        // This example uses a mock product for adding to the cart
        const mockProduct = {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        };

        // Simulate adding product to cart (modify as needed)
        console.log(`Producto ${productId} agregado al carrito`, mockProduct);

        // Show modal
        const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
        addProductModal.show();
    }

    // Add event listener for the search button (non-funcional)
    document.querySelector('.input-group button').addEventListener('click', () => {
        console.log('Search button clicked, but no action taken as per requirements');
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
