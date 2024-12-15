import { Request, Response } from 'express';

import { Category as Model } from '../models/Category';

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
}

export default new Category();
