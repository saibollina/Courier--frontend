import { Router} from 'express';

import { findAll, create } from "../controller/order.controller.js";
import * as orderDetails from "../controller/orderDetails.controller.js";

export const orderRouter = Router();

orderRouter.get('/orders', findAll);

orderRouter.post('/orders',create)

orderRouter.get('/orderDetails', orderDetails.findAll)