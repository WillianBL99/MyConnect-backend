import {Router} from "express";

import {
    getCartProducts,deleteCartProducts, getProducts
} from "../controllers/productsController.js";

import tokenValidation from "../middlewares/productsMeddleware.js";

const productsRouter = Router();

productsRouter.get("/products",tokenValidation, getProducts);
productsRouter.get("/cart",tokenValidation, getCartProducts);
productsRouter.delete("/cart",tokenValidation, deleteCartProducts);

export default productsRouter;


