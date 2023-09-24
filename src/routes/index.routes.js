import { Router } from "express";
import gameRouter from "./games.routes.js";
import customersRoutes from "./customers.routes.js";


const router = Router();

router.use(gameRouter);
router.use(customersRoutes);

export default router;