import { Router} from 'express';
import bodyParser from 'body-parser';
import { createPlace, getAllOrders, getOrder, updateOrder,searchOrder, deleteAllOrders,deleteOrder } from '../controller/order.controller.js';

export const orderRouter = Router();

orderRouter.get('/orders', getAllOrders);
orderRouter.get("/orders/search", searchOrder);
orderRouter.get('/orders/:orderId', getOrder);
orderRouter.post('/order',[bodyParser.urlencoded({ extended: false }),bodyParser.json()],createOrder)
orderRouter.delete("/orders/:id", deleteOrder);
orderRouter.delete("/orders/", deleteAllOrders);
orderRouter.put("/orders/id", updateOrder);
