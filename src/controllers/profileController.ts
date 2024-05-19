import { Request, Response } from "express";
import * as profileService from "../services/profileService";

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const userId = res.locals.userId;
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        }
        const cover = files?.cover?.[0]?.filename;
        const avatar = files?.avatar?.[0]?.filename;
        if (cover) {
            body.cover = cover;
        }

        if (avatar) {
            body.avatar = avatar;
        }

        const result = await profileService.updateProfile(userId, body, files);

        res.status(200).json({
            message: "Profile updated successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: (error as Error).message,
        });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId;
        const profile = await profileService.getProfile(userId);

        res.status(200).json({
            status: true,
            data: profile
        })
    } catch (error) {
        const err = error as unknown as Error;
        console.log(err);

        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}