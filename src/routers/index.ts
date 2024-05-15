import { Router } from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import threadRoute from "./threadRouter";
import followRoute from "./followRouter";
import likeRoute from "./likeRouter";


const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use(authRouter);
indexRouter.use("/threads", threadRoute);
indexRouter.use("/follow", followRoute);
indexRouter.use("/like", likeRoute);

export default indexRouter;
