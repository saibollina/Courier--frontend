import { Router} from 'express';
import bodyParser from 'body-parser';

import { findAll, findOne, create, deleteUser,deleteAll,update } from "../controller/user.controller.js";

export const userRouter = Router();

userRouter.get('/users', findAll);
userRouter.get('/users/:id',  findOne);
userRouter.post('/users',[bodyParser.urlencoded({ extended: false }),bodyParser.json()],create)
userRouter.delete("/users/:id", deleteUser);
userRouter.delete("/users/", deleteAll);
userRouter.put("/users/id", update);