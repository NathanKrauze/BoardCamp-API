import { Router } from "express";
import { deleteRent, getRentals, postRent, updateRent } from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();

rentalsRouter.post('/rentals', postRent);
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.put('/rentals', updateRent);
rentalsRouter.delete('/rentals', deleteRent);

export default rentalsRouter