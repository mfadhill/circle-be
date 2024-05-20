import { Router } from "express";
import * as likeController from "../controllers/likeController";
import authentication from "../middlewares/authentication";

const likeRoute = Router();

// likeRoute.post("/:threadId", authentication, likeController.like);
likeRoute.post("/:threadId", authentication, likeController.createLike);
likeRoute.get("/:threadId", authentication, likeController.getLikes);
likeRoute.get("/current/:threadId", authentication, likeController.getCurrentLike);

export default likeRoute;
