import { Router} from 'express';

import { findAll, create } from "../controller/order.controller.js";

export const orderRouter = Router();

orderRouter.get('/orders', findAll);

orderRouter.post('/orders',create)
