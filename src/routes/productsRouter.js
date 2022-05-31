import { Router } from "express";

import {
    getCartProducts, deleteCartProducts, getProducts, postCartProducts, postHistoric,getHistoric
} from "../controllers/productsController.js";
import {
    tokenValidation, deleteCartValidation, postCartValidation, postHistoricValidation
} from "../middlewares/productsMeddleware.js";

const productsRouter = Router();
productsRouter.use(tokenValidation);

productsRouter.get("/products", getProducts);

productsRouter.get("/cart", getCartProducts);
productsRouter.post("/cart", postCartValidation, postCartProducts);
productsRouter.delete("/cart", deleteCartValidation, deleteCartProducts);

productsRouter.get("/historic", getHistoric);
productsRouter.post("/historic", postHistoricValidation, postHistoric);

export default productsRouter;


