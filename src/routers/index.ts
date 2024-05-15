import { Router } from "express";
import userRouter from "./userRouter";

const indexRouter = Router();

indexRouter.use("/user", userRouter);

export default indexRouter;