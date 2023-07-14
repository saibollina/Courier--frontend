import { Router} from 'express';


import { create, findByEmail, findAll,findOne, deleteCustomer, update } from "../controller/customer.controller.js";

export const customerRouter = Router();


customerRouter.post('/customers',create)
customerRouter.get('/customers/email/:email',  findByEmail);
customerRouter.get('/customers',  findAll);
customerRouter.get('/customers/:id',  findOne);
customerRouter.put('/customers/:id', update );
customerRouter.delete("/customers/:id", deleteCustomer);
