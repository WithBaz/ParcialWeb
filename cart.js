document.addEventListener('DOMContentLoaded', () => {
    let currentUser = null;

    // Fetch user data
    fetch('https://fakestoreapi.com/users/1')
        .then(res => res.json())
        .then(user => {
            currentUser = user;
            document.getElementById('userInfo').textContent = `Bienvenido: ${user.name.firstname} ${user.name.lastname}`;
            return fetch('https://fakestoreapi.com/carts/user/1');
        })
        .then(res => res.json())
        .then(carts => {
            displayCarts(carts);
        });

    function displayCarts(carts) {
        const cartList = document.getElementById('cartList');
        cartList.innerHTML = '';
        carts.forEach(cart => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cart.id}</td>
                <td>${new Date(cart.date).toLocaleDateString()}</td>
                <td><a href="cart-details.html?id=${cart.id}" class="btn btn-sm btn-primary view-cart">ver</a></td>
            `;
            cartList.appendChild(row);
        });
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        // In a real application, you would handle logout here
        window.location.href = 'index.html';
    });
});