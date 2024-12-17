import { Request, Response } from 'express';

import { Order as Model } from '../models/Order';

class Order {
  async index(req: Request, res: Response) {
    try {
      const orders = await Model.find();

      res.json(orders);
    } catch {
      res.sendStatus(500);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { table, products } = req.body;

      if (!table) {
        res.status(400).json({ error: 'Table is required!' });
      }

      if (!products) {
        res.status(400).json({ error: 'Products is required!' });
      }

      const order = await Model.create({
        table,
        products,
      });

      res.status(201).json(order);
    } catch {
      res.sendStatus(500);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const { orderId } = req.params;

      if (!status) {
        res.status(400).json({ error: 'Status is required!' });
      }

      if (!(['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status))) {
        res.status(400).json({ error: 'Status should be one of these: WAITING, IN_PRODUCTION or DONE!' });
      }

      if (!orderId) {
        res.status(400).json({ error: 'OrderID is required' });
      }

      await Model.findByIdAndUpdate(orderId, { $set: { status } });

      res.sendStatus(204);
    } catch {
      res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { orderId } = req.params;

      if (!orderId) {
        res.status(400).json({ error: 'OrderID is required!' });
      }

      await Model.findByIdAndDelete(orderId);

      res.sendStatus(204);
    } catch {
      res.sendStatus(500);
    }
  }
}

export default new Order();
