import { Router } from "express";

import {
    getCartProducts, deleteCartProducts, getProducts, postCartProducts
} from "../controllers/productsController.js";
import {
    tokenValidation, deleteCartValidation,postCartValidation
} from "../middlewares/productsMeddleware.js";

const productsRouter = Router();

productsRouter.get("/products", tokenValidation, getProducts);
productsRouter.get("/cart", tokenValidation, getCartProducts);
productsRouter.post(
    "/cart", tokenValidation, postCartValidation,postCartProducts
);
productsRouter.delete(
    "/cart", tokenValidation, deleteCartValidation, deleteCartProducts
);

export default productsRouter;


