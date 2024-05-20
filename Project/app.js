// Import required modules
const express = require('express'); // Import Express.js library
const path = require('path'); // Import Node.js path module
const pool = require('./db'); // Import db.js for MySQL database connection
const bcrypt = require('bcrypt'); // Import bcrypt library for password hashing

// Create Express app
const app = express(); // Initialize Express app
const PORT = process.env.PORT || 3000; // Set port number, using environment variable or 3000 as default

// Serve static files from the Public directory
app.use(express.static(path.join(__dirname, 'Public'))); // Serve static files from Public directory

// Middleware to parse JSON bodies
app.use(express.json()); // Middleware to parse JSON request bodies

// Define API endpoints
app.get('/api/summary', async (req, res) => {
    try {
        // Placeholder for summary endpoint
        const summaryData = {
            totalOrders: 100,
            totalRevenue: 5000
        };
        res.json(summaryData); // Return summary data as JSON
    } catch (error) {
        console.error('Error fetching summary data:', error); // Log error
        res.status(500).json({ message: 'Failed to fetch summary data' }); // Return error message
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        // Placeholder for orders endpoint
        const ordersData = [
            { id: 1, product: 'Product A', quantity: 2, total: 20 },
            { id: 2, product: 'Product B', quantity: 1, total: 10 }
        ];
        res.json(ordersData); // Return orders data as JSON
    } catch (error) {
        console.error('Error fetching orders data:', error); // Log error
        res.status(500).json({ message: 'Failed to fetch orders data' }); // Return error message
    }
});

app.post('/api/profile', async (req, res) => {
    try {
        // Placeholder for profile update API
        res.sendStatus(200); // Return success status
    } catch (error) {
        console.error('Error updating profile:', error); // Log error
        res.status(500).json({ message: 'Failed to update profile' }); // Return error message
    }
});

// Route for signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'signup_option.html')); // Serve signup_option.html file
});

// Handle POST request for user signup
app.post('/api/signup', async (req, res) => {
    try {
        const { fullName, address, email, password } = req.body; // Destructure request body
        const userType = 'customer'; // Assuming you're signing up as a customer
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt
        const [rows] = await pool.query(
            'INSERT INTO users (fullName, address, email, password, userType) VALUES (?,?,?,?,?)',
            [fullName, address, email, hashedPassword, userType]
        );
        res.status(201).json({ message: 'User signed up successfully' }); // Return success message
    } catch (error) {
        console.error('Error signing up user:', error); // Log error
        res.status(500).json({ message: 'Failed to sign up user' }); // Return error message
    }
});

// Define routes for each HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'home.html')); // Serve home.html file
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'about.html')); // Serve about.html file
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'dashboard.html')); // Serve dashboard.html file
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server start message
});