import { Router } from "express";

import {
    getCartProducts, deleteCartProducts, getProducts, postCartProducts, postHistoric,getHistoric
} from "../controllers/productsController.js";
import {
    tokenValidation, deleteCartValidation, postCartValidation, postHistoricValidation
} from "../middlewares/productsMeddleware.js";

const productsRouter = Router();

productsRouter.get("/products", tokenValidation, getProducts);
productsRouter.get("/cart", tokenValidation, getCartProducts);
productsRouter.post(
    "/cart", tokenValidation, postCartValidation, postCartProducts
);
productsRouter.delete(
    "/cart", tokenValidation, deleteCartValidation, deleteCartProducts
);
productsRouter.post(
    "/historic", tokenValidation, postHistoricValidation, postHistoric
);
productsRouter.get("/historic", tokenValidation, getHistoric);

export default productsRouter;


