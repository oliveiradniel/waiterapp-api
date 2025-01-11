import { Router } from 'express';

import upload from './config/multer';

import Category from './app/useCases/Category';
import Product from './app/useCases/Product';
import Order from './app/useCases/Order';

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

router.delete('/products/:productId', Product.delete);

// List orders
router.get('/orders', Order.index);

// Create order
router.post('/orders', Order.create);

// Change order status
router.patch('/orders/:orderId', Order.updateStatus);

// Delete/cancel order
router.delete('/orders/:orderId', Order.delete);
