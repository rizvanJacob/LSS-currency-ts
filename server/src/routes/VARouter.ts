import express from "express";
const router = express.Router();

//Problem 1: Configure the router such that it will direct a get request to the the index function within VAController.

//Alvin: The URL to access the route should be "/api/VA/alvin" (get)
//Nimalan: The URL to access the route should be "/api/VA/nimalan" (get)
import VAController from '../controllers/VAController';
router.get('/nimalan', VAController.nimalanIndex);
//Problem 2: Configure the router that such that it will direct a post request to call the create function within VAcontroller.

//Alvin: The URL to access the route should be "/api/VA/alvin" (post)
//Nimalan: The URL to access the route should be "/api/VA/nimalan" (post)
router.post('/nimalan', VAController.nimalanCreate);

export default router;
