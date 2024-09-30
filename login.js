document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (username === 'mor_2314' && password === '83r5^_') {
        // Successful login
        errorMessage.textContent = '';
        window.location.href = 'products.html';
    } else {
        // Failed login
        errorMessage.textContent = 'Invalid username or password';
    }
});