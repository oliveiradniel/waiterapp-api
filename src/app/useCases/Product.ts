import { Request, Response } from 'express';

import { Product as Model } from '../models/Product';

class Product {
  async index(req: Request, res: Response) {
    try {
      const products = await Model.find();

      res.json(products);
    } catch {
      res.sendStatus(500);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, price, ingredients, category } = req.body;

      const filename = req.file?.filename;

      if (!name) {
        res.status(400).json({ error: 'Name is required!'});
      }

      if (!description) {
        res.status(400).json({ error: 'Description is required!'});
      }

      if (!filename) {
        res.status(400).json({ error: 'Image is required!'});
      }

      if (!price) {
        res.status(400).json({ error: 'Price is required!'});
      }

      if (!ingredients) {
        res.status(400).json({ error: 'Ingredients is required!'});
      }

      if (!category) {
        res.status(400).json({ error: 'Category is required!'});
      }

      const product = await Model.create({
        name,
        description,
        imagePath: filename,
        price: Number(price),
        ingredients: ingredients ? JSON.parse(ingredients) : [],
        category,
      });

      res.status(201).json(product);
    } catch {
      res.sendStatus(500);
    }
  }
}

export default new Product();
