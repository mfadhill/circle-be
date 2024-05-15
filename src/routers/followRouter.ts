import { Router } from "express";
import * as followController from "../controllers/followController";
import authentication from "../middlewares/authentication";

const threadRoute = Router();

threadRoute.get("/:followingId", followController.getFollow);


export default threadRoute;
