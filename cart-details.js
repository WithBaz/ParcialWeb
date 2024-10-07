document.addEventListener('DOMContentLoaded', () => {
    let currentUser = null;

    // Obtener el parámetro 'id' del carrito de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const cartId = urlParams.get('id');

    // Verificar si el cartId fue correctamente extraído de la URL
    if (!cartId) {
        console.error('ID de carrito no especificado en la URL');
        return;
    } else {
        console.log(`Cart ID recibido de la URL: ${cartId}`);
    }

    // Fetch user data
    fetch('https://fakestoreapi.com/users/1')
        .then(res => res.json())
        .then(user => {
            currentUser = user;
            document.getElementById('userInfo').textContent = `Bienvenido: ${user.name.firstname} ${user.name.lastname}`;
            document.getElementById('clientName').value = `${user.name.firstname} ${user.name.lastname}`;
            return fetch(`https://fakestoreapi.com/carts/${cartId}`);
        })
        .then(res => res.json())
        .then(cart => {
            console.log("Detalles del carrito recibidos:", cart);  // Verificar la respuesta del carrito
            if (!cart || !cart.products || cart.products.length === 0) {
                console.warn('No se encontraron productos en el carrito.');
                document.getElementById('productList').innerHTML = '<tr><td colspan="4">No hay productos en el carrito</td></tr>';
                return;
            }
            displayCartDetails(cart);
        })
        .catch(error => {
            console.error('Error fetching cart details:', error); // Capturar errores
        });

    function displayCartDetails(cart) {
        document.getElementById('orderDate').value = new Date(cart.date).toLocaleDateString();
        document.getElementById('orderNumber').value = cart.id;

        const productList = document.getElementById('productList');
        let total = 0;

        // Iterar sobre los productos del carrito
        cart.products.forEach(product => {
            console.log(`Obteniendo detalles del producto con ID: ${product.productId}`); // Verificar ID del producto
            fetch(`https://fakestoreapi.com/products/${product.productId}`)
                .then(res => res.json())
                .then(productDetails => {
                    console.log("Detalles del producto recibidos:", productDetails);  // Verificar los detalles del producto
                    const row = document.createElement('tr');
                    const subtotal = product.quantity * productDetails.price;
                    total += subtotal;

                    row.innerHTML = `
                        <td>${productDetails.title}</td>
                        <td>${product.quantity}</td>
                        <td>$${productDetails.price.toFixed(2)}</td>
                        <td>$${subtotal.toFixed(2)}</td>
                    `;
                    productList.appendChild(row);

                    // Actualizar el total
                    document.getElementById('totalAmount').textContent = total.toFixed(2);
                })
                .catch(error => {
                    console.error(`Error fetching product details for product ID ${product.productId}:`, error);
                });
        });
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Add event listeners for update and confirm buttons
    document.getElementById('updateBtn').addEventListener('click', () => {
        console.log('Update button clicked');
    });

    document.getElementById('confirmBtn').addEventListener('click', () => {
        console.log('Confirm button clicked');
    });
});
