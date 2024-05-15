import { Router } from "express";
import * as likeController from "../controllers/likeController";
import authentication from "../middlewares/authentication";

const likeRoute = Router();

likeRoute.post("/:threadId", authentication, likeController.like);

export default likeRoute;
