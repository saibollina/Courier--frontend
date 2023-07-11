import { Router} from 'express';


import { create, findByEmail, findAll } from "../controller/customer.controller.js";

export const customerRouter = Router();


customerRouter.post('/customers',create)
customerRouter.get('/customers/email/:email',  findByEmail);
customerRouter.get('/customers',  findAll);
