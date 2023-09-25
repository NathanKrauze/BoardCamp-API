import { Router } from "express";
import { deleteRent, finishRent, getRentals, postRent} from "../controllers/rentals.controllers.js";
import { validateSchema } from "../middlewares/validateSchemasMiddleware.js";
import { RentSchema } from "../schemas/rentals.schemas.js";

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateSchema(RentSchema), postRent);
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals/:id/return', finishRent);
rentalsRouter.delete('/rentals', deleteRent);

export default rentalsRouter