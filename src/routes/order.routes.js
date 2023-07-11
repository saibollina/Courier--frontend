import { Router} from 'express';

import { findAll, create, estimateDeliveryCost, findAllOrdersAssignedToDP } from "../controller/order.controller.js";


export const orderRouter = Router();

orderRouter.get('/orders', findAll);

orderRouter.post('/orders',create);

orderRouter.get('/orders/estimateCost', estimateDeliveryCost);

orderRouter.get('/orders/assignedTo/:deliveryPersonId',findAllOrdersAssignedToDP);
