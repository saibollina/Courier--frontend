import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/health', (req, res) => {
    res.json({ message: "Welcome to the Itenary backend." });
  });