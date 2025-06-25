// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const validateProduct = require('./middleware/validateProduct');
const { NotFoundError, ValidationError } = require('./errors/customErrors');



// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); 
app.use(logger); // Custom logger middleware
app.use(auth);

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// RESTful API Routes
// GET all products (with filtering, pagination, and search)
app.get('/api/products', (req, res) => {
  const { category, page = 1, limit = 10, search } = req.query;
  let filteredProducts = products;

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Search by name
  if (search) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    total: filteredProducts.length,
    page: parseInt(page),
    limit: parseInt(limit),
    products: paginatedProducts
  });
});

// GET product by ID
app.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return next(new NotFoundError('Product not found'));
  }
  res.json(product);
});

// POST create new product
app.post('/api/products', validateProduct, (req, res) => {
  const product = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock
  };
  products.push(product);
  res.status(201).json({ message: 'Product created', product });
});

// PUT update product
app.put('/api/products/:id', validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return next(new NotFoundError('Product not found'));
  }
  products[index] = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock
  };
  res.json({ message: 'Product updated', product: products[index] });
});

// DELETE product
app.delete('/api/products/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return next(new NotFoundError('Product not found'));
  }
  const product = products.splice(index, 1)[0];
  res.json({ message: 'Product deleted', product });
});

// GET product statistics
app.get('/api/products/stats', (req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  res.json({ categoryCounts: stats });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;