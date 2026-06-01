import { Router } from "express";

import { loginController, meController, registerController } from "./controller.js";
import { authMiddleware } from "./middleware.js";

export const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/me", authMiddleware, meController);