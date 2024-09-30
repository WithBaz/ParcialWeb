document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const loadingMessage = document.getElementById('loadingMessage');
    
    // Clear previous messages
    errorMessage.textContent = '';
    loadingMessage.textContent = 'Logging in...';
    
    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Login failed');
        }
        return res.json();
    })
    .then(json => {
        console.log(json);
        loadingMessage.textContent = '';
        // Successful login
        window.location.href = 'products.html';
    })
    .catch(error => {
        console.error('Error:', error);
        loadingMessage.textContent = '';
        errorMessage.textContent = 'Invalid username or password';
    });
});