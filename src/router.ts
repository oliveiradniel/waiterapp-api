import { Router } from 'express';

import upload from './config/multer';

import Category from './app/useCases/Category';
import Product from './app/useCases/Product';

export const router = Router();

// List categories
router.get('/categories', Category.index);

// Create category
router.post('/categories', Category.create);

// Get products by category
router.get('/categories/:categoryId/products', Category.listProductsByCategory);
// List products

router.get('/products', Product.index);

// Create product
router.post('/products', upload.single('image'), Product.create);

// List orders
router.get('/orders', (req, res) => {
  res.send('OK');
});

// Create order
router.post('/orders', (req, res) => {
  res.send('OK');
});

// Change order status
router.patch('/orders/:orderId', (req, res) => {
  res.send('OK');
});

// Delete/cancel order
router.delete('/orders/:orderId', (req, res) => {
  res.send('OK');
});
