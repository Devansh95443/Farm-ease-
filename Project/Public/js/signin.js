document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Simulate authentication using credentials from directory structure
    var producerEmail = 'producer@example.com';
    var producerPassword = 'producerpassword';
    var customerEmail = 'customer@example.com';
    var customerPassword = 'customerpassword';

    if (email === producerEmail && password === producerPassword) {
        // Redirect to producer dashboard page
        window.location.href = 'producer_dashboard.html';
    } else if (email === customerEmail && password === customerPassword) {
        // Redirect to customer dashboard page
        window.location.href = 'dashboard.html';
    } else {
        // Show error message for incorrect credentials
        alert('Authentication failed. Please check your email and password.');
    }
});
