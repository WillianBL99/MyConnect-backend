import {Router} from "express";

import { signUp, signIn, signOut } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);

export default authRouter;