import { Router } from "express";
import gameRouter from "./games.routes.js";
import customersRoutes from "./customers.routes.js";
import rentalsRouter from "./rantals.routes.js";


const router = Router();

router.use(gameRouter);
router.use(customersRoutes);
router.use(rentalsRouter);

export default router;