import express from "express";
//RIZ: my preference is to import the way Nimalan has done it, since often you can have multiple controllers that have similar functions. For example, all the trainees, users, and trainings controllers have a create function. 
import VAController from '../controllers/VAController';
const router = express.Router();


// Problem 1: Configure the router such that it will direct a GET request to the index function within VAController.

// Problem 2: Configure the router such that it will direct a POST request to call the create function within VAController.

//Alvin: The URL to access the route should be "/api/VA/alvin" (get)
router.get('/alvin', VAController.alvinIndex);


router.get('/riz', VAController.rizIndex);

//Alvin: The URL to access the route should be "/api/VA/alvin" (post)
router.post('/alvin', VAController.alvinCreate);

//Nimalan: The URL to access the route should be "/api/VA/nimalan" (post)
router.post('/nimalan', VAController.nimalanCreate);

export default router;