import {Router} from "express";

import { signUp, signIn, signOut } from "../controllers/authController.js";
import {
    singUpVallidation,signInVallidation
} from "../middlewares/authMeddleware.js";

const authRouter = Router();

authRouter.post("/sign-up",singUpVallidation, signUp);
authRouter.post("/sign-in",signInVallidation, signIn);
authRouter.get("/signout", signOut);

export default authRouter;