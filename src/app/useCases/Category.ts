import { Request, Response } from 'express';

import { Category as Model } from '../models/Category';
import { Product } from '../models/Product';
import { isValidObjectId } from 'mongoose';

class Category {
  async index(req: Request, res: Response) {
    try {
      const categories = await Model.find();

      res.json(categories);
    } catch {
      res.sendStatus(500);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, icon } = req.body;

      if (!name) {
        res.status(400).json({ error: 'Name is required!'});
      }

      if (!icon) {
        res.status(400).json({ error: 'Name is required!'});
      }

      const category = await Model.create({ name, icon });

      res.status(201).json(category);
    } catch {
      res.sendStatus(500);
    }
  }

  async listProductsByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;

      if (!(isValidObjectId(categoryId))) {
        res.status(400).json({ error: 'Invalid category id!' });
      }

      // const products = await Product.find({ category: categoryId });
      const products = await Product.find().where('category').equals(categoryId);

      res.json(products);
    } catch {
      res.sendStatus(500);
    }
  }
}

export default new Category();
