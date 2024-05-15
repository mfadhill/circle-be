import { Router } from "express";
import { Request, Response } from "express";
import * as followController from "../controllers/followController";
import authentication from "../middlewares/authentication";

const followRoute = Router();

followRoute.post("/:followingId", authentication, followController.follow);

export default followRoute;
