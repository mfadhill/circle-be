import { Router } from "express";
import authentication from "../middlewares/authentication";
import uploadMiddleware from "../middlewares/upload";
import { updateProfile, getProfile } from "../controllers/profileController";
const profileRouter = Router();

profileRouter.put("/profile", authentication, uploadMiddleware(), updateProfile);
profileRouter.get("/profile", authentication, getProfile);
profileRouter.get("/profile/:userId", getProfile);

export default profileRouter