import { Router} from 'express';
import bodyParser from 'body-parser';
import { createPlace, getAllPlaces,getAllEvents,getAllHotels, getPlace,searchPlace, updatePlace, deleteAllPlaces,deletePlace } from '../controller/place.controller.js';

export const placeRouter = Router();

placeRouter.get('/places', getAllPlaces);
placeRouter.get('/events', getAllEvents);
placeRouter.get('/hotels', getAllHotels);
placeRouter.get("/places/search", searchPlace);
placeRouter.get('/places/:placeId', getPlace);
placeRouter.post('/place',[bodyParser.urlencoded({ extended: false }),bodyParser.json()],createPlace)
placeRouter.delete("/places/:id", deletePlace);
placeRouter.delete("/places/", deleteAllPlaces);
placeRouter.put("/places/id", updatePlace);
