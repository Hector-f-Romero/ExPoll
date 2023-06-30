import { Router } from "express";
import { addVoteUnregisteredToPoll } from "../controllers/index.js";

const router = Router();

router.post("/vote/unregistered/:id", addVoteUnregisteredToPoll);

export default router;
