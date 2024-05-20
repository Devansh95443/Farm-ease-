function redirectToLogin() {
    window.location.href = 'signin.html';
}

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var role = document.getElementById('role').value; // Get the role from the form

    // Create user object
    var user = {
        name: name,
        email: email,
        password: password,
        role: role // Add the role to the user object
    };

    // Get existing users from local storage or initialize empty array
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    var existingUser = users.find(function(existingUser) {
        return existingUser.email === email;
    });

    if (existingUser) {
        // Redirect to login page if user already exists
        redirectTosignin();
        return;
    }

    // Add new user to the array
    users.push(user);

    // Save updated users array to local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to login page
    redirectTosignin();
});
