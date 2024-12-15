import { Router } from 'express';

import path from 'node:path';

import multer from 'multer';

import Category from './app/useCases/Category';
import Product from './app/useCases/Product';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get('/categories', Category.index);

// Create category
router.post('/categories', Category.create);

// List products
router.get('/products', Product.index);

// Create product
router.post('/products', upload.single('image'), Product.create);

// Get products by category
router.get('/categories/:categoryId/products', (req, res) => {
  res.send('OK');
});

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
