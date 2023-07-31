import { Router} from 'express';
import { findAll, findFullTripOfDelivery } from "../controller/location.controller.js";

export const locationRouter = Router();

locationRouter.get('/locations', findAll);
locationRouter.get('/getFullTrip', findFullTripOfDelivery)