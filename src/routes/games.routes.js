import { Router } from "express";
import { getGames, postGames } from "../controllers/games.controllers.js";
import { validateSchema } from "../middlewares/validateSchemasMiddleware.js";
import { gameSchema } from "../schemas/games.schemas.js";

const gameRouter = Router();

gameRouter.post('/games', validateSchema(gameSchema),postGames);
gameRouter.get('/games', getGames);

export default gameRouter;