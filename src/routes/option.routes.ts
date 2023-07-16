import { Router } from "express";
import { addVoteUnregisteredToPoll } from "../controllers/index.js";

export const optionRouter = Router();

optionRouter.post("/vote/unregistered/:id", addVoteUnregisteredToPoll);
