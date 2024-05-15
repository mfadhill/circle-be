import { Router } from "express";
import * as replyController from "../controllers/replyController";
import uploadMiddleware from "../middlewares/upload";
import authentication from "../middlewares/authentication";

const threadRoute = Router();

// threadRoute.get("/:threadId", replyController.getReply);
// threadRoute.get("/", threadController.getThreads);
threadRoute.post(
   "/",
   authentication,
   uploadMiddleware(),
   replyController.createReply
);

export default threadRoute;
