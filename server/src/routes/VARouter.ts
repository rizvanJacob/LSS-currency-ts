import express from "express";
import { alvinIndex, alvinCreate } from '../controllers/VAController';
const router = express.Router();


// Problem 1: Configure the router such that it will direct a GET request to the index function within VAController.

// Problem 2: Configure the router such that it will direct a POST request to call the create function within VAController.

//Alvin: The URL to access the route should be "/api/VA/alvin" (get)
router.get('/alvin', alvinIndex);

//Alvin: The URL to access the route should be "/api/VA/alvin" (post)
router.post('/alvin', alvinCreate);


export default router;