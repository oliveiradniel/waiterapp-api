import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
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

    const product = await Product.create({
      name,
      description,
      imagePath: filename,
      price: Number(price),
      ingredients: JSON.parse(ingredients),
      category,
    });

    res.status(201).json(product);
  } catch {
    res.sendStatus(500);
  }
}
