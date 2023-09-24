import { Router } from "express";
import { getCustomers, postCustomers, updateCustomers } from "../controllers/customers.controllers.js";
import { validateSchema } from "../middlewares/validateSchemasMiddleware.js";
import { customerSchema } from "../schemas/customers.schemas.js";

const customersRoutes = Router();

customersRoutes.post('/customers', validateSchema(customerSchema), postCustomers);
customersRoutes.get('/customers', getCustomers);
customersRoutes.put('/customers', validateSchema(customerSchema), updateCustomers);

export default customersRoutes