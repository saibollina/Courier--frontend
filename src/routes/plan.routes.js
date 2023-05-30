import { Router} from 'express';
import bodyParser from 'body-parser';
import { createPlan, getAllplans, getplan,deleteAllPlans,searchPlan, deletePlan,updatePlan } from '../controller/plan.controller.js';

export const planRouter = Router();

planRouter.get('/plans', getAllplans);
planRouter.get("/plans/search", searchPlan);
planRouter.get('/plans/:placeId', getplan);
planRouter.post('/place',[bodyParser.urlencoded({ extended: false }),bodyParser.json()],createPlan)
planRouter.delete("/plans/:id", deletePlan);
planRouter.delete("/plans/", deleteAllPlans);
planRouter.put("/plans/id", updatePlan);