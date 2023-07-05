import { Router } from "express";
import { loginUser, revalidateToken } from "../controllers/index.js";
import { validateJWT } from "../middlewares/index.js";

const router = Router();

router.get("/renew", [validateJWT], revalidateToken);
router.post("/login", loginUser);

export default router;
