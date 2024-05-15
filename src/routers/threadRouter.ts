import { Router } from "express";
import * as threadController from "../controllers/threadController";
import uploadMiddleware from "../middlewares/upload";
import authentication from "../middlewares/authentication";

const threadRoute = Router();

threadRoute.get("/:threadId", threadController.getThread);
threadRoute.get("/", threadController.getThreads);
threadRoute.post(
   "/",
   authentication,
   uploadMiddleware(),
   threadController.createThreads
);

export default threadRoute;
