import { Router } from "express";
import { loginService, registerService } from "./service.js";

const router = Router();

router.post("/register", registerService);
router.post("/login", loginService);

export default router;