def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return r

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const routes = require('./routes/routes');  // Make sure the routes are correctly imported

const app = express();
const port = 3000;

// Set up view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folder for serving images
app.use(express.static(path.join(__dirname, 'public')));

// Method override for handling PUT and DELETE in forms
app.use(methodOverride('_method'));

// Use the routes defined in routes.js
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});























