import { Router } from "express";
import * as userController from "../controllers/userController";
import authentication from "../middlewares/authentication";

const userRouter = Router();

// userRouter.get("/:userId", authentication, userController.getUser);
userRouter.post("/", userController.createUser);

export default userRouter;