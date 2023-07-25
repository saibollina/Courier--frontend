import { Router} from 'express';

import {getAdminStats, getDeliveryPersonStats, getClerkStats } from "../controller/dashboard.controller.js";

export const dashboardRouter = Router();

dashboardRouter.get('/getAdminStats', getAdminStats);
dashboardRouter.get('/getDeliveryPersonStats/:id', getDeliveryPersonStats);
dashboardRouter.get('/getClerkStats/:id', getClerkStats);