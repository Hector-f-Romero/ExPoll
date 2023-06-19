import { Router } from "express";
import { createUser, getUsers } from "../controllers/index.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;
