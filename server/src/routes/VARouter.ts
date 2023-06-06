import express from "express";
import { alvinIndex, alvinCreate } from '../controllers/VAController';


const router = express.Router();
// Problem 1: Configure the router such that it will direct a GET request to the index function within VAController.
router.get('/alvin', alvinIndex);

// Problem 2: Configure the router such that it will direct a POST request to call the create function within VAController.
router.post('/alvin', alvinCreate);

export default router;