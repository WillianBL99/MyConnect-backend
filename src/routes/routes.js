import {Router} from "express";
import authRouter from "./authRouter.js";
import productsRouter from "./productsRouter.js";

const routes = Router();
routes.use(authRouter);
routes.use(productsRouter);

export default routes;

