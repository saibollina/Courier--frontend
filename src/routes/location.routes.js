import { Router} from 'express';
import { findAll } from "../controller/location.controller.js";

export const locationRouter = Router();

locationRouter.get('/locations', findAll);
